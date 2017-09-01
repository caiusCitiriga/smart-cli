//  Misc deps
import * as Chalk from 'chalk';

//  Consts

//  Entities
import { TableStructure } from '../entities/TableStructure.entity';
import { TableDelimiters } from '../consts/table-delimiters.const';

//  Core

export class TablePrinter {
    /**
     * This will be the reference for the min width of the cells
     * 
     * @private
     * @memberof TablePrinter
     */
    private longestCellWidth = 0;

    private table = '';
    public printTable(table: TableStructure) {
        this.setLongestCellWidth(table);
        this.printHeadingTopRow(table.heading);
        this.printHeadingValues(table.heading);
        this.printHeadingFooter(table.heading);
        this.printRows(table.rows);
        console.log(this.table);
    }

    private printHeadingTopRow(heading: string[]) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += TableDelimiters.topLeft;
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += TableDelimiters.top }
                this.table += TableDelimiters.topMid;
            }

            if (index === heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += TableDelimiters.top }
                this.table += TableDelimiters.topRight;
            }

            if (index !== 0 && index !== heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += TableDelimiters.top }
                this.table += TableDelimiters.topMid;
            }
        });

        this.table += '\n';
    }

    private printHeadingValues(heading: string[]) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += TableDelimiters.left;
                this.table += Chalk.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) { this.table += ' ' }
                this.table += TableDelimiters.right;
            }

            if (index === heading.length - 1) {
                this.table += Chalk.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) { this.table += ' ' }
                this.table += TableDelimiters.right;
            }

            if (index !== 0 && index !== heading.length - 1) {
                this.table += Chalk.yellow(headingVal);
                for (let i = 0; i <= this.longestCellWidth - headingVal.length; i++) { this.table += ' ' }
                this.table += TableDelimiters.right;
            }
        });

        this.table += '\n';
    }

    private printHeadingFooter(heading: string[]) {
        heading.forEach((headingVal, index) => {
            if (index === 0) {
                this.table += TableDelimiters.leftMid;
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += TableDelimiters.bottom }
                this.table += TableDelimiters.midMid;
            }

            if (index === heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += TableDelimiters.bottom }
                this.table += TableDelimiters.rightMid;
            }

            if (index !== 0 && index !== heading.length - 1) {
                for (let i = 0; i <= this.longestCellWidth; i++) { this.table += TableDelimiters.bottom }
                this.table += TableDelimiters.midMid;
            }
        });

        this.table += '\n';
    }

    private printRows(rows: Array<string[]>) {
        rows.forEach((valuesSet, setIndex) => {
            valuesSet.forEach((value, valueIndex) => {
                if (valueIndex === 0) {
                    this.table += TableDelimiters.left;
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) { this.table += ' ' }
                    this.table += TableDelimiters.right;
                }

                if (valueIndex === valuesSet.length - 1) {
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) { this.table += ' ' }
                    this.table += TableDelimiters.right;
                }

                if (valueIndex !== 0 && valueIndex !== valuesSet.length - 1) {
                    this.table += value;
                    for (let i = 0; i <= this.longestCellWidth - value.length; i++) { this.table += ' ' }
                    this.table += TableDelimiters.right;
                }
            });
            this.table += '\n';
            valuesSet.forEach((value, valueIndex) => {
                if (valueIndex === 0) {
                    this.table += setIndex === rows.length - 1 ? TableDelimiters.bottomLeft : TableDelimiters.leftMid;
                    this.table += TableDelimiters.mid;
                    for (let i = 0; i != this.longestCellWidth; i++) { this.table += TableDelimiters.mid }
                    this.table += setIndex === rows.length - 1 ? TableDelimiters.bottomMid : TableDelimiters.midMid;

                }

                if (valueIndex === valuesSet.length - 1) {
                    this.table += TableDelimiters.mid;
                    for (let i = 0; i != this.longestCellWidth; i++) { this.table += TableDelimiters.mid }
                    this.table += setIndex === rows.length - 1 ? TableDelimiters.bottomRight : TableDelimiters.rightMid;
                }

                if (valueIndex !== 0 && valueIndex !== valuesSet.length - 1) {
                    this.table += TableDelimiters.mid;
                    for (let i = 0; i != this.longestCellWidth; i++) { this.table += TableDelimiters.mid }
                    this.table += setIndex === rows.length - 1 ? TableDelimiters.bottomMid : TableDelimiters.midMid;
                }
            });
            this.table += '\n';
        });
    }

    private setLongestCellWidth(table: TableStructure) {
        table.heading
            .forEach(h => this.longestCellWidth = h.length > this.longestCellWidth ? h.length : this.longestCellWidth);
        table.rows
            .forEach((rowSet) => rowSet
                .forEach((rowValue: string) => this.longestCellWidth = rowValue.length > this.longestCellWidth ? rowValue.length : this.longestCellWidth)
            );
    }
}