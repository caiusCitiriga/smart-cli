"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Chalk = require("chalk");
const inversify_1 = require("inversify");
const table_delimiters_const_1 = require("../consts/table-delimiters.const");
let Output = class Output {
    constructor() {
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
    printMessage(text) {
        console.log(text);
    }
    printWarning(text, noColor) {
        if (noColor) {
            console.log(`WARN: ${text}`);
            return;
        }
        console.log(Chalk.bold.yellow(`WARN: ${text}`));
    }
    printError(text, noColor) {
        if (noColor) {
            console.log(`ERROR: ${text}`);
            return;
        }
        console.log(Chalk.bold.red(`ERROR: ${text}`));
    }
    printInfo(text, noColor) {
        if (noColor) {
            console.log(`INFO: ${text}`);
            return;
        }
        console.log(Chalk.cyan(`INFO: ${text}`));
    }
    printTitle(text, noColor) {
        if (noColor) {
            console.log(text.toUpperCase());
            return;
        }
        console.log(Chalk.bold.magenta(text.toUpperCase()));
    }
    printSubtitle(text, noColor) {
        if (noColor) {
            console.log(' ' + text);
            return;
        }
        console.log(Chalk.grey(' ' + text));
    }
    printBoxTitle(text, noColor) {
        let title = '';
        for (let i = 0; i <= text.length + 3; i++) {
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
        for (let i = 0; i <= text.length + 3; i++) {
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
        if (noColor) {
            console.log(title.toUpperCase());
            return;
        }
        console.log(Chalk.magenta(title.toUpperCase()));
    }
    printKeyValues(opts, noColor) {
        if (!opts.set.length) {
            return;
        }
        let longestKeyLen = opts.set[0].k.length;
        opts.set.forEach(s => longestKeyLen = s.k.length > longestKeyLen ? s.k.length : longestKeyLen);
        opts.spacerChar = opts.spacerChar && opts.spacerChar.length ? opts.spacerChar : ' ';
        opts.set.forEach(pair => {
            let spaces = opts.spacerChar && opts.spacerChar.length ? opts.spacerChar : ' ';
            for (let i = 0; i < (longestKeyLen - pair.k.length); i++) {
                spaces += opts.spacerChar;
            }
            if (noColor) {
                console.log(`- ${pair.k}: ${spaces + pair.v}`);
                return;
            }
            console.log(`- ${Chalk.yellow(pair.k)}: ${spaces + pair.v}`);
        });
    }
    /**
     * Prints the data passed in as tabular data.
     *
     * @param {ITableStructure} table
     * @memberof Output
     */
    printTableExperimental(table, noColor) {
        this.setLongestCellWidth(table);
        this.writeHeadingTopRow(table.heading, noColor);
        this.writeHeadingValues(table.heading, noColor);
        this.writeHeadingFooter(table.heading, noColor);
        this.writeRows(table.rows);
        console.log(this.table);
    }
    /**
     * Writes the heading top lines on the table string
     *
     * @private
     * @param {string[]} heading
     * @memberof Output
     */
    writeHeadingTopRow(heading, noColor) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += noColor ? table_delimiters_const_1.TableDelimiters.topLeft : Chalk.gray(table_delimiters_const_1.TableDelimiters.topLeft);
                for (let i = 0; i <= this.longestCellWidth; i++) {
                    this.table += noColor ? table_delimiters_const_1.TableDelimiters.top : Chalk.gray(table_delimiters_const_1.TableDelimiters.top);
                }
                this.table += noColor ? table_delimiters_const_1.TableDelimiters.topMid : Chalk.gray(table_delimiters_const_1.TableDelimiters.topMid);
            }
            if (index === heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) {
                    this.table += noColor ? table_delimiters_const_1.TableDelimiters.top : Chalk.gray(table_delimiters_const_1.TableDelimiters.top);
                }
                this.table += noColor ? table_delimiters_const_1.TableDelimiters.topRight : Chalk.gray(table_delimiters_const_1.TableDelimiters.topRight);
            }
            if (index !== 0 && index !== heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) {
                    this.table += noColor ? table_delimiters_const_1.TableDelimiters.top : Chalk.gray(table_delimiters_const_1.TableDelimiters.top);
                }
                this.table += noColor ? table_delimiters_const_1.TableDelimiters.topMid : Chalk.gray(table_delimiters_const_1.TableDelimiters.topMid);
            }
        });
        this.table += '\n';
    }
    /**
     * Writes the heading values on the table string
     *
     * @private
     * @param {string[]} heading
     * @memberof Output
     */
    writeHeadingValues(heading, noColor) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += noColor ? table_delimiters_const_1.TableDelimiters.left : Chalk.gray(table_delimiters_const_1.TableDelimiters.left);
                this.table += noColor ? headingVal : Chalk.bold.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) {
                    this.table += ' ';
                }
                this.table += noColor ? table_delimiters_const_1.TableDelimiters.right : Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
            }
            if (index === heading.length - 1) {
                this.table += noColor ? headingVal : Chalk.bold.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) {
                    this.table += ' ';
                }
                this.table += noColor ? table_delimiters_const_1.TableDelimiters.right : Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
            }
            if (index !== 0 && index !== heading.length - 1) {
                this.table += noColor ? heading : Chalk.bold.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) {
                    this.table += ' ';
                }
                this.table += noColor ? table_delimiters_const_1.TableDelimiters.right : Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
            }
        });
        this.table += '\n';
    }
    /**
     * Writes the heading bottom lines on the table string
     *
     * @private
     * @param {string[]} heading
     * @memberof Output
     */
    writeHeadingFooter(heading, noColor) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += noColor ? table_delimiters_const_1.TableDelimiters.leftMid : Chalk.gray(table_delimiters_const_1.TableDelimiters.leftMid);
                for (let i = 0; i <= this.longestCellWidth; i++) {
                    this.table += noColor ? table_delimiters_const_1.TableDelimiters.bottom : Chalk.gray(table_delimiters_const_1.TableDelimiters.bottom);
                }
                this.table += noColor ? table_delimiters_const_1.TableDelimiters.midMid : Chalk.gray(table_delimiters_const_1.TableDelimiters.midMid);
            }
            if (index === heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) {
                    this.table += noColor ? table_delimiters_const_1.TableDelimiters.bottom : Chalk.gray(table_delimiters_const_1.TableDelimiters.bottom);
                }
                this.table += noColor ? table_delimiters_const_1.TableDelimiters.rightMid : Chalk.gray(table_delimiters_const_1.TableDelimiters.rightMid);
            }
            if (index !== 0 && index !== heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) {
                    this.table += noColor ? table_delimiters_const_1.TableDelimiters.bottom : Chalk.gray(table_delimiters_const_1.TableDelimiters.bottom);
                }
                this.table += noColor ? table_delimiters_const_1.TableDelimiters.midMid : Chalk.gray(table_delimiters_const_1.TableDelimiters.midMid);
            }
        });
        this.table += '\n';
    }
    /**
     * Writes the values contained into the given rows, one set at the time on the table string
     *
     * @private
     * @param {Array<string[]>} rows
     * @memberof Output
     */
    writeRows(rows, noColor) {
        rows.forEach((valuesSet, setIndex) => {
            valuesSet.forEach((value, valueIndex) => {
                if (valueIndex === 0) {
                    this.table += noColor ? table_delimiters_const_1.TableDelimiters.left : Chalk.gray(table_delimiters_const_1.TableDelimiters.left);
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) {
                        this.table += ' ';
                    }
                    this.table += noColor ? table_delimiters_const_1.TableDelimiters.right : Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
                }
                if (valueIndex === valuesSet.length - 1) {
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) {
                        this.table += ' ';
                    }
                    this.table += noColor ? table_delimiters_const_1.TableDelimiters.right : Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
                }
                if (valueIndex !== 0 && valueIndex !== valuesSet.length - 1) {
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) {
                        this.table += ' ';
                    }
                    this.table += noColor ? table_delimiters_const_1.TableDelimiters.right : Chalk.gray(table_delimiters_const_1.TableDelimiters.right);
                }
            });
            this.table += '\n';
            valuesSet.forEach((value, valueIndex) => {
                if (valueIndex === 0) {
                    if (noColor) {
                        this.table += setIndex === rows.length - 1 ? table_delimiters_const_1.TableDelimiters.bottomLeft : table_delimiters_const_1.TableDelimiters.leftMid;
                        this.table += table_delimiters_const_1.TableDelimiters.mid;
                        for (let i = 0; i != this.longestCellWidth; i++) {
                            this.table += table_delimiters_const_1.TableDelimiters.mid;
                        }
                        this.table += setIndex === rows.length - 1 ? table_delimiters_const_1.TableDelimiters.bottomMid : table_delimiters_const_1.TableDelimiters.midMid;
                    }
                    else {
                        this.table += setIndex === rows.length - 1 ? Chalk.gray(table_delimiters_const_1.TableDelimiters.bottomLeft) : Chalk.gray(table_delimiters_const_1.TableDelimiters.leftMid);
                        this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                        for (let i = 0; i != this.longestCellWidth; i++) {
                            this.table += Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                        }
                        this.table += setIndex === rows.length - 1 ? Chalk.gray(table_delimiters_const_1.TableDelimiters.bottomMid) : Chalk.gray(table_delimiters_const_1.TableDelimiters.midMid);
                    }
                }
                if (valueIndex === valuesSet.length - 1) {
                    this.table += noColor ? table_delimiters_const_1.TableDelimiters.mid : Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    for (let i = 0; i != this.longestCellWidth; i++) {
                        this.table += noColor ? table_delimiters_const_1.TableDelimiters.mid : Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    }
                    if (noColor) {
                        this.table += setIndex === rows.length - 1 ? table_delimiters_const_1.TableDelimiters.bottomRight : table_delimiters_const_1.TableDelimiters.rightMid;
                    }
                    else {
                        this.table += setIndex === rows.length - 1 ? Chalk.gray(table_delimiters_const_1.TableDelimiters.bottomRight) : Chalk.gray(table_delimiters_const_1.TableDelimiters.rightMid);
                    }
                }
                if (valueIndex !== 0 && valueIndex !== valuesSet.length - 1) {
                    this.table += noColor ? table_delimiters_const_1.TableDelimiters.mid : Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    for (let i = 0; i != this.longestCellWidth; i++) {
                        this.table += noColor ? table_delimiters_const_1.TableDelimiters.mid : Chalk.gray(table_delimiters_const_1.TableDelimiters.mid);
                    }
                    if (noColor) {
                        this.table += setIndex === rows.length - 1 ? Chalk.gray(table_delimiters_const_1.TableDelimiters.bottomMid) : Chalk.gray(table_delimiters_const_1.TableDelimiters.midMid);
                    }
                    else {
                        this.table += setIndex === rows.length - 1 ? Chalk.gray(table_delimiters_const_1.TableDelimiters.bottomMid) : Chalk.gray(table_delimiters_const_1.TableDelimiters.midMid);
                    }
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
     * @memberof Output
     */
    setLongestCellWidth(table) {
        table.heading
            .forEach(h => this.longestCellWidth = h.length > this.longestCellWidth ? h.length : this.longestCellWidth);
        table.rows
            .forEach((rowSet) => rowSet
            .forEach((rowValue) => this.longestCellWidth = rowValue.length > this.longestCellWidth ? rowValue.length : this.longestCellWidth));
    }
};
Output = __decorate([
    inversify_1.injectable()
], Output);
exports.Output = Output;
//# sourceMappingURL=output.entity.js.map