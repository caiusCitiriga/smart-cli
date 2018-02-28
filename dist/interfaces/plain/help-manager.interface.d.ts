import { IFlag } from "./flag.interface";
import { ICommand } from "./command.interface";
import { ICommandOpts } from "../opts/command-opts.interface";
export interface IHelpManager {
    help(flags: IFlag): void;
    setCommands(commands: ICommand[]): void;
    getHelpCommandOpts(): ICommandOpts;
}
