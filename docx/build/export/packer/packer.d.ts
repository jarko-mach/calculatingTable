/// <reference types="node" />
/// <reference types="node" />
import { Stream } from "stream";
import { File } from '../../file/file';
export declare enum PrettifyType {
    NONE = "",
    WITH_2_BLANKS = "  ",
    WITH_4_BLANKS = "    ",
    WITH_TAB = "\t"
}
export declare class Packer {
    static toString(file: File, prettify?: boolean | PrettifyType): Promise<string>;
    static toBuffer(file: File, prettify?: boolean | PrettifyType): Promise<Buffer>;
    static toBase64String(file: File, prettify?: boolean | PrettifyType): Promise<string>;
    static toBlob(file: File, prettify?: boolean | PrettifyType): Promise<Blob>;
    static toStream(file: File, prettify?: boolean | PrettifyType): Stream;
    private static readonly compiler;
}
