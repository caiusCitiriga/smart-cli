"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_const_1 = require("./consts/types.const");
var inversify_config_1 = require("./inversify.config");
var SmartCLI = (function () {
    function SmartCLI() {
        this._parser = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IParser);
        this._dispatcher = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IDispatcher);
    }
    SmartCLI.prototype.addCommand = function (cmd) {
        this._commands.push(cmd);
        return this;
    };
    SmartCLI.prototype.run = function (rawUserInput) {
        this._dispatcher.dispatch(this._parser.parse(rawUserInput));
    };
    return SmartCLI;
}());
exports.SmartCLI = SmartCLI;
