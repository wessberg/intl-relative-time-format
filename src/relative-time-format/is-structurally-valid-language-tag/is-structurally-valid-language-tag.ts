import {Locale} from "../../locale/locale";
import {expBCP47Syntax, expSingletonDupes, expVariantDupes} from "../bcp47/bcp47-util";

/**
 * The IsStructurallyValidLanguageTag abstract operation verifies that the locale argument (which must be a String value)
 * represents a well-formed BCP 47 language tag as specified in RFC 5646 section 2.1, or successor,
 * does not include duplicate variant subtags, and does not include duplicate singleton subtags.
 * The abstract operation returns true if locale can be generated from the ABNF grammar in section 2.1 of the RFC,
 * starting with Language-Tag, and does not contain duplicate variant or singleton subtags (other than as a private use subtag).
 * It returns false otherwise. Terminal value characters in the grammar are interpreted as the Unicode equivalents of the ASCII octet values given.
 * @param {Locale} locale
 * @return {boolean}
 */
export function isStructurallyValidLanguageTag (locale: Locale): boolean {
	// represents a well-formed BCP 47 language tag as specified in RFC 5646
	if (!expBCP47Syntax.test(locale)) return false;

	// does not include duplicate variant subtags, and
	if (expVariantDupes.test(locale)) return false;

	// does not include duplicate singleton subtags.
	if (expSingletonDupes.test(locale)) return false;

	return true;
}