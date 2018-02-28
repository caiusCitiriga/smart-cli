import 'reflect-metadata';
import { injectable } from 'inversify';

import { IFlag } from '../interfaces/plain/flag.interface';
import { ICommand } from '../interfaces/plain/command.interface';
import { ICommandOpts } from '../interfaces/opts/command-opts.interface';
import { IHelpManager } from '../interfaces/plain/help-manager.interface';

@injectable()
export class HelpManager implements IHelpManager {
    private _commands: ICommand[];

    public constructor() {
        this._commands = [];
    }

    public addCommands(commands: ICommand[]): void {
        this._commands = commands;
    }

    public help(flags: IFlag): void {
        // this._commands.forEach(cmd => {

        // });
        console.log('Helping!');
    }

    public getHelpCommandOpts(): ICommandOpts {
        if (!this._commands) {
            const CommandsNotSetException = new Error();
            CommandsNotSetException.name = 'CommandsNotSetException';
            CommandsNotSetException.message = 'The commands are not set in the HelpManager. Set them before generating the help CommandOpts';

            throw CommandsNotSetException;
        }

        const helpCmdOpts: ICommandOpts = {
            flags: [],
            name: 'help',
            description: 'Shows informations about the available commands, and their usage',
            action: (flags) => this.help(flags[0]),
        };

        this._commands.forEach(cmd => helpCmdOpts.flags.push({ name: cmd.getName(), description: '', options: [] }));
        return helpCmdOpts;
    }
}