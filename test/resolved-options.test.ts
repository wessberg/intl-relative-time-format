/// <reference types="../src/typings" />
import test from "ava";
import "../src/test262";
import "../locale-data/en";
import "../locale-data/en-GB";

// tslint:disable

test("Can properly resolve options based on the given options. #1", t => {
	const rtf = new Intl.RelativeTimeFormat();
	const result = rtf.resolvedOptions();
	t.deepEqual(result, {
		locale: "en",
		style: "long", // Default value,
		numeric: "always", // Default value
		numberingSystem: "latn" // Default numbering system for 'en'
	});
});

test("Can properly resolve options based on the given options. #2", t => {
	const rtf = new Intl.RelativeTimeFormat("en", {
		numeric: "auto",
		style: "narrow"
	});
	const result = rtf.resolvedOptions();
	t.deepEqual(result, {
		locale: "en",
		style: "narrow",
		numeric: "auto",
		numberingSystem: "latn" // Default numbering system for 'en'
	});
});

test.only("Can properly resolve options based on the given options. #3", t => {
	const rtf = new Intl.RelativeTimeFormat("en-GB-oed");
	const result = rtf.resolvedOptions();

	t.deepEqual(result.locale, "en-GB");
});
