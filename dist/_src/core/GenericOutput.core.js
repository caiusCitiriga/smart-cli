"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Chalk = require("chalk");
var table_delimiters_const_1 = require("../consts/table-delimiters.const");
var GenericOutput = (function () {
    function GenericOutput() {
    }
    GenericOutput.prototype.printMessage = function (text) {
        console.log(text);
    };
    GenericOutput.prototype.printWarning = function (text) {
        console.log(Chalk.bold.yellow("WARN: " + text));
    };
    GenericOutput.prototype.printError = function (text) {
        console.log(Chalk.bold.red("ERROR: " + text));
    };
    GenericOutput.prototype.printInfo = function (text) {
        console.log(Chalk.cyan("INFO: " + text));
    };
    GenericOutput.prototype.printTitle = function (text) {
        console.log(Chalk.bold.magenta(text.toUpperCase()));
    };
    GenericOutput.prototype.printSubTitle = function (text) {
        console.log(Chalk.grey(' ' + text));
    };
    GenericOutput.prototype.printBoxedTitle = function (text) {
        var title = '';
        for (var i = 0; i <= text.length + 3; i++) {
            if (i === 0) {
                title += table_delimiters_const_1.TableDelimiters.topLeft;
            }
            if (i !== 0 && i !== text.length + 3) {
                title += table_delimiters_const_1.TableDelimiters.top;
            }
            if (i === text.length + 3) {
                title += table_delimiters_const_1.TableDelimiters.topRight;
            }
        }
        title += '\n' + table_delimiters_const_1.TableDelimiters.left + ' ' + text + ' ' + table_delimiters_const_1.TableDelimiters.right + '\n';
        for (var i = 0; i <= text.length + 3; i++) {
            if (i === 0) {
                title += table_delimiters_const_1.TableDelimiters.bottomLeft;
            }
            if (i !== 0 && i !== text.length + 3) {
                title += table_delimiters_const_1.TableDelimiters.bottom;
            }
            if (i === text.length + 3) {
                title += table_delimiters_const_1.TableDelimiters.bottomRight;
            }
        }
        console.log(Chalk.magenta(title.toUpperCase()));
    };
    GenericOutput.prototype.printKeyValue = function (set, space_char) {
        if (space_char === void 0) { space_char = ' '; }
        var longestKeyLen = set[0].key.length;
        set.forEach(function (s) { return longestKeyLen = s.key.length > longestKeyLen ? s.key.length : longestKeyLen; });
        set.forEach(function (pair) {
            var spaces = space_char;
            for (var i = 0; i < (longestKeyLen - pair.key.length); i++) {
                spaces += space_char;
            }
            console.log("- " + Chalk.yellow(pair.key) + ": " + (spaces + pair.value));
        });
    };
    return GenericOutput;
}());
exports.GenericOutput = GenericOutput;
