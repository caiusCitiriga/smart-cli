import { TYPES } from "./consts/types.const";
import { IoCContainer } from "./inversify.config";

import { IParser } from "./interfaces/parser.interface";
import { IDispatcher } from "./interfaces/dispatcher.interface";
import { ICommand } from "./interfaces/command.interface";

class _SmartCLI {
    private _parser: IParser;
    private _dispatcher: IDispatcher;

    public constructor() {
        this._parser = IoCContainer.get<IParser>(TYPES.IParser);
        this._dispatcher = IoCContainer.get<IDispatcher>(TYPES.IDispatcher);
    }

    public initialize(): void {
        this._parser.parse('my input');
        this._dispatcher.dispatch({} as ICommand);
    }
}

const SmartCLI = new _SmartCLI();

export { SmartCLI };