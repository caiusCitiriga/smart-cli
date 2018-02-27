"use strict";
exports.__esModule = true;
var index_1 = require("../dist/index");
var cli = new index_1.SmartCLI();
cli
    .addCommand({
    name: 'cmd1',
    description: 'Test',
    action: function () { return console.log('Called cmd 1!'); }
})
    .addCommand({
    name: 'cmd2',
    description: 'Test',
    action: function () { return console.log('Called cmd 2!'); }
})
    .run('cmd1');
setTimeout(function () {
    cli.run('cmd2');
}, 1000);
