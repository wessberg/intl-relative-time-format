import {get} from "./get";
import {toBoolean} from "./to-boolean";
import {toString} from "./to-string";
import {ElementOf} from "./element-of";

/**
 * https://tc39.es/ecma402/#sec-getoption
 * @param {Options} options
 * @param {Property} property
 * @param {Type} type
 * @param {Values} values
 * @param {Fallback} fallback
 * @returns {Return}
 */
export function getOption<
	Options extends object,
	Property extends keyof Options,
	Type extends Options[Property] extends (string | (string | undefined)) ? "string" : "boolean",
	Values extends Options[Property] extends (string | (string | undefined)) ? readonly string[] : readonly boolean[],
	Fallback extends ElementOf<Values>,
	Return extends ElementOf<Values>
>(options: Options, property: Property, type: Type, values: Values, fallback: Fallback): Return {
	// Let value be ? Get(options, property).
	let value = get(options, property);
	// If value is not undefined, then
	if (value !== undefined) {
		// Assert: type is "boolean" or "string".
		if (type !== "boolean" && type !== "string") {
			throw new TypeError(`Expected type ${type} to be 'boolean' or 'string`);
		}

		// If type is "boolean", then
		if (type === "boolean") {
			// Let value be ToBoolean(value).
			value = (toBoolean(value) as unknown) as Options[Property];
		}

		// If type is "string", then
		if (type === "string") {
			// Let value be ? ToString(value).
			value = (toString(value) as unknown) as Options[Property];
		}

		// If values is not undefined, then
		if (values !== undefined) {
			// If values does not contain an element equal to value, throw a RangeError exception.
			// tslint:disable-next-line:no-collapsible-if
			if (!values.includes(value as never)) {
				throw new RangeError(`Value ${value} out of range for options property ${property}`);
			}
		}

		// Return value.
		return (value as unknown) as Return;
	}

	// Else, return fallback.
	else {
		return (fallback as unknown) as Return;
	}
}
