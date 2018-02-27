import { SmartCLI } from "..";
import { Command } from "../entities/command.entity";
import { ICommandOpts } from "../interfaces/command-opts.interface";

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
});