import {Locale} from "../../locale/locale";
import {Locales} from "../../locale/locales";
import {toObject} from "../../util/to-object";
import {isStructurallyValidLanguageTag} from "../is-structurally-valid-language-tag/is-structurally-valid-language-tag";
import {canonicalizeLanguageTag} from "../canonicalize-language-tag/canonicalize-language-tag";

// tslint:disable

/**
 * The abstract operation CanonicalizeLocaleList canonicalizes the given list of locales
 *
 * https://tc39.github.io/ecma402/#sec-canonicalizelocalelist
 * @param {Locale|Locales?} locales
 */
export function canonicalizeLocaleList (locales: Locale|Locales|undefined): Locales {
	// If locales is undefined, then
	if (locales === undefined) {
		// Return a new empty List.
		return [];
	}

	// Let seen be a new empty List.
	const seen: Locales = [];

	// If Type(locales) is String, then
	// (a) Let O be CreateArrayFromList(« locales »).
	// (b) Let O be ? ToObject(locales).
	const o = typeof locales === "string" ? [locales] : toObject(locales);

	// Let len be ? ToLength(? Get(O, "length")).
	const len = o.length;

	// Let k be 0.
	let k = 0;

	// Repeat, while k < len
	while (k < len) {
		// Let Pk be ToString(k).
		const pk = k.toString();

		// Let kPresent be ? HasProperty(O, Pk).
		const kPresent = pk in o;

		// If kPresent is true, then
		if (kPresent) {

			// Let kValue be ? Get(O, Pk).
			const kValue = o[pk as unknown as number];

			// If Type(kValue) is not String or Object, throw a TypeError exception.
			if (typeof kValue !== "string" && typeof kValue !== "object") {
				throw new TypeError(`Element '${kValue}' in locales must be a string or an Object`);
			}

			// Let tag be ? ToString(kValue).
			const tag = kValue.toString();

			// If IsStructurallyValidLanguageTag(tag) is false, throw a RangeError exception.
			if (!isStructurallyValidLanguageTag(tag)) {
				throw new RangeError(`Language tag: ${tag} is not valid`);
			}

			// Let canonicalizedTag be CanonicalizeLanguageTag(tag).
			const canonicalizedTag = canonicalizeLanguageTag(tag);

			// If canonicalizedTag is not an element of seen, append canonicalizedTag as the last element of seen.
			if (!seen.includes(canonicalizedTag)) {
				seen.push(canonicalizedTag);
			}
		}

		// Increase k by 1.
		k++;
	}

	// Return seen.
	return seen;
}