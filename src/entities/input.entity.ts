import 'reflect-metadata';
import { injectable } from "inversify";

import { IInput } from "../interfaces/plain/input.interface";
import { IUserInputOpts } from "../interfaces/opts/user-input-opts.interface";

@injectable()
export class Input implements IInput {
    public askUserInput(opts: IUserInputOpts): void {
        const __this = this;
        const stdin = process.stdin;
        const stdout = process.stdout;

        if (stdin.isPaused()) {
            stdin.resume();
        }

        if (opts.surroundWithNewLines) {
            console.log();
        }
        stdout.write(opts.question);
        if (opts.surroundWithNewLines) {
            console.log();
        }

        stdin.once('data', (data) => {
            data = data.toString().trim();
            stdin.pause();

            if (opts.callback) {
                opts.callback(data);
            }
        });
    }
}