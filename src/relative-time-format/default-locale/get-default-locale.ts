import {Locale} from "../../locale/locale";

/**
 * Must represent the structurally valid (6.2.2) and canonicalized (6.2.3) BCP 47 language tag for the host environment's current locale.
 *
 * https://tc39.github.io/ecma402/#sec-defaultlocale
 * @type {Locale?}
 */
let _defaultLocale: Locale | undefined;

/**
 * Sets the default locale
 * @param {Locale} locale
 */
export function setDefaultLocale(locale: Locale): void {
	_defaultLocale = locale;
}

/**
 * The DefaultLocale abstract operation returns a String value representing the structurally valid (6.2.2) and canonicalized (6.2.3) BCP 47 language tag for the host environment's current locale.
 * https://tc39.github.io/ecma402/#sec-defaultlocale
 * @return {Locale | undefined}
 */
export function getDefaultLocale(): Locale | undefined {
	return _defaultLocale;
}

/**
 * Retrieves the default locale if it is set, and throws otherwise
 * @return {Locale}
 */
export function ensureDefaultLocale(): Locale {
	if (_defaultLocale == null) {
		throw new ReferenceError(`Could not determine locale: No default locale has been configured`);
	}
	return _defaultLocale;
}
