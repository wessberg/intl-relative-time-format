import {ResolveLocaleOptions} from "./resolve-locale-options";
import {lookupMatcher} from "../matcher/lookup-matcher/lookup-matcher";
import {bestFitMatcher} from "../matcher/best-fit-matcher/best-fit-matcher";
import {ResolveLocaleResult} from "./resolve-locale-result";
import {isRecord} from "../../assert/is-record";
import {isList} from "../../assert/is-list";
import {unicodeExtensionValue} from "../unicode-extension/unicode-extension";
import {sameValue} from "../../util/same-value";
import {Locales} from "../../locale/locales";
import {RelevantExtensionKey} from "../../relevant-extension-key/relevant-extension-key";
import {LocaleData} from "../../locale/locale-data";

/**
 * The ResolveLocale abstract operation compares a BCP 47 language priority list
 * requestedLocales against the locales in availableLocales and determines the best available language to meet the request.
 * availableLocales, requestedLocales, and relevantExtensionKeys must be provided as List values,
 * options and localeData as Records.
 *
 * https://tc39.github.io/ecma402/#sec-resolvelocale
 * @param {Locales} availableLocales
 * @param {Locales} requestedLocales
 * @param {ResolveLocaleOptions} options
 * @param {RelevantExtensionKey[]} relevantExtensionKeys
 * @param {LocaleData} localeData
 * @returns {ResolveLocaleResult}
 */
export function resolveLocale (availableLocales: Locales, requestedLocales: Locales, options: ResolveLocaleOptions, relevantExtensionKeys: RelevantExtensionKey[], localeData: LocaleData): ResolveLocaleResult {
	// Let matcher be options.[[localeMatcher]].
	const matcher = options.localeMatcher;
	// If matcher is "lookup", then
	// (a) Let r be LookupMatcher(availableLocales, requestedLocales).
	// (b) Let r be BestFitMatcher(availableLocales, requestedLocales).
	const r = matcher === "lookup"
		? lookupMatcher({availableLocales, requestedLocales})
		: bestFitMatcher({availableLocales, requestedLocales});

	// Let foundLocale be r.[[locale]].
	let foundLocale = r.locale;

	// Let result be a new Record.
	const result = {} as ResolveLocaleResult;

	// Set result.[[dataLocale]] to foundLocale.
	result.dataLocale = foundLocale;

	// Let supportedExtension be "-u"
	let supportedExtension = "-u";

	// For each element key of relevantExtensionKeys in List order, do
	for (const key of relevantExtensionKeys) {
		// Let foundLocaleData be localeData.[[<foundLocale>]].
		const foundLocaleData = localeData[foundLocale];

		// Assert: Type(foundLocaleData) is Record.
		if (!isRecord(foundLocaleData)) {
			throw new TypeError(`LocaleData for locale: '${foundLocale}' must be an object`);
		}

		// Let keyLocaleData be foundLocaleData.[[<key>]].
		const keyLocaleData = foundLocaleData[key];

		// Assert: Type(keyLocaleData) is List.
		if (!isList(keyLocaleData)) {
			throw new TypeError(`key: '${key}' in LocaleData for locale: '${foundLocale}' must be indexable`);
		}

		// Let value be keyLocaleData[0].
		let value = keyLocaleData[0];

		// Assert: Type(value) is either String or Null.
		if (typeof value !== "string" && value !== null) {
			throw new TypeError(`value: '${value}' for key: '${key}' in LocaleData for locale: '${foundLocale}' must be a string or null`);
		}

		// Let supportedExtensionAddition be "".
		let supportedExtensionAddition = "";

		// If r has an [[extension]] field, then
		if ("extension" in r) {
			// Let requestedValue be UnicodeExtensionValue(r.[[extension]], key).
			const requestedValue = unicodeExtensionValue(r.extension!, key);

			// If requestedValue is not undefined, then
			if (requestedValue !== undefined) {

				// If requestedValue is not the empty String, then
				if (requestedValue !== "") {

					// If keyLocaleData contains requestedValue, then
					if (keyLocaleData.includes(requestedValue)) {

						// Let value be requestedValue.
						value = requestedValue;

						// Let supportedExtensionAddition be the concatenation of "-", key, "-", and value.
						supportedExtensionAddition = `-${key}-${value}`;
					}
				}

				// Else if keyLocaleData contains "true", then
				else if (keyLocaleData.includes("true")) {
					// Let value be "true".
					value = "true";
				}

			}
		}

		// If options has a field [[<key>]], then
		if ("key" in options) {

			// Let optionsValue be options.[[<key>]].
			const optionsValue = options.key;

			// Assert: Type(optionsValue) is either String, Undefined, or Null.
			if (typeof optionsValue !== "string" && optionsValue != null) {
				throw new TypeError(`options value: '${optionsValue}' must be a string, undefined, or null`);
			}

			// If keyLocaleData contains optionsValue, then
			if (optionsValue !== undefined && keyLocaleData.includes(optionsValue)) {
				// If SameValue(optionsValue, value) is false, then
				// tslint:disable-next-line:no-collapsible-if
				if (!sameValue(optionsValue, value)) {
					// Let value be optionsValue.
					value = optionsValue;
					// Let supportedExtensionAddition be "".
					supportedExtensionAddition = "";
				}
			}
		}

		// Set result.[[<key>]] to value.
		result[key] = value;

		// Append supportedExtensionAddition to supportedExtension.
		supportedExtension += supportedExtensionAddition;
	}

	// If the number of elements in supportedExtension is greater than 2, then
	if (supportedExtension.length > 2) {

		// Let privateIndex be Call(%StringProto_indexOf%, foundLocale, « "-x-" »).
		const privateIndex = String.prototype.indexOf.call(foundLocale, "-x-");

		// If privateIndex = -1, then
		if (privateIndex === -1) {

			// Let foundLocale be the concatenation of foundLocale and supportedExtension.
			foundLocale = `${foundLocale}${supportedExtension}`;
		}

		// Else,
		else {

			// Let preExtension be the substring of foundLocale from position 0, inclusive, to position privateIndex, exclusive.
			const preExtension = foundLocale.slice(0, privateIndex);

			// Let postExtension be the substring of foundLocale from position privateIndex to the end of the string.
			const postExtension = foundLocale.slice(privateIndex);

			// Let foundLocale be the concatenation of preExtension, supportedExtension, and postExtension.
			foundLocale = `${preExtension}${supportedExtension}${postExtension}`;
		}

		// Assert: IsStructurallyValidLanguageTag(foundLocale) is true.
		// Let foundLocale be CanonicalizeLanguageTag(foundLocale).
		// Intl.getCanonicalLocales will throw a TypeError if the locale isn't structurally valid
		foundLocale = Intl.getCanonicalLocales(foundLocale)[0];
	}

	// Set result.[[locale]] to foundLocale.
	result.locale = foundLocale;

	// Return result.
	return result;
}