

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as SparseMapService$Wonderjs from "../../../../atom/SparseMapService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as ComputePointsBoxGeometryService$Wonderjs from "../../../../record/main/geometry/box/ComputePointsBoxGeometryService.js";

function getRecord(param) {
  return param[/* boxGeometryRecord */22];
}

function create() {
  var match = ComputePointsBoxGeometryService$Wonderjs.generateAllFaces(/* () */0);
  return /* record */[
          /* index */0,
          /* vertices */new Float32Array(match[0]),
          /* texCoords */new Float32Array(match[1]),
          /* normals */new Float32Array(match[2]),
          /* indices */new Uint16Array(match[3]),
          /* gameObjectMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* groupCountMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(state) {
  var match = getRecord(state);
  var disposedIndexArray = match[/* disposedIndexArray */7];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* boxGeometryRecord */22] = /* record */[
    /* index */match[/* index */0],
    /* vertices */match[/* vertices */1],
    /* texCoords */match[/* texCoords */2],
    /* normals */match[/* normals */3],
    /* indices */match[/* indices */4],
    /* gameObjectMap */SparseMapService$Wonderjs.copy(match[/* gameObjectMap */5]),
    /* groupCountMap */SparseMapService$Wonderjs.copy(match[/* groupCountMap */6]),
    /* disposedIndexArray */disposedIndexArray.slice()
  ];
  return newrecord;
}

export {
  getRecord ,
  create ,
  deepCopyForRestore ,
  
}
/* SparseMapService-Wonderjs Not a pure module */
