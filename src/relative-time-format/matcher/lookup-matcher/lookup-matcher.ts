import { MatcherOptions } from "../matcher-options";
import {
  removeUnicodeExtensionSequences,
  UNICODE_EXTENSION_SEQUENCE_REGEXP
} from "../../unicode-extension/unicode-extension";
import { bestAvailableLocale } from "../best-available-locale/best-available-locale";
import { MatcherResult } from "../matcher-result";
import { ensureDefaultLocale } from "../../default-locale/get-default-locale";

/**
 * The LookupMatcher abstract operation compares requestedLocales, which must be a List as returned by CanonicalizeLocaleList,
 * against the locales in availableLocales and determines the best available language to meet the request.
 *
 * https://tc39.github.io/ecma402/#sec-lookupmatcher
 * @param {MatcherOptions} options
 * @return {MatcherResult}
 */
export function lookupMatcher({
  availableLocales,
  requestedLocales
}: MatcherOptions): MatcherResult {
  // Let result be a new Record.
  const result = {} as MatcherResult;
  // For each element locale of requestedLocales in List order, do
  for (const locale of requestedLocales) {
    // Let noExtensionsLocale be the String value that is locale with all Unicode locale extension sequences removed.
    const noExtensionsLocale = removeUnicodeExtensionSequences(locale);

    // Let availableLocale be BestAvailableLocale(availableLocales, noExtensionsLocale).
    const availableLocale = bestAvailableLocale(
      availableLocales,
      noExtensionsLocale
    );

    // If availableLocale is not undefined, then
    if (availableLocale !== undefined) {
      // Set result.[[locale]] to availableLocale.
      result.locale = availableLocale;

      // If locale and noExtensionsLocale are not the same String value, then
      if (locale !== noExtensionsLocale) {
        // Let extension be the String value consisting of the first substring of local
        // that is a Unicode locale extension sequence.
        const extensionMatch = locale.match(UNICODE_EXTENSION_SEQUENCE_REGEXP);
        // Set result.[[extension]] to extension.
        result.extension = extensionMatch == null ? "" : extensionMatch[0];
      }
      return result;
    }
  }
  // Let defLocale be DefaultLocale().
  const defLocale = ensureDefaultLocale();

  // Set result.[[locale]] to defLocale.
  result.locale = defLocale;

  // Return result.
  return result;
}
