import { TYPES } from './consts/types.const';
import { IoCContainer } from './inversify.config';

import { IParser } from './interfaces/parser.interface';
import { ICommand } from './interfaces/command.interface';
import { IDispatcher } from './interfaces/dispatcher.interface';

export class SmartCLI {
    private _parser: IParser;
    private _dispatcher: IDispatcher;

    public constructor() {
        this._parser = IoCContainer.get<IParser>(TYPES.IParser);
        this._dispatcher = IoCContainer.get<IDispatcher>(TYPES.IDispatcher);
        this.initialize();
    }

    public initialize(): void {
        this._parser.parse('my input');
        this._dispatcher.dispatch({} as ICommand);
    }
}
