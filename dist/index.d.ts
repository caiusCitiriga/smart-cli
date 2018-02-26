import { ICommand } from './interfaces/command.interface';
export declare class SmartCLI {
    private _parser;
    private _commands;
    private _dispatcher;
    constructor();
    addCommand(cmd: ICommand): SmartCLI;
    run(rawUserInput: string): void;
}
