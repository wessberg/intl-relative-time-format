import {RelevantExtensionKey} from "../../relevant-extension-key/relevant-extension-key";
import {LocaleData} from "../../locale/locale-data";
import {Locales} from "../../locale/locales";

export interface RelativeTimeFormatStaticInternals {
	relevantExtensionKeys: RelevantExtensionKey[];
	localeData: LocaleData;
	availableLocales: Locales;
}
