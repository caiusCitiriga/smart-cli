import { IFlag } from "../plain/flag.interface";
export interface ICommandOpts {
    name: string;
    flags: IFlag[];
    action: (flags: IFlag[]) => void;
    description: string;
}
