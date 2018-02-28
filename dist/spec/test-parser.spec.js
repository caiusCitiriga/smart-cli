"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_entity_1 = require("../entities/parser.entity");
var nrg_exception_entity_1 = require("../entities/nrg-exception.entity");
var exceptions_conts_1 = require("../consts/exceptions.conts");
function getParserWithCommandConfig(cmds) {
    var parser = new parser_entity_1.Parser();
    cmds.forEach(function (cmd) { return parser.addCommand(cmd); });
    return parser;
}
function getCommand(opts) {
    return {
        flags: [],
        name: opts.name,
        action: opts.action,
        description: opts.desc,
    };
}
describe('Parser', function () {
    it('Should return the command name parsed correctly', function () {
        //  Arrange
        var cmds = [
            getCommand({
                name: 'cmd',
                desc: 'Test command',
                action: function () { return null; },
                flags: [{ name: 'flag', options: [] }]
            })
        ];
        var rawCmd = 'cmd --flag:option';
        var parser = getParserWithCommandConfig(cmds);
        //  Act
        var parsedCmd = parser.parse(rawCmd);
        //  Assert
        expect(parsedCmd.getName()).toBe('cmd');
    });
    it('Should return the flag and the option parsed correctly', function () {
        //  Arrange
        var cmds = [
            getCommand({
                name: 'cmd',
                action: function () { return null; },
                desc: 'Test command',
                flags: [{ name: 'flag', options: [] }]
            })
        ];
        var rawCmd = 'cmd --flag:options';
        var parser = getParserWithCommandConfig(cmds);
        //  Act
        var parsedCmd = parser.parse(rawCmd);
        //  Assert
        expect(parsedCmd.getFlags()[0].name).toEqual('flag');
        expect(parsedCmd.getFlags()[0].options[0].name).toEqual('options');
    });
    it('Should return multiple flags and options sets', function () {
        //  Arrange
        var cmds = [
            getCommand({
                name: 'cmd',
                action: function () { return null; },
                desc: 'Test command',
                flags: [
                    { name: 'flag1', options: [] },
                    { name: 'flag2', options: [] },
                ]
            })
        ];
        var rawCmd = 'cmd --flag1:options1 --flag2:options2';
        var parser = getParserWithCommandConfig(cmds);
        //  Act
        var parsedCmd = parser.parse(rawCmd);
        var flags = parsedCmd.getFlags();
        //  Assert
        expect(flags[0].name).toEqual('flag1');
        expect(flags[1].name).toEqual('flag2');
        expect(flags[0].options[0].name).toEqual('options1');
        expect(flags[1].options[0].name).toEqual('options2');
    });
    it('Should return one flag with two options', function () {
        //  Arrange
        var cmds = [
            getCommand({
                name: 'cmd',
                action: function () { return null; },
                desc: 'Test command',
                flags: [{ name: 'flag1', options: [] }]
            })
        ];
        var rawCmd = 'cmd --flag1:options1=1:options2=2';
        var parser = getParserWithCommandConfig(cmds);
        //  Act
        var parsedCmd = parser.parse(rawCmd);
        var flags = parsedCmd.getFlags();
        //  Assert
        expect(flags[0].name).toEqual('flag1');
        expect(flags[0].options[0].name).toEqual('options1');
        expect(flags[0].options[1].name).toEqual('options2');
    });
    it('Should throw if no matching command was found', function () {
        //  Arrange
        var cmds = [
            getCommand({
                name: 'cmd',
                action: function () { return null; },
                desc: 'Test command',
                flags: [{ name: 'flag1', options: [] }]
            })
        ];
        var rawCmd = 'this-cmd-does-not-exists';
        var parser = getParserWithCommandConfig(cmds);
        //  Prepare the command that should be thrown
        var NoMatchingCommandException = new nrg_exception_entity_1.NRGException().get({
            name: exceptions_conts_1.NRG_EXCEPTIONS.NoMatchingCommandException.name,
            message: exceptions_conts_1.NRG_EXCEPTIONS.NoMatchingCommandException.message(rawCmd),
        });
        //  Act/Assert
        expect(function () { return parser.parse(rawCmd); }).toThrow(NoMatchingCommandException);
    });
    it('Should separate the options by name and value correctly', function () {
        //  Arrange
        var cmds = [
            getCommand({
                name: 'cmd',
                action: function () { return null; },
                desc: 'Test command',
                flags: [{ name: 'flag1', options: [] }]
            })
        ];
        var rawCmd = 'cmd --flag1:opt1=value1';
        var parser = getParserWithCommandConfig(cmds);
        //  Act/Assert
        var returnedCommand = parser.parse(rawCmd);
        expect(returnedCommand.getFlags()[0].name).toBe('flag1');
        expect(returnedCommand.getFlags()[0].options[0].name).toBe('opt1');
        expect(returnedCommand.getFlags()[0].options[0].value).toBe('value1');
    });
});
//# sourceMappingURL=test-parser.spec.js.map