import { MatcherOptions } from "../matcher-options";
import { MatcherResult } from "../matcher-result";
import { lookupMatcher } from "../lookup-matcher/lookup-matcher";

/**
 * The BestFitMatcher abstract operation compares requestedLocales,
 * which must be a List as returned by CanonicalizeLocaleList,
 * against the locales in availableLocales and determines the best available language to meet the request.
 * The algorithm is implementation dependent, but should produce results that a typical user of the requested
 * locales would perceive as at least as good as those produced by the LookupMatcher abstract operation.
 * RelativeTimeFormatOptions specified through Unicode locale extension sequences must be ignored by the algorithm.
 * Information about such subsequences is returned separately. The abstract operation returns a record
 * with a [[locale]] field, whose value is the language tag of the selected locale,
 * which must be an element of availableLocales.
 * If the language tag of the request locale that led to the selected locale contained a Unicode locale extension sequence,
 * then the returned record also contains an [[extension]] field whose value is the first Unicode locale extension sequence
 * within the request locale language tag.
 *
 * https://tc39.github.io/ecma402/#sec-bestfitmatcher
 * @param {MatcherOptions} options
 * @return {MatcherResult}
 */
export function bestFitMatcher(options: MatcherOptions): MatcherResult {
  return lookupMatcher(options);
}
