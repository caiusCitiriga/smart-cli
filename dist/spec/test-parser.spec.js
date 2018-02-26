"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_entity_1 = require("../entities/parser.entity");
describe('Parser', function () {
    it('Should return the command name parsed correctly', function () {
        //  Arrange
        var parser = new parser_entity_1.Parser();
        var rawCmd = 'cmd --flag:options';
        //  Act
        var parsedCmd = parser.parse(rawCmd);
        //  Assert
        expect(parsedCmd.getName()).toBe('cmd');
    });
    it('Should return the flag and the option parsed correctly', function () {
        //  Arrange
        var parser = new parser_entity_1.Parser();
        var rawCmd = 'cmd --flag:options';
        //  Act
        var parsedCmd = parser.parse(rawCmd);
        //  Assert
        expect(parsedCmd.getFlags()).toEqual([
            { name: 'flag', options: ['options'] }
        ]);
    });
    it('Should return multiple flags and options sets', function () {
        //  Arrange
        var parser = new parser_entity_1.Parser();
        var rawCmd = 'cmd --flag1:options1 --flag2:options2';
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
        var parser = new parser_entity_1.Parser();
        var rawCmd = 'cmd --flag1:options1=1:options2=2';
        //  Act
        var parsedCmd = parser.parse(rawCmd);
        var flags = parsedCmd.getFlags();
        //  Assert
        expect(flags[0].name).toEqual('flag1');
        expect(flags[0].options[0]).toEqual('options1=1');
        expect(flags[0].options[1]).toEqual('options2=2');
    });
});
