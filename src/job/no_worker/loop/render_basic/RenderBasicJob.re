open MainStateDataType;

let _getBasicMaterialRenderArray = (renderArray, state: MainStateDataType.state) =>
  renderArray
  |> Js.Array.filter(
       (uid) =>
         HasComponentGameObjectService.hasBasicMaterialComponent(uid, state.gameObjectRecord)
     );

let _render = (gl, state: MainStateDataType.state) =>
  switch (state |> OperateRenderMainService.getRenderArray) {
  | None => state
  | Some(renderArray) =>
    state
    |> _getBasicMaterialRenderArray(renderArray)
    |> ReduceStateMainService.reduceState(
         [@bs]
         (
           (state, uid: int) =>
             if (JudgeInstanceMainService.isSourceInstance(uid, state)) {
               RenderBasicInstanceJobCommon.render(gl, uid, state)
             } else {
               let (state, _, geometryIndex) = [@bs] RenderBasicJobCommon.render(gl, uid, state);
               DrawGLSLMainService.drawElement(
                 (
                   RenderGeometryService.getDrawMode(gl),
                   RenderGeometryService.getIndexType(gl),
                   RenderGeometryService.getIndexTypeSize(gl),
                   IndicesBoxGeometryMainService.getIndicesCount(geometryIndex, state)
                 ),
                 gl
               );
               state
             }
         ),
         state
       )
  };

let execJob = (flags, _, state) =>
  _render([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord), state);