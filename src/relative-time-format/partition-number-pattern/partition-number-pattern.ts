import { Partition, Partitions } from "../../partition/partition";
import { RelativeTimeFormat } from "../relative-time-format/relative-time-format";
import { getInternalSlot } from "../internal-slot/internal-slot";
import { NUMBERING_SYSTEMS } from "../numbering-systems/numbering-systems";

/**
 * The PartitionNumberPattern abstract operation is called with arguments numberFormat
 * (which must be an object initialized as a NumberFormat) and x (which must be a Number value),
 * interprets x as a numeric value, and creates the corresponding parts according to the effective locale
 * and the formatting options of numberFormat.
 * @param {RelativeTimeFormat} relativeTimeFormat - needed to get internal slots
 * @param {number} x
 * @returns {Partitions}
 */
export function partitionNumberPattern(
  relativeTimeFormat: RelativeTimeFormat,
  x: number
): Partitions {
  let pattern: string;
  const locale = getInternalSlot(relativeTimeFormat, "locale");
  const numberFormat = getInternalSlot(relativeTimeFormat, "numberFormat");
  const { numberingSystem } = relativeTimeFormat.resolvedOptions();

  // If x is not NaN and x < 0 or x is -0, then
  if (!isNaN(x) && (x < 0 || Object.is(x, -0))) {
    // Let x be -x.
    x = -x;
    // Let pattern be numberFormat.[[NegativePattern]].
    // Since we don't have access to the internal slots, take it from the locale data
    // CORRECTION: The positive pattern should always be used when formatting relative time
    // TODO: Since we don't care about positive and negative patterns, can we leave out the pattern data all-together from this polyfill?
    pattern = "{number}";
  }

  // Else,
  else {
    // Let pattern be numberFormat.[[PositivePattern]].
    // Since we don't have access to the internal slots, take it from the locale data
    // TODO: Since we don't care about positive and negative patterns, can we leave out the pattern data all-together from this polyfill?
    pattern = "{number}";
  }

  // Let result be a new empty List.
  const result: Partition[] = [];

  // Let beginIndex be Call(%StringProto_indexOf%, pattern, « "{", 0 »).
  let beginIndex = String.prototype.indexOf.call(pattern, "{", 0);

  // Let endIndex be 0.
  let endIndex = 0;

  // Let nextIndex be 0.
  let nextIndex = 0;

  // Let length be the number of code units in pattern.
  const length = pattern.length;

  // Repeat, while beginIndex is an integer index into pattern
  while (pattern[beginIndex] !== undefined) {
    // Set endIndex to Call(%StringProto_indexOf%, pattern, « "}", beginIndex »).
    endIndex = String.prototype.indexOf.call(pattern, "}", beginIndex);

    // Assert: endIndex is greater than beginIndex.
    if (endIndex <= beginIndex) {
      throw new TypeError(
        `endIndex: ${endIndex} must be greater than beginIndex: ${beginIndex}`
      );
    }

    // If beginIndex is greater than nextIndex, then
    if (beginIndex > nextIndex) {
      // Let literal be a substring of pattern from position nextIndex, inclusive, to position beginIndex, exclusive.
      const literal = pattern.slice(nextIndex, beginIndex);

      // Append a new Record { [[Type]]: "literal", [[Value]]: literal } as the last element of result.
      result.push({
        type: "literal",
        value: literal
      });
    }

    // CORRECTION FOR RelativeTimeFormat: p will always be equal to 'number'
    // CORRECTION FOR RelativeTimeFormat: p will always be finite, so we don't have to check for NaN and isFinite
    // CORRECTION FOR RelativeTimeFormat: NumberFormat.[[Style]] will always be "decimal"
    // CORRECTION FOR RelativeTimeFormat: NumberFormat.[[UseGrouping]] will always be false
    // CORRECTION FOR RelativeTimeFormat: Even though the spec doesn't explicitly state it, existing implementations such as in Chrome groups floats with decimals into integers. For example, 1.1 becomes {type: "integer", value: "1.1"}

    // Let n be FormatNumberToString(numberFormat, x).
    let n = x.toLocaleString(locale, numberFormat.resolvedOptions());

    // If the numberFormat.[[NumberingSystem]] matches one of the values in the
    // "Numbering System" column of Table 3 (https://tc39.github.io/ecma402/#table-numbering-system-digits), then
    if (NUMBERING_SYSTEMS[numberingSystem] != null) {
      // Let digits be a List whose 10 String valued elements are the UTF-16 string representations of the 10 digits specified in the "Digits" column of the matching row in Table 3.
      const digits = [...NUMBERING_SYSTEMS[numberingSystem]];

      // Replace each digit in n with the value of digits[digit].
      n = n.replace(/\d/g, digit => digits[(digit as unknown) as number]);
    }

    // Else use an implementation dependent algorithm to map n to the appropriate
    // representation of n in the given numbering system.
    else {
      n = String(n);
    }

    const integer: string = n;

    // Append a new Record { [[Type]]: "integer", [[Value]]: integer } as the last element of result.
    result.push({
      type: "integer",
      value: integer
    });

    // Set nextIndex to endIndex + 1.
    nextIndex = endIndex + 1;

    // Set beginIndex to Call(%StringProto_indexOf%, pattern, « "{", nextIndex »).
    beginIndex = String.prototype.indexOf.call(pattern, "{", nextIndex);
  }

  // If nextIndex is less than length, then
  if (nextIndex < length) {
    // Let literal be the substring of pattern from position nextIndex, inclusive, to position length, exclusive.
    const literal = pattern.slice(nextIndex, length);

    // Append a new Record { [[Type]]: "literal", [[Value]]: literal } as the last element of result.
    result.push({
      type: "literal",
      value: literal
    });
  }

  // Return result.
  return result;
}
