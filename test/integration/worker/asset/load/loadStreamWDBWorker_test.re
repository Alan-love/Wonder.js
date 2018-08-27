open Wonder_jest;

open Js.Promise;

open Js.Typed_array;

let _ =
  describe("load stream wdb in worker", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => TestWorkerTool.clear(sandbox));
    beforeAllPromise(() =>
      BasicSourceTextureRenderWorkerTool.buildFakeCreateImageBitmapFunc()
    );
    afterAllPromise(() =>
      BasicSourceTextureRenderWorkerTool.clearFakeCreateImageBitmapFunc()
    );

    testPromise("aaa", () => {
      let (
        state,
        context,
        (
          imageDataArrayBuffer1,
          imageDataArrayBuffer2,
          imageDataArrayBuffer3,
          imageDataArrayBuffer4,
        ),
        (map1, map2),
        (source1, source2),
      ) =
        BasicSourceTextureRenderWorkerTool.prepareStateAndCreateTwoMaps(
          sandbox,
        );
      let state =
        state
        |> FakeGlWorkerTool.setFakeGl(
             FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
           );

      let (state, gameObject1, material1) =
        BasicMaterialTool.createGameObject(state);
      let state =
        state |> BasicMaterialAPI.setBasicMaterialMap(material1, map1);
      BrowserDetectTool.setChrome();
      RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
        ~state,
        ~sandbox,
        ~completeFunc=
          _ => {
            let state = StateAPI.unsafeGetState();

            let state =
              state
              |> BasicSourceTextureAPI.setBasicSourceTextureSource(
                   map1,
                   source2,
                 );

            RenderJobsRenderWorkerTool.mainLoopAndRender(
              ~state,
              ~sandbox,
              ~completeFunc=
                _ =>
                  BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                    map1,
                    state,
                  )
                  |> expect == source2
                  |> resolve,
              (),
            );
          },
        (),
      );
    });
  });