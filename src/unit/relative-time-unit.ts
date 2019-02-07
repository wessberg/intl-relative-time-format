import { SingularRelativeTimeUnit } from "./singular-relative-time-unit";

export type RelativeTimeUnit =
  | SingularRelativeTimeUnit
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks"
  | "months"
  | "quarters"
  | "years";
