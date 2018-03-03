import 'reflect-metadata';
import { injectable } from 'inversify';

import { Command } from './command.entity';

import { IParser } from '../interfaces/plain/parser.interface';
import { ICommand } from '../interfaces/plain/command.interface';
import { IFlag, IOption } from '../interfaces/plain/flag.interface';
import { ICommandOpts } from '../interfaces/opts/command-opts.interface';
import { IGetCommandOpts } from '../interfaces/opts/get-command-opts.interface';
import { IGetCommandResult } from '../interfaces/results/get-command-result.interface';
import { NRG_EXCEPTIONS } from '../consts/exceptions.conts';
import { NRGException } from './nrg-exception.entity';

@injectable()
export class Parser implements IParser {
    private _flagDelimiter: string;
    private _flagOptionsDelimiter: string;
    private _flagDirectValueDelimiter: string;
    private _flagOptionValueDelimiter: string;

    private _availableCommands: ICommand[];

    public constructor() {
        //  Sugar
        this._flagDelimiter = '--';
        this._flagOptionsDelimiter = ':';
        this._flagOptionValueDelimiter = '=';
        this._flagDirectValueDelimiter = '=';

        //  Configurations
        this._availableCommands = [];
    }

    public addCommand(cmdOpts: ICommandOpts): void {
        const cmd = new Command();
        cmd.setName(cmdOpts.name);
        cmd.setFlags(cmdOpts.flags);
        cmd.setAction(cmdOpts.action);
        cmd.setDescription(cmdOpts.description);
        this._availableCommands.push(cmd);
    }

    public getCommand(opts: IGetCommandOpts): IGetCommandResult {
        if (opts.single) {
            return {
                cmd: this._availableCommands.find(cmd => cmd.getName() === opts.cmdName) || null,
                commands: null
            }
        }
        return {
            cmd: null,
            commands: this._availableCommands || []
        };
    }

    public parse(rawInput: string): ICommand {
        const flags = this.extractFlags(rawInput);
        const commandName = this.extractCommandName(rawInput);
        const matchingCommand = this._availableCommands.find(c => c.getName() === commandName);

        if (!matchingCommand) {
            new NRGException().throw({
                name: NRG_EXCEPTIONS.NoMatchingCommandException.name,
                message: NRG_EXCEPTIONS.NoMatchingCommandException.message(commandName)
            });
        }

        matchingCommand.setFlags(flags);
        return matchingCommand;
    }

    private extractCommandName(rawInput: string): string {
        return rawInput.split(this._flagDelimiter)[0].trim();
    }

    private extractFlags(rawInput: string): IFlag[] {
        let splittedRawFlags = [];
        if (this.isDirectValue(rawInput)) {
            return this.extractDirectValueFromFlags(rawInput);
        } else {
            splittedRawFlags = rawInput.split(this._flagDelimiter);
            splittedRawFlags.shift();   //  remove the command
        }

        const flags: IFlag[] = [];
        splittedRawFlags.forEach(currentRawFlag => {
            const splittedRawOptions = currentRawFlag.split(this._flagOptionsDelimiter);

            //  Extract the flag from the string
            const parsedFlag = splittedRawOptions[0].trim();
            //  Throw it from the array
            splittedRawOptions.shift();

            const opts: IOption[] = [];
            //  Loop the remaining options (from now on there will be only options)
            splittedRawOptions.forEach(opt => {
                let name = opt.split(this._flagOptionValueDelimiter)[0];
                let value = opt.split(this._flagOptionValueDelimiter)[1];

                name = name ? name.trim() : null;
                value = value ? value.trim() : null;

                opts.push({ name: name, value: value });
            });

            flags.push({ name: parsedFlag, options: opts });
        });

        return flags;
    }

    //  TODO: test in spec
    private isDirectValue(rawInput: string): boolean {

        const directValueRegex = new RegExp('--(\\w*=\\w*)'); //  matches "--anyname=value"
        const complexValueRegex = new RegExp('--(\\w*:\\w*=\\w*)'); //  matches "--anyname:key=value"

        if (!!directValueRegex.test(rawInput) && !!complexValueRegex.test(rawInput)) {
            new NRGException().throw({
                name: NRG_EXCEPTIONS.MixedCommandsValueTypesException.name,
                message: NRG_EXCEPTIONS.MixedCommandsValueTypesException.message(),
            });
        }
        if (!!directValueRegex.test(rawInput)) {
            return true;
        }

        return false;
    }

    private extractDirectValueFromFlags(rawInput: string): IFlag[] {
        const flags = [];
        const splittedRawInput = rawInput.split(this._flagDelimiter);
        splittedRawInput.shift();
        splittedRawInput.forEach(stringyFlag => flags.push(this.getParsedFlagWithOptionsFromDirectValueFlag(stringyFlag)));

        return flags;
    }

    private getParsedFlagWithOptionsFromDirectValueFlag(rawStringyFlag: string): IFlag {
        return {
            name: rawStringyFlag.split(this._flagDirectValueDelimiter)[0],
            options: [{
                name: rawStringyFlag.split(this._flagDirectValueDelimiter)[0],
                value: rawStringyFlag.split(this._flagDirectValueDelimiter)[1]
            }]
        };
    }
}