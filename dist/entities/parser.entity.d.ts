import 'reflect-metadata';
import { IParser } from '../interfaces/plain/parser.interface';
import { ICommand } from '../interfaces/plain/command.interface';
import { ICommandOpts } from '../interfaces/opts/command-opts.interface';
export declare class Parser implements IParser {
    private _flagDelimiter;
    private _flagOptionsDelimiter;
    private _flagOptionValueDelimiter;
    private _availableCommands;
    constructor();
    addCommand(cmdOpts: ICommandOpts): void;
    parse(rawInput: string): ICommand;
    private extractCommandName(rawInput);
    private extractFlags(rawInput);
}
