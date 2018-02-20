export declare class GenericOutput {
    printMessage(text: string): void;
    printWarning(text: string): void;
    printError(text: string): void;
    printInfo(text: string): void;
    printTitle(text: string): void;
    printSubTitle(text: string): void;
    printBoxedTitle(text: string): void;
    printKeyValue(set: {
        key: string;
        value: string;
    }[]): void;
}
