"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var cli = new __1.SmartCLI();
cli
    .addCommand({
    name: 'cmd-1',
    action: function () { return null; },
    flags: [],
    description: 'Command one description'
})
    .addCommand({
    name: 'cmd-2',
    action: function () { return null; },
    flags: [],
    description: 'Command two description'
})
    .addCommand({
    name: 'cmd-3',
    action: function () { return null; },
    flags: [
        {
            name: 'flag-1',
            description: 'Flag one description',
            options: []
        },
        {
            name: 'flag-2',
            description: 'Flag two description',
            options: []
        },
        {
            name: 'flag-3',
            description: 'Flag three description',
            options: []
        }
    ],
    description: 'Command three description'
})
    .run('help');
//# sourceMappingURL=demo.js.map