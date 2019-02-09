import {RelativeTimeFormat} from "../relative-time-format/relative-time-format";
import {RelativeTimeUnit} from "../../unit/relative-time-unit";
import {partitionRelativeTimePattern} from "../partition-relative-time-pattern/partition-relative-time-pattern";

/**
 * The FormatRelativeTime abstract operation is called with arguments relativeTimeFormat
 * (which must be an object initialized as a RelativeTimeFormat), value (which must be a Number value),
 * and unit (which must be a String denoting the value unit) and performs the following steps:
 *
 * http://tc39.github.io/proposal-intl-relative-time/#sec-FormatRelativeTime
 * @param {RelativeTimeFormat} relativeTimeFormat
 * @param {number} value
 * @param {RelativeTimeUnit} unit
 * @return {string}
 */
export function formatRelativeTime(relativeTimeFormat: RelativeTimeFormat, value: number, unit: RelativeTimeUnit): string {
	// Let parts be ? PartitionRelativeTimePattern(relativeTimeFormat, value, unit).
	const parts = partitionRelativeTimePattern(relativeTimeFormat, value, unit);

	// Let result be an empty String.
	let result = "";

	// For each part in parts, do
	for (const part of parts) {
		// Set result to the string-concatenation of result and part.[[Value]].
		result += part.value;
	}

	// Return result.
	return result;
}
