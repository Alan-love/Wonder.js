

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as AssembleCommon$Wonderjs from "./AssembleCommon.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as NameGeometryMainService$Wonderjs from "../../service/state/main/geometry/NameGeometryMainService.js";
import * as NameGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/NameGameObjectMainService.js";
import * as RecordTransformMainService$Wonderjs from "../../service/state/main/transform/RecordTransformMainService.js";
import * as ActiveBasicCameraViewService$Wonderjs from "../../service/record/main/basic_camera_view/ActiveBasicCameraViewService.js";
import * as NameBasicMaterialMainService$Wonderjs from "../../service/state/main/material/basic/NameBasicMaterialMainService.js";
import * as NameLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/NameLightMaterialMainService.js";
import * as OperateMeshRendererMainService$Wonderjs from "../../service/state/main/meshRenderer/OperateMeshRendererMainService.js";
import * as OperateBasicMaterialMainService$Wonderjs from "../../service/state/main/material/basic/OperateBasicMaterialMainService.js";
import * as OperateLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/OperateLightMaterialMainService.js";
import * as OperateTypeArrayTransformService$Wonderjs from "../../service/record/main/transform/OperateTypeArrayTransformService.js";
import * as NameBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/NameBasicSourceTextureMainService.js";
import * as OperateArcballCameraControllerService$Wonderjs from "../../service/record/main/camera_controller/arcball/OperateArcballCameraControllerService.js";
import * as EventArcballCameraControllerMainService$Wonderjs from "../../service/state/main/camera_controller/arcball/EventArcballCameraControllerMainService.js";
import * as FrustumPerspectiveCameraProjectionService$Wonderjs from "../../service/record/main/perspective_camera_projection/FrustumPerspectiveCameraProjectionService.js";

function getBatchArrByIndices(sourceArr, indices) {
  return indices.map((function (index) {
                return sourceArr[index];
              }));
}

function getBatchComponentGameObjectData(param, indices, _, state) {
  var transformArr = param[1];
  var gameObjectArr = param[0];
  var parentTransforms = getBatchArrByIndices(transformArr, indices[/* gameObjectIndices */0][/* childrenTransformIndexData */0][/* parentTransformIndices */0]);
  var childrenTransforms = indices[/* gameObjectIndices */0][/* childrenTransformIndexData */0][/* childrenTransformIndices */1].map((function (childrenIndices) {
          return childrenIndices.map((function (index) {
                        return transformArr[index];
                      }));
        }));
  var transformGameObjects = getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* transformGameObjectIndexData */1][/* gameObjectIndices */0]);
  var gameObjectTransforms = getBatchArrByIndices(transformArr, indices[/* gameObjectIndices */0][/* transformGameObjectIndexData */1][/* componentIndices */1]);
  var geometryGameObjects = getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* geometryGameObjectIndexData */9][/* gameObjectIndices */0]);
  var gameObjectGeometrys = getBatchArrByIndices(param[2], indices[/* gameObjectIndices */0][/* geometryGameObjectIndexData */9][/* componentIndices */1]);
  var meshRendererGameObjects = getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* meshRendererGameObjectIndexData */10][/* gameObjectIndices */0]);
  var gameObjectMeshRenderers = getBatchArrByIndices(param[3], indices[/* gameObjectIndices */0][/* meshRendererGameObjectIndexData */10][/* componentIndices */1]);
  var basicMaterialGameObjects = getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* basicMaterialGameObjectIndexData */5][/* gameObjectIndices */0]);
  var gameObjectBasicMaterials = getBatchArrByIndices(param[7], indices[/* gameObjectIndices */0][/* basicMaterialGameObjectIndexData */5][/* componentIndices */1]);
  var lightMaterialGameObjects = getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* lightMaterialGameObjectIndexData */6][/* gameObjectIndices */0]);
  var gameObjectLightMaterials = getBatchArrByIndices(param[8], indices[/* gameObjectIndices */0][/* lightMaterialGameObjectIndexData */6][/* componentIndices */1]);
  return /* tuple */[
          /* tuple */[
            parentTransforms,
            childrenTransforms,
            transformGameObjects,
            gameObjectTransforms,
            geometryGameObjects,
            gameObjectGeometrys,
            getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* basicCameraViewGameObjectIndexData */2][/* gameObjectIndices */0]),
            getBatchArrByIndices(param[4], indices[/* gameObjectIndices */0][/* basicCameraViewGameObjectIndexData */2][/* componentIndices */1]),
            getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* perspectiveCameraProjectionGameObjectIndexData */3][/* gameObjectIndices */0]),
            getBatchArrByIndices(param[5], indices[/* gameObjectIndices */0][/* perspectiveCameraProjectionGameObjectIndexData */3][/* componentIndices */1]),
            getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* arcballCameraControllerGameObjectIndexData */4][/* gameObjectIndices */0]),
            getBatchArrByIndices(param[6], indices[/* gameObjectIndices */0][/* arcballCameraControllerGameObjectIndexData */4][/* componentIndices */1]),
            basicMaterialGameObjects,
            gameObjectBasicMaterials,
            lightMaterialGameObjects,
            gameObjectLightMaterials,
            meshRendererGameObjects,
            gameObjectMeshRenderers,
            getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* directionLightGameObjectIndexData */7][/* gameObjectIndices */0]),
            getBatchArrByIndices(param[9], indices[/* gameObjectIndices */0][/* directionLightGameObjectIndexData */7][/* componentIndices */1]),
            getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* pointLightGameObjectIndexData */8][/* gameObjectIndices */0]),
            getBatchArrByIndices(param[10], indices[/* gameObjectIndices */0][/* pointLightGameObjectIndexData */8][/* componentIndices */1])
          ],
          state
        ];
}

