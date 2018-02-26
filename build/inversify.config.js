System.register(["inversify", "./consts/types.const", "./entities/parser.entity", "./entities/dispatcher.entity"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var inversify_1, types_const_1, parser_entity_1, dispatcher_entity_1, IoCContainer;
    return {
        setters: [
            function (inversify_1_1) {
                inversify_1 = inversify_1_1;
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
            IoCContainer = new inversify_1.Container();
            exports_1("IoCContainer", IoCContainer);
            IoCContainer.bind(types_const_1.TYPES.IParser).to(parser_entity_1.Parser);
            IoCContainer.bind(types_const_1.TYPES.IDispatcher).to(dispatcher_entity_1.Dispatcher);
        }
    };
});
