import { IFlag } from "./flag.interface";

export interface ICommandOpts {
    name: string;
    flags: IFlag[];
    action: () => void;
    description: string;
}
