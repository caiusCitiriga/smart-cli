import { IUserInputOpts } from "../opts/user-input-opts.interface";
export interface IInput {
    askUserInput(opts: IUserInputOpts): void;
}
