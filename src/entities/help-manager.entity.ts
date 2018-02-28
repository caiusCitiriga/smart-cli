import 'reflect-metadata';
import { injectable, inject } from 'inversify';

import { IFlag } from '../interfaces/plain/flag.interface';
import { ICommand } from '../interfaces/plain/command.interface';
import { ICommandOpts } from '../interfaces/opts/command-opts.interface';
import { IHelpManager } from '../interfaces/plain/help-manager.interface';
import { IKeyValuesOpts } from '../interfaces/opts/key-values-opts.interface';
import { IOutput } from '../interfaces/plain/output.interface';
import { TYPES } from '../consts/types.const';
import { NRGException } from './nrg-exception.entity';
import { NRG_EXCEPTIONS } from '../consts/exceptions.conts';

@injectable()
export class HelpManager implements IHelpManager {
    private _commands: ICommand[];
    @inject(TYPES.IOutput) private _output: IOutput;

    public constructor() {
        this._commands = [];
    }

    public addCommands(commands: ICommand[]): void {
        this._commands = commands;
    }

    public help(flag: IFlag): void {
        if (!flag) {
            this.printGeneralHelp();
        }
        this.printSpecificHelp(flag);
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

    private printGeneralHelp(): void {
        const kvpOpts: IKeyValuesOpts = {
            set: []
        };
        this._commands.forEach(cmd => kvpOpts.set.push({ k: cmd.getName(), v: cmd.getDescription() }));
        this._output.printKeyValues(kvpOpts);
    }

    private printSpecificHelp(flag: IFlag): void {
        if (!this._commands.find(cmd => cmd.getName() === flag.name)) {
            new NRGException()
                .throw({
                    name: NRG_EXCEPTIONS.CommandNotFoundException.name,
                    message: NRG_EXCEPTIONS.CommandNotFoundException.message(flag.name)
                });
        }
    }
}