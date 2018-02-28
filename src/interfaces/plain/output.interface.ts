import { ITableOpts } from "../opts/table-opts.interface";
import { IKeyValuesOpts } from "../opts/key-values-opts.interface";

export interface IOutput {
    printInfo(text: string): void;
    printTitle(text: string): void;
    printMessage(text: string): void;
    printWarning(text: string): void;
    printSubtitle(text: string): void;
    printBoxTitle(text: string): void;
    printTable(table: ITableOpts): void;
    printKeyValues(opts: IKeyValuesOpts): void;
}