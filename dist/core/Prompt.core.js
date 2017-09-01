"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
class Prompt {
    prompt(question, callback) {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: true
        });
        this.rl.resume();
        this.rl.question(question, (answer) => {
            if (callback(answer)) {
                this.rl = null;
            }
        });
    }
}
exports.Prompt = Prompt;
//# sourceMappingURL=Prompt.core.js.map