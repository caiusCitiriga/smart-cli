"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_entity_1 = require("../entities/parser.entity");
const nrg_exception_entity_1 = require("../entities/nrg-exception.entity");
const exceptions_conts_1 = require("../consts/exceptions.conts");
function getParserWithCommandConfig(cmds) {
    const parser = new parser_entity_1.Parser();
    cmds.forEach(cmd => parser.addCommand(cmd));
    return parser;
}
function getCommand(opts) {
    return {
        flags: opts.flags,
        name: opts.name,
        action: opts.action,
        description: opts.desc,
    };
}
describe('Parser', function () {
    it('Should return the command name parsed correctly', () => {
        //  Arrange
        const cmds = [
            getCommand({
                name: 'cmd',
                desc: 'Test command',
                action: () => null,
                flags: [{ name: 'flag', options: [] }]
            })
        ];
        const rawCmd = 'cmd --flag:option';
        const parser = getParserWithCommandConfig(cmds);
        //  Act
        const parsedCmd = parser.parse(rawCmd);
        //  Assert
        expect(parsedCmd.getName()).toBe('cmd');
    });
    it('Should return the flag and the option parsed correctly', () => {
        //  Arrange
        const cmds = [
            getCommand({
                name: 'cmd',
                action: () => null,
                desc: 'Test command',
                flags: [{ name: 'flag', options: [] }]
            })
        ];
        const rawCmd = 'cmd --flag:options';
        const parser = getParserWithCommandConfig(cmds);
        //  Act
        const parsedCmd = parser.parse(rawCmd);
        //  Assert
        expect(parsedCmd.getFlags()[0].name).toEqual('flag');
        expect(parsedCmd.getFlags()[0].options[0].name).toEqual('options');
    });
    it('Should return multiple flags and options sets', () => {
        //  Arrange
        const cmds = [
            getCommand({
                name: 'cmd',
                action: () => null,
                desc: 'Test command',
                flags: [
                    { name: 'flag1', options: [] },
                    { name: 'flag2', options: [] },
                ]
            })
        ];
        const rawCmd = 'cmd --flag1:options1 --flag2:options2';
        const parser = getParserWithCommandConfig(cmds);
        //  Act
        const parsedCmd = parser.parse(rawCmd);
        const flags = parsedCmd.getFlags();
        //  Assert
        expect(flags[0].name).toEqual('flag1');
        expect(flags[1].name).toEqual('flag2');
        expect(flags[0].options[0].name).toEqual('options1');
        expect(flags[1].options[0].name).toEqual('options2');
    });
    it('Should return one flag with two options', () => {
        //  Arrange
        const cmds = [
            getCommand({
                name: 'cmd',
                action: () => null,
                desc: 'Test command',
                flags: [{ name: 'flag1', options: [] }]
            })
        ];
        const rawCmd = 'cmd --flag1:options1=1:options2=2';
        const parser = getParserWithCommandConfig(cmds);
        //  Act
        const parsedCmd = parser.parse(rawCmd);
        const flags = parsedCmd.getFlags();
        //  Assert
        expect(flags[0].name).toEqual('flag1');
        expect(flags[0].options[0].name).toEqual('options1');
        expect(flags[0].options[1].name).toEqual('options2');
    });
    it('Should return the value into the options if the flag uses "direct-value" mode', () => {
        //  Arrange
        const cmds = [
            getCommand({
                name: 'echo',
                action: () => null,
                desc: 'Test command',
                flags: [{ name: 'm', options: null }]
            })
        ];
        const rawCmd = 'echo --m=My test message';
        const parser = getParserWithCommandConfig(cmds);
        //  Act
        const parsedCmd = parser.parse(rawCmd);
        const flags = parsedCmd.getFlags();
        //  Assert
        expect(flags[0].name).toEqual('m');
        expect(flags[0].options[0].name).toEqual('m');
        expect(flags[0].options[0].value).toEqual('My test message');
    });
    it('Should throw if no matching command was found', () => {
        //  Arrange
        const cmds = [
            getCommand({
                name: 'cmd',
                action: () => null,
                desc: 'Test command',
                flags: [{ name: 'flag1', options: [] }]
            })
        ];
        const rawCmd = 'this-cmd-does-not-exists';
        const parser = getParserWithCommandConfig(cmds);
        //  Prepare the command that should be thrown
        const NoMatchingCommandException = new nrg_exception_entity_1.NRGException().get({
            name: exceptions_conts_1.NRG_EXCEPTIONS.NoMatchingCommandException.name,
            message: exceptions_conts_1.NRG_EXCEPTIONS.NoMatchingCommandException.message(rawCmd),
        });
        //  Act/Assert
        expect(() => parser.parse(rawCmd)).toThrow(NoMatchingCommandException);
    });
    it('Should separate the options by name and value correctly', () => {
        //  Arrange
        const cmds = [
            getCommand({
                name: 'cmd',
                action: () => null,
                desc: 'Test command',
                flags: [{ name: 'flag1', options: [] }]
            })
        ];
        const rawCmd = 'cmd --flag1:opt1=value1';
        const parser = getParserWithCommandConfig(cmds);
        //  Act/Assert
        const returnedCommand = parser.parse(rawCmd);
        expect(returnedCommand.getFlags()[0].name).toBe('flag1');
        expect(returnedCommand.getFlags()[0].options[0].name).toBe('opt1');
        expect(returnedCommand.getFlags()[0].options[0].value).toBe('value1');
    });
});
//# sourceMappingURL=test-parser.spec.js.map