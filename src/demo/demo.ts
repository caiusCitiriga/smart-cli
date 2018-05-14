#! /usr/bin/env node
import * as process from 'process';

//  Change this imports into: smart-cli/dist/
import { SmartCLI, UILibrary } from '../index';
//  Change this imports into: smart-cli/dist/interfaces/plain/flag.interface
import { IFlag } from '../interfaces/plain/flag.interface';
//  Change this imports into: smart-cli/dist/interfaces/opts/table-opts.interface
import { ITableOpts } from '../interfaces/opts/table-opts.interface';
//  Change this imports into: smart-cli/dist/interfaces/opts/key-values-opts.interface
import { IKeyValuesOpts } from '../interfaces/opts/key-values-opts.interface';

const cli = new SmartCLI();
cli
    .addCommand({
        //  How to run: title --m=Test title
        name: 'title',
        flags: [
            {
                name: 'm',
                description: '[Direct value flag] Message',
                options: []
            }
        ],
        description: 'Prints a SmartCLI title containing the message passed to the flag',
        action: (flags: IFlag[]) => {
            cli.UI.out.printTitle(flags[0].options[0].value);
        },
    })
    .addCommand({
        //  How to run: subtitle --m=Test subtitle
        name: 'subtitle',
        flags: [
            {
                name: 'm',
                description: '[Direct value flag] Message',
                options: []
            }
        ],
        description: 'Prints a SmartCLI subtitle containing the message passed to the flag',
        action: (flags: IFlag[]) => {
            cli.UI.out.printSubtitle(flags[0].options[0].value);
        },
    })
    .addCommand({
        //  How to run: boxed-title --m=Test title
        name: 'boxed-title',
        flags: [
            {
                name: 'm',
                description: '[Direct value flag] Message',
                options: []
            }
        ],
        description: 'Prints a SmartCLI boxed-title containing the message passed to the flag',
        action: (flags: IFlag[]) => {
            cli.UI.out.printBoxTitle(flags[0].options[0].value);
        },
    })
    .addCommand({
        //  How to run: info --m=Test info
        name: 'info',
        flags: [
            {
                name: 'm',
                description: '[Direct value flag] Message',
                options: []
            }
        ],
        description: 'Prints a SmartCLI info message containing the string passed to the flag',
        action: (flags: IFlag[]) => {
            cli.UI.out.printInfo(flags[0].options[0].value);
        },
    })
    .addCommand({
        //  How to run: message --m=Test message
        name: 'message',
        flags: [
            {
                name: 'm',
                description: '[Direct value flag] Message',
                options: []
            }
        ],
        description: 'Prints a SmartCLI normal message containing the string passed to the flag',
        action: (flags: IFlag[]) => {
            cli.UI.out.printMessage(flags[0].options[0].value);
        },
    })
    .addCommand({
        //  How to run: warning --m=Test warning
        name: 'warning',
        flags: [
            {
                name: 'm',
                description: '[Direct value flag] Message',
                options: []
            }
        ],
        description: 'Prints a SmartCLI warning message containing the string passed to the flag',
        action: (flags: IFlag[]) => {
            cli.UI.out.printWarning(flags[0].options[0].value);
        },
    })
    .addCommand({
        //  How to run: error --m=Test error
        name: 'error',
        flags: [
            {
                name: 'm',
                description: '[Direct value flag] Message',
                options: []
            }
        ],
        description: 'Prints a SmartCLI error message containing the string passed to the flag',
        action: (flags: IFlag[]) => {
            cli.UI.out.printError(flags[0].options[0].value);
        },
    })
    .addCommand({
        //  How to run: kvp --list='[{"k":"Key one","v":"Value one"},{"k":"Key two","v":"Value two"},{"k":"Key three","v":"Value three"}]'
        name: 'kvp',
        flags: [
            {
                name: 'list',
                description: '[Direct value flag] JSON style object containing the list of key-value pairs',
                options: []
            }
        ],
        description: 'Prints a SmartCLI key-value pairs list containing the options passed to the flag in JSON format',
        action: (flags: IFlag[]) => {
            try {
                const kvp: IKeyValuesOpts = {
                    set: JSON.parse(flags[0].options[0].value) as { k: string, v: string }[],
                };

                cli.UI.out.printKeyValues(kvp);
            } catch (e) {
                cli.UI.out.printError('The options passed are not valid');
                console.log(e.message);
            }
        }
    })
    .addCommand({
        //  How to run: table --set='{"heading":["Col 1","Col 2","Col 3"],"rows":[["Val 1","Val 2","Val 3"],["Val 4","Val 5","Val 6"]]}'
        name: 'table',
        flags: [
            {
                name: 'set',
                description: '[Direct value flag] ',
                options: []
            }
        ],
        description: 'Prints a SmartCLI experimental table feature, based on the set given in JSON format',
        action: (flags: IFlag[]) => {
            try {
                const opts = JSON.parse(flags[0].options[0].value) as ITableOpts;
                cli.UI.out.printTableExperimental(opts);
            } catch (e) {
                cli.UI.out.printError('The options passed are not valid');
                console.log(e.message);
            }
        }
    })
    .addCommand({
        //  How to run: complex-flag --flag:value1=Yolo:value2=Molo'
        name: 'complex-flag',
        flags: [
            {
                name: 'flag',
                description: '[Options flag values] A flag with options to demonstrate how to pass additional precise info to the callback, from the user. With a clean syntax',
                options: [
                    {
                        name: 'value1',
                        value: 'string' //  typechecks are not yet implemented
                    },
                    {
                        name: 'value2',
                        value: 'string' //  typechecks are not yet implemented
                    }
                ]
            }
        ],
        description: 'Prints the resulting values in a kvp list',
        action: (flags: IFlag[]) => {
            const kvp: IKeyValuesOpts = {
                set: []
            };

            flags[0].options.forEach(opt => kvp.set.push({ k: opt.name, v: opt.value }));
            cli.UI.out.printKeyValues(kvp);
        }
    })
    .addCommand({
        //  How to run: prompt'
        name: 'prompt',
        flags: [],
        description: 'Propmts the user with a question',
        action: (flags: IFlag[]) => {
            cli.UI.input.askUserInput({
                question: 'How are you?',
                surroundWithNewLines: true,
                callback: (answer) => {
                    console.log(`Answer was: ${answer}`);
                }
            });
        }
    })
    .run(process.argv.filter((arg, idx) => idx >= 2).join(' ').toString());