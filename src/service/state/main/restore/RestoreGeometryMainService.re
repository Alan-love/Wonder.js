open StateDataMainType;

open GeometryType;

let _restoreTypeArrays =
    (geometryPointCount, currentGeometryRecord, targetGeometryRecord) =>
  currentGeometryRecord.vertices === targetGeometryRecord.vertices
  && currentGeometryRecord.normals === targetGeometryRecord.normals
  && currentGeometryRecord.texCoords === targetGeometryRecord.texCoords
  && currentGeometryRecord.indices === targetGeometryRecord.indices
  && currentGeometryRecord.indices32 === targetGeometryRecord.indices32
  && currentGeometryRecord.verticesInfos === targetGeometryRecord.verticesInfos
  &&
  currentGeometryRecord.texCoordsInfos === targetGeometryRecord.texCoordsInfos
  && currentGeometryRecord.normalsInfos === targetGeometryRecord.normalsInfos
  && currentGeometryRecord.indicesInfos === targetGeometryRecord.indicesInfos ?
    (currentGeometryRecord, targetGeometryRecord) :
    {
      let (verticesInfos, texCoordsInfos, normalsInfos, indicesInfos) =
        RecordGeometryMainService.setAllInfosDataToDefault(
          currentGeometryRecord.index,
          (
            currentGeometryRecord.verticesInfos,
            currentGeometryRecord.texCoordsInfos,
            currentGeometryRecord.normalsInfos,
            currentGeometryRecord.indicesInfos,
          ),
        );

      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentGeometryRecord.vertices, 0),
        (targetGeometryRecord.copiedVertices, 0),
        targetGeometryRecord.verticesOffset,
      )
      |> ignore;
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentGeometryRecord.texCoords, 0),
        (targetGeometryRecord.copiedTexCoords, 0),
        targetGeometryRecord.texCoordsOffset,
      )
      |> ignore;
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentGeometryRecord.normals, 0),
        (targetGeometryRecord.copiedNormals, 0),
        targetGeometryRecord.normalsOffset,
      )
      |> ignore;
      TypeArrayService.fillUint16ArrayWithUint16Array(
        (currentGeometryRecord.indices, 0),
        (targetGeometryRecord.copiedIndices, 0),
        targetGeometryRecord.indicesOffset,
      )
      |> ignore;
      TypeArrayService.fillUint32ArrayWithUint32Array(
        (currentGeometryRecord.indices32, 0),
        (targetGeometryRecord.copiedIndices32, 0),
        targetGeometryRecord.indices32Offset,
      )
      |> ignore;
      TypeArrayService.fillUint32ArrayWithUint32Array(
        (verticesInfos, 0),
        (targetGeometryRecord.verticesInfos, 0),
        Js.Typed_array.Uint32Array.length(targetGeometryRecord.verticesInfos),
      )
      |> ignore;
      TypeArrayService.fillUint32ArrayWithUint32Array(
        (normalsInfos, 0),
        (targetGeometryRecord.normalsInfos, 0),
        Js.Typed_array.Uint32Array.length(targetGeometryRecord.normalsInfos),
      )
      |> ignore;
      TypeArrayService.fillUint32ArrayWithUint32Array(
        (texCoordsInfos, 0),
        (targetGeometryRecord.texCoordsInfos, 0),
        Js.Typed_array.Uint32Array.length(
          targetGeometryRecord.texCoordsInfos,
        ),
      )
      |> ignore;
      TypeArrayService.fillUint32ArrayWithUint32Array(
        (indicesInfos, 0),
        (targetGeometryRecord.indicesInfos, 0),
        Js.Typed_array.Uint32Array.length(targetGeometryRecord.indicesInfos),
      )
      |> ignore;
      (currentGeometryRecord, targetGeometryRecord);
    };

let restore = (currentState, targetState) => {
  let currentGeometryRecord =
    RecordGeometryMainService.getRecord(currentState);
  let targetGeometryRecord = RecordGeometryMainService.getRecord(targetState);

  let (currentGeometryRecord, targetGeometryRecord) =
    ! currentGeometryRecord.isPointDataDirtyForRestore ?
      (currentGeometryRecord, targetGeometryRecord) :
      _restoreTypeArrays(
        BufferSettingService.getGeometryPointCount(
          currentState.settingRecord,
        ),
        currentGeometryRecord,
        targetGeometryRecord,
      );

  {
    ...targetState,
    geometryRecord:
      Some({
        ...targetGeometryRecord,
        buffer: currentGeometryRecord.buffer,
        vertices: currentGeometryRecord.vertices,
        texCoords: currentGeometryRecord.texCoords,
        normals: currentGeometryRecord.normals,
        indices: currentGeometryRecord.indices,
        indices32: currentGeometryRecord.indices32,
        verticesInfos: currentGeometryRecord.verticesInfos,
        texCoordsInfos: currentGeometryRecord.texCoordsInfos,
        normalsInfos: currentGeometryRecord.normalsInfos,
        indicesInfos: currentGeometryRecord.indicesInfos,
        isPointDataDirtyForRestore: false,
      }),
  };
};