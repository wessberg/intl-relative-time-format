/**
 * The abstract operation IsPropertyKey determines if argument, which must be an ECMAScript language value, is a value that may be used as a property key.
 * https://tc39.es/ecma262/#sec-ispropertykey
 * @param {*} argument
 * @returns {boolean}
 */
export function isPropertyKey(argument: unknown): argument is PropertyKey {
	// If Type(argument) is String, return true.
	if (typeof argument === "string") return true;
	// If Type(argument) is Symbol, return true.
	if (typeof argument === "symbol") return true;
	// Return false.
	return false;
}
