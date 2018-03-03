"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_entity_1 = require("../entities/command.entity");
const dispatcher_entity_1 = require("../entities/dispatcher.entity");
describe('Dispatcher', function () {
    it('Should run the action on the dispatched command', () => {
        //  Arrange
        let itHasBeenCalled = false;
        const command = new command_entity_1.Command();
        const dispatcher = new dispatcher_entity_1.Dispatcher();
        //  Act
        command.setAction(() => itHasBeenCalled = true);
        command.setName('cmd');
        dispatcher.dispatch(command);
        //  Assert
        expect(itHasBeenCalled).toBeTruthy();
    });
    it('Should return the name of the command ran', () => {
        //  Arrange
        let itHasBeenCalled = false;
        const command = new command_entity_1.Command();
        const dispatcher = new dispatcher_entity_1.Dispatcher();
        //  Act
        command.setAction(() => itHasBeenCalled = true);
        command.setName('cmd');
        const result = dispatcher.dispatch(command);
        //  Assert
        expect(result.getName()).toBe(`cmd`);
    });
});
//# sourceMappingURL=test-dispatcher.spec.1.js.map