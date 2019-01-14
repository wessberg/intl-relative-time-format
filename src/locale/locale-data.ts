import {Locale} from "./locale";
import {ExtendedSingularRelativeTimeUnit} from "../unit/singular-relative-time-unit";
import {RelevantExtensionKey} from "../relevant-extension-key/relevant-extension-key";

export interface LocaleDataEntryValue {
	[key: string]: typeof key extends "future"|"past" ? Record<string, string> : string;

	// @ts-ignore
	future: Record<string, string>;
	// @ts-ignore
	past: Record<string, string>;
}

export type LocaleDataEntry = {
	[Key in ExtendedSingularRelativeTimeUnit|RelevantExtensionKey]: Key extends ExtendedSingularRelativeTimeUnit ? LocaleDataEntryValue|undefined : string[]|undefined;
};

export interface InputLocaleDataEntry {
	locale: Locale;
	data: LocaleDataEntry;
}

export type LocaleData = {
	[Key in Locale]?: LocaleDataEntry;
};