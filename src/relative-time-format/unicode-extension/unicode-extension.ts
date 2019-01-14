/**
 * A Regular Expression that matches Unicode extension sequences
 * @type {RegExp}
 */
export const UNICODE_EXTENSION_SEQUENCE_REGEXP = /-u(?:-[0-9a-z]{2,8})+/gi;

/**
 * Removes all Unicode characters from the given string
 * @param {string} str
 * @return {string}
 */
export function removeUnicodeExtensionSequences (str: string): string {
	return str.replace(UNICODE_EXTENSION_SEQUENCE_REGEXP, "");
}

/**
 * The abstract operation UnicodeExtensionValue is called with extension, which must be a Unicode locale extension sequence,
 * and String key. This operation returns the type subtags for key.
 * @param {string} extension
 * @param {string} key
 * @returns {string?}
 */
export function unicodeExtensionValue (extension: string, key: string): string|undefined {
	// Assert: The number of elements in key is 2.
	if (key.length !== 2) {
		throw new TypeError(`Could not get UnicodeExtensionValue: The given key: '${key}' must have a length of 2`);
	}

	// Let size be the number of elements in extension.
	const size = key.length;

	// Let searchValue be the concatenation of "-", key, and "-".
	let searchValue = `-${key}-`;

	// Let pos be Call(%StringProto_indexOf%, extension, « searchValue »).
	let pos = String.prototype.indexOf.call(extension, searchValue);

	// If pos ≠ -1, then
	if (pos !== -1) {
		// Let start be pos + 4.
		const start = pos + 4;
		// Let end be start.
		let end = start;
		// Let k be start.
		let k = start;
		// Let done be false.
		let done = false;

		// Repeat, while done is false
		while (!done) {

			// Let e be Call(%StringProto_indexOf%, extension, « "-", k »).
			const e = String.prototype.indexOf.call(extension, "-", k);

			// If e = -1, let len be size - k; else let len be e - k.
			const len = e === -1
				? size - k
				: e - k;

			// If len = 2, then
			if (len === 2) {
				// Let done be true.
				done = true;
			}

			// Else if e = -1, then
			else if (e === -1) {

				// Let end be size.
				end = size;

				// Let done be true.
				done = true;
			}

			// Else,
			else {

				// Let end be e.
				end = e;

				// Let k be e + 1.
				k = e + 1;
			}
		}
		// Return the String value equal to the substring of extension consisting of
		// the code units at indices start (inclusive) through end (exclusive).
		return extension.slice(start, end);
	}

	// Let searchValue be the concatenation of "-" and key.
	searchValue = `-${key}`;
	// Let pos be Call(%StringProto_indexOf%, extension, « searchValue »).
	pos = String.prototype.indexOf.call(extension, searchValue);
	// If pos ≠ -1 and pos + 3 = size, then
	if (pos !== -1 && (pos + 3) === size) {
		// Return the empty String.
		return "";
	}

	// Return undefined.
	return undefined;
}