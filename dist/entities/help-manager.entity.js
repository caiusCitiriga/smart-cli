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
const chalk = require("chalk");
const inversify_1 = require("inversify");
const types_const_1 = require("../consts/types.const");
const nrg_exception_entity_1 = require("./nrg-exception.entity");
const exceptions_conts_1 = require("../consts/exceptions.conts");
let HelpManager = class HelpManager {
    constructor() {
        this._commands = [];
    }
    setCommands(commands) {
        this._commands = commands;
    }
    help(flag) {
        if (!this._commands.filter(cmd => cmd.getName() !== 'help').length) {
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
    }
    getHelpCommandOpts() {
        const helpCmdOpts = {
            flags: [],
            name: 'help',
            description: 'Shows informations about the available commands, and their usage',
            action: (flags) => this.help(flags[0]),
        };
        this._commands.forEach(cmd => helpCmdOpts.flags.push({ name: cmd.getName(), description: '', options: [] }));
        return helpCmdOpts;
    }
    printGeneralHelp() {
        const kvpOpts = {
            set: []
        };
        this._commands.forEach(cmd => kvpOpts.set.push({ k: cmd.getName(), v: cmd.getDescription() }));
        console.log();
        this._output.printBoxTitle('General help');
        console.log();
        this._output.printKeyValues(kvpOpts);
        console.log();
    }
    printSpecificHelp(flag) {
        if (!this._commands.find(cmd => cmd.getName() === flag.name)) {
            new nrg_exception_entity_1.NRGException()
                .throw({
                name: exceptions_conts_1.NRG_EXCEPTIONS.CommandNotFoundException.name,
                message: exceptions_conts_1.NRG_EXCEPTIONS.CommandNotFoundException.message(flag.name)
            });
        }
        const kvSet = {
            set: []
        };
        const flags = this._commands
            .find(cmd => cmd.getName() === flag.name)
            .getFlags() || [];
        flags.forEach(flag => {
            let desc = `\n${chalk.gray(flag.description)}\n`;
            flag.options.forEach(opt => {
                desc += `\n\tName: ${chalk.blue(opt.name)}\n`;
                desc += `\tType: ${chalk.magenta(opt.value)}\n`;
                desc += `\tUsage: ${chalk.cyan('--' + flag.name + ':' + opt.name + '=value')}\n`;
            });
            kvSet.set.push({ k: flag.name, v: desc });
        });
        console.log();
        this._output.printTitle(`${flag.name} help`);
        this._output.printSubtitle(this._commands.find(cmd => cmd.getName() === flag.name).getDescription());
        console.log();
        this._output.printKeyValues(kvSet);
        console.log();
    }
};
__decorate([
    inversify_1.inject(types_const_1.TYPES.IOutput),
    __metadata("design:type", Object)
], HelpManager.prototype, "_output", void 0);
HelpManager = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], HelpManager);
exports.HelpManager = HelpManager;
//# sourceMappingURL=help-manager.entity.js.map