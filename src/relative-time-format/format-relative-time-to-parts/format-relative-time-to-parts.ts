import {RelativeTimeFormat} from "../relative-time-format/relative-time-format";
import {RelativeTimeUnit} from "../../unit/relative-time-unit";
import {partitionRelativeTimePattern} from "../partition-relative-time-pattern/partition-relative-time-pattern";
import {UnitPartitions} from "../../partition/partition";

/**
 * The FormatRelativeTimeToParts abstract operation is called with arguments relativeTimeFormat
 * (which must be an object initialized as a RelativeTimeFormat), value (which must be a Number value),
 * and unit (which must be a String denoting the value unit)
 *
 * http://tc39.github.io/proposal-intl-relative-time/#sec-FormatRelativeTimeToParts
 * @param {RelativeTimeFormat} relativeTimeFormat
 * @param {number} value
 * @param {RelativeTimeUnit} unit
 * @return {UnitPartitions}
 */
export function formatRelativeTimeToParts(relativeTimeFormat: RelativeTimeFormat, value: number, unit: RelativeTimeUnit): UnitPartitions {
	return partitionRelativeTimePattern(relativeTimeFormat, value, unit);
}
