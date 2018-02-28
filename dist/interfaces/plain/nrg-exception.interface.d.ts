import { INrgExceptionOpts } from "../opts/nrg-exception-opts.interface";
export interface INrgException {
    throw(opts: INrgExceptionOpts): Error;
}
