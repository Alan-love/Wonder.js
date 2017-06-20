import { GeometryData } from "../component/geometry/GeometryData";
import { PerspectiveCameraData } from "../component/camera/PerspectiveCameraData";
import { CameraData } from "../component/camera/CameraData";
import { CameraControllerData } from "../component/camera/CameraControllerData";
import { ThreeDTransformData } from "../component/transform/ThreeDTransformData";
import { GameObjectData } from "./entityObject/gameObject/GameObjectData";
import { GlobalTempData } from "../definition/GlobalTempData";
import { initData as initSceneData } from "./entityObject/scene/SceneSystem";
import { initData as initThreeDTransformData } from "../component/transform/ThreeDTransformSystem";
import { initData as initGeometryData } from "../component/geometry/GeometrySystem";
import { initData as initShaderData } from "../renderer/shader/ShaderSystem";
import { ShaderData } from "../renderer/shader/ShaderData";
import { DataBufferConfig } from "../config/DataBufferConfig";
import { initData as initMaterialData } from "../component/material/MaterialSystem";
import { MaterialData } from "../component/material/MaterialData";
import { initData as initMeshRendererData } from "../component/renderer/MeshRendererSystem";
import { MeshRendererData } from "../component/renderer/MeshRendererData";
import { initData as initTagData } from "../component/tag/TagSystem";
import { TagData } from "../component/tag/TagData";
import { SceneData } from "./entityObject/scene/SceneData";
import { initData as initCameraControllerData } from "../component/camera/CameraControllerSystem";
import { initData as initGameObjectData } from "./entityObject/gameObject/GameObjectSystem";
import { initData as initRenderCommandBufferData } from "../renderer/command_buffer/RenderCommandBufferSystem";
import { RenderCommandBufferData } from "../renderer/command_buffer/RenderCommandBufferData";
import { initData as initProgramData } from "../renderer/shader/program/ProgramSystem";
import { initData as initLocationData } from "../renderer/shader/location/LocationSystem";
import { initData as initGLSLSenderData } from "../renderer/shader/glslSender/GLSLSenderSystem";
import { initData as initArrayBufferData } from "../renderer/buffer/ArrayBufferSystem";
import { initData as initIndexBufferData } from "../renderer/buffer/IndexBufferSystem";
import { initData as initDrawRenderCommandBufferData } from "../renderer/draw/DrawRenderCommandBufferSystem";
import { DebugConfig } from "../config/DebugConfig";
import { EScreenSize } from "../renderer/device/EScreenSize";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { CompileConfig } from "../config/CompileConfig";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { chain, compose } from "../utils/functionalUtils";
import { Main } from "wonder-frp/dist/es2015/core/Main";
import { it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { fromJS } from "immutable";
import { createCanvas, initDevice } from "../renderer/device/initDeviceSystem";
import { isSupportRenderWorkerAndSharedArrayBuffer, setWorkerConfig } from "../device/WorkerDetectSystem";
import { DrawRenderCommandBufferData } from "../renderer/draw/DrawRenderCommandBufferData";
import { IndexBufferData } from "../renderer/buffer/IndexBufferData";
import { ArrayBufferData } from "../renderer/buffer/ArrayBufferData";
import { GLSLSenderData } from "../renderer/shader/glslSender/GLSLSenderData";
import { LocationData } from "../renderer/shader/location/LocationData";
import { ProgramData } from "../renderer/shader/program/ProgramData";
export var getIsTest = function (MainData) {
    return MainData.isTest;
};
export var setIsTest = function (isTest, MainData) {
    return IO.of(function () {
        MainData.isTest = isTest;
    });
};
export var setLibIsTest = function (isTest) {
    return IO.of(function () {
        Main.isTest = isTest;
    });
};
export var setConfig = function (closeContractTest, MainData, WorkerDetectData, _a) {
    var _b = _a.canvasId, canvasId = _b === void 0 ? "" : _b, _c = _a.isTest, isTest = _c === void 0 ? DebugConfig.isTest : _c, _d = _a.screenSize, screenSize = _d === void 0 ? EScreenSize.FULL : _d, _e = _a.useDevicePixelRatio, useDevicePixelRatio = _e === void 0 ? false : _e, _f = _a.contextConfig, contextConfig = _f === void 0 ? {
        options: {
            alpha: true,
            depth: true,
            stencil: false,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false
        }
    } : _f, _g = _a.workerConfig, workerConfig = _g === void 0 ? {
        renderWorkerFileDir: "/Wonder.js/dist/worker/"
    } : _g;
    return IO.of(function () {
        var _isTest = false;
        if (CompileConfig.closeContractTest) {
            _isTest = false;
            setLibIsTest(false).run();
        }
        else {
            _isTest = isTest;
            setLibIsTest(isTest).run();
        }
        setIsTest(_isTest, MainData).run();
        setWorkerConfig(workerConfig, WorkerDetectData).run();
        return fromJS({
            Main: {
                screenSize: screenSize
            },
            config: {
                canvasId: canvasId,
                contextConfig: {
                    options: ExtendUtils.extend({
                        alpha: true,
                        depth: true,
                        stencil: false,
                        antialias: true,
                        premultipliedAlpha: true,
                        preserveDrawingBuffer: false
                    }, contextConfig.options)
                },
                useDevicePixelRatio: useDevicePixelRatio
            }
        });
    });
};
export var init = requireCheckFunc(function (gameState, configState, DomQuery) {
    it("should set config before", function () {
        expect(configState.get("useDevicePixelRatio")).exist;
    });
}, function (gameState, configState, DomQuery) {
    return compose(chain(initDevice(configState.get("contextConfig"), gameState, configState)), createCanvas(DomQuery))(configState.get("canvasId"));
});
export var initData = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initData = function () {
        _initData();
    };
}
else {
    initData = function () {
        _initData();
        initProgramData(ProgramData);
        initLocationData(LocationData);
        initGLSLSenderData(GLSLSenderData);
        initArrayBufferData(ArrayBufferData);
        initIndexBufferData(IndexBufferData);
        initDrawRenderCommandBufferData(DrawRenderCommandBufferData);
    };
}
var _initData = function () {
    initShaderData(ShaderData);
    initGeometryData(DataBufferConfig, GeometryData);
    initMaterialData(MaterialData);
    initMeshRendererData(MeshRendererData);
    initTagData(TagData);
    initThreeDTransformData(GlobalTempData, ThreeDTransformData);
    initSceneData(SceneData);
    initCameraControllerData(CameraControllerData, PerspectiveCameraData, CameraData);
    initGameObjectData(GameObjectData);
    initRenderCommandBufferData(DataBufferConfig, RenderCommandBufferData);
};
//# sourceMappingURL=MainSystem.js.map