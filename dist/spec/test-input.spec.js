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
});
//# sourceMappingURL=test-input.spec.js.map