import {LocaleMatcher} from "../../locale-matcher/locale-matcher";
import {Style} from "../../style/style";
import {Numeric} from "../../numeric/numeric";

export interface RelativeTimeFormatOptions {
	localeMatcher: LocaleMatcher;
	style: Style;
	numeric: Numeric;
}