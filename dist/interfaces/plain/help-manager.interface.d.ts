import { IFlag } from "./flag.interface";
export interface IHelpManager {
    help(flags: IFlag): void;
}
