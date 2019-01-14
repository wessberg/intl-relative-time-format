import {Locale} from "../../locale/locale";
import {Locales} from "../../locale/locales";
import {RelativeTimeFormatOptions} from "./relative-time-format-options";
import {canonicalizeLocaleList} from "../canonicalize-locale-list/canonicalize-locale-list";
import {toObject} from "../../util/to-object";
import {InputLocaleDataEntry} from "../../locale/locale-data";
import {resolveLocale} from "../resolve-locale/resolve-locale";
import {supportedLocales} from "../supported-locales/supported-locales";
import {SupportedLocalesOptions} from "../supported-locales/supported-locales-options";
import {RelativeTimeUnit} from "../../unit/relative-time-unit";
import {formatRelativeTime} from "../format-relative-time/format-relative-time";
import {getInternalSlot, hasInternalSlot, RELATIVE_TIME_FORMAT_STATIC_INTERNALS, setInternalSlot} from "../internal-slot/internal-slot";
import {IntlPluralRulesConstructor} from "../../intl-object/intl-object";
import {UnitPartitions} from "../../partition/partition";
import {formatRelativeTimeToParts} from "../format-relative-time-to-parts/format-relative-time-to-parts";
import {ResolvedRelativeTimeFormatOptions} from "./resolved-relative-time-format-options";
import {getDefaultLocale, setDefaultLocale} from "../default-locale/get-default-locale";

/**
 * The RelativeTimeFormat constructor is the %RelativeTimeFormat% intrinsic object and a standard built-in property of the Intl object.
 * Behaviour common to all service constructor properties of the Intl object is specified in 9.1.
 *
 * http://tc39.github.io/proposal-intl-relative-time/#sec-intl-relativetimeformat-constructor
 */
export class RelativeTimeFormat {

	/**
	 * The initial value of the @@toStringTag property is the string value "Intl.RelativeTimeFormat".
	 * This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
	 * @type {string}
	 */
	public [Symbol.toStringTag] = "Intl.RelativeTimeFormat";

