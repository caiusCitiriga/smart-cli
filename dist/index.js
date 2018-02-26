"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_const_1 = require("./consts/types.const");
var inversify_config_1 = require("./inversify.config");
var _SmartCLI = (function () {
    function _SmartCLI() {
        this._parser = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IParser);
        this._dispatcher = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IDispatcher);
    }
    _SmartCLI.prototype.initialize = function () {
        this._parser.parse('my input');
        this._dispatcher.dispatch({});
    };
    return _SmartCLI;
}());
var SmartCLI = new _SmartCLI();
SmartCLI.initialize();
