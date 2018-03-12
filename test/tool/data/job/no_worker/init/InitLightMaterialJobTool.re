/* let initWithJobConfigWithoutBuildFakeDom = (sandbox) =>
   TestTool.initWithJobConfigWithoutBuildFakeDom(
     ~sandbox,
     ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
     ()
   ); */
let initWithJobConfig = (sandbox, noWorkerJobConfig) =>
  TestTool.initWithJobConfig(~sandbox, ~noWorkerJobConfig, ());

let prepareGameObject = (sandbox, state) => {
  open GameObject; open GameObjectAPI;
  open LightMaterialAPI;
  open BoxGeometryAPI;
  open Sinon;
  let (state, material) = createLightMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectLightMaterialComponent(gameObject, material)
    |> addGameObjectBoxGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry, material)
};

/* let exec = (state: StateDataType.state) =>
   state
   |> GeometryTool.initGeometrys
   |> AllMaterialTool.pregetGLSLData
   |> LightMaterialSystem.init([@bs] DeviceManagerSystem.unsafeGetGl(state)); */
let exec = (state: StateDataType.state) => InitRenderJobTool.exec(state);

let prepareForJudgeGLSLNotExec = (prepareGameObjectFunc, sandbox, state) => {
  open Sinon;
  let (state, gameObject, _, _) = prepareGameObjectFunc(sandbox, state);
  let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ~createProgram, ()));
  (state, shaderSource, gameObject)
};

let prepareForJudgeGLSL = (~prepareGameObjectFunc=prepareGameObject, sandbox, state) => {
  let (state, shaderSource, _) = prepareForJudgeGLSLNotExec(prepareGameObjectFunc, sandbox, state);
  let state = state |> exec;
  shaderSource
};