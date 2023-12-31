import { XmlAttributeComponent, XmlComponent } from '../../../../xml-components';
export declare enum DocumentGridType {
    DEFAULT = "default",
    LINES = "lines",
    LINES_AND_CHARS = "linesAndChars",
    SNAP_TO_CHARS = "snapToChars"
}
export interface IDocGridAttributesProperties {
    readonly type?: DocumentGridType;
    readonly linePitch?: number;
    readonly charSpace?: number;
}
export declare class DocGridAttributes extends XmlAttributeComponent<IDocGridAttributesProperties> {
    protected readonly xmlKeys: {
        type: string;
        linePitch: string;
        charSpace: string;
    };
}
export declare class DocumentGrid extends XmlComponent {
    constructor(linePitch: number, charSpace?: number, type?: DocumentGridType);
}
