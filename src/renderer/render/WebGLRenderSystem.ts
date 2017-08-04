import { Map } from "immutable";
import { getRenderList } from "../../component/renderer/MeshRendererSystem";
import { MeshRendererData } from "../../component/renderer/MeshRendererData";
import { compose } from "../../utils/functionalUtils";
import { createRenderCommandBufferData } from "../command_buffer/RenderCommandBufferSystem";
import { sendDrawData } from "../worker/logic_file/draw/SendDrawRenderCommandBufferDataSystem";
import { init as initMaterial } from "../../component/material/MaterialSystem";
import { MaterialData } from "../../component/material/MaterialData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { GeometryData } from "../../component/geometry/GeometryData";
import { ArrayBufferData } from "../buffer/ArrayBufferData";
import { IndexBufferData } from "../buffer/IndexBufferData";
import { render_config } from "../data/render_config";
import { DeviceManagerData } from "../device/DeviceManagerData";
import { ThreeDTransformData } from "../../component/transform/ThreeDTransformData";
import { SceneData } from "../../core/entityObject/scene/SceneData";
import { CameraControllerData } from "../../component/camera/CameraControllerData";
import { CameraData } from "../../component/camera/CameraData";
import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { RenderCommandBufferData } from "../command_buffer/RenderCommandBufferData";
import { SendDrawRenderCommandBufferData } from "../worker/logic_file/draw/SendDrawRenderCommandBufferData";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
// import { clear, draw } from "../draw/DrawRenderCommandBufferSystem";
import { DrawRenderCommandBufferData } from "../draw/DrawRenderCommandBufferData";
import { ProgramData } from "../shader/program/ProgramData";
import { LocationData } from "../shader/location/LocationData";
import { GLSLSenderData } from "../shader/glslSender/GLSLSenderData";
import { buildDrawDataMap } from "../utils/draw/drawRenderCommandBufferUtils";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { getRenderWorker } from "../../worker/WorkerInstanceSystem";
import { WorkerInstanceData } from "../../worker/WorkerInstanceData";
import { BasicMaterialData } from "../../component/material/BasicMaterialData";
import { LightMaterialData } from "../../component/material/LightMaterialData";
import { GlobalTempData } from "../../definition/GlobalTempData";
import { AmbientLightData } from "../../component/light/AmbientLightData";
import { DirectionLightData } from "../../component/light/DirectionLightData";
import { getGL, setSide } from "../device/DeviceManagerSystem";
import {
    getBasicMaterialBufferStartIndex,
    getLightMaterialBufferStartIndex
} from "../utils/material/bufferUtils";
import { initState } from "../utils/state/stateUtils";
import { PointLightData } from "../../component/light/PointLightData";
import {
    getAmbientLightBufferCount, getDirectionLightBufferCount,
    getPointLightBufferCount
} from "../utils/light/bufferUtils";
import { TextureData } from "../texture/TextureData";
import { MapManagerData } from "../texture/MapManagerData";
import { TextureCacheData } from "../texture/TextureCacheData";
import { convertSourceMapToSrcIndexArr, getUniformSamplerNameMap } from "../texture/TextureSystem";
import { getDiffuseMapIndex, getSpecularMapIndex } from "../../component/material/LightMaterialSystem";
import { GPUDetector } from "../device/GPUDetector";
import { GBufferData } from "../defer/gbuffer/GBufferData";
import { init as initDefer, draw as deferDraw  } from "../defer/DeferShadingSystem";
import { buildInitShaderDataMap } from "../utils/material/materialUtils";
import { DeferLightPassData } from "../defer/light/DeferLightPassData";
import { ShaderData } from "../shader/ShaderData";
import { buildDrawDataMap as buildDeferDrawDataMap } from "../defer/draw/DeferDrawRenderCommandBufferSystem";

export var init = null;

