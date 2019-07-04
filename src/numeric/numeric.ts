import {ElementOf} from "../util/element-of";

export const NUMERIC = ["always", "auto"] as const;

export type Numeric = ElementOf<typeof NUMERIC>;
