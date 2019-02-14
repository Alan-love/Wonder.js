

import * as NumberService$Wonderjs from "../../../../primitive/NumberService.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as DirtyArrayService$Wonderjs from "../../../../primitive/DirtyArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function unsafeGetDistance(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* distanceMap */7]));
}

function unsafeGetWheelSpeed(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* wheelSpeedMap */16]));
}

function setWheelSpeed(cameraController, wheelSpeed, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */record[/* dirtyArray */6],
          /* distanceMap */record[/* distanceMap */7],
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */record[/* phiMap */9],
          /* thetaMap */record[/* thetaMap */10],
          /* thetaMarginMap */record[/* thetaMarginMap */11],
          /* targetMap */record[/* targetMap */12],
          /* moveSpeedXMap */record[/* moveSpeedXMap */13],
          /* moveSpeedYMap */record[/* moveSpeedYMap */14],
          /* rotateSpeedMap */record[/* rotateSpeedMap */15],
          /* wheelSpeedMap */MutableSparseMapService$WonderCommonlib.set(cameraController, wheelSpeed, record[/* wheelSpeedMap */16]),
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
        ];
}

function unsafeGetMinDistance(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* minDistanceMap */8]));
}

function setDistance(cameraController, distance, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraController, record[/* dirtyArray */6]),
          /* distanceMap */MutableSparseMapService$WonderCommonlib.set(cameraController, NumberService$Wonderjs.bigThan(distance, unsafeGetMinDistance(cameraController, record)), record[/* distanceMap */7]),
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */record[/* phiMap */9],
          /* thetaMap */record[/* thetaMap */10],
          /* thetaMarginMap */record[/* thetaMarginMap */11],
          /* targetMap */record[/* targetMap */12],
          /* moveSpeedXMap */record[/* moveSpeedXMap */13],
          /* moveSpeedYMap */record[/* moveSpeedYMap */14],
          /* rotateSpeedMap */record[/* rotateSpeedMap */15],
          /* wheelSpeedMap */record[/* wheelSpeedMap */16],
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
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
  var record_001 = /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1];
  var record_002 = /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2];
  var record_003 = /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3];
  var record_004 = /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4];
  var record_005 = /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5];
  var record_006 = /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraController, record[/* dirtyArray */6]);
  var record_007 = /* distanceMap */record[/* distanceMap */7];
  var record_008 = /* minDistanceMap */MutableSparseMapService$WonderCommonlib.set(cameraController, minDistance, record[/* minDistanceMap */8]);
  var record_009 = /* phiMap */record[/* phiMap */9];
  var record_010 = /* thetaMap */record[/* thetaMap */10];
  var record_011 = /* thetaMarginMap */record[/* thetaMarginMap */11];
  var record_012 = /* targetMap */record[/* targetMap */12];
  var record_013 = /* moveSpeedXMap */record[/* moveSpeedXMap */13];
  var record_014 = /* moveSpeedYMap */record[/* moveSpeedYMap */14];
  var record_015 = /* rotateSpeedMap */record[/* rotateSpeedMap */15];
  var record_016 = /* wheelSpeedMap */record[/* wheelSpeedMap */16];
  var record_017 = /* gameObjectMap */record[/* gameObjectMap */17];
  var record_018 = /* disposedIndexArray */record[/* disposedIndexArray */18];
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
    record_016,
    record_017,
    record_018
  ];
  var match = minDistance > unsafeGetDistance(cameraController, record$1);
  if (match) {
    return setDistance(cameraController, minDistance, record$1);
  } else {
    return record$1;
  }
}

function unsafeGetPhi(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* phiMap */9]));
}

function setPhi(cameraController, phi, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraController, record[/* dirtyArray */6]),
          /* distanceMap */record[/* distanceMap */7],
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */MutableSparseMapService$WonderCommonlib.set(cameraController, phi, record[/* phiMap */9]),
          /* thetaMap */record[/* thetaMap */10],
          /* thetaMarginMap */record[/* thetaMarginMap */11],
          /* targetMap */record[/* targetMap */12],
          /* moveSpeedXMap */record[/* moveSpeedXMap */13],
          /* moveSpeedYMap */record[/* moveSpeedYMap */14],
          /* rotateSpeedMap */record[/* rotateSpeedMap */15],
          /* wheelSpeedMap */record[/* wheelSpeedMap */16],
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
        ];
}

function _constrainTheta(theta, thetaMargin) {
  return NumberService$Wonderjs.clamp(theta, thetaMargin, Math.PI - thetaMargin);
}

function unsafeGetTheta(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* thetaMap */10]));
}

function unsafeGetThetaMargin(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* thetaMarginMap */11]));
}

