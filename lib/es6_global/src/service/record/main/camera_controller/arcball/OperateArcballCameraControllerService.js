

import * as NumberService$Wonderjs from "../../../../primitive/NumberService.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as DirtyArrayService$Wonderjs from "../../../../primitive/DirtyArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function unsafeGetDistance(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(cameraController, record[/* distanceMap */5]));
}

function unsafeGetWheelSpeed(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(cameraController, record[/* wheelSpeedMap */14]));
}

function setWheelSpeed(cameraController, wheelSpeed, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */1],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */2],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */3],
          /* dirtyArray */record[/* dirtyArray */4],
          /* distanceMap */record[/* distanceMap */5],
          /* minDistanceMap */record[/* minDistanceMap */6],
          /* phiMap */record[/* phiMap */7],
          /* thetaMap */record[/* thetaMap */8],
          /* thetaMarginMap */record[/* thetaMarginMap */9],
          /* targetMap */record[/* targetMap */10],
          /* moveSpeedXMap */record[/* moveSpeedXMap */11],
          /* moveSpeedYMap */record[/* moveSpeedYMap */12],
          /* rotateSpeedMap */record[/* rotateSpeedMap */13],
          /* wheelSpeedMap */SparseMapService$WonderCommonlib.set(cameraController, wheelSpeed, record[/* wheelSpeedMap */14]),
          /* gameObjectMap */record[/* gameObjectMap */15],
          /* disposedIndexArray */record[/* disposedIndexArray */16]
        ];
}

function unsafeGetMinDistance(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(cameraController, record[/* minDistanceMap */6]));
}

function setDistance(cameraController, distance, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */1],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */2],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */3],
          /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraController, record[/* dirtyArray */4]),
          /* distanceMap */SparseMapService$WonderCommonlib.set(cameraController, NumberService$Wonderjs.bigThan(distance, unsafeGetMinDistance(cameraController, record)), record[/* distanceMap */5]),
          /* minDistanceMap */record[/* minDistanceMap */6],
          /* phiMap */record[/* phiMap */7],
          /* thetaMap */record[/* thetaMap */8],
          /* thetaMarginMap */record[/* thetaMarginMap */9],
          /* targetMap */record[/* targetMap */10],
          /* moveSpeedXMap */record[/* moveSpeedXMap */11],
          /* moveSpeedYMap */record[/* moveSpeedYMap */12],
          /* rotateSpeedMap */record[/* rotateSpeedMap */13],
          /* wheelSpeedMap */record[/* wheelSpeedMap */14],
          /* gameObjectMap */record[/* gameObjectMap */15],
          /* disposedIndexArray */record[/* disposedIndexArray */16]
        ];
}

function setDistanceByEvent(cameraController, pointEvent, record) {
  var match = pointEvent[/* wheel */4];
  if (match !== undefined) {
    return setDistance(cameraController, unsafeGetDistance(cameraController, record) - unsafeGetWheelSpeed(cameraController, record) * match, record);
  } else {
    return record;
  }
}

function setMinDistance(cameraController, minDistance, record) {
  var record_000 = /* index */record[/* index */0];
  var record_001 = /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */1];
  var record_002 = /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */2];
  var record_003 = /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */3];
  var record_004 = /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraController, record[/* dirtyArray */4]);
  var record_005 = /* distanceMap */record[/* distanceMap */5];
  var record_006 = /* minDistanceMap */SparseMapService$WonderCommonlib.set(cameraController, minDistance, record[/* minDistanceMap */6]);
  var record_007 = /* phiMap */record[/* phiMap */7];
  var record_008 = /* thetaMap */record[/* thetaMap */8];
  var record_009 = /* thetaMarginMap */record[/* thetaMarginMap */9];
  var record_010 = /* targetMap */record[/* targetMap */10];
  var record_011 = /* moveSpeedXMap */record[/* moveSpeedXMap */11];
  var record_012 = /* moveSpeedYMap */record[/* moveSpeedYMap */12];
  var record_013 = /* rotateSpeedMap */record[/* rotateSpeedMap */13];
  var record_014 = /* wheelSpeedMap */record[/* wheelSpeedMap */14];
  var record_015 = /* gameObjectMap */record[/* gameObjectMap */15];
  var record_016 = /* disposedIndexArray */record[/* disposedIndexArray */16];
  var record$1 = /* record */[
    record_000,
    record_001,
    record_002,
    record_003,
    record_004,
    record_005,
    record_006,
    record_007,
    record_008,
    record_009,
    record_010,
    record_011,
    record_012,
    record_013,
    record_014,
    record_015,
    record_016
  ];
  var match = minDistance > unsafeGetDistance(cameraController, record$1);
  if (match) {
    return setDistance(cameraController, minDistance, record$1);
  } else {
    return record$1;
  }
}

