import { TableDelimiters } from './consts/table-delimiters.const';

import { TableStructure } from './entities/TableStructure.entity';

import { Prompt } from './core/Prompt.core';
import { TablePrinter } from './core/TablePrinter.core';
import { GenericOutput } from './core/GenericOutput.core';

export class SmartCLI {
    private TablePrinter: TablePrinter;
    private Prompt: Prompt;

    public GenericOutput: GenericOutput;

    constructor() {
        this.TablePrinter = new TablePrinter();
        this.Prompt = new Prompt();
        this.GenericOutput = new GenericOutput();
    }

    public printTable(table: TableStructure) {
        this.TablePrinter.printTable(table);
    }

    public prompt(question: string, callback: (answer: string) => boolean) {
        this.Prompt.prompt(question, callback);
    }
}

export const SCLI = new SmartCLI();