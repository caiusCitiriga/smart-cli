import 'reflect-metadata';
import { ICommand } from '../interfaces/plain/command.interface';
import { IDispatcher } from '../interfaces/plain/dispatcher.interface';
export declare class Dispatcher implements IDispatcher {
    dispatch(cmd: ICommand): ICommand;
}
