

import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as CopyTransformService$Wonderjs from "../../../record/main/transform/CopyTransformService.js";
import * as OperateSettingService$Wonderjs from "../../../record/main/setting/OperateSettingService.js";
import * as WorkerDetectMainService$Wonderjs from "../workerDetect/WorkerDetectMainService.js";
import * as OperateRenderMainService$Wonderjs from "./OperateRenderMainService.js";
import * as PositionLightMainService$Wonderjs from "../light/PositionLightMainService.js";
import * as RecordTransformMainService$Wonderjs from "../transform/RecordTransformMainService.js";
import * as AmbientLightSceneMainService$Wonderjs from "../scene/AmbientLightSceneMainService.js";
import * as RecordBoxGeometryMainService$Wonderjs from "../geometry/box/RecordBoxGeometryMainService.js";
import * as IndexSourceTextureMainService$Wonderjs from "../texture/IndexSourceTextureMainService.js";
import * as PositionPointLightMainService$Wonderjs from "../light/point/PositionPointLightMainService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../material/basic/RecordBasicMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../material/light/RecordLightMaterialMainService.js";
import * as OperateSourceTextureMainService$Wonderjs from "../texture/OperateSourceTextureMainService.js";
import * as RecordCustomGeometryMainService$Wonderjs from "../geometry/custom/RecordCustomGeometryMainService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "../instance/RecordSourceInstanceMainService.js";
import * as PositionDirectionLightMainService$Wonderjs from "../light/direction/PositionDirectionLightMainService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "../texture/basic_source/RecordBasicSourceTextureMainService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "../texture/arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";

