import {RelativeTimeUnit} from "./relative-time-unit";

export type SingularRelativeTimeUnit =
	"second"
	|"minute"
	|"hour"
	|"day"
	|"week"
	|"month"
	|"quarter"
	|"year";

export type ExtendedSingularRelativeTimeUnit =
	SingularRelativeTimeUnit
	|"second-narrow"
	|"second-short"
	|"minute-narrow"
	|"minute-short"
	|"hour-narrow"
	|"hour-short"
	|"day-narrow"
	|"day-short"
	|"week-narrow"
	|"week-short"
	|"month-narrow"
	|"month-short"
	|"quarter-narrow"
	|"quarter-short"
	|"year-narrow"
	|"year-short";

const VALID_SINGULAR_RELATIVE_TIME_UNIT_VALUES: SingularRelativeTimeUnit[] = ["second", "minute", "hour", "day", "week", "month", "quarter", "year"];

export const VALID_EXTENDED_SINGULAR_RELATIVE_TIME_UNIT_VALUES: ExtendedSingularRelativeTimeUnit[] = [
	...VALID_SINGULAR_RELATIVE_TIME_UNIT_VALUES,
	"second-narrow",
	"second-short",
	"minute-narrow",
	"minute-short",
	"hour-narrow",
	"hour-short",
	"day-narrow",
	"day-short",
	"week-narrow",
	"week-short",
	"month-narrow",
	"month-short",
	"quarter-narrow",
	"quarter-short",
	"year-narrow",
	"year-short"
];

/**
 * Sanitizes a RelativeTimeUnit into a SingularRelativeTimeUnit
 *
 * http://tc39.github.io/proposal-intl-relative-time/#sec-singularrelativetimeunit
 * @param {RelativeTimeUnit} unit
 * @return {SingularRelativeTimeUnit}
 */
export function singularRelativeTimeUnit (unit: RelativeTimeUnit): SingularRelativeTimeUnit {
	// Assert: Type(unit) is String.
	if (typeof unit !== "string") {
		throw new TypeError(`unit: '${unit}' must be a string`);
	}

	// If unit is "seconds", return "second".
	if (unit === "seconds") return "second";

	// If unit is "minutes", return "minute".
	if (unit === "minutes") return "minute";

	// If unit is "hours", return "hour".
	if (unit === "hours") return "hour";

	// If unit is "days", return "day".
	if (unit === "days") return "day";

	// If unit is "weeks", return "week".
	if (unit === "weeks") return "week";

	// If unit is "months", return "month".
	if (unit === "months") return "month";

	// If unit is "quarters", return "quarter".
	if (unit === "quarters") return "quarter";

	// If unit is "years", return "year".
	if (unit === "years") return "year";

	// If unit is not one of "second", "minute", "hour", "day", "week", "month", "quarter", or "year", throw a RangeError exception.
	if (!(VALID_SINGULAR_RELATIVE_TIME_UNIT_VALUES.some(validUnit => validUnit === unit))) {
		throw new RangeError(`Unit: '${unit}' must be one of: ${VALID_SINGULAR_RELATIVE_TIME_UNIT_VALUES.map(val => `"${val}"`).join(", ")}`);
	}

	// Return unit.
	return unit;
}