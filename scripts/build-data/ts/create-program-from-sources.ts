import {CompilerOptions, createProgram, createSourceFile, getDefaultCompilerOptions, getDefaultLibFileName, Program, ScriptKind, ScriptTarget, SourceFile, sys} from "typescript";

export interface SourceFileInput {
	fileName: string;
	text: string;
}

/**
 * Generates a Program based on the given sources
 * @returns {Program}
 */
export function createProgramFromSources (sources: SourceFileInput[]): Program {

	return createProgram({
		rootNames: sources.map(source => source.fileName),
		host: {
			readFile (fileName: string): string|undefined {
				const matchedFile = sources.find(file => file.fileName === fileName);
				return matchedFile == null ? undefined : matchedFile.text;
			},

			fileExists (fileName: string): boolean {
				return this.readFile(fileName) != null;
			},

			getSourceFile (fileName: string, languageVersion: ScriptTarget): SourceFile|undefined {
				const sourceText = this.readFile(fileName);
				if (sourceText == null) return undefined;

				return createSourceFile(
					fileName,
					sourceText,
					languageVersion,
					true,
					ScriptKind.TS
				);
			},

			getCurrentDirectory () {
				return ".";
			},

			getDirectories (directoryName: string) {
				return sys.getDirectories(directoryName);
			},

			getDefaultLibFileName (options: CompilerOptions): string {
				return getDefaultLibFileName(options);
			},

			getCanonicalFileName (fileName: string): string {
				return this.useCaseSensitiveFileNames() ? fileName : fileName.toLowerCase();
			},

			getNewLine (): string {
				return sys.newLine;
			},

			useCaseSensitiveFileNames () {
				return sys.useCaseSensitiveFileNames;
			},

			writeFile (fileName: string, data: string, writeByteOrderMark?: boolean) {
				console.log("write file:", fileName);
				sys.writeFile(fileName, data, writeByteOrderMark);
			}
		},
		options: {
			...getDefaultCompilerOptions(),
			declaration: true,
			declarationMap: true
		}
	});
}