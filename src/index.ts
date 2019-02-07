import { SUPPORTS_RELATIVE_TIME_FORMAT } from "./support/supports-relative-time-format";
import { patch } from "./patch/patch";

if (!SUPPORTS_RELATIVE_TIME_FORMAT) {
  patch();
}
