"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Chalk = require("chalk");
var inversify_1 = require("inversify");
var table_delimiters_const_1 = require("../consts/table-delimiters.const");
var Output = (function () {
    function Output() {
        /**
         * This will be the reference for the min width of the cells
         *
         * @private
         * @memberof Output
         */
        this.longestCellWidth = 0;
        /**
         * This will be the final output of the table.
         *
         * @private
         * @memberof Output
         */
        this.table = '';
    }
    Output.prototype.printMessage = function (text) {
        console.log(text);
    };
    Output.prototype.printWarning = function (text) {
        console.log(Chalk.bold.yellow("WARN: " + text));
    };
    Output.prototype.printError = function (text) {
        console.log(Chalk.bold.red("ERROR: " + text));
    };
    Output.prototype.printInfo = function (text) {
        console.log(Chalk.cyan("INFO: " + text));
    };
    Output.prototype.printTitle = function (text) {
        console.log(Chalk.bold.magenta(text.toUpperCase()));
    };
    Output.prototype.printSubtitle = function (text) {
        console.log(Chalk.grey(' ' + text));
    };
    Output.prototype.printBoxTitle = function (text) {
        var title = '';
        for (var i = 0; i <= text.length + 3; i++) {
            if (i === 0) {
                title += table_delimiters_const_1.TableDelimiters.topLeft;
            }
            if (i !== 0 && i !== text.length + 3) {
                title += table_delimiters_const_1.TableDelimiters.top;
            }
            if (i === text.length + 3) {
                title += table_delimiters_const_1.TableDelimiters.topRight;
            }
        }
        title += '\n' + table_delimiters_const_1.TableDelimiters.left + ' ' + text + ' ' + table_delimiters_const_1.TableDelimiters.right + '\n';
        for (var i = 0; i <= text.length + 3; i++) {
            if (i === 0) {
                title += table_delimiters_const_1.TableDelimiters.bottomLeft;
            }
            if (i !== 0 && i !== text.length + 3) {
                title += table_delimiters_const_1.TableDelimiters.bottom;
            }
            if (i === text.length + 3) {
                title += table_delimiters_const_1.TableDelimiters.bottomRight;
            }
        }
        console.log(Chalk.magenta(title.toUpperCase()));
    };
    Output.prototype.printKeyValues = function (opts) {
        if (!opts.set.length) {
            return;
        }
        var longestKeyLen = opts.set[0].k.length;
        opts.set.forEach(function (s) { return longestKeyLen = s.k.length > longestKeyLen ? s.k.length : longestKeyLen; });
        opts.spacerChar = opts.spacerChar && opts.spacerChar.length ? opts.spacerChar : ' ';
        opts.set.forEach(function (pair) {
            var spaces = opts.spacerChar && opts.spacerChar.length ? opts.spacerChar : ' ';
            for (var i = 0; i < (longestKeyLen - pair.k.length); i++) {
                spaces += opts.spacerChar;
            }
            console.log("- " + Chalk.yellow(pair.k) + ": " + (spaces + pair.v));
        });
    };
    /**
     * Prints the data passed in as tabular data.
     *
     * @param {ITableStructure} table
     * @memberof Output
     */
    Output.prototype.printTable = function (table) {
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
     * @memberof Output
     */
    Output.prototype.writeHeadingTopRow = function (heading) {
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
     * @memberof Output
     */
    Output.prototype.writeHeadingValues = function (heading) {
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
     * @memberof Output
     */
    Output.prototype.writeHeadingFooter = function (heading) {
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
     * @memberof Output
     */
    Output.prototype.writeRows = function (rows) {
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
     * @memberof Output
     */
    Output.prototype.setLongestCellWidth = function (table) {
        var _this = this;
        table.heading
            .forEach(function (h) { return _this.longestCellWidth = h.length > _this.longestCellWidth ? h.length : _this.longestCellWidth; });
        table.rows
            .forEach(function (rowSet) { return rowSet
            .forEach(function (rowValue) { return _this.longestCellWidth = rowValue.length > _this.longestCellWidth ? rowValue.length : _this.longestCellWidth; }); });
    };
    Output = __decorate([
        inversify_1.injectable()
    ], Output);
    return Output;
}());
exports.Output = Output;
//# sourceMappingURL=output.entity.js.map