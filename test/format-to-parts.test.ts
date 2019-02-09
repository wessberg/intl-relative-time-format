import test from "ava";
import "../src/patch/auto-patch";
import "../../locale-data/en";

// tslint:disable

test("Supports the 'day' unit with default options. #1", t => {
	const rtf = new Intl.RelativeTimeFormat("en");
	const result = rtf.formatToParts(-1, "day");
	t.deepEqual(result, [
		{
			type: "literal",
			value: "yesterday"
		}
	]);
});

test("Supports the 'day' unit with default options. #2", t => {
	const rtf = new Intl.RelativeTimeFormat("en");
	const result = rtf.formatToParts(1, "day");
	t.deepEqual(result, [
		{
			type: "literal",
			value: "tomorrow"
		}
	]);
});

test("Supports the 'day' unit with default options. #3", t => {
	const rtf = new Intl.RelativeTimeFormat("en");
	const result = rtf.formatToParts(0, "day");
	t.deepEqual(result, [
		{
			type: "literal",
			value: "today"
		}
	]);
});

test("Supports the 'day' unit with default options. #4", t => {
	const rtf = new Intl.RelativeTimeFormat("en");
	const result = rtf.formatToParts(-1.1, "day");

	t.deepEqual(result, [
		{
			type: "integer",
			value: "1.1",
			unit: "day"
		},
		{
			type: "literal",
			value: " days ago"
		}
	]);
});

test("Supports the 'quarter' unit with style 'short'. #1", t => {
	const rtf = new Intl.RelativeTimeFormat("en", {style: "short"});
	const result = rtf.formatToParts(1, "quarter");
	t.deepEqual(result, [
		{
			type: "literal",
			value: "next qtr."
		}
	]);
});

test("Supports the 'week' unit with style 'short' and numeric 'always'. #1", t => {
	const rtf = new Intl.RelativeTimeFormat("en", {
		style: "short",
		numeric: "always"
	});
	const result = rtf.formatToParts(1, "week");
	t.deepEqual(result, [
		{
			type: "literal",
			value: "in "
		},
		{
			type: "integer",
			value: "1",
			unit: "week"
		},
		{
			type: "literal",
			value: " wk."
		}
	]);
});
