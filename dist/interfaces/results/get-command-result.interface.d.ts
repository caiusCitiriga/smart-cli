import { ICommand } from "../plain/command.interface";
export interface IGetCommandResult {
    cmd: ICommand;
    commands: ICommand[];
}
