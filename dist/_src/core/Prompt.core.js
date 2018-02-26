"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Prompt = (function () {
    function Prompt() {
    }
    Prompt.prototype.prompt = function (question, callback) {
        var _this = this;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: true
        });
        this.rl.resume();
        this.rl.question(question, function (answer) {
            if (callback(answer)) {
                _this.rl = null;
            }
        });
    };
    return Prompt;
}());
exports.Prompt = Prompt;
