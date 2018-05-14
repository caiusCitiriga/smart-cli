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
let Input = class Input {
    askUserInput(opts) {
        const __this = this;
        const stdin = process.stdin;
        const stdout = process.stdout;
        if (stdin.isPaused()) {
            stdin.resume();
        }
        if (opts.surroundWithNewLines) {
            console.log();
        }
        stdout.write(opts.question);
        if (opts.surroundWithNewLines) {
            console.log();
        }
        stdin.once('data', (data) => {
            data = data.toString().trim();
            stdin.pause();
            if (opts.callback) {
                opts.callback(data);
            }
        });
    }
};
Input = __decorate([
    inversify_1.injectable()
], Input);
exports.Input = Input;
//# sourceMappingURL=input.entity.js.map