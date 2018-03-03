import { Container } from 'inversify';

import { TYPES } from './consts/types.const';

import { IInput } from './interfaces/plain/input.interface';
import { IParser } from './interfaces/plain/parser.interface';
import { IOutput } from './interfaces/plain/output.interface';
import { IDispatcher } from './interfaces/plain/dispatcher.interface';
import { IHelpManager } from './interfaces/plain/help-manager.interface';

import { Input } from './entities/input.entity';
import { Output } from './entities/output.entity';
import { Parser } from './entities/parser.entity';
import { Dispatcher } from './entities/dispatcher.entity';
import { HelpManager } from './entities/help-manager.entity';

const IoCContainer = new Container();
IoCContainer.bind<IInput>(TYPES.IInput).to(Input);
IoCContainer.bind<IParser>(TYPES.IParser).to(Parser);
IoCContainer.bind<IOutput>(TYPES.IOutput).to(Output);
IoCContainer.bind<IDispatcher>(TYPES.IDispatcher).to(Dispatcher);
IoCContainer.bind<IHelpManager>(TYPES.IHelpManager).to(HelpManager);

export { IoCContainer };