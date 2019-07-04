import {SingularRelativeTimeUnit} from "../unit/singular-relative-time-unit";

export interface RelativeTimeFormatNonLiteralPart extends Intl.NumberFormatPart {
	type: "currency" | "decimal" | "fraction" | "group" | "infinity" | "integer" | "minusSign" | "nan" | "plusSign" | "percentSign";
	unit: SingularRelativeTimeUnit;
}

export interface RelativeTimeFormatLiteralPart extends Intl.NumberFormatPart {
	type: "literal";
}

export type RelativeTimeFormatPart = RelativeTimeFormatNonLiteralPart | RelativeTimeFormatLiteralPart;
