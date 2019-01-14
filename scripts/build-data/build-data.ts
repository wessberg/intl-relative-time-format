// @ts-ignore
import {extractCurrencyInfoById, extractDefaultNumberSystemId, extractFields, extractNumberSymbols, extractPluralRuleFunction, localeIds, numberSystemIds} from "cldr";
import {sync} from "find-up";
import {dirname, join} from "path";
import {existsSync, mkdirSync} from "fs";
import {createProgramFromSources, SourceFileInput} from "./ts/create-program-from-sources";
import {ExtendedSingularRelativeTimeUnit, VALID_EXTENDED_SINGULAR_RELATIVE_TIME_UNIT_VALUES} from "../../src/unit/singular-relative-time-unit";
import {LocaleDataEntry, LocaleDataEntryValue} from "../../src/locale/locale-data";
import stringify from "javascript-stringify";
import {canonicalizeLanguageTag} from "../../src/relative-time-format/canonicalize-language-tag/canonicalize-language-tag";

// The directory on disk to write locale files to
const OUTPUT_DIRECTORY = join(dirname(sync("package.json")!), "locale-data");

// Ensure that the output directory exists
if (!existsSync(OUTPUT_DIRECTORY)) {
	mkdirSync(OUTPUT_DIRECTORY);
}
// Prepare sources
const sources: SourceFileInput[] = [];

// Loop through all locales
for (const localeId of localeIds) {
	const locale = canonicalizeLanguageTag(localeId.replace(/_/g, "-"));
	console.log(`Building data for locale: ${locale} (localeId: ${localeId})`);

	// Take the default NumberSystem for the locale
	const nu = [extractDefaultNumberSystemId(localeId)];

	// Prepare relative time formatting data for the locale
	const relativeTimeLocaleData = {} as { [Key in ExtendedSingularRelativeTimeUnit]: LocaleDataEntryValue|undefined };

	const fields = extractFields(localeId);

	for (const [key, fieldEntry] of Object.entries(fields) as [ExtendedSingularRelativeTimeUnit, { relative?: { [key: string]: string }; relativeTime?: { future: Record<string, string>; past: Record<string, string> } }][]) {
		if (fieldEntry.relativeTime == null || !VALID_EXTENDED_SINGULAR_RELATIVE_TIME_UNIT_VALUES.includes(key)) continue;

		// @ts-ignore
		relativeTimeLocaleData[key] = {
			...(fieldEntry.relative != null
					? fieldEntry.relative
					: {}
			),
			future: fieldEntry.relativeTime.future,
			past: fieldEntry.relativeTime.past
		};
	}

	// Prepare the final LocaleDataEntry
	const localeDataEntry: LocaleDataEntry = {
		...relativeTimeLocaleData,
		nu
	};

	// Add the source to the sources
	sources.push({
		fileName: join(OUTPUT_DIRECTORY, `${locale}.ts`),
		text: `\
		if ("__addLocaleData" in Intl.RelativeTimeFormat) {
			Intl.RelativeTimeFormat.__addLocaleData({
				locale: "${locale}",
				data: ${stringify(localeDataEntry, undefined, "  ")}
			});
		}`
	});
}

console.log(`Emitting locale data...`);

// Create a Program from the SourceFiles
const program = createProgramFromSources(sources);

// Emit all of them!
program.emit();

console.log(`Successfully built data!`);