import {isRecord} from "./is-record";
import {List} from "../list/list";

/**
 * Returns true if the given item is a List
 * @param {T} item
 * @return {item is T}
 */
export function isList<T>(item: unknown): item is List<T> {
	return Array.isArray(item) || isRecord(item);
}
