open StateDataMainType;

let _render = (gl, state: StateDataMainType.state) =>
  switch (state |> OperateRenderMainService.getLightRenderObjectRecord) {
  | None => state
  | Some({
      count,
      transformIndices,
      materialIndices,
      shaderIndices,
      geometryIndices,
      geometryTypes,
      sourceInstanceIndices
    }) =>
    ArrayService.range(0, count - 1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           (state, index) => {
             let transformIndex =
               RenderObjectBufferTypeArrayService.getComponent(index, transformIndices);
             let materialIndex =
               RenderObjectBufferTypeArrayService.getComponent(index, materialIndices);
             let shaderIndex =
               RenderObjectBufferTypeArrayService.getComponent(index, shaderIndices);
             let geometryIndex =
               RenderObjectBufferTypeArrayService.getComponent(index, geometryIndices);
             let geometryType =
               RenderObjectBufferTypeArrayService.getGeometryType(index, geometryTypes);
             let sourceInstance =
               RenderObjectBufferTypeArrayService.getComponent(index, sourceInstanceIndices);
             if (RenderObjectBufferTypeArrayService.hasSourceInstance(sourceInstance)) {
               FrontRenderLightInstanceJobCommon.render(
                 gl,
                 (
                   transformIndex,
                   materialIndex,
                   shaderIndex,
                   geometryIndex,
                   geometryType,
                   sourceInstance
                 ),
                 state
               )
             } else {
               let state =
                 [@bs]
                 FrontRenderLightJobCommon.render(
                   gl,
                   (transformIndex, materialIndex, shaderIndex, geometryIndex, geometryType),
                   state
                 );
               let getIndicesCountFunc =
                 CurrentComponentDataMapRenderService.getGetIndicesCountFunc(geometryType);
               DrawGLSLService.drawElement(
                 (
                   RenderGeometryService.getDrawMode(gl),
                   RenderGeometryService.getIndexType(gl),
                   RenderGeometryService.getIndexTypeSize(gl),
                   getIndicesCountFunc(geometryIndex, state)
                 ),
                 gl
               );
               state
             }
           }
         ),
         CreateRenderStateMainService.createRenderState(state)
       )
    |> ignore;
    state
  };

let execJob = (flags, _, state) =>
  _render([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord), state);