function unsafeGetPhi(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(cameraController, record[/* phiMap */7]));
}

function setPhi(cameraController, phi, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */1],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */2],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */3],
          /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraController, record[/* dirtyArray */4]),
          /* distanceMap */record[/* distanceMap */5],
          /* minDistanceMap */record[/* minDistanceMap */6],
          /* phiMap */SparseMapService$WonderCommonlib.set(cameraController, phi, record[/* phiMap */7]),
          /* thetaMap */record[/* thetaMap */8],
          /* thetaMarginMap */record[/* thetaMarginMap */9],
          /* targetMap */record[/* targetMap */10],
          /* moveSpeedXMap */record[/* moveSpeedXMap */11],
          /* moveSpeedYMap */record[/* moveSpeedYMap */12],
          /* rotateSpeedMap */record[/* rotateSpeedMap */13],
          /* wheelSpeedMap */record[/* wheelSpeedMap */14],
          /* gameObjectMap */record[/* gameObjectMap */15],
          /* disposedIndexArray */record[/* disposedIndexArray */16]
        ];
}

function _constrainTheta(theta, thetaMargin) {
  return NumberService$Wonderjs.clamp(theta, thetaMargin, Math.PI - thetaMargin);
}

function unsafeGetTheta(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(cameraController, record[/* thetaMap */8]));
}

function unsafeGetThetaMargin(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(cameraController, record[/* thetaMarginMap */9]));
}

function setThetaMargin(cameraController, thetaMargin, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */1],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */2],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */3],
          /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraController, record[/* dirtyArray */4]),
          /* distanceMap */record[/* distanceMap */5],
          /* minDistanceMap */record[/* minDistanceMap */6],
          /* phiMap */record[/* phiMap */7],
          /* thetaMap */SparseMapService$WonderCommonlib.set(cameraController, _constrainTheta(unsafeGetTheta(cameraController, record), thetaMargin), record[/* thetaMap */8]),
          /* thetaMarginMap */SparseMapService$WonderCommonlib.set(cameraController, thetaMargin, record[/* thetaMarginMap */9]),
          /* targetMap */record[/* targetMap */10],
          /* moveSpeedXMap */record[/* moveSpeedXMap */11],
          /* moveSpeedYMap */record[/* moveSpeedYMap */12],
          /* rotateSpeedMap */record[/* rotateSpeedMap */13],
          /* wheelSpeedMap */record[/* wheelSpeedMap */14],
          /* gameObjectMap */record[/* gameObjectMap */15],
          /* disposedIndexArray */record[/* disposedIndexArray */16]
        ];
}

function setTheta(cameraController, theta, record) {
  var thetaMargin = unsafeGetThetaMargin(cameraController, record);
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */1],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */2],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */3],
          /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraController, record[/* dirtyArray */4]),
          /* distanceMap */record[/* distanceMap */5],
          /* minDistanceMap */record[/* minDistanceMap */6],
          /* phiMap */record[/* phiMap */7],
          /* thetaMap */SparseMapService$WonderCommonlib.set(cameraController, _constrainTheta(theta, thetaMargin), record[/* thetaMap */8]),
          /* thetaMarginMap */record[/* thetaMarginMap */9],
          /* targetMap */record[/* targetMap */10],
          /* moveSpeedXMap */record[/* moveSpeedXMap */11],
          /* moveSpeedYMap */record[/* moveSpeedYMap */12],
          /* rotateSpeedMap */record[/* rotateSpeedMap */13],
          /* wheelSpeedMap */record[/* wheelSpeedMap */14],
          /* gameObjectMap */record[/* gameObjectMap */15],
          /* disposedIndexArray */record[/* disposedIndexArray */16]
        ];
}

function unsafeGetTarget(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(cameraController, record[/* targetMap */10]));
}

function setTarget(cameraController, target, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */1],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */2],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */3],
          /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraController, record[/* dirtyArray */4]),
          /* distanceMap */record[/* distanceMap */5],
          /* minDistanceMap */record[/* minDistanceMap */6],
          /* phiMap */record[/* phiMap */7],
          /* thetaMap */record[/* thetaMap */8],
          /* thetaMarginMap */record[/* thetaMarginMap */9],
          /* targetMap */SparseMapService$WonderCommonlib.set(cameraController, target, record[/* targetMap */10]),
          /* moveSpeedXMap */record[/* moveSpeedXMap */11],
          /* moveSpeedYMap */record[/* moveSpeedYMap */12],
          /* rotateSpeedMap */record[/* rotateSpeedMap */13],
          /* wheelSpeedMap */record[/* wheelSpeedMap */14],
          /* gameObjectMap */record[/* gameObjectMap */15],
          /* disposedIndexArray */record[/* disposedIndexArray */16]
        ];
}

