let initWithJobConfigWithoutBuildFakeDom = (sandbox, noWorkerJobRecord) =>
   TestTool.initWithJobConfigWithoutBuildFakeDom(
     ~sandbox,
     ~noWorkerJobRecord,
     /* ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)), */
     ()
   );
let initWithJobConfig = (sandbox, noWorkerJobRecord) =>
  TestTool.initWithJobConfig(~sandbox, ~noWorkerJobRecord, ());

let prepareGameObject = (sandbox, state) => {
  open GameObjectAPI; open GameObjectAPI;
  open BasicMaterialAPI;
  open BoxGeometryAPI;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectBoxGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry, material)
};

let exec = (state: MainStateDataType.state) => InitRenderJobTool.exec(state);

let prepareForJudgeGLSLNotExec = (sandbox, state) => {
  open Sinon;
  let (state, gameObject, _, _) = prepareGameObject(sandbox, state);
  let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ~createProgram, ()));
  (state, shaderSource, gameObject)
};

let prepareForJudgeGLSL = (sandbox, state) => {
  let (state, shaderSource, _) = prepareForJudgeGLSLNotExec(sandbox, state);
  let state = state |> exec;
  shaderSource
};