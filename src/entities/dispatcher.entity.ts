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

/**
 Argument of type '{ set: { k: string; }[]; }' is not assignable to parameter of type 'IKeyValuesOpts'.
  Types of property 'set' are incompatible.
    Type '{ k: string; }[]' is not assignable to type '{ k: string; v: string; }[]'.
      Type '{ k: string; }' is not assignable to type '{ k: string; v: string; }'.
        Property 'v' is missing in type '{ k: string; }'.
 */