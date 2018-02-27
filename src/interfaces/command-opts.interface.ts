import { IFlag } from "./flag.interface";

export interface ICommandOpts {
    name: string;
    action: () => void;
    description: string;
}
