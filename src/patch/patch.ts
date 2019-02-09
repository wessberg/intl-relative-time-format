import {RelativeTimeFormat} from "../relative-time-format/relative-time-format/relative-time-format";

/**
 * Patches Intl with Intl.RelativeTimeFormat
 */
export function patch(): void {
	if (typeof Intl === "undefined") {
		throw new TypeError(
			`Could not define Intl.RelativeTimeFormat: Expected 'Intl' to exist. Remember to include polyfills for Intl.NumberFormat, Intl.getCanonicalLocales, and Intl.PluralRules before applying this polyfill`
		);
	}
	Intl.RelativeTimeFormat = RelativeTimeFormat;
}
