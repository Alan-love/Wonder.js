

import * as BufferCustomGeometryService$Wonderjs from "../../../../record/main/geometry/custom/BufferCustomGeometryService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../../primitive/geometry/ReallocatedPointsGeometryService.js";
import * as NormalsRenderCustomGeometryService$Wonderjs from "../../../../record/render/geometry/custom/NormalsRenderCustomGeometryService.js";
import * as ComputeCustomGeometryNormalsRenderService$Wonderjs from "./ComputeCustomGeometryNormalsRenderService.js";

function _getNormals(index, param) {
  var customGeometryRecord = param[/* customGeometryRecord */6];
  return ReallocatedPointsGeometryService$Wonderjs.getFloat32PointData(BufferCustomGeometryService$Wonderjs.getInfoIndex(index), customGeometryRecord[/* normals */2], customGeometryRecord[/* normalsInfos */6]);
}

function getNormals(index, state) {
  var match = NormalsRenderCustomGeometryService$Wonderjs.hasNormals(index, state[/* customGeometryRecord */6]);
  if (match) {
    return _getNormals(index, state);
  } else {
    return ComputeCustomGeometryNormalsRenderService$Wonderjs.computeVertexNormals(index, state);
  }
}

export {
  _getNormals ,
  getNormals ,
  
}
/* BufferCustomGeometryService-Wonderjs Not a pure module */
