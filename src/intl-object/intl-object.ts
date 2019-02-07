import { Locale } from "../locale/locale";

export interface IntlObjectResolvedOptions {
  minimumIntegerDigits: number;
  minimumFractionDigits: number;
  maximumFractionDigits: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
}

export interface IntlPluralRulesResolvedOptions
  extends IntlObjectResolvedOptions {
  locale: Locale;
  type: string;
}

export interface IntlObject {
  resolvedOptions(): IntlObjectResolvedOptions;
}

export interface IntlPluralRules extends IntlObject {
  select(n: number): string;
  resolvedOptions(): IntlPluralRulesResolvedOptions;
}

export interface IntlPluralRulesConstructor {
  new (locale: Locale): IntlPluralRules;
}
