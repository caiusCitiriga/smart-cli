import * as readline from 'readline';
import { ReadLine } from 'readline';

export class Prompt {
    private rl: ReadLine;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: true
        });
    }

    public prompt(question: string, callback: (answer: string) => boolean) {
        this.rl.resume();

        this.rl.question(question, (answer) => {
            if (callback(answer)) {
                this.rl.pause();
            }
        });
    }
}