function batchSetTransformParent(parentTransforms, childrenTransforms, state) {
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var parentMap = transformRecord[/* parentMap */15];
  var childMap = transformRecord[/* childMap */16];
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (hierachyDataTuple, parentTransform, index) {
          return AssembleCommon$Wonderjs.addChildrenToParent(parentTransform, childrenTransforms[index], hierachyDataTuple);
        }), /* tuple */[
        parentMap,
        childMap
      ], parentTransforms);
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(transformRecord);
  newrecord[/* transformRecord */11] = (newrecord$1[/* parentMap */15] = match[0], newrecord$1[/* childMap */16] = match[1], newrecord$1);
  return newrecord;
}

function batchSetTransformData(param, gameObjectTransforms, state) {
  var transforms = param[/* transforms */15];
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var localPositions = transformRecord[/* localPositions */3];
  var localRotations = transformRecord[/* localRotations */4];
  var localScales = transformRecord[/* localScales */5];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(transformRecord);
  newrecord[/* transformRecord */11] = (newrecord$1[/* localPositions */3] = ArrayService$WonderCommonlib.reduceOneParami((function (localPositions, param, index) {
            var translation = param[/* translation */0];
            var match = OptionService$Wonderjs.isJsonSerializedValueNone(translation);
            if (match) {
              return localPositions;
            } else {
              var transform = Caml_array.caml_array_get(gameObjectTransforms, index);
              return OperateTypeArrayTransformService$Wonderjs.setLocalPositionByTuple(transform, OptionService$Wonderjs.unsafeGetJsonSerializedValue(translation), localPositions);
            }
          }), localPositions, transforms), newrecord$1[/* localRotations */4] = ArrayService$WonderCommonlib.reduceOneParami((function (localRotations, param, index) {
            var rotation = param[/* rotation */1];
            var match = OptionService$Wonderjs.isJsonSerializedValueNone(rotation);
            if (match) {
              return localRotations;
            } else {
              var transform = Caml_array.caml_array_get(gameObjectTransforms, index);
              return OperateTypeArrayTransformService$Wonderjs.setLocalRotationByTuple(transform, OptionService$Wonderjs.unsafeGetJsonSerializedValue(rotation), localRotations);
            }
          }), localRotations, transforms), newrecord$1[/* localScales */5] = ArrayService$WonderCommonlib.reduceOneParami((function (localScales, param, index) {
            var scale = param[/* scale */2];
            var match = OptionService$Wonderjs.isJsonSerializedValueNone(scale);
            if (match) {
              return localScales;
            } else {
              var transform = Caml_array.caml_array_get(gameObjectTransforms, index);
              return OperateTypeArrayTransformService$Wonderjs.setLocalScaleByTuple(transform, OptionService$Wonderjs.unsafeGetJsonSerializedValue(scale), localScales);
            }
          }), localScales, transforms), newrecord$1);
  return newrecord;
}

