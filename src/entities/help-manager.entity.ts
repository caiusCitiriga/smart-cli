import 'reflect-metadata';
import * as chalk from 'chalk';
import { injectable, inject } from 'inversify';

import { TYPES } from '../consts/types.const';
import { NRG_EXCEPTIONS } from '../consts/exceptions.conts';

import { NRGException } from './nrg-exception.entity';

import { IFlag } from '../interfaces/plain/flag.interface';
import { IOutput } from '../interfaces/plain/output.interface';
import { ICommand } from '../interfaces/plain/command.interface';
import { ICommandOpts } from '../interfaces/opts/command-opts.interface';
import { IHelpManager } from '../interfaces/plain/help-manager.interface';
import { IKeyValuesOpts } from '../interfaces/opts/key-values-opts.interface';

@injectable()
export class HelpManager implements IHelpManager {
    private _commands: ICommand[];
    @inject(TYPES.IOutput) private _output: IOutput;

    public constructor() {
        this._commands = [];
    }

    public setCommands(commands: ICommand[]): void {
        this._commands = commands;
    }

    public help(flag: IFlag): void {
        if (!this._commands.filter(cmd => cmd.getName() !== 'help').length) {
            new NRGException().throw({
                name: NRG_EXCEPTIONS.CommandsNotSetException.name,
                message: NRG_EXCEPTIONS.CommandsNotSetException.message()
            });
        }

        if (!flag) {
            this.printGeneralHelp();
            return;
        }

        this.printSpecificHelp(flag);
    }

    public getHelpCommandOpts(): ICommandOpts {
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

        console.log();
        this._output.printBoxTitle('General help');
        console.log();
        this._output.printKeyValues(kvpOpts);
        console.log();
    }

    private printSpecificHelp(flag: IFlag): void {
        if (!this._commands.find(cmd => cmd.getName() === flag.name)) {
            new NRGException()
                .throw({
                    name: NRG_EXCEPTIONS.CommandNotFoundException.name,
                    message: NRG_EXCEPTIONS.CommandNotFoundException.message(flag.name)
                });
        }

        const kvSet: IKeyValuesOpts = {
            set: []
        };

        const flags = this._commands
            .find(cmd => cmd.getName() === flag.name)
            .getFlags() || [];

        flags.forEach(flag => {
            let desc = `\n${chalk.gray(flag.description)}\n`;
            desc += flag.options.length ? '\nAvailable options:\n' : '';

            flag.options.forEach(opt => {
                desc += `\n\tName: ${chalk.blue(opt.name)}\n`;
                desc += `\tType: ${chalk.magenta(opt.value)}\n`;
                desc += `\tUsage: ${chalk.cyan('--' + flag.name + ':' + opt.name + '=value')}\n`;
            });

            kvSet.set.push({ k: flag.name, v: desc });
        });

        console.log();
        this._output.printTitle(`${flag.name} help`);
        this._output.printSubtitle(this._commands.find(cmd => cmd.getName() === flag.name).getDescription());
        console.log();
        this._output.printKeyValues(kvSet);
        console.log();
    }
}