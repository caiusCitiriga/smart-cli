declare module 'smart-cli/consts/table-delimiters.const' {
	export const TableDelimiters: {
		top: string;
		topMid: string;
		topLeft: string;
		topRight: string;
		bottom: string;
		bottomMid: string;
		bottomLeft: string;
		bottomRight: string;
		left: string;
		leftMid: string;
		mid: string;
		midMid: string;
		right: string;
		rightMid: string;
		middle: string;
	};

}
declare module 'smart-cli/entities/TableStructure.entity' {
	export class TableStructure {
		heading: string[];
		rows: Array<string[]>;
	}

}

declare module 'smart-cli/core/TablePrinter.core' {
	import { TableStructure } from 'smart-cli/entities/TableStructure.entity';
	export class TablePrinter {
	    /**
	     * This will be the reference for the min width of the cells
	     *
	     * @private
	     * @memberof TablePrinter
	     */
		private longestCellWidth;
	    /**
	     * This will be the final output of the table.
	     *
	     * @private
	     * @memberof TablePrinter
	     */
		private table;
	    /**
	     * Prints the data passed in as tabular data.
	     *
	     * @param {TableStructure} table
	     * @memberof TablePrinter
	     */
		printTable(table: TableStructure): void;
	    /**
	     * Writes the heading top lines on the table string
	     *
	     * @private
	     * @param {string[]} heading
	     * @memberof TablePrinter
	     */
		private writeHeadingTopRow(heading);
	    /**
	     * Writes the heading values on the table string
	     *
	     * @private
	     * @param {string[]} heading
	     * @memberof TablePrinter
	     */
		private writeHeadingValues(heading);
	    /**
	     * Writes the heading bottom lines on the table string
	     *
	     * @private
	     * @param {string[]} heading
	     * @memberof TablePrinter
	     */
		private writeHeadingFooter(heading);
	    /**
	     * Writes the values contained into the given rows, one set at the time on the table string
	     *
	     * @private
	     * @param {Array<string[]>} rows
	     * @memberof TablePrinter
	     */
		private writeRows(rows);
	    /**
	     * Sets the number of the longest heading or row value
	     *
	     * @private
	     * @param {TableStructure} table
	     * @memberof TablePrinter
	     */
		private setLongestCellWidth(table);
	}

}
declare module 'smart-cli/core/GenericOutput.core' {
	export class GenericOutput {
		printMessage(text: string): void;
		printWarning(text: string): void;
		printError(text: string): void;
		printInfo(text: string): void;
		printTitle(text: string): void;
		printSubTitle(text: string): void;
		printBoxedTitle(text: string): void;
		printKeyValue(set: {
			key: string;
			value: string;
		}[]): void;
	}

}
declare module 'smart-cli/index' {
	import { TableStructure } from 'smart-cli/entities/TableStructure.entity';
	import { GenericOutput } from 'smart-cli/core/GenericOutput.core';
	export class SmartCLI {
		private TablePrinter;
		private Prompt;
		GenericOutput: GenericOutput;
		constructor();
		printTable(table: TableStructure): void;
		prompt(question: string, callback: (answer: string) => boolean): void;
	}
	export const SCLI: SmartCLI;

}