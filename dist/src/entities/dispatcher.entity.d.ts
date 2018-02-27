import 'reflect-metadata';
import { ICommand } from '../interfaces/command.interface';
import { IDispatcher } from '../interfaces/dispatcher.interface';
export declare class Dispatcher implements IDispatcher {
    dispatch(cmd: ICommand): string;
}
