import { TYPES } from './consts/types.const';
import { IoCContainer } from './inversify.config';

import { IParser } from './interfaces/parser.interface';
import { ICommand } from './interfaces/command.interface';
import { IDispatcher } from './interfaces/dispatcher.interface';

export class SmartCLI {
    private _parser: IParser;
    private _commands: ICommand[];
    private _dispatcher: IDispatcher;

    public constructor() {
        this._parser = IoCContainer.get<IParser>(TYPES.IParser);
        this._dispatcher = IoCContainer.get<IDispatcher>(TYPES.IDispatcher);
    }

    public addCommand(cmd: ICommand): SmartCLI {
        this._commands.push(cmd);
        return this;
    }

    public run(rawUserInput: string): void {
        this._dispatcher.dispatch(this._parser.parse(rawUserInput));
    }
}
