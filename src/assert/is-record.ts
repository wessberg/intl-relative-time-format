/**
 * Returns true if the given item is a record
 * @param {T} item
 * @return {item is T}
 */
export function isRecord<T>(item: T): item is Exclude<T, undefined> {
	return Object.prototype.toString.call(item) === "[object Object]";
}
