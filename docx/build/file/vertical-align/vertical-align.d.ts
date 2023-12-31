import { XmlAttributeComponent, XmlComponent } from '../xml-components';
export declare enum VerticalAlign {
    BOTTOM = "bottom",
    CENTER = "center",
    TOP = "top"
}
export declare class VerticalAlignAttributes extends XmlAttributeComponent<{
    readonly verticalAlign?: VerticalAlign;
}> {
    protected readonly xmlKeys: {
        verticalAlign: string;
    };
}
export declare class VerticalAlignElement extends XmlComponent {
    constructor(value: VerticalAlign);
}
