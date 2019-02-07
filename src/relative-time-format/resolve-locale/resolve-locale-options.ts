import { RelevantExtensionKey } from "../../relevant-extension-key/relevant-extension-key";
import { ExtendedSingularRelativeTimeUnit } from "../../unit/singular-relative-time-unit";
import { LocaleMatcher } from "../../locale-matcher/locale-matcher";

export interface ResolveLocaleOptions {
  key?: ExtendedSingularRelativeTimeUnit | RelevantExtensionKey;
  localeMatcher: LocaleMatcher;
}
