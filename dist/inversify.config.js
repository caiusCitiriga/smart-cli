"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_const_1 = require("./consts/types.const");
const input_entity_1 = require("./entities/input.entity");
const output_entity_1 = require("./entities/output.entity");
const parser_entity_1 = require("./entities/parser.entity");
const dispatcher_entity_1 = require("./entities/dispatcher.entity");
const help_manager_entity_1 = require("./entities/help-manager.entity");
const IoCContainer = new inversify_1.Container();
exports.IoCContainer = IoCContainer;
IoCContainer.bind(types_const_1.TYPES.IInput).to(input_entity_1.Input);
IoCContainer.bind(types_const_1.TYPES.IParser).to(parser_entity_1.Parser);
IoCContainer.bind(types_const_1.TYPES.IOutput).to(output_entity_1.Output);
IoCContainer.bind(types_const_1.TYPES.IDispatcher).to(dispatcher_entity_1.Dispatcher);
IoCContainer.bind(types_const_1.TYPES.IHelpManager).to(help_manager_entity_1.HelpManager);
//# sourceMappingURL=inversify.config.js.map