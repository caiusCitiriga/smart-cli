import { INrgException } from "../interfaces/plain/nrg-exception.interface";
import { INrgExceptionOpts } from "../interfaces/opts/nrg-exception-opts.interface";
export declare class NRGException implements INrgException {
    get(opts: INrgExceptionOpts): Error;
    throw(opts: INrgExceptionOpts): void;
}
