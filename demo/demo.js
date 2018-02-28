"use strict";
exports.__esModule = true;
require("reflect-metadata");
var index_1 = require("../dist/index");
var cli = new index_1.SmartCLI();
cli
    .addCommand({
    flags: [],
    name: 'cmd1',
    description: 'Test',
    action: function (flags) { return console.log('Called cmd 1! with flags: ' + flags[0].name + ' and opt: ' + flags[0].options[0].name); }
})
    .addCommand({
    flags: [],
    name: 'cmd2',
    description: 'Test',
    action: function () { return console.log('Called cmd 2!'); }
})
    .run('cmd1 --flagolo:val=10:yolo=20');
setTimeout(function () {
    cli.run('cmd2');
}, 1000);
