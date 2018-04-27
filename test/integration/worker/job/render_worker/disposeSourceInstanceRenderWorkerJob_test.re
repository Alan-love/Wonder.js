open Wonder_jest;

open Js.Promise;

open RenderWorkerSourceInstanceType;

let _ =
  describe(
    "DisposeSourceInstanceRenderWorkerJob",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestToolMainWorker.initWithJobConfig(
              ~sandbox,
              ~buffer=SettingTool.buildBufferConfigStr(),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "dispose sourceInstance data",
        () => {
          let _test = (judgeFunc, state) => {
            let (
              state,
              gameObject,
              (geometry, material, meshRenderer, sourceInstance, objectInstanceGameObject)
            ) =
              RenderBasicHardwareInstanceRenderWorkerTool.prepare(sandbox, state^);
            let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
            createBuffer |> returns(Obj.magic(1));
            let state =
              state
              |> FakeGlToolWorker.setFakeGl(
                   FakeGlToolWorker.buildFakeGl(~sandbox, ~createBuffer, ())
                 );
            let state = MainStateTool.setState(state);
            RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
              ~state,
              ~sandbox,
              ~completeFunc=
                (_) => {
                  GameObjectAPI.disposeGameObject(gameObject, MainStateTool.unsafeGetState())
                  |> MainStateTool.setState;
                  RenderJobsRenderWorkerTool.mainLoopAndDispose(
                    ~state,
                    ~sandbox,
                    ~completeFunc=
                      (_) => {
                        let renderWorkerState = RenderWorkerStateTool.unsafeGetState();
                        judgeFunc(sourceInstance, renderWorkerState) |> resolve
                      },
                    ()
                  )
                },
              ()
            )
          };
          testPromise(
            "add matrixFloat32ArrayMap->typeArray to pool",
            () =>
              _test(
                (sourceInstance, renderWorkerState) =>
                  TypeArrayPoolTool.getFloat32ArrayPoolMap(renderWorkerState.typeArrayPoolRecord)[1024]
                  |> SparseMapService.length
                  |> expect == 1,
                state
              )
          );
          testPromise(
            "remove from matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap, isSendTransformMatrixDataMap",
            () =>
              _test(
                (sourceInstance, renderWorkerState) => {
                  let {
                    matrixFloat32ArrayMap,
                    matrixInstanceBufferCapacityMap,
                    isSendTransformMatrixDataMap
                  } =
                    renderWorkerState.sourceInstanceRecord;
                  (
                    matrixFloat32ArrayMap
                    |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance)
                    |> Obj.magic,
                    matrixInstanceBufferCapacityMap
                    |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance)
                    |> Obj.magic,
                    isSendTransformMatrixDataMap
                    |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance)
                    |> Obj.magic
                  )
                  |> expect == (Js.Undefined.empty, Js.Undefined.empty, Js.Undefined.empty)
                },
                state
              )
          )
        }
      )
    }
  );