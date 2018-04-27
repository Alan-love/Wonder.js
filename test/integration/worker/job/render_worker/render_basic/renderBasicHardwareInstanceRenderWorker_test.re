open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test render basic hardware instance in render worker",
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
                  ~transformDataBufferCount=500,
                  ~basicMaterialDataBufferCount=50,
                  ~customGeometryPointDataBufferCount=300,
                  ()
                ),
              ()
            )
        }
      );
      afterEach(() => TestToolWorker.clear(sandbox));
      describe(
        "use program",
        () => {
          open Wonder_jest;
          open Expect;
          open Expect.Operators;
          open Sinon;
          let _prepareForUseProgram = (sandbox, state) => {
            let (state, _, _) =
              RenderBasicHardwareInstanceRenderWorkerTool.prepare(sandbox, state);
            let program = Obj.magic(1);
            let createProgram =
              createEmptyStubWithJsObjSandbox(sandbox) |> onCall(0) |> returns(program);
            let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlToolWorker.setFakeGl(
                   FakeGlToolWorker.buildFakeGl(~sandbox, ~createProgram, ~useProgram, ())
                 );
            (state, program, createProgram, useProgram)
          };
          testPromise(
            "create program and use program only once",
            () => {
              let (state, program, createProgram, useProgram) =
                _prepareForUseProgram(sandbox, state^);
              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                ~state,
                ~sandbox,
                ~completeFunc=(_) => createProgram |> getCallCount |> expect == 1 |> resolve,
                ()
              )
            }
          );
          testPromise(
            "only use sourceInstance's gameObject's program",
            () => {
              let (state, program, createProgram, useProgram) =
                _prepareForUseProgram(sandbox, state^);
              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                ~state,
                ~sandbox,
                ~completeFunc=(_) => useProgram |> expect |> toCalledWith([|program|]) |> resolve,
                ()
              )
            }
          )
        }
      );
      describe(
        "send instance data",
        () =>
          describe(
            "send sourceInstance gameObject's and objectInstanceGameObject gameObjects' model matrices",
            () => {
              let _prepare = (sandbox, state) => {
                let (
                  state,
                  gameObject,
                  (geometry, material, meshRenderer, sourceInstance, objectInstanceGameObject)
                ) =
                  RenderBasicHardwareInstanceRenderWorkerTool.prepare(sandbox, state);
                (state, gameObject, sourceInstance, objectInstanceGameObject)
              };
              testPromise(
                "buffer sub data",
                () => {
                  let (state, gameObject, sourceInstance, objectInstanceGameObject) =
                    _prepare(sandbox, state^);
                  let sourceTransform =
                    state |> GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject);
                  let objectTransform =
                    state
                    |> GameObjectAPI.unsafeGetGameObjectTransformComponent(
                         objectInstanceGameObject
                       );
                  let pos1 = (1., 2., 3.);
                  let pos2 = (2., 4., 5.);
                  let state =
                    state
                    |> TransformAPI.setTransformLocalPosition(sourceTransform, pos1)
                    |> TransformAPI.setTransformLocalPosition(objectInstanceGameObject, pos2);
                  let array_buffer = 1;
                  let bufferSubData = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlToolWorker.setFakeGl(
                         FakeGlToolWorker.buildFakeGl(~sandbox, ~array_buffer, ~bufferSubData, ())
                       );
                  RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                    ~state,
                    ~sandbox,
                    ~completeFunc=
                      (_) => {
                        let data = Js.Typed_array.Float32Array.fromLength(64 * 16);
                        let transformArr = [|sourceTransform, objectTransform|];
                        ArrayService.range(0, 1)
                        |> WonderCommonlib.ArrayService.reduceOneParam(
                             [@bs]
                             (
                               (offset, index) => {
                                 let transform = transformArr[index];
                                 TypeArrayService.fillFloat32ArrayWithOffset(
                                   data,
                                   TransformTool.getLocalToWorldMatrixTypeArray(transform, state),
                                   offset
                                 );
                                 offset + 16
                               }
                             ),
                             0
                           )
                        |> ignore;
                        ArrayService.range(2, 63)
                        |> WonderCommonlib.ArrayService.reduceOneParam(
                             [@bs]
                             (
                               (offset, index) => {
                                 TypeArrayService.fillFloat32ArrayWithOffset(
                                   data,
                                   Js.Typed_array.Float32Array.make([|
                                     0.,
                                     0.,
                                     0.,
                                     0.,
                                     0.,
                                     0.,
                                     0.,
                                     0.,
                                     0.,
                                     0.,
                                     0.,
                                     0.,
                                     0.,
                                     0.,
                                     0.,
                                     0.
                                   |]),
                                   offset
                                 );
                                 offset + 16
                               }
                             ),
                             32
                           )
                        |> ignore;
                        bufferSubData
                        |> withThreeArgs(array_buffer, 0, data)
                        |> expect
                        |> toCalledOnce
                        |> resolve
                      },
                    ()
                  )
                }
              );
              describe(
                "fix bug",
                () =>
                  describe(
                    "test create new sourceInstance gameObject after first loop",
                    () =>
                      describe(
                        "handle instance data position",
                        () => {
                          let _prepareGetAttribLocationForHandleInstanceData = (sandbox, state) => {
                            let pos1 = 1;
                            let pos2 = 2;
                            let pos3 = 3;
                            let pos4 = 4;
                            let getAttribLocation =
                              GLSLLocationTool.getAttribLocation(~pos=pos1, sandbox, "a_mVec4_0");
                            getAttribLocation
                            |> withTwoArgs(Sinon.matchAny, "a_mVec4_1")
                            |> returns(pos2)
                            |> ignore;
                            getAttribLocation
                            |> withTwoArgs(Sinon.matchAny, "a_mVec4_2")
                            |> returns(pos3)
                            |> ignore;
                            getAttribLocation
                            |> withTwoArgs(Sinon.matchAny, "a_mVec4_3")
                            |> returns(pos4)
                            |> ignore;
                            (state, pos1, pos2, pos3, pos4, getAttribLocation)
                          };
                          testPromise(
                            "vertexAttribDivisorANGLE 1",
                            () => {
                              let renderWorkerState =
                                RenderWorkerStateTool.createState()
                                |> InstanceRenderWorkerTool.setGPUDetectDataAllowHardwareInstance(
                                     sandbox
                                   )
                                |> RenderWorkerStateTool.setState;
                              let vertexAttribDivisorANGLE =
                                Obj.magic(
                                  InstanceRenderWorkerTool.getExtensionInstancedArrays(
                                    renderWorkerState
                                  )##vertexAttribDivisorANGLE
                                );
                              let (state, _, _, _) = CameraTool.createCameraGameObject(state^);
                              let (state, pos1, pos2, pos3, pos4, getAttribLocation) =
                                _prepareGetAttribLocationForHandleInstanceData(sandbox, state);
                              let state =
                                state
                                |> FakeGlToolWorker.setFakeGl(
                                     FakeGlToolWorker.buildFakeGl(~sandbox, ~getAttribLocation, ())
                                   );
                              MainStateTool.setState(state);
                              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                                ~state,
                                ~sandbox,
                                ~completeFunc=
                                  (_) => {
                                    let state = MainStateTool.unsafeGetState();
                                    let (state, gameObject2, componentTuple) =
                                      RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(
                                        sandbox,
                                        state
                                      );
                                    let state = GameObjectAPI.initGameObject(gameObject2, state);
                                    RenderJobsRenderWorkerTool.mainLoopAndRender(
                                      ~completeFunc=
                                        (_) =>
                                          (
                                            vertexAttribDivisorANGLE
                                            |> withTwoArgs(pos1, 1)
                                            |> getCallCount,
                                            vertexAttribDivisorANGLE
                                            |> withTwoArgs(pos2, 1)
                                            |> getCallCount,
                                            vertexAttribDivisorANGLE
                                            |> withTwoArgs(pos3, 1)
                                            |> getCallCount,
                                            vertexAttribDivisorANGLE
                                            |> withTwoArgs(pos4, 1)
                                            |> getCallCount
                                          )
                                          |> expect == (1, 1, 1, 1)
                                          |> resolve,
                                      ~state,
                                      ~sandbox,
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
          )
      )
    }
  );