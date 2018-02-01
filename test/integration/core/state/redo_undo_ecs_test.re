open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "test redo,undo component data",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _prepareMeshRendererData = (state) => {
        let (state, gameObject1, meshRenderer1) = MeshRendererTool.createGameObject(state^);
        let (state, gameObject2, meshRenderer2) = MeshRendererTool.createGameObject(state);
        let (state, gameObject3, meshRenderer3) = MeshRendererTool.createGameObject(state);
        let state =
          state |> GameObject.disposeGameObjectMeshRendererComponent(gameObject3, meshRenderer3);
        (state, gameObject1, gameObject2, gameObject3, meshRenderer1, meshRenderer2, meshRenderer3)
      };
      let _prepareTransformData = (state) => {
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
      let _prepareCameraControllerData = (state) => {
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
      let _prepareGeometryData = (state) => {
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
      let _prepareBasicMaterialData = (state) => {
        open BasicMaterial;
        open Js.Typed_array;
        let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
        let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
        let (state, gameObject3, material3) = BasicMaterialTool.createGameObject(state);
        let state = AllMaterialTool.prepareForInit(state);
        let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
        let state = BasicMaterialTool.initMaterials([@bs] GlTool.unsafeGetGl(state), state);
        let state = state |> setBasicMaterialColor(material2, [|1., 0.1, 0.2|]);
        (state, gameObject1, gameObject2, gameObject3, material1, material2, material3)
      };
      let _prepareLightMaterialData = (state) => {
        open LightMaterial;
        open Js.Typed_array;
        let (state, gameObject1, material1) = LightMaterialTool.createGameObject(state^);
        let (state, gameObject2, material2) = LightMaterialTool.createGameObject(state);
        let (state, gameObject3, material3) = LightMaterialTool.createGameObject(state);
        let state = AllMaterialTool.prepareForInit(state);
        let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
        let state = LightMaterialTool.initMaterials([@bs] GlTool.unsafeGetGl(state), state);
        /* let diffuseColor2 = [|1., 0.1, 0.2|];
           let specularColor2 = [|0., 0.1, 0.2|];
           let state = state |> setLightMaterialDiffuseColor(material2, diffuseColor2);
           let state = state |> setLightMaterialSpecularColor(material2, specularColor2); */
        (state, gameObject1, gameObject2, gameObject3, material1, material2, material3)
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.initWithJobConfig(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "deepCopyStateForRestore",
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
                    _prepareMeshRendererData(state);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
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
                    _prepareMeshRendererData(state);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
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
            () => {
              test(
                "deep copy localToWorldMatrixMap, localPositionMap",
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
                    _prepareTransformData(state);
                  let _ = Transform.getTransformPosition(transform2, state);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
                  let data = TransformTool.getTransformData(copiedState);
                  data.localToWorldMatrixMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(transform2);
                  data.localPositionMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(transform2);
                  (
                    TransformTool.getTransformData(state).localToWorldMatrixMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(transform2)
                    |> JudgeTool.isUndefined,
                    TransformTool.getTransformData(state).localPositionMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(transform2)
                    |> JudgeTool.isUndefined
                  )
                  |> expect == (false, false)
                }
              );
              test(
                "deep copy childMap",
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
                    _prepareTransformData(state);
                  let _ = Transform.getTransformPosition(transform2, state);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
                  let (copiedState, transform4) = Transform.createTransform(copiedState);
                  let _ =
                    copiedState
                    |> Transform.setTransformParent(Js.Nullable.return(transform4), transform2);
                  state |> Transform.getTransformChildren(transform1) |> expect == [|transform2|]
                }
              )
            }
          );
          describe(
            "deep copy geometry data",
            () =>
              test(
                "change copied state shouldn't affect source state",
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
                    _prepareGeometryData(state);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
                  let data = GeometryTool.getGeometryData(copiedState);
                  data.verticesMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(geometry2);
                  data.normalsMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(geometry2);
                  data.indicesMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(geometry2);
                  let {verticesMap, normalsMap, indicesMap} = GeometryTool.getGeometryData(state);
                  (
                    verticesMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry2)
                    |> JudgeTool.isUndefined,
                    normalsMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry2)
                    |> JudgeTool.isUndefined,
                    indicesMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry2)
                    |> JudgeTool.isUndefined
                  )
                  |> expect == (false, false, false)
                }
              )
          );
          describe(
            "deep copy material data",
            () => {
              describe(
                "test basic material",
                () =>
                  test(
                    "change copied state shouldn't affect source state",
                    () => {
                      open BasicMaterialType;
                      let (
                        state,
                        gameObject1,
                        gameObject2,
                        gameObject3,
                        material1,
                        material2,
                        material3
                      ) =
                        _prepareBasicMaterialData(state);
                      let copiedState = StateTool.deepCopyStateForRestore(state);
                      let data = BasicMaterialTool.getMaterialData(copiedState);
                      data.colorMap
                      |> Obj.magic
                      |> WonderCommonlib.SparseMapSystem.deleteVal(material2);
                      let {colorMap} = BasicMaterialTool.getMaterialData(state);
                      colorMap
                      |> WonderCommonlib.SparseMapSystem.unsafeGet(material2)
                      |> JudgeTool.isUndefined
                      |> expect == false
                    }
                  )
              );
              describe(
                "test light material",
                () =>
                  test(
                    "change copied state shouldn't affect source state",
                    () => {
                      open LightMaterialType;
                      let (
                        state,
                        gameObject1,
                        gameObject2,
                        gameObject3,
                        material1,
                        material2,
                        material3
                      ) =
                        _prepareLightMaterialData(state);
                      let copiedState = StateTool.deepCopyStateForRestore(state);
                      let data = LightMaterialTool.getMaterialData(copiedState);
                      data.diffuseColorMap
                      |> Obj.magic
                      |> WonderCommonlib.SparseMapSystem.deleteVal(material2);
                      data.specularColorMap
                      |> Obj.magic
                      |> WonderCommonlib.SparseMapSystem.deleteVal(material2);
                      let {diffuseColorMap, specularColorMap} =
                        LightMaterialTool.getMaterialData(state);
                      (
                        diffuseColorMap
                        |> WonderCommonlib.SparseMapSystem.unsafeGet(material2)
                        |> JudgeTool.isUndefined,
                        specularColorMap
                        |> WonderCommonlib.SparseMapSystem.unsafeGet(material2)
                        |> JudgeTool.isUndefined
                      )
                      |> expect == (false, false)
                    }
                  )
              )
            }
          );
          describe(
            "deep copy light data",
            () =>
              describe(
                "test ambient light",
                () => {
                  describe(
                    "copy type array data",
                    () =>
                      test(
                        "copy colors",
                        () => {
                          open StateDataType;
                          open SourceInstanceType;
                          let (state, gameObject1, light1) =
                            AmbientLightTool.createGameObject(state^);
                          let color1 = [|1., 1., 0.|];
                          let state = state |> AmbientLight.setAmbientLightColor(light1, color1);
                          let copiedState = StateTool.deepCopyStateForRestore(state);
                          let color2 = [|0., 1., 0.|];
                          let copiedState =
                            copiedState |> AmbientLight.setAmbientLightColor(light1, color2);
                          AmbientLight.getAmbientLightColor(light1, state) |> expect == color1
                        }
                      )
                  );
                  test(
                    "shadow copy mappedIndexMap, gameObjectMap",
                    () =>
                      StateDataType.(
                        AmbientLightType.(
                          StateTool.testShadowCopyArrayLikeMapData(
                            (state) => {
                              let {mappedIndexMap, gameObjectMap} =
                                AmbientLightTool.getLightData(state);
                              [|mappedIndexMap |> Obj.magic, gameObjectMap |> Obj.magic|]
                            },
                            state^
                          )
                        )
                      )
                  )
                }
              )
          );
          describe(
            "deep copy sourceInstance data",
            () => {
              test(
                "deep copy objectInstanceArrayMap, modelMatrixFloat32ArrayMap",
                () => {
                  open StateDataType;
                  open SourceInstanceType;
                  let (state, gameObject1, sourceInstance1) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let {objectInstanceArrayMap, modelMatrixFloat32ArrayMap} =
                    SourceInstanceTool.getSourceInstanceData(state);
                  let originModelMatrixFloat32Array = Float32Array.make([|1.|]);
                  modelMatrixFloat32ArrayMap
                  |> WonderCommonlib.SparseMapSystem.set(
                       sourceInstance1,
                       originModelMatrixFloat32Array
                     )
                  |> ignore;
                  let originObjectInstanceArray = [|20|];
                  objectInstanceArrayMap
                  |> WonderCommonlib.SparseMapSystem.set(
                       sourceInstance1,
                       originObjectInstanceArray
                     )
                  |> ignore;
                  let copiedState = StateTool.deepCopyStateForRestore(state);
                  let {objectInstanceArrayMap, modelMatrixFloat32ArrayMap} =
                    SourceInstanceTool.getSourceInstanceData(copiedState);
                  let objectInstanceArray =
                    objectInstanceArrayMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance1);
                  objectInstanceArray |> Js.Array.push(100) |> ignore;
                  let modelMatrixFloat32Array =
                    modelMatrixFloat32ArrayMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance1);
                  Float32Array.unsafe_set(modelMatrixFloat32Array, 0, 1000.) |> ignore;
                  let {objectInstanceArrayMap, modelMatrixFloat32ArrayMap} =
                    SourceInstanceTool.getSourceInstanceData(state);
                  (
                    objectInstanceArrayMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance1),
                    modelMatrixFloat32ArrayMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance1)
                  )
                  |> expect == (originObjectInstanceArray, originModelMatrixFloat32Array)
                }
              );
              test(
                "shadow copy modelMatrixInstanceBufferCapacityMap, isModelMatrixStaticMap, gameObjectMap, disposedIndexArray",
                () =>
                  StateDataType.(
                    SourceInstanceType.(
                      StateTool.testShadowCopyArrayLikeMapData(
                        (state) => {
                          let {
                            modelMatrixInstanceBufferCapacityMap,
                            isModelMatrixStaticMap,
                            gameObjectMap,
                            disposedIndexArray
                          } =
                            SourceInstanceTool.getSourceInstanceData(state);
                          [|
                            modelMatrixInstanceBufferCapacityMap |> Obj.magic,
                            isModelMatrixStaticMap |> Obj.magic,
                            gameObjectMap |> Obj.magic,
                            disposedIndexArray |> Obj.magic
                          |]
                        },
                        state^
                      )
                    )
                  )
              )
            }
          );
          describe(
            "deep copy gameObject data",
            () =>
              test(
                "shadow copy disposedUidMap, aliveUidArray, transformMap, cameraControllerMap, geometryMap, meshRendererMap, basicMaterialMap, lightMaterialMap, ambientLightMap, sourceInstanceMap, objectInstanceMap",
                () =>
                  GameObjectType.(
                    StateTool.testShadowCopyArrayLikeMapData(
                      (state) => {
                        let {
                          disposedUidMap,
                          aliveUidArray,
                          transformMap,
                          cameraControllerMap,
                          geometryMap,
                          meshRendererMap,
                          basicMaterialMap,
                          lightMaterialMap,
                          ambientLightMap,
                          sourceInstanceMap,
                          objectInstanceMap
                        } =
                          GameObjectTool.getGameObjectData(state);
                        [|
                          disposedUidMap |> Obj.magic,
                          aliveUidArray |> Obj.magic,
                          transformMap |> Obj.magic,
                          cameraControllerMap |> Obj.magic,
                          geometryMap |> Obj.magic,
                          meshRendererMap |> Obj.magic,
                          basicMaterialMap |> Obj.magic,
                          lightMaterialMap |> Obj.magic,
                          ambientLightMap |> Obj.magic,
                          sourceInstanceMap |> Obj.magic,
                          objectInstanceMap |> Obj.magic
                        |]
                      },
                      state^
                    )
                  )
              )
          );
          describe(
            "deep copy objectInstance data",
            () =>
              test(
                "shadow copy sourceInstanceMap, gameObjectMap, disposedIndexArray",
                () =>
                  StateDataType.(
                    ObjectInstanceType.(
                      StateTool.testShadowCopyArrayLikeMapData(
                        (state) => {
                          let {sourceInstanceMap, gameObjectMap, disposedIndexArray} =
                            ObjectInstanceTool.getObjectInstanceData(state);
                          [|
                            sourceInstanceMap |> Obj.magic,
                            gameObjectMap |> Obj.magic,
                            disposedIndexArray |> Obj.magic
                          |]
                        },
                        state^
                      )
                    )
                  )
              )
          );
          describe(
            "deep copy cameraController data",
            () =>
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
                    _prepareCameraControllerData(state);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
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
          )
        }
      );
      describe(
        "restore",
        () => {
          let _testRestoreStateEqualTargetState = (state, prepareDataFunc, getDataFunc) => {
            let (state, _, _, _, _, _, _) = prepareDataFunc(state);
            let currentState = StateTool.createNewCompleteStateWithRenderJobConfig();
            let (currentState, _, _, _, _, _, _) = prepareDataFunc(ref(currentState));
            let _ = StateTool.restore(currentState, state);
            StateTool.getState() |> getDataFunc |> expect == (state |> getDataFunc)
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
                  _prepareMeshRendererData(state);
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
              test(
                "set restored state to stateData",
                () => {
                  let ((state, _, _, _, _, _, _), (currentState, _, _)) = _prepare(state);
                  let currentState = StateTool.restore(currentState, state);
                  StateTool.getState() |> expect == currentState
                }
              );
              test(
                "change restored state should affect source state",
                () => {
                  let ((state, _, _, _, _, _, _), (currentState, _, _)) = _prepare(state);
                  let currentState = StateTool.restore(currentState, state);
                  let (currentState, gameObject5, meshRenderer5) =
                    MeshRendererTool.createGameObject(StateTool.createNewCompleteState());
                  state
                  |> MeshRenderer.getMeshRendererGameObject(meshRenderer5)
                  |> expect == gameObject5
                }
              );
              test(
                "change restored state which is restore from deep copied state shouldn't affect source state",
                () => {
                  let ((state, gameObject1, gameObject2, _, _, _, _), (currentState, _, _)) =
                    _prepare(state);
                  let currentState =
                    StateTool.restore(currentState, state |> StateTool.deepCopyStateForRestore);
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
              test(
                "add current state->transformData->localToWorldMatrixMap, localPositionMap typeArr to pool",
                () => {
                  open TypeArrayPoolType;
                  let (state, _, _, _, _, _, _) = _prepareTransformData(state);
                  let (currentState, _, transform4) =
                    GameObjectTool.createGameObject(StateTool.createNewCompleteState());
                  let pos4 = ((-1.), 4., 5.);
                  let currentState =
                    Transform.setTransformLocalPosition(transform4, pos4, currentState);
                  let _ = StateTool.restore(currentState, state);
                  let {float32ArrayPoolMap} =
                    StateTool.getState() |> TypeArrayPoolTool.getTypeArrayPoolData;
                  (
                    float32ArrayPoolMap |> WonderCommonlib.SparseMapSystem.unsafeGet(16),
                    float32ArrayPoolMap |> WonderCommonlib.SparseMapSystem.unsafeGet(3)
                  )
                  |>
                  expect == (
                              [|TransformTool.getDefaultLocalToWorldMatrix()|],
                              [|TransformTool.changeTupleToTypeArray(pos4)|]
                            )
                }
              )
          );
          describe(
            "restore geometry data to target state",
            () =>
              test(
                "add current state->geometryData->verticesMap, normalsMap, indicesMap typeArr to pool",
                () => {
                  open StateDataType;
                  open TypeArrayPoolType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    geometry1,
                    geometry2,
                    geometry3
                  ) =
                    _prepareGeometryData(state);
                  let (currentState, gameObject4, geometry4) =
                    BoxGeometryTool.createGameObject(StateTool.createNewCompleteState());
                  let currentState = GeometryTool.initGeometry(geometry4, currentState);
                  let _ = StateTool.restore(currentState, state);
                  let {float32ArrayPoolMap, uint16ArrayPoolMap} =
                    StateTool.getState() |> TypeArrayPoolTool.getTypeArrayPoolData;
                  (
                    float32ArrayPoolMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(
                         BoxGeometryTool.getDefaultVertices() |> Float32Array.length
                       )
                    |> Js.Array.length,
                    uint16ArrayPoolMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(
                         BoxGeometryTool.getDefaultIndices() |> Uint16Array.length
                       )
                    |> Js.Array.length
                  )
                  |> expect == (2, 1)
                }
              )
          );
          describe(
            "restore material data to target state",
            () => {
              test(
                "test basic material",
                () =>
                  _testRestoreStateEqualTargetState(
                    state,
                    _prepareBasicMaterialData,
                    BasicMaterialTool.getMaterialData
                  )
              );
              test(
                "test light material",
                () =>
                  _testRestoreStateEqualTargetState(
                    state,
                    _prepareLightMaterialData,
                    LightMaterialTool.getMaterialData
                  )
              )
            }
          );
          describe(
            "restore light data to target state",
            () => {
              let _prepareAmbientLightData = (state) => {
                open LightMaterial;
                open Js.Typed_array;
                let (state, gameObject1, light1) = AmbientLightTool.createGameObject(state^);
                let (state, gameObject2, light2) = AmbientLightTool.createGameObject(state);
                let (state, gameObject3, light3) = AmbientLightTool.createGameObject(state);
                let state = AllMaterialTool.prepareForInit(state);
                let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                (state, gameObject1, gameObject2, gameObject3, light1, light2, light3)
              };
              test(
                "test ambient light",
                () =>
                  _testRestoreStateEqualTargetState(
                    state,
                    _prepareAmbientLightData,
                    AmbientLightTool.getLightData
                  )
              )
            }
          );
          describe(
            "restore sourceInstance data to target state",
            () => {
              test(
                "add current state->sourceInstanceData->modelMatrixFloat32ArrayMap typeArr to pool",
                () => {
                  open StateDataType;
                  open SourceInstanceType;
                  open TypeArrayPoolType;
                  let state = state^;
                  let currentState = StateTool.createNewCompleteState();
                  let {modelMatrixFloat32ArrayMap} =
                    SourceInstanceTool.getSourceInstanceData(currentState);
                  let index = 0;
                  let typeArr = Float32Array.make([|1.|]);
                  modelMatrixFloat32ArrayMap |> WonderCommonlib.SparseMapSystem.set(index, typeArr);
                  let _ = StateTool.restore(currentState, state);
                  let {float32ArrayPoolMap}: typeArrayPoolData =
                    StateTool.getState() |> TypeArrayPoolTool.getTypeArrayPoolData;
                  float32ArrayPoolMap
                  |> WonderCommonlib.SparseMapSystem.unsafeGet(typeArr |> Float32Array.length)
                  |> expect == [|typeArr|]
                }
              );
              test(
                "mark is-not-send-modelMatrixData",
                () => {
                  open StateDataType;
                  open SourceInstanceType;
                  open TypeArrayPoolType;
                  let state = state^;
                  let {isSendModelMatrixDataMap} = SourceInstanceTool.getSourceInstanceData(state);
                  isSendModelMatrixDataMap
                  |> WonderCommonlib.SparseMapSystem.set(0, true)
                  |> WonderCommonlib.SparseMapSystem.set(1, false)
                  |> ignore;
                  let _ = StateTool.restore(StateTool.createNewCompleteState(), state);
                  let {isSendModelMatrixDataMap} =
                    SourceInstanceTool.getSourceInstanceData(StateTool.getState());
                  isSendModelMatrixDataMap |> expect == [|false, false|]
                }
              )
            }
          );
          test(
            "restore cameraController data to target state",
            () =>
              _testRestoreStateEqualTargetState(
                state,
                _prepareCameraControllerData,
                CameraControllerTool.getCameraControllerData
              )
          )
        }
      )
    }
  );