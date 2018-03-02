export interface IFlag {
    name: string;
    options: IOption[];
    description?: string;
    usesDirectValue?: boolean;
}
export interface IOption {
    name: string;
    value: string;
}
