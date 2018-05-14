import 'reflect-metadata';
import * as Chalk from 'chalk';
import { injectable } from 'inversify';

import { TableDelimiters } from '../consts/table-delimiters.const';

import { IOutput } from '../interfaces/plain/output.interface';
import { ITableOpts } from '../interfaces/opts/table-opts.interface';
import { IKeyValuesOpts } from '../interfaces/opts/key-values-opts.interface';

@injectable()
export class Output implements IOutput {
    /**
     * This will be the reference for the min width of the cells
     * 
     * @private
     * @memberof Output
     */
    private longestCellWidth = 0;


    /**
     * This will be the final output of the table.
     * 
     * @private
     * @memberof Output
     */
    private table = '';

    public printMessage(text: string): void {
        console.log(text);
    }

    public printWarning(text: string, noColor?: boolean) {
        if (noColor) {
            console.log(`WARN: ${text}`);
            return;
        }

        console.log(Chalk.bold.yellow(`WARN: ${text}`));
    }

    public printError(text: string, noColor?: boolean) {
        if (noColor) {
            console.log(`ERROR: ${text}`);
            return;
        }

        console.log(Chalk.bold.red(`ERROR: ${text}`));
    }

    public printInfo(text: string, noColor?: boolean) {
        if (noColor) {
            console.log(`INFO: ${text}`);
            return;
        }

        console.log(Chalk.cyan(`INFO: ${text}`));
    }

    public printTitle(text: string, noColor?: boolean) {
        if (noColor) {
            console.log(text.toUpperCase());
            return;
        }

        console.log(Chalk.bold.magenta(text.toUpperCase()));
    }

    public printSubtitle(text: string, noColor?: boolean) {
        if (noColor) {
            console.log(' ' + text);
            return;
        }

        console.log(Chalk.grey(' ' + text));
    }

    public printBoxTitle(text: string, noColor?: boolean) {
        let title = '';
        for (let i = 0; i <= text.length + 3; i++) {
            if (i === 0) {
                title += TableDelimiters.topLeft;
            }

            if (i !== 0 && i !== text.length + 3) {
                title += TableDelimiters.top;
            }

            if (i === text.length + 3) {
                title += TableDelimiters.topRight;
            }
        }

        title += '\n' + TableDelimiters.left + ' ' + text + ' ' + TableDelimiters.right + '\n';

        for (let i = 0; i <= text.length + 3; i++) {
            if (i === 0) {
                title += TableDelimiters.bottomLeft;
            }

            if (i !== 0 && i !== text.length + 3) {
                title += TableDelimiters.bottom;
            }

            if (i === text.length + 3) {
                title += TableDelimiters.bottomRight;
            }
        }

        if (noColor) {
            console.log(title.toUpperCase());
            return;
        }
        console.log(Chalk.magenta(title.toUpperCase()));
    }

    public printKeyValues(opts: IKeyValuesOpts, noColor?: boolean) {
        if (!opts.set.length) { return; }
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
    public printTableExperimental(table: ITableOpts, noColor?: boolean) {
        this.setLongestCellWidth(table, noColor);
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
    private writeHeadingTopRow(heading: string[], noColor?: boolean) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += noColor ? TableDelimiters.topLeft : Chalk.gray(TableDelimiters.topLeft);
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += noColor ? TableDelimiters.top : Chalk.gray(TableDelimiters.top) }
                this.table += noColor ? TableDelimiters.topMid : Chalk.gray(TableDelimiters.topMid);
            }

