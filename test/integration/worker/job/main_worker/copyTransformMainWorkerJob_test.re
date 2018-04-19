open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test copy transform main worker job",
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
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~transformDataBufferCount=5,
                  ~basicMaterialDataBufferCount=5,
                  ()
                ),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "if change transform data in main worker during render in render worker, the transform data in render worker shouldn't change",
        () =>
          testPromise(
            "test",
            () => {
              let (state, _, (gameObjectTransform, _), _, _) =
                GLSLSenderTool.JudgeSendUniformData.prepareSendUniformData(
                  sandbox,
                  RenderBasicJobTool.prepareGameObject,
                  state^
                );
              let state =
                state |> TransformAPI.setTransformLocalPosition(gameObjectTransform, (1., 2., 3.));
              let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 0;
              let getUniformLocation =
                GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_mMatrix");
              let state =
                state
                |> FakeGlToolWorker.setFakeGl(
                     FakeGlToolWorker.buildFakeGl(
                       ~sandbox,
                       ~uniformMatrix4fv,
                       ~getUniformLocation,
                       ()
                     )
                   );
              let state = MainStateTool.setState(state);
              RenderJobsRenderWorkerTool.initAndLoop(
                ~completeFunc=
                  (state) =>
                    uniformMatrix4fv
                    |> withOneArg(pos)
                    |> expect
                    |> toCalledWith([|
                         pos,
                         Obj.magic(Js.false_),
                         Obj.magic(
                           Js.Typed_array.Float32Array.make([|
                             1.,
                             0.,
                             0.,
                             0.,
                             0.,
                             1.,
                             0.,
                             0.,
                             0.,
                             0.,
                             1.,
                             0.,
                             1.,
                             2.,
                             3.,
                             1.
                           |])
                         )
                       |])
                    |> resolve,
                ~state,
                ~beforeExecRenderRenderWorkerJobsFunc=
                  (state) =>
                    state
                    |> TransformAPI.setTransformLocalPosition(gameObjectTransform, (10., 1., 2.))
                    |> TransformTool.update(gameObjectTransform)
                    |> MainStateTool.setState
                    |> ignore,
                ()
              )
            }
          )
      )
    }
  );