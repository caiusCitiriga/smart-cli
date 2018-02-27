"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_const_1 = require("./consts/types.const");
var inversify_config_1 = require("./inversify.config");
var SmartCLI = (function () {
    function SmartCLI() {
        this._commands = [];
        this._parser = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IParser);
        this._dispatcher = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IDispatcher);
    }
    SmartCLI.prototype.addCommand = function (cmd) {
        this._commands.push(cmd);
        return this;
    };
    SmartCLI.prototype.run = function (rawUserInput) {
        var _this = this;
        this._commands.forEach(function (cmd) { return _this._parser.addCommand(cmd); });
        return this._dispatcher.dispatch(this._parser.parse(rawUserInput));
    };
    return SmartCLI;
}());
exports.SmartCLI = SmartCLI;
var cli = new SmartCLI();
var command = {
    name: 'cmd',
    action: function () { return null; },
    description: 'Test',
    flags: []
};
//  Act
cli.addCommand(command);
var userRanCmd = 'cmd';
var returnedRanCmd = cli.run(userRanCmd);
//# sourceMappingURL=index.js.map