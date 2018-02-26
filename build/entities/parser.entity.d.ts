import 'reflect-metadata';
import { IParser } from '../interfaces/parser.interface';
import { ICommand } from '../interfaces/command.interface';
export declare class Parser implements IParser {
    parse(rawInputUser: string): ICommand;
}
