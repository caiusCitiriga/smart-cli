import 'reflect-metadata';
import { injectable } from 'inversify';

import { IFlag } from '../interfaces/flag.interface';
import { ICommand } from '../interfaces/command.interface';

export class Command implements ICommand {
    private _name: string;
    private _flags?: IFlag[];
    private _action: () => any;
    private _description: string;

    public getName(): string { return this._name; }
    public getFlags(): IFlag[] { return this._flags; }
    public getDescription(): string { return this._description; }

    public setName(name: string): void { this._name = name; }
    public setFlags(flags: IFlag[]): void { this._flags = flags; }
    public setAction(func: () => void): void { this._action = func; }
    public setDescription(desc: string): void { this._description = desc; }

    public run(): void {
        this._action();
    }
}