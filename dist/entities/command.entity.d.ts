import 'reflect-metadata';
import { ICommand } from '../interfaces/command.interface';
import { IFlag } from '../interfaces/flag.interface';
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
    setDescription(desc: string): void;
    run(): void;
}
