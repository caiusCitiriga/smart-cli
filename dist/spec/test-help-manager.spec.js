"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var help_manager_entity_1 = require("../entities/help-manager.entity");
var nrg_exception_entity_1 = require("../entities/nrg-exception.entity");
var exceptions_conts_1 = require("../consts/exceptions.conts");
var command_entity_1 = require("../entities/command.entity");
describe('HelpManager', function () {
    it('Should throw if the commands are not passed before the help() call', function () {
        //  Arrange
        var helpManager = new help_manager_entity_1.HelpManager();
        var exception = new nrg_exception_entity_1.NRGException().get({
            name: exceptions_conts_1.NRG_EXCEPTIONS.CommandsNotSetException.name,
            message: exceptions_conts_1.NRG_EXCEPTIONS.CommandsNotSetException.message()
        });
        //  Act/Assert
        expect(function () { return helpManager.help(undefined); }).toThrow(exception);
    });
    it('Should throw if the passed flag does not match an existing command', function () {
        //  Arrange
        var notExistingHelpFlag = {
            name: 'not-existing',
            options: []
        };
        var fakeCommand = new command_entity_1.Command();
        fakeCommand.setName('cmd');
        var helpManager = new help_manager_entity_1.HelpManager();
        var exception = new nrg_exception_entity_1.NRGException().get({
            name: exceptions_conts_1.NRG_EXCEPTIONS.CommandNotFoundException.name,
            message: exceptions_conts_1.NRG_EXCEPTIONS.CommandNotFoundException.message(notExistingHelpFlag.name)
        });
        //  Act
        helpManager.setCommands([fakeCommand]);
        //  Assert
        expect(function () { return helpManager.help(notExistingHelpFlag); }).toThrow(exception);
    });
});
//# sourceMappingURL=test-help-manager.spec.js.map