"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandNotFoundException = (function () {
    function CommandNotFoundException() {
    }
    CommandNotFoundException.prototype.throw = function (opts) {
        var exception = new Error();
        exception.name = opts.name;
        exception.message = opts.message;
        throw exception;
    };
    return CommandNotFoundException;
}());
exports.CommandNotFoundException = CommandNotFoundException;
//# sourceMappingURL=nrg.exception.js.map