

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as EventArcballCameraControllerMainService$Wonderjs from "./EventArcballCameraControllerMainService.js";

function isAlive(cameraController, param) {
  return DisposeComponentService$Wonderjs.isAlive(cameraController, param[/* disposedIndexArray */18]);
}

function _disposeData(cameraController, state) {
  var state$1 = EventArcballCameraControllerMainService$Wonderjs.unbindEvent(cameraController, state);
  var arcballCameraControllerRecord = state$1[/* arcballCameraControllerRecord */24];
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* arcballCameraControllerRecord */24] = /* record */[
    /* index */arcballCameraControllerRecord[/* index */0],
    /* pointDragStartEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragStartEventHandleFuncMap */1],
    /* pointDragDropEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragDropEventHandleFuncMap */2],
    /* pointDragOverEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragOverEventHandleFuncMap */3],
    /* pointScaleEventHandleFuncMap */arcballCameraControllerRecord[/* pointScaleEventHandleFuncMap */4],
    /* keydownEventHandleFuncMap */arcballCameraControllerRecord[/* keydownEventHandleFuncMap */5],
    /* dirtyArray */arcballCameraControllerRecord[/* dirtyArray */6].filter((function (dirtyIndex) {
            return dirtyIndex !== cameraController;
          })),
    /* distanceMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* distanceMap */7]),
    /* minDistanceMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* minDistanceMap */8]),
    /* phiMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* phiMap */9]),
    /* thetaMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* thetaMap */10]),
    /* thetaMarginMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* thetaMarginMap */11]),
    /* targetMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* targetMap */12]),
    /* moveSpeedXMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* moveSpeedXMap */13]),
    /* moveSpeedYMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* moveSpeedYMap */14]),
    /* rotateSpeedMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* rotateSpeedMap */15]),
    /* wheelSpeedMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* wheelSpeedMap */16]),
    /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* gameObjectMap */17]),
    /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */18]
  ];
  return newrecord;
}

function handleBatchDisposeComponent(cameraControllerArray, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(cameraControllerArray, isAlive, arcballCameraControllerRecord);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */24] = /* record */[
    /* index */arcballCameraControllerRecord[/* index */0],
    /* pointDragStartEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragStartEventHandleFuncMap */1],
    /* pointDragDropEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragDropEventHandleFuncMap */2],
    /* pointDragOverEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragOverEventHandleFuncMap */3],
    /* pointScaleEventHandleFuncMap */arcballCameraControllerRecord[/* pointScaleEventHandleFuncMap */4],
    /* keydownEventHandleFuncMap */arcballCameraControllerRecord[/* keydownEventHandleFuncMap */5],
    /* dirtyArray */arcballCameraControllerRecord[/* dirtyArray */6],
    /* distanceMap */arcballCameraControllerRecord[/* distanceMap */7],
    /* minDistanceMap */arcballCameraControllerRecord[/* minDistanceMap */8],
    /* phiMap */arcballCameraControllerRecord[/* phiMap */9],
    /* thetaMap */arcballCameraControllerRecord[/* thetaMap */10],
    /* thetaMarginMap */arcballCameraControllerRecord[/* thetaMarginMap */11],
    /* targetMap */arcballCameraControllerRecord[/* targetMap */12],
    /* moveSpeedXMap */arcballCameraControllerRecord[/* moveSpeedXMap */13],
    /* moveSpeedYMap */arcballCameraControllerRecord[/* moveSpeedYMap */14],
    /* rotateSpeedMap */arcballCameraControllerRecord[/* rotateSpeedMap */15],
    /* wheelSpeedMap */arcballCameraControllerRecord[/* wheelSpeedMap */16],
    /* gameObjectMap */arcballCameraControllerRecord[/* gameObjectMap */17],
    /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */18].concat(cameraControllerArray)
  ];
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, cameraController) {
                return _disposeData(cameraController, state);
              }), newrecord, cameraControllerArray);
}

export {
  isAlive ,
  _disposeData ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
