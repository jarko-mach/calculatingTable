import { HorizontalPositionAlign, VerticalPositionAlign } from '../../shared/alignment';
import { HeightRule } from '../../table';
import { XmlAttributeComponent, XmlComponent } from '../../xml-components';
export declare enum DropCapType {
    NONE = "none",
    DROP = "drop",
    MARGIN = "margin"
}
export declare enum FrameAnchorType {
    MARGIN = "margin",
    PAGE = "page",
    TEXT = "text"
}
export declare enum FrameWrap {
    AROUND = "around",
    AUTO = "auto",
    NONE = "none",
    NOT_BESIDE = "notBeside",
    THROUGH = "through",
    TIGHT = "tight"
}
interface IBaseFrameOptions {
    readonly anchorLock?: boolean;
    readonly dropCap?: DropCapType;
    readonly width: number;
    readonly height: number;
    readonly wrap?: FrameWrap;
    readonly lines?: number;
    readonly anchor: {
        readonly horizontal: FrameAnchorType;
        readonly vertical: FrameAnchorType;
    };
    readonly space?: {
        readonly horizontal: number;
        readonly vertical: number;
    };
    readonly rule?: HeightRule;
}
export interface IXYFrameOptions extends IBaseFrameOptions {
    readonly position: {
        readonly x: number;
        readonly y: number;
    };
}
export interface IAlignmentFrameOptions extends IBaseFrameOptions {
    readonly alignment: {
        readonly x: HorizontalPositionAlign;
        readonly y: VerticalPositionAlign;
    };
}
export type IFrameOptions = IXYFrameOptions | IAlignmentFrameOptions;
export declare class FramePropertiesAttributes extends XmlAttributeComponent<{
    readonly anchorLock?: boolean;
    readonly dropCap?: DropCapType;
    readonly width: number;
    readonly height: number;
    readonly x?: number;
    readonly y?: number;
    readonly wrap?: FrameWrap;
    readonly lines?: number;
    readonly anchorHorizontal?: FrameAnchorType;
    readonly anchorVertical?: FrameAnchorType;
    readonly spaceHorizontal?: number;
    readonly spaceVertical?: number;
    readonly rule?: HeightRule;
    readonly alignmentX?: HorizontalPositionAlign;
    readonly alignmentY?: VerticalPositionAlign;
}> {
    protected readonly xmlKeys: {
        anchorLock: string;
        dropCap: string;
        width: string;
        height: string;
        x: string;
        y: string;
        anchorHorizontal: string;
        anchorVertical: string;
        spaceHorizontal: string;
        spaceVertical: string;
        rule: string;
        alignmentX: string;
        alignmentY: string;
        lines: string;
        wrap: string;
    };
}
export declare class FrameProperties extends XmlComponent {
    constructor(options: IFrameOptions);
}
export {};
