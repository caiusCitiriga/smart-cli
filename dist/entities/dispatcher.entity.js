"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
let Dispatcher = class Dispatcher {
    dispatch(cmd) {
        cmd.run(cmd.getFlags());
        return cmd;
    }
};
Dispatcher = __decorate([
    inversify_1.injectable()
], Dispatcher);
exports.Dispatcher = Dispatcher;
/**
 Argument of type '{ set: { k: string; }[]; }' is not assignable to parameter of type 'IKeyValuesOpts'.
  Types of property 'set' are incompatible.
    Type '{ k: string; }[]' is not assignable to type '{ k: string; v: string; }[]'.
      Type '{ k: string; }' is not assignable to type '{ k: string; v: string; }'.
        Property 'v' is missing in type '{ k: string; }'.
 */ 
//# sourceMappingURL=dispatcher.entity.js.map