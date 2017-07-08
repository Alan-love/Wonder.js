import { getMatrix3DataSize, getMatrix4DataSize, getVector3DataSize } from "../../../utils/typeArrayUtils";

export var createTypeArrays = (buffer: any, DataBufferConfig: any, RenderCommandBufferDataFromSystem: any) => {
    var mat3Length = getMatrix3DataSize(),
        mat4Length = getMatrix4DataSize(),
        cameraPositionLength = getVector3DataSize(),
        count = DataBufferConfig.renderCommandBufferCount,
        offset:number = 0;

    RenderCommandBufferDataFromSystem.mMatrices = new Float32Array(buffer, offset, count * mat4Length);
    offset += count * Float32Array.BYTES_PER_ELEMENT * mat4Length;

    RenderCommandBufferDataFromSystem.vMatrices = new Float32Array(buffer, offset, mat4Length);
    offset += Float32Array.BYTES_PER_ELEMENT * mat4Length;

    RenderCommandBufferDataFromSystem.pMatrices = new Float32Array(buffer, offset, mat4Length);
    offset += Float32Array.BYTES_PER_ELEMENT * mat4Length;

    RenderCommandBufferDataFromSystem.cameraPositions = new Float32Array(buffer, offset, cameraPositionLength);
    offset += Float32Array.BYTES_PER_ELEMENT * cameraPositionLength;


    RenderCommandBufferDataFromSystem.normalMatrices = new Float32Array(buffer, offset, mat3Length);
    offset += Float32Array.BYTES_PER_ELEMENT * mat3Length;

    RenderCommandBufferDataFromSystem.materialIndices = new Uint32Array(buffer, offset, count);
    offset += Uint32Array.BYTES_PER_ELEMENT;

    RenderCommandBufferDataFromSystem.shaderIndices = new Uint32Array(buffer, offset, count);
    offset += Uint32Array.BYTES_PER_ELEMENT;

    RenderCommandBufferDataFromSystem.geometryIndices = new Uint32Array(buffer, offset, count);
}

