import 'reflect-metadata';
import { IParser } from '../interfaces/parser.interface';
import { ICommand } from '../interfaces/command.interface';
export declare class Parser implements IParser {
    private _command;
    private _flagDelimiter;
    private _flagOptionsDelimiter;
    constructor();
    parse(rawInput: string): ICommand;
    private extractCommandName(rawInput);
    private extractFlags(rawInput);
}
