import {ElementOf} from "../util/element-of";

export const LOCALE_MATCHER = ["lookup", "best fit"] as const;

export type LocaleMatcher = ElementOf<typeof LOCALE_MATCHER>;
