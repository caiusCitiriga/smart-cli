import { ITableOpts } from "../opts/table-opts.interface";
import { IKeyValuesOpts } from "../opts/key-values-opts.interface";
export interface IOutput {
    printInfo(text: string, noColor?: boolean): void;
    printTitle(text: string, noColor?: boolean): void;
    printError(text: string, noColor?: boolean): void;
    printMessage(text: string, noColor?: boolean): void;
    printWarning(text: string, noColor?: boolean): void;
    printSubtitle(text: string, noColor?: boolean): void;
    printBoxTitle(text: string, noColor?: boolean): void;
    printKeyValues(opts: IKeyValuesOpts, noColor?: boolean): void;
    printTableExperimental(table: ITableOpts, noColor?: boolean): void;
}
