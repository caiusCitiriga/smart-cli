"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NRGException = (function () {
    function NRGException() {
    }
    NRGException.prototype.throw = function (opts) {
        var exception = new Error();
        exception.name = opts.name;
        exception.message = opts.message;
        throw exception;
    };
    return NRGException;
}());
exports.NRGException = NRGException;
//# sourceMappingURL=nrg-exception.entity.js.map