import 'reflect-metadata';
import { IParser } from '../interfaces/plain/parser.interface';
import { ICommand } from '../interfaces/plain/command.interface';
import { ICommandOpts } from '../interfaces/opts/command-opts.interface';
import { IGetCommandOpts } from '../interfaces/opts/get-command-opts.interface';
import { IGetCommandResult } from '../interfaces/results/get-command-result.interface';
export declare class Parser implements IParser {
    private _flagDelimiter;
    private _flagOptionsDelimiter;
    private _flagDirectValueDelimiter;
    private _flagOptionValueDelimiter;
    private _availableCommands;
    constructor();
    addCommand(cmdOpts: ICommandOpts): void;
    getCommand(opts: IGetCommandOpts): IGetCommandResult;
    parse(rawInput: string): ICommand;
    private extractCommandName(rawInput);
    private extractFlags(rawInput);
    private isDirectValue(rawInput);
    private extractDirectValueFromFlags(rawInput);
}
