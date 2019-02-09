import {Locales} from "../../../locale/locales";
import {Locale} from "../../../locale/locale";

/**
 * The BestAvailableLocale abstract operation compares the provided argument locale,
 * which must be a String value with a structurally valid and canonicalized BCP 47 language tag,
 * against the locales in availableLocales and returns either the longest non-empty prefix of locale
 * that is an element of availableLocales, or undefined if there is no such element. It uses the fallback
 * mechanism of RFC 4647, section 3.4.
 *
 * https://tc39.github.io/ecma402/#sec-bestavailablelocale
 * @param {Locales} availableLocales
 * @param {Locale} locale
 * @return {string}
 */
export function bestAvailableLocale(availableLocales: Locales, locale: Locale): string | undefined {
	// Let candidate be locale.
	let candidate = locale;
	// Repeat
	while (true) {
		// If availableLocales contains an element equal to candidate, return candidate.
		if (availableLocales.includes(candidate)) {
			return candidate;
		}

		// Let pos be the character index of the last occurrence of "-" (U+002D) within candidate.
		let pos = candidate.lastIndexOf("-");
		// If that character does not occur, return undefined.
		if (pos === -1) return undefined;

		// If pos ≥ 2 and the character "-" occurs at index pos-2 of candidate, decrease pos by 2.
		if (pos >= 2 && candidate.charAt(pos - 2) === "-") {
			pos -= 2;
		}

		// Let candidate be the substring of candidate from position 0, inclusive, to position pos, exclusive.
		candidate = candidate.slice(0, pos);
	}
}
