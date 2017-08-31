import * as Process from 'process';
import * as Chalk from 'chalk';

export const TableDelimiters = {
    top: '─',
    topMid: '┬',
    topLeft: '┌',
    topRight: '┐',
    bottom: '─',
    bottomMid: '┴',
    bottomLeft: '└',
    bottomRight: '┘',
    left: '│',
    leftMid: '├',
    mid: '─',
    midMid: '┼',
    right: '│',
    rightMid: '┤',
    middle: '│'
}

export class TableStructure {
    heading: string[];
    rowsWidth: number[];
    rows: Array<string[]>;
}

export class RowsConsistencyResult {
    isOk: boolean;
    wrongRows: {
        rowIndex: number,
        rowValues: any[];
    }[];
}

export class SmartCLI {
    private longestRowValue = 0;
    private longestSlotIndex = -1;

    public printTable(tableStruct: TableStructure) {
        try {
            this.checkRowsConsistency(tableStruct);
            this.calculateLongestRowValueAndIndex(tableStruct);
            let table = '';
            tableStruct.heading.forEach(h => {

            });

        } catch (e) {
            console.error(e);
            return;
        }

    }

    private checkRowsConsistency(tableStruct: TableStructure) {
        const headingLen = tableStruct.heading.length;
        const wrongRows = new RowsConsistencyResult();
        wrongRows.isOk = true;
        wrongRows.wrongRows = [];

        tableStruct.rows.forEach((r, i) => {
            if (r.length !== headingLen) {
                wrongRows.isOk = false;
                wrongRows.wrongRows.push({ rowIndex: i, rowValues: r });
            }
        });

        if (!wrongRows.isOk) {
            let message = 'The rows values doesn\'t match the heading length. The following rows indexes are wrong: ';
            wrongRows.wrongRows.forEach((r, i) => message += r.rowIndex + (i === wrongRows.wrongRows.length - 1 ? '' : ', '));
            throw new Error(message);
        }
    }

    private calculateLongestRowValueAndIndex(tableStruct: TableStructure): number {
        tableStruct.rows.forEach(r => r.forEach((v, i) => {
            const previousLongestRowValue = this.longestRowValue;
            this.longestRowValue = v.length > this.longestRowValue ? v.length : this.longestRowValue;
            this.longestSlotIndex = previousLongestRowValue === this.longestRowValue ? this.longestSlotIndex : i;

        }));
        return this.longestRowValue;
    }
}

const SC = new SmartCLI();

const tableStruct = new TableStructure();
tableStruct.heading = ['Field 1', 'Field 2', 'Field 3', 'Field 4'];
tableStruct.rows = [
    ['Value 1', 'Value 2', 'Value 3', 'Very looooooooooooooooooong value'],
    ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
    ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
    ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
    ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
    ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
    ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
    ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
    ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
];

SC.printTable(tableStruct);