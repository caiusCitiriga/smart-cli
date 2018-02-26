import "reflect-metadata";
import { injectable } from "inversify";

import { ICommand } from "../interfaces/command.interface";
import { IDispatcher } from "../interfaces/dispatcher.interface";

@injectable()
export class Dispatcher implements IDispatcher {
    public dispatch(cmd: ICommand): void {
        console.log('Dispatching...');
    }
}