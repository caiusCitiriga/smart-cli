import { ICommand } from './command.interface';
import { ICommandOpts } from '../opts/command-opts.interface';
export interface IParser {
    addCommand(cmd: ICommandOpts): void;
    parse(rawInputUser: string): ICommand;
}
