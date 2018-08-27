open Wonder_jest;

open Js.Promise;

open Js.Typed_array;

let _ =
  describe("load stream wdb", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    let _buildFakeBlob = [%raw
      (.) => {|
  var Blob = function(arrayBufferArr, param){
      if( typeof window.blobData_wonder_forTest === "undefined"){
window.blobData_wonder_forTest = [
  [arrayBufferArr[0], param]
];
      } else{
window.blobData_wonder_forTest.push(
[arrayBufferArr[0], param]
);
      }
  };

window.Blob = Blob;
  |}
    ];

    let _getBlobData = [%raw
      (.) => {|
 return window.blobData_wonder_forTest;
    |}
    ];

    let _clearBlobData = [%raw
      (.) => {|
 delete window.blobData_wonder_forTest;
    |}
    ];

    let _buildWDBPath = wdbName =>
      Node.Path.join([|
        Node.Process.cwd(),
        "./test/res/",
        {j|wdb/$wdbName.wdb|j},
      |]);

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        RenderJobsTool.initWithJobConfig(
          sandbox,
          LoopRenderJobTool.buildNoWorkerJobConfig(),
        );

      _clearBlobData(.);
      _buildFakeBlob(.);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test load", () => {
      let wdbArrayBuffer = ref(Obj.magic(-1));

      let _buildFakeRequestAnimationFrame = [%raw
        (unsafeGetStateFunc, setStateFunc, runWithDefaultTimeFunc) => {|
            window.requestAnimationFrame = function(func){
setStateFunc(runWithDefaultTimeFunc(unsafeGetStateFunc()));
            };
            |}
      ];

      let _buildChunkData = (~arrayBuffer, ~done_=false, ()) =>
        {
          "done": done_,
          "value":
            switch (arrayBuffer) {
            | Some(arrayBuffer) => arrayBuffer |> Uint8Array.fromBuffer
            | None => Obj.magic(-1)
            },
        }
        |> resolve;

      let _getWDBArrayBuffer = wdbName => NodeExtend.readFileBufferSync(
                                            _buildWDBPath(wdbName),
                                          )##buffer;

      let _buildController = sandbox => {
        "close": createEmptyStubWithJsObjSandbox(sandbox),
      };

      let _buildReader = readStub => {"read": readStub |> Obj.magic};

      let _prepareWithReadStub = (sandbox, readStub, state) => {
        let default11Image = Obj.magic(101);

        StateAPI.setState(state) |> ignore;

        let handleBeforeStartLoop = (state, rootGameObject) => {
          let (state, _, _) = DirectionLightTool.createGameObject(state);
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);

          state;
        };

        let handleWhenDoneFunc = (state, rootGameObject) => state;

        (
          default11Image,
          readStub,
          handleBeforeStartLoop,
          handleWhenDoneFunc,
          state,
        );
      };

      let _prepare = (sandbox, wdbArrayBuffer, state) => {
        let readStub = createEmptyStubWithJsObjSandbox(sandbox);
        let readStub =
          readStub
          |> onCall(0)
          |> returns(
               _buildChunkData(~arrayBuffer=wdbArrayBuffer |. Some, ()),
             )
          |> onCall(1)
          |> returns(_buildChunkData(~arrayBuffer=None, ~done_=true, ()));

        _prepareWithReadStub(sandbox, readStub, state);
      };

      let _getBoxTexturedMeshGameObject = (rootGameObject, state) =>
        Array.unsafe_get(
          GameObjectTool.getChildren(rootGameObject, state),
          0,
        );

      let _getAllGeometryData = (rootGameObject, state) =>
        AssembleWDBSystemTool.getAllGeometryData(rootGameObject, state);

      let _getAllGeometrys = (rootGameObject, state) =>
        AssembleWDBSystemTool.getAllGameObjects(rootGameObject, state)
        |> Js.Array.filter(gameObject =>
             GameObjectAPI.hasGameObjectGeometryComponent(gameObject, state)
           )
        |> Js.Array.map(gameObject =>
             GameObjectAPI.unsafeGetGameObjectGeometryComponent(
               gameObject,
               state,
             )
           );

      let _getAllLightMaterials = (rootGameObject, state) =>
        AssembleWDBSystemTool.getAllLightMaterials(rootGameObject, state);

      let _getAllDiffuseMaps = (rootGameObject, state) =>
        AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state);

      let _getAllDiffuseMapSources = (rootGameObject, state) =>
        _getAllDiffuseMaps(rootGameObject, state)
        |> Js.Array.map(diffuseMap =>
             BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
               diffuseMap,
               state,
             )
           );

      beforeEach(() => {
        GLBTool.prepare(sandbox^);

        _buildFakeRequestAnimationFrame(
          StateAPI.unsafeGetState,
          StateAPI.setState,
          DirectorTool.runWithDefaultTime,
        );
      });

      describe("test before start loop", () => {
        let _testSetDefaultSource = (sandbox, state) => {
          let state =
            state^
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let (default11Image, readStub, _, handleWhenDoneFunc, state) =
            _prepare(sandbox, wdbArrayBuffer^, state);
          let sourcesBeforeStartLoop = ref([||]);
          let handleBeforeStartLoop = (state, rootGameObject) => {
            sourcesBeforeStartLoop :=
              _getAllDiffuseMapSources(rootGameObject, state);

            let (state, _, _) = DirectionLightTool.createGameObject(state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);

            state;
          };

          LoadStreamWDBTool.read(
            (
              default11Image,
              _buildController(sandbox),
              handleBeforeStartLoop,
              handleWhenDoneFunc,
            ),
            _buildReader(readStub),
          )
          |> then_(() => {
               let state = StateAPI.unsafeGetState();

               let state = DirectorTool.runWithDefaultTime(state);

               sourcesBeforeStartLoop^
               |>
               expect == (
                           ArrayTool.range(
                             0,
                             Js.Array.length(sourcesBeforeStartLoop^) - 1,
                           )
                           |> Js.Array.map(_ => default11Image)
                         )
               |> resolve;
             });
        };

        describe("test BoxTextured wdb", () => {
          beforeEach(() =>
            wdbArrayBuffer := _getWDBArrayBuffer("BoxTextured")
          );

          testPromise("set default source to all basicSourceTextures", () =>
            _testSetDefaultSource(sandbox, state)
          );
        });

        describe("test CesiumMilkTruck wdb", () => {
          beforeEach(() => {
            wdbArrayBuffer := _getWDBArrayBuffer("CesiumMilkTruck");

            state :=
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~buffer=
                  SettingTool.buildBufferConfigStr(
                    ~geometryPointCount=30000,
                    ~geometryCount=10,
                    (),
                  ),
                ~noWorkerJobRecord=LoopRenderJobTool.buildNoWorkerJobConfig(),
                (),
              );
          });

          testPromise("set default source to all basicSourceTextures", () =>
            _testSetDefaultSource(sandbox, state)
          );
        });

        describe("test AlphaBlendModeTest wdb", () => {
          beforeEach(() =>
            wdbArrayBuffer := _getWDBArrayBuffer("AlphaBlendModeTest")
          );

          testPromise("set default source to all basicSourceTextures", () =>
            _testSetDefaultSource(sandbox, state)
          );
        });
      });

      describe("test load all data in first chunk", () => {
        let _testAddGeometryComponents =
            (
              sandbox,
              (resultGeometrysBeforeStartLoop, resultGeometrysWhenDone),
              state,
            ) => {
          let state =
            state^
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let (default11Image, readStub, _, _, state) =
            _prepare(sandbox, wdbArrayBuffer^, state);
          let geometrysBeforeStartLoop = ref([||]);
          let geometrysWhenDone = ref([||]);
          let handleBeforeStartLoop = (state, rootGameObject) => {
            geometrysBeforeStartLoop :=
              _getAllGeometrys(rootGameObject, state);

            let (state, _, _) = DirectionLightTool.createGameObject(state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);

            state;
          };
          let handleWhenDoneFunc = (state, rootGameObject) => {
            geometrysWhenDone := _getAllGeometrys(rootGameObject, state);

            state;
          };

          LoadStreamWDBTool.read(
            (
              default11Image,
              _buildController(sandbox),
              handleBeforeStartLoop,
              handleWhenDoneFunc,
            ),
            _buildReader(readStub),
          )
          |> then_(() => {
               let state = StateAPI.unsafeGetState();

               let state = DirectorTool.runWithDefaultTime(state);

               (geometrysBeforeStartLoop^, geometrysWhenDone^)
               |>
               expect == (
                           resultGeometrysBeforeStartLoop,
                           resultGeometrysWhenDone,
                         )
               |> resolve;
             });
        };

        let _testLoadBlobImage =
            (
              sandbox,
              (
                blobDataLength,
                arrayBufferByteLength,
                resultParam,
                resultSourcesWhenDone,
              ),
              state,
            ) => {
          let state =
            state^
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let (default11Image, readStub, handleBeforeStartLoop, _, state) =
            _prepare(sandbox, wdbArrayBuffer^, state);
          let sourcesWhenDone = ref(Obj.magic([||]));
          let handleWhenDoneFunc = (state, rootGameObject) => {
            sourcesWhenDone := _getAllDiffuseMapSources(rootGameObject, state);

            GameObjectAPI.hasGameObjectGeometryComponent(
              _getBoxTexturedMeshGameObject(rootGameObject, state),
              state,
            );

            let (state, _, _) = DirectionLightTool.createGameObject(state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);

            state;
          };

          LoadStreamWDBTool.read(
            (
              default11Image,
              _buildController(sandbox),
              handleBeforeStartLoop,
              handleWhenDoneFunc,
            ),
            _buildReader(readStub),
          )
          |> then_(() => {
               let state = StateAPI.unsafeGetState();

               let state = DirectorTool.runWithDefaultTime(state);

               let blobData = _getBlobData(.);

               let (arrayBuffer, param) = Array.unsafe_get(blobData, 0);

               (
                 blobData |> Js.Array.length,
                 arrayBuffer |> ArrayBuffer.byteLength,
                 param,
                 sourcesWhenDone^,
               )
               |>
               expect == (
                           blobDataLength,
                           arrayBufferByteLength,
                           resultParam,
                           resultSourcesWhenDone,
                         )
               |> resolve;
             });
        };

        let _testDraw = (sandbox, drawCount, state) => {
          let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state^
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~drawElements, ()),
               );
          let (
            default11Image,
            readStub,
            handleBeforeStartLoop,
            handleWhenDoneFunc,
            state,
          ) =
            _prepare(sandbox, wdbArrayBuffer^, state);

          LoadStreamWDBTool.read(
            (
              default11Image,
              _buildController(sandbox),
              handleBeforeStartLoop,
              handleWhenDoneFunc,
            ),
            _buildReader(readStub),
          )
          |> then_(() => {
               let state = StateAPI.unsafeGetState();

               let drawElementsCallCount = drawElements |> getCallCount;

               let state = DirectorTool.runWithDefaultTime(state);

               (drawElements |> getCallCount)
               - drawElementsCallCount
               |> expect == drawCount
               |> resolve;
             });
        };

        describe("test BoxTextured wdb", () => {
          beforeEach(() =>
            wdbArrayBuffer := _getWDBArrayBuffer("BoxTextured")
          );

          testPromise("add geometry component", () =>
            _testAddGeometryComponents(sandbox, ([||], [|0|]), state)
          );
          testPromise("test set geometry point data", () => {
            let array_buffer = 1;
            let element_array_buffer = 2;
            let static_draw = 3;
            let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state^
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~array_buffer,
                     ~element_array_buffer,
                     ~static_draw,
                     ~bufferData,
                     (),
                   ),
                 );
            let (default11Image, readStub, handleBeforeStartLoop, _, state) =
              _prepare(sandbox, wdbArrayBuffer^, state);
            let geometryWhenDone = ref(-1);
            let handleWhenDoneFunc = (state, rootGameObject) => {
              geometryWhenDone :=
                GameObjectAPI.unsafeGetGameObjectGeometryComponent(
                  _getBoxTexturedMeshGameObject(rootGameObject, state),
                  state,
                );

              state;
            };

            LoadStreamWDBTool.read(
              (
                default11Image,
                _buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              _buildReader(readStub),
            )
            |> then_(() => {
                 let state = StateAPI.unsafeGetState();

                 let state = DirectorTool.runWithDefaultTime(state);

                 let geometry = geometryWhenDone^;

                 let vertices =
                   GeometryAPI.getGeometryVertices(geometry, state);
                 let normals =
                   GeometryAPI.getGeometryNormals(geometry, state);
                 let texCoords =
                   GeometryAPI.getGeometryTexCoords(geometry, state);
                 let indices =
                   GeometryAPI.getGeometryIndices(geometry, state);

                 (
                   (vertices, normals, texCoords, indices),
                   (
                     bufferData
                     |> withThreeArgs(array_buffer, vertices, static_draw)
                     |> getCallCount,
                     bufferData
                     |> withThreeArgs(array_buffer, normals, static_draw)
                     |> getCallCount,
                     bufferData
                     |> withThreeArgs(array_buffer, texCoords, static_draw)
                     |> getCallCount,
                     bufferData
                     |> withThreeArgs(
                          element_array_buffer,
                          indices,
                          static_draw,
                        )
                     |> getCallCount,
                   ),
                 )
                 |>
                 expect == (
                             GLTFTool.getBoxTexturedGeometryData(),
                             (1, 1, 1, 1),
                           )
                 |> resolve;
               });
          });
          testPromise("load blob image and set it to be source", () =>
            _testLoadBlobImage(
              sandbox,
              (
                1,
                21366,
                {"type": "image/png"},
                [|"object_url0" |> Obj.magic|],
              ),
              state,
            )
          );
          testPromise("draw the gameObject", () =>
            _testDraw(sandbox, 1, state)
          );
        });

        describe("test CesiumMilkTruck wdb", () => {
          beforeEach(() => {
            wdbArrayBuffer := _getWDBArrayBuffer("CesiumMilkTruck");

            state :=
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~buffer=
                  SettingTool.buildBufferConfigStr(
                    ~geometryPointCount=30000,
                    ~geometryCount=10,
                    (),
                  ),
                ~noWorkerJobRecord=LoopRenderJobTool.buildNoWorkerJobConfig(),
                (),
              );
          });

          testPromise("add geometry component", () =>
            _testAddGeometryComponents(
              sandbox,
              ([||], [|1, 2, 3, 0, 0|]),
              state,
            )
          );
          testPromise("test set geometry point data", () => {
            let state =
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let (default11Image, readStub, handleBeforeStartLoop, _, state) =
              _prepare(sandbox, wdbArrayBuffer^, state);
            let rootGameObjectWhenDone = ref(-1);
            let handleWhenDoneFunc = (state, rootGameObject) => {
              rootGameObjectWhenDone := rootGameObject;

              state;
            };

            LoadStreamWDBTool.read(
              (
                default11Image,
                _buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              _buildReader(readStub),
            )
            |> then_(() => {
                 let state = StateAPI.unsafeGetState();

                 let state = DirectorTool.runWithDefaultTime(state);

                 let dataArr =
                   _getAllGeometryData(rootGameObjectWhenDone^, state);

                 let dataMap = GLTFTool.getTruckGeometryData();

                 dataArr
                 |>
                 expect == [|
                             (
                               "Cesium_Milk_Truck_0",
                               dataMap
                               |> WonderCommonlib.HashMapService.unsafeGet(
                                    "Cesium_Milk_Truck_0",
                                  ),
                             ),
                             (
                               "Cesium_Milk_Truck_1",
                               dataMap
                               |> WonderCommonlib.HashMapService.unsafeGet(
                                    "Cesium_Milk_Truck_1",
                                  ),
                             ),
                             (
                               "Cesium_Milk_Truck_2",
                               dataMap
                               |> WonderCommonlib.HashMapService.unsafeGet(
                                    "Cesium_Milk_Truck_2",
                                  ),
                             ),
                             (
                               "Wheels",
                               dataMap
                               |> WonderCommonlib.HashMapService.unsafeGet(
                                    "Wheels",
                                  ),
                             ),
                             (
                               "Wheels",
                               dataMap
                               |> WonderCommonlib.HashMapService.unsafeGet(
                                    "Wheels",
                                  ),
                             ),
                           |]
                 |> resolve;
               });
          });
          testPromise("load blob image and set it to be source", () =>
            _testLoadBlobImage(
              sandbox,
              (
                1,
                1091805,
                {"type": "image/png"},
                [|
                  "object_url0" |> Obj.magic,
                  "object_url0" |> Obj.magic,
                  "object_url0" |> Obj.magic,
                |],
              ),
              state,
            )
          );
          testPromise("draw the gameObject", () =>
            _testDraw(sandbox, 5, state)
          );
        });

        describe("test AlphaBlendModeTest wdb", () => {
          beforeEach(() =>
            wdbArrayBuffer := _getWDBArrayBuffer("AlphaBlendModeTest")
          );

          testPromise("add geometry component", () =>
            _testAddGeometryComponents(
              sandbox,
              ([||], [|8, 0, 1, 2, 3, 4, 5, 6, 7|]),
              state,
            )
          );
          testPromise("test set geometry point data", () => {
            let state =
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let (default11Image, readStub, handleBeforeStartLoop, _, state) =
              _prepare(sandbox, wdbArrayBuffer^, state);
            let rootGameObjectWhenDone = ref(-1);
            let handleWhenDoneFunc = (state, rootGameObject) => {
              rootGameObjectWhenDone := rootGameObject;

              state;
            };

            LoadStreamWDBTool.read(
              (
                default11Image,
                _buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              _buildReader(readStub),
            )
            |> then_(() => {
                 let state = StateAPI.unsafeGetState();

                 let state = DirectorTool.runWithDefaultTime(state);

                 let dataArr =
                   _getAllGeometryData(rootGameObjectWhenDone^, state);

                 let dataMap = GLTFTool.getAlphaBlendModeTestGeometryData();

                 (dataArr |> Js.Array.length, dataArr[2])
                 |>
                 expect == (
                             9,
                             (
                               "DecalBlend",
                               dataMap
                               |> WonderCommonlib.HashMapService.unsafeGet(
                                    "DecalBlend",
                                  ),
                             ),
                           )
                 |> resolve;
               });
          });
          testPromise("load blob image and set it to be source", () =>
            _testLoadBlobImage(
              sandbox,
              (
                2,
                94660,
                {"type": "image/png"},
                [|
                  "object_url1" |> Obj.magic,
                  "object_url0" |> Obj.magic,
                  "object_url0" |> Obj.magic,
                  "object_url0" |> Obj.magic,
                  "object_url0" |> Obj.magic,
                  "object_url0" |> Obj.magic,
                  "object_url0" |> Obj.magic,
                  "object_url0" |> Obj.magic,
                  "object_url0" |> Obj.magic,
                |],
              ),
              state,
            )
          );
          testPromise("draw the gameObject", () =>
            _testDraw(sandbox, 9, state)
          );
        });
      });

      describe("test load in multiple chunks", () => {
        describe("test CesiumMilkTruck wdb", () => {
          let _testSetGeometryPointData =
              (sandbox, dataCount, prepareFunc, state) => {
            let state =
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let (
              default11Image,
              readStub,
              handleBeforeStartLoop,
              handleWhenDoneFunc,
              state,
            ) =
              prepareFunc(sandbox, state);
            let rootGameObjectWhenDone = ref(-1);
            let handleWhenDoneFunc = (state, rootGameObject) => {
              rootGameObjectWhenDone := rootGameObject;

              state;
            };

            LoadStreamWDBTool.read(
              (
                default11Image,
                _buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              _buildReader(readStub),
            )
            |> then_(() => {
                 let state = StateAPI.unsafeGetState();

                 let state = DirectorTool.runWithDefaultTime(state);

                 let dataArr =
                   _getAllGeometryData(rootGameObjectWhenDone^, state);

                 dataArr |> Js.Array.length |> expect == dataCount |> resolve;
               });
          };

          beforeEach(() => {
            wdbArrayBuffer := _getWDBArrayBuffer("CesiumMilkTruck");

            state :=
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~buffer=
                  SettingTool.buildBufferConfigStr(
                    ~geometryPointCount=30000,
                    ~geometryCount=10,
                    (),
                  ),
                ~noWorkerJobRecord=LoopRenderJobTool.buildNoWorkerJobConfig(),
                (),
              );
          });

          describe(
            {|
            1.chunk1: header + json + stream + stream_chunk1-stream_chunk4 + a part of stream_chunk5(image chunk)
            2.chunk2: a part of stream_chunk5(image chunk)
            3.chunk3: other stream chunk data
            4.done
            |},
            () => {
              describe("test 1,4", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=0, ~end_=32768)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         _buildChunkData(~arrayBuffer=None, ~done_=true, ()),
                       );

                  _prepareWithReadStub(sandbox, readStub, state);
                };

                testPromise("not set geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 0, _prepare, state)
                );
              });

              describe("test 1,2,4", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=0, ~end_=32768)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=32768, ~end_=10000)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         _buildChunkData(~arrayBuffer=None, ~done_=true, ()),
                       );

                  _prepareWithReadStub(sandbox, readStub, state);
                };

                testPromise("not set geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 0, _prepare, state)
                );
              });

              describe("test 1,2,3,4", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=0, ~end_=32768)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=32768, ~end_=10000)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.sliceFrom(42768)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(3)
                    |> returns(
                         _buildChunkData(~arrayBuffer=None, ~done_=true, ()),
                       );

                  _prepareWithReadStub(sandbox, readStub, state);
                };

                testPromise("set geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 4, _prepare, state)
                );
              });
            },
          );

          describe(
            {|
            1.chunk1: header + a part of json
            2.chunk2: other json + a part of stream
            3.chunk3: other stream + a part of stream_chunk1
            4.chunk4: other stream_chunk1 + stream_chunk2
            5.chunk5: stream_chunk3-stream_chunk5 + a part of stream_chunk6
            6.chunk6: other stream_chunk6 + stream_chunkk7-stream_chunk10 + a part of stream_chunk11
            7.chunk7: other stream chunk data
            8.done
            |},
            () => {
              let _testNotExecHandleWhenDoneFunc =
                  (sandbox, prepareFunc, state) => {
                let state =
                  state^
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ()),
                     );
                let (
                  default11Image,
                  readStub,
                  handleBeforeStartLoop,
                  handleWhenDoneFunc,
                  state,
                ) =
                  prepareFunc(sandbox, state);
                let rootGameObjectWhenDone = ref(-1);
                let handleWhenDoneFunc = (state, rootGameObject) => {
                  rootGameObjectWhenDone := rootGameObject;

                  state;
                };

                LoadStreamWDBTool.read(
                  (
                    default11Image,
                    _buildController(sandbox),
                    handleBeforeStartLoop,
                    handleWhenDoneFunc,
                  ),
                  _buildReader(readStub),
                )
                |> then_(() => {
                     let state = StateAPI.unsafeGetState();

                     let state = DirectorTool.runWithDefaultTime(state);

                     rootGameObjectWhenDone^ |> expect == (-1) |> resolve;
                   });
              };

              let _testNotSendAttributeData = (sandbox, prepareFunc, state) => {
                let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state^
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ~bufferData, ()),
                     );
                let (
                  default11Image,
                  readStub,
                  handleBeforeStartLoop,
                  handleWhenDoneFunc,
                  state,
                ) =
                  prepareFunc(sandbox, state);

                LoadStreamWDBTool.read(
                  (
                    default11Image,
                    _buildController(sandbox),
                    handleBeforeStartLoop,
                    handleWhenDoneFunc,
                  ),
                  _buildReader(readStub),
                )
                |> then_(() =>
                     bufferData |> getCallCount |> expect == 0 |> resolve
                   );
              };

              describe("test 1,8", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=0, ~end_=300)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         _buildChunkData(~arrayBuffer=None, ~done_=true, ()),
                       );

                  _prepareWithReadStub(sandbox, readStub, state);
                };

                testPromise("not exec handleWhenDoneFunc", () =>
                  _testNotExecHandleWhenDoneFunc(sandbox, _prepare, state)
                );
              });

              describe("test 1,2,8", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=0, ~end_=300)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=300, ~end_=1650)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         _buildChunkData(~arrayBuffer=None, ~done_=true, ()),
                       );

                  _prepareWithReadStub(sandbox, readStub, state);
                };

                testPromise("not exec handleWhenDoneFunc", () =>
                  _testNotExecHandleWhenDoneFunc(sandbox, _prepare, state)
                );
              });

              describe("test 1,2,3,8", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=0, ~end_=300)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=300, ~end_=1650)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=1650, ~end_=3000)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(3)
                    |> returns(
                         _buildChunkData(~arrayBuffer=None, ~done_=true, ()),
                       );

                  _prepareWithReadStub(sandbox, readStub, state);
                };

                describe("assemble and start loop", () => {
                  describe("send light data", () =>
                    testPromise("send u_ambient", () => {
                      let uniform3f =
                        createEmptyStubWithJsObjSandbox(sandbox);
                      let pos = 0;
                      let getUniformLocation =
                        GLSLLocationTool.getUniformLocation(
                          ~pos,
                          sandbox,
                          "u_ambient",
                        );
                      let state =
                        state^
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~uniform3f,
                               ~getUniformLocation,
                               (),
                             ),
                           );
                      let (
                        default11Image,
                        readStub,
                        handleBeforeStartLoop,
                        handleWhenDoneFunc,
                        state,
                      ) =
                        _prepare(sandbox, state);

                      LoadStreamWDBTool.read(
                        (
                          default11Image,
                          _buildController(sandbox),
                          handleBeforeStartLoop,
                          handleWhenDoneFunc,
                        ),
                        _buildReader(readStub),
                      )
                      |> then_(() =>
                           uniform3f
                           |> withFourArgs(pos |> Obj.magic, 0., 0., 0.)
                           |> getCallCount
                           |> expect == 2
                           |> resolve
                         );
                    })
                  );
                  describe("send camera data", () =>
                    testPromise("send u_vMatrix", () => {
                      let uniformMatrix4fv =
                        createEmptyStubWithJsObjSandbox(sandbox);
                      let pos = 0;
                      let getUniformLocation =
                        GLSLLocationTool.getUniformLocation(
                          ~pos,
                          sandbox,
                          "u_vMatrix",
                        );
                      let state =
                        state^
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~uniformMatrix4fv,
                               ~getUniformLocation,
                               (),
                             ),
                           );
                      let (
                        default11Image,
                        readStub,
                        handleBeforeStartLoop,
                        handleWhenDoneFunc,
                        state,
                      ) =
                        _prepare(sandbox, state);

                      LoadStreamWDBTool.read(
                        (
                          default11Image,
                          _buildController(sandbox),
                          handleBeforeStartLoop,
                          handleWhenDoneFunc,
                        ),
                        _buildReader(readStub),
                      )
                      |> then_(() =>
                           uniformMatrix4fv
                           |> withOneArg(pos)
                           |> getCallCount
                           |> expect == 2
                           |> resolve
                         );
                    })
                  );
                });

                testPromise("not set geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 0, _prepare, state)
                );
                testPromise("not send attribute data", () =>
                  _testNotSendAttributeData(sandbox, _prepare, state)
                );
              });

              describe("test 1,2,3,4,8", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=0, ~end_=300)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=300, ~end_=1650)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=1650, ~end_=3000)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(3)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=3000, ~end_=10000)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(4)
                    |> returns(
                         _buildChunkData(~arrayBuffer=None, ~done_=true, ()),
                       );

                  _prepareWithReadStub(sandbox, readStub, state);
                };

                testPromise("not set geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 0, _prepare, state)
                );
                testPromise("not send attribute data", () =>
                  _testNotSendAttributeData(sandbox, _prepare, state)
                );
              });

              describe("test 1,2,3,4,5,8", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=0, ~end_=300)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=300, ~end_=1650)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=1650, ~end_=3000)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(3)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=3000, ~end_=10000)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(4)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(
                                  ~start=10000,
                                  ~end_=1130000,
                                )
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(5)
                    |> returns(
                         _buildChunkData(~arrayBuffer=None, ~done_=true, ()),
                       );

                  _prepareWithReadStub(sandbox, readStub, state);
                };

                testPromise("set geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 2, _prepare, state)
                );
              });

              describe("test 1,2,3,4,5,6,8", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=0, ~end_=300)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=300, ~end_=1650)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=1650, ~end_=3000)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(3)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=3000, ~end_=10000)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(4)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(
                                  ~start=10000,
                                  ~end_=1130000,
                                )
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(5)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(
                                  ~start=1130000,
                                  ~end_=1188000,
                                )
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(6)
                    |> returns(
                         _buildChunkData(~arrayBuffer=None, ~done_=true, ()),
                       );

                  _prepareWithReadStub(sandbox, readStub, state);
                };

                testPromise("set geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 3, _prepare, state)
                );
              });

              describe("test 1,2,3,4,5,6,8", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=0, ~end_=300)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=300, ~end_=1650)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=1650, ~end_=3000)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(3)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(~start=3000, ~end_=10000)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(4)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(
                                  ~start=10000,
                                  ~end_=1130000,
                                )
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(5)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.slice(
                                  ~start=1130000,
                                  ~end_=1188000,
                                )
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(6)
                    |> returns(
                         _buildChunkData(
                           ~arrayBuffer=
                             wdbArrayBuffer^
                             |> ArrayBuffer.sliceFrom(1188000)
                             |. Some,
                           (),
                         ),
                       )
                    |> onCall(7)
                    |> returns(
                         _buildChunkData(~arrayBuffer=None, ~done_=true, ()),
                       );

                  _prepareWithReadStub(sandbox, readStub, state);
                };

                testPromise("set geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 5, _prepare, state)
                );
              });
            },
          );
        });

        describe("test AlphaBlendModeTest wdb", () => {
          let _testSetGeometryPointData =
              (sandbox, dataCount, prepareFunc, state) => {
            let state =
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let (
              default11Image,
              readStub,
              handleBeforeStartLoop,
              handleWhenDoneFunc,
              state,
            ) =
              prepareFunc(sandbox, state);
            let rootGameObjectWhenDone = ref(-1);
            let handleWhenDoneFunc = (state, rootGameObject) => {
              rootGameObjectWhenDone := rootGameObject;

              state;
            };

            LoadStreamWDBTool.read(
              (
                default11Image,
                _buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              _buildReader(readStub),
            )
            |> then_(() => {
                 let state = StateAPI.unsafeGetState();

                 let state = DirectorTool.runWithDefaultTime(state);

                 let dataArr =
                   _getAllGeometryData(rootGameObjectWhenDone^, state);

                 dataArr |> Js.Array.length |> expect == dataCount |> resolve;
               });
          };

          beforeEach(() =>
            wdbArrayBuffer := _getWDBArrayBuffer("AlphaBlendModeTest")
          );

          describe(
            {|
            1.chunk1: header + json + stream + stream_chunk1-stream_chunk4 + a part of stream_chunk5(image chunk)
            2.chunk2: other stream_chunk5 + stream_chunk6-stream_chunk44 + a part of stream_chunk45
            3.chunk3: a part of stream_chunk45
            4.chunk4: other stream chunk data
            5.done
            |},
            () =>
            describe("test 1,2,3,5", () => {
              let _prepare = (sandbox, state) => {
                let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                let readStub =
                  readStub
                  |> onCall(0)
                  |> returns(
                       _buildChunkData(
                         ~arrayBuffer=
                           wdbArrayBuffer^
                           |> ArrayBuffer.slice(~start=0, ~end_=65536)
                           |. Some,
                         (),
                       ),
                     )
                  |> onCall(1)
                  |> returns(
                       _buildChunkData(
                         ~arrayBuffer=
                           wdbArrayBuffer^
                           |> ArrayBuffer.slice(
                                ~start=65536,
                                ~end_=65536 * 2,
                              )
                           |. Some,
                         (),
                       ),
                     )
                  |> onCall(2)
                  |> returns(
                       _buildChunkData(
                         ~arrayBuffer=
                           wdbArrayBuffer^
                           |> ArrayBuffer.slice(
                                ~start=65536 * 2,
                                ~end_=65536 * 3,
                              )
                           |. Some,
                         (),
                       ),
                     )
                  |> onCall(3)
                  |> returns(
                       _buildChunkData(~arrayBuffer=None, ~done_=true, ()),
                     );

                _prepareWithReadStub(sandbox, readStub, state);
              };

              testPromise("set geometry point data", () =>
                _testSetGeometryPointData(sandbox, 8, _prepare, state)
              );
            })
          );
        });
      });
    });

    describe("if not support stream load", () => {
      let _buildFakeFetchReturnResponse = (ok, arrayBuffer) =>
        {"ok": true, "arrayBuffer": () => arrayBuffer |> resolve}
        |> Js.Promise.resolve;

      let _buildFakeFetch = (sandbox, gltfJsonStr, binBuffer) => {
        let fetch = createEmptyStubWithJsObjSandbox(sandbox);
        fetch
        |> onCall(0)
        |> returns(
             _buildFakeFetchReturnResponse(
               true,
               ConvertGLBSystem.convertGLBData((
                 gltfJsonStr |> Js.Json.parseExn,
                 binBuffer,
               )),
             ),
           );
        fetch;
      };

      beforeEach(() => GLBTool.prepare(sandbox^) |> ignore);

      testPromise("warn", () => {
        let warnStub =
          createMethodStubWithJsObjSandbox(sandbox, Console.console, "warn");
        let fetchFunc =
          _buildFakeFetch(
            sandbox,
            ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            GLBTool.buildBinBuffer(),
          );

        LoadStreamWDBTool.load(
          ~wdbPath=_buildWDBPath("BoxTextured"),
          ~fetchFunc,
          (),
        )
        |> then_(_ =>
             warnStub
             |> expect
             |> toCalledWith([|
                  "Warn: your browser does not seem to have the Streams API yet, fallback to load whole wdb",
                |])
             |> resolve
           );
      });
      describe("fallback to load whole wdb", () =>
        testPromise("load wdb and assemble", () => {
          let stateRef = ref(Obj.magic(-1));
          let rootGameObjectRef = ref(-1);
          let fetchFunc =
            _buildFakeFetch(
              sandbox,
              ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              GLBTool.buildBinBuffer(),
            );

          LoadStreamWDBTool.load(
            ~wdbPath=_buildWDBPath("BoxTextured"),
            ~fetchFunc,
            ~handleWhenLoadWholeWDBFunc=
              (state, rootGameObject) => {
                stateRef := state;
                rootGameObjectRef := rootGameObject;
              },
            (),
          )
          |> then_(_ => {
               let rootGameObject = rootGameObjectRef^;

               AssembleWDBSystemTool.getAllGameObjects(
                 rootGameObject,
                 stateRef^,
               )
               |> expect == [|rootGameObject|]
               |> resolve;
             });
        })
      );
    });
  });

/* describe
   ("test load error",
   (
   () => {

   })
   );

   describe
   ("test not support stream load",
   (
   () => {

   })
   ); */
/* }); */