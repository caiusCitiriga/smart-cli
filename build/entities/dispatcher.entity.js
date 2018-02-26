System.register(["reflect-metadata", "inversify"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var inversify_1, Dispatcher;
    return {
        setters: [
            function (_1) {
            },
            function (inversify_1_1) {
                inversify_1 = inversify_1_1;
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
                    inversify_1.injectable()
                ], Dispatcher);
                return Dispatcher;
            }());
            exports_1("Dispatcher", Dispatcher);
        }
    };
});
