declare module "consts/types.const" {
    export const TYPES: {
        IParser: symbol;
        IDispatcher: symbol;
    };
}
declare module "interfaces/command.interface" {
    export interface ICommand {
        run(): void;
    }
}
declare module "interfaces/parser.interface" {
    import { ICommand } from "interfaces/command.interface";
    export interface IParser {
        parse(rawInputUser: string): ICommand;
    }
}
declare module "interfaces/dispatcher.interface" {
    import { ICommand } from "interfaces/command.interface";
    export interface IDispatcher {
        dispatch(cmd: ICommand): void;
    }
}
declare module "entities/parser.entity" {
    import 'reflect-metadata';
    import { IParser } from "interfaces/parser.interface";
    import { ICommand } from "interfaces/command.interface";
    export class Parser implements IParser {
        parse(rawInputUser: string): ICommand;
    }
}
declare module "entities/dispatcher.entity" {
    import 'reflect-metadata';
    import { ICommand } from "interfaces/command.interface";
    import { IDispatcher } from "interfaces/dispatcher.interface";
    export class Dispatcher implements IDispatcher {
        dispatch(cmd: ICommand): void;
    }
}
declare module "inversify.config" {
    import { Container } from 'inversify';
    const IoCContainer: Container;
    export { IoCContainer };
}
declare module "index" {
    export class SmartCLI {
        private _parser;
        private _dispatcher;
        constructor();
        initialize(): void;
    }
}
declare module "entities/command.entity" {
    import 'reflect-metadata';
    import { ICommand } from "interfaces/command.interface";
    export class Command implements ICommand {
        run(): void;
    }
}
declare module "interfaces/flag.interface" {
    export interface Flag {
    }
}
declare module "interfaces/input-lib.interface" {
    export interface InputLib {
    }
}
declare module "interfaces/out-lib.interface" {
    export interface OutLib {
    }
}
