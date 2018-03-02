export interface IFlag {
    name: string;
    options: IOption[];
    description?: string;
}

export interface IOption {
    name: string;
    value: string;
}
