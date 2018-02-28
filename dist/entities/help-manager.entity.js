"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var HelpManager = (function () {
    function HelpManager() {
        this._commands = [];
    }
    HelpManager.prototype.addCommands = function (commands) {
        this._commands = commands;
    };
    HelpManager.prototype.help = function (flags) {
        // this._commands.forEach(cmd => {
        // });
        console.log('Helping!');
    };
    HelpManager.prototype.getHelpCommandOpts = function () {
        var _this = this;
        if (!this._commands) {
            var CommandsNotSetException = new Error();
            CommandsNotSetException.name = 'CommandsNotSetException';
            CommandsNotSetException.message = 'The commands are not set in the HelpManager. Set them before generating the help CommandOpts';
            throw CommandsNotSetException;
        }
        var helpCmdOpts = {
            flags: [],
            name: 'help',
            description: 'Shows informations about the available commands, and their usage',
            action: function (flags) { return _this.help(flags[0]); },
        };
        this._commands.forEach(function (cmd) { return helpCmdOpts.flags.push({ name: cmd.getName(), description: '', options: [] }); });
        return helpCmdOpts;
    };
    HelpManager = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], HelpManager);
    return HelpManager;
}());
exports.HelpManager = HelpManager;
//# sourceMappingURL=help-manager.entity.js.map