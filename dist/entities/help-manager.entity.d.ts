import 'reflect-metadata';
import { IFlag } from '../interfaces/plain/flag.interface';
import { ICommand } from '../interfaces/plain/command.interface';
import { ICommandOpts } from '../interfaces/opts/command-opts.interface';
import { IHelpManager } from '../interfaces/plain/help-manager.interface';
export declare class HelpManager implements IHelpManager {
    private _commands;
    constructor();
    addCommands(commands: ICommand[]): void;
    help(flags: IFlag): void;
    getHelpCommandOpts(): ICommandOpts;
}
