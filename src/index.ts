import { TYPES } from './consts/types.const';
import { IoCContainer } from './inversify.config';

import { IParser } from './interfaces/plain/parser.interface';
import { ICommand } from './interfaces/plain/command.interface';
import { IDispatcher } from './interfaces/plain/dispatcher.interface';
import { ICommandOpts } from './interfaces/opts/command-opts.interface';

export class SmartCLI {
    private _parser: IParser;
    private _dispatcher: IDispatcher;
    private _commands: ICommandOpts[];
    private _ui
    public ge

    public constructor() {
        this._commands = [];
        this._parser = IoCContainer.get<IParser>(TYPES.IParser);
        this._dispatcher = IoCContainer.get<IDispatcher>(TYPES.IDispatcher);
    }

    public addCommand(cmd: ICommandOpts): SmartCLI {
        this._commands.push(cmd);
        return this;
    }

    public run(rawUserInput: string): ICommand {
        this._commands.forEach(cmd => this._parser.addCommand(cmd));
        return this._dispatcher.dispatch(this._parser.parse(rawUserInput));
    }
}