function batchSetBasicCameraViewData(param, basicCameraViewArr, isActiveCamera, state) {
  var basicCameraViews = param[/* basicCameraViews */12];
  var basicCameraViewRecord = state[/* basicCameraViewRecord */13];
  Contract$WonderLog.requireCheck((function () {
          var len = basicCameraViews.filter((function (param) {
                  return param[/* isActive */0] === true;
                })).length;
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("has at most one active basicCameraView", "has " + (String(len) + "")), (function () {
                        return Contract$WonderLog.Operators[/* <= */11](len, 1);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicCameraViewRecord */13] = isActiveCamera ? ArrayService$WonderCommonlib.reduceOneParami((function (basicCameraViewRecord, param, index) {
            var cameraView = Caml_array.caml_array_get(basicCameraViewArr, index);
            if (param[/* isActive */0]) {
              return ActiveBasicCameraViewService$Wonderjs.active(cameraView, basicCameraViewRecord);
            } else {
              return basicCameraViewRecord;
            }
          }), basicCameraViewRecord, basicCameraViews) : basicCameraViewRecord;
  return newrecord;
}

function batchSetPerspectiveCameraProjectionData(param, perspectiveCameraProjectionArr, state) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* perspectiveCameraProjectionRecord */14] = ArrayService$WonderCommonlib.reduceOneParami((function (perspectiveCameraProjectionRecord, param, index) {
          var aspect = param[/* aspect */3];
          var far = param[/* far */1];
          var cameraProjection = Caml_array.caml_array_get(perspectiveCameraProjectionArr, index);
          var perspectiveCameraProjectionRecord$1 = FrustumPerspectiveCameraProjectionService$Wonderjs.setNear(cameraProjection, param[/* near */0], perspectiveCameraProjectionRecord);
          var match = OptionService$Wonderjs.isJsonSerializedValueNone(far);
          var perspectiveCameraProjectionRecord$2 = match ? FrustumPerspectiveCameraProjectionService$Wonderjs.setFar(cameraProjection, FrustumPerspectiveCameraProjectionService$Wonderjs.getInfiniteFar(/* () */0), perspectiveCameraProjectionRecord$1) : FrustumPerspectiveCameraProjectionService$Wonderjs.setFar(cameraProjection, OptionService$Wonderjs.unsafeGetJsonSerializedValue(far), perspectiveCameraProjectionRecord$1);
          var perspectiveCameraProjectionRecord$3 = FrustumPerspectiveCameraProjectionService$Wonderjs.setFovy(cameraProjection, param[/* fovy */2], perspectiveCameraProjectionRecord$2);
          var match$1 = OptionService$Wonderjs.isJsonSerializedValueNone(aspect);
          if (match$1) {
            return perspectiveCameraProjectionRecord$3;
          } else {
            return FrustumPerspectiveCameraProjectionService$Wonderjs.setAspect(cameraProjection, OptionService$Wonderjs.unsafeGetJsonSerializedValue(aspect), perspectiveCameraProjectionRecord$3);
          }
        }), perspectiveCameraProjectionRecord, param[/* perspectiveCameraProjections */13]);
  return newrecord;
}

function batchSetArcballCameraControllerData(param, arcballCameraControllerArr, isBindEventConfig, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, param, index) {
                var cameraController = Caml_array.caml_array_get(arcballCameraControllerArr, index);
                var match = isBindEventConfig && param[/* isBindEvent */10];
                var state$1 = match ? EventArcballCameraControllerMainService$Wonderjs.bindEvent(cameraController, state) : state;
                var newrecord = Caml_array.caml_array_dup(state$1);
                newrecord[/* arcballCameraControllerRecord */24] = OperateArcballCameraControllerService$Wonderjs.setWheelSpeed(cameraController, param[/* wheelSpeed */9], OperateArcballCameraControllerService$Wonderjs.setRotateSpeed(cameraController, param[/* rotateSpeed */8], OperateArcballCameraControllerService$Wonderjs.setMoveSpeedY(cameraController, param[/* moveSpeedY */7], OperateArcballCameraControllerService$Wonderjs.setMoveSpeedX(cameraController, param[/* moveSpeedX */6], OperateArcballCameraControllerService$Wonderjs.setTarget(cameraController, param[/* target */5], OperateArcballCameraControllerService$Wonderjs.setThetaMargin(cameraController, param[/* thetaMargin */4], OperateArcballCameraControllerService$Wonderjs.setTheta(cameraController, param[/* theta */3], OperateArcballCameraControllerService$Wonderjs.setPhi(cameraController, param[/* phi */2], OperateArcballCameraControllerService$Wonderjs.setDistance(cameraController, param[/* distance */0], OperateArcballCameraControllerService$Wonderjs.setMinDistance(cameraController, param[/* minDistance */1], state$1[/* arcballCameraControllerRecord */24]))))))))));
                return newrecord;
              }), state, param[/* arcballCameraControllers */14]);
}

