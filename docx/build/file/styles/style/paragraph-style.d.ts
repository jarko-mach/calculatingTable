import { IParagraphStylePropertiesOptions, IRunStylePropertiesOptions } from '../../paragraph';
import { IStyleOptions, Style } from "./style";
export interface IBaseParagraphStyleOptions extends IStyleOptions {
    readonly paragraph?: IParagraphStylePropertiesOptions;
    readonly run?: IRunStylePropertiesOptions;
}
export interface IParagraphStyleOptions extends IBaseParagraphStyleOptions {
    readonly id: string;
}
export declare class StyleForParagraph extends Style {
    private readonly paragraphProperties;
    private readonly runProperties;
    constructor(options: IParagraphStyleOptions);
}
