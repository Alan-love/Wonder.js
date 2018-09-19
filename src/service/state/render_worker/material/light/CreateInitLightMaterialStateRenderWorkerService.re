open StateInitLightMaterialType;

open RenderWorkerLightMaterialType;

let createInitMaterialState =
    (
      {
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      } as state: StateDataRenderWorkerType.renderWorkerState,
    ) => {
  let directionLightRecord =
    RecordDirectionLightRenderWorkerService.getRecord(state);
  let pointLightRecord = RecordPointLightRenderWorkerService.getRecord(state);
  let {index, disposedIndexArray} =
    RecordLightMaterialRenderWorkerService.getRecord(state);
  {
    directionLightRecord: {
      index: directionLightRecord.index,
      renderLightArr:
        RecordRenderWorkerDirectionLightService.getRenderLightArr(
          directionLightRecord,
        ),
    },
    pointLightRecord: {
      index: pointLightRecord.index,
    },
    materialRecord: {
      index,
      disposedIndexArray,
      shaderIndices:
        RecordLightMaterialRenderWorkerService.unsafeGetShaderIndices(state),
      diffuseMapUnits:
        RecordLightMaterialRenderWorkerService.unsafeGetDiffuseMapUnits(
          state,
        ),
      specularMapUnits:
        RecordLightMaterialRenderWorkerService.unsafeGetSpecularMapUnits(
          state,
        ),
    },
    renderConfigRecord:
      RecordRenderConfigRenderWorkerService.getRecord(state),
    shaderRecord,
    programRecord,
    glslRecord,
    glslSenderRecord,
    glslLocationRecord,
    glslChunkRecord,
  };
};