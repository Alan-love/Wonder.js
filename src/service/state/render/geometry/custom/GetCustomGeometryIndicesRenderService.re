open StateRenderType;

open RenderCustomGeometryType;

open GeometryType;

open ReallocatedPointsGeometryService;

let getIndices =
  [@bs]
  (
    (index: int, {customGeometryRecord}) => {
      let {indices, indicesInfoArray} = customGeometryRecord;
      getUint16PointData(index, indices, indicesInfoArray)
    }
  );

let getIndicesCount =
  [@bs]
  (
    (index, {customGeometryRecord}) => {
      let {indicesInfoArray} = customGeometryRecord;
      let {startIndex, endIndex} =
        ReallocatedPointsGeometryService.getInfo(indicesInfoArray, index);
      endIndex - startIndex
    }
  );