function batchSetMeshRendererData(param, meshRendererArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, meshRendererData, index) {
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(meshRendererData);
                if (match) {
                  return state;
                } else {
                  var match$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(meshRendererData);
                  var meshRenderer = Caml_array.caml_array_get(meshRendererArr, index);
                  return OperateMeshRendererMainService$Wonderjs.setDrawMode(meshRenderer, match$1[/* drawMode */0], state);
                }
              }), state, param[/* meshRenderers */17]);
}

function batchSetBasicMaterialData(param, basicMaterialArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, param, index) {
                var material = Caml_array.caml_array_get(basicMaterialArr, index);
                return NameBasicMaterialMainService$Wonderjs.setName(material, param[/* name */1], OperateBasicMaterialMainService$Wonderjs.setColor(material, param[/* color */0], state));
              }), state, param[/* basicMaterials */18]);
}

function batchSetLightMaterialData(param, lightMaterialArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, param, index) {
                var material = Caml_array.caml_array_get(lightMaterialArr, index);
                return NameLightMaterialMainService$Wonderjs.setName(material, param[/* name */1], OperateLightMaterialMainService$Wonderjs.setDiffuseColor(material, param[/* diffuseColor */0], state));
              }), state, param[/* lightMaterials */19]);
}

function _batchSetGameObjectName(targets, names, setNameFunc, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, target, index) {
                return setNameFunc(target, names[index], state);
              }), state, targets);
}

function _batchSetTextureName(basicSourceTextureArr, basicSourceTextures, state) {
  return ArrayService$Wonderjs.reduceOneParamValidi((function (state, basicSourceTexture, index) {
                return NameBasicSourceTextureMainService$Wonderjs.setName(basicSourceTexture, basicSourceTextures[index][/* name */0], state);
              }), state, basicSourceTextureArr);
}

function _batchSetGeometryName(geometrys, geometryArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, geometryData, geometryIndex) {
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(geometryData);
                if (match) {
                  return state;
                } else {
                  var match$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(geometryData);
                  var geometry = geometryArr[geometryIndex];
                  return NameGeometryMainService$Wonderjs.setName(geometry, match$1[/* name */0], state);
                }
              }), state, geometrys);
}

function batchSetNames(param, param$1, param$2, state) {
  return _batchSetGeometryName(param$2[0], param$2[1], _batchSetTextureName(param[1], param$1[1], _batchSetGameObjectName(param[0], param$1[0][/* names */1], NameGameObjectMainService$Wonderjs.setName, state)));
}

export {
  getBatchArrByIndices ,
  getBatchComponentGameObjectData ,
  batchSetTransformParent ,
  batchSetTransformData ,
  batchSetBasicCameraViewData ,
  batchSetPerspectiveCameraProjectionData ,
  batchSetArcballCameraControllerData ,
  batchSetMeshRendererData ,
  batchSetBasicMaterialData ,
  batchSetLightMaterialData ,
  _batchSetGameObjectName ,
  _batchSetTextureName ,
  _batchSetGeometryName ,
  batchSetNames ,
  
}
/* Log-WonderLog Not a pure module */
