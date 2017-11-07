let initWithRenderConfig = () =>
  TestTool.initWithRenderConfig(
    ~bufferConfig=
      Js.Nullable.return({
        "transformDataBufferCount": Js.Nullable.undefined,
        "geometryPointDataBufferCount": Js.Nullable.return(1000),
        "basicMaterialDataBufferCount": Js.Nullable.undefined
      }),
    ~renderConfig=
      RenderConfigTool.buildRenderConfig(
        ~renderSetting={|
    {
    "platform": "pc",
    "browser": [
        {
            "name": "chrome",
            "version": "newest"
        },
        {
            "name": "firefox",
            "version": "newest"
        }
    ],
    "backend": {
        "name": "webgl1"
    },
    "init_pipeline": "simple_basic_render",
    "render_pipeline": "simple_basic_render"
}
|},
        ()
      ),
    ()
  );

let prepareForJudgeGLSL = (sandbox, state) => {
  open GameObject;
  open BasicMaterial;
  open BoxGeometry;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry);
  let shaderSource = createEmptyStub(refJsObjToSandbox(sandbox^));
  let createProgram = createEmptyStub(refJsObjToSandbox(sandbox^));
  let state =
    state
    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ~createProgram, ()));
  let state = state |> GeometryTool.initGeometrys;
  let state = state |> WebGLRenderSystem.init;
  shaderSource
};