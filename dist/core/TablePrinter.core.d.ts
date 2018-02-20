import { TableStructure } from '../entities/TableStructure.entity';
export declare class TablePrinter {
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
