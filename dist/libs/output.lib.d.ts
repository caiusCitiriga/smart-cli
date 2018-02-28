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
    printWarning(text: string): void;
    printError(text: string): void;
    printInfo(text: string): void;
    printTitle(text: string): void;
    printSubtitle(text: string): void;
    printBoxTitle(text: string): void;
    printKeyValues(opts: IKeyValuesOpts): void;
    /**
     * Prints the data passed in as tabular data.
     *
     * @param {ITableStructure} table
     * @memberof Output
     */
    printTable(table: ITableOpts): void;
    /**
     * Writes the heading top lines on the table string
     *
     * @private
     * @param {string[]} heading
     * @memberof Output
     */
    private writeHeadingTopRow(heading);
    /**
     * Writes the heading values on the table string
     *
     * @private
     * @param {string[]} heading
     * @memberof Output
     */
    private writeHeadingValues(heading);
    /**
     * Writes the heading bottom lines on the table string
     *
     * @private
     * @param {string[]} heading
     * @memberof Output
     */
    private writeHeadingFooter(heading);
    /**
     * Writes the values contained into the given rows, one set at the time on the table string
     *
     * @private
     * @param {Array<string[]>} rows
     * @memberof Output
     */
    private writeRows(rows);
    /**
     * Sets the number of the longest heading or row value
     *
     * @private
     * @param {ITableOpts} table
     * @memberof Output
     */
    private setLongestCellWidth(table);
}
