/// <reference types="../src/typings" />
import test from "ava";
import "../src/test262";
import "../locale-data/en";

// tslint:disable

test("Supports the 'day' unit with default options. #1", t => {
	const rtf = new Intl.RelativeTimeFormat("en");
	const result = rtf.formatToParts(-1, "day");
	t.deepEqual(result, [
		{
			type: "integer",
			value: "1",
			unit: "day"
		},
		{
			type: "literal",
			value: " day ago"
		}
	]);
});

test("Supports the 'day' unit with default options. #2", t => {
	const rtf = new Intl.RelativeTimeFormat("en");
	const result = rtf.formatToParts(1, "day");
	t.deepEqual(result, [
		{
			type: "literal",
			value: "in "
		},
		{
			type: "integer",
			value: "1",
			unit: "day"
		},
		{
			type: "literal",
			value: " day"
		}
	]);
});

test("Supports the 'day' unit with default options. #3", t => {
	const rtf = new Intl.RelativeTimeFormat("en");
	const result = rtf.formatToParts(0, "day");
	t.deepEqual(result, [
		{
			type: "literal",
			value: "in "
		},
		{
			type: "integer",
			value: "0",
			unit: "day"
		},
		{
			type: "literal",
			value: " days"
		}
	]);
});

test("Supports the 'day' unit with default options. #4", t => {
	const rtf = new Intl.RelativeTimeFormat("en");
	const result = rtf.formatToParts(-1.1, "day");

	t.deepEqual(result, [
		{
			type: "integer",
			value: "1",
			unit: "day"
		},
		{
			type: "decimal",
			value: ".",
			unit: "day"
		},
		{
			type: "fraction",
			value: "1",
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
			value: "in "
		},
		{
			type: "integer",
			value: "1",
			unit: "quarter"
		},
		{
			type: "literal",
			value: " qtr."
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
