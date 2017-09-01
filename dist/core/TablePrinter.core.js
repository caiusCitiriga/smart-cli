"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Chalk = require("chalk");
const table_delimiters_const_1 = require("../consts/table-delimiters.const");
class TablePrinter {
    constructor() {
        /**
         * This will be the reference for the min width of the cells
         *
         * @private
         * @memberof TablePrinter
         */
        this.longestCellWidth = 0;
        /**
         * This will be the final output of the table.
         *
         * @private
         * @memberof TablePrinter
         */
        this.table = '';
    }
    /**
     * Prints the data passed in as tabular data.
     *
     * @param {TableStructure} table
     * @memberof TablePrinter
     */
    printTable(table) {
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
    writeHeadingTopRow(heading) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.topLeft);
                for (let i = 0; i <= this.longestCellWidth; i++) {
                    this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.top);
                }
                this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.topMid);
            }
            if (index === heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) {
                    this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.top);
                }
                this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.topRight);
            }
            if (index !== 0 && index !== heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) {
                    this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.top);
                }
                this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.topMid);
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
    writeHeadingValues(heading) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.left);
                this.table += Chalk.bold.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) {
                    this.table += ' ';
                }
                this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
            }
            if (index === heading.length - 1) {
                this.table += Chalk.bold.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) {
                    this.table += ' ';
                }
                this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
            }
            if (index !== 0 && index !== heading.length - 1) {
                this.table += Chalk.bold.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) {
                    this.table += ' ';
                }
                this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
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
    writeHeadingFooter(heading) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.leftMid);
                for (let i = 0; i <= this.longestCellWidth; i++) {
                    this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.bottom);
                }
                this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.midMid);
            }
            if (index === heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) {
                    this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.bottom);
                }
                this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.rightMid);
            }
            if (index !== 0 && index !== heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) {
                    this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.bottom);
                }
                this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.midMid);
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
    writeRows(rows) {
        rows.forEach((valuesSet, setIndex) => {
            valuesSet.forEach((value, valueIndex) => {
                if (valueIndex === 0) {
                    this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.left);
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) {
                        this.table += ' ';
                    }
                    this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
                }
                if (valueIndex === valuesSet.length - 1) {
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) {
                        this.table += ' ';
                    }
                    this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
                }
                if (valueIndex !== 0 && valueIndex !== valuesSet.length - 1) {
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) {
                        this.table += ' ';
                    }
                    this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
                }
            });
            this.table += '\n';
            valuesSet.forEach((value, valueIndex) => {
                if (valueIndex === 0) {
                    this.table += setIndex === rows.length - 1 ? Chalk.gray(table_delimiters_const_1.TableDelimiters.bottomLeft) : Chalk.gray(table_delimiters_const_1.TableDelimiters.leftMid);
                    this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    for (let i = 0; i != this.longestCellWidth; i++) {
                        this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    }
                    this.table += setIndex === rows.length - 1 ? Chalk.gray(table_delimiters_const_1.TableDelimiters.bottomMid) : Chalk.gray(table_delimiters_const_1.TableDelimiters.midMid);
                }
                if (valueIndex === valuesSet.length - 1) {
                    this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    for (let i = 0; i != this.longestCellWidth; i++) {
                        this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    }
                    this.table += setIndex === rows.length - 1 ? Chalk.gray(table_delimiters_const_1.TableDelimiters.bottomRight) : Chalk.gray(table_delimiters_const_1.TableDelimiters.rightMid);
                }
                if (valueIndex !== 0 && valueIndex !== valuesSet.length - 1) {
                    this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    for (let i = 0; i != this.longestCellWidth; i++) {
                        this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    }
                    this.table += setIndex === rows.length - 1 ? Chalk.gray(table_delimiters_const_1.TableDelimiters.bottomMid) : Chalk.gray(table_delimiters_const_1.TableDelimiters.midMid);
                }
            });
            this.table += '\n';
        });
    }
    /**
     * Sets the number of the longest heading or row value
     *
     * @private
     * @param {TableStructure} table
     * @memberof TablePrinter
     */
    setLongestCellWidth(table) {
        table.heading
            .forEach(h => this.longestCellWidth = h.length > this.longestCellWidth ? h.length : this.longestCellWidth);
        table.rows
            .forEach((rowSet) => rowSet
            .forEach((rowValue) => this.longestCellWidth = rowValue.length > this.longestCellWidth ? rowValue.length : this.longestCellWidth));
    }
}
exports.TablePrinter = TablePrinter;
//# sourceMappingURL=TablePrinter.core.js.map