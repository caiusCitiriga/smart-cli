import { IFlag } from "./flag.interface";

export interface ICommand {
    run(flags: IFlag[]): void;
    getName(): string;
    getDescription(): string;
    getFlags(): IFlag[] | undefined;

    setName(name: string): void;
    setFlags(flags: IFlag[]): void;
    setAction(func: () => void): void;
    setDescription(desc: string): void;
}