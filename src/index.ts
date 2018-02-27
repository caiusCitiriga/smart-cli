import { TYPES } from './consts/types.const';
import { IoCContainer } from './inversify.config';

import { IParser } from './interfaces/parser.interface';
import { ICommand } from './interfaces/command.interface';
import { IDispatcher } from './interfaces/dispatcher.interface';
import { Command } from './entities/command.entity';
import { ICommandOpts } from './interfaces/command-opts.interface';

export class SmartCLI {
    private _parser: IParser;
    private _dispatcher: IDispatcher;
    private _commands: ICommandOpts[];

    public constructor() {
        this._commands = [];
        this._parser = IoCContainer.get<IParser>(TYPES.IParser);
        this._dispatcher = IoCContainer.get<IDispatcher>(TYPES.IDispatcher);
    }

    public addCommand(cmd: ICommandOpts): SmartCLI {
        this._commands.push(cmd);
        return this;
    }

    public run(rawUserInput: string): string {
        this._commands.forEach(cmd => this._parser.addCommand(cmd));
        return this._dispatcher.dispatch(this._parser.parse(rawUserInput));
    }
}


const cli = new SmartCLI();
const command: ICommandOpts = {
    name: 'cmd',
    action: () => null,
    description: 'Test',
    flags: []
}

//  Act
cli.addCommand(command);
const userRanCmd = 'cmd';
const returnedRanCmd = cli.run(userRanCmd);