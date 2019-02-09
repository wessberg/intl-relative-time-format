import test from "ava";
import "../src/patch/auto-patch";
import "../../locale-data/en";

// tslint:disable

test("Can properly resolve options based on the given options. #1", t => {
	const rtf = new Intl.RelativeTimeFormat();
	const result = rtf.resolvedOptions();
	t.deepEqual(result, {
		locale: "en",
		numberingSystem: "latn", // Default numbering system for 'en'
		numeric: "auto", // Default value
		style: "long" // Default value
	});
});

test("Can properly resolve options based on the given options. #2", t => {
	const rtf = new Intl.RelativeTimeFormat("en", {
		numeric: "always",
		style: "narrow"
	});
	const result = rtf.resolvedOptions();
	t.deepEqual(result, {
		locale: "en",
		numberingSystem: "latn", // Default numbering system for 'en'
		numeric: "always",
		style: "narrow"
	});
});
