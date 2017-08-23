import { DomQuery as DomQueryFromCommonlib } from "wonder-commonlib/dist/commonjs/utils/DomQuery";
import { fromArray as fromArrayFromFrp, Operator } from "wonder-frp/dist/commonjs/global/Operator";
import {
    getNormalMatrix as getNormalMatrixSystem,
    initData as initThreeDTransformDataSystem
} from "../component/transform/ThreeDTransformSystem";
import { initData as initTagDataSystem } from "../component/tag/TagSystem";
import {
    hasIndices,
    initData as initGeometryDataSystem, setIndices, setVertices
} from "../component/geometry/GeometrySystem";
import { getShaderIndex as getShaderIndexSystem, initData as initMaterialDataSystem } from "../component/material/MaterialSystem";
import {
    use
} from "../renderer/shader/ShaderSystem";

import { initData as initMeshRendererDataSystem } from "../component/renderer/MeshRendererSystem";
import { createState as createStateUtils } from "../utils/stateUtils";
import { Map } from "immutable";
import { initData as initArrayBufferDataSystem } from "../renderer/buffer/ArrayBufferSystem";
import { initData as initIndexBufferDataSystem } from "../renderer/buffer/IndexBufferSystem";
import {
    getWorldToCameraMatrix as getWorldToCameraMatrixSystem,
    initData as initCameraControllerDataSystem
} from "../component/camera/CameraControllerSystem";
import { initData as initGameObjectDataSystem } from "../core/entityObject/gameObject/GameObjectSystem";
import { disableVertexAttribArray as disableVertexAttribArrayUtils } from "../renderer/utils/worker/render_file/shader/program/programUtils";
import { initData as initDeviceManagerDataSystem } from "../renderer/device/DeviceManagerSystem";
import { initData as initProgramDataSystem } from "../renderer/shader/program/ProgramSystem";
import { initData as initSceneDataSystem } from "../core/entityObject/scene/SceneSystem";
import { initData as initRenderCommandBufferDataSystem } from "../renderer/command_buffer/RenderCommandBufferSystem";
import { updateSystem as updateAllSystems } from "../core/DirectorSystem";
import { initData as initSendDrawRenderCommandBufferDataSystem } from "../renderer/worker/logic_file/draw/SendDrawRenderCommandBufferDataSystem";
import { initData as initWebGL1LightDataSystem } from "../component/webgl1/light/LightSystem";
import { initData as initWebGL2LightDataSystem } from "../component/webgl2/light/LightSystem";
import { initData as initDrawRenderCommandBufferDataSystem } from "../renderer/draw/DrawRenderCommandBufferSystem";
import { sendAttributeData as sendWebGL1AttributeDataSystem } from "../renderer/webgl1/render/RenderSystem";
import { initData as initWebGL1GLSLSenderDataSystem } from "../renderer/webgl1/shader/glslSender/GLSLSenderSystem";
import { initData as initWebGL2GLSLSenderDataSystem } from "../renderer/webgl2/shader/glslSender/GLSLSenderSystem";
import { initData as initVaoDataSystem } from "../renderer/webgl2/vao/VaoSystem";
import { initData as initWebGL1LocationDataSystem } from "../renderer/webgl1/shader/location/LocationSystem";
import { initData as initWebGL2LocationDataSystem } from "../renderer/webgl2/shader/location/LocationSystem";
import { initData as initWebGL1ShaderDataSystem } from "../renderer/webgl1/shader/ShaderSystem";
import { initData as initWebGL2ShaderDataSystem } from "../renderer/webgl2/shader/ShaderSystem";
import { initData as initDeferLightPassDataSystem } from "../renderer/webgl2/render/light/defer/light/DeferLightPassSystem";

export var initThreeDTransformData = initThreeDTransformDataSystem;

export var DomQuery = DomQueryFromCommonlib;

export var fromArray = fromArrayFromFrp;

export var initTagData = initTagDataSystem;

export var initGeometryData = initGeometryDataSystem;

export var initMaterialData = initMaterialDataSystem;

export var initWebGL1ShaderData = initWebGL1ShaderDataSystem;

export var initWebGL2ShaderData = initWebGL2ShaderDataSystem;

export var initProgramData = initProgramDataSystem;

export var initWebGL1LocationData = initWebGL1LocationDataSystem;

export var initWebGL2LocationData = initWebGL2LocationDataSystem;

export var initWebGL1GLSLSenderData = initWebGL1GLSLSenderDataSystem;

export var initWebGL2GLSLSenderData = initWebGL2GLSLSenderDataSystem;

export var initMeshRendererData = initMeshRendererDataSystem;

export var initArrayBufferData = initArrayBufferDataSystem;

export var initIndexBufferData = initIndexBufferDataSystem;

export var initDeviceManagerData = initDeviceManagerDataSystem;

export var initCameraControllerData = initCameraControllerDataSystem;

export var initWebGL1LightData = initWebGL1LightDataSystem;

export var initWebGL2LightData = initWebGL2LightDataSystem;

export var initGameObjectData = initGameObjectDataSystem;

export var initSceneData = initSceneDataSystem;

export var initRenderCommandBufferData = initRenderCommandBufferDataSystem;

export var initDrawRenderCommandBufferData = initDrawRenderCommandBufferDataSystem;

export var initSendDrawRenderCommandBufferData = initSendDrawRenderCommandBufferDataSystem;

export var initVaoData = initVaoDataSystem;

export var initDeferLightPassData = initDeferLightPassDataSystem;

export var createState = createStateUtils;

export var useProgram = use;

export var sendWebGL1AttributeData = sendWebGL1AttributeDataSystem;

// export var sendUniformData = sendUniformDataSystem;

export var disableVertexAttribArray = disableVertexAttribArrayUtils;

export var setGeometryIndices = setIndices;

export var setGeometryVertices = setVertices;

export var hasGeometryIndices = hasIndices;

export var getShaderIndex = getShaderIndexSystem;

export var updateSystem = updateAllSystems;

export var getNormalMatrix = getNormalMatrixSystem;

export var getWorldToCameraMatrix = getWorldToCameraMatrixSystem;