export var render = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    init = (state: Map<any, any>) => {
        var renderWorker = getRenderWorker(WorkerInstanceData);

        renderWorker.postMessage({
            operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
            materialData: {
                buffer: MaterialData.buffer,
                basicMaterialData: {
                    startIndex: getBasicMaterialBufferStartIndex(),
                    index: BasicMaterialData.index
                },
                lightMaterialData: {
                    startIndex: getLightMaterialBufferStartIndex(),
                    index: LightMaterialData.index,
                    diffuseMapIndex: getDiffuseMapIndex(LightMaterialData),
                    specularMapIndex: getSpecularMapIndex(LightMaterialData)
                }
            },
            geometryData: {
                buffer: GeometryData.buffer,
                indexType: GeometryData.indexType,
                indexTypeSize: GeometryData.indexTypeSize,
                verticesInfoList: GeometryData.verticesInfoList,
                normalsInfoList: GeometryData.normalsInfoList,
                texCoordsInfoList: GeometryData.texCoordsInfoList,
                indicesInfoList: GeometryData.indicesInfoList
            },
            lightData: {
                ambientLightData: {
                    buffer: AmbientLightData.buffer,
                    bufferCount: getAmbientLightBufferCount(),
                    lightCount: AmbientLightData.count

                },
                directionLightData: {
                    buffer: DirectionLightData.buffer,
                    bufferCount: getDirectionLightBufferCount(),
                    lightCount: DirectionLightData.count,
                    directionLightGLSLDataStructureMemberNameArr: DirectionLightData.lightGLSLDataStructureMemberNameArr
                },
                pointLightData: {
                    buffer: PointLightData.buffer,
                    bufferCount: getPointLightBufferCount(),
                    lightCount: PointLightData.count,
                    pointLightGLSLDataStructureMemberNameArr: PointLightData.lightGLSLDataStructureMemberNameArr
                }
            },
            textureData: {
                mapManagerBuffer: MapManagerData.buffer,
                textureBuffer: TextureData.buffer,
                index: TextureData.index,
                imageSrcIndexArr: convertSourceMapToSrcIndexArr(TextureData),
                uniformSamplerNameMap: getUniformSamplerNameMap(TextureData)
            }
        });

        renderWorker.onmessage = (e) => {
            var data = e.data,
                state = data.state;

            SendDrawRenderCommandBufferData.state = state;
        };

        return state;
    }

    render = (state: Map<any, any>) => {
        return compose(
            sendDrawData(WorkerInstanceData, TextureData, MaterialData, GeometryData, ThreeDTransformData, GameObjectData, AmbientLightData, DirectionLightData),
            // sortRenderCommands(state),
            createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData),
            getRenderList(state)
        )(MeshRendererData)
    }
}
else {
    init = (state: Map<any, any>) => {
        var gl = getGL(DeviceManagerData, state);

        initState(state, getGL, setSide, DeviceManagerData);

        initMaterial(state, gl, TextureData, MaterialData, BasicMaterialData, LightMaterialData);

        if(!GPUDetector.getInstance().extensionColorBufferFloat){
            //todo use front render
        }
        else{
            initDefer(gl, GBufferData, DeferLightPassData, ShaderData, ProgramData, LocationData, GLSLSenderData);
        }
    }

    render = (state: Map<any, any>) => {
        return compose(
            // draw(null, DataBufferConfig, buildDrawDataMap(DeviceManagerData, TextureData, TextureCacheData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, DirectionLightData, PointLightData, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, IndexBufferData, DrawRenderCommandBufferData)),
            //todo refactor defer draw, draw(clear, draw...  consider webgl2)
            //todo filter gameObjects by material: only light material use defer draw, basic material use basic draw(front draw?)
            deferDraw(null, DataBufferConfig, buildDrawDataMap(DeviceManagerData, TextureData, TextureCacheData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, DirectionLightData, PointLightData, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, IndexBufferData, DrawRenderCommandBufferData), buildDeferDrawDataMap(GBufferData, DeferLightPassData), buildInitShaderDataMap(DeviceManagerData, ProgramData, LocationData, GLSLSenderData, ShaderData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, DirectionLightData, PointLightData)),
            //todo fix front render(set state before clear)
            // clear(null, render_config, DeviceManagerData),
            // sortRenderCommands(state),
            createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData),
            getRenderList(state)
        )(MeshRendererData)
    }
}
