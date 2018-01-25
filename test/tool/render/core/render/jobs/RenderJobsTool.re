let _getDefaultRenderConfig = () => RenderConfigTool.buildRenderConfig();

let initWithJobConfig = (sandbox) =>
  TestTool.initWithJobConfig(
    ~sandbox,
    ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
    ~logicConfig=LogicConfigTool.buildLogicConfig(),
    ~renderConfig=_getDefaultRenderConfig(),
    ()
  );

let initWithJobConfigWithoutBuildFakeDom = (sandbox) =>
  TestTool.initWithJobConfigWithoutBuildFakeDom(
    ~sandbox,
    ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
    ~logicConfig=LogicConfigTool.buildLogicConfig(),
    ~renderConfig=_getDefaultRenderConfig(),
    ()
  );

let initWithJobConfigAndBufferConfig = (sandbox, bufferConfig) =>
  TestTool.initWithJobConfig(
    ~sandbox,
    ~bufferConfig,
    ~logicConfig=LogicConfigTool.buildLogicConfig(),
    ~renderConfig=_getDefaultRenderConfig(),
    ()
  );

let prepareGameObject = (sandbox, state) => {
  open GameObject;
  open BasicMaterial;
  open BoxGeometry;
  open MeshRenderer;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer)
};

let initSystemAndRender = (state: StateDataType.state) =>
  state |> JobSystem.init |> DirectorTool.initSystem |> WebGLRenderTool.init;

let updateSystem = (state: StateDataType.state) => state |> DirectorTool.updateSystem;

let passGl = (sandbox, state: StateDataType.state) =>
  state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

let buildConfigData = (~flags=None, ~shader=None, ()) => (flags, shader);