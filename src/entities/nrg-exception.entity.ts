import { INrgException } from "../interfaces/plain/nrg-exception.interface";
import { INrgExceptionOpts } from "../interfaces/opts/nrg-exception-opts.interface";

export class NRGException implements INrgException {
    public get(opts: INrgExceptionOpts): Error {
        const exception = new Error();
        exception.name = opts.name;
        exception.message = opts.message;

        return exception;
    }

    public throw(opts: INrgExceptionOpts): void {
        const exception = new Error();
        exception.name = opts.name;
        exception.message = opts.message;

        throw exception;
    }
}