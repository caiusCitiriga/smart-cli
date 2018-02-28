import 'reflect-metadata';
import { injectable } from "inversify";

import { IFlag } from "../interfaces/plain/flag.interface";
import { IHelpManager } from "../interfaces/plain/help-manager.interface";

@injectable()
export class HelpManager implements IHelpManager {
    private _
    public constructor() {

    }
    public help(flags: IFlag): void {

    }
}