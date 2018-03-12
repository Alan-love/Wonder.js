open BoxGeometryAPI;

open GeometryType;

open BoxGeometryType;

open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "BoxGeometryAPI",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "createBoxGeometry",
        () =>
          test(
            "create a new geometry which is just index(int)",
            () => {
              let (state, geometry) = createBoxGeometry(state^);
              (state.boxGeometryRecord.index, geometry) |> expect == (1, 0)
            }
          )
      );
      describe(
        "setConfigData",
        () => {
          test(
            "test set config record",
            () => {
              let (state, geometry) = createBoxGeometry(state^);
              let state =
                state
                |> setBoxGeometryConfigData(
                     geometry,
                     GeometryTool.buildBoxGeometryConfigDataJsObj(
                       ~width=Js.Nullable.return(10.),
                       ~height=Js.Nullable.return(20.),
                       ~depth=Js.Nullable.return(30.),
                       ~widthSegment=Js.Nullable.return(2.),
                       ~heightSegment=Js.Nullable.return(3.),
                       ~depthSegment=Js.Nullable.return(4.),
                       ()
                     )
                   );
              state
              |> unsafeGetBoxGeometryConfigData(geometry)
              |>
              expect == Js.Dict.fromList([
                          ("width", 10.),
                          ("height", 20.),
                          ("depth", 30.),
                          ("widthSegment", 2.),
                          ("heightSegment", 3.),
                          ("depthSegment", 4.)
                        ])
            }
          );
          test(
            "if not pass full record, use default record",
            () => {
              let (state, geometry) = createBoxGeometry(state^);
              let state =
                state
                |> setBoxGeometryConfigData(
                     geometry,
                     GeometryTool.buildBoxGeometryConfigDataJsObj(
                       ~height=Js.Nullable.return(20.),
                       ()
                     )
                   );
              state
              |> unsafeGetBoxGeometryConfigData(geometry)
              |>
              expect == Js.Dict.fromList([
                          ("width", 10.),
                          ("height", 20.),
                          ("depth", 10.),
                          ("widthSegment", 1.),
                          ("heightSegment", 1.),
                          ("depthSegment", 1.)
                        ])
            }
          )
        }
      );
      describe(
        "test compute record",
        () =>
          test(
            "test with 2 segments",
            () => {
              let (state, geometry) = createBoxGeometry(state^);
              let state =
                state
                |> setBoxGeometryConfigData(
                     geometry,
                     GeometryTool.buildBoxGeometryConfigDataJsObj(
                       ~width=Js.Nullable.return(10.),
                       ~height=Js.Nullable.return(20.),
                       ~depth=Js.Nullable.return(30.),
                       ~widthSegment=Js.Nullable.return(2.),
                       ~heightSegment=Js.Nullable.return(2.),
                       ~depthSegment=Js.Nullable.return(2.),
                       ()
                     )
                   );
              let {vertices, normals, indices}: geometryComputeData =
                state |> BoxGeometryTool.computeData(geometry);
              (vertices, normals, indices)
              |>
              expect == (
                          [|
                            (-10.),
                            (-20.),
                            30.,
                            (-10.),
                            0.,
                            30.,
                            (-10.),
                            20.,
                            30.,
                            0.,
                            (-20.),
                            30.,
                            0.,
                            0.,
                            30.,
                            0.,
                            20.,
                            30.,
                            10.,
                            (-20.),
                            30.,
                            10.,
                            0.,
                            30.,
                            10.,
                            20.,
                            30.,
                            10.,
                            (-20.),
                            (-30.),
                            10.,
                            0.,
                            (-30.),
                            10.,
                            20.,
                            (-30.),
                            0.,
                            (-20.),
                            (-30.),
                            0.,
                            0.,
                            (-30.),
                            0.,
                            20.,
                            (-30.),
                            (-10.),
                            (-20.),
                            (-30.),
                            (-10.),
                            0.,
                            (-30.),
                            (-10.),
                            20.,
                            (-30.),
                            (-10.),
                            20.,
                            30.,
                            (-10.),
                            20.,
                            0.,
                            (-10.),
                            20.,
                            (-30.),
                            0.,
                            20.,
                            30.,
                            0.,
                            20.,
                            0.,
                            0.,
                            20.,
                            (-30.),
                            10.,
                            20.,
                            30.,
                            10.,
                            20.,
                            0.,
                            10.,
                            20.,
                            (-30.),
                            10.,
                            (-20.),
                            30.,
                            10.,
                            (-20.),
                            0.,
                            10.,
                            (-20.),
                            (-30.),
                            0.,
                            (-20.),
                            30.,
                            0.,
                            (-20.),
                            0.,
                            0.,
                            (-20.),
                            (-30.),
                            (-10.),
                            (-20.),
                            30.,
                            (-10.),
                            (-20.),
                            0.,
                            (-10.),
                            (-20.),
                            (-30.),
                            10.,
                            (-20.),
                            30.,
                            10.,
                            0.,
                            30.,
                            10.,
                            20.,
                            30.,
                            10.,
                            (-20.),
                            0.,
                            10.,
                            0.,
                            0.,
                            10.,
                            20.,
                            0.,
                            10.,
                            (-20.),
                            (-30.),
                            10.,
                            0.,
                            (-30.),
                            10.,
                            20.,
                            (-30.),
                            (-10.),
                            (-20.),
                            (-30.),
                            (-10.),
                            0.,
                            (-30.),
                            (-10.),
                            20.,
                            (-30.),
                            (-10.),
                            (-20.),
                            0.,
                            (-10.),
                            0.,
                            0.,
                            (-10.),
                            20.,
                            0.,
                            (-10.),
                            (-20.),
                            30.,
                            (-10.),
                            0.,
                            30.,
                            (-10.),
                            20.,
                            30.
                          |],
                          [|
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.
                          |],
                          [|
                            0,
                            3,
                            1,
                            3,
                            4,
                            1,
                            1,
                            4,
                            2,
                            4,
                            5,
                            2,
                            3,
                            6,
                            4,
                            6,
                            7,
                            4,
                            4,
                            7,
                            5,
                            7,
                            8,
                            5,
                            9,
                            12,
                            10,
                            12,
                            13,
                            10,
                            10,
                            13,
                            11,
                            13,
                            14,
                            11,
                            12,
                            15,
                            13,
                            15,
                            16,
                            13,
                            13,
                            16,
                            14,
                            16,
                            17,
                            14,
                            18,
                            21,
                            19,
                            21,
                            22,
                            19,
                            19,
                            22,
                            20,
                            22,
                            23,
                            20,
                            21,
                            24,
                            22,
                            24,
                            25,
                            22,
                            22,
                            25,
                            23,
                            25,
                            26,
                            23,
                            27,
                            30,
                            28,
                            30,
                            31,
                            28,
                            28,
                            31,
                            29,
                            31,
                            32,
                            29,
                            30,
                            33,
                            31,
                            33,
                            34,
                            31,
                            31,
                            34,
                            32,
                            34,
                            35,
                            32,
                            36,
                            39,
                            37,
                            39,
                            40,
                            37,
                            37,
                            40,
                            38,
                            40,
                            41,
                            38,
                            39,
                            42,
                            40,
                            42,
                            43,
                            40,
                            40,
                            43,
                            41,
                            43,
                            44,
                            41,
                            45,
                            48,
                            46,
                            48,
                            49,
                            46,
                            46,
                            49,
                            47,
                            49,
                            50,
                            47,
                            48,
                            51,
                            49,
                            51,
                            52,
                            49,
                            49,
                            52,
                            50,
                            52,
                            53,
                            50
                          |]
                        )
            }
          )
      );
      describe(
        "contract check: is alive",
        () =>
          describe(
            "if geometry is disposed",
            () => {
              let _testSetFunc = (setFunc) => {
                open GameObject; open GameObjectAPI;
                let (state, gameObject, geometry) = BoxGeometryTool.createGameObject(state^);
                let state = state |> GeometryTool.initGeometrys;
                TestTool.closeContractCheck();
                let state =
                  state |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(gameObject, geometry);
                TestTool.openContractCheck();
                expect(() => setFunc(geometry, Obj.magic(0), state))
                |> toThrowMessage("expect component alive, but actual not")
              };
              test(
                "setBoxGeometryConfigData should error",
                () => _testSetFunc(setBoxGeometryConfigData)
              )
            }
          )
      )
    }
  );