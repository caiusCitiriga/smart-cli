"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_conts_1 = require("../consts/exceptions.conts");
const command_entity_1 = require("../entities/command.entity");
const help_manager_entity_1 = require("../entities/help-manager.entity");
const nrg_exception_entity_1 = require("../entities/nrg-exception.entity");
describe('HelpManager', function () {
    it('Should throw if the commands are not passed before the help() call', () => {
        //  Arrange
        const helpManager = new help_manager_entity_1.HelpManager();
        const exception = new nrg_exception_entity_1.NRGException().get({
            name: exceptions_conts_1.NRG_EXCEPTIONS.CommandsNotSetException.name,
            message: exceptions_conts_1.NRG_EXCEPTIONS.CommandsNotSetException.message()
        });
        //  Act/Assert
        expect(() => helpManager.help(undefined)).toThrow(exception);
    });
    it('Should throw if the passed flag does not match an existing command', () => {
        //  Arrange
        const notExistingHelpFlag = {
            name: 'not-existing',
            options: []
        };
        const fakeCommand = new command_entity_1.Command();
        fakeCommand.setName('cmd');
        const helpManager = new help_manager_entity_1.HelpManager();
        const exception = new nrg_exception_entity_1.NRGException().get({
            name: exceptions_conts_1.NRG_EXCEPTIONS.CommandNotFoundException.name,
            message: exceptions_conts_1.NRG_EXCEPTIONS.CommandNotFoundException.message(notExistingHelpFlag.name)
        });
        //  Act
        helpManager.setCommands([fakeCommand]);
        //  Assert
        expect(() => helpManager.help(notExistingHelpFlag)).toThrow(exception);
    });
});
//# sourceMappingURL=test-help-manager.spec.js.map