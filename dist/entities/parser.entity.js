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
        this._flagDelimiter = '--';
        this._flagOptionsDelimiter = ':';
        this._command = new command_entity_1.Command();
    }
    Parser.prototype.parse = function (rawInput) {
        var commandName = this.extractCommandName(rawInput);
        var flags = this.extractFlags(rawInput);
        this._command.setName(commandName);
        this._command.setFlags(flags);
        return this._command;
    };
    Parser.prototype.extractCommandName = function (rawInput) {
        return rawInput.split(this._flagDelimiter)[0].trim();
    };
    Parser.prototype.extractFlags = function (rawInput) {
        var _this = this;
        var xplItems = rawInput.split(this._flagDelimiter);
        xplItems.shift(); //  remove the command
        var flags = [];
        xplItems.forEach(function (item) {
            var xplItems = item.split(_this._flagOptionsDelimiter);
            var flag = xplItems[0].trim();
            xplItems.shift(); //  remove the flag
            var opts = [];
            xplItems.forEach(function (opt) { return opts.push(opt.trim()); });
            flags.push({ name: flag, options: opts });
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