function unsafeGetMoveSpeedX(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(cameraController, record[/* moveSpeedXMap */11]));
}

function setMoveSpeedX(cameraController, moveSpeedX, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */1],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */2],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */3],
          /* dirtyArray */record[/* dirtyArray */4],
          /* distanceMap */record[/* distanceMap */5],
          /* minDistanceMap */record[/* minDistanceMap */6],
          /* phiMap */record[/* phiMap */7],
          /* thetaMap */record[/* thetaMap */8],
          /* thetaMarginMap */record[/* thetaMarginMap */9],
          /* targetMap */record[/* targetMap */10],
          /* moveSpeedXMap */SparseMapService$WonderCommonlib.set(cameraController, moveSpeedX, record[/* moveSpeedXMap */11]),
          /* moveSpeedYMap */record[/* moveSpeedYMap */12],
          /* rotateSpeedMap */record[/* rotateSpeedMap */13],
          /* wheelSpeedMap */record[/* wheelSpeedMap */14],
          /* gameObjectMap */record[/* gameObjectMap */15],
          /* disposedIndexArray */record[/* disposedIndexArray */16]
        ];
}

function unsafeGetMoveSpeedY(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(cameraController, record[/* moveSpeedYMap */12]));
}

function setMoveSpeedY(cameraController, moveSpeedY, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */1],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */2],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */3],
          /* dirtyArray */record[/* dirtyArray */4],
          /* distanceMap */record[/* distanceMap */5],
          /* minDistanceMap */record[/* minDistanceMap */6],
          /* phiMap */record[/* phiMap */7],
          /* thetaMap */record[/* thetaMap */8],
          /* thetaMarginMap */record[/* thetaMarginMap */9],
          /* targetMap */record[/* targetMap */10],
          /* moveSpeedXMap */record[/* moveSpeedXMap */11],
          /* moveSpeedYMap */SparseMapService$WonderCommonlib.set(cameraController, moveSpeedY, record[/* moveSpeedYMap */12]),
          /* rotateSpeedMap */record[/* rotateSpeedMap */13],
          /* wheelSpeedMap */record[/* wheelSpeedMap */14],
          /* gameObjectMap */record[/* gameObjectMap */15],
          /* disposedIndexArray */record[/* disposedIndexArray */16]
        ];
}

function unsafeGetRotateSpeed(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(cameraController, record[/* rotateSpeedMap */13]));
}

function setRotateSpeed(cameraController, rotateSpeed, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */1],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */2],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */3],
          /* dirtyArray */record[/* dirtyArray */4],
          /* distanceMap */record[/* distanceMap */5],
          /* minDistanceMap */record[/* minDistanceMap */6],
          /* phiMap */record[/* phiMap */7],
          /* thetaMap */record[/* thetaMap */8],
          /* thetaMarginMap */record[/* thetaMarginMap */9],
          /* targetMap */record[/* targetMap */10],
          /* moveSpeedXMap */record[/* moveSpeedXMap */11],
          /* moveSpeedYMap */record[/* moveSpeedYMap */12],
          /* rotateSpeedMap */SparseMapService$WonderCommonlib.set(cameraController, rotateSpeed, record[/* rotateSpeedMap */13]),
          /* wheelSpeedMap */record[/* wheelSpeedMap */14],
          /* gameObjectMap */record[/* gameObjectMap */15],
          /* disposedIndexArray */record[/* disposedIndexArray */16]
        ];
}

export {
  unsafeGetDistance ,
  unsafeGetWheelSpeed ,
  setWheelSpeed ,
  unsafeGetMinDistance ,
  setDistance ,
  setDistanceByEvent ,
  setMinDistance ,
  unsafeGetPhi ,
  setPhi ,
  _constrainTheta ,
  unsafeGetTheta ,
  unsafeGetThetaMargin ,
  setThetaMargin ,
  setTheta ,
  unsafeGetTarget ,
  setTarget ,
  unsafeGetMoveSpeedX ,
  setMoveSpeedX ,
  unsafeGetMoveSpeedY ,
  setMoveSpeedY ,
  unsafeGetRotateSpeed ,
  setRotateSpeed ,
  
}
/* NumberService-Wonderjs Not a pure module */
