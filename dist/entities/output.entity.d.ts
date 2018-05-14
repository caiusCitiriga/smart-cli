import 'reflect-metadata';
import { IOutput } from '../interfaces/plain/output.interface';
import { ITableOpts } from '../interfaces/opts/table-opts.interface';
import { IKeyValuesOpts } from '../interfaces/opts/key-values-opts.interface';
export declare class Output implements IOutput {
    /**
     * This will be the reference for the min width of the cells
     *
     * @private
     * @memberof Output
     */
    private longestCellWidth;
    /**
     * This will be the final output of the table.
     *
     * @private
     * @memberof Output
     */
    private table;
    printMessage(text: string): void;
    printWarning(text: string, noColor?: boolean): void;
    printError(text: string, noColor?: boolean): void;
    printInfo(text: string, noColor?: boolean): void;
    printTitle(text: string, noColor?: boolean): void;
    printSubtitle(text: string, noColor?: boolean): void;
    printBoxTitle(text: string, noColor?: boolean): void;
    printKeyValues(opts: IKeyValuesOpts, noColor?: boolean): void;
    /**
     * Prints the data passed in as tabular data.
     *
     * @param {ITableStructure} table
     * @memberof Output
     */
    printTableExperimental(table: ITableOpts, noColor?: boolean): void;
    /**
     * Writes the heading top lines on the table string
     *
     * @private
     * @param {string[]} heading
     * @memberof Output
     */
    private writeHeadingTopRow(heading, noColor?);
    /**
     * Writes the heading values on the table string
     *
     * @private
     * @param {string[]} heading
     * @memberof Output
     */
    private writeHeadingValues(heading, noColor?);
    /**
     * Writes the heading bottom lines on the table string
     *
     * @private
     * @param {string[]} heading
     * @memberof Output
     */
    private writeHeadingFooter(heading, noColor?);
    /**
     * Writes the values contained into the given rows, one set at the time on the table string
     *
     * @private
     * @param {Array<string[]>} rows
     * @memberof Output
     */
    private writeRows(rows, noColor?);
    /**
     * Sets the number of the longest heading or row value
     *
     * @private
     * @param {ITableOpts} table
     * @memberof Output
     */
    private setLongestCellWidth(table);
}
