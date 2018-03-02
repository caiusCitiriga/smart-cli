"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NRG_EXCEPTIONS = {
    CommandNotFoundException: {
        name: 'CommandNotFoundException',
        message: (cmdName) => {
            return `Command not found: ${cmdName}`;
        }
    },
    CommandsNotSetException: {
        name: 'CommandsNotSetException',
        message: () => {
            return `The commands are not set in the HelpManager. Set them before generating the help CommandOpts`;
        }
    },
    NoMatchingCommandException: {
        name: 'NoMatchingCommandException',
        message: (cmdName) => {
            return `No matching command was found for ${cmdName}`;
        }
    },
    MixedCommandsValueTypesException: {
        name: 'MixedCommandsValueTypesException',
        message: () => {
            return `The combination of direct values to flags and flags with options is not supported`;
        }
    },
    InvalidValueException: {
        name: 'InvalidValueException',
        message: () => {
            return `The value passed to the flag is not parsable. Check your syntax.`;
        }
    }
};
//# sourceMappingURL=exceptions.conts.js.map