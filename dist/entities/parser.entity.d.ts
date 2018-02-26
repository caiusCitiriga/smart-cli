import 'reflect-metadata';
import { IParser } from '../interfaces/parser.interface';
import { ICommand } from '../interfaces/command.interface';
export declare class Parser implements IParser {
    private _flagDelimiter;
    private _flagOptionsDelimiter;
    private _parsedCommand;
    private _availableCommands;
    constructor();
    addCommand(cmd: ICommand): void;
    parse(rawInput: string): ICommand;
    private extractCommandName(rawInput);
    private extractFlags(rawInput);
}
