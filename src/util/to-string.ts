/**
 * The abstract operation ToString converts argument to a value of type String
 * https://tc39.es/ecma262/#sec-tostring
 * @param {*} argument
 * @returns {boolean}
 */
export function toString(argument: unknown): string {
	return argument + "";
}
