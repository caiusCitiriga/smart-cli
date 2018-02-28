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
var command_entity_1 = require("./command.entity");
var Parser = (function () {
    function Parser() {
        //  Sugar
        this._flagDelimiter = '--';
        this._flagOptionsDelimiter = ':';
        this._flagOptionValueDelimiter = '=';
        //  Configurations
        this._availableCommands = [];
    }
    Parser.prototype.addCommand = function (cmdOpts) {
        var cmd = new command_entity_1.Command();
        cmd.setName(cmdOpts.name);
        cmd.setAction(cmdOpts.action);
        cmd.setDescription(cmdOpts.description);
        this._availableCommands.push(cmd);
    };
    Parser.prototype.parse = function (rawInput) {
        var flags = this.extractFlags(rawInput);
        var commandName = this.extractCommandName(rawInput);
        var matchingCommand = this._availableCommands.find(function (c) { return c.getName() === commandName; });
        if (!matchingCommand) {
            var noMatchingCommandException = new Error();
            noMatchingCommandException.name = 'NoMatchingCommand';
            noMatchingCommandException.message = "No matching command was found for " + commandName;
            throw noMatchingCommandException;
        }
        matchingCommand.setFlags(flags);
        return matchingCommand;
    };
    Parser.prototype.extractCommandName = function (rawInput) {
        return rawInput.split(this._flagDelimiter)[0].trim();
    };
    Parser.prototype.extractFlags = function (rawInput) {
        var _this = this;
        var splittedRawFlags = rawInput.split(this._flagDelimiter);
        splittedRawFlags.shift(); //  remove the command
        var flags = [];
        splittedRawFlags.forEach(function (currentRawFlag) {
            var splittedRawOptions = currentRawFlag.split(_this._flagOptionsDelimiter);
            //  Extract the flag from the string
            var parsedFlag = splittedRawOptions[0].trim();
            //  Throw it from the array
            splittedRawOptions.shift();
            var opts = [];
            //  Loop the remaining options (from now on there will be only options)
            splittedRawOptions.forEach(function (opt) {
                var name = opt.split(_this._flagOptionValueDelimiter)[0];
                var value = opt.split(_this._flagOptionValueDelimiter)[1];
                name = name ? name.trim() : null;
                value = value ? value.trim() : null;
                opts.push({ name: name, value: value });
            });
            flags.push({ name: parsedFlag, options: opts });
        });
        return flags;
    };
    Parser = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], Parser);
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.entity.js.map