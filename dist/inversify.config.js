"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var types_const_1 = require("./consts/types.const");
var output_entity_1 = require("./entities/output.entity");
var parser_entity_1 = require("./entities/parser.entity");
var dispatcher_entity_1 = require("./entities/dispatcher.entity");
var help_manager_entity_1 = require("./entities/help-manager.entity");
var IoCContainer = new inversify_1.Container();
exports.IoCContainer = IoCContainer;
IoCContainer.bind(types_const_1.TYPES.IParser).to(parser_entity_1.Parser);
IoCContainer.bind(types_const_1.TYPES.IOutput).to(output_entity_1.Output);
IoCContainer.bind(types_const_1.TYPES.IDispatcher).to(dispatcher_entity_1.Dispatcher);
IoCContainer.bind(types_const_1.TYPES.IHelpManager).to(help_manager_entity_1.HelpManager);
//# sourceMappingURL=inversify.config.js.map