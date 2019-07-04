/**
 * The abstract operation ToNumber converts argument to a value of type Number
 * https://tc39.es/ecma262/#sec-tonumber
 * @param {*} argument
 * @returns {boolean}
 */
export function toNumber(argument: unknown): number {
	return Number(argument);
}
