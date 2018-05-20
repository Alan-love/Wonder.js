open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "hot change texture with render worker",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(CreateStateMainService.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestMainWorkerTool.initWithJobConfig(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test change texture",
        () =>
          describe(
            "test basic material",
            () =>
              describe(
                "test map",
                () => {
                  let _prepare = () => {
                    let (
                      state,
                      context,
                      (imageDataArrayBuffer1, imageDataArrayBuffer2),
                      (gameObject1, gameObject2),
                      (map1, map2),
                      (source1, source2)
                    ) =
                      BasicSourceTextureRenderWorkerTool.prepareStateAndCreateTwoGameObjects(sandbox);
                    let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
                    let state =
                      state
                      |> FakeGlWorkerTool.setFakeGl(
                           FakeGlWorkerTool.buildFakeGl(~sandbox, ~bindTexture, ())
                         );
                    (
                      state,
                      context,
                      (imageDataArrayBuffer1, imageDataArrayBuffer2),
                      (gameObject1, gameObject2),
                      (map1, map2),
                      (source1, source2),
                      bindTexture
                    )
                  };
                  beforeAllPromise(() => BasicSourceTextureRenderWorkerTool.buildFakeCreateImageBitmapFunc());
                  afterAllPromise(() => BasicSourceTextureRenderWorkerTool.clearFakeCreateImageBitmapFunc());
                  testPromise(
                    "if the new texture if cached before, not bind",
                    () => {
                      let (
                        state,
                        context,
                        (imageDataArrayBuffer1, imageDataArrayBuffer2),
                        (gameObject1, gameObject2),
                        (map1, map2),
                        (source1, source2),
                        bindTexture
                      ) =
                        _prepare();
                      BrowserDetectTool.setChrome();
                      RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                        ~state,
                        ~sandbox,
                        ~completeFunc=
                          (_) => {
                            let state = MainStateTool.unsafeGetState();
                            let material1 =
                              GameObjectAPI.unsafeGetGameObjectBasicMaterialComponent(
                                gameObject1,
                                state
                              );
                            let state =
                              state |> BasicMaterialAPI.setBasicMaterialMap(material1, map2);
                            RenderJobsRenderWorkerTool.mainLoopAndRender(
                              ~state,
                              ~sandbox,
                              ~completeFunc=
                                (_) => bindTexture |> getCallCount |> expect == 2 |> resolve,
                              ()
                            )
                          },
                        ()
                      )
                    }
                  )
                }
              )
          )
      )
    }
  );