import {RelativeTimeFormat} from "../relative-time-format/relative-time-format";
import {RelativeTimeUnit} from "../../unit/relative-time-unit";
import {ExtendedSingularRelativeTimeUnit, singularRelativeTimeUnit} from "../../unit/singular-relative-time-unit";
import {UnitPartitions} from "../../partition/partition";
import {partitionNumberPattern} from "../partition-number-pattern/partition-number-pattern";
import {getInternalSlot, hasInternalSlot} from "../internal-slot/internal-slot";
import {resolvePlural} from "../resolve-plural/resolve-plural";
import {makePartsList} from "../make-parts-list/make-parts-list";

/**
 * When the FormatRelativeTime abstract operation is called with arguments relativeTimeFormat,
 * value, and unit it returns a String value representing value (interpreted as a time value as specified in ES2016, 20.3.1.1)
 * according to the effective locale and the formatting options of relativeTimeFormat.
 * @param {RelativeTimeFormat} relativeTimeFormat
 * @param {number} value
 * @param {RelativeTimeUnit} unit
 * @returns {UnitPartitions}
 */
export function partitionRelativeTimePattern (relativeTimeFormat: RelativeTimeFormat, value: number, unit: RelativeTimeUnit): UnitPartitions {
	// Assert: relativeTimeFormat has an [[InitializedRelativeTimeFormat]] internal slot.
	if (!hasInternalSlot(relativeTimeFormat, "initializedRelativeTimeFormat")) {
		throw new TypeError(`Internal function called on incompatible receiver ${relativeTimeFormat.toString()}`);
	}

	// Assert: Type(value) is Number.
	if (typeof value !== "number") {
		throw new TypeError(`Argument: 'value' must be a number`);
	}
	// Assert: Type(unit) is String.
	if (typeof unit !== "string") {
		throw new TypeError(`Argument: 'unit' must be a string`);
	}

	// If value is NaN, +∞, or -∞, throw a RangeError exception.
	if (isNaN(value) || value === Infinity || value === -Infinity) {
		throw new RangeError(`Value need to be finite number`);
	}

	// Let unit be ? SingularRelativeTimeUnit(unit).
	unit = singularRelativeTimeUnit(unit);

	// Let fields be relativeTimeFormat.[[Fields]].
	const fields = getInternalSlot(relativeTimeFormat, "fields");

	// Let style be relativeTimeFormat.[[Style]].
	const style = getInternalSlot(relativeTimeFormat, "style");

	// If style is equal to "short", then let entry be the string-concatenation of unit and "-short".
	// Else if style is equal to "narrow", then let entry be the string-concatenation of unit and "-narrow".
	// Else let entry be unit.
	let entry = style === "short"
		? `${unit}-short` as ExtendedSingularRelativeTimeUnit
		: style === "narrow"
			? `${unit}-narrow` as ExtendedSingularRelativeTimeUnit
			: unit;

	// Let exists be ! HasProperty(fields, entry).
	let exists = entry in fields;

	// If exists is false, then
	if (!exists) {
		// Let entry be unit.
		entry = unit;
	}

	// Let patterns be ! Get(fields, entry).
	const patterns = fields[entry];

	// Make sure that the patterns are defined
	if (patterns == null) {
		throw new TypeError(`Could not match entry: '${entry}' inside fields for locale: '${getInternalSlot(relativeTimeFormat, "locale")}'`);
	}

	// Let numeric be relativeTimeFormat.[[Numeric]].
	const numeric = getInternalSlot(relativeTimeFormat, "numeric");

	// If numeric is equal to "auto", then
	if (numeric === "auto") {
		// Let exists be ! HasProperty(patterns, ! ToString(value)).
		exists = String(value) in patterns;

		// If exists is true, then
		if (exists) {
			// Let result be ! Get(patterns, ! ToString(value)).
			const result = patterns[String(value)];

			// Return a List containing the Record { [[Type]]: "literal", [[Value]]: result }.
			return [
				{
					type: "literal",
					value: result
				}
			];
		}
	}

	// If value is -0 or if value is less than 0, then let tl be "past".
	// Else let tl be "future".
	const tl = Object.is(value, -0) || value < 0 ? "past" : "future";

	// Let po be ! Get(patterns, tl).
	const po = patterns[tl];

	// Let fv be ! PartitionNumberPattern(relativeTimeFormat.[[NumberFormat]], value).
	const fv = partitionNumberPattern(
		relativeTimeFormat,
		value
	);

	// Let pr be ! ResolvePlural(relativeTimeFormat.[[PluralRules]], value).
	const pr = resolvePlural(relativeTimeFormat, value);

	// Let pattern be ! Get(po, pr).
	const pattern = po[pr];

	// Return ! MakePartsList(pattern, unit, fv).
	return makePartsList(pattern, unit, fv);
}