import {Locale} from "./locale";
import {ExtendedSingularRelativeTimeUnit} from "../unit/singular-relative-time-unit";
import {RelevantExtensionKey} from "../relevant-extension-key/relevant-extension-key";

export type LocaleDataEntryValue = {
	future: Record<string, string>;
	past: Record<string, string>;
} & Record<string, string>;

export type LocaleDataEntry = {
	[Key in ExtendedSingularRelativeTimeUnit | RelevantExtensionKey]: Key extends ExtendedSingularRelativeTimeUnit ? LocaleDataEntryValue | undefined : string[] | undefined
};

export interface InputLocaleDataEntry {
	locale: Locale;
	data: LocaleDataEntry;
}

export type LocaleData = {[Key in Locale]?: LocaleDataEntry};
