open StateRenderType;

open TransformType;

open BoxGeometryType;

open CustomGeometryType;

open BasicMaterialType;

open AmbientLightType;

open DirectionLightType;

open PointLightType;

open RenderSourceInstanceType;

open DeviceManagerType;

open RenderShaderType;

open RenderSettingType;

let createRenderState =
    (
      {
        settingRecord,
        gpuDetectRecord,
        glslSenderRecord,
        programRecord,
        ambientLightRecord,
        directionLightRecord,
        pointLightRecord,
        sourceInstanceRecord,
        vboBufferRecord,
        typeArrayPoolRecord,
        globalTempRecord,
        deviceManagerRecord,
        shaderRecord
      } as state: StateDataMainType.state
    ) => {
  let {
        localToWorldMatrices,
        localPositions,
        /* copiedLocalToWorldMatrices,
           copiedLocalPositions, */
        localToWorldMatrixCacheMap,
        normalMatrixCacheMap
      } as transformRecord =
    RecordTransformMainService.getRecord(state);
  /* let {vertices, normals, indices} = RecordBoxGeometryMainService.getRecord(state); */
  let boxGeometryRecord = RecordBoxGeometryMainService.getRecord(state);
  /* let {vertices, normals, indices, verticesInfoArray, normalsInfoArray, indicesInfoArray} = */
  let customGeometryRecord = RecordCustomGeometryMainService.getRecord(state);
  /* let {colors} = RecordBasicMaterialMainService.getRecord(state); */
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  let lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  /* let {index, colors} = ambientLightRecord;
     let {index, colors, intensities} = directionLightRecord;
     let {index, colors, intensities, constants, linears, quadratics, ranges} = pointLightRecord; */
  /* let {
       objectInstanceTransformArrayMap,
       matrixInstanceBufferCapacityMap,
       matrixFloat32ArrayMap,
       isTransformStaticMap,
       isSendTransformMatrixDataMap
     } = sourceInstanceRecord; */
  let isUseWorker = WorkerDetectMainService.isUseWorker(state);
  let renderStateTransformRecord: RenderTransformType.transformRecord =
    isUseWorker ?
      {
        localToWorldMatrices:
          transformRecord |> CopyTransformService.unsafeGetCopiedLocalToWorldMatrices,
        localPositions: transformRecord |> CopyTransformService.unsafeGetCopiedLocalPositions,
        localToWorldMatrixCacheMap,
        normalMatrixCacheMap
      } :
      {localToWorldMatrices, localPositions, localToWorldMatrixCacheMap, normalMatrixCacheMap};
  {
    glslSenderRecord,
    programRecord,
    boxGeometryRecord: {
      vertices: boxGeometryRecord.vertices,
      normals: boxGeometryRecord.normals,
      indices: boxGeometryRecord.indices
    },
    customGeometryRecord: {
      vertices: customGeometryRecord.vertices,
      normals: customGeometryRecord.normals,
      indices: customGeometryRecord.indices,
      verticesInfoArray: customGeometryRecord.verticesInfoArray,
      normalsInfoArray: customGeometryRecord.normalsInfoArray,
      indicesInfoArray: customGeometryRecord.indicesInfoArray
    },
    cameraRecord: OperateRenderMainService.getCameraRecord(state),
    basicMaterialRecord: {
      shaderIndices: basicMaterialRecord.shaderIndices,
      colors: basicMaterialRecord.colors
    },
    lightMaterialRecord: {
      shaderIndices: lightMaterialRecord.shaderIndices,
      diffuseColors: lightMaterialRecord.diffuseColors,
      specularColors: lightMaterialRecord.specularColors,
      shininess: lightMaterialRecord.shininess
    },
    ambientLightRecord: {index: ambientLightRecord.index, colors: ambientLightRecord.colors},
    directionLightRecord: {
      index: directionLightRecord.index,
      colors: directionLightRecord.colors,
      intensities: directionLightRecord.intensities,
      positionMap:
        PositionLightMainService.buildPositionMap(
          directionLightRecord.index,
          PositionDirectionLightMainService.getPosition,
          state
        )
    },
    pointLightRecord: {
      index: pointLightRecord.index,
      colors: pointLightRecord.colors,
      intensities: pointLightRecord.intensities,
      constants: pointLightRecord.constants,
      linears: pointLightRecord.linears,
      quadratics: pointLightRecord.quadratics,
      ranges: pointLightRecord.ranges,
      positionMap:
        PositionLightMainService.buildPositionMap(
          pointLightRecord.index,
          PositionPointLightMainService.getPosition,
          state
        )
    },
    vboBufferRecord,
    typeArrayPoolRecord,
    transformRecord: renderStateTransformRecord,
    sourceInstanceRecord: {
      objectInstanceTransformArrayMap: sourceInstanceRecord.objectInstanceTransformArrayMap,
      matrixInstanceBufferCapacityMap: sourceInstanceRecord.matrixInstanceBufferCapacityMap,
      matrixFloat32ArrayMap: sourceInstanceRecord.matrixFloat32ArrayMap,
      isTransformStaticMap: sourceInstanceRecord.isTransformStaticMap,
      isSendTransformMatrixDataMap: sourceInstanceRecord.isSendTransformMatrixDataMap
    },
    gpuDetectRecord,
    globalTempRecord,
    deviceManagerRecord,
    shaderRecord: {index: shaderRecord.index},
    settingRecord: {gpu: Some(OperateSettingService.unsafeGetGPU(settingRecord))},
    workerDetectRecord: {isUseWorker: isUseWorker}
  }
};