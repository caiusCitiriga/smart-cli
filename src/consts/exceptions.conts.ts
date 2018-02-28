export const NRG_EXCEPTIONS = {
    CommandNotFoundException: {
        name: 'CommandNotFoundException',
        message: (cmdName: string) => {
            return `Command not found: ${cmdName}`;
        }
    }
}