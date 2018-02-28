import { SmartCLI } from "..";
import { Command } from "../entities/command.entity";
import { ICommandOpts } from "../interfaces/command-opts.interface";
import { IFlag } from "../../dist/interfaces/flag.interface";

describe('SmartCLI', () => {
    it('Should initialize SmartCLI', () => {
        //  Arrange
        const cli = new SmartCLI();

        //  Act/Assert
        expect(cli).toBeTruthy();
    });

    it('Should return the name of the dispatched command', () => {
        //  Arrange
        const cli = new SmartCLI();
        const command: ICommandOpts = {
            name: 'cmd',
            flags: [],
            action: () => null,
            description: 'test'
        }

        //  Act
        cli.addCommand(command);
        const userRanCmd = 'cmd';
        const returnedRanCmd = cli.run(userRanCmd);

        //  Act/Assert
        expect(returnedRanCmd).toEqual(`Dispatching ${userRanCmd}`);
    });

    it('Should call the action on the matched command', () => {
        //  Arrange
        let callHasBeenMade = false;
        const cli = new SmartCLI();
        const command: ICommandOpts = {
            name: 'cmd',
            flags: [],
            action: () => callHasBeenMade = true,
            description: 'test'
        };

        //  Act
        cli.addCommand(command);
        const userRanCmd = 'cmd';
        const returnedRanCmd = cli.run(userRanCmd);

        //  Act/Assert
        expect(callHasBeenMade).toBeTruthy();
    });

    it('Should return the flags and options passed by the user', () => {
        //  Arrange
        const cli = new SmartCLI();
        const command: ICommandOpts = {
            name: 'cmd',
            flags: [],
            action: (flags: IFlag[]) => null,
            description: 'test'
        };

        //  Act
        cli.addCommand(command);
        const userRanCmd = 'cmd --flag:option=value';
        const returnedRanCmd = cli.run(userRanCmd);

        //  Act/Assert
        expect(returnedRanCmd.getFlags()[0].name).toBe('flag');
        expect(returnedRanCmd.getFlags()[0].options[0].name).toBe('option');
        expect(returnedRanCmd.getFlags()[0].options[0].value).toBe('value');
    });
});