

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as RemoveComponentGameObjectMainService$Wonderjs from "./RemoveComponentGameObjectMainService.js";
import * as DisposeComponentGameObjectMainService$Wonderjs from "./DisposeComponentGameObjectMainService.js";
import * as BatchGetComponentGameObjectMainService$Wonderjs from "./BatchGetComponentGameObjectMainService.js";

function _getSharableComponentDataArr(uidArray, getComponentFunc, gameObjectRecord) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (dataArr, uid) {
                var match = getComponentFunc(uid, gameObjectRecord);
                if (match !== undefined) {
                  return ArrayService$Wonderjs.push(/* tuple */[
                              uid,
                              Js_primitive.valFromOption(match)
                            ], dataArr);
                } else {
                  return dataArr;
                }
              }), /* array */[], uidArray);
}

function _batchDisposeSharableComponents(uidArray, param, param$1, state) {
  var isRemoveMaterial = param[1];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var geometryDataArr = _getSharableComponentDataArr(uidArray, GetComponentGameObjectService$Wonderjs.getGeometryComponent, gameObjectRecord);
  var match = param[0] ? /* tuple */[
      RemoveComponentGameObjectMainService$Wonderjs.batchRemoveGeometryComponent(state, geometryDataArr),
      /* array */[]
    ] : DisposeComponentGameObjectMainService$Wonderjs.batchDisposeGeometryComponentData(state, geometryDataArr);
  var state$1 = match[0];
  var basicMaterialDataArr = _getSharableComponentDataArr(uidArray, GetComponentGameObjectService$Wonderjs.getBasicMaterialComponent, gameObjectRecord);
  var state$2 = isRemoveMaterial ? RemoveComponentGameObjectMainService$Wonderjs.batchRemoveBasicMaterialComponent(state$1, basicMaterialDataArr) : Curry._2(param$1[0], state$1, basicMaterialDataArr);
  var gameObjectRecord$1 = state$2[/* gameObjectRecord */10];
  var lightMaterialDataArr = _getSharableComponentDataArr(uidArray, GetComponentGameObjectService$Wonderjs.getLightMaterialComponent, gameObjectRecord$1);
  var state$3 = isRemoveMaterial ? RemoveComponentGameObjectMainService$Wonderjs.batchRemoveLightMaterialComponent(state$2, lightMaterialDataArr) : Curry._2(param$1[1], state$2, lightMaterialDataArr);
  return /* tuple */[
          state$3,
          match[1]
        ];
}

function batchDispose(param, param$1, state) {
  var batchDisposeLightMaterialComponentFunc = param$1[1];
  var batchDisposeBasicMaterialComponentFunc = param$1[0];
  var isRemoveMaterial = param[3];
  var isRemoveGeometry = param[2];
  var isKeepOrder = param[1];
  var uidArray = param[0];
  var state$1 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeTransformComponent(state, isKeepOrder, BatchGetComponentGameObjectMainService$Wonderjs.batchGetTransformComponent(uidArray, state));
  var match = _batchDisposeSharableComponents(uidArray, /* tuple */[
        isRemoveGeometry,
        isRemoveMaterial
      ], /* tuple */[
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc
      ], state$1);
  var state$2 = match[0];
  var state$3 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicCameraViewComponent(state$2, BatchGetComponentGameObjectMainService$Wonderjs.batchGetBasicCameraViewComponent(uidArray, state$2));
  var state$4 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposePerspectiveCameraProjectionComponent(state$3, BatchGetComponentGameObjectMainService$Wonderjs.batchGetPerspectiveCameraProjectionComponent(uidArray, state$3));
  var state$5 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeArcballCameraControllerComponent(state$4, BatchGetComponentGameObjectMainService$Wonderjs.batchGetArcballCameraControllerComponent(uidArray, state$4));
  var state$6 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeMeshRendererComponent(state$5, BatchGetComponentGameObjectMainService$Wonderjs.batchGetMeshRendererComponent(uidArray, state$5));
  var state$7 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeDirectionLightComponent(state$6, BatchGetComponentGameObjectMainService$Wonderjs.batchGetDirectionLightComponent(uidArray, state$6));
  var state$8 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposePointLightComponent(state$7, BatchGetComponentGameObjectMainService$Wonderjs.batchGetPointLightComponent(uidArray, state$7));
  var match$1 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeSourceInstanceComponent(state$8, /* tuple */[
        isKeepOrder,
        isRemoveGeometry,
        isRemoveMaterial
      ], Curry._1(param$1[2], /* tuple */[
            batchDisposeBasicMaterialComponentFunc,
            batchDisposeLightMaterialComponentFunc
          ]), BatchGetComponentGameObjectMainService$Wonderjs.batchGetSourceInstanceComponent(uidArray, state$8));
  var state$9 = match$1[0];
  var state$10 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeObjectInstanceComponent(state$9, BatchGetComponentGameObjectMainService$Wonderjs.batchGetObjectInstanceComponent(uidArray, state$9));
  return /* tuple */[
          state$10,
          match[1],
          match$1[1]
        ];
}

export {
  _getSharableComponentDataArr ,
  _batchDisposeSharableComponents ,
  batchDispose ,
  
}
/* ArrayService-Wonderjs Not a pure module */
