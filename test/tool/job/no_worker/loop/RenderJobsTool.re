/* let _getDefaultRenderJobConfig = () => RenderJobConfigTool.buildRenderJobConfig(); */
let initWithJobConfig = (sandbox, noWorkerJobRecord) =>
  TestTool.initWithJobConfig(
    ~sandbox,
    /* ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)), */
    ~noWorkerJobRecord,
    ()
  )
  |> DirectorTool.prepare;

let initWithJobConfigWithoutBuildFakeDom = (sandbox, noWorkerJobRecord) =>
  TestTool.initWithJobConfigWithoutBuildFakeDom(
    ~sandbox,
    /* ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)), */
    ~noWorkerJobRecord,
    ()
  )
  |> DirectorTool.prepare;

let prepareGameObject = (sandbox, state) => {
  open GameObjectAPI;
  open GameObjectAPI;
  open BasicMaterialAPI;
  open BoxGeometryAPI;
  open MeshRendererAPI;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectBoxGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer)
};

let initSystemAndRender = (state: MainStateDataType.state) =>
  state |> PregetGLSLDataTool.preparePrecision |> DirectorTool.init;

let passGl = (sandbox, state: MainStateDataType.state) =>
  state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

let buildConfigData = (~flags=None, ~shader=None, ()) => (flags, shader);

let prepareForUseProgram = (sandbox, prepareFunc, state) => {
  open Sinon;
  let state = prepareFunc(sandbox, state);
  let program = Obj.magic(1);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox) |> returns(program);
  let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createProgram, ~useProgram, ()));
  (state, program, useProgram)
};

let testSendShaderUniformDataOnlyOnce =
    (sandbox, name, (prepareSendUinformDataFunc, setFakeGlFunc, prepareGameObject), state) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          test(
            "send shader uniform record only once",
            () => {
              let (state, _, gameObjectTransform, cameraTransform, basicCameraView) =
                prepareSendUinformDataFunc(sandbox, prepareGameObject, state^);
              let (state, gameObject2, _, _, _) = prepareGameObject(sandbox, state);
              let uniformDataStub = createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 0;
              let getUniformLocation = GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
              let state = setFakeGlFunc(uniformDataStub, getUniformLocation, state);
              let state = state |> initSystemAndRender |> DirectorTool.runWithDefaultTime;
              uniformDataStub |> withOneArg(pos) |> getCallCount |> expect == 1
            }
          )
        )
      )
    )
  );

let testSendShaderUniformMatrix4DataOnlyOnce =
    (sandbox, name, (prepareSendUinformDataFunc, prepareGameObject), state) =>
  testSendShaderUniformDataOnlyOnce(
    sandbox,
    name,
    (
      prepareSendUinformDataFunc,
      (stub, getUniformLocation, state) =>
        state
        |> FakeGlTool.setFakeGl(
             FakeGlTool.buildFakeGl(~sandbox, ~uniformMatrix4fv=stub, ~getUniformLocation, ())
           ),
      prepareGameObject
    ),
    state
  );

let testSendShaderUniformMatrix3DataOnlyOnce =
    (sandbox, name, (prepareSendUinformDataFunc, prepareGameObject), state) =>
  testSendShaderUniformDataOnlyOnce(
    sandbox,
    name,
    (
      prepareSendUinformDataFunc,
      (stub, getUniformLocation, state) =>
        state
        |> FakeGlTool.setFakeGl(
             FakeGlTool.buildFakeGl(~sandbox, ~uniformMatrix3fv=stub, ~getUniformLocation, ())
           ),
      prepareGameObject
    ),
    state
  );

let testSendShaderUniformVec3DataOnlyOnce =
    (sandbox, name, (prepareSendUinformDataFunc, prepareGameObject), state) =>
  testSendShaderUniformDataOnlyOnce(
    sandbox,
    name,
    (
      prepareSendUinformDataFunc,
      (stub, getUniformLocation, state) =>
        state
        |> FakeGlTool.setFakeGl(
             FakeGlTool.buildFakeGl(~sandbox, ~uniform3f=stub, ~getUniformLocation, ())
           ),
      prepareGameObject
    ),
    state
  );