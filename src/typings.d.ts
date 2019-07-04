declare namespace Intl {
	function getCanonicalLocales(locales: string | string[] | undefined): string[];

	type Locale = string;
	type Locales = Locale[];

	type LocaleMatcher = "lookup" | "best fit";
	type Style = "long" | "short" | "narrow";
	type Numeric = "always" | "auto";
	type NumberingSystem = string;

	type SingularRelativeTimeUnit = "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year";

	interface ResolvedRelativeTimeFormatOptions {
		numberingSystem: NumberingSystem;
		locale: Locale;
		style: Style;
		numeric: Numeric;
	}

	interface SupportedLocalesOptions {
		localeMatcher: LocaleMatcher;
	}

	interface RelativeTimeFormatNonLiteralPart extends Intl.NumberFormatPart {
		type: "currency" | "decimal" | "fraction" | "group" | "infinity" | "integer" | "minusSign" | "nan" | "plusSign" | "percentSign";
		unit: SingularRelativeTimeUnit;
	}

	interface RelativeTimeFormatLiteralPart extends Intl.NumberFormatPart {
		type: "literal";
	}

	type RelativeTimeFormatPart = RelativeTimeFormatNonLiteralPart | RelativeTimeFormatLiteralPart;

	type RelativeTimeUnit = SingularRelativeTimeUnit | "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "quarters" | "years";

	interface RelativeTimeFormatOptions {
		localeMatcher: LocaleMatcher;
		style: Style;
		numeric: Numeric;
	}

	class RelativeTimeFormat {
		constructor(locales?: Locale | Locales | undefined, options?: Partial<RelativeTimeFormatOptions>);

		public static supportedLocalesOf(locales: Locale | Locales, options?: SupportedLocalesOptions | undefined): Locales;

		public format(value: number, unit: RelativeTimeUnit): string;

		public formatToParts(value: number, unit: RelativeTimeUnit): RelativeTimeFormatPart[];

		public resolvedOptions(): ResolvedRelativeTimeFormatOptions;
	}
}
