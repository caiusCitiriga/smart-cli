import { TableDelimiters } from './consts/table-delimiters.const';

import { TableStructure } from './entities/TableStructure.entity';

import { Prompt } from './core/Prompt.core';
import { TablePrinter } from './core/TablePrinter.core';

export class SmartCLI {
    private TablePrinter: TablePrinter;
    private Prompt: Prompt;
    constructor() {
        this.TablePrinter = new TablePrinter();
        this.Prompt = new Prompt();
    }

    public printTable(table: TableStructure) {
        this.TablePrinter.printTable(table);
    }

    public prompt(question: string, callback: (answer: string) => boolean) {
        this.Prompt.prompt(question, callback);
    }
}


/**
 * ***************************************************************
 * Program run (will be removed from here)
 * ***************************************************************
 */
const SC = new SmartCLI();
const tbl = new TableStructure();
tbl.heading = ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5'];
tbl.rows = [
    ['Row 1 value 1', 'Row 1 value 2', 'Row 1 value 3', 'Row 1 value 4', 'Row 1 value 5'],
    ['Row 2 value 1', 'Row 2 value 2', 'Row 2 value 3', 'Row 2 value 4', 'Row 2 value 5'],
    ['Row 3 value 1', 'Row 3 value 2', 'Row 3 value 3', 'Row 3 value 4', 'Row 3 value 5'],
    ['Row 4 value 1', 'Row 4 value 2', 'Row 4 value 3', 'Row 4 value 4', 'Row 4 value 5'],
    ['Row 5 value 1', 'Row 5 value 2', 'Row 5 value 3', 'Row 5 value 4', 'Row 5 value 5'],
    ['Row 6 value 1', 'Row 6 value 2', 'Row 6 value 3', 'Row 6 value 4', 'Row 6 value 5'],
];

const promptHandler = (answer: string) => {
    switch (answer.toLowerCase()) {
        case 'true':
            SC.printTable(tbl);
            return true;
        case 'false':
            console.log('Ugly you then!');
            return true;
        default:
            SC.prompt('Not a valid answer. Use true or false: ', promptHandler);
            return false;
    }
};

SC.prompt('Want a table? Type true or false: ', promptHandler);