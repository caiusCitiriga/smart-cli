export interface ICommandOpts {
    name: string;
    action: () => void;
    description: string;
}
