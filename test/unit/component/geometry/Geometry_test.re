open Geometry;

open BoxGeometry;

open Wonder_jest;

let _ =
  describe(
    "Geometry",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.init(
              ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "init",
        () =>
          describe(
            "init all geometrys",
            () => {
              let _prepare = () => {
                let (state, geometry1) = createBoxGeometry(state^);
                let (state, geometry2) = createBoxGeometry(state);
                let state = state |> BoxGeometryTool.setDefaultConfigData(geometry1);
                let state = state |> BoxGeometryTool.setDefaultConfigData(geometry2);
                (state, geometry1, geometry2)
              };
              test(
                "compute and set vertices",
                () => {
                  let (state, geometry1, geometry2) = _prepare();
                  let state = state |> GeometryTool.initGeometrys;
                  (
                    [@bs] getGeometryVertices(geometry1, state),
                    [@bs] getGeometryVertices(geometry2, state)
                  )
                  |>
                  expect == (
                              BoxGeometryTool.getDefaultVertices(),
                              BoxGeometryTool.getDefaultVertices()
                            )
                }
              );
              test(
                "compute and set indices",
                () => {
                  let (state, geometry1, geometry2) = _prepare();
                  let state = state |> GeometryTool.initGeometrys;
                  (
                    [@bs] getGeometryIndices(geometry1, state),
                    [@bs] getGeometryIndices(geometry2, state)
                  )
                  |>
                  expect == (
                              BoxGeometryTool.getDefaultIndices(),
                              BoxGeometryTool.getDefaultIndices()
                            )
                }
              )
            }
          )
      );
      describe(
        "getDrawMode",
        () =>
          test(
            "return TRIANGLES",
            () => {
              let triangles = 1;
              let state = state^ |> FakeGlTool.setFakeGl({"TRIANGLES": triangles});
              state |> getGeometryDrawMode |> expect == triangles
            }
          )
      );
      describe(
        "contract check",
        () =>
          describe(
            "check set point data: should not exceed geometryPointDataBufferCount",
            () => {
              let errMeg = "should not exceed geometryPointDataBufferCount";
              let _prepare = () => {
                let state =
                  TestTool.init(
                    ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(5)),
                    ()
                  );
                createBoxGeometry(state)
              };
              test(
                "check setVertices",
                () => {
                  let (state, geometry) = _prepare();
                  expect(
                    () =>
                      state |> setGeometryVertices(geometry, [|1., 2., 3., 1., 2., 3.|]) |> ignore
                  )
                  |> toThrowMessage(errMeg)
                }
              );
              test(
                "check setIndices",
                () => {
                  let (state, geometry) = _prepare();
                  expect(
                    () => state |> setGeometryIndices(geometry, [|1, 2, 3, 1, 2, 4|]) |> ignore
                  )
                  |> toThrowMessage("should not exceed uint32Arr range")
                }
              )
            }
          )
      );
      describe(
        "getGeometryGameObject",
        () =>
          test(
            "get geometry's gameObject",
            () => {
              open GameObject;
              let (state, geometry) = createBoxGeometry(state^);
              let (state, gameObject) = state |> createGameObject;
              let state = state |> addGameObjectGeometryComponent(gameObject, geometry);
              state |> getGeometryGameObject(geometry) |> expect == gameObject
            }
          )
      );
      describe(
        "disposeComponent",
        () =>
          describe(
            "test gameObject add new geometry after dispose old one",
            () => {
              beforeEach(
                () =>
                  BufferConfigTool.setBufferSize(state^, ~geometryDataBufferCount=2, ()) |> ignore
              );
              test(
                "if geometryData.index == maxCount, use disposed index(geometry) as new index",
                () => {
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                  let (state, gameObject3, geometry3) = BoxGeometryTool.createGameObject(state);
                  geometry3 |> expect == geometry1
                }
              );
              test(
                "if has no disposed one, error",
                () => {
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
                  expect(() => createBoxGeometry(state))
                  |> toThrowMessage("have create too many components")
                }
              )
            }
          )
      )
    }
  );