	constructor (locales?: Locale|Locales|undefined, options?: Partial<RelativeTimeFormatOptions>) {
		// If NewTarget is undefined, throw a TypeError exception.
		if (new.target === undefined) {
			throw new TypeError(`Constructor Intl.RelativeTimeFormat requires 'new'`);
		}

		// The following operations comes from the 'InitializeRelativeFormat' abstract operation (http://tc39.github.io/proposal-intl-relative-time/#sec-InitializeRelativeTimeFormat)
		// Let requestedLocales be ? CanonicalizeLocaleList(locales).
		const requestedLocales = canonicalizeLocaleList(locales);

		// If options is undefined, then (a) Let options be ObjectCreate(null).
		// Else (b) Let options be ? ToObject(options).
		options = options === undefined
			? Object.create(null) as Partial<RelativeTimeFormatOptions>
			: toObject(options);

		// Let opt be a new Record.
		const opt = {} as RelativeTimeFormatOptions;

		// Let matcher be ? GetOption(options, "localeMatcher", "string", «"lookup", "best fit"»,  "best fit").
		const matcher = options.localeMatcher != null ? options.localeMatcher : "best fit";

		// Set opt.[[LocaleMatcher]] to matcher.
		opt.localeMatcher = matcher;

		// Let localeData be %RelativeTimeFormat%.[[LocaleData]].
		const localeData = RELATIVE_TIME_FORMAT_STATIC_INTERNALS.localeData;

		// Let r be ResolveLocale(%RelativeTimeFormat%.[[AvailableLocales]], requestedLocales, opt, %RelativeTimeFormat%.[[RelevantExtensionKeys]], localeData).
		const r = resolveLocale(
			RELATIVE_TIME_FORMAT_STATIC_INTERNALS.availableLocales,
			requestedLocales,
			opt,
			RELATIVE_TIME_FORMAT_STATIC_INTERNALS.relevantExtensionKeys,
			localeData
		);

		// Let locale be r.[[Locale]].
		const locale = r.locale;

		// Set relativeTimeFormat.[[Locale]] to locale.
		setInternalSlot(this, "locale", locale);

		// Set relativeTimeFormat.[[NumberingSystem]] to r_.[[nu]].
		setInternalSlot(this, "numberingSystem", r.nu);

		// Let dataLocale be r.[[DataLocale]].
		const dataLocale = r.dataLocale;

		// Let s be ? GetOption(options, "style", "string", «"long", "short", "narrow"», "long").
		const s = options.style != null ? options.style : "long";

		// Set relativeTimeFormat.[[Style]] to s.
		setInternalSlot(this, "style", s);

		// Let numeric be ? GetOption(options, "numeric", "string", «"always", "auto"», "always").
		const numeric = options.numeric != null ? options.numeric : "auto";

		// Set relativeTimeFormat.[[Numeric]] to numeric.
		setInternalSlot(this, "numeric", numeric);

		// Let fields be ! Get(localeData, dataLocale).
		const fields = localeData[dataLocale];

		// Assert: fields is an object (see 1.3.3).
		if (!(fields instanceof Object)) {
			throw new TypeError(`Expected the LocaleDataEntry for locale: '${dataLocale}' to be an Object`);
		}

		// Set relativeTimeFormat.[[Fields]] to fields.
		setInternalSlot(this, "fields", fields);

		// Let relativeTimeFormat.[[NumberFormat]] be ! Construct(%NumberFormat%, « locale »).
		setInternalSlot(this, "numberFormat", new Intl.NumberFormat(locale));

		// Let relativeTimeFormat.[[PluralRules]] be ! Construct(%PluralRules%, « locale »).
		// tslint:disable-next-line:no-any
		setInternalSlot(this, "pluralRules", new (Intl as unknown as {PluralRules: IntlPluralRulesConstructor}).PluralRules(locale));

		// Intl.RelativeTimeFormat instances have an [[InitializedRelativeTimeFormat]] internal slot.
		setInternalSlot(this, "initializedRelativeTimeFormat", this);
	}

	/**
	 * Adds locale data to the internal slot.
	 * This API exactly mimics that of the Intl polyfill (https://github.com/andyearnshaw/Intl.js)
	 * @private
	 * @internal
	 * @param {InputLocaleDataEntry} data
	 * @param {Locale} locale
	 */
	protected static __addLocaleData ({data, locale}: InputLocaleDataEntry): void {
		// Use the locale as the default one if none is configured
		const defaultLocale = getDefaultLocale();
		if (defaultLocale == null) {
			setDefaultLocale(locale);
		}

		RELATIVE_TIME_FORMAT_STATIC_INTERNALS.localeData[locale] = data;
		if (!RELATIVE_TIME_FORMAT_STATIC_INTERNALS.availableLocales.includes(locale)) {
			RELATIVE_TIME_FORMAT_STATIC_INTERNALS.availableLocales.push(locale);
		}
	}

	/**
	 * Returns an array containing those of the provided locales that are supported without having to fall back to the runtime's default locale.
	 * @param {Locale | Locales} locales
	 * @param {SupportedLocalesOptions | undefined} options
	 * @return {Locales}
	 */
	public static supportedLocalesOf (locales: Locale|Locales, options?: SupportedLocalesOptions|undefined): Locales {
		// Let availableLocales be %RelativeTimeFormat%.[[AvailableLocales]].
		const availableLocales = RELATIVE_TIME_FORMAT_STATIC_INTERNALS.availableLocales;

		// Let requestedLocales be ? CanonicalizeLocaleList(locales).
		const requestedLocales = canonicalizeLocaleList(locales);
		return supportedLocales(availableLocales, requestedLocales, options);
	}

