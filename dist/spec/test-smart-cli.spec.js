"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
describe('SmartCLI', function () {
    it('Should initialize SmartCLI', function () {
        //  Arrange
        var cli = new __1.SmartCLI();
        //  Act/Assert
        expect(cli).toBeTruthy();
    });
    it('Should return the name of the dispatched command', function () {
        //  Arrange
        var cli = new __1.SmartCLI();
        var command = {
            name: 'cmd',
            flags: [],
            action: function () { return null; },
            description: 'test'
        };
        //  Act
        cli.addCommand(command);
        var userRanCmd = 'cmd';
        var returnedRanCmd = cli.run(userRanCmd);
        //  Act/Assert
        expect(returnedRanCmd).toEqual("Dispatching " + userRanCmd);
    });
    it('Should call the action on the matched command', function () {
        //  Arrange
        var callHasBeenMade = false;
        var cli = new __1.SmartCLI();
        var command = {
            name: 'cmd',
            flags: [],
            action: function () { return callHasBeenMade = true; },
            description: 'test'
        };
        //  Act
        cli.addCommand(command);
        var userRanCmd = 'cmd';
        var returnedRanCmd = cli.run(userRanCmd);
        //  Act/Assert
        expect(callHasBeenMade).toBeTruthy();
    });
});
//# sourceMappingURL=test-smart-cli.spec.js.map