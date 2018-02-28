import { ICommand } from './interfaces/plain/command.interface';
import { ICommandOpts } from './interfaces/opts/command-opts.interface';
export declare class SmartCLI {
    private _parser;
    private _dispatcher;
    private _helpManager;
    private _commands;
    constructor();
    addCommand(cmd: ICommandOpts): SmartCLI;
    run(rawUserInput: string): ICommand;
}
