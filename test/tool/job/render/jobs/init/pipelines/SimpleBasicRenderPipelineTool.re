let initWithJobConfig = (sandbox) =>
  TestTool.initWithJobConfig(
    ~sandbox,
    ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
    ~logicJobConfig=LogicJobConfigTool.buildLogicJobConfig(),
    ~renderJobConfig=
      RenderJobConfigTool.buildRenderJobConfig(
        ~renderSetting={|
    {
    "init_pipeline": "simple_basic_render",
    "render_pipeline": "simple_basic_render"
}
|},
        ()
      ),
    ()
  );

let prepareForJudgeGLSL = (sandbox, state) => {
  open Sinon;
  let (state, _, _, _) = InitBasicMaterialJobTool.prepareGameObject(sandbox, state);
  let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ~createProgram, ()));
  let state = state |> JobSystem.init |> GeometryTool.initGeometrys |> WebGLRenderTool.init;
  shaderSource
};