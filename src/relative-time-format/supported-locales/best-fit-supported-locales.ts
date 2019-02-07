import { Locales } from "../../locale/locales";
import { lookupSupportedLocales } from "./lookup-supported-locales";

/**
 * The BestFitSupportedLocales abstract operation returns the subset of the provided BCP 47 language priority list
 * requestedLocales for which availableLocales has a matching locale when using the Best Fit Matcher algorithm.
 * Locales appear in the same order in the returned list as in requestedLocales.
 *
 * https://tc39.github.io/ecma402/#sec-bestfitsupportedlocales
 * @param {Locales} availableLocales
 * @param {Locales} requestedLocales
 * @return {Locales}
 */
export function bestFitSupportedLocales(
  availableLocales: Locales,
  requestedLocales: Locales
): Locales {
  return lookupSupportedLocales(availableLocales, requestedLocales);
}
