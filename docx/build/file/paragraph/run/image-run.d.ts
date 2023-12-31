/// <reference types="node" />
import { IContext, IXmlableObject } from '../../xml-components';
import { DocPropertiesOptions } from '../../drawing/doc-properties/doc-properties';
import { IFloating } from "../../drawing";
import { IMediaTransformation } from "../../media";
import { Run } from "../run";
export interface IImageOptions {
    readonly data: Buffer | string | Uint8Array | ArrayBuffer;
    readonly transformation: IMediaTransformation;
    readonly floating?: IFloating;
    readonly altText?: DocPropertiesOptions;
}
export declare class ImageRun extends Run {
    private readonly key;
    private readonly imageData;
    constructor(options: IImageOptions);
    prepForXml(context: IContext): IXmlableObject | undefined;
    private convertDataURIToBinary;
}
