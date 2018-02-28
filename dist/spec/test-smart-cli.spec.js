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
        expect(returnedRanCmd.getName()).toEqual(userRanCmd);
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
    it('Should return the flags and options passed by the user', function () {
        //  Arrange
        var cli = new __1.SmartCLI();
        var command = {
            name: 'cmd',
            flags: [],
            action: function (flags) { return null; },
            description: 'test'
        };
        //  Act
        cli.addCommand(command);
        var userRanCmd = 'cmd --flag:option=value';
        var returnedRanCmd = cli.run(userRanCmd);
        //  Act/Assert
        expect(returnedRanCmd.getFlags()[0].name).toBe('flag');
        expect(returnedRanCmd.getFlags()[0].options[0].name).toBe('option');
        expect(returnedRanCmd.getFlags()[0].options[0].value).toBe('value');
    });
});
//# sourceMappingURL=test-smart-cli.spec.js.map