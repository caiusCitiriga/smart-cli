import 'reflect-metadata';
import { injectable } from 'inversify';

import { Command } from './command.entity';

import { IFlag } from '../interfaces/flag.interface';
import { IParser } from '../interfaces/parser.interface';
import { ICommand } from '../interfaces/command.interface';
import { ICommandOpts } from '../interfaces/command-opts.interface';

@injectable()
export class Parser implements IParser {
    private _flagDelimiter: string;
    private _flagOptionsDelimiter: string;

    private _availableCommands: ICommand[];

    public constructor() {
        //  Sugar
        this._flagDelimiter = '--';
        this._flagOptionsDelimiter = ':';

        //  Configurations
        this._availableCommands = [];
    }

    public addCommand(cmdOpts: ICommandOpts): void {
        const cmd = new Command();
        cmd.setName(cmdOpts.name);
        cmd.setAction(cmdOpts.action);
        cmd.setDescription(cmdOpts.description);

        this._availableCommands.push(cmd);
    }

    public parse(rawInput: string): ICommand {
        const flags = this.extractFlags(rawInput);
        const commandName = this.extractCommandName(rawInput);
        const matchingCommand = this._availableCommands.find(c => c.getName() === commandName);

        if (!matchingCommand) {
            const noMatchingCommandException = new Error();
            noMatchingCommandException.name = 'NoMatchingCommand';
            noMatchingCommandException.message = `No matching command was found for ${commandName}`;

            throw noMatchingCommandException;
        }

        matchingCommand.setFlags(flags);
        return matchingCommand;
    }

    private extractCommandName(rawInput: string): string {
        return rawInput.split(this._flagDelimiter)[0].trim();
    }

    private extractFlags(rawInput: string): IFlag[] {
        const splittedRawFlags = rawInput.split(this._flagDelimiter);
        splittedRawFlags.shift();   //  remove the command

        const flags: IFlag[] = [];
        splittedRawFlags.forEach(currentRawFlag => {
            const splittedRawOptions = currentRawFlag.split(this._flagOptionsDelimiter);

            //  Extract the flag from the string
            const parsedFlag = splittedRawOptions[0].trim();
            //  Throw it from the array
            splittedRawOptions.shift();

            const opts = [];
            //  Loop the remaining options (from now on there will be only options)
            splittedRawOptions.forEach(opt => opts.push(opt.trim()));

            flags.push({ name: parsedFlag, options: opts });
        });

        return flags;
    }
}