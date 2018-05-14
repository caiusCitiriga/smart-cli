import { ICommand } from './interfaces/plain/command.interface';
import { ICommandOpts } from './interfaces/opts/command-opts.interface';
import { IUserInterface } from './interfaces/plain/user-interface.interface';
export declare const UILibrary: IUserInterface;
export declare class SmartCLI {
    private _parser;
    private _dispatcher;
    private _helpManager;
    private _commands;
    /**
     * [DEPRECATED] Don't use this anymore. It will be removed with next releases. Use UILibrary const instead.
     * @deprecated
     * @type {IUserInterface}
     * @memberof SmartCLI
     */
    UI: IUserInterface;
    constructor();
    addCommand(cmd: ICommandOpts): SmartCLI;
    run(rawUserInput: string): ICommand;
}
