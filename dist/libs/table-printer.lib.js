"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Chalk = require("chalk");
var table_delimiters_const_1 = require("../consts/table-delimiters.const");
var TablePrinter = (function () {
    function TablePrinter() {
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
     * @param {ITableOpts} table
     * @memberof TablePrinter
     */
    TablePrinter.prototype.printTable = function (table) {
        this.setLongestCellWidth(table);
        this.writeHeadingTopRow(table.heading);
        this.writeHeadingValues(table.heading);
        this.writeHeadingFooter(table.heading);
        this.writeRows(table.rows);
        console.log(this.table);
    };
    /**
     * Writes the heading top lines on the table string
     *
     * @private
     * @param {string[]} heading
     * @memberof TablePrinter
     */
    TablePrinter.prototype.writeHeadingTopRow = function (heading) {
        var _this = this;
        heading.forEach(function (headingVal, index) {
            if (index === 0) {
                _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.topLeft);
                for (var i = 0; i <= _this.longestCellWidth; i++) {
                    _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.top);
                }
                _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.topMid);
            }
            if (index === heading.length - 1) {
                for (var i = 0; i <= _this.longestCellWidth; i++) {
                    _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.top);
                }
                _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.topRight);
            }
            if (index !== 0 && index !== heading.length - 1) {
                for (var i = 0; i <= _this.longestCellWidth; i++) {
                    _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.top);
                }
                _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.topMid);
            }
        });
        this.table += '\n';
    };
    /**
     * Writes the heading values on the table string
     *
     * @private
     * @param {string[]} heading
     * @memberof TablePrinter
     */
    TablePrinter.prototype.writeHeadingValues = function (heading) {
        var _this = this;
        heading.forEach(function (headingVal, index) {
            if (index === 0) {
                _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.left);
                _this.table += Chalk.bold.yellow(headingVal);
                for (var i = 0; i <= _this.longestCellWidth - headingVal.length; i++) {
                    _this.table += ' ';
                }
                _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
            }
            if (index === heading.length - 1) {
                _this.table += Chalk.bold.yellow(headingVal);
                for (var i = 0; i <= _this.longestCellWidth - headingVal.length; i++) {
                    _this.table += ' ';
                }
                _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
            }
            if (index !== 0 && index !== heading.length - 1) {
                _this.table += Chalk.bold.yellow(headingVal);
                for (var i = 0; i <= _this.longestCellWidth - headingVal.length; i++) {
                    _this.table += ' ';
                }
                _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
            }
        });
        this.table += '\n';
    };
    /**
     * Writes the heading bottom lines on the table string
     *
     * @private
     * @param {string[]} heading
     * @memberof TablePrinter
     */
    TablePrinter.prototype.writeHeadingFooter = function (heading) {
        var _this = this;
        heading.forEach(function (headingVal, index) {
            if (index === 0) {
                _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.leftMid);
                for (var i = 0; i <= _this.longestCellWidth; i++) {
                    _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.bottom);
                }
                _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.midMid);
            }
            if (index === heading.length - 1) {
                for (var i = 0; i <= _this.longestCellWidth; i++) {
                    _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.bottom);
                }
                _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.rightMid);
            }
            if (index !== 0 && index !== heading.length - 1) {
                for (var i = 0; i <= _this.longestCellWidth; i++) {
                    _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.bottom);
                }
                _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.midMid);
            }
        });
        this.table += '\n';
    };
    /**
     * Writes the values contained into the given rows, one set at the time on the table string
     *
     * @private
     * @param {Array<string[]>} rows
     * @memberof TablePrinter
     */
    TablePrinter.prototype.writeRows = function (rows) {
        var _this = this;
        rows.forEach(function (valuesSet, setIndex) {
            valuesSet.forEach(function (value, valueIndex) {
                if (valueIndex === 0) {
                    _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.left);
                    _this.table += value;
                    for (var i = 0; i <= _this.longestCellWidth - value.length; i++) {
                        _this.table += ' ';
                    }
                    _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
                }
                if (valueIndex === valuesSet.length - 1) {
                    _this.table += value;
                    for (var i = 0; i <= _this.longestCellWidth - value.length; i++) {
                        _this.table += ' ';
                    }
                    _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
                }
                if (valueIndex !== 0 && valueIndex !== valuesSet.length - 1) {
                    _this.table += value;
                    for (var i = 0; i <= _this.longestCellWidth - value.length; i++) {
                        _this.table += ' ';
                    }
                    _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
                }
            });
            _this.table += '\n';
            valuesSet.forEach(function (value, valueIndex) {
                if (valueIndex === 0) {
                    _this.table += setIndex === rows.length - 1 ? Chalk.gray(table_delimiters_const_1.TableDelimiters.bottomLeft) : Chalk.gray(table_delimiters_const_1.TableDelimiters.leftMid);
                    _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    for (var i = 0; i != _this.longestCellWidth; i++) {
                        _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    }
                    _this.table += setIndex === rows.length - 1 ? Chalk.gray(table_delimiters_const_1.TableDelimiters.bottomMid) : Chalk.gray(table_delimiters_const_1.TableDelimiters.midMid);
                }
                if (valueIndex === valuesSet.length - 1) {
                    _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    for (var i = 0; i != _this.longestCellWidth; i++) {
                        _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    }
                    _this.table += setIndex === rows.length - 1 ? Chalk.gray(table_delimiters_const_1.TableDelimiters.bottomRight) : Chalk.gray(table_delimiters_const_1.TableDelimiters.rightMid);
                }
                if (valueIndex !== 0 && valueIndex !== valuesSet.length - 1) {
                    _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    for (var i = 0; i != _this.longestCellWidth; i++) {
                        _this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    }
                    _this.table += setIndex === rows.length - 1 ? Chalk.gray(table_delimiters_const_1.TableDelimiters.bottomMid) : Chalk.gray(table_delimiters_const_1.TableDelimiters.midMid);
                }
            });
            _this.table += '\n';
        });
    };
    /**
     * Sets the number of the longest heading or row value
     *
     * @private
     * @param {ITableOpts} table
     * @memberof TablePrinter
     */
    TablePrinter.prototype.setLongestCellWidth = function (table) {
        var _this = this;
        table.heading
            .forEach(function (h) { return _this.longestCellWidth = h.length > _this.longestCellWidth ? h.length : _this.longestCellWidth; });
        table.rows
            .forEach(function (rowSet) { return rowSet
            .forEach(function (rowValue) { return _this.longestCellWidth = rowValue.length > _this.longestCellWidth ? rowValue.length : _this.longestCellWidth; }); });
    };
    return TablePrinter;
}());
exports.TablePrinter = TablePrinter;
//# sourceMappingURL=table-printer.lib.js.map