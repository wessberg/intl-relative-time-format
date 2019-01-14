/**
 * The internal comparison abstract operation SameValueNonNumber(x, y), where neither x nor y are Number values, produces true or false.
 *
 * https://tc39.github.io/ecma262/#sec-samevaluenonnumber
 * @param {Exclude<*, number>} x
 * @param {Exclude<*, number>} y
 * @return {boolean}
 */
function sameValueNonNumber (x: Exclude<unknown, number>, y: Exclude<unknown, number>): boolean {
	// Assert: Type(x) is not Number.
	if (typeof x === "number") {
		throw new TypeError(`First argument 'x' must not be a number`);
	}

	// Assert: Type(x) is the same as Type(y).
	if (typeof x !== typeof y) {
		throw new TypeError(`The given arguments must have the same type`);
	}

	// If Type(x) is Undefined, return true.
	if (x === undefined) return true;

	// If Type(x) is Null, return true.
	if (x === null) return true;

	// If Type(x) is String, then
	if (typeof x === "string") {
		// If x and y are exactly the same sequence of code units
		// (same length and same code units at corresponding indices), return true; otherwise, return false.
		return x === y;
	}

	// If Type(x) is Boolean, then
	if (typeof x === "boolean") {
		// If x and y are both true or both false, return true; otherwise, return false.
		return x === y;
	}

	// If Type(x) is Symbol, then
	if (typeof x === "symbol") {
		// If x and y are both the same Symbol value, return true; otherwise, return false.
		return x.valueOf() === (y as symbol).valueOf();
	}

	// If x and y are the same Object value, return true. Otherwise, return false.
	return x === y;
}

/**
 * The internal comparison abstract operation SameValue(x, y), where x and y are ECMAScript language values, produces true or false.
 *
 * https://tc39.github.io/ecma262/#sec-samevalue
 * @param {*} x
 * @param {*} y
 * @return {boolean}
 */
export function sameValue (x: unknown, y: unknown): boolean {
	// If Type(x) is different from Type(y), return false.
	if (typeof x !== typeof y) return false;

	// If Type(x) is Number, then
	if (typeof x === "number") {

		// If x is NaN and y is NaN, return true.
		if (isNaN(x) && isNaN(y as number)) return true;

		// If x is +0 and y is -0, return false.
		if (Object.is(x, 0) && Object.is(y, -0)) return false;

		// If x is the same Number value as y, return true.
		if (x === y) return true;

		// Return false.
		return false;
	}
	// Return SameValueNonNumber(x, y).
	return sameValueNonNumber(x, y);

}