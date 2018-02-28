import 'reflect-metadata';
import { IFlag } from '../interfaces/flag.interface';
import { ICommand } from '../interfaces/command.interface';
export declare class Command implements ICommand {
    private _name;
    private _flags?;
    private _action;
    private _description;
    getName(): string;
    getFlags(): IFlag[];
    getDescription(): string;
    setName(name: string): void;
    setFlags(flags: IFlag[]): void;
    setAction(func: (flags: IFlag[]) => void): void;
    setDescription(desc: string): void;
    run(flags: IFlag[]): void;
}
