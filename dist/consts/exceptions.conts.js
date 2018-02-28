"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NRG_EXCEPTIONS = {
    CommandNotFoundException: {
        name: 'CommandNotFoundException',
        message: function (cmdName) {
            return "Command not found: " + cmdName;
        }
    },
    CommandsNotSetException: {
        name: 'CommandsNotSetException',
        message: function () {
            return "The commands are not set in the HelpManager. Set them before generating the help CommandOpts";
        }
    },
    NoMatchingCommandException: {
        name: 'NoMatchingCommandException',
        message: function (cmdName) {
            return "No matching command was found for " + cmdName;
        }
    }
};
//# sourceMappingURL=exceptions.conts.js.map