import { Paragraph } from '../../paragraph';
import { XmlComponent } from '../../xml-components';
export declare enum FootnoteType {
    SEPERATOR = "separator",
    CONTINUATION_SEPERATOR = "continuationSeparator"
}
export interface IFootnoteOptions {
    readonly id: number;
    readonly type?: FootnoteType;
    readonly children: readonly Paragraph[];
}
export declare class Footnote extends XmlComponent {
    constructor(options: IFootnoteOptions);
}
