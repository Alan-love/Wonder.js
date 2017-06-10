import { Map } from "immutable";
import { clear as clearGL, getGL } from "../../device/DeviceManagerSystem";
import { IRenderConfig } from "../../data/render_config";
import { EDrawMode } from "../../enum/EDrawMode";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../component/geometry/GeometrySystem";
import { bindIndexBuffer, sendAttributeData, sendUniformData, use } from "../../shader/ShaderSystem";
import curry from "wonder-lodash/curry";
import { RenderCommandBufferWorkerData } from "../../type/dataType";

export var clear = curry((state: Map<any, any>, render_config:IRenderConfig, DeviceManagerData: any, data:RenderCommandBufferWorkerData) => {
    clearGL(getGL(DeviceManagerData, state), render_config.clearColor, DeviceManagerData);

    return data;
})

export var draw = curry((state: Map<any, any>, render_config:IRenderConfig, DeviceManagerData: any, MaterialData: any, ShaderData: any, ProgramData:any, LocationData:any, GLSLSenderData:any, GeometryData: any, ArrayBufferData: any, IndexBufferData: any, DrawRenderCommandDataFromSystem:any, bufferData:RenderCommandBufferWorkerData) => {
    //todo get mMatrices... 's count data by postMessage?

    let mat4Length = 16;

    var count = bufferData.count,
        buffer:any = bufferData.buffer;



    var mMatrixFloatArray = DrawRenderCommandDataFromSystem.mMatrixFloatArray,
        vMatrixFloatArray = DrawRenderCommandDataFromSystem.vMatrixFloatArray,
        pMatrixFloatArray = DrawRenderCommandDataFromSystem.pMatrixFloatArray;

    var {
        mMatrices,
        vMatrices,
        pMatrices,
        materialIndices,
        shaderIndices,
        geometryIndices
    } = _createTypeArrays(buffer, render_config, mat4Length, DrawRenderCommandDataFromSystem);

    // let mMatrices = new Float32Array(buffer, 0, count * mat4Length),
    //     vMatrices = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length),
    //     pMatrices = new Float32Array(buffer, (count + 1) * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length),
    //     materialIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length, count),
    //     shaderIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT, count),
    //     geometryIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT * 2, count);

    var gl = getGL(DeviceManagerData, state);


    // vMatrices = vMatrices.slice();
    // pMatrices = pMatrices.slice();


    vMatrices = _getMatrixFloat32ArrayData(vMatrices, 0, mat4Length, vMatrixFloatArray);
    pMatrices = _getMatrixFloat32ArrayData(pMatrices, 0, mat4Length, pMatrixFloatArray);


    // for (let gameObject of renderGameObjectArray) {
    for (let i = 0; i < count; i++) {
        let matStartIndex = 16 * i,
            matEndIndex = matStartIndex + 16;




        let shaderIndex = shaderIndices[i],
            geometryIndex = geometryIndices[i];
        // drawMode = drawModes[i];

        let drawMode = EDrawMode.TRIANGLES;



        use(gl, shaderIndex, ProgramData, LocationData, GLSLSenderData);

        //todo set state

        sendAttributeData(gl, shaderIndex, geometryIndex, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);
        // sendUniformData(gl, shaderIndex, MaterialData, ProgramData, LocationData, GLSLSenderData, _buildRenderCommandUniformData(mMatrices.subarray(matStartIndex, matEndIndex), vMatrices.subarray(matStartIndex, matEndIndex), pMatrices.subarray(matStartIndex, matEndIndex), materialIndices[i]));
        ////todo optimize: try to use subarray, but uniformMatrix4fv error: Failed to execute 'uniformMatrix4fv' on 'WebGLRenderingContext': The provided ArrayBufferView value must not be shared.
        // sendUniformData(gl, shaderIndex, MaterialData, ProgramData, LocationData, GLSLSenderData, _buildRenderCommandUniformData(mMatrices.slice(matStartIndex, matEndIndex), vMatrices, pMatrices, materialIndices[i]));
        sendUniformData(gl, shaderIndex, MaterialData, ProgramData, LocationData, GLSLSenderData, _buildRenderCommandUniformData(_getMatrixFloat32ArrayData(mMatrices, matStartIndex, matEndIndex, mMatrixFloatArray), vMatrices, pMatrices, materialIndices[i]));

        if (hasIndices(geometryIndex, GeometryData)) {
            bindIndexBuffer(gl, geometryIndex, ProgramData, GeometryData, IndexBufferData);

            _drawElements(gl, geometryIndex, drawMode, GeometryData);
        }
        else {
            _drawArray(gl, geometryIndex, drawMode, GeometryData);
        }
    }

    gl.commit();

    return state;
})

var _drawElements = (gl: WebGLRenderingContext, geometryIndex: number, drawMode:EDrawMode, GeometryData: any) => {
    var startOffset: number = 0,
        count = getIndicesCount(geometryIndex, GeometryData),
        type = getIndexType(GeometryData),
        typeSize = getIndexTypeSize(GeometryData);

    gl.drawElements(gl[drawMode], count, gl[type], typeSize * startOffset);

    // gl.commit(); // new for webgl in workers
}

var _drawArray = (gl: WebGLRenderingContext, geometryIndex: number, drawMode:EDrawMode, GeometryData: any) => {
    var startOffset: number = 0,
        count = getVerticesCount(geometryIndex, GeometryData);

    gl.drawArrays(gl[drawMode], startOffset, count);
}

var _getMatrixFloat32ArrayData = (sourceMatrices:Float32Array, matStartIndex:number, matEndIndex:number, targetMatrices:Float32Array) => {
    // var arr = new Float32Array(16);
    // var arr = [];

    for(let i = matStartIndex; i < matEndIndex; i++){
        targetMatrices[i - matStartIndex] = sourceMatrices[i];
    }

    return targetMatrices;

    // return null;
}

var _buildRenderCommandUniformData = (mMatrices:Float32Array, vMatrices:Float32Array, pMatrices:Float32Array, materialIndex:number) => {
    return {
        mMatrix: mMatrices,
        vMatrix:vMatrices,
        pMatrix:pMatrices,
        materialIndex:materialIndex
    }
}

var _createTypeArrays = (buffer:any, render_config:IRenderConfig, mat4Length:number, DrawRenderCommandDataFromSystem:any) => {
    if(!_isTypeArrayExist(DrawRenderCommandDataFromSystem)){
        let count = render_config.renderCommandBufferCount;

        DrawRenderCommandDataFromSystem.mMatrices = new Float32Array(buffer, 0, count * mat4Length);
        DrawRenderCommandDataFromSystem.vMatrices = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length);
        DrawRenderCommandDataFromSystem.pMatrices = new Float32Array(buffer, (count + 1) * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length);
        DrawRenderCommandDataFromSystem.materialIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length, count);
        DrawRenderCommandDataFromSystem.shaderIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT, count);
        DrawRenderCommandDataFromSystem.geometryIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT * 2, count);
    }

    return DrawRenderCommandDataFromSystem;
}

var _isTypeArrayExist = (DrawRenderCommandDataFromSystem:any) => {
    return DrawRenderCommandDataFromSystem.mMatrices !== null;
}

export var initData = (DrawRenderCommandDataFromSystem:any) => {
    DrawRenderCommandDataFromSystem.mMatrixFloatArray = new Float32Array(16);
    DrawRenderCommandDataFromSystem.vMatrixFloatArray = new Float32Array(16);
    DrawRenderCommandDataFromSystem.pMatrixFloatArray = new Float32Array(16);
}
