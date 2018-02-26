import "reflect-metadata";
import { injectable } from "inversify";

import { IParser } from "../interfaces/parser.interface";
import { ICommand } from "../interfaces/command.interface";

@injectable()
export class Parser implements IParser {
    public parse(rawInputUser: string): ICommand {
        console.log('Parsing...');
        return {} as ICommand;
    }
}