import "reflect-metadata";
import { injectable } from "inversify";

import { ICommand } from "../interfaces/command.interface";

@injectable()
export class Command implements ICommand {
    public run(): void {
        console.log('Running command');
    }
}