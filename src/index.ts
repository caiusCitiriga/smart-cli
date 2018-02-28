import { TYPES } from './consts/types.const';
import { IoCContainer } from './inversify.config';

import { IParser } from './interfaces/plain/parser.interface';
import { ICommand } from './interfaces/plain/command.interface';
import { IDispatcher } from './interfaces/plain/dispatcher.interface';
import { ICommandOpts } from './interfaces/opts/command-opts.interface';
import { IHelpManager } from './interfaces/plain/help-manager.interface';
import { Command } from './entities/command.entity';

export class SmartCLI {
    private _parser: IParser;
    private _dispatcher: IDispatcher;
    private _helpManager: IHelpManager;

    private _commands: ICommandOpts[];

    public constructor() {
        this._commands = [];
        this._parser = IoCContainer.get<IParser>(TYPES.IParser);
        this._dispatcher = IoCContainer.get<IDispatcher>(TYPES.IDispatcher);
        this._helpManager = IoCContainer.get<IHelpManager>(TYPES.IHelpManager);
    }

    public addCommand(cmd: ICommandOpts): SmartCLI {
        this._commands.push(cmd);
        return this;
    }

    public run(rawUserInput: string): ICommand {
        this._commands.forEach(cmd => this._parser.addCommand(cmd));

        this._helpManager.setCommands(this._parser.getCommand({ single: false }).commands);
        this._parser.addCommand(this._helpManager.getHelpCommandOpts());

        return this._dispatcher.dispatch(this._parser.parse(rawUserInput));
    }
}
