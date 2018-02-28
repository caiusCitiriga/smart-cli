"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var cli = new __1.SmartCLI();
cli
    .addCommand({
    name: 'cmd',
    flags: [],
    action: function () { return null; },
    description: 'Test command',
})
    .run('help');
//# sourceMappingURL=demo.js.map