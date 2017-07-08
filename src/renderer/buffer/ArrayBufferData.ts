import { EBufferType } from "../enum/EBufferType";

export class ArrayBufferData {
    //todo fix worker
    public static verticeBuffers: Array<WebGLBuffer> = null;
    public static normalBuffers: Array<WebGLBuffer> = null;

    public static bufferDataMap: ArrayBufferDataMap = null;
}

export type ArrayBufferDataMap = {
    [geometryIndex: number]: {
        size: number;
        type: EBufferType;
    }
}

