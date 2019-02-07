import { RelativeTimeFormat } from "../relative-time-format/relative-time-format";
import {
  getInternalSlot,
  hasInternalSlot
} from "../internal-slot/internal-slot";

/**
 * When the ResolvePlural abstract operation is called with arguments pluralRules (which must be an object initialized as a PluralRules) and n (which must be a Number value), it returns a String value representing the plural form of n according to the effective locale and the options of pluralRules.
 *
 * https://tc39.github.io/ecma402/#sec-resolveplural
 * @param {RelativeTimeFormat} relativeTimeFormat - needed to get internal slots
 * @param {number} n
 */
export function resolvePlural(
  relativeTimeFormat: RelativeTimeFormat,
  n: number
): string {
  // Assert: Type(pluralRules) is Object.
  // Assert: pluralRules has an [[InitializedPluralRules]] internal slot.
  if (!hasInternalSlot(relativeTimeFormat, "pluralRules")) {
    throw new TypeError(
      `Given instance of of Intl.RelativeTimeFormat must have an [[InitializedPluralRules]] internal slot`
    );
  }

  // Assert: Type(n) is Number.
  if (typeof n !== "number") {
    throw new TypeError(`Argument 'n' must be a number`);
  }

  // If n is not a finite Number, then
  if (!isFinite(n)) {
    // Return "other".
    return "other";
  }

  // Let locale be pluralRules.[[Locale]].
  // Let type be pluralRules.[[Type]].
  const pluralRules = getInternalSlot(relativeTimeFormat, "pluralRules");

  // Return ? PluralRuleSelect(locale, type, n, operands).
  return pluralRules.select(n);
}
