import {isPropertyKey} from "./is-property-key";

/**
 * The abstract operation Get is used to retrieve the value of a specific property of an object. The operation is called with arguments O and P where O is the object and P is the property key.
 * https://tc39.es/ecma262/#sec-get-o-p
 * @param {O} o
 * @param {P} p
 * @returns {O[P]}
 */
export function get<O extends object, P extends keyof O>(o: O, p: P): O[P] {
	// Assert: Type(O) is Object.
	if (typeof o !== "object") {
		throw new TypeError(`Given argument ${o} must be of type Object`);
	}

	// Assert: IsPropertyKey(P) is true.
	if (!isPropertyKey(p)) {
		throw new TypeError(`Given argument ${p} must be a PropertyKey`);
	}
	return o[p];
}
