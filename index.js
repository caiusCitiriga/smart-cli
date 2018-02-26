var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
System.register("consts/types.const", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TYPES;
    return {
        setters: [],
        execute: function () {
            exports_1("TYPES", TYPES = {
                IParser: Symbol.for('IParser'),
                IDispatcher: Symbol.for('IDispatcher'),
            });
        }
    };
});
System.register("interfaces/command.interface", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("interfaces/parser.interface", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("interfaces/dispatcher.interface", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("entities/parser.entity", ["reflect-metadata", "inversify"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var inversify_1, Parser;
    return {
        setters: [
            function (_1) {
            },
            function (inversify_1_1) {
                inversify_1 = inversify_1_1;
            }
        ],
        execute: function () {
            Parser = (function () {
                function Parser() {
                }
                Parser.prototype.parse = function (rawInputUser) {
                    console.log('Parsing...');
                    return {};
                };
                Parser = __decorate([
                    inversify_1.injectable()
                ], Parser);
                return Parser;
            }());
            exports_5("Parser", Parser);
        }
    };
});
System.register("entities/dispatcher.entity", ["reflect-metadata", "inversify"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var inversify_2, Dispatcher;
    return {
        setters: [
            function (_2) {
            },
            function (inversify_2_1) {
                inversify_2 = inversify_2_1;
            }
        ],
        execute: function () {
            Dispatcher = (function () {
                function Dispatcher() {
                }
                Dispatcher.prototype.dispatch = function (cmd) {
                    console.log('Dispatching...');
                };
                Dispatcher = __decorate([
                    inversify_2.injectable()
                ], Dispatcher);
                return Dispatcher;
            }());
            exports_6("Dispatcher", Dispatcher);
        }
    };
});
System.register("inversify.config", ["inversify", "consts/types.const", "entities/parser.entity", "entities/dispatcher.entity"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var inversify_3, types_const_1, parser_entity_1, dispatcher_entity_1, IoCContainer;
    return {
        setters: [
            function (inversify_3_1) {
                inversify_3 = inversify_3_1;
            },
            function (types_const_1_1) {
                types_const_1 = types_const_1_1;
            },
            function (parser_entity_1_1) {
                parser_entity_1 = parser_entity_1_1;
            },
            function (dispatcher_entity_1_1) {
                dispatcher_entity_1 = dispatcher_entity_1_1;
            }
        ],
        execute: function () {
            IoCContainer = new inversify_3.Container();
            exports_7("IoCContainer", IoCContainer);
            IoCContainer.bind(types_const_1.TYPES.IParser).to(parser_entity_1.Parser);
            IoCContainer.bind(types_const_1.TYPES.IDispatcher).to(dispatcher_entity_1.Dispatcher);
        }
    };
});
System.register("index", ["consts/types.const", "inversify.config"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var types_const_2, inversify_config_1, SmartCLI;
    return {
        setters: [
            function (types_const_2_1) {
                types_const_2 = types_const_2_1;
            },
            function (inversify_config_1_1) {
                inversify_config_1 = inversify_config_1_1;
            }
        ],
        execute: function () {
            SmartCLI = (function () {
                function SmartCLI() {
                    this._parser = inversify_config_1.IoCContainer.get(types_const_2.TYPES.IParser);
                    this._dispatcher = inversify_config_1.IoCContainer.get(types_const_2.TYPES.IDispatcher);
                    this.initialize();
                }
                SmartCLI.prototype.initialize = function () {
                    this._parser.parse('my input');
                    this._dispatcher.dispatch({});
                };
                return SmartCLI;
            }());
            exports_8("SmartCLI", SmartCLI);
        }
    };
});
System.register("entities/command.entity", ["reflect-metadata", "inversify"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var inversify_4, Command;
    return {
        setters: [
            function (_3) {
            },
            function (inversify_4_1) {
                inversify_4 = inversify_4_1;
            }
        ],
        execute: function () {
            Command = (function () {
                function Command() {
                }
                Command.prototype.run = function () {
                    console.log('Running command');
                };
                Command = __decorate([
                    inversify_4.injectable()
                ], Command);
                return Command;
            }());
            exports_9("Command", Command);
        }
    };
});
System.register("interfaces/flag.interface", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("interfaces/input-lib.interface", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("interfaces/out-lib.interface", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