	/**
	 * Method that formats a value and unit according to the locale and formatting options of this Intl.RelativeTimeFormat object.
	 * @param {number} value
	 * @param {RelativeTimeUnit} unit
	 * @return {string}
	 */
	public format (value: number, unit: RelativeTimeUnit): string {
		// Let relativeTimeFormat be the this value.
		const relativeTimeFormat = this;

		// If Type(relativeTimeFormat) is not Object, throw a TypeError exception.
		if (!(relativeTimeFormat instanceof Object)) {
			throw new TypeError(`Method Intl.RelativeTimeFormat.prototype.format called on incompatible receiver ${this.toString()}`);
		}

		// If relativeTimeFormat does not have an [[InitializedRelativeTimeFormat]] internal slot, throw a TypeError exception.
		if (!hasInternalSlot(relativeTimeFormat, "initializedRelativeTimeFormat")) {
			throw new TypeError(`Method Intl.RelativeTimeFormat.prototype.format called on incompatible receiver ${this.toString()}`);
		}

		// Let value be ? ToNumber(value).
		value = Number(value);
		// Let unit be ? ToString(unit).
		unit = String(unit) as RelativeTimeUnit;

		// Return ? FormatRelativeTime(relativeTimeFormat, value, unit).
		return formatRelativeTime(relativeTimeFormat, value, unit);
	}

	/**
	 * A version of the 'format' method that returns an array of objects which represent "parts" of the object,
	 * separating the formatted number into its constituent parts and separating it from other surrounding text
	 * @param {number} value
	 * @param {RelativeTimeUnit} unit
	 * @return {UnitPartitions}
	 */
	public formatToParts (value: number, unit: RelativeTimeUnit): UnitPartitions {
		// Let relativeTimeFormat be the this value.
		const relativeTimeFormat = this;

		// If Type(relativeTimeFormat) is not Object, throw a TypeError exception.
		if (!(relativeTimeFormat instanceof Object)) {
			throw new TypeError(`Method Intl.RelativeTimeFormat.prototype.format called on incompatible receiver ${this.toString()}`);
		}

		// If relativeTimeFormat does not have an [[InitializedRelativeTimeFormat]] internal slot, throw a TypeError exception.
		if (!hasInternalSlot(relativeTimeFormat, "initializedRelativeTimeFormat")) {
			throw new TypeError(`Method Intl.RelativeTimeFormat.prototype.format called on incompatible receiver ${this.toString()}`);
		}

		// Let value be ? ToNumber(value).
		value = Number(value);
		// Let unit be ? ToString(unit).
		unit = String(unit) as RelativeTimeUnit;

		// Return ? FormatRelativeTimeToParts(relativeTimeFormat, value, unit).
		return formatRelativeTimeToParts(relativeTimeFormat, value, unit);
	}

	/**
	 * This method provides access to the locale and options computed during initialization of the object.
	 * @returns {ResolvedRelativeTimeFormatOptions}
	 */
	public resolvedOptions (): ResolvedRelativeTimeFormatOptions {
		// Let relativeTimeFormat be the this value.
		const relativeTimeFormat = this;

		// If Type(relativeTimeFormat) is not Object, throw a TypeError exception.
		if (!(relativeTimeFormat instanceof Object)) {
			throw new TypeError(`Method Intl.RelativeTimeFormat.prototype.format called on incompatible receiver ${this.toString()}`);
		}

		// If relativeTimeFormat does not have an [[InitializedRelativeTimeFormat]] internal slot, throw a TypeError exception.
		if (!hasInternalSlot(relativeTimeFormat, "initializedRelativeTimeFormat")) {
			throw new TypeError(`Method Intl.RelativeTimeFormat.prototype.format called on incompatible receiver ${this.toString()}`);
		}

		const locale = getInternalSlot(this, "locale");
		const numberingSystem = getInternalSlot(this, "numberingSystem");
		const style = getInternalSlot(this, "style");
		const numeric = getInternalSlot(this, "numeric");

		return {
			locale,
			numberingSystem,
			style,
			numeric
		};
	}
}