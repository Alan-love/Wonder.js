open Wonder_jest;

open Js.Promise;

let _ =
  describe("test dispose and send dispose data main worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestMainWorkerTool.initWithJobConfig(
          ~sandbox,
          ~buffer=
            SettingTool.buildBufferConfigStr(~sourceInstanceCount=2, ()),
          (),
        );
    });
    afterEach(() => TestWorkerTool.clear(sandbox));
    describe("not dispose the data of render worker state", () =>
      describe("dispose components", () => {
        describe("test disposeGameObjectBoxGeometryComponent", () =>
          describe("dispose data in dispose job", () =>
            describe("not dispose main worker state->vbo buffer data", () =>
              testPromise("not add buffer to pool", () => {
                open VboBufferType;
                let (state, gameObject1, geometry1) =
                  DisposeForNoWorkerAndWorkerJobTool.prepareForDisposeCustomGeometryVboBuffer(
                    state,
                  );
                let state =
                  state
                  |> FakeGlWorkerTool.setFakeGl(
                       FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
                     );
                let state = MainStateTool.setState(state);
                RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                  ~state,
                  ~sandbox,
                  ~completeFunc=
                    postMessageToRenderWorker => {
                      let state = MainStateTool.unsafeGetState();
                      let {vertexArrayBufferPool, elementArrayBufferPool} =
                        VboBufferTool.getVboBufferRecord(state);
                      (
                        vertexArrayBufferPool
                        |> WonderCommonlib.SparseMapService.has(geometry1),
                        elementArrayBufferPool
                        |> WonderCommonlib.SparseMapService.has(geometry1),
                      )
                      |> expect == (false, false)
                      |> resolve;
                    },
                  (),
                );
              })
            )
          )
        );
        describe("test disposeGameObjectSourceInstanceComponent", () =>
          describe("dispose data in dispose job", () =>
            describe(
              "not dispose main worker state->matrixFloat32ArrayMap data", () =>
              testPromise("not add typeArray to pool", () => {
                let (state, gameObject, sourceInstance) =
                  SourceInstanceTool.createSourceInstanceGameObject(state^);
                InstanceRenderWorkerTool.setGPUDetectDataAllowHardwareInstance(
                  sandbox,
                );
                let state =
                  state
                  |> FakeGlWorkerTool.setFakeGl(
                       FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
                     );
                let state = MainStateTool.setState(state);
                RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                  ~state,
                  ~sandbox,
                  ~completeFunc=
                    _ => {
                      GameObjectAPI.disposeGameObject(
                        gameObject,
                        MainStateTool.unsafeGetState(),
                      )
                      |> MainStateTool.setState;
                      RenderJobsRenderWorkerTool.mainLoopAndRender(
                        ~state,
                        ~sandbox,
                        ~completeFunc=
                          _ => {
                            open SourceInstanceType;
                            let state = MainStateTool.unsafeGetState();
                            TypeArrayPoolTool.getFloat32ArrayPoolMap(
                              state.typeArrayPoolRecord,
                            )
                            |> SparseMapService.length
                            |> expect == 0
                            |> resolve;
                          },
                        (),
                      );
                    },
                  (),
                );
              })
            )
          )
        );
      })
    );
    describe("dispose gameObjects", () => {
      let _prepare = state =>
        DisposeForNoWorkerAndWorkerJobTool.prepareForDisposeGameObjects(
          state,
        );
      describe("test disposeGameObject", () =>
        testPromise("dispose data", () => {
          let (state, gameObject1, gameObject2) = _prepare(state);
          let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
          let state =
            state
            |> FakeGlWorkerTool.setFakeGl(
                 FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
               );
          let state = MainStateTool.setState(state);
          RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
            ~state,
            ~sandbox,
            ~completeFunc=
              postMessageToRenderWorker =>
                MainStateTool.unsafeGetState()
                |> MeshRendererTool.getBasicMaterialRenderArray
                |> Js.Array.length
                |> expect === 1
                |> resolve,
            (),
          );
        })
      );
      /* testPromise(
           "test dispose sourceInstance gameObject",
           () => {
             let (state, gameObject, _) =
               RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(
                 sandbox,
                 state^
               );
             let state = state |> GameObjectAPI.disposeGameObject(gameObject);
             WorkerWorkerTool.setFakeWorkersAndSetState(state);
             WorkerJobWorkerTool.execMainWorkerJob(
               ~execJobFunc=DisposeAndSendDisposeDataMainWorkerJob.execJob,
               ~completeFunc=(state) => 1 |> expect == 1 |> resolve,
               ()
             )
           }
         ) */
    });
    describe("send data to render worker", () =>
      testPromise("send dispose data", () => {
        let (
          state,
          (gameObject1, gameObject2, gameObject3),
          (geometry1, geometry2, geometry3),
        ) =
          DisposeForNoWorkerAndWorkerJobTool.prepareCustomGeometryGameObjects(
            state,
          );
        let (state, gameObject4, (geometry4, _, _, sourceInstance4, _)) =
          RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(
            sandbox,
            state,
          );
        let (state, gameObject5, (geometry5, _, _, sourceInstance5, _)) =
          FrontRenderLightHardwareInstanceTool.createSourceInstanceGameObject(
            sandbox,
            state,
          );
        let state =
          state
          |> GameObjectAPI.batchDisposeGameObject([|
               gameObject1,
               gameObject2,
               gameObject3,
               gameObject4,
               gameObject5,
             |]);
        let state =
          state
          |> FakeGlWorkerTool.setFakeGl(
               FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
             );
        let state = MainStateTool.setState(state);
        RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
          ~state,
          ~sandbox,
          ~completeFunc=
            postMessageToRenderWorker =>
              postMessageToRenderWorker
              |> expect
              |> toCalledWith([|
                   {
                     "operateType": "DISPOSE",
                     "customGeometryNeedDisposeVboBufferArr": [|
                       geometry1,
                       geometry2,
                       geometry3,
                       geometry4,
                       geometry5,
                     |],
                     "sourceInstanceNeedDisposeVboBufferArr": [|
                       sourceInstance4,
                       sourceInstance5,
                     |],
                   },
                 |])
              |> resolve,
          (),
        );
      })
    );
  });