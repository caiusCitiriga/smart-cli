import * as Chalk from 'chalk';

export class GenericOutput {
    public printMessage(text: string) {
        console.log(text);
    }

    public printWarning(text: string) {
        console.log(Chalk.bold.yellow(text));
    }

    public printError(text: string) {
        console.log(Chalk.bold.red(text));
    }

    public printInfo(text: string) {
        console.log(Chalk.cyan(text));
    }

    public printTitle(text: string) {
        console.log(Chalk.bold.underline.magenta(text));
    }

    public printKeyValue(set: { key: string; value: string }[]) {
        set.forEach(kv => {
            console.log(`${Chalk.bold.yellow(kv.key)}: \t${Chalk.white(kv.value)}`);
        });
    }
}
