import {Locales} from "../../locale/locales";
import {toObject} from "../../util/to-object";
import {bestFitSupportedLocales} from "./best-fit-supported-locales";
import {lookupSupportedLocales} from "./lookup-supported-locales";
import {SupportedLocalesOptions} from "./supported-locales-options";
import {LOCALE_MATCHER, LocaleMatcher} from "../../locale-matcher/locale-matcher";
import {getOption} from "../../util/get-option";

/**
 * The SupportedLocales abstract operation returns the subset of the provided BCP 47 language priority list
 * requestedLocales for which availableLocales has a matching locale. Two algorithms are available to match
 * the locales: the Lookup algorithm described in RFC 4647 section 3.4, and an implementation dependent
 * best-fit algorithm. Locales appear in the same order in the returned list as in requestedLocales.
 *
 * https://tc39.github.io/ecma402/#sec-supportedlocales
 * @param {Locales} availableLocales
 * @param {Locales} requestedLocales
 * @param {SupportedLocalesOptions} [options]
 * @return {Locales}
 */
export function supportedLocales(availableLocales: Locales, requestedLocales: Locales, options?: SupportedLocalesOptions): Locales {
	let matcher: LocaleMatcher;

	// If options is not undefined, then
	if (options !== undefined) {
		// Let options be ? ToObject(options).
		options = toObject(options);

		// Let matcher be ? GetOption(options, "localeMatcher", "string", « "lookup", "best fit" », "best fit").
		matcher = getOption(options, "localeMatcher", "string", LOCALE_MATCHER, "best fit");
	}

	// Else, let matcher be "best fit".
	else {
		matcher = "best fit";
	}

	// If matcher is "best fit", then let supportedLocales be BestFitSupportedLocales(availableLocales, requestedLocales).
	// Else let supportedLocales be LookupSupportedLocales(availableLocales, requestedLocales).
	// Return CreateArrayFromList(supportedLocales).
	return matcher === "best fit"
		? bestFitSupportedLocales(availableLocales, requestedLocales)
		: lookupSupportedLocales(availableLocales, requestedLocales);
}
