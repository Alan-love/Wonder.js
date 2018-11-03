open StateInitLightMaterialType;

open LightMaterialType;

let createInitMaterialState =
    (
      (index, disposedIndexArray),
      {
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      } as state: StateDataMainType.state,
    )
    : StateInitLightMaterialType.initLightMaterialState => {
  let {shaderIndices, diffuseMapUnits, specularMapUnits} =
    RecordLightMaterialMainService.getRecord(state);

  let directionLightRecord = RecordDirectionLightMainService.getRecord(state);
  let pointLightRecord = RecordPointLightMainService.getRecord(state);

  {
    directionLightRecord: {
      index: directionLightRecord.index,
      renderLightArr: directionLightRecord.renderLightArr,
    },
    pointLightRecord: {
      index: pointLightRecord.index,
      renderLightArr: pointLightRecord.renderLightArr,
    },
    materialRecord: {
      index,
      disposedIndexArray,
      shaderIndices,
      diffuseMapUnits,
      specularMapUnits,
    },
    renderConfigRecord: RecordRenderConfigMainService.getRecord(state),
    shaderRecord,
    programRecord,
    glslRecord,
    glslSenderRecord,
    glslLocationRecord,
    glslChunkRecord,
  };
};