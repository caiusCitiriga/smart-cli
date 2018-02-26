import { ICommand } from "./command.interface";

export interface IDispatcher {
    dispatch(cmd: ICommand): void;
}