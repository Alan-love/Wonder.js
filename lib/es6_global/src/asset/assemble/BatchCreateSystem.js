

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as BufferService$Wonderjs from "../../service/primitive/buffer/BufferService.js";
import * as AssembleCommon$Wonderjs from "./AssembleCommon.js";
import * as PMatrixService$Wonderjs from "../../service/primitive/PMatrixService.js";
import * as MappedIndexService$Wonderjs from "../../service/primitive/MappedIndexService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../service/record/main/setting/BufferSettingService.js";
import * as DirtyTransformService$Wonderjs from "../../service/record/main/transform/DirtyTransformService.js";
import * as BufferPointLightService$Wonderjs from "../../service/record/main/light/point/BufferPointLightService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as RecordTransformMainService$Wonderjs from "../../service/state/main/transform/RecordTransformMainService.js";
import * as BufferDirectionLightService$Wonderjs from "../../service/record/main/light/direction/BufferDirectionLightService.js";
import * as IndexSourceTextureMainService$Wonderjs from "../../service/state/main/texture/IndexSourceTextureMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/RecordLightMaterialMainService.js";
import * as TextureCountMapMaterialService$Wonderjs from "../../service/record/main/material/TextureCountMapMaterialService.js";
import * as RecordCustomGeometryMainService$Wonderjs from "../../service/state/main/geometry/custom/RecordCustomGeometryMainService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/RecordBasicSourceTextureMainService.js";
import * as CreateArcballCameraControllerService$Wonderjs from "../../service/record/main/camera_controller/arcball/CreateArcballCameraControllerService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";

function _checkNotExceedMaxCountByIndex(maxCount, indexArr) {
  BufferService$Wonderjs.checkNotExceedMaxCountByIndex(maxCount, indexArr[indexArr.length - 1 | 0]);
  return indexArr;
}

function _batchCreateGameObject(param, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var count = param[/* gameObjects */3][/* count */0];
  var uid = gameObjectRecord[/* uid */0];
  var aliveUidArray = gameObjectRecord[/* aliveUidArray */20];
  var uidArr = ArrayService$Wonderjs.range(uid, (uid + count | 0) - 1 | 0);
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* uid */0] = uid + count | 0;
  newrecord$1[/* aliveUidArray */20] = aliveUidArray.concat(uidArr);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return /* tuple */[
          newrecord,
          uidArr
        ];
}

function _setDefaultChildren(indexArr, childMap) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (childMap, index) {
                return SparseMapService$WonderCommonlib.set(index, ArrayService$WonderCommonlib.createEmpty(/* () */0), childMap);
              }), childMap, indexArr);
}

function _initTransformDataWhenCreate(indexArr, transformRecord) {
  var childMap = transformRecord[/* childMap */16];
  var newrecord = Caml_array.caml_array_dup(transformRecord);
  newrecord[/* childMap */16] = _setDefaultChildren(indexArr, childMap);
  return newrecord;
}

function _batchCreateTransform(param, state) {
  AssembleCommon$Wonderjs.checkNotDisposedBefore(RecordTransformMainService$Wonderjs.getRecord(state)[/* disposedIndexArray */21]);
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var index = transformRecord[/* index */0];
  var newIndex = index + param[/* transforms */15].length | 0;
  var indexArr = _checkNotExceedMaxCountByIndex(BufferSettingService$Wonderjs.getTransformCount(state[/* settingRecord */0]), ArrayService$Wonderjs.range(index, newIndex - 1 | 0));
  transformRecord[/* index */0] = newIndex;
  var transformRecord$1 = _initTransformDataWhenCreate(indexArr, transformRecord);
  state[/* transformRecord */11] = ArrayService$WonderCommonlib.reduceOneParam((function (transformRecord, index) {
          return DirtyTransformService$Wonderjs.mark(index, true, transformRecord);
        }), transformRecord$1, indexArr);
  return /* tuple */[
          state,
          indexArr
        ];
}

