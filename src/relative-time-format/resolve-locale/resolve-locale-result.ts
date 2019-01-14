import {Locale} from "../../locale/locale";
import {RelevantExtensionKey} from "../../relevant-extension-key/relevant-extension-key";

export type ResolveLocaleResult = {
	[Key in RelevantExtensionKey|"dataLocale"|"locale"]: Key extends RelevantExtensionKey ? string : Locale;
};