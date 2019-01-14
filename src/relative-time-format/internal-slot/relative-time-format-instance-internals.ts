import {Locale} from "../../locale/locale";
import {NumberingSystem} from "../../numbering-system/numbering-system";
import {Style} from "../../style/style";
import {Numeric} from "../../numeric/numeric";
import {LocaleDataEntry} from "../../locale/locale-data";
import {RelativeTimeFormat} from "../relative-time-format/relative-time-format";
import {IntlPluralRules} from "../../intl-object/intl-object";

export interface RelativeTimeFormatInstanceInternals {
	locale: Locale;
	numberingSystem: NumberingSystem;
	style: Style;
	numeric: Numeric;
	fields: LocaleDataEntry;
	pluralRules: IntlPluralRules;
	numberFormat: Intl.NumberFormat;
	initializedRelativeTimeFormat: RelativeTimeFormat;
}