import { IFlag } from "./flag.interface";
export interface ICommand {
    run(): void;
    getName(): string;
    getDescription(): string;
    getFlags(): IFlag[] | undefined;
    setName(name: string): void;
    setFlags(flags: IFlag[]): void;
    setDescription(desc: string): void;
}
