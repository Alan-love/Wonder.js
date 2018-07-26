

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as DisposeGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/DisposeGameObjectMainService.js";
import * as DisposeComponentGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/DisposeComponentGameObjectMainService.js";

function _disposeComponents(batchDisposeBasicMaterialComponentFunc, batchDisposeLightMaterialComponentFunc, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var disposedBasicCameraViewArray = gameObjectRecord[/* disposedBasicCameraViewArray */6];
  var disposedTransformArray = gameObjectRecord[/* disposedTransformArray */7];
  var disposedTransformArrayForKeepOrder = gameObjectRecord[/* disposedTransformArrayForKeepOrder */8];
  var disposedPerspectiveCameraProjectionArray = gameObjectRecord[/* disposedPerspectiveCameraProjectionArray */9];
  var disposedArcballCameraControllerArray = gameObjectRecord[/* disposedArcballCameraControllerArray */10];
  var disposedBasicMaterialArray = gameObjectRecord[/* disposedBasicMaterialArray */11];
  var disposedLightMaterialArray = gameObjectRecord[/* disposedLightMaterialArray */12];
  var disposedBoxGeometryArray = gameObjectRecord[/* disposedBoxGeometryArray */13];
  var disposedCustomGeometryArray = gameObjectRecord[/* disposedCustomGeometryArray */14];
  var disposedSourceInstanceArray = gameObjectRecord[/* disposedSourceInstanceArray */15];
  var disposedObjectInstanceArray = gameObjectRecord[/* disposedObjectInstanceArray */16];
  var disposedDirectionLightArray = gameObjectRecord[/* disposedDirectionLightArray */17];
  var disposedPointLightArray = gameObjectRecord[/* disposedPointLightArray */18];
  var disposedMeshRendererComponentArray = gameObjectRecord[/* disposedMeshRendererComponentArray */19];
  var state$1 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicCameraViewComponent(state, disposedBasicCameraViewArray);
  var state$2 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposePerspectiveCameraProjectionComponent(state$1, disposedPerspectiveCameraProjectionArray);
  var state$3 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeArcballCameraControllerComponent(state$2, disposedArcballCameraControllerArray);
  var state$4 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeTransformComponent(state$3, false, disposedTransformArray);
  var state$5 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeTransformComponent(state$4, true, disposedTransformArrayForKeepOrder);
  var state$6 = Curry._2(batchDisposeBasicMaterialComponentFunc, state$5, disposedBasicMaterialArray);
  var state$7 = Curry._2(batchDisposeLightMaterialComponentFunc, state$6, disposedLightMaterialArray);
  var match = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBoxGeometryComponent(state$7, disposedBoxGeometryArray);
  var match$1 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeCustomGeometryComponent(match[0], disposedCustomGeometryArray);
  var partial_arg = /* tuple */[
    batchDisposeLightMaterialComponentFunc,
    batchDisposeLightMaterialComponentFunc
  ];
  var match$2 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeSourceInstanceComponent(match$1[0], false, (function (param, param$1, param$2) {
          return DisposeGameObjectMainService$Wonderjs.batchDispose(partial_arg, param, param$1, param$2);
        }), disposedSourceInstanceArray);
  var state$8 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeObjectInstanceComponent(match$2[0], disposedObjectInstanceArray);
  var state$9 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeDirectionLightComponent(state$8, disposedDirectionLightArray);
  var state$10 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposePointLightComponent(state$9, disposedPointLightArray);
  var state$11 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeMeshRendererComponent(state$10, disposedMeshRendererComponentArray);
  return /* tuple */[
          state$11,
          match[1],
          match$1[1],
          match$2[1]
        ];
}

function _disposeGameObjects(batchDisposeBasicMaterialComponentFunc, batchDisposeLightMaterialComponentFunc, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var disposedUidArray = gameObjectRecord[/* disposedUidArray */4];
  var disposedUidArrayForKeepOrder = gameObjectRecord[/* disposedUidArrayForKeepOrder */5];
  var match = DisposeGameObjectMainService$Wonderjs.batchDispose(/* tuple */[
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc
      ], disposedUidArray, false, state);
  var match$1 = DisposeGameObjectMainService$Wonderjs.batchDispose(/* tuple */[
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc
      ], disposedUidArrayForKeepOrder, true, match[0]);
  var state$1 = DisposeGameObjectMainService$Wonderjs.clearDeferDisposeData(match$1[0]);
  return /* tuple */[
          state$1,
          match[1].concat(match$1[1]),
          match[2].concat(match$1[2]),
          match[3].concat(match$1[3])
        ];
}

function execJob(batchDisposeBasicMaterialComponentFunc, batchDisposeLightMaterialComponentFunc, state) {
  var match = _disposeComponents(batchDisposeBasicMaterialComponentFunc, batchDisposeLightMaterialComponentFunc, state);
  var match$1 = _disposeGameObjects(batchDisposeBasicMaterialComponentFunc, batchDisposeLightMaterialComponentFunc, match[0]);
  return /* tuple */[
          match$1[0],
          match[1].concat(match$1[1]),
          match[2].concat(match$1[2]),
          match[3].concat(match$1[3])
        ];
}

export {
  _disposeComponents ,
  _disposeGameObjects ,
  execJob ,
  
}
/* DisposeGameObjectMainService-Wonderjs Not a pure module */
