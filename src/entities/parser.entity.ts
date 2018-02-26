import 'reflect-metadata';
import { injectable } from 'inversify';

import { Command } from './command.entity';

import { IParser } from '../interfaces/parser.interface';
import { ICommand } from '../interfaces/command.interface';
import { IFlag } from '../interfaces/flag.interface';

@injectable()
export class Parser implements IParser {
    private _command: ICommand;
    private _flagDelimiter: string;
    private _flagOptionsDelimiter: string;

    public constructor() {
        this._flagDelimiter = '--';
        this._flagOptionsDelimiter = ':';
        this._command = new Command();
    }

    public parse(rawInput: string): ICommand {
        const commandName = this.extractCommandName(rawInput);
        const flags = this.extractFlags(rawInput);

        this._command.setName(commandName);
        this._command.setFlags(flags);
        return this._command;
    }

    private extractCommandName(rawInput: string): string {
        return rawInput.split(this._flagDelimiter)[0].trim();
    }

    private extractFlags(rawInput: string): IFlag[] {
        const xplItems = rawInput.split(this._flagDelimiter);
        xplItems.shift();   //  remove the command

        const flags: IFlag[] = [];
        xplItems.forEach(item => {
            const xplItems = item.split(this._flagOptionsDelimiter);

            const flag = xplItems[0].trim();
            xplItems.shift();   //  remove the flag

            const opts = [];
            xplItems.forEach(opt => opts.push(opt.trim()));

            flags.push({ name: flag, options: opts });
        });

        return flags;
    }
}