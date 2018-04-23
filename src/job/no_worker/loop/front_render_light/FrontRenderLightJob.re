open StateDataMainType;

let _render = (gl, state: StateDataMainType.state) =>
  switch (state |> OperateRenderMainService.getLightRenderObjectRecord) {
  | None => state
  | Some({
      count,
      transformIndices,
      materialIndices,
      geometryIndices,
      geometryTypes,
      sourceInstanceIndices
    }) =>
    FrontRenderLightJobUtils.render(
      gl,
      (
        count,
        transformIndices,
        materialIndices,
        geometryIndices,
        geometryTypes,
        sourceInstanceIndices
      ),
      CreateRenderStateMainService.createRenderState(state)
    )
    |> ignore;
    state
  };

let execJob = (flags, state) =>
  _render([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord), state);