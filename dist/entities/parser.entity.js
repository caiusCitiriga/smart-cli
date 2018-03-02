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
const inversify_1 = require("inversify");
const command_entity_1 = require("./command.entity");
const exceptions_conts_1 = require("../consts/exceptions.conts");
const nrg_exception_entity_1 = require("./nrg-exception.entity");
let Parser = class Parser {
    constructor() {
        //  Sugar
        this._flagDelimiter = '--';
        this._flagOptionsDelimiter = ':';
        this._flagOptionValueDelimiter = '=';
        this._flagDirectValueDelimiter = '=';
        //  Configurations
        this._availableCommands = [];
    }
    addCommand(cmdOpts) {
        const cmd = new command_entity_1.Command();
        cmd.setName(cmdOpts.name);
        cmd.setFlags(cmdOpts.flags);
        cmd.setAction(cmdOpts.action);
        cmd.setDescription(cmdOpts.description);
        this._availableCommands.push(cmd);
    }
    getCommand(opts) {
        if (opts.single) {
            return {
                cmd: this._availableCommands.find(cmd => cmd.getName() === opts.cmdName) || null,
                commands: null
            };
        }
        return {
            cmd: null,
            commands: this._availableCommands || []
        };
    }
    parse(rawInput) {
        const flags = this.extractFlags(rawInput);
        const commandName = this.extractCommandName(rawInput);
        const matchingCommand = this._availableCommands.find(c => c.getName() === commandName);
        if (!matchingCommand) {
            new nrg_exception_entity_1.NRGException().throw({
                name: exceptions_conts_1.NRG_EXCEPTIONS.NoMatchingCommandException.name,
                message: exceptions_conts_1.NRG_EXCEPTIONS.NoMatchingCommandException.message(commandName)
            });
        }
        matchingCommand.setFlags(flags);
        return matchingCommand;
    }
    extractCommandName(rawInput) {
        return rawInput.split(this._flagDelimiter)[0].trim();
    }
    extractFlags(rawInput) {
        let splittedRawFlags = [];
        if (this.isDirectValue(rawInput)) {
            return this.extractDirectValueFromFlags(rawInput);
        }
        else {
            splittedRawFlags = rawInput.split(this._flagDelimiter);
            splittedRawFlags.shift(); //  remove the command
        }
        const flags = [];
        splittedRawFlags.forEach(currentRawFlag => {
            const splittedRawOptions = currentRawFlag.split(this._flagOptionsDelimiter);
            //  Extract the flag from the string
            const parsedFlag = splittedRawOptions[0].trim();
            //  Throw it from the array
            splittedRawOptions.shift();
            const opts = [];
            //  Loop the remaining options (from now on there will be only options)
            splittedRawOptions.forEach(opt => {
                let name = opt.split(this._flagOptionValueDelimiter)[0];
                let value = opt.split(this._flagOptionValueDelimiter)[1];
                name = name ? name.trim() : null;
                value = value ? value.trim() : null;
                opts.push({ name: name, value: value });
            });
            flags.push({ name: parsedFlag, options: opts });
        });
        return flags;
    }
    isDirectValue(rawInput) {
        const directValueRegex = new RegExp('--(\\w*=\\w*)'); //  matches "--anyname=value"
        const complexValueRegex = new RegExp('--(\\w*:\\w*=\\w*)'); //  matches "--anyname:key=value"
        if (!!directValueRegex.test(rawInput) && !!complexValueRegex.test(rawInput)) {
            new nrg_exception_entity_1.NRGException().throw({
                name: exceptions_conts_1.NRG_EXCEPTIONS.MixedCommandsValueTypesException.name,
                message: exceptions_conts_1.NRG_EXCEPTIONS.MixedCommandsValueTypesException.message(),
            });
        }
        if (!!directValueRegex.test(rawInput)) {
            return true;
        }
        if (!!complexValueRegex.test(rawInput)) {
            return false;
        }
        new nrg_exception_entity_1.NRGException().throw({
            name: exceptions_conts_1.NRG_EXCEPTIONS.InvalidValueException.name,
            message: exceptions_conts_1.NRG_EXCEPTIONS.InvalidValueException.message()
        });
    }
    extractDirectValueFromFlags(rawInput) {
        return;
    }
};
Parser = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Parser);
exports.Parser = Parser;
//# sourceMappingURL=parser.entity.js.map