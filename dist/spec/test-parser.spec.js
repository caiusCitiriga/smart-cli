"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_entity_1 = require("../entities/parser.entity");
var command_entity_1 = require("../entities/command.entity");
function getParserWithCommandConfig(cmds) {
    var parser = new parser_entity_1.Parser();
    cmds.forEach(function (cmd) { return parser.addCommand(cmd); });
    return parser;
}
function getCommand(opts) {
    var cmd = new command_entity_1.Command();
    cmd.setName(opts.name);
    cmd.setFlags(opts.flags);
    cmd.setDescription(opts.desc);
    return cmd;
}
describe('Parser', function () {
    it('Should return the command name parsed correctly', function () {
        //  Arrange
        var cmds = [
            getCommand({
                name: 'cmd',
                desc: 'Test command',
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
                desc: 'Test command',
                flags: [{ name: 'flag', options: [] }]
            })
        ];
        var rawCmd = 'cmd --flag:options';
        var parser = getParserWithCommandConfig(cmds);
        //  Act
        var parsedCmd = parser.parse(rawCmd);
        //  Assert
        expect(parsedCmd.getFlags()).toEqual([
            { name: 'flag', options: ['options'] }
        ]);
    });
    it('Should return multiple flags and options sets', function () {
        //  Arrange
        var cmds = [
            getCommand({
                name: 'cmd',
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
        expect(flags[0].options[0]).toEqual('options1');
        expect(flags[1].options[0]).toEqual('options2');
    });
    it('Should return one flag with two options', function () {
        //  Arrange
        var cmds = [
            getCommand({
                name: 'cmd',
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
        expect(flags[0].options[0]).toEqual('options1=1');
        expect(flags[0].options[1]).toEqual('options2=2');
    });
    it('Should throw if no matching command was found', function () {
        //  Arrange
        var cmds = [
            getCommand({
                name: 'cmd',
                desc: 'Test command',
                flags: [{ name: 'flag1', options: [] }]
            })
        ];
        var rawCmd = 'this-cmd-does-not-exists';
        var parser = getParserWithCommandConfig(cmds);
        //  Prepare the command that should be thrown
        var noMatchingCommandException = new Error();
        noMatchingCommandException.name = 'NoMatchingCommand';
        noMatchingCommandException.message = "No matching command was found for " + rawCmd;
        //  Act/Assert
        expect(function () { return parser.parse(rawCmd); }).toThrow(noMatchingCommandException);
    });
});
