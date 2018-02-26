import { Parser } from '../entities/parser.entity';
import { IParser } from '../interfaces/parser.interface';
import { ICommand } from '../interfaces/command.interface';
import { IFlag } from '../interfaces/flag.interface';
import { Command } from '../entities/command.entity';

function getParserWithCommandConfig(cmds: ICommand[]): IParser {
    const parser = new Parser();
    cmds.forEach(cmd => parser.addCommand(cmd));

    return parser;
}

function getCommand(opts: { name: string, desc: string, flags: IFlag[] }): ICommand {
    const cmd = new Command();
    cmd.setName(opts.name);
    cmd.setFlags(opts.flags);
    cmd.setDescription(opts.desc);

    return cmd;
}

describe('Parser', function () {
    it('Should return the command name parsed correctly', function () {
        //  Arrange
        const cmds = [
            getCommand({
                name: 'cmd',
                desc: 'Test command',
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

    it('Should return the flag and the option parsed correctly', function () {
        //  Arrange
        const cmds = [
            getCommand({
                name: 'cmd',
                desc: 'Test command',
                flags: [{ name: 'flag', options: [] }]
            })
        ];
        const rawCmd = 'cmd --flag:options';
        const parser = getParserWithCommandConfig(cmds);

        //  Act
        const parsedCmd = parser.parse(rawCmd);

        //  Assert
        expect(parsedCmd.getFlags()).toEqual([
            { name: 'flag', options: ['options'] }
        ]);
    });

    it('Should return multiple flags and options sets', function () {
        //  Arrange
        const cmds = [
            getCommand({
                name: 'cmd',
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

        expect(flags[0].options[0]).toEqual('options1');
        expect(flags[1].options[0]).toEqual('options2');
    });

    it('Should return one flag with two options', function () {
        //  Arrange
        const cmds = [
            getCommand({
                name: 'cmd',
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

        expect(flags[0].options[0]).toEqual('options1=1');
        expect(flags[0].options[1]).toEqual('options2=2');
    });

    it('Should throw if no matching command was found', function () {
        //  Arrange
        const cmds = [
            getCommand({
                name: 'cmd',
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
});