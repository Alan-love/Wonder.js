open Wonder_jest;

open GameObject;

let _ =
  describe(
    "clone gameObject",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      let _getFlattenClonedGameObjectArr = (clonedGameObjectArr) =>
        clonedGameObjectArr |> WonderCommonlib.ArraySystem.flatten;
      let _getClonedTransformArr = (gameObject1, count, state) => {
        let (state, clonedGameObjectArr) = cloneGameObject(gameObject1, count, state);
        clonedGameObjectArr
        |> _getFlattenClonedGameObjectArr
        |> Js.Array.map(
             (clonedGameObject) => getGameObjectTransformComponent(clonedGameObject, state)
           )
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.init(
              ~bufferConfig=Js.Nullable.return(BufferConfigTool.buildBufferConfig(1000)),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "clone gameObject",
        () => {
          open GameObjectType;
          let (state, gameObject1) = createGameObject(state^);
          let (state, clonedGameObjectArr) = cloneGameObject(gameObject1, 2, state);
          clonedGameObjectArr |> expect == [|[|"1", "2"|]|]
        }
      );
      describe(
        "clone components",
        () => {
          test(
            "test clone meshRenderer component",
            () => {
              open GameObjectType;
              let (state, gameObject1, meshRenderer1) = MeshRendererTool.createGameObject(state^);
              let (state, clonedGameObjectArr) = cloneGameObject(gameObject1, 2, state);
              clonedGameObjectArr
              |> _getFlattenClonedGameObjectArr
              |> Js.Array.map(
                   (clonedGameObject) =>
                     getGameObjectMeshRendererComponent(clonedGameObject, state)
                 )
              |> Js.Array.length
              |> expect == 2
            }
          );
          describe(
            "test clone geometry component",
            () => {
              let _prepare = () => {
                open GameObjectType;
                let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                let state = state |> initGameObject(gameObject1);
                let (state, clonedGameObjectArr) = cloneGameObject(gameObject1, 2, state);
                (
                  state,
                  gameObject1,
                  geometry1,
                  clonedGameObjectArr
                  |> _getFlattenClonedGameObjectArr
                  |> Js.Array.map(
                       (clonedGameObject) =>
                         getGameObjectGeometryComponent(clonedGameObject, state)
                     )
                )
              };
              let _initClonedGeometrys = (clonedGeometryArr, state) =>
                clonedGeometryArr
                |> ArraySystem.reduceState(
                     [@bs]
                     ((state, clonedGeometry) => GeometryTool.initGeometry(clonedGeometry, state)),
                     state
                   );
              let _testClonedGeometryVertices = (state, geometry1, clonedGeometryArr) => {
                let sourceVertices = Geometry.getGeometryVertices(geometry1, state);
                clonedGeometryArr
                |> Js.Array.map((geometry) => Geometry.getGeometryVertices(geometry, state))
                |> expect == [|sourceVertices, sourceVertices|]
              };
              let _testClonedGeometryIndices = (state, geometry1, clonedGeometryArr) => {
                let sourceIndices = Geometry.getGeometryIndices(geometry1, state);
                clonedGeometryArr
                |> Js.Array.map((geometry) => Geometry.getGeometryIndices(geometry, state))
                |> expect == [|sourceIndices, sourceIndices|]
              };
              test(
                "test clone specific count of geometrys",
                () => {
                  let (_, _, _, clonedGeometryArr) = _prepare();
                  clonedGeometryArr |> Js.Array.length |> expect == 2
                }
              );
              test(
                "set cloned geometry's vertices by source geometry's vertices",
                () => {
                  let (state, _, geometry1, clonedGeometryArr) = _prepare();
                  _testClonedGeometryVertices(state, geometry1, clonedGeometryArr)
                }
              );
              test(
                "set cloned geometry's indices by source geometry's indices",
                () => {
                  let (state, _, geometry1, clonedGeometryArr) = _prepare();
                  _testClonedGeometryIndices(state, geometry1, clonedGeometryArr)
                }
              );
              describe(
                "test initGeometry",
                () => {
                  test(
                    "can correctly get cloned one's vertices after init",
                    () => {
                      let (state, _, geometry1, clonedGeometryArr) = _prepare();
                      let state = state |> _initClonedGeometrys(clonedGeometryArr);
                      _testClonedGeometryVertices(state, geometry1, clonedGeometryArr)
                    }
                  );
                  test(
                    "can correctly get cloned one's vertices after init",
                    () => {
                      let (state, _, geometry1, clonedGeometryArr) = _prepare();
                      let state = state |> _initClonedGeometrys(clonedGeometryArr);
                      _testClonedGeometryIndices(state, geometry1, clonedGeometryArr)
                    }
                  )
                }
              )
            }
          );
          describe(
            "test clone material component",
            () =>
              test(
                "test clone specific count of materials",
                () => {
                  open GameObjectType;
                  let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                  let (state, clonedGameObjectArr) = cloneGameObject(gameObject1, 2, state);
                  clonedGameObjectArr
                  |> _getFlattenClonedGameObjectArr
                  |> Js.Array.map(
                       (clonedGameObject) =>
                         getGameObjectMaterialComponent(clonedGameObject, state)
                     )
                  |> Js.Array.length
                  |> expect == 2
                }
              )
          );
          describe(
            "test clone transform component",
            () => {
              test(
                "test clone specific count of transforms",
                () => {
                  let (state, gameObject1, _) = GameObjectTool.createGameObject(state^);
                  let clonedTransformArr = _getClonedTransformArr(gameObject1, 2, state);
                  clonedTransformArr |> Js.Array.length |> expect == 2
                }
              );
              test(
                "set cloned transform's localPosition by source transform's localPosition",
                () => {
                  open Transform;
                  let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
                  let pos1 = (1., 2., 3.);
                  let state = state |> setTransformLocalPosition(transform1, pos1);
                  let state = state |> TransformTool.init;
                  let state = state |> TransformTool.update;
                  let clonedTransformArr = _getClonedTransformArr(gameObject1, 2, state);
                  let state = state |> TransformTool.update;
                  clonedTransformArr
                  |> Js.Array.map((transform) => getTransformLocalPosition(transform, state))
                  |> expect == [|pos1, pos1|]
                }
              )
            }
          )
        }
      );
      describe(
        "clone children",
        () => {
          open Transform;
          describe(
            "test clone gameObject",
            () =>
              test(
                "get all cloned gameObjects(include cloned children)",
                () => {
                  open GameObjectType;
                  let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
                  let (state, gameObject2, transform2) = GameObjectTool.createGameObject(state);
                  let state =
                    state |> setTransformParent(Js.Nullable.return(transform1), transform2);
                  let (state, clonedGameObjectArr) = cloneGameObject(gameObject1, 2, state);
                  clonedGameObjectArr |> expect == [|[|"2", "3"|], [|"4", "5"|]|]
                }
              )
          );
          describe(
            "cloned children's components",
            () => {
              let _createMeshRendererGameObject = (state) => {
                let (state, gameObject1, meshRenderer1) = MeshRendererTool.createGameObject(state);
                (
                  state,
                  gameObject1,
                  meshRenderer1,
                  getGameObjectTransformComponent(gameObject1, state)
                )
              };
              test(
                "test clone meshRenderer component",
                () => {
                  open GameObjectType;
                  let (state, gameObject1, meshRenderer1, transform1) =
                    _createMeshRendererGameObject(state^);
                  let (state, gameObject2, meshRenderer2, transform2) =
                    _createMeshRendererGameObject(state);
                  let state =
                    state |> setTransformParent(Js.Nullable.return(transform1), transform2);
                  let (state, clonedGameObjectArr) = cloneGameObject(gameObject1, 2, state);
                  clonedGameObjectArr
                  |> _getFlattenClonedGameObjectArr
                  |> Js.Array.map(
                       (clonedGameObject) =>
                         getGameObjectMeshRendererComponent(clonedGameObject, state)
                     )
                  |> Js.Array.length
                  |> expect == 4
                }
              );
              describe(
                "test clone geometry component",
                () =>
                  test(
                    "test clone specific count of geometrys",
                    () => {
                      open GameObjectType;
                      let (state, gameObject1, geometry1) =
                        BoxGeometryTool.createGameObject(state^);
                      let transform1 = getGameObjectTransformComponent(gameObject1, state);
                      let (state, gameObject2, geometry2) =
                        BoxGeometryTool.createGameObject(state);
                      let transform2 = getGameObjectTransformComponent(gameObject2, state);
                      let state =
                        state |> setTransformParent(Js.Nullable.return(transform1), transform2);
                      let state = state |> GeometryTool.initGeometrys;
                      let (state, clonedGameObjectArr) =
                        cloneGameObject(gameObject1, 2, state);
                      clonedGameObjectArr
                      |> _getFlattenClonedGameObjectArr
                      |> Js.Array.map(
                           (clonedGameObject) =>
                             getGameObjectGeometryComponent(clonedGameObject, state)
                         )
                      |> Js.Array.length
                      |> expect == 4
                    }
                  )
              );
              describe(
                "test clone material component",
                () =>
                  test(
                    "test clone specific count of materials",
                    () => {
                      open GameObjectType;
                      let (state, gameObject1, material1) =
                        BasicMaterialTool.createGameObject(state^);
                      let transform1 = getGameObjectTransformComponent(gameObject1, state);
                      let (state, gameObject2, material2) =
                        BasicMaterialTool.createGameObject(state);
                      let transform2 = getGameObjectTransformComponent(gameObject2, state);
                      let state =
                        state |> setTransformParent(Js.Nullable.return(transform1), transform2);
                      let (state, clonedGameObjectArr) =
                        cloneGameObject(gameObject1, 2, state);
                      clonedGameObjectArr
                      |> _getFlattenClonedGameObjectArr
                      |> Js.Array.map(
                           (clonedGameObject) =>
                             getGameObjectMaterialComponent(clonedGameObject, state)
                         )
                      |> Js.Array.length
                      |> expect == 4
                    }
                  )
              );
              describe(
                "test clone transform component",
                () => {
                  let _prepare = () => {
                    let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
                    let (state, gameObject2, transform2) = GameObjectTool.createGameObject(state);
                    let (state, gameObject3, transform3) = GameObjectTool.createGameObject(state);
                    let (state, gameObject4, transform4) = GameObjectTool.createGameObject(state);
                    let state =
                      state
                      |> setTransformParent(Js.Nullable.return(transform1), transform2)
                      |> setTransformParent(Js.Nullable.return(transform1), transform3)
                      |> setTransformParent(Js.Nullable.return(transform3), transform4);
                    (
                      state,
                      gameObject1,
                      transform1,
                      gameObject2,
                      transform2,
                      gameObject3,
                      transform3,
                      gameObject4,
                      transform4
                    )
                  };
                  test(
                    "set parent",
                    () => {
                      let (
                        state,
                        gameObject1,
                        transform1,
                        gameObject2,
                        transform2,
                        gameObject3,
                        transform3,
                        gameObject4,
                        transform4
                      ) =
                        _prepare();
                      let clonedTransformArr = _getClonedTransformArr(gameObject1, 2, state);
                      (
                        state |> getTransformParent(clonedTransformArr[0]),
                        state |> getTransformParent(clonedTransformArr[1]),
                        state |> getTransformParent(clonedTransformArr[2]),
                        state |> getTransformParent(clonedTransformArr[3]),
                        state |> getTransformParent(clonedTransformArr[4]),
                        state |> getTransformParent(clonedTransformArr[5]),
                        state |> getTransformParent(clonedTransformArr[6]),
                        state |> getTransformParent(clonedTransformArr[7])
                      )
                      |>
                      expect == (
                                  Js.Nullable.empty,
                                  Js.Nullable.empty,
                                  Js.Nullable.return(clonedTransformArr[0]),
                                  Js.Nullable.return(clonedTransformArr[1]),
                                  Js.Nullable.return(clonedTransformArr[0]),
                                  Js.Nullable.return(clonedTransformArr[1]),
                                  Js.Nullable.return(clonedTransformArr[4]),
                                  Js.Nullable.return(clonedTransformArr[5])
                                )
                    }
                  );
                  test(
                    "test set cloned transform's localPosition by corresponding source transform's localPosition",
                    () => {
                      open Transform;
                      open Vector3System;
                      open Vector3Type;
                      let (
                        state,
                        gameObject1,
                        transform1,
                        gameObject2,
                        transform2,
                        gameObject3,
                        transform3,
                        gameObject4,
                        transform4
                      ) =
                        _prepare();
                      let pos1 = (1., 2., 3.);
                      let pos2 = (2., 2., 3.);
                      let pos3 = (3., 20., 3.);
                      let pos4 = (4., 2., 3.);
                      let state = state |> setTransformLocalPosition(transform1, pos1);
                      let state = state |> setTransformLocalPosition(transform2, pos2);
                      let state = state |> setTransformLocalPosition(transform3, pos3);
                      let state = state |> setTransformLocalPosition(transform4, pos4);
                      let state = state |> TransformTool.init;
                      let state = state |> TransformTool.update;
                      let clonedTransformArr = _getClonedTransformArr(gameObject1, 1, state);
                      let state = state |> TransformTool.update;
                      clonedTransformArr
                      |> Js.Array.map((transform) => getTransformPosition(transform, state))
                      |>
                      expect == [|
                                  pos1,
                                  add(Float, pos1, pos2),
                                  add(Float, pos1, pos3),
                                  add(Float, add(Float, pos1, pos3), pos4)
                                |]
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  );