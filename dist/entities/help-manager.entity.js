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
var types_const_1 = require("../consts/types.const");
var nrg_exception_entity_1 = require("./nrg-exception.entity");
var exceptions_conts_1 = require("../consts/exceptions.conts");
var HelpManager = (function () {
    function HelpManager() {
        this._commands = [];
    }
    HelpManager.prototype.setCommands = function (commands) {
        this._commands = commands;
    };
    HelpManager.prototype.help = function (flag) {
        if (!this._commands.filter(function (cmd) { return cmd.getName() !== 'help'; }).length) {
            new nrg_exception_entity_1.NRGException().throw({
                name: exceptions_conts_1.NRG_EXCEPTIONS.CommandsNotSetException.name,
                message: exceptions_conts_1.NRG_EXCEPTIONS.CommandsNotSetException.message()
            });
        }
        if (!flag) {
            this.printGeneralHelp();
            return;
        }
        this.printSpecificHelp(flag);
    };
    HelpManager.prototype.getHelpCommandOpts = function () {
        var _this = this;
        var helpCmdOpts = {
            flags: [],
            name: 'help',
            description: 'Shows informations about the available commands, and their usage',
            action: function (flags) { return _this.help(flags[0]); },
        };
        this._commands.forEach(function (cmd) { return helpCmdOpts.flags.push({ name: cmd.getName(), description: '', options: [] }); });
        return helpCmdOpts;
    };
    HelpManager.prototype.printGeneralHelp = function () {
        var kvpOpts = {
            set: []
        };
        this._commands.forEach(function (cmd) { return kvpOpts.set.push({ k: cmd.getName(), v: cmd.getDescription() }); });
        console.log();
        this._output.printBoxTitle('General help');
        console.log();
        this._output.printKeyValues(kvpOpts);
        console.log();
    };
    HelpManager.prototype.printSpecificHelp = function (flag) {
        if (!this._commands.find(function (cmd) { return cmd.getName() === flag.name; })) {
            new nrg_exception_entity_1.NRGException()
                .throw({
                name: exceptions_conts_1.NRG_EXCEPTIONS.CommandNotFoundException.name,
                message: exceptions_conts_1.NRG_EXCEPTIONS.CommandNotFoundException.message(flag.name)
            });
        }
        var kvSet = {
            set: []
        };
        var flags = this._commands
            .find(function (cmd) { return cmd.getName() === flag.name; })
            .getFlags() || [];
        flags.forEach(function (flag) {
            kvSet.set.push({ k: flag.name, v: flag.description });
        });
        console.log();
        this._output.printTitle(flag.name + " help");
        this._output.printSubtitle(this._commands.find(function (cmd) { return cmd.getName() === flag.name; }).getDescription());
        console.log();
        this._output.printKeyValues(kvSet);
        console.log();
    };
    __decorate([
        inversify_1.inject(types_const_1.TYPES.IOutput),
        __metadata("design:type", Object)
    ], HelpManager.prototype, "_output", void 0);
    HelpManager = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], HelpManager);
    return HelpManager;
}());
exports.HelpManager = HelpManager;
//# sourceMappingURL=help-manager.entity.js.map