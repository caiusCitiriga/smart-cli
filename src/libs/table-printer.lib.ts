import * as Chalk from 'chalk';

import { TableDelimiters } from '../consts/table-delimiters.const';

import { ITableOpts } from '../interfaces/opts/table-opts.interface';

export class TablePrinter {
    /**
     * This will be the reference for the min width of the cells
     * 
     * @private
     * @memberof TablePrinter
     */
    private longestCellWidth = 0;


    /**
     * This will be the final output of the table.
     * 
     * @private
     * @memberof TablePrinter
     */
    private table = '';

    /**
     * Prints the data passed in as tabular data.
     * 
     * @param {ITableOpts} table 
     * @memberof TablePrinter
     */
    public printTable(table: ITableOpts) {
        this.setLongestCellWidth(table);
        this.writeHeadingTopRow(table.heading);
        this.writeHeadingValues(table.heading);
        this.writeHeadingFooter(table.heading);
        this.writeRows(table.rows);

        console.log(this.table);
    }

    /**
     * Writes the heading top lines on the table string
     * 
     * @private
     * @param {string[]} heading 
     * @memberof TablePrinter
     */
    private writeHeadingTopRow(heading: string[]) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += Chalk.gray(TableDelimiters.topLeft);
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += Chalk.gray(TableDelimiters.top) }
                this.table += Chalk.gray(TableDelimiters.topMid);
            }

            if (index === heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += Chalk.gray(TableDelimiters.top) }
                this.table += Chalk.gray(TableDelimiters.topRight);
            }

            if (index !== 0 && index !== heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += Chalk.gray(TableDelimiters.top) }
                this.table += Chalk.gray(TableDelimiters.topMid);
            }
        });

        this.table += '\n';
    }

    /**
     * Writes the heading values on the table string
     * 
     * @private
     * @param {string[]} heading 
     * @memberof TablePrinter
     */
    private writeHeadingValues(heading: string[]) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += Chalk.gray(TableDelimiters.left);
                this.table += Chalk.bold.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) { this.table += ' ' }
                this.table += Chalk.gray(TableDelimiters.right);
            }

            if (index === heading.length - 1) {
                this.table += Chalk.bold.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) { this.table += ' ' }
                this.table += Chalk.gray(TableDelimiters.right);
            }

            if (index !== 0 && index !== heading.length - 1) {
                this.table += Chalk.bold.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) { this.table += ' ' }
                this.table += Chalk.gray(TableDelimiters.right);
            }
        });

        this.table += '\n';
    }

    /**
     * Writes the heading bottom lines on the table string
     * 
     * @private
     * @param {string[]} heading 
     * @memberof TablePrinter
     */
    private writeHeadingFooter(heading: string[]) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += Chalk.gray(TableDelimiters.leftMid);
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += Chalk.gray(TableDelimiters.bottom) }
                this.table += Chalk.gray(TableDelimiters.midMid);
            }

            if (index === heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += Chalk.gray(TableDelimiters.bottom) }
                this.table += Chalk.gray(TableDelimiters.rightMid);
            }

            if (index !== 0 && index !== heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += Chalk.gray(TableDelimiters.bottom) }
                this.table += Chalk.gray(TableDelimiters.midMid);
            }
        });

        this.table += '\n';
    }

    /**
     * Writes the values contained into the given rows, one set at the time on the table string
     * 
     * @private
     * @param {Array<string[]>} rows 
     * @memberof TablePrinter
     */
    private writeRows(rows: Array<string[]>) {
        rows.forEach((valuesSet, setIndex) => {
            valuesSet.forEach((value, valueIndex) => {
                if (valueIndex === 0) {
                    this.table += Chalk.gray(TableDelimiters.left);
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) { this.table += ' ' }
                    this.table += Chalk.gray(TableDelimiters.right);
                }

                if (valueIndex === valuesSet.length - 1) {
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) { this.table += ' ' }
                    this.table += Chalk.gray(TableDelimiters.right);
                }

                if (valueIndex !== 0 && valueIndex !== valuesSet.length - 1) {
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) { this.table += ' ' }
                    this.table += Chalk.gray(TableDelimiters.right);
                }
            });
            this.table += '\n';
            valuesSet.forEach((value, valueIndex) => {
                if (valueIndex === 0) {
                    this.table += setIndex === rows.length - 1 ? Chalk.gray(TableDelimiters.bottomLeft) : Chalk.gray(TableDelimiters.leftMid);
                    this.table += Chalk.gray(TableDelimiters.mid);
                    for (let i = 0; i != this.longestCellWidth; i++) { this.table += Chalk.gray(TableDelimiters.mid) }
                    this.table += setIndex === rows.length - 1 ? Chalk.gray(TableDelimiters.bottomMid) : Chalk.gray(TableDelimiters.midMid);

                }

                if (valueIndex === valuesSet.length - 1) {
                    this.table += Chalk.gray(TableDelimiters.mid);
                    for (let i = 0; i != this.longestCellWidth; i++) { this.table += Chalk.gray(TableDelimiters.mid) }
                    this.table += setIndex === rows.length - 1 ? Chalk.gray(TableDelimiters.bottomRight) : Chalk.gray(TableDelimiters.rightMid);
                }

                if (valueIndex !== 0 && valueIndex !== valuesSet.length - 1) {
                    this.table += Chalk.gray(TableDelimiters.mid);
                    for (let i = 0; i != this.longestCellWidth; i++) { this.table += Chalk.gray(TableDelimiters.mid) }
                    this.table += setIndex === rows.length - 1 ? Chalk.gray(TableDelimiters.bottomMid) : Chalk.gray(TableDelimiters.midMid);
                }
            });
            this.table += '\n';
        });
    }

    /**
     * Sets the number of the longest heading or row value
     * 
     * @private
     * @param {ITableOpts} table 
     * @memberof TablePrinter
     */
    private setLongestCellWidth(table: ITableOpts) {
        table.heading
            .forEach(h => this.longestCellWidth = h.length > this.longestCellWidth ? h.length : this.longestCellWidth);
        table.rows
            .forEach((rowSet) => rowSet
                .forEach((rowValue: string) => this.longestCellWidth = rowValue.length > this.longestCellWidth ? rowValue.length : this.longestCellWidth)
            );
    }
}