function setThetaMargin(cameraController, thetaMargin, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraController, record[/* dirtyArray */6]),
          /* distanceMap */record[/* distanceMap */7],
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */record[/* phiMap */9],
          /* thetaMap */MutableSparseMapService$WonderCommonlib.set(cameraController, _constrainTheta(unsafeGetTheta(cameraController, record), thetaMargin), record[/* thetaMap */10]),
          /* thetaMarginMap */MutableSparseMapService$WonderCommonlib.set(cameraController, thetaMargin, record[/* thetaMarginMap */11]),
          /* targetMap */record[/* targetMap */12],
          /* moveSpeedXMap */record[/* moveSpeedXMap */13],
          /* moveSpeedYMap */record[/* moveSpeedYMap */14],
          /* rotateSpeedMap */record[/* rotateSpeedMap */15],
          /* wheelSpeedMap */record[/* wheelSpeedMap */16],
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
        ];
}

function setTheta(cameraController, theta, record) {
  var thetaMargin = unsafeGetThetaMargin(cameraController, record);
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraController, record[/* dirtyArray */6]),
          /* distanceMap */record[/* distanceMap */7],
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */record[/* phiMap */9],
          /* thetaMap */MutableSparseMapService$WonderCommonlib.set(cameraController, _constrainTheta(theta, thetaMargin), record[/* thetaMap */10]),
          /* thetaMarginMap */record[/* thetaMarginMap */11],
          /* targetMap */record[/* targetMap */12],
          /* moveSpeedXMap */record[/* moveSpeedXMap */13],
          /* moveSpeedYMap */record[/* moveSpeedYMap */14],
          /* rotateSpeedMap */record[/* rotateSpeedMap */15],
          /* wheelSpeedMap */record[/* wheelSpeedMap */16],
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
        ];
}

function unsafeGetTarget(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* targetMap */12]));
}

function setTarget(cameraController, target, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraController, record[/* dirtyArray */6]),
          /* distanceMap */record[/* distanceMap */7],
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */record[/* phiMap */9],
          /* thetaMap */record[/* thetaMap */10],
          /* thetaMarginMap */record[/* thetaMarginMap */11],
          /* targetMap */MutableSparseMapService$WonderCommonlib.set(cameraController, target, record[/* targetMap */12]),
          /* moveSpeedXMap */record[/* moveSpeedXMap */13],
          /* moveSpeedYMap */record[/* moveSpeedYMap */14],
          /* rotateSpeedMap */record[/* rotateSpeedMap */15],
          /* wheelSpeedMap */record[/* wheelSpeedMap */16],
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
        ];
}

function unsafeGetMoveSpeedX(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* moveSpeedXMap */13]));
}

function setMoveSpeedX(cameraController, moveSpeedX, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */record[/* dirtyArray */6],
          /* distanceMap */record[/* distanceMap */7],
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */record[/* phiMap */9],
          /* thetaMap */record[/* thetaMap */10],
          /* thetaMarginMap */record[/* thetaMarginMap */11],
          /* targetMap */record[/* targetMap */12],
          /* moveSpeedXMap */MutableSparseMapService$WonderCommonlib.set(cameraController, moveSpeedX, record[/* moveSpeedXMap */13]),
          /* moveSpeedYMap */record[/* moveSpeedYMap */14],
          /* rotateSpeedMap */record[/* rotateSpeedMap */15],
          /* wheelSpeedMap */record[/* wheelSpeedMap */16],
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
        ];
}

function unsafeGetMoveSpeedY(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* moveSpeedYMap */14]));
}

function setMoveSpeedY(cameraController, moveSpeedY, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */record[/* dirtyArray */6],
          /* distanceMap */record[/* distanceMap */7],
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */record[/* phiMap */9],
          /* thetaMap */record[/* thetaMap */10],
          /* thetaMarginMap */record[/* thetaMarginMap */11],
          /* targetMap */record[/* targetMap */12],
          /* moveSpeedXMap */record[/* moveSpeedXMap */13],
          /* moveSpeedYMap */MutableSparseMapService$WonderCommonlib.set(cameraController, moveSpeedY, record[/* moveSpeedYMap */14]),
          /* rotateSpeedMap */record[/* rotateSpeedMap */15],
          /* wheelSpeedMap */record[/* wheelSpeedMap */16],
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
        ];
}

function unsafeGetRotateSpeed(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* rotateSpeedMap */15]));
}

function setRotateSpeed(cameraController, rotateSpeed, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */record[/* dirtyArray */6],
          /* distanceMap */record[/* distanceMap */7],
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */record[/* phiMap */9],
          /* thetaMap */record[/* thetaMap */10],
          /* thetaMarginMap */record[/* thetaMarginMap */11],
          /* targetMap */record[/* targetMap */12],
          /* moveSpeedXMap */record[/* moveSpeedXMap */13],
          /* moveSpeedYMap */record[/* moveSpeedYMap */14],
          /* rotateSpeedMap */MutableSparseMapService$WonderCommonlib.set(cameraController, rotateSpeed, record[/* rotateSpeedMap */15]),
          /* wheelSpeedMap */record[/* wheelSpeedMap */16],
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
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
