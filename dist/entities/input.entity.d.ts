import 'reflect-metadata';
import { IInput } from "../interfaces/plain/input.interface";
import { IUserInputOpts } from "../interfaces/opts/user-input-opts.interface";
export declare class Input implements IInput {
    askUserInput(opts: IUserInputOpts): void;
}
