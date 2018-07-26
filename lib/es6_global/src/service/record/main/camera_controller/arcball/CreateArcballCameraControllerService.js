

import * as DirtyArrayService$Wonderjs from "../../../../primitive/DirtyArrayService.js";
import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function _setDefaultValue(index, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */1],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */2],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */3],
          /* dirtyArray */record[/* dirtyArray */4],
          /* distanceMap */SparseMapService$WonderCommonlib.set(index, 10, record[/* distanceMap */5]),
          /* minDistanceMap */SparseMapService$WonderCommonlib.set(index, 0.05, record[/* minDistanceMap */6]),
          /* phiMap */SparseMapService$WonderCommonlib.set(index, Math.PI / 2, record[/* phiMap */7]),
          /* thetaMap */SparseMapService$WonderCommonlib.set(index, Math.PI / 2, record[/* thetaMap */8]),
          /* thetaMarginMap */SparseMapService$WonderCommonlib.set(index, 0.05, record[/* thetaMarginMap */9]),
          /* targetMap */SparseMapService$WonderCommonlib.set(index, /* tuple */[
                0,
                0,
                0
              ], record[/* targetMap */10]),
          /* moveSpeedXMap */SparseMapService$WonderCommonlib.set(index, 1, record[/* moveSpeedXMap */11]),
          /* moveSpeedYMap */SparseMapService$WonderCommonlib.set(index, 1, record[/* moveSpeedYMap */12]),
          /* rotateSpeedMap */SparseMapService$WonderCommonlib.set(index, 1, record[/* rotateSpeedMap */13]),
          /* wheelSpeedMap */SparseMapService$WonderCommonlib.set(index, 1, record[/* wheelSpeedMap */14]),
          /* gameObjectMap */record[/* gameObjectMap */15],
          /* disposedIndexArray */record[/* disposedIndexArray */16]
        ];
}

function create(record) {
  var match = IndexComponentService$Wonderjs.generateIndex(record[/* index */0], record[/* disposedIndexArray */16]);
  var index = match[0];
  var record$1 = _setDefaultValue(index, record);
  return /* tuple */[
          /* record */[
            /* index */match[1],
            /* pointDragEventHandleFuncMap */record$1[/* pointDragEventHandleFuncMap */1],
            /* pointScaleEventHandleFuncMap */record$1[/* pointScaleEventHandleFuncMap */2],
            /* keydownEventHandleFuncMap */record$1[/* keydownEventHandleFuncMap */3],
            /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(index, record[/* dirtyArray */4]),
            /* distanceMap */record$1[/* distanceMap */5],
            /* minDistanceMap */record$1[/* minDistanceMap */6],
            /* phiMap */record$1[/* phiMap */7],
            /* thetaMap */record$1[/* thetaMap */8],
            /* thetaMarginMap */record$1[/* thetaMarginMap */9],
            /* targetMap */record$1[/* targetMap */10],
            /* moveSpeedXMap */record$1[/* moveSpeedXMap */11],
            /* moveSpeedYMap */record$1[/* moveSpeedYMap */12],
            /* rotateSpeedMap */record$1[/* rotateSpeedMap */13],
            /* wheelSpeedMap */record$1[/* wheelSpeedMap */14],
            /* gameObjectMap */record$1[/* gameObjectMap */15],
            /* disposedIndexArray */match[2]
          ],
          index
        ];
}

export {
  _setDefaultValue ,
  create ,
  
}
/* DirtyArrayService-Wonderjs Not a pure module */
