import { Container } from 'inversify';

import { TYPES } from './consts/types.const';

import { IParser } from './interfaces/parser.interface';
import { IDispatcher } from './interfaces/dispatcher.interface';

import { Parser } from './entities/parser.entity';
import { Dispatcher } from './entities/dispatcher.entity';

const IoCContainer = new Container();
IoCContainer.bind<IParser>(TYPES.IParser).to(Parser);
IoCContainer.bind<IDispatcher>(TYPES.IDispatcher).to(Dispatcher);

export { IoCContainer };