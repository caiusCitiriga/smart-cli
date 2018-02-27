import { ICommandOpts } from './interfaces/command-opts.interface';
export declare class SmartCLI {
    private _parser;
    private _dispatcher;
    private _commands;
    constructor();
    addCommand(cmd: ICommandOpts): SmartCLI;
    run(rawUserInput: string): string;
}
