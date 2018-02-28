"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Command = (function () {
    function Command() {
    }
    Command.prototype.getName = function () { return this._name; };
    Command.prototype.getFlags = function () { return this._flags; };
    Command.prototype.getDescription = function () { return this._description; };
    Command.prototype.setName = function (name) { this._name = name; };
    Command.prototype.setFlags = function (flags) { this._flags = flags; };
    Command.prototype.setAction = function (func) { this._action = func; };
    Command.prototype.setDescription = function (desc) { this._description = desc; };
    Command.prototype.run = function (flags) {
        this._action(flags);
    };
    return Command;
}());
exports.Command = Command;
//# sourceMappingURL=command.entity.js.map