            if (index === heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += noColor ? TableDelimiters.top : Chalk.gray(TableDelimiters.top) }
                this.table += noColor ? TableDelimiters.topRight : Chalk.gray(TableDelimiters.topRight);
            }

            if (index !== 0 && index !== heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += noColor ? TableDelimiters.top : Chalk.gray(TableDelimiters.top) }
                this.table += noColor ? TableDelimiters.topMid : Chalk.gray(TableDelimiters.topMid);
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
    private writeHeadingValues(heading: string[], noColor?: boolean) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += noColor ? TableDelimiters.left : Chalk.gray(TableDelimiters.left);
                this.table += noColor ? headingVal : Chalk.bold.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) { this.table += ' ' }
                this.table += noColor ? TableDelimiters.right : Chalk.gray(TableDelimiters.right);
            }

            if (index === heading.length - 1) {
                this.table += noColor ? headingVal : Chalk.bold.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) { this.table += ' ' }
                this.table += noColor ? TableDelimiters.right : Chalk.gray(TableDelimiters.right);
            }

            if (index !== 0 && index !== heading.length - 1) {
                this.table += noColor ? heading : Chalk.bold.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) { this.table += ' ' }
                this.table += noColor ? TableDelimiters.right : Chalk.gray(TableDelimiters.right);
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
    private writeHeadingFooter(heading: string[], noColor?: boolean) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += noColor ? TableDelimiters.leftMid : Chalk.gray(TableDelimiters.leftMid);
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += noColor ? TableDelimiters.bottom : Chalk.gray(TableDelimiters.bottom) }
                this.table += noColor ? TableDelimiters.midMid : Chalk.gray(TableDelimiters.midMid);
            }

            if (index === heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += noColor ? TableDelimiters.bottom : Chalk.gray(TableDelimiters.bottom) }
                this.table += noColor ? TableDelimiters.rightMid : Chalk.gray(TableDelimiters.rightMid);
            }

            if (index !== 0 && index !== heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += noColor ? TableDelimiters.bottom : Chalk.gray(TableDelimiters.bottom) }
                this.table += noColor ? TableDelimiters.midMid : Chalk.gray(TableDelimiters.midMid);
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
    private writeRows(rows: Array<string[]>, noColor?: boolean) {
        rows.forEach((valuesSet, setIndex) => {
            valuesSet.forEach((value, valueIndex) => {
                if (valueIndex === 0) {
                    this.table += noColor ? TableDelimiters.left : Chalk.gray(TableDelimiters.left);
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) { this.table += ' ' }
                    this.table += noColor ? TableDelimiters.right : Chalk.gray(TableDelimiters.right);
                }

                if (valueIndex === valuesSet.length - 1) {
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) { this.table += ' ' }
                    this.table += noColor ? TableDelimiters.right : Chalk.gray(TableDelimiters.right);
                }

                if (valueIndex !== 0 && valueIndex !== valuesSet.length - 1) {
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) { this.table += ' ' }
                    this.table += noColor ? TableDelimiters.right : Chalk.gray(TableDelimiters.right);
                }
            });
            this.table += '\n';
            valuesSet.forEach((value, valueIndex) => {
                if (valueIndex === 0) {
                    if (noColor) {
                        this.table += setIndex === rows.length - 1 ? TableDelimiters.bottomLeft : TableDelimiters.leftMid;
                        this.table += TableDelimiters.mid;

                        for (let i = 0; i != this.longestCellWidth; i++) { this.table += TableDelimiters.mid }
                        this.table += setIndex === rows.length - 1 ? TableDelimiters.bottomMid : TableDelimiters.midMid;
                    } else {
                        this.table += setIndex === rows.length - 1 ? Chalk.gray(TableDelimiters.bottomLeft) : Chalk.gray(TableDelimiters.leftMid);
                        this.table += Chalk.gray(TableDelimiters.mid);

                        for (let i = 0; i != this.longestCellWidth; i++) { this.table += Chalk.gray(TableDelimiters.mid) }
                        this.table += setIndex === rows.length - 1 ? Chalk.gray(TableDelimiters.bottomMid) : Chalk.gray(TableDelimiters.midMid);
                    }

                }

                if (valueIndex === valuesSet.length - 1) {
                    this.table += noColor ? TableDelimiters.mid : Chalk.gray(TableDelimiters.mid);
                    for (let i = 0; i != this.longestCellWidth; i++) { this.table += noColor ? TableDelimiters.mid : Chalk.gray(TableDelimiters.mid) }
                    if (noColor) {
                        this.table += setIndex === rows.length - 1 ? TableDelimiters.bottomRight : TableDelimiters.rightMid;
                    } else {
                        this.table += setIndex === rows.length - 1 ? Chalk.gray(TableDelimiters.bottomRight) : Chalk.gray(TableDelimiters.rightMid);
                    }
                }

                if (valueIndex !== 0 && valueIndex !== valuesSet.length - 1) {
                    this.table += noColor ? TableDelimiters.mid : Chalk.gray(TableDelimiters.mid);
                    for (let i = 0; i != this.longestCellWidth; i++) { this.table += noColor ? TableDelimiters.mid : Chalk.gray(TableDelimiters.mid) }
                    if (noColor) {
                        this.table += setIndex === rows.length - 1 ? Chalk.gray(TableDelimiters.bottomMid) : Chalk.gray(TableDelimiters.midMid);
                    } else {
                        this.table += setIndex === rows.length - 1 ? Chalk.gray(TableDelimiters.bottomMid) : Chalk.gray(TableDelimiters.midMid);
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
    private setLongestCellWidth(table: ITableOpts) {
        table.heading
            .forEach(h => this.longestCellWidth = h.length > this.longestCellWidth ? h.length : this.longestCellWidth);
        table.rows
            .forEach((rowSet) => rowSet
                .forEach((rowValue: string) => this.longestCellWidth = rowValue.length > this.longestCellWidth ? rowValue.length : this.longestCellWidth)
            );
    }
}
