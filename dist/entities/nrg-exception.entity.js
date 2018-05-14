"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NRGException {
    get(opts) {
        const exception = new Error();
        exception.name = opts.name;
        exception.message = opts.message;
        return exception;
    }
    throw(opts) {
        const exception = new Error();
        exception.name = opts.name;
        exception.message = opts.message;
        throw exception;
    }
}
exports.NRGException = NRGException;
//# sourceMappingURL=nrg-exception.entity.js.map