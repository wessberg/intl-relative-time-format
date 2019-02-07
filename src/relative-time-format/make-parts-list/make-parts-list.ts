import { SingularRelativeTimeUnit } from "../../unit/singular-relative-time-unit";
import {
  Partitions,
  UnitPartition,
  UnitPartitions
} from "../../partition/partition";

/**
 * The MakePartsList abstract operation is called with arguments pattern,
 * a pattern String, unit, a String, and parts, a List of Records representing a formatted Number.
 *
 * http://tc39.github.io/proposal-intl-relative-time/#sec-makepartslist
 * @param {string} pattern
 * @param {SingularRelativeTimeUnit} unit
 * @param {Partitions} parts
 * @returns {UnitPartitions}
 */
export function makePartsList(
  pattern: string,
  unit: SingularRelativeTimeUnit,
  parts: Partitions
): UnitPartitions {
  // Let result be a new empty List.
  const result: UnitPartition[] = [];

  // Let beginIndex be ! Call(%StringProto_indexOf%, pattern, « "{", 0 »).
  let beginIndex = String.prototype.indexOf.call(pattern, "{", 0);

  // Let endIndex be 0.
  let endIndex = 0;

  // Let nextIndex be 0.
  let nextIndex = 0;

  // Let length be the number of elements in pattern.
  const length = pattern.length;

  // Repeat, while beginIndex is an integer index into pattern
  while (pattern[beginIndex] !== undefined) {
    // Set endIndex to ! Call(%StringProto_indexOf%, pattern, « "}", beginIndex »).
    endIndex = String.prototype.indexOf.call(pattern, "}", beginIndex);

    // Assert: endIndex is not -1, otherwise the pattern would be malformed.
    if (endIndex === -1) {
      throw new RangeError(`The pattern: '${pattern}' is malformed`);
    }

    // If beginIndex is greater than nextIndex, then
    if (beginIndex > nextIndex) {
      // Let literal be a substring of pattern from position nextIndex, inclusive, to position beginIndex, exclusive.
      const literal = pattern.slice(nextIndex, beginIndex);

      // Add new part Record { [[Type]]: "literal", [[Value]]: literal } as a new element of the list result.
      result.push({
        type: "literal",
        value: literal
      });
    }

    // Let p be the substring of pattern from position beginIndex, exclusive, to position endIndex, exclusive.
    const p = pattern.slice(beginIndex + 1, endIndex);

    // Assert: p is "0".
    if (p !== "0") {
      throw new TypeError(`Expected ${p} to be "0"`);
    }

    // For each part in parts, do
    for (const part of parts) {
      // Add new part Record { [[Type]]: part.[[Type]], [[Value]]: part.[[Value]], [[Unit]]: unit } as a new element on the List result.
      if (part.type === "literal") {
        result.push({ ...part });
      } else {
        result.push({ ...part, unit });
      }
    }

    // Set nextIndex to endIndex + 1.
    nextIndex = endIndex + 1;

    // Set beginIndex to Call(%StringProto_indexOf%, pattern, « "{", nextIndex »).
    beginIndex = String.prototype.indexOf.call(pattern, "{", nextIndex);
  }

  // If nextIndex is less than length, then
  if (nextIndex < length) {
    // Let literal be the substring of pattern from position nextIndex, exclusive, to position length, exclusive.
    // CORRECTION: It should actually be from nextIndex, inclusive, to correctly partition text
    const literal = pattern.slice(nextIndex, length);

    // Add new part Record { [[Type]]: "literal", [[Value]]: literal } as a new element of the list result.
    result.push({
      type: "literal",
      value: literal
    });
  }

  return result;
}
