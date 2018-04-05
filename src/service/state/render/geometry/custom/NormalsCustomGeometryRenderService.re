open StateRenderType;

open CustomGeometryType;

open ReallocatedPointsGeometryService;

let getNormals =
  [@bs]
  (
    (index, {customGeometryRecord}) => {
      let {normals, normalsInfoArray} = customGeometryRecord;
      getFloat32PointData(index, normals, normalsInfoArray)
    }
  );