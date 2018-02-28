import { Container } from 'inversify';

import { TYPES } from './consts/types.const';

import { IParser } from './interfaces/plain/parser.interface';
import { IDispatcher } from './interfaces/plain/dispatcher.interface';
import { IHelpManager } from './interfaces/plain/help-manager.interface';

import { Parser } from './entities/parser.entity';
import { Dispatcher } from './entities/dispatcher.entity';
import { HelpManager } from './entities/help-manager.entity';

const IoCContainer = new Container();
IoCContainer.bind<IParser>(TYPES.IParser).to(Parser);
IoCContainer.bind<IDispatcher>(TYPES.IDispatcher).to(Dispatcher);
IoCContainer.bind<IHelpManager>(TYPES.IHelpManager).to(HelpManager);

export { IoCContainer };