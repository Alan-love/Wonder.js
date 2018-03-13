open StateDataType;

let _getLightMaterialRenderArray = (renderArray, state: StateDataType.state) =>
  renderArray
  |> Js.Array.filter(
       (uid) =>
         HasComponentGameObjectService.hasLightMaterialComponent(uid, state.gameObjectRecord)
     );

let _render = (gl, state: StateDataType.state) =>
  switch (state |> OperateRenderService.getRenderArray) {
  | None => state
  | Some(renderArray) =>
    state
    |> _getLightMaterialRenderArray(renderArray)
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, uid: int) =>
             if (JudgeInstanceService.isSourceInstance(uid, state)) {
               FrontRenderLightInstanceJobCommon.render(gl, uid, state)
             } else {
               let (state, _, geometryIndex) =
                 [@bs] FrontRenderLightJobCommon.render(gl, uid, state);
               DrawGLSLService.drawElement(
                 (
                   RenderGeometryService.getDrawMode(gl),
                   RenderGeometryService.getIndexType(gl),
                   RenderGeometryService.getIndexTypeSize(gl),
                   IndicesService.getIndicesCount(
                     geometryIndex,
                     state.boxGeometryRecord.indicesMap
                   )
                 ),
                 gl
               );
               state
             }
         ),
         state
       )
  };

let execJob = (flags, _, state) => _render([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord), state);