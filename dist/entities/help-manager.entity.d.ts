import 'reflect-metadata';
import { IFlag } from "../interfaces/plain/flag.interface";
import { IHelpManager } from "../interfaces/plain/help-manager.interface";
export declare class HelpManager implements IHelpManager {
    private _;
    constructor();
    help(flags: IFlag): void;
}
