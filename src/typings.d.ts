declare namespace Intl {
	function getCanonicalLocales (locales: string|string[]|undefined): string[];

	type Locale = string;
	type Locales = Locale[];

	type LocaleMatcher = "lookup"|"best fit";
	type Style = "long"|"short"|"narrow";
	type Numeric = "always"|"auto";
	type NumberingSystem = string;

	type SingularRelativeTimeUnit =
		"second"
		|"minute"
		|"hour"
		|"day"
		|"week"
		|"month"
		|"quarter"
		|"year";

	interface ResolvedRelativeTimeFormatOptions {
		numberingSystem: NumberingSystem;
		locale: Locale;
		style: Style;
		numeric: Numeric;
	}

	interface SupportedLocalesOptions {
		localeMatcher: LocaleMatcher;
	}

	export interface PartitionBase {
		value: string;
	}

	export interface UnitPartitionBase extends PartitionBase {
		unit: SingularRelativeTimeUnit;
	}

	export interface LiteralPartition extends PartitionBase {
		type: "literal";
	}

	export interface UnitIntegerPartition extends UnitPartitionBase {
		type: "integer";
	}

	export type UnitPartition =
		|LiteralPartition
		|UnitIntegerPartition;

	export type UnitPartitions = ReadonlyArray<UnitPartition>;

	type RelativeTimeUnit =
		SingularRelativeTimeUnit
		|"seconds"
		|"minutes"
		|"hours"
		|"days"
		|"weeks"
		|"months"
		|"quarters"
		|"years";

	interface RelativeTimeFormatOptions {
		localeMatcher: LocaleMatcher;
		style: Style;
		numeric: Numeric;
	}

	class RelativeTimeFormat {
		public [Symbol.toStringTag] = "Intl.RelativeTimeFormat";

		constructor (locales?: Locale|Locales|undefined, options?: Partial<RelativeTimeFormatOptions>);

		public static supportedLocalesOf (locales: Locale|Locales, options?: SupportedLocalesOptions|undefined): Locales;

		public format (value: number, unit: RelativeTimeUnit): string;

		public formatToParts (value: number, unit: RelativeTimeUnit): UnitPartitions;

		public resolvedOptions (): ResolvedRelativeTimeFormatOptions;
	}
}
