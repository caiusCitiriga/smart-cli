#! /usr/bin/env node
import * as process from 'process';

import { SmartCLI } from '../index';
import { IFlag } from '../interfaces/plain/flag.interface';

const cli = new SmartCLI();
cli
    .addCommand({
        name: 'title',
        flags: [
            {
                name: 'm',
                description: '[Direct value flag] Message',
                options: [
                    {
                        name: 'message',
                        value: 'string'
                    }
                ]
            }
        ],
        description: 'Prints a SmartCLI title containing the string passed to the flag',
        action: (flags: IFlag[]) => {
            cli.UI.out.printTitle(flags[0].options[0].value);
        },
    })
    .addCommand({
        name: 'boxed-title',
        flags: [
            {
                name: 'm',
                options: []
            }
        ],
        description: 'Prints a SmartCLI boxed-title containing the string passed to the flag',
        action: (flags: IFlag[]) => {
            cli.UI.out.printBoxTitle(flags[0].options[0].value);
        },
    })
    .addCommand({
        name: 'info',
        flags: [
            {
                name: 'm',
                options: []
            }
        ],
        description: 'Prints a SmartCLI info message containing the string passed to the flag',
        action: (flags: IFlag[]) => {
            cli.UI.out.printBoxTitle(flags[0].options[0].value);
        },
    })
    .run(process.argv.filter((arg, idx) => idx >= 2).join(' ').toString());