function _batchCreateCustomGeometry(param, state) {
  AssembleCommon$Wonderjs.checkNotDisposedBefore(RecordCustomGeometryMainService$Wonderjs.getRecord(state)[/* disposedIndexArray */17]);
  var customGeometryRecord = RecordCustomGeometryMainService$Wonderjs.getRecord(state);
  var index = customGeometryRecord[/* index */0];
  var newIndex = index + param[/* customGeometrys */16].length | 0;
  var indexArr = _checkNotExceedMaxCountByIndex(BufferSettingService$Wonderjs.getCustomGeometryCount(state[/* settingRecord */0]), ArrayService$Wonderjs.range(index, newIndex - 1 | 0));
  state[/* customGeometryRecord */23] = /* record */[
    /* index */newIndex,
    /* buffer */customGeometryRecord[/* buffer */1],
    /* vertices */customGeometryRecord[/* vertices */2],
    /* texCoords */customGeometryRecord[/* texCoords */3],
    /* normals */customGeometryRecord[/* normals */4],
    /* indices */customGeometryRecord[/* indices */5],
    /* verticesInfos */customGeometryRecord[/* verticesInfos */6],
    /* texCoordsInfos */customGeometryRecord[/* texCoordsInfos */7],
    /* normalsInfos */customGeometryRecord[/* normalsInfos */8],
    /* indicesInfos */customGeometryRecord[/* indicesInfos */9],
    /* verticesOffset */customGeometryRecord[/* verticesOffset */10],
    /* texCoordsOffset */customGeometryRecord[/* texCoordsOffset */11],
    /* normalsOffset */customGeometryRecord[/* normalsOffset */12],
    /* indicesOffset */customGeometryRecord[/* indicesOffset */13],
    /* disposeCount */customGeometryRecord[/* disposeCount */14],
    /* gameObjectMap */customGeometryRecord[/* gameObjectMap */15],
    /* groupCountMap */customGeometryRecord[/* groupCountMap */16],
    /* disposedIndexArray */customGeometryRecord[/* disposedIndexArray */17],
    /* disposedIndexMap */customGeometryRecord[/* disposedIndexMap */18],
    /* aliveIndexArray */customGeometryRecord[/* aliveIndexArray */19].concat(indexArr)
  ];
  return /* tuple */[
          state,
          indexArr
        ];
}

function _batchCreateBasicCameraView(param, state) {
  var basicCameraViewRecord = state[/* basicCameraViewRecord */13];
  AssembleCommon$Wonderjs.checkNotDisposedBefore(basicCameraViewRecord[/* disposedIndexArray */2]);
  var index = basicCameraViewRecord[/* index */0];
  var newIndex = index + param[/* basicCameraViews */12][/* count */0] | 0;
  var indexArr = ArrayService$Wonderjs.range(index, newIndex - 1 | 0);
  state[/* basicCameraViewRecord */13] = /* record */[
    /* index */newIndex,
    /* gameObjectMap */basicCameraViewRecord[/* gameObjectMap */1],
    /* disposedIndexArray */basicCameraViewRecord[/* disposedIndexArray */2]
  ];
  return /* tuple */[
          state,
          indexArr
        ];
}

function _batchCreatePerspectiveCameraProjection(param, state) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  AssembleCommon$Wonderjs.checkNotDisposedBefore(perspectiveCameraProjectionRecord[/* disposedIndexArray */8]);
  var index = perspectiveCameraProjectionRecord[/* index */0];
  var newIndex = index + param[/* perspectiveCameraProjections */13].length | 0;
  var indexArr = ArrayService$Wonderjs.range(index, newIndex - 1 | 0);
  state[/* perspectiveCameraProjectionRecord */14] = /* record */[
    /* index */newIndex,
    /* dirtyArray */indexArr,
    /* pMatrixMap */ArrayService$WonderCommonlib.reduceOneParam((function (pMatrixMap, index) {
            return PMatrixService$Wonderjs.setDefaultPMatrix(index, pMatrixMap);
          }), perspectiveCameraProjectionRecord[/* pMatrixMap */2], indexArr),
    /* nearMap */perspectiveCameraProjectionRecord[/* nearMap */3],
    /* farMap */perspectiveCameraProjectionRecord[/* farMap */4],
    /* fovyMap */perspectiveCameraProjectionRecord[/* fovyMap */5],
    /* aspectMap */perspectiveCameraProjectionRecord[/* aspectMap */6],
    /* gameObjectMap */perspectiveCameraProjectionRecord[/* gameObjectMap */7],
    /* disposedIndexArray */perspectiveCameraProjectionRecord[/* disposedIndexArray */8]
  ];
  return /* tuple */[
          state,
          indexArr
        ];
}

function _createArcballCameraControllerOneByOne(param, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  AssembleCommon$Wonderjs.checkNotDisposedBefore(arcballCameraControllerRecord[/* disposedIndexArray */16]);
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, _) {
          var match = CreateArcballCameraControllerService$Wonderjs.create(param[0]);
          return /* tuple */[
                  match[0],
                  ArrayService$Wonderjs.push(match[1], param[1])
                ];
        }), /* tuple */[
        arcballCameraControllerRecord,
        /* array */[]
      ], param[/* arcballCameraControllers */14]);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* arcballCameraControllerRecord */25] = match[0], newrecord),
          match[1]
        ];
}

function _batchCreateLightMaterial(param, state) {
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var index = lightMaterialRecord[/* index */0];
  AssembleCommon$Wonderjs.checkNotDisposedBefore(lightMaterialRecord[/* disposedIndexArray */15]);
  var newIndex = index + param[/* lightMaterials */17].length | 0;
  var indexArr = _checkNotExceedMaxCountByIndex(BufferSettingService$Wonderjs.getLightMaterialCount(state[/* settingRecord */0]), ArrayService$Wonderjs.range(index, newIndex - 1 | 0));
  state[/* lightMaterialRecord */16] = /* record */[
    /* index */newIndex,
    /* buffer */lightMaterialRecord[/* buffer */1],
    /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
    /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
    /* specularColors */lightMaterialRecord[/* specularColors */4],
    /* shininess */lightMaterialRecord[/* shininess */5],
    /* textureIndices */lightMaterialRecord[/* textureIndices */6],
    /* diffuseMapUnits */lightMaterialRecord[/* diffuseMapUnits */7],
    /* specularMapUnits */lightMaterialRecord[/* specularMapUnits */8],
    /* textureCountMap */ArrayService$WonderCommonlib.reduceOneParam((function (textureCountMap, index) {
            return SparseMapService$WonderCommonlib.set(index, TextureCountMapMaterialService$Wonderjs.getDefaultCount(/* () */0), textureCountMap);
          }), lightMaterialRecord[/* textureCountMap */9], indexArr),
    /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */11],
    /* defaultShininess */lightMaterialRecord[/* defaultShininess */12],
    /* gameObjectMap */lightMaterialRecord[/* gameObjectMap */13],
    /* groupCountMap */lightMaterialRecord[/* groupCountMap */14],
    /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */15],
    /* nameMap */lightMaterialRecord[/* nameMap */16],
    /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */17]
  ];
  return /* tuple */[
          state,
          indexArr
        ];
}

function _batchCreateBasicSourceTextureArr(param, state) {
  var basicSourceTextureRecord = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  var index = basicSourceTextureRecord[/* index */0];
  AssembleCommon$Wonderjs.checkNotDisposedBefore(basicSourceTextureRecord[/* disposedIndexArray */12]);
  var newIndex = index + param[/* basicSourceTextures */5].length | 0;
  var indexArr = _checkNotExceedMaxCountByIndex(BufferSettingService$Wonderjs.getBasicSourceTextureCount(state[/* settingRecord */0]), ArrayService$Wonderjs.range(index, newIndex - 1 | 0).map(IndexSourceTextureMainService$Wonderjs.generateBasicSourceTextureIndex));
  state[/* basicSourceTextureRecord */18] = /* record */[
    /* index */newIndex,
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
    /* disposedIndexArray */basicSourceTextureRecord[/* disposedIndexArray */12],
    /* needAddedSourceArray */basicSourceTextureRecord[/* needAddedSourceArray */13],
    /* needInitedTextureIndexArray */basicSourceTextureRecord[/* needInitedTextureIndexArray */14],
    /* nameMap */basicSourceTextureRecord[/* nameMap */15]
  ];
  var state$1 = ArrayService$WonderCommonlib.reduceOneParam((function (state, index) {
          return OperateBasicSourceTextureMainService$Wonderjs.setFlipY(index, false, state);
        }), state, indexArr);
  return /* tuple */[
          state$1,
          indexArr
        ];
}

function _batchCreateDirectionLightArr(param, state) {
  var directionLightRecord = state[/* directionLightRecord */20];
  var index = directionLightRecord[/* index */0];
  var newIndex = index + param[/* directionLights */10].length | 0;
  var indexArr = _checkNotExceedMaxCountByIndex(BufferDirectionLightService$Wonderjs.getBufferMaxCount(/* () */0), ArrayService$Wonderjs.range(index, newIndex - 1 | 0));
  state[/* directionLightRecord */20] = /* record */[
    /* index */newIndex,
    /* buffer */directionLightRecord[/* buffer */1],
    /* colors */directionLightRecord[/* colors */2],
    /* intensities */directionLightRecord[/* intensities */3],
    /* mappedIndexMap */ArrayService$WonderCommonlib.reduceOneParam((function (mappedIndexMap, index) {
            return MappedIndexService$Wonderjs.setMappedIndex(index, index, mappedIndexMap);
          }), directionLightRecord[/* mappedIndexMap */4], indexArr),
    /* gameObjectMap */directionLightRecord[/* gameObjectMap */5]
  ];
  return /* tuple */[
          state,
          indexArr
        ];
}

function _batchCreatePointLightArr(param, state) {
  var pointLightRecord = state[/* pointLightRecord */21];
  var index = pointLightRecord[/* index */0];
  var newIndex = index + param[/* pointLights */11].length | 0;
  var indexArr = _checkNotExceedMaxCountByIndex(BufferPointLightService$Wonderjs.getBufferMaxCount(/* () */0), ArrayService$Wonderjs.range(index, newIndex - 1 | 0));
  state[/* pointLightRecord */21] = /* record */[
    /* index */newIndex,
    /* buffer */pointLightRecord[/* buffer */1],
    /* colors */pointLightRecord[/* colors */2],
    /* intensities */pointLightRecord[/* intensities */3],
    /* constants */pointLightRecord[/* constants */4],
    /* linears */pointLightRecord[/* linears */5],
    /* quadratics */pointLightRecord[/* quadratics */6],
    /* ranges */pointLightRecord[/* ranges */7],
    /* mappedIndexMap */ArrayService$WonderCommonlib.reduceOneParam((function (mappedIndexMap, index) {
            return MappedIndexService$Wonderjs.setMappedIndex(index, index, mappedIndexMap);
          }), pointLightRecord[/* mappedIndexMap */8], indexArr),
    /* gameObjectMap */pointLightRecord[/* gameObjectMap */9]
  ];
  return /* tuple */[
          state,
          indexArr
        ];
}

function batchCreate(wd, state) {
  var match = _batchCreateGameObject(wd, state);
  var match$1 = _batchCreateTransform(wd, match[0]);
  var match$2 = _batchCreateCustomGeometry(wd, match$1[0]);
  var match$3 = _batchCreateBasicCameraView(wd, match$2[0]);
  var match$4 = _batchCreatePerspectiveCameraProjection(wd, match$3[0]);
  var match$5 = _createArcballCameraControllerOneByOne(wd, match$4[0]);
  var match$6 = _batchCreateLightMaterial(wd, match$5[0]);
  var match$7 = _batchCreateBasicSourceTextureArr(wd, match$6[0]);
  var match$8 = _batchCreateDirectionLightArr(wd, match$7[0]);
  var match$9 = _batchCreatePointLightArr(wd, match$8[0]);
  return /* tuple */[
          match$9[0],
          match[1],
          /* tuple */[
            match$1[1],
            match$2[1],
            match$3[1],
            match$4[1],
            match$5[1],
            match$6[1],
            match$8[1],
            match$9[1]
          ],
          match$7[1]
        ];
}

export {
  _checkNotExceedMaxCountByIndex ,
  _batchCreateGameObject ,
  _setDefaultChildren ,
  _initTransformDataWhenCreate ,
  _batchCreateTransform ,
  _batchCreateCustomGeometry ,
  _batchCreateBasicCameraView ,
  _batchCreatePerspectiveCameraProjection ,
  _createArcballCameraControllerOneByOne ,
  _batchCreateLightMaterial ,
  _batchCreateBasicSourceTextureArr ,
  _batchCreateDirectionLightArr ,
  _batchCreatePointLightArr ,
  batchCreate ,
  
}
/* ArrayService-Wonderjs Not a pure module */
