export declare const NRG_EXCEPTIONS: {
    CommandNotFoundException: {
        name: string;
        message: (cmdName: string) => string;
    };
    CommandsNotSetException: {
        name: string;
        message: () => string;
    };
    NoMatchingCommandException: {
        name: string;
        message: (cmdName: string) => string;
    };
    MixedCommandsValueTypesException: {
        name: string;
        message: () => string;
    };
    InvalidValueException: {
        name: string;
        message: () => string;
    };
};
