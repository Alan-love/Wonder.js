open StateRenderType;

open TransformType;

open GeometryType;

open BasicMaterialType;

open SceneType;

open DirectionLightType;

open PointLightType;

open RenderSourceInstanceType;

open RenderArrayBufferViewSourceTextureType;

open DeviceManagerType;

open RenderSettingType;

open BrowserDetectType;

let createRenderState =
    (
      {
        settingRecord,
        gpuDetectRecord,
        glslSenderRecord,
        programRecord,
        vboBufferRecord,
        typeArrayPoolRecord,
        globalTempRecord,
        deviceManagerRecord,
        shaderRecord,
        browserDetectRecord,
      } as state: StateDataMainType.state,
    ) => {
  let {localToWorldMatrices, localToWorldMatrixCacheMap, normalMatrixCacheMap} as transformRecord =
    RecordTransformMainService.getRecord(state);
  let geometryRecord = RecordGeometryMainService.getRecord(state);
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  let lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  let directionLightRecord = RecordDirectionLightMainService.getRecord(state);
  let pointLightRecord = RecordPointLightMainService.getRecord(state);
  let meshRendererRecord = RecordMeshRendererMainService.getRecord(state);
  let basicSourceTextureRecord =
    RecordBasicSourceTextureMainService.getRecord(state);
  let arrayBufferViewSourceTextureRecord =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  let sourceInstanceRecord = RecordSourceInstanceMainService.getRecord(state);
  let isUseWorker = WorkerDetectMainService.isUseWorker(state);
  let renderStateTransformRecord: RenderTransformType.transformRecord =
    isUseWorker ?
      {
        localToWorldMatrices:
          transformRecord
          |> CopyTransformService.unsafeGetCopiedLocalToWorldMatrices,
        localToWorldMatrixCacheMap,
        normalMatrixCacheMap,
      } :
      {localToWorldMatrices, localToWorldMatrixCacheMap, normalMatrixCacheMap};
  {
    glslSenderRecord,
    programRecord,
    geometryRecord: {
      vertices: geometryRecord.vertices,
      texCoords: geometryRecord.texCoords,
      normals: geometryRecord.normals,
      indices: geometryRecord.indices,
      indices32: geometryRecord.indices32,
      verticesInfos: geometryRecord.verticesInfos,
      texCoordsInfos: geometryRecord.texCoordsInfos,
      normalsInfos: geometryRecord.normalsInfos,
      indicesInfos: geometryRecord.indicesInfos,
      indicesTypeMap: geometryRecord.indicesTypeMap,
    },
    cameraRecord: OperateRenderMainService.getCameraRecord(state),
    basicMaterialRecord: {
      shaderIndices: basicMaterialRecord.shaderIndices,
      colors: basicMaterialRecord.colors,
      textureIndices: basicMaterialRecord.textureIndices,
      mapUnits: basicMaterialRecord.mapUnits,
    },
    lightMaterialRecord: {
      shaderIndices: lightMaterialRecord.shaderIndices,
      diffuseColors: lightMaterialRecord.diffuseColors,
      specularColors: lightMaterialRecord.specularColors,
      shininess: lightMaterialRecord.shininess,
      textureIndices: lightMaterialRecord.textureIndices,
      diffuseMapUnits: lightMaterialRecord.diffuseMapUnits,
      specularMapUnits: lightMaterialRecord.specularMapUnits,
    },
    meshRendererRecord: {
      drawModes: meshRendererRecord.drawModes,
    },
    basicSourceTextureRecord: {
      wrapSs: basicSourceTextureRecord.wrapSs,
      wrapTs: basicSourceTextureRecord.wrapTs,
      magFilters: basicSourceTextureRecord.magFilters,
      minFilters: basicSourceTextureRecord.minFilters,
      formats: basicSourceTextureRecord.formats,
      types: basicSourceTextureRecord.types,
      isNeedUpdates: basicSourceTextureRecord.isNeedUpdates,
      flipYs: basicSourceTextureRecord.flipYs,
      sourceMap: basicSourceTextureRecord.sourceMap,
      glTextureMap: basicSourceTextureRecord.glTextureMap,
      bindTextureUnitCacheMap:
        basicSourceTextureRecord.bindTextureUnitCacheMap,
      setFlipYFunc: OperateSourceTextureMainService.setFlipY,
    },
    arrayBufferViewSourceTextureRecord: {
      wrapSs: arrayBufferViewSourceTextureRecord.wrapSs,
      wrapTs: arrayBufferViewSourceTextureRecord.wrapTs,
      magFilters: arrayBufferViewSourceTextureRecord.magFilters,
      minFilters: arrayBufferViewSourceTextureRecord.minFilters,
      formats: arrayBufferViewSourceTextureRecord.formats,
      types: arrayBufferViewSourceTextureRecord.types,
      isNeedUpdates: arrayBufferViewSourceTextureRecord.isNeedUpdates,
      flipYs: arrayBufferViewSourceTextureRecord.flipYs,
      widths: arrayBufferViewSourceTextureRecord.widths,
      heights: arrayBufferViewSourceTextureRecord.heights,
      sourceMap: arrayBufferViewSourceTextureRecord.sourceMap,
      glTextureMap: arrayBufferViewSourceTextureRecord.glTextureMap,
      bindTextureUnitCacheMap:
        arrayBufferViewSourceTextureRecord.bindTextureUnitCacheMap,
      textureIndexOffset:
        IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
          state,
        ),
      setFlipYFunc: OperateSourceTextureMainService.setFlipY,
    },
    sceneRecord: {
      ambientLight: {
        color: AmbientLightSceneMainService.getAmbientLightColor(state),
      },
    },
    directionLightRecord: {
      index: directionLightRecord.index,
      colors: directionLightRecord.colors,
      intensities: directionLightRecord.intensities,
      directionMap:
        DirectionDirectionLightMainService.buildDirectionMap(
          DirectionDirectionLightMainService.getDirection,
          state,
        ),
      renderLightArr: directionLightRecord.renderLightArr,
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
          PositionPointLightMainService.getPosition,
          state,
        ),
      renderLightArr: pointLightRecord.renderLightArr,
    },
    vboBufferRecord,
    typeArrayPoolRecord,
    transformRecord: renderStateTransformRecord,
    /* sourceInstanceRecord: {
         objectInstanceTransformCollections: sourceInstanceRecord.objectInstanceTransformCollections,
         matrixInstanceBufferCapacityMap: sourceInstanceRecord.matrixInstanceBufferCapacityMap,
         matrixFloat32ArrayMap: sourceInstanceRecord.matrixFloat32ArrayMap,
         isTransformStatics: sourceInstanceRecord.isTransformStatics,
         isSendTransformMatrixDataMap: sourceInstanceRecord.isSendTransformMatrixDataMap
       }, */
    sourceInstanceRecord: {
      objectInstanceTransformCollections:
        sourceInstanceRecord.objectInstanceTransformCollections,
      objectInstanceTransformIndexMap:
        sourceInstanceRecord.objectInstanceTransformIndexMap,
      isTransformStatics: sourceInstanceRecord.isTransformStatics,
      matrixInstanceBufferCapacityMap:
        sourceInstanceRecord.matrixInstanceBufferCapacityMap,
      matrixFloat32ArrayMap: sourceInstanceRecord.matrixFloat32ArrayMap,
      isSendTransformMatrixDataMap:
        sourceInstanceRecord.isSendTransformMatrixDataMap,
    },
    gpuDetectRecord,
    globalTempRecord,
    deviceManagerRecord,
    settingRecord: {
      gpu: Some(OperateSettingService.unsafeGetGPU(settingRecord)),
      instanceBuffer:
        Some({
          objectInstanceCountPerSourceInstance:
            BufferSettingService.getObjectInstanceCountPerSourceInstance(
              settingRecord,
            ),
        }),
      textureCountPerMaterial:
        Some(BufferSettingService.getTextureCountPerMaterial(settingRecord)),
    },
    workerDetectRecord: {
      isUseWorker: isUseWorker,
    },
    browserDetectRecord: {
      browser: browserDetectRecord.browser,
    },
  };
};