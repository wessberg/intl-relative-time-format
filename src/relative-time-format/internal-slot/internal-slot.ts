import {RelativeTimeFormat} from "../relative-time-format/relative-time-format";
import {RelativeTimeFormatInstanceInternals} from "./relative-time-format-instance-internals";
import {RelativeTimeFormatStaticInternals} from "./relative-time-format-static-internals";

/**
 * A WeakMap between RelativeTimeFormat instances and their internal slot members
 * @type {WeakMap<RelativeTimeFormat, RelativeTimeFormatInstanceInternals>}
 */
export const RELATIVE_TIME_FORMAT_INSTANCE_INTERNAL_MAP: WeakMap<RelativeTimeFormat, RelativeTimeFormatInstanceInternals> = new WeakMap();

/**
 * Contains the internal static for RelativeTimeFormat
 * @type {RelativeTimeFormatStaticInternals}
 */
export const RELATIVE_TIME_FORMAT_STATIC_INTERNALS: RelativeTimeFormatStaticInternals = {

	/**
	 * The value of the [[RelevantExtensionKeys]] internal slot is « "nu" ».
	 * http://tc39.github.io/proposal-intl-relative-time/#sec-Intl.RelativeTimeFormat-internal-slots
	 */
	relevantExtensionKeys: ["nu"],

	/**
	 * The value of the [[LocaleData]] internal slot is implementation defined within the constraints described in 9.1
	 * http://tc39.github.io/proposal-intl-relative-time/#sec-Intl.RelativeTimeFormat-internal-slots
	 */
	localeData: {},

	/**
	 * The value of the [[AvailableLocales]] internal slot is implementation defined within the constraints described in 9.1
	 * http://tc39.github.io/proposal-intl-relative-time/#sec-Intl.RelativeTimeFormat-internal-slots
	 */
	availableLocales: []
};

/**
 * Sets the value for a property in an internal slot for an instance of RelativeTimeFormat
 * @param {RelativeTimeFormat} instance
 * @param {T} property
 * @param {RelativeTimeFormatInstanceInternals[T]} value
 */
export function setInternalSlot<T extends keyof RelativeTimeFormatInstanceInternals> (instance: RelativeTimeFormat, property: T, value: RelativeTimeFormatInstanceInternals[T]): void {
	let record = RELATIVE_TIME_FORMAT_INSTANCE_INTERNAL_MAP.get(instance);
	if (record == null) {
		record = {} as RelativeTimeFormatInstanceInternals;
		RELATIVE_TIME_FORMAT_INSTANCE_INTERNAL_MAP.set(instance, record);
	}

	// Update the property with the given value
	record[property] = value;
}

/**
 * Gets the value associated with the given property on the internal slots of the given instance of RelativeTimeFormat
 * @param {RelativeTimeFormat} instance
 * @param {T} property
 * @return {RelativeTimeFormatInstanceInternals[T]}
 */
export function getInternalSlot<T extends keyof RelativeTimeFormatInstanceInternals> (instance: RelativeTimeFormat, property: T): RelativeTimeFormatInstanceInternals[T] {
	const record = RELATIVE_TIME_FORMAT_INSTANCE_INTERNAL_MAP.get(instance);
	if (record == null) {
		throw new ReferenceError(`No internal slots has been allocated for the given instance of RelativeTimeFormat`);
	}

	return record[property];
}

/**
 * Returns true if the given property on the internal slots of the given instance of RelativeTimeFormat exists
 * @param {RelativeTimeFormat} instance
 * @param {T} property
 * @return {RelativeTimeFormatInstanceInternals[T]}
 */
export function hasInternalSlot<T extends keyof RelativeTimeFormatInstanceInternals> (instance: RelativeTimeFormat, property: T): boolean {
	const record = RELATIVE_TIME_FORMAT_INSTANCE_INTERNAL_MAP.get(instance);
	return record != null && property in record;
}