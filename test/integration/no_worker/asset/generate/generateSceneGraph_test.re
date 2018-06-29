open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("generateSceneGraph by gameObject", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeAllPromise(() => ConvertTool.buildFakeLoadImage());
    beforeEach(() => {
      sandbox := createSandbox();

      state :=
        TestTool.initWithoutBuildFakeDom(
          ~sandbox,
          ~buffer=
            SettingTool.buildBufferConfigStr(
              ~customGeometryPointCount=50000,
              ~customGeometryCount=10,
              (),
            ),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("generate asset", () =>
      testPromise("test", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
          {|"asset":{"version":"2.0", "generator":"GLTF2WD"}|},
          state,
        );
      })
    );

    describe("generate scene", () =>
      testPromise("test", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
          {|"scene": 0, "scenes":[{"extensions":{"KHR_lights":{"light":0}},"nodes":[0]}]|},
          state,
        );
      })
    );
  });