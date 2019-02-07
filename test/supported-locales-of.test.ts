import test from "ava";
import "../src/patch/auto-patch";
import "../../locale-data/en";

// tslint:disable

test("Can properly resolve supported locales based on the given options. #1", t => {
  t.deepEqual(
    Intl.RelativeTimeFormat.supportedLocalesOf(["foo", "bar", "en-US"]),
    ["en-US"]
  );
});
