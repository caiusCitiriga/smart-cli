#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process = require("process");
const index_1 = require("../index");
console.log(process.argv.filter((arg, idx) => idx >= 2).join(' ').toString());
new index_1.SmartCLI()
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
//# sourceMappingURL=demo.js.map