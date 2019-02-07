import { NumberingSystem } from "../../numbering-system/numbering-system";
import { Style } from "../../style/style";
import { Numeric } from "../../numeric/numeric";
import { Locale } from "../../locale/locale";

export interface ResolvedRelativeTimeFormatOptions {
  numberingSystem: NumberingSystem;
  locale: Locale;
  style: Style;
  numeric: Numeric;
}
