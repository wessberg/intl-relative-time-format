import {ElementOf} from "../util/element-of";

export const STYLE = ["long", "short", "narrow"] as const;

export type Style = ElementOf<typeof STYLE>;
