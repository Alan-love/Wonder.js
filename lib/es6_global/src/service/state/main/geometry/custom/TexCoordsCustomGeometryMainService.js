

import * as TypeArrayService$Wonderjs from "../../../../primitive/buffer/TypeArrayService.js";
import * as BufferCustomGeometryService$Wonderjs from "../../../../record/main/geometry/custom/BufferCustomGeometryService.js";
import * as RecordCustomGeometryMainService$Wonderjs from "./RecordCustomGeometryMainService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../../primitive/geometry/ReallocatedPointsGeometryService.js";

function getTexCoords(index, state) {
  var match = RecordCustomGeometryMainService$Wonderjs.getRecord(state);
  return ReallocatedPointsGeometryService$Wonderjs.getFloat32PointData(BufferCustomGeometryService$Wonderjs.getInfoIndex(index), match[/* texCoords */3], match[/* texCoordsInfos */7]);
}

function setTexCoordsByTypeArray(index, data, state) {
  var record = RecordCustomGeometryMainService$Wonderjs.getRecord(state);
  var texCoords = record[/* texCoords */3];
  var texCoordsOffset = record[/* texCoordsOffset */11];
  record[/* texCoordsOffset */11] = ReallocatedPointsGeometryService$Wonderjs.setFloat32PointData(/* tuple */[
        BufferCustomGeometryService$Wonderjs.getInfoIndex(index),
        record[/* texCoordsInfos */7],
        texCoordsOffset,
        data.length
      ], (function (param) {
          return TypeArrayService$Wonderjs.fillFloat32ArrayWithOffset(texCoords, data, param);
        }));
  return state;
}

export {
  getTexCoords ,
  setTexCoordsByTypeArray ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