function createRenderState(state) {
  var settingRecord = state[/* settingRecord */0];
  var directionLightRecord = state[/* directionLightRecord */20];
  var pointLightRecord = state[/* pointLightRecord */21];
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var localToWorldMatrices = transformRecord[/* localToWorldMatrices */2];
  var localToWorldMatrixCacheMap = transformRecord[/* localToWorldMatrixCacheMap */19];
  var normalMatrixCacheMap = transformRecord[/* normalMatrixCacheMap */20];
  var boxGeometryRecord = RecordBoxGeometryMainService$Wonderjs.getRecord(state);
  var customGeometryRecord = RecordCustomGeometryMainService$Wonderjs.getRecord(state);
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var basicSourceTextureRecord = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  var arrayBufferViewSourceTextureRecord = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  var sourceInstanceRecord = RecordSourceInstanceMainService$Wonderjs.getRecord(state);
  var isUseWorker = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  var renderStateTransformRecord = isUseWorker ? /* record */[
      /* localToWorldMatrices */CopyTransformService$Wonderjs.unsafeGetCopiedLocalToWorldMatrices(transformRecord),
      /* localToWorldMatrixCacheMap */localToWorldMatrixCacheMap,
      /* normalMatrixCacheMap */normalMatrixCacheMap
    ] : /* record */[
      /* localToWorldMatrices */localToWorldMatrices,
      /* localToWorldMatrixCacheMap */localToWorldMatrixCacheMap,
      /* normalMatrixCacheMap */normalMatrixCacheMap
    ];
  return /* record */[
          /* sceneRecord : record */[/* ambientLight : record */[/* color */AmbientLightSceneMainService$Wonderjs.getAmbientLightColor(state)]],
          /* vboBufferRecord */state[/* vboBufferRecord */34],
          /* typeArrayPoolRecord */state[/* typeArrayPoolRecord */36],
          /* glslSenderRecord */state[/* glslSenderRecord */30],
          /* programRecord */state[/* programRecord */28],
          /* boxGeometryRecord : record */[
            /* vertices */boxGeometryRecord[/* vertices */1],
            /* texCoords */boxGeometryRecord[/* texCoords */2],
            /* normals */boxGeometryRecord[/* normals */3],
            /* indices */boxGeometryRecord[/* indices */4]
          ],
          /* customGeometryRecord : record */[
            /* vertices */customGeometryRecord[/* vertices */2],
            /* texCoords */customGeometryRecord[/* texCoords */3],
            /* normals */customGeometryRecord[/* normals */4],
            /* indices */customGeometryRecord[/* indices */5],
            /* verticesInfos */customGeometryRecord[/* verticesInfos */6],
            /* texCoordsInfos */customGeometryRecord[/* texCoordsInfos */7],
            /* normalsInfos */customGeometryRecord[/* normalsInfos */8],
            /* indicesInfos */customGeometryRecord[/* indicesInfos */9]
          ],
          /* cameraRecord */OperateRenderMainService$Wonderjs.getCameraRecord(state),
          /* basicMaterialRecord : record */[
            /* shaderIndices */basicMaterialRecord[/* shaderIndices */2],
            /* colors */basicMaterialRecord[/* colors */3],
            /* textureIndices */basicMaterialRecord[/* textureIndices */4],
            /* mapUnits */basicMaterialRecord[/* mapUnits */5]
          ],
          /* lightMaterialRecord : record */[
            /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
            /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
            /* specularColors */lightMaterialRecord[/* specularColors */4],
            /* shininess */lightMaterialRecord[/* shininess */5],
            /* textureIndices */lightMaterialRecord[/* textureIndices */6],
            /* diffuseMapUnits */lightMaterialRecord[/* diffuseMapUnits */7],
            /* specularMapUnits */lightMaterialRecord[/* specularMapUnits */8]
          ],
          /* basicSourceTextureRecord : record */[
            /* wrapSs */basicSourceTextureRecord[/* wrapSs */1],
            /* wrapTs */basicSourceTextureRecord[/* wrapTs */2],
            /* magFilters */basicSourceTextureRecord[/* magFilters */3],
            /* minFilters */basicSourceTextureRecord[/* minFilters */4],
            /* formats */basicSourceTextureRecord[/* formats */5],
            /* types */basicSourceTextureRecord[/* types */6],
            /* isNeedUpdates */basicSourceTextureRecord[/* isNeedUpdates */7],
            /* flipYs */basicSourceTextureRecord[/* flipYs */8],
            /* sourceMap */basicSourceTextureRecord[/* sourceMap */9],
            /* glTextureMap */basicSourceTextureRecord[/* glTextureMap */10],
            /* bindTextureUnitCacheMap */basicSourceTextureRecord[/* bindTextureUnitCacheMap */11],
            /* setFlipYFunc */OperateSourceTextureMainService$Wonderjs.setFlipY
          ],
          /* arrayBufferViewSourceTextureRecord : record */[
            /* wrapSs */arrayBufferViewSourceTextureRecord[/* wrapSs */1],
            /* wrapTs */arrayBufferViewSourceTextureRecord[/* wrapTs */2],
            /* magFilters */arrayBufferViewSourceTextureRecord[/* magFilters */3],
            /* minFilters */arrayBufferViewSourceTextureRecord[/* minFilters */4],
            /* formats */arrayBufferViewSourceTextureRecord[/* formats */5],
            /* types */arrayBufferViewSourceTextureRecord[/* types */6],
            /* isNeedUpdates */arrayBufferViewSourceTextureRecord[/* isNeedUpdates */7],
            /* flipYs */arrayBufferViewSourceTextureRecord[/* flipYs */8],
            /* widths */arrayBufferViewSourceTextureRecord[/* widths */9],
            /* heights */arrayBufferViewSourceTextureRecord[/* heights */10],
            /* sourceMap */arrayBufferViewSourceTextureRecord[/* sourceMap */11],
            /* glTextureMap */arrayBufferViewSourceTextureRecord[/* glTextureMap */12],
            /* bindTextureUnitCacheMap */arrayBufferViewSourceTextureRecord[/* bindTextureUnitCacheMap */13],
            /* setFlipYFunc */OperateSourceTextureMainService$Wonderjs.setFlipY,
            /* textureIndexOffset */IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)
          ],
          /* directionLightRecord : record */[
            /* index */directionLightRecord[/* index */0],
            /* colors */directionLightRecord[/* colors */2],
            /* intensities */directionLightRecord[/* intensities */3],
            /* positionMap */PositionLightMainService$Wonderjs.buildPositionMap(directionLightRecord[/* index */0], PositionDirectionLightMainService$Wonderjs.getPosition, state)
          ],
          /* pointLightRecord : record */[
            /* index */pointLightRecord[/* index */0],
            /* colors */pointLightRecord[/* colors */2],
            /* intensities */pointLightRecord[/* intensities */3],
            /* constants */pointLightRecord[/* constants */4],
            /* linears */pointLightRecord[/* linears */5],
            /* quadratics */pointLightRecord[/* quadratics */6],
            /* ranges */pointLightRecord[/* ranges */7],
            /* positionMap */PositionLightMainService$Wonderjs.buildPositionMap(pointLightRecord[/* index */0], PositionPointLightMainService$Wonderjs.getPosition, state)
          ],
          /* transformRecord */renderStateTransformRecord,
          /* sourceInstanceRecord : record */[
            /* objectInstanceTransformIndexMap */sourceInstanceRecord[/* objectInstanceTransformIndexMap */1],
            /* objectInstanceTransformCollections */sourceInstanceRecord[/* objectInstanceTransformCollections */4],
            /* isTransformStatics */sourceInstanceRecord[/* isTransformStatics */3],
            /* matrixInstanceBufferCapacityMap */sourceInstanceRecord[/* matrixInstanceBufferCapacityMap */5],
            /* matrixFloat32ArrayMap */sourceInstanceRecord[/* matrixFloat32ArrayMap */6],
            /* isSendTransformMatrixDataMap */sourceInstanceRecord[/* isSendTransformMatrixDataMap */7]
          ],
          /* gpuDetectRecord */state[/* gpuDetectRecord */5],
          /* globalTempRecord */state[/* globalTempRecord */35],
          /* deviceManagerRecord */state[/* deviceManagerRecord */9],
          /* shaderRecord : record */[/* index */state[/* shaderRecord */26][/* index */0]],
          /* settingRecord : record */[
            /* gpu */OperateSettingService$Wonderjs.unsafeGetGPU(settingRecord),
            /* instanceBuffer *//* record */[/* objectInstanceCountPerSourceInstance */BufferSettingService$Wonderjs.getObjectInstanceCountPerSourceInstance(settingRecord)],
            /* textureCountPerMaterial */BufferSettingService$Wonderjs.getTextureCountPerMaterial(settingRecord)
          ],
          /* workerDetectRecord : record */[/* isUseWorker */isUseWorker],
          /* browserDetectRecord : record */[/* browser */state[/* browserDetectRecord */40][/* browser */0]]
        ];
}

export {
  createRenderState ,
  
}
/* BufferSettingService-Wonderjs Not a pure module */
