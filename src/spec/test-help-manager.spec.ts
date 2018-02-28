import { HelpManager } from "../entities/help-manager.entity";
import { NRGException } from "../entities/nrg-exception.entity";
import { NRG_EXCEPTIONS } from "../consts/exceptions.conts";
import { IFlag } from "../interfaces/plain/flag.interface";
import { ICommand } from "../interfaces/plain/command.interface";
import { Command } from "../entities/command.entity";

describe('HelpManager', function () {
    it('Should throw if the commands are not passed before the help() call', () => {
        //  Arrange
        const helpManager = new HelpManager();
        const exception = new NRGException().get({
            name: NRG_EXCEPTIONS.CommandsNotSetException.name,
            message: NRG_EXCEPTIONS.CommandsNotSetException.message()
        });

        //  Act/Assert
        expect(() => helpManager.help(undefined)).toThrow(exception);
    });

    it('Should throw if the passed flag does not match an existing command', () => {
        //  Arrange
        const notExistingHelpFlag: IFlag = {
            name: 'not-existing',
            options: []
        };

        const fakeCommand = new Command();
        fakeCommand.setName('cmd');

        const helpManager = new HelpManager();
        const exception = new NRGException().get({
            name: NRG_EXCEPTIONS.CommandNotFoundException.name,
            message: NRG_EXCEPTIONS.CommandNotFoundException.message(notExistingHelpFlag.name)
        });

        //  Act
        helpManager.setCommands([fakeCommand]);

        //  Assert
        expect(() => helpManager.help(notExistingHelpFlag)).toThrow(exception);
    });
});