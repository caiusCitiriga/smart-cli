System.register(["./consts/types.const", "./inversify.config"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var types_const_1, inversify_config_1, SmartCLI;
    return {
        setters: [
            function (types_const_1_1) {
                types_const_1 = types_const_1_1;
            },
            function (inversify_config_1_1) {
                inversify_config_1 = inversify_config_1_1;
            }
        ],
        execute: function () {
            SmartCLI = (function () {
                function SmartCLI() {
                    this._parser = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IParser);
                    this._dispatcher = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IDispatcher);
                    this.initialize();
                }
                SmartCLI.prototype.initialize = function () {
                    this._parser.parse('my input');
                    this._dispatcher.dispatch({});
                };
                return SmartCLI;
            }());
            exports_1("SmartCLI", SmartCLI);
        }
    };
});
