import { Parser } from '../entities/parser.entity';
import { IParser } from '../interfaces/parser.interface';
import { ICommand } from '../interfaces/command.interface';
import { IFlag } from '../interfaces/flag.interface';
import { Command } from '../entities/command.entity';
import { ICommandOpts } from '../interfaces/command-opts.interface';

function getParserWithCommandConfig(cmds: ICommandOpts[]): IParser {
    const parser = new Parser();
    cmds.forEach(cmd => parser.addCommand(cmd));

    return parser;
}

function getCommand(opts: { name: string, desc: string, flags: IFlag[], action: () => void }): ICommandOpts {
    return {
        name: opts.name,
        action: opts.action,
        description: opts.desc,
    }
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
        const noMatchingCommandException = new Error();
        noMatchingCommandException.name = 'NoMatchingCommand';
        noMatchingCommandException.message = `No matching command was found for ${rawCmd}`;

        //  Act/Assert
        expect(() => parser.parse(rawCmd)).toThrow(noMatchingCommandException);
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