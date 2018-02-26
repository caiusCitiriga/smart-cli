import { ICommand } from './command.interface';

export interface IParser {
    parse(rawInputUser: string): ICommand;
}