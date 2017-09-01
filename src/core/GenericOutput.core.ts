import * as Chalk from 'chalk';
import { TableDelimiters } from '../consts/table-delimiters.const';

export class GenericOutput {
    public printMessage(text: string) {
        console.log(text);
    }

    public printWarning(text: string) {
        console.log(Chalk.bold.yellow(`WARN: ${text}`));
    }

    public printError(text: string) {
        console.log(Chalk.bold.red(`ERROR: ${text}`));
    }

    public printInfo(text: string) {
        console.log(Chalk.cyan(`INFO: ${text}`));
    }

    public printTitle(text: string) {
        console.log(Chalk.bold.magenta(text.toUpperCase()));
    }

    public printSubTitle(text: string) {
        console.log(Chalk.grey(' ' + text));
    }

    public printBoxedTitle(text: string) {
        let title = '';
        for (let i = 0; i <= text.length + 3; i++) {
            if (i === 0) {
                title += TableDelimiters.topLeft;
            }

            if (i !== 0 && i !== text.length + 3) {
                title += TableDelimiters.top;
            }

            if (i === text.length + 3) {
                title += TableDelimiters.topRight;
            }
        }

        title += '\n' + TableDelimiters.left + ' ' + text + ' ' + TableDelimiters.right + '\n';

        for (let i = 0; i <= text.length + 3; i++) {
            if (i === 0) {
                title += TableDelimiters.bottomLeft;
            }

            if (i !== 0 && i !== text.length + 3) {
                title += TableDelimiters.bottom;
            }

            if (i === text.length + 3) {
                title += TableDelimiters.bottomRight;
            }
        }
        console.log(Chalk.magenta(title.toUpperCase()));
    }

    public printKeyValue(set: { key: string; value: string }[]) {
        const longestKeyLen = <number>set.reduce((p, c) => p < c.key.length ? c.key.length : false, 0);
        set.forEach(pair => {
            let spaces = '';
            for (let i = 0; i < (longestKeyLen - pair.key.length); i++) { spaces += ' ' }
            console.log(`${Chalk.bold.yellow(pair.key)}: ${spaces + Chalk.grey(pair.value)}`);
        })
    }
}
