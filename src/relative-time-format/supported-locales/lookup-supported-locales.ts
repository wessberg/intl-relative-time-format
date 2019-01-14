import {Locales} from "../../locale/locales";
import {removeUnicodeExtensionSequences} from "../unicode-extension/unicode-extension";
import {bestAvailableLocale} from "../matcher/best-available-locale/best-available-locale";

/**
 * The LookupSupportedLocales abstract operation returns the subset of the provided BCP 47 language priority list
 * requestedLocales for which availableLocales has a matching locale when using the BCP 47 Lookup algorithm.
 * Locales appear in the same order in the returned list as in requestedLocales.
 *
 * https://tc39.github.io/ecma402/#sec-bestfitsupportedlocales
 * @param {Locales} availableLocales
 * @param {Locales} requestedLocales
 * @return {Locales}
 */
export function lookupSupportedLocales (availableLocales: Locales, requestedLocales: Locales): Locales {
	// Let subset be a new empty List.
	const subset: Locales = [];
		// For each element locale of requestedLocales in List order, do
	for (const locale of requestedLocales) {
		// Let noExtensionsLocale be the String value that is locale with all Unicode locale extension sequences removed.
		const noExtensionsLocale = removeUnicodeExtensionSequences(locale);

		// Let availableLocale be BestAvailableLocale(availableLocales, noExtensionsLocale).
		const availableLocale = bestAvailableLocale(availableLocales, noExtensionsLocale);

		// If availableLocale is not undefined, append locale to the end of subset.
		if (availableLocale !== undefined) {
			subset.push(locale);
		}
	}
	return subset;
}