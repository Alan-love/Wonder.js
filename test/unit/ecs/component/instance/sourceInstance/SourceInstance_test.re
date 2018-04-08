open Wonder_jest;

let _ =
  describe(
    "SourceInstance",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "getSourceInstanceObjectInstanceTransformArray",
        () =>
          test(
            "get objectInstance transform array",
            () => {
              let (state, _) = TransformAPI.createTransform(state^);
              let (state, gameObject, sourceInstance, objectInstanceGameObject, objectInstance) =
                ObjectInstanceTool.createObjectInstanceGameObject(state);
              SourceInstanceAPI.getSourceInstanceObjectInstanceTransformArray(
                sourceInstance,
                state
              )
              |>
              expect == [|
                          GameObjectAPI.unsafeGetGameObjectTransformComponent(
                            objectInstanceGameObject,
                            state
                          )
                        |]
            }
          )
      );
      describe(
        "getGameObject",
        () =>
          test(
            "get component's gameObject",
            () => {
              let (state, gameObject, sourceInstance, objectInstanceGameObject, objectInstance) =
                ObjectInstanceTool.createObjectInstanceGameObject(state^);
              SourceInstanceTool.getGameObject(sourceInstance, state) |> expect == Some(gameObject)
            }
          )
      );
      describe(
        "unsafeGetGameObject",
        () =>
          test(
            "unsafe get component's gameObject",
            () => {
              let (state, gameObject, sourceInstance, objectInstanceGameObject, objectInstance) =
                ObjectInstanceTool.createObjectInstanceGameObject(state^);
              SourceInstanceAPI.unsafeGetSourceInstanceGameObject(sourceInstance, state)
              |> expect == gameObject
            }
          )
      );
      describe(
        "dispose component",
        () => {
          describe(
            "dispose data",
            () => {
              test(
                "remove from sourceInstanceListMap, matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap, isTransformStaticMap, isSendTransformMatrixDataMap, gameObjectMap",
                () => {
                  open SourceInstanceType;
                  let (state, gameObject, sourceInstance) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                         gameObject,
                         sourceInstance
                       );
                  let {
                    objectInstanceTransformArrayMap,
                    matrixFloat32ArrayMap,
                    matrixInstanceBufferCapacityMap,
                    isTransformStaticMap,
                    isSendTransformMatrixDataMap,
                    gameObjectMap
                  } =
                    SourceInstanceTool.getSourceInstanceRecord(state);
                  (
                    objectInstanceTransformArrayMap
                    |> WonderCommonlib.SparseMapService.has(sourceInstance),
                    matrixFloat32ArrayMap |> WonderCommonlib.SparseMapService.has(sourceInstance),
                    matrixInstanceBufferCapacityMap
                    |> WonderCommonlib.SparseMapService.has(sourceInstance),
                    isTransformStaticMap |> WonderCommonlib.SparseMapService.has(sourceInstance),
                    isSendTransformMatrixDataMap
                    |> WonderCommonlib.SparseMapService.has(sourceInstance),
                    gameObjectMap |> WonderCommonlib.SparseMapService.has(sourceInstance)
                  )
                  |> expect == (false, false, false, false, false, false)
                }
              );
              test(
                "remove from buffer map",
                () => {
                  open VboBufferType;
                  let (state, gameObject, sourceInstance) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                         gameObject,
                         sourceInstance
                       );
                  let {matrixInstanceBufferMap} = VboBufferTool.getVboBufferRecord(state);
                  matrixInstanceBufferMap
                  |> WonderCommonlib.SparseMapService.has(sourceInstance)
                  |> expect == false
                }
              );
              describe(
                "dispose all objectInstance gameObjects",
                () =>
                  describe(
                    "should dispose all components",
                    () => {
                      test(
                        "dispose transform component",
                        () => {
                          open TransformType;
                          let (
                            state,
                            gameObject,
                            sourceInstance,
                            objectInstanceGameObjectArr,
                            objectInstanceArr
                          ) =
                            ObjectInstanceTool.createObjectInstanceGameObjectArr(2, state^);
                          let objectInstanceGameObject1 = objectInstanceGameObjectArr[0];
                          let objectInstanceGameObject2 = objectInstanceGameObjectArr[1];
                          let transform1 =
                            GameObjectAPI.unsafeGetGameObjectTransformComponent(
                              objectInstanceGameObject1,
                              state
                            );
                          let transform2 =
                            GameObjectAPI.unsafeGetGameObjectTransformComponent(
                              objectInstanceGameObject2,
                              state
                            );
                          let state =
                            state
                            |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                                 gameObject,
                                 sourceInstance
                               );
                          (
                            TransformTool.isDisposed(transform1, state),
                            TransformTool.isDisposed(transform2, state)
                          )
                          |> expect == (true, true)
                        }
                      );
                      test(
                        "dispose objectInstance component",
                        () => {
                          open TransformType;
                          let (
                            state,
                            gameObject,
                            sourceInstance,
                            objectInstanceGameObjectArr,
                            objectInstanceArr
                          ) =
                            ObjectInstanceTool.createObjectInstanceGameObjectArr(2, state^);
                          let objectInstanceGameObject1 = objectInstanceGameObjectArr[0];
                          let objectInstanceGameObject2 = objectInstanceGameObjectArr[1];
                          let objectInstance1 = objectInstanceArr[0];
                          let objectInstance2 = objectInstanceArr[1];
                          state
                          |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                               gameObject,
                               sourceInstance
                             );
                          (
                            ObjectInstanceTool.isDisposed(objectInstance1, state),
                            ObjectInstanceTool.isDisposed(objectInstance2, state)
                          )
                          |> expect == (true, true)
                        }
                      )
                    }
                  )
              )
            }
          );
          describe(
            "test add new one after dispose old one",
            () => {
              test(
                "use disposed index as new index firstly",
                () => {
                  open SourceInstanceType;
                  let (state, gameObject1, sourceInstance1) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                         gameObject1,
                         sourceInstance1
                       );
                  let (state, gameObject2, sourceInstance2) =
                    SourceInstanceTool.createSourceInstanceGameObject(state);
                  sourceInstance2 |> expect == sourceInstance1
                }
              );
              test(
                "if has no disposed index, get index from sourceInstanceRecord.index",
                () => {
                  open SourceInstanceType;
                  let (state, gameObject1, sourceInstance1) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                         gameObject1,
                         sourceInstance1
                       );
                  let (state, _, sourceInstance2) =
                    SourceInstanceTool.createSourceInstanceGameObject(state);
                  let (state, _, sourceInstance3) =
                    SourceInstanceTool.createSourceInstanceGameObject(state);
                  (sourceInstance2, sourceInstance3)
                  |> expect == (sourceInstance1, sourceInstance1 + 1)
                }
              )
            }
          );
          describe(
            "contract check",
            () =>
              test(
                "expect dispose the alive component, but actual not",
                () => {
                  open SourceInstanceType;
                  let (state, gameObject1, sourceInstance1) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                         gameObject1,
                         sourceInstance1
                       );
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                             gameObject1,
                             sourceInstance1
                           );
                      ()
                    }
                  )
                  |> toThrowMessage("expect dispose the alive component, but actual not")
                }
              )
          )
        }
      )
    }
  );