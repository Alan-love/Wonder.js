import { getOrCreateBuffer as getOrCreateBufferUtils, initData as initDataUtils } from "../utils/buffer/indexBufferUtils";
import { getIndices } from "../../component/geometry/GeometrySystem";
import { getGL } from "../device/DeviceManagerSystem";
import { DeviceManagerData } from "../device/DeviceManagerData";
import { isBufferExist } from "../utils/buffer/bufferUtils";
import { deleteVal } from "../../utils/arrayUtils";

export var getOrCreateBuffer = (gl: WebGLRenderingContext, geometryIndex: number, GeometryData: any, IndexBufferData: any) => {
    return getOrCreateBufferUtils(gl, geometryIndex, getIndices, GeometryData, IndexBufferData);
}

export var initData = initDataUtils;

export var disposeBuffer = (geometryIndex: number, IndexBufferData: any) => {
    var gl = getGL(DeviceManagerData, null),
        buffers = IndexBufferData.buffers,
        buffer = buffers[geometryIndex];

    if (isBufferExist(buffer)) {
        gl.deleteBuffer(buffers[geometryIndex]);

        /*!
         no need to consider the memory problem caused by not-used val in buffers, because geometry index will be repeat(geometry memory will be reallocated)
         */
        deleteVal(geometryIndex, buffers);
    }
}
