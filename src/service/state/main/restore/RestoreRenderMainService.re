open StateDataMainType;

open RenderType;

let restore = (currentState, targetState) => {
  let {basicRenderObjectRecord, lightRenderObjectRecord, textureRecord} =
    RecordRenderMainService.getRecord(targetState);
  {
    ...targetState,
    renderRecord:
      Some({
        basicRenderObjectRecord,
        lightRenderObjectRecord,
        cameraRecord: None,
        textureRecord,
      }),
  };
};