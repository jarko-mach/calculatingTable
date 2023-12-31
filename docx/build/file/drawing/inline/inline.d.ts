import { IMediaData, IMediaDataTransformation } from '../../media';
import { XmlComponent } from '../../xml-components';
import { DocPropertiesOptions } from "./../doc-properties/doc-properties";
interface InlineOptions {
    readonly mediaData: IMediaData;
    readonly transform: IMediaDataTransformation;
    readonly docProperties?: DocPropertiesOptions;
}
export declare class Inline extends XmlComponent {
    private readonly extent;
    private readonly graphic;
    constructor({ mediaData, transform, docProperties }: InlineOptions);
}
export {};
