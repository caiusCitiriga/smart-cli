import { TableStructure } from './entities/TableStructure.entity';
import { GenericOutput } from './core/GenericOutput.core';
export declare class SCLI {
    private TablePrinter;
    private Prompt;
    GenericOutput: GenericOutput;
    constructor();
    printTable(table: TableStructure): void;
    prompt(question: string, callback: (answer: string) => boolean): void;
}
export declare const SmartCLI: SCLI;
