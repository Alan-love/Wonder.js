open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "State",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _prepareMeshRendererState = (state) => {
        let (state, gameObject1, meshRenderer1) = MeshRendererTool.createGameObject(state^);
        let (state, gameObject2, meshRenderer2) = MeshRendererTool.createGameObject(state);
        let (state, gameObject3, meshRenderer3) = MeshRendererTool.createGameObject(state);
        let state =
          state |> GameObject.disposeGameObjectMeshRendererComponent(gameObject3, meshRenderer3);
        (state, gameObject1, gameObject2, gameObject3, meshRenderer1, meshRenderer2, meshRenderer3)
      };
      let _prepareTransformState = (state) => {
        let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
        let (state, gameObject2, transform2) = GameObjectTool.createGameObject(state);
        let (state, gameObject3, transform3) = GameObjectTool.createGameObject(state);
        let state =
          Transform.setTransformParent(Js.Nullable.return(transform1), transform2, state);
        let pos1 = (1., 2., 3.);
        let pos2 = (2., 4., 10.);
        let pos3 = ((-1.), 4., 5.);
        let state = Transform.setTransformLocalPosition(transform1, pos1, state);
        let state = Transform.setTransformLocalPosition(transform2, pos2, state);
        let state = Transform.setTransformLocalPosition(transform3, pos3, state);
        let state =
          state |> GameObject.disposeGameObjectTransformComponent(gameObject3, transform3);
        (state, gameObject1, gameObject2, gameObject3, transform1, transform2, transform3)
      };
      let _prepareCameraControllerState = (state) => {
        open PerspectiveCamera;
        let (state, gameObject1, _, cameraController1) =
          CameraControllerTool.createCameraGameObject(state^);
        let (state, gameObject2, _, cameraController2) =
          CameraControllerTool.createCameraGameObject(state);
        let (state, gameObject3, _, cameraController3) =
          CameraControllerTool.createCameraGameObject(state);
        let state = state |> setPerspectiveCameraNear(cameraController2, 0.2);
        let state = state |> setPerspectiveCameraFar(cameraController2, 100.);
        let state = state |> setPerspectiveCameraFar(cameraController3, 100.);
        let state = state |> setPerspectiveCameraAspect(cameraController1, 1.);
        let state = state |> setPerspectiveCameraAspect(cameraController2, 2.);
        let state = state |> setPerspectiveCameraFovy(cameraController2, 60.);
        let state = state |> CameraControllerTool.update;
        let state =
          state
          |> GameObject.disposeGameObjectCameraControllerComponent(gameObject3, cameraController3);
        (
          state,
          gameObject1,
          gameObject2,
          gameObject3,
          cameraController1,
          cameraController2,
          cameraController3
        )
      };
      let _prepareGeometryState = (state) => {
        open Geometry;
        open Js.Typed_array;
        let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
        let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
        let (state, gameObject3, geometry3) = BoxGeometryTool.createGameObject(state);
        let state = GeometryTool.initGeometrys(state);
        let state = state |> setGeometryVertices(geometry2, Float32Array.make([|3., 5., 5.|]));
        let state = state |> setGeometryIndices(geometry2, Uint16Array.make([|1, 2, 4|]));
        (state, gameObject1, gameObject2, gameObject3, geometry1, geometry2, geometry3)
      };
      let _prepareVboBufferState = (state) => {
        open VboBufferType;
        let {
          vertexBufferMap,
          elementArrayBufferMap,
          modelMatrixInstanceBufferMap,
          vertexArrayBufferPool,
          elementArrayBufferPool,
          modelMatrixInstanceBufferPool
        } =
          VboBufferTool.getVboBufferData(state);
        let buffer1 = Obj.magic(0);
        let buffer2 = Obj.magic(1);
        let buffer3 = Obj.magic(2);
        vertexArrayBufferPool |> Js.Array.push(buffer1) |> ignore;
        elementArrayBufferPool |> Js.Array.push(buffer2) |> ignore;
        modelMatrixInstanceBufferPool |> Js.Array.push(buffer3) |> ignore;
        let geometry1 = 0;
        let bufferInMap1 = Obj.magic(10);
        let bufferInMap2 = Obj.magic(11);
        let bufferInMap3 = Obj.magic(12);
        vertexBufferMap |> WonderCommonlib.SparseMapSystem.set(geometry1, bufferInMap1);
        elementArrayBufferMap |> WonderCommonlib.SparseMapSystem.set(geometry1, bufferInMap2);
        modelMatrixInstanceBufferMap
        |> WonderCommonlib.SparseMapSystem.set(geometry1, bufferInMap3);
        (state, geometry1, (bufferInMap1, bufferInMap2, bufferInMap3), (buffer1, buffer2, buffer3))
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "deepCopyState",
        () => {
          describe(
            "deep copy meshRenderer data",
            () => {
              test(
                "copied data should equal to source data",
                () => {
                  open MeshRendererType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    meshRenderer1,
                    meshRenderer2,
                    meshRenderer3
                  ) =
                    _prepareMeshRendererState(state);
                  let copiedState = StateTool.deepCopyState(state);
                  MeshRendererTool.getMeshRendererData(copiedState)
                  |>
                  expect == {
                              index: 3,
                              renderGameObjectArray: [|gameObject1, gameObject2|],
                              gameObjectMap: [|
                                gameObject1,
                                gameObject2,
                                Js.Undefined.empty |> Obj.magic
                              |],
                              disposedIndexArray: [|meshRenderer3|]
                            }
                }
              );
              test(
                "change copied state shouldn't affect source state",
                () => {
                  open MeshRendererType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    meshRenderer1,
                    meshRenderer2,
                    meshRenderer3
                  ) =
                    _prepareMeshRendererState(state);
                  let copiedState = StateTool.deepCopyState(state);
                  let data = MeshRendererTool.getMeshRendererData(copiedState);
                  data.index = 0;
                  data.renderGameObjectArray |> Js.Array.pop |> ignore;
                  data.gameObjectMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(meshRenderer2);
                  data.disposedIndexArray |> Js.Array.pop |> ignore;
                  MeshRendererTool.getMeshRendererData(state)
                  |>
                  expect == {
                              index: 3,
                              renderGameObjectArray: [|gameObject1, gameObject2|],
                              gameObjectMap: [|
                                gameObject1,
                                gameObject2,
                                Js.Undefined.empty |> Obj.magic
                              |],
                              disposedIndexArray: [|meshRenderer3|]
                            }
                }
              )
            }
          );
          describe(
            "deep copy transform data",
            () =>
              describe(
                "change copied state shouldn't affect source state",
                () => {
                  test(
                    "test copied data",
                    () => {
                      open TransformType;
                      let (
                        state,
                        gameObject1,
                        gameObject2,
                        gameObject3,
                        transform1,
                        transform2,
                        transform3
                      ) =
                        _prepareTransformState(state);
                      let _ = Transform.getTransformPosition(transform2, state);
                      let copiedState = StateTool.deepCopyState(state);
                      let data = TransformTool.getTransformData(copiedState);
                      data.localPositionMap
                      |> Obj.magic
                      |> WonderCommonlib.SparseMapSystem.deleteVal(transform2);
                      TransformTool.getTransformData(state).localPositionMap
                      |>
                      expect == [|
                                  TransformTool.getTransformLocalPositionTypeArray(
                                    transform1,
                                    state
                                  ),
                                  TransformTool.getTransformLocalPositionTypeArray(
                                    transform2,
                                    state
                                  ),
                                  Js.Undefined.empty |> Obj.magic
                                |]
                    }
                  );
                  test(
                    "clean localToWorldMatrixTypeArrayPool, localPositionTypeArrayPool",
                    () => {
                      open TransformType;
                      let (
                        state,
                        gameObject1,
                        gameObject2,
                        gameObject3,
                        transform1,
                        transform2,
                        transform3
                      ) =
                        _prepareTransformState(state);
                      let _ = Transform.getTransformPosition(transform2, state);
                      let copiedState = StateTool.deepCopyState(state);
                      let {localToWorldMatrixTypeArrayPool, localPositionTypeArrayPool} =
                        TransformTool.getTransformData(copiedState);
                      (localToWorldMatrixTypeArrayPool, localPositionTypeArrayPool)
                      |> expect == ([||], [||])
                    }
                  )
                }
              )
          );
          describe(
            "deep copy geometry data",
            () =>
              describe(
                "change copied state shouldn't affect source state",
                () => {
                  test(
                    "test copied data",
                    () => {
                      open StateDataType;
                      let (
                        state,
                        gameObject1,
                        gameObject2,
                        gameObject3,
                        geometry1,
                        geometry2,
                        geometry3
                      ) =
                        _prepareGeometryState(state);
                      let copiedState = StateTool.deepCopyState(state);
                      let data = GeometryTool.getGeometryData(copiedState);
                      data.verticesMap
                      |> Obj.magic
                      |> WonderCommonlib.SparseMapSystem.deleteVal(geometry2);
                      data.indicesMap
                      |> Obj.magic
                      |> WonderCommonlib.SparseMapSystem.deleteVal(geometry2);
                      let {verticesMap, indicesMap} = GeometryTool.getGeometryData(state);
                      (
                        verticesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry2),
                        indicesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry2)
                      )
                      |>
                      expect == (Float32Array.make([|3., 5., 5.|]), Uint16Array.make([|1, 2, 4|]))
                    }
                  );
                  test(
                    "clean float32ArrayPoolMap, uint16ArrayPoolMap",
                    () => {
                      open StateDataType;
                      let (
                        state,
                        gameObject1,
                        gameObject2,
                        gameObject3,
                        geometry1,
                        geometry2,
                        geometry3
                      ) =
                        _prepareGeometryState(state);
                      let copiedState = StateTool.deepCopyState(state);
                      let {float32ArrayPoolMap, uint16ArrayPoolMap} =
                        GeometryTool.getGeometryData(copiedState);
                      (float32ArrayPoolMap, uint16ArrayPoolMap) |> expect == ([||], [||])
                    }
                  )
                }
              )
          );
          describe(
            "deep copy vbo buffer data",
            () =>
              describe(
                "clean all buffer map and all buffer pool data",
                () =>
                  test(
                    "test copied data",
                    () => {
                      open VboBufferType;
                      let (
                        state,
                        geometry1,
                        (bufferInMap1, bufferInMap2, bufferInMap3),
                        (buffer1, buffer2, buffer3)
                      ) =
                        _prepareVboBufferState(state^);
                      let copiedState = StateTool.deepCopyState(state);
                      let {
                        vertexBufferMap,
                        elementArrayBufferMap,
                        modelMatrixInstanceBufferMap,
                        vertexArrayBufferPool,
                        elementArrayBufferPool,
                        modelMatrixInstanceBufferPool
                      } =
                        VboBufferTool.getVboBufferData(copiedState);
                      (
                        vertexBufferMap,
                        elementArrayBufferMap,
                        modelMatrixInstanceBufferMap,
                        vertexArrayBufferPool,
                        elementArrayBufferPool,
                        modelMatrixInstanceBufferPool
                      )
                      |> expect == ([||], [||], [||], [||], [||], [||])
                    }
                  )
              )
          );
          describe(
            "deep copy cameraController data",
            () => {
              test(
                "copied data should equal to source data",
                () => {
                  open CameraControllerType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    cameraController1,
                    cameraController2,
                    cameraController3
                  ) =
                    _prepareCameraControllerState(state);
                  let cameraControllerData = CameraControllerTool.getCameraControllerData(state);
                  let copiedState = StateTool.deepCopyState(state);
                  CameraControllerTool.getCameraControllerData(copiedState)
                  |> expect == CameraControllerTool.getCameraControllerData(state)
                }
              );
              test(
                "change copied state shouldn't affect source state",
                () => {
                  open CameraControllerType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    cameraController1,
                    cameraController2,
                    cameraController3
                  ) =
                    _prepareCameraControllerState(state);
                  let copiedState = StateTool.deepCopyState(state);
                  let {perspectiveCameraData} as data =
                    CameraControllerTool.getCameraControllerData(copiedState);
                  data.cameraArray
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(cameraController2);
                  data.updateCameraFuncMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(cameraController2);
                  perspectiveCameraData.nearMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(cameraController1);
                  let {cameraArray, updateCameraFuncMap, perspectiveCameraData} =
                    CameraControllerTool.getCameraControllerData(state);
                  (
                    cameraArray,
                    updateCameraFuncMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(cameraController2)
                    |> JudgeTool.isUndefined,
                    perspectiveCameraData.nearMap
                  )
                  |>
                  expect == (
                              [|
                                cameraController1,
                                cameraController2,
                                Js.Undefined.empty |> Obj.magic
                              |],
                              false,
                              [|0.1, 0.2, Js.Undefined.empty |> Obj.magic|]
                            )
                }
              )
            }
          );
          describe(
            "restoreFromState",
            () => {
              let _test = (_prepareState, state) => {
                open TransformType;
                let (state, _, _, _, _, _, _) = _prepareState(state);
                let (currentState, _, _) =
                  GameObjectTool.createGameObject(StateTool.createNewCompleteState());
                let state = StateTool.restoreFromState(currentState, state);
                StateTool.getState() |> expect == state
              };
              describe(
                "restore meshRenderer data to target state",
                () => {
                  let _prepare = (state) => {
                    let (
                      state,
                      gameObject1,
                      gameObject2,
                      gameObject3,
                      meshRenderer1,
                      meshRenderer2,
                      meshRenderer3
                    ) =
                      _prepareMeshRendererState(state);
                    let (currentState, gameObject4, meshRenderer4) =
                      MeshRendererTool.createGameObject(StateTool.createNewCompleteState());
                    (
                      (
                        state,
                        gameObject1,
                        gameObject2,
                        gameObject3,
                        meshRenderer1,
                        meshRenderer2,
                        meshRenderer3
                      ),
                      (currentState, gameObject4, meshRenderer4)
                    )
                  };
                  /* test(
                       "test restore",
                       () => {
                         let ((state, _, _, _, _, _, _), (currentState, _, _)) = _prepare(state);
                         let currentState = StateTool.restoreFromState(currentState, state);
                         currentState |> expect == state
                       }
                     ); */
                  test(
                    "set restored state to stateData",
                    () => {
                      let ((state, _, _, _, _, _, _), (currentState, _, _)) = _prepare(state);
                      let currentState = StateTool.restoreFromState(currentState, state);
                      StateTool.getState() |> expect == currentState
                    }
                  );
                  test(
                    "change restored state should affect source state",
                    () => {
                      let ((state, _, _, _, _, _, _), (currentState, _, _)) = _prepare(state);
                      let currentState = StateTool.restoreFromState(currentState, state);
                      let (currentState, gameObject5, meshRenderer5) =
                        MeshRendererTool.createGameObject(StateTool.createNewCompleteState());
                      state
                      |> MeshRenderer.getMeshRendererGameObject(meshRenderer5)
                      |> expect == gameObject5
                    }
                  );
                  test(
                    "change restored state which is restore from deep copy state shouldn't affect source state",
                    () => {
                      let ((state, gameObject1, gameObject2, _, _, _, _), (currentState, _, _)) =
                        _prepare(state);
                      let currentState =
                        StateTool.restoreFromState(currentState, state |> StateTool.deepCopyState);
                      let (currentState, _, _) = MeshRendererTool.createGameObject(currentState);
                      MeshRendererTool.getMeshRendererData(state).renderGameObjectArray
                      |> expect == [|gameObject1, gameObject2|]
                    }
                  )
                }
              );
              describe(
                "restore transform data to target state",
                () =>
                  describe(
                    "remain current state->transformData->pool data",
                    () =>
                      test(
                        "add current state->transformData->localToWorldMatrixMap, localPositionMap typeArr to pool",
                        () => {
                          open TransformType;
                          let (state, _, _, _, _, _, _) = _prepareTransformState(state);
                          let (currentState, _, transform4) =
                            GameObjectTool.createGameObject(StateTool.createNewCompleteState());
                          let pos4 = ((-1.), 4., 5.);
                          let currentState =
                            Transform.setTransformLocalPosition(transform4, pos4, currentState);
                          let _ = StateTool.restoreFromState(currentState, state);
                          let {localToWorldMatrixTypeArrayPool, localPositionTypeArrayPool} =
                            StateTool.getState() |> TransformTool.getTransformData;
                          (localToWorldMatrixTypeArrayPool, localPositionTypeArrayPool)
                          |>
                          expect == (
                                      [|TransformTool.getDefaultLocalToWorldMatrix()|],
                                      [|TransformTool.changeTupleToTypeArray(pos4)|]
                                    )
                        }
                      )
                  )
              );
              describe(
                "restore geometry data to target state",
                () =>
                  describe(
                    "remain current state->geometryData->pool data",
                    () =>
                      test(
                        "add current state->geometryData->verticesMap, indicesMap typeArr to pool",
                        () => {
                          open StateDataType;
                          let (
                            state,
                            gameObject1,
                            gameObject2,
                            gameObject3,
                            geometry1,
                            geometry2,
                            geometry3
                          ) =
                            _prepareGeometryState(state);
                          let (currentState, gameObject4, geometry4) =
                            BoxGeometryTool.createGameObject(StateTool.createNewCompleteState());
                          let currentState = GeometryTool.initGeometry(geometry4, currentState);
                          let _ = StateTool.restoreFromState(currentState, state);
                          let {float32ArrayPoolMap, uint16ArrayPoolMap} =
                            StateTool.getState() |> GeometryTool.getGeometryData;
                          (
                            float32ArrayPoolMap
                            |> WonderCommonlib.SparseMapSystem.unsafeGet(
                                 BoxGeometryTool.getDefaultVertices() |> Float32Array.length
                               ),
                            uint16ArrayPoolMap
                            |> WonderCommonlib.SparseMapSystem.unsafeGet(
                                 BoxGeometryTool.getDefaultIndices() |> Uint16Array.length
                               )
                          )
                          |>
                          expect == (
                                      BoxGeometryTool.getDefaultVertices(),
                                      BoxGeometryTool.getDefaultIndices()
                                    )
                        }
                      )
                  )
              );
              describe(
                "restore vbo buffer data to target state",
                () => {
                  test(
                    "clean buffer map data",
                    () => {
                      open VboBufferType;
                      let (
                        state,
                        geometry1,
                        (bufferInMap1, bufferInMap2, bufferInMap3),
                        (buffer1, buffer2, buffer3)
                      ) =
                        _prepareVboBufferState(state^);
                      let (currentState, _, _, _) =
                        _prepareVboBufferState(StateTool.createNewCompleteState());
                      let newState = StateTool.restoreFromState(currentState, state);
                      let {vertexBufferMap, elementArrayBufferMap, modelMatrixInstanceBufferMap} =
                        newState |> VboBufferTool.getVboBufferData;
                      (vertexBufferMap, elementArrayBufferMap, modelMatrixInstanceBufferMap)
                      |> expect == ([||], [||], [||])
                    }
                  );
                  describe(
                    "remain current state->vboBufferData->pool data",
                    () =>
                      test(
                        "add current state->vboBufferData->vertexBufferMap, elementArrayBufferMap, modelMatrixInstanceBufferMap buffer to pool",
                        () => {
                          open VboBufferType;
                          let (
                            state,
                            geometry1,
                            (bufferInMap1, bufferInMap2, bufferInMap3),
                            (buffer1, buffer2, buffer3)
                          ) =
                            _prepareVboBufferState(state^);
                          let (
                            currentState,
                            _,
                            (bufferInMap4, bufferInMap5, bufferInMap6),
                            (buffer4, buffer5, buffer6)
                          ) =
                            _prepareVboBufferState(StateTool.createNewCompleteState());
                          let _ = StateTool.restoreFromState(currentState, state);
                          let {
                            vertexArrayBufferPool,
                            elementArrayBufferPool,
                            modelMatrixInstanceBufferPool
                          } =
                            StateTool.getState() |> VboBufferTool.getVboBufferData;
                          (
                            vertexArrayBufferPool,
                            elementArrayBufferPool,
                            modelMatrixInstanceBufferPool
                          )
                          |>
                          expect == (
                                      [|buffer4, bufferInMap4|],
                                      [|buffer5, bufferInMap5|],
                                      [|buffer6, bufferInMap6|]
                                    )
                        }
                      )
                  )
                }
              );
              test(
                "restore cameraController data to target state",
                () => _test(_prepareCameraControllerState, state)
              )
            }
          )
        }
      )
    }
  );