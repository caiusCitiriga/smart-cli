import { Command } from "../entities/command.entity";
import { Dispatcher } from "../entities/dispatcher.entity";

describe('Dispatcher', function () {
    it('Should run the action on the dispatched command', () => {
        //  Arrange
        let itHasBeenCalled = false;
        const command = new Command();
        const dispatcher = new Dispatcher();

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
        const command = new Command();
        const dispatcher = new Dispatcher();

        //  Act
        command.setAction(() => itHasBeenCalled = true);
        command.setName('cmd');
        const result = dispatcher.dispatch(command);

        //  Assert
        expect(result.getName()).toBe(`cmd`);
    });
});