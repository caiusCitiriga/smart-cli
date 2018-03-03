#! /usr/bin/env node
import * as process from 'process';

import { SmartCLI } from '../index';

console.log(process.argv.filter((arg, idx) => idx >= 2).join(' ').toString());
new SmartCLI()
    .addCommand({
        flags: [],
        name: 'alert',
        description: 'Logs an alert into the console',
        action: () => console.log('Alert'),
    })
    .addCommand({
        name: 'echo',
        action: () => null,
        description: 'Test command',
        flags: [{ name: 'm', options: null }]
    })
    .run(process.argv.filter((arg, idx) => idx >= 2).join(' ').toString());