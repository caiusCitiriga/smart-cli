"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Chalk = require("chalk");
const table_delimiters_const_1 = require("../consts/table-delimiters.const");
class GenericOutput {
    printMessage(text) {
        console.log(text);
    }
    printWarning(text) {
        console.log(Chalk.bold.yellow(`WARN: ${text}`));
    }
    printError(text) {
        console.log(Chalk.bold.red(`ERROR: ${text}`));
    }
    printInfo(text) {
        console.log(Chalk.cyan(`INFO: ${text}`));
    }
    printTitle(text) {
        console.log(Chalk.bold.magenta(text.toUpperCase()));
    }
    printSubTitle(text) {
        console.log(Chalk.grey(' ' + text));
    }
    printBoxedTitle(text) {
        let title = '';
        for (let i = 0; i <= text.length + 3; i++) {
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
        for (let i = 0; i <= text.length + 3; i++) {
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
    }
    printKeyValue(set, space_char = ' ') {
        let longestKeyLen = set[0].key.length;
        set.forEach(s => longestKeyLen = s.key.length > longestKeyLen ? s.key.length : longestKeyLen);
        set.forEach(pair => {
            let spaces = space_char;
            for (let i = 0; i < (longestKeyLen - pair.key.length); i++) {
                spaces += space_char;
            }
            console.log(`- ${Chalk.yellow(pair.key)}: ${spaces + pair.value}`);
        });
    }
}
exports.GenericOutput = GenericOutput;
//# sourceMappingURL=GenericOutput.core.js.map