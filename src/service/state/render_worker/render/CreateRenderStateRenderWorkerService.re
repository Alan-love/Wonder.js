open StateRenderType;

open GPUDetectType;

open RenderWorkerGeometryType;

open RenderWorkerSettingType;

open RenderWorkerBasicMaterialType;

open RenderWorkerLightMaterialType;

open RenderWorkerMeshRendererType;

open RenderWorkerSceneType;

open RenderWorkerDirectionLightType;

open RenderWorkerPointLightType;

open RenderWorkerBasicSourceTextureType;

open RenderWorkerSourceInstanceType;

open RenderWorkerTransformType;

open RenderWorkerRenderType;

open RenderWorkerWorkerDetectType;

open DeviceManagerType;

open ShaderType;

let createRenderState =
    (
      {
        settingRecord,
        gpuDetectRecord,
        glslSenderRecord,
        programRecord,
        renderRecord,
        vboBufferRecord,
        typeArrayPoolRecord,
        globalTempRecord,
        deviceManagerRecord,
        sourceInstanceRecord,
        shaderRecord,
        browserDetectRecord,
      } as state: StateDataRenderWorkerType.renderWorkerState,
    ) => {
  let {localToWorldMatrices, localToWorldMatrixCacheMap, normalMatrixCacheMap} as transformRecord =
    RecordTransformRenderWorkerService.getRecord(state);
  let geometryRecord = RecordGeometryRenderWorkerService.getRecord(state);
  let basicMaterialRecord =
    RecordBasicMaterialRenderWorkerService.getRecord(state);
  let lightMaterialRecord =
    RecordLightMaterialRenderWorkerService.getRecord(state);
  let meshRendererRecord =
    RecordMeshRendererRenderWorkerService.getRecord(state);
  let directionLightRecord =
    RecordDirectionLightRenderWorkerService.getRecord(state);
  let pointLightRecord = RecordPointLightRenderWorkerService.getRecord(state);

  let basicSourceTextureRecord =
    RecordBasicSourceTextureRenderWorkerService.getRecord(state);
  let arrayBufferViewSourceTextureRecord =
    RecordArrayBufferViewSourceTextureRenderWorkerService.getRecord(state);
  let workerDetectRecord =
    RecordWorkerDetectRenderWorkerService.getRecord(state);
  let browserDetectRecord =
    RecordBrowserDetectRenderWorkerService.getRecord(state);
  let {
    objectInstanceTransformCollections,
    matrixInstanceBufferCapacityMap,
    matrixFloat32ArrayMap,
    isTransformStatics,
    isSendTransformMatrixDataMap,
  } = sourceInstanceRecord;
  {
    sceneRecord: {
      ambientLight: {
        color:
          AmbientLightSceneRenderWorkerService.getAmbientLightColor(state),
      },
    },
    settingRecord: {
      gpu: settingRecord.gpu,
      instanceBuffer:
        Some({
          objectInstanceCountPerSourceInstance:
            BufferRenderWorkerSettingService.getObjectInstanceCountPerSourceInstance(
              settingRecord,
            ),
        }),
      textureCountPerMaterial:
        BufferRenderWorkerSettingService.getTextureCountPerMaterial(
          settingRecord,
        ),
    },
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
    cameraRecord: OperateRenderRenderWorkerService.getCameraRecord(state),
    basicMaterialRecord: {
      shaderIndices:
        RecordBasicMaterialRenderWorkerService.unsafeGetShaderIndices(state),
      colors: basicMaterialRecord.colors |> OptionService.unsafeGet,
      textureIndices:
        basicMaterialRecord.textureIndices |> OptionService.unsafeGet,
      mapUnits:
        RecordBasicMaterialRenderWorkerService.unsafeGetMapUnits(state),
    },
    lightMaterialRecord: {
      shaderIndices:
        RecordLightMaterialRenderWorkerService.unsafeGetShaderIndices(state),
      diffuseColors:
        lightMaterialRecord.diffuseColors |> OptionService.unsafeGet,
      specularColors:
        lightMaterialRecord.specularColors |> OptionService.unsafeGet,
      shininess: lightMaterialRecord.shininess |> OptionService.unsafeGet,
      textureIndices:
        lightMaterialRecord.textureIndices |> OptionService.unsafeGet,
      diffuseMapUnits:
        RecordLightMaterialRenderWorkerService.unsafeGetDiffuseMapUnits(
          state,
        ),
      specularMapUnits:
        RecordLightMaterialRenderWorkerService.unsafeGetSpecularMapUnits(
          state,
        ),
    },
    meshRendererRecord: {
      drawModes: meshRendererRecord.drawModes,
    },
    basicSourceTextureRecord: {
      wrapSs: basicSourceTextureRecord.wrapSs |> OptionService.unsafeGet,
      wrapTs: basicSourceTextureRecord.wrapTs |> OptionService.unsafeGet,
      magFilters:
        basicSourceTextureRecord.magFilters |> OptionService.unsafeGet,
      minFilters:
        basicSourceTextureRecord.minFilters |> OptionService.unsafeGet,
      formats: basicSourceTextureRecord.formats |> OptionService.unsafeGet,
      types: basicSourceTextureRecord.types |> OptionService.unsafeGet,
      isNeedUpdates:
        basicSourceTextureRecord.isNeedUpdates |> OptionService.unsafeGet,
      flipYs: basicSourceTextureRecord.flipYs |> OptionService.unsafeGet,
      sourceMap:
        basicSourceTextureRecord.sourceMap
        |> WorkerType.sparseMapImageBitmapToSparseMapImageElement,
      glTextureMap: basicSourceTextureRecord.glTextureMap,
      bindTextureUnitCacheMap:
        basicSourceTextureRecord.bindTextureUnitCacheMap,
      setFlipYFunc: OperateSourceTextureRenderWorkerService.setFlipY,
    },
    arrayBufferViewSourceTextureRecord: {
      wrapSs:
        arrayBufferViewSourceTextureRecord.wrapSs |> OptionService.unsafeGet,
      wrapTs:
        arrayBufferViewSourceTextureRecord.wrapTs |> OptionService.unsafeGet,
      magFilters:
        arrayBufferViewSourceTextureRecord.magFilters
        |> OptionService.unsafeGet,
      minFilters:
        arrayBufferViewSourceTextureRecord.minFilters
        |> OptionService.unsafeGet,
      formats:
        arrayBufferViewSourceTextureRecord.formats |> OptionService.unsafeGet,
      types:
        arrayBufferViewSourceTextureRecord.types |> OptionService.unsafeGet,
      isNeedUpdates:
        arrayBufferViewSourceTextureRecord.isNeedUpdates
        |> OptionService.unsafeGet,
      flipYs:
        arrayBufferViewSourceTextureRecord.flipYs |> OptionService.unsafeGet,
      widths:
        arrayBufferViewSourceTextureRecord.widths |> OptionService.unsafeGet,
      heights:
        arrayBufferViewSourceTextureRecord.heights |> OptionService.unsafeGet,
      sourceMap:
        arrayBufferViewSourceTextureRecord.sourceMap |> OptionService.unsafeGet,
      glTextureMap: arrayBufferViewSourceTextureRecord.glTextureMap,
      bindTextureUnitCacheMap:
        arrayBufferViewSourceTextureRecord.bindTextureUnitCacheMap,
      textureIndexOffset:
        IndexSourceTextureRenderWorkerService.getArrayBufferViewSourceTextureIndexOffset(
          state,
        ),
      setFlipYFunc: OperateSourceTextureRenderWorkerService.setFlipY,
    },
    directionLightRecord: {
      index: directionLightRecord.index,
      colors: directionLightRecord.colors,
      intensities: directionLightRecord.intensities,
      directionMap:
        RecordRenderWorkerDirectionLightService.getDirectionMap(
          directionLightRecord,
        ),
      renderLightArr:
        RecordRenderWorkerDirectionLightService.getRenderLightArr(
          directionLightRecord,
        ),
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
        RecordRenderWorkerPointLightService.getPositionMap(pointLightRecord),
      renderLightArr:
        RecordRenderWorkerPointLightService.getRenderLightArr(
          pointLightRecord,
        ),
    },
    vboBufferRecord,
    typeArrayPoolRecord,
    transformRecord: {
      localToWorldMatrices,
      localToWorldMatrixCacheMap,
      normalMatrixCacheMap,
    },
    sourceInstanceRecord: {
      objectInstanceTransformCollections:
        RecordRenderWorkerSourceInstanceService.unsafeGetObjectInstanceTransformCollections(
          sourceInstanceRecord,
        ),
      objectInstanceTransformIndexMap:
        RecordRenderWorkerSourceInstanceService.unsafeGetObjectInstanceTransformIndexMap(
          sourceInstanceRecord,
        ),
      isTransformStatics:
        RecordRenderWorkerSourceInstanceService.unsafeGetIsTransformStaticMap(
          sourceInstanceRecord,
        ),
      matrixInstanceBufferCapacityMap:
        sourceInstanceRecord.matrixInstanceBufferCapacityMap,
      matrixFloat32ArrayMap: sourceInstanceRecord.matrixFloat32ArrayMap,
      isSendTransformMatrixDataMap:
        sourceInstanceRecord.isSendTransformMatrixDataMap,
    },
    gpuDetectRecord,
    globalTempRecord,
    deviceManagerRecord,
    workerDetectRecord: {
      isUseWorker: workerDetectRecord.isUseWorker,
    },
    browserDetectRecord: {
      browser: browserDetectRecord.browser,
    },
  };
};