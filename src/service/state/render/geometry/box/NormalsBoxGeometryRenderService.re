open StateRenderType;

let getNormals =
  [@bs]
  (
    (index, {boxGeometryRecord}) =>
      OperateTypeArrayBoxGeometryService.getNormalsTypeArray(index, boxGeometryRecord.normals)
  );