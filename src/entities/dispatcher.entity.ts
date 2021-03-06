import 'reflect-metadata';
import { injectable } from 'inversify';

import { ICommand } from '../interfaces/plain/command.interface';
import { IDispatcher } from '../interfaces/plain/dispatcher.interface';

@injectable()
export class Dispatcher implements IDispatcher {
    public dispatch(cmd: ICommand): ICommand {
        cmd.run(cmd.getFlags());
        return cmd;
    }
}