"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dispatcher_entity_1 = require("../entities/dispatcher.entity");
var command_entity_1 = require("../entities/command.entity");
describe('Dispatcher', function () {
    it('Should run the action on the dispatched command', function () {
        //  Arrange
        var itHasBeenCalled = false;
        var command = new command_entity_1.Command();
        var dispatcher = new dispatcher_entity_1.Dispatcher();
        //  Act
        command.setAction(function () { return itHasBeenCalled = true; });
        command.setName('cmd');
        dispatcher.dispatch(command);
        //  Assert
        expect(itHasBeenCalled).toBeTruthy();
    });
    it('Should return the name of the command ran', function () {
        //  Arrange
        var itHasBeenCalled = false;
        var command = new command_entity_1.Command();
        var dispatcher = new dispatcher_entity_1.Dispatcher();
        //  Act
        command.setAction(function () { return itHasBeenCalled = true; });
        command.setName('cmd');
        var result = dispatcher.dispatch(command);
        //  Assert
        expect(result).toBe("Dispatching " + command.getName());
    });
});
//# sourceMappingURL=test-dispatcher.spec.js.map