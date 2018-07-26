

import * as TypeArrayService$Wonderjs from "../../../../primitive/buffer/TypeArrayService.js";
import * as HasNormalsService$Wonderjs from "../../../../primitive/geometry/HasNormalsService.js";
import * as BufferCustomGeometryService$Wonderjs from "../../../../record/main/geometry/custom/BufferCustomGeometryService.js";
import * as RecordCustomGeometryMainService$Wonderjs from "./RecordCustomGeometryMainService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../../primitive/geometry/ReallocatedPointsGeometryService.js";

function getNormals(index, state) {
  var match = RecordCustomGeometryMainService$Wonderjs.getRecord(state);
  return ReallocatedPointsGeometryService$Wonderjs.getFloat32PointData(BufferCustomGeometryService$Wonderjs.getInfoIndex(index), match[/* normals */4], match[/* normalsInfos */8]);
}

function hasNormals(index, state) {
  var match = RecordCustomGeometryMainService$Wonderjs.getRecord(state);
  return HasNormalsService$Wonderjs.hasNormals(index, match[/* normalsInfos */8]);
}

function setNormalsByTypeArray(index, data, state) {
  var record = RecordCustomGeometryMainService$Wonderjs.getRecord(state);
  var normals = record[/* normals */4];
  var normalsOffset = record[/* normalsOffset */12];
  record[/* normalsOffset */12] = ReallocatedPointsGeometryService$Wonderjs.setFloat32PointData(/* tuple */[
        BufferCustomGeometryService$Wonderjs.getInfoIndex(index),
        record[/* normalsInfos */8],
        normalsOffset,
        data.length
      ], (function (param) {
          return TypeArrayService$Wonderjs.fillFloat32ArrayWithOffset(normals, data, param);
        }));
  return state;
}

export {
  getNormals ,
  hasNormals ,
  setNormalsByTypeArray ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
