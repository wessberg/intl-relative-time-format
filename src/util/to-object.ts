/* tslint:disable:use-primitive-type no-construct no-any */

/**
 * The abstract operation ToObject converts argument to a value of type Object.
 *
 * https://tc39.github.io/ecma262/#sec-toobject
 * @param {T} argument
 * @return {T extends boolean ? Boolean : T extends number ? Number : T extends string ? String : T extends symbol ? symbol : T}
 */
export function toObject<T>(
  argument: T
): T extends boolean
  ? Boolean
  : T extends number
  ? Number
  : T extends string
  ? String
  : T extends symbol
  ? Symbol
  : T {
  if (argument == null) {
    throw new TypeError(
      `Argument ${argument} cannot be converted to an Object`
    );
  }

  if (typeof argument === "boolean") {
    return new Boolean(argument) as any;
  }

  if (typeof argument === "number") {
    return new Number(argument) as any;
  }

  if (typeof argument === "string") {
    return new String(argument) as any;
  }

  if (typeof argument === "symbol") {
    return new Object(argument) as any;
  }

  return argument as any;
}
