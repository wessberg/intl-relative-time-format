import test from "ava";
import "../src/patch/auto-patch";
import "../../locale-data/en";

// tslint:disable

test("Will use the default locale if none is given. #1", t => {
  const rtf = new Intl.RelativeTimeFormat();
  const result = rtf.format(-1, "day");
  t.deepEqual(result, "yesterday");
});

test("Supports the 'day' unit with default options. #1", t => {
  const rtf = new Intl.RelativeTimeFormat("en");
  const result = rtf.format(-1, "day");
  t.deepEqual(result, "yesterday");
});

test("Supports the 'day' unit with default options. #2", t => {
  const rtf = new Intl.RelativeTimeFormat("en");
  const result = rtf.format(1, "day");
  t.deepEqual(result, "tomorrow");
});

test("Supports the 'day' unit with default options. #3", t => {
  const rtf = new Intl.RelativeTimeFormat("en");
  const result = rtf.format(0, "day");
  t.deepEqual(result, "today");
});

test("Supports the 'day' unit with default options. #4", t => {
  const rtf = new Intl.RelativeTimeFormat("en");
  const result = rtf.format(-1.1, "day");
  t.deepEqual(result, "1.1 days ago");
});

test("Understands plural version of units as aliases of the singular ones. #1", t => {
  const rtf = new Intl.RelativeTimeFormat("en");
  const result = rtf.format(-1.1, "days");
  t.deepEqual(result, "1.1 days ago");
});

test("Supports the 'quarter' unit with style 'short'. #1", t => {
  const rtf = new Intl.RelativeTimeFormat("en", { style: "short" });
  const result = rtf.format(1, "quarter");
  t.deepEqual(result, "next qtr.");
});

test("Supports the 'week' unit with style 'short' and numeric 'always'. #1", t => {
  const rtf = new Intl.RelativeTimeFormat("en", {
    style: "short",
    numeric: "always"
  });
  const result = rtf.format(1, "week");
  t.deepEqual(result, "in 1 wk.");
});

test("Supports the 'quarter' unit. #1", t => {
  const rtf = new Intl.RelativeTimeFormat("en");
  const result = rtf.format(1, "quarter");
  t.deepEqual(result, "next quarter");
});

test("Supports the 'second' unit. #1", t => {
  const rtf = new Intl.RelativeTimeFormat("en");
  const result = rtf.format(1, "second");
  t.deepEqual(result, "in 1 second");
});

test("Supports the 'second' unit. #2", t => {
  const rtf = new Intl.RelativeTimeFormat("en");
  const result = rtf.format(2, "second");
  t.deepEqual(result, "in 2 seconds");
});

test("Differentiates between -0 and +0. #1", t => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });
  const result = rtf.format(-0, "second");
  t.deepEqual(result, "0 seconds ago");
});

test("Differentiates between -0 and +0. #2", t => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });
  const result = rtf.format(0, "second");
  t.deepEqual(result, "in 0 seconds");
});
