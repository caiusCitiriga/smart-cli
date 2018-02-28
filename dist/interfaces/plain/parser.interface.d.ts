import { ICommand } from './command.interface';
import { ICommandOpts } from '../opts/command-opts.interface';
import { IGetCommandOpts } from '../opts/get-command-opts.interface';
import { IGetCommandResult } from '../results/get-command-result.interface';
export interface IParser {
    parse(rawInput: string): ICommand;
    addCommand(cmd: ICommandOpts): void;
    getCommand(opts: IGetCommandOpts): IGetCommandResult;
}
