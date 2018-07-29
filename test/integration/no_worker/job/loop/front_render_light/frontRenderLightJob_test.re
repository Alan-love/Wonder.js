open Wonder_jest;

let _ =
  describe("test front render light job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        RenderJobsTool.initWithJobConfig(
          sandbox,
          LoopRenderJobTool.buildNoWorkerJobConfig(),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("use program", () => {
      let _prepare = (sandbox, state) =>
        FrontRenderLightForNoWorkerAndWorkerJobTool.prepareForUseProgramCase(
          sandbox,
          state,
        );
      let _prepareForUseProgram = (sandbox, state) =>
        RenderJobsTool.prepareForUseProgramCase(sandbox, _prepare, state);
      test("test use", () => {
        let (state, program, useProgram) =
          _prepareForUseProgram(sandbox, state^);
        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
        useProgram |> expect |> toCalledWith([|program|]);
      });
      test("if the program is already used, not use again", () => {
        let (state, program, useProgram) =
          _prepareForUseProgram(sandbox, state^);
        let state = state |> RenderJobsTool.init;
        let state = state |> DirectorTool.runWithDefaultTime;
        let state = state |> DirectorTool.runWithDefaultTime;
        useProgram |> getCallCount |> expect == 1;
      });
    });
    describe("send attribute data", () => {
      let _prepare = (sandbox, state) => {
        let (state, _, _, _, _) =
          FrontRenderLightJobTool.prepareGameObject(sandbox, state);
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        state;
      };
      let _prepareWithMap = (sandbox, state) => {
        let (state, _, geometry, _, _, _) =
          FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
            sandbox,
            state,
          );
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        state;
      };
      describe("init vbo buffers when first send", () => {
        let _prepare = (sandbox, state) => {
          let (state, gameObject, geometry, _, _) =
            FrontRenderLightJobTool.prepareGameObject(sandbox, state);
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          (state, geometry);
        };
        let _prepareWithMap = (sandbox, state) => {
          let (state, _, geometry, _, _, _) =
            FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state,
            );
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          (state, geometry);
        };
        let _prepareForBufferData =
            (state, (getGeometryPointsFunc, prepareFunc)) => {
          let (state, geometry) = prepareFunc(sandbox, state^);
          let array_buffer = 1;
          let static_draw = 2;
          let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~array_buffer,
                   ~static_draw,
                   ~bufferData,
                   (),
                 ),
               );
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          let points = getGeometryPointsFunc(state);
          bufferData
          |> withThreeArgs(array_buffer, points, static_draw)
          |> expect
          |> toCalledOnce;
        };
        test("create buffers", () => {
          let (state, _) = _prepare(sandbox, state^);
          let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()),
               );
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          getCallCount(createBuffer) |> expect == 3;
        });
        describe("init vertex buffer", () => {
          test("bufferData", () =>
            _prepareForBufferData(
              state,
              (BoxGeometryAPI.getBoxGeometryVertices, _prepare),
            )
          );
          test("bind buffer and unbind buffer", () => {
            let (state, geometry) = _prepare(sandbox, state^);
            let array_buffer = 1;
            let buffer = Obj.magic(10);
            let createBuffer =
              createEmptyStubWithJsObjSandbox(sandbox) |> returns(buffer);
            let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
            let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~array_buffer,
                     ~createBuffer,
                     ~bindBuffer,
                     ~bufferData,
                     (),
                   ),
                 );
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            (
              calledBefore(
                bindBuffer |> withTwoArgs(array_buffer, buffer),
                bufferData,
              ),
              calledAfter(
                bindBuffer |> withTwoArgs(array_buffer, Js.Nullable.null),
                bufferData,
              ),
            )
            |> expect == (true, true);
          });
        });
        describe("init texCoord buffer", () =>
          test("bufferData", () =>
            _prepareForBufferData(
              state,
              (BoxGeometryAPI.getBoxGeometryTexCoords, _prepareWithMap),
            )
          )
        );
        describe("init normal buffer", () =>
          describe("bufferData", () => {
            test("boxGeometry", () =>
              _prepareForBufferData(
                state,
                (BoxGeometryAPI.getBoxGeometryNormals, _prepareWithMap),
              )
            );

            describe("test customGeometry", () => {
              describe("if not has normals", () => {
                open Js.Typed_array;

                let _prepare = (sandbox, state) => {
                  open CustomGeometryAPI;
                  let (state, geometry) = createCustomGeometry(state);
                  let state =
                    state
                    |> setCustomGeometryVertices(
                         geometry,
                         Float32Array.make([|
                           1.,
                           (-1.),
                           0.,
                           0.,
                           1.,
                           0.,
                           0.,
                           0.,
                           1.,
                           2.,
                           3.,
                           (-2.),
                         |]),
                       )
                    |> setCustomGeometryIndices(
                         geometry,
                         Uint16Array.make([|0, 2, 1, 2, 3, 1|]),
                       );

                  let (state, gameObject, geometry, _, _) =
                    FrontRenderLightJobTool.prepareGameObjectWithSharedGeometry(
                      sandbox,
                      geometry,
                      GameObjectAPI.addGameObjectCustomGeometryComponent,
                      state,
                    );
                  let (state, _, _, _) =
                    CameraTool.createCameraGameObject(state);
                  (state, geometry);
                };

                let _getComputedNormals = () =>
                  Float32Array.make([|
                    (-0.8164966106414795),
                    (-0.40824830532073975),
                    (-0.40824830532073975),
                    (-0.8164966106414795),
                    0.40824830532073975,
                    0.40824830532073975,
                    (-0.8164966106414795),
                    0.40824830532073975,
                    0.40824830532073975,
                    0.,
                    0.7071067690849304,
                    0.7071067690849304,
                  |]);

                test("compute vertex normals", () =>
                  Js.Typed_array.(
                    CustomGeometryAPI.(
                      _prepareForBufferData(
                        state,
                        (_ => _getComputedNormals(), _prepare),
                      )
                    )
                  )
                );
                test("only buffer data once", () => {
                  let (state, geometry) = _prepare(sandbox, state^);
                  let array_buffer = 1;
                  let static_draw = 2;
                  let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(
                           ~sandbox,
                           ~array_buffer,
                           ~static_draw,
                           ~bufferData,
                           (),
                         ),
                       );

                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  let state = state |> DirectorTool.runWithDefaultTime;

                  let points = _getComputedNormals();
                  bufferData
                  |> withThreeArgs(array_buffer, points, static_draw)
                  |> expect
                  |> toCalledOnce;
                });
              });
              describe("else", () =>
                test("test", () =>
                  _prepareForBufferData(
                    state,
                    (BoxGeometryAPI.getBoxGeometryVertices, _prepare),
                  )
                )
              );
            });
          })
        );
        describe("init index buffer", () => {
          test("bufferData", () => {
            let (state, geometry) = _prepare(sandbox, state^);
            let element_array_buffer = 1;
            let static_draw = 2;
            let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~element_array_buffer,
                     ~static_draw,
                     ~bufferData,
                     (),
                   ),
                 );
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            let indices = BoxGeometryAPI.getBoxGeometryIndices(state);
            bufferData
            |> withThreeArgs(element_array_buffer, indices, static_draw)
            |> expect
            |> toCalledOnce;
          });
          test("bind buffer and unbind buffer", () => {
            let (state, geometry) = _prepare(sandbox, state^);
            let element_array_buffer = 5;
            let buffer = Obj.magic(10);
            let createBuffer =
              createEmptyStubWithJsObjSandbox(sandbox) |> returns(buffer);
            let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
            let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~element_array_buffer,
                     ~createBuffer,
                     ~bindBuffer,
                     ~bufferData,
                     (),
                   ),
                 );
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            (
              calledBefore(
                bindBuffer |> withTwoArgs(element_array_buffer, buffer),
                bufferData,
              ),
              calledAfter(
                bindBuffer
                |> withTwoArgs(element_array_buffer, Js.Nullable.null),
                bufferData |> withOneArg(element_array_buffer),
              ),
            )
            |> expect == (true, true);
          });
        });
      });
      describe("send buffer", () => {
        describe("optimize", () => {
          let _prepare = (sandbox, state) => {
            let (state, _, geometry, _, _) =
              FrontRenderLightJobTool.prepareGameObject(sandbox, state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            (state, geometry);
          };
          test("if lastSendGeometryData === geometryIndex, not send", () => {
            let (state, geometry) = _prepare(sandbox, state^);
            let (state, _, _, _, _) =
              FrontRenderLightJobTool.prepareGameObjectWithSharedGeometry(
                sandbox,
                geometry,
                GameObjectAPI.addGameObjectBoxGeometryComponent,
                state,
              );
            let float = 1;
            let vertexAttribPointer =
              createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~float,
                     ~vertexAttribPointer,
                     (),
                   ),
                 );
            let state = state |> RenderJobsTool.init;
            let state = state |> DirectorTool.runWithDefaultTime;
            vertexAttribPointer |> getCallCount |> expect == 2 * 1;
          });
          test("else, send", () => {
            let (state, geometry) = _prepare(sandbox, state^);
            let (state, _, _, _, _) =
              FrontRenderLightJobTool.prepareGameObject(sandbox, state);
            let float = 1;
            let vertexAttribPointer =
              createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~float,
                     ~vertexAttribPointer,
                     (),
                   ),
                 );
            let state = state |> RenderJobsTool.init;
            let state = state |> DirectorTool.runWithDefaultTime;
            let state = state |> DirectorTool.runWithDefaultTime;
            vertexAttribPointer |> getCallCount |> expect == 4 * 2;
          });
        });
        describe("send a_position", () =>
          test("attach buffer to attribute", () => {
            let state = _prepare(sandbox, state^);
            let float = 1;
            let vertexAttribPointer =
              createEmptyStubWithJsObjSandbox(sandbox);
            let pos = 0;
            let getAttribLocation =
              GLSLLocationTool.getAttribLocation(~pos, sandbox, "a_position");
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~float,
                     ~vertexAttribPointer,
                     ~getAttribLocation,
                     (),
                   ),
                 );
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            vertexAttribPointer
            |> expect
            |> toCalledWith([|pos, 3, float, Obj.magic(false), 0, 0|]);
          })
        );
        describe("send a_texCoord", () =>
          test("attach buffer to attribute", () => {
            let state = _prepareWithMap(sandbox, state^);
            let float = 1;
            let vertexAttribPointer =
              createEmptyStubWithJsObjSandbox(sandbox);
            let pos = 0;
            let getAttribLocation =
              GLSLLocationTool.getAttribLocation(~pos, sandbox, "a_texCoord");
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~float,
                     ~vertexAttribPointer,
                     ~getAttribLocation,
                     (),
                   ),
                 );
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            vertexAttribPointer
            |> expect
            |> toCalledWith([|pos, 2, float, Obj.magic(false), 0, 0|]);
          })
        );
        describe("send a_normal", () =>
          test("attach buffer to attribute", () => {
            let state = _prepare(sandbox, state^);
            let float = 1;
            let vertexAttribPointer =
              createEmptyStubWithJsObjSandbox(sandbox);
            let createBuffer =
              createEmptyStubWithJsObjSandbox(sandbox)
              |> SinonTool.returnDifferentOnEachCall;
            let pos = 0;
            let getAttribLocation =
              GLSLLocationTool.getAttribLocation(~pos, sandbox, "a_normal");
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~float,
                     ~createBuffer,
                     ~vertexAttribPointer,
                     ~getAttribLocation,
                     (),
                   ),
                 );
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            vertexAttribPointer
            |> expect
            |> toCalledWith([|pos, 3, float, Obj.magic(false), 0, 0|]);
          })
        );
      });
    });
    describe("send uniform data", () => {
      let _prepare = (sandbox, state) => {
        let (state, gameObject, _, material, _) =
          FrontRenderLightJobTool.prepareGameObject(sandbox, state);
        let (state, _, cameraTransform, _) =
          CameraTool.createCameraGameObject(state);
        (state, gameObject, material, cameraTransform);
      };
      describe("test sended data per shader", () => {
        let _testSendShaderUniformDataOnlyOnce =
            (name, prepareSendUinformDataFunc, setFakeGlFunc) =>
          RenderJobsTool.testSendShaderUniformDataOnlyOnce(
            sandbox,
            name,
            (
              prepareSendUinformDataFunc,
              setFakeGlFunc,
              FrontRenderLightJobTool.prepareGameObject,
            ),
            state,
          );
        let testSendShaderUniformMatrix4DataOnlyOnce =
            (name, prepareSendUinformDataFunc) =>
          RenderJobsTool.testSendShaderUniformMatrix4DataOnlyOnce(
            sandbox,
            name,
            (
              prepareSendUinformDataFunc,
              FrontRenderLightJobTool.prepareGameObject,
            ),
            state,
          );
        let testSendShaderUniformMatrix3DataOnlyOnce =
            (name, prepareSendUinformDataFunc) =>
          RenderJobsTool.testSendShaderUniformMatrix3DataOnlyOnce(
            sandbox,
            name,
            (
              prepareSendUinformDataFunc,
              FrontRenderLightJobTool.prepareGameObject,
            ),
            state,
          );
        let testSendShaderUniformVec3DataOnlyOnce =
            (name, prepareSendUinformDataFunc) =>
          RenderJobsTool.testSendShaderUniformVec3DataOnlyOnce(
            sandbox,
            name,
            (
              prepareSendUinformDataFunc,
              FrontRenderLightJobTool.prepareGameObject,
            ),
            state,
          );
        GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
          sandbox,
          "u_vMatrix",
          (gameObjectTransform, cameraTransform, _, state) =>
            state
            |> TransformAPI.setTransformLocalPosition(
                 cameraTransform,
                 (10., 2., 3.),
               ),
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
            (-10.),
            (-2.),
            (-3.),
            1.,
          |]),
          ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
          ~testFunc=
            prepareSendUniformData =>
              testSendShaderUniformMatrix4DataOnlyOnce(
                "u_vMatrix",
                prepareSendUniformData,
              ),
          (),
        );
        GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
          sandbox,
          "u_pMatrix",
          (gameObjectTransform, cameraTransform, basicCameraView, state) => state,
          PerspectiveCameraProjectionTool.getPMatrixOfCreateBasicCameraViewPerspectiveCamera(),
          ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
          ~testFunc=
            prepareSendUniformData =>
              testSendShaderUniformMatrix4DataOnlyOnce(
                "u_pMatrix",
                prepareSendUniformData,
              ),
          (),
        );
        GLSLSenderTool.JudgeSendUniformData.testSendVector3(
          sandbox,
          "u_cameraPos",
          (_, _, (cameraTransform, _), state) =>
            state
            |> TransformAPI.setTransformLocalPosition(
                 cameraTransform,
                 (10., 2., 3.),
               ),
          [10., 2., 3.],
          ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
          ~testFunc=
            prepareSendUniformData =>
              testSendShaderUniformVec3DataOnlyOnce(
                "u_cameraPos",
                prepareSendUniformData,
              ),
          (),
        );
        /* describe(
             "send u_cameraPos",
             () =>
               test(
                 "test send",
                 () => {
                   let _prepare = (sandbox, state) => {
                     let (state, gameObject, _, material, _) =
                       FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                     let (state, _, cameraTransform, _) =
                       CameraTool.createCameraGameObject(state);
                     (state, gameObject, material, light, cameraTransform)
                   };
                   let (state, gameObject, material, light, cameraTransform) =
                     _prepare(sandbox, state^);
                   let state =
                     state
                     |> TransformAPI.setTransformLocalPosition(cameraTransform, (10., 2., 3.));
                   let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                   let pos = 0;
                   let getUniformLocation =
                     GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_cameraPos");
                   let state =
                     state
                     |> FakeGlTool.setFakeGl(
                          FakeGlTool.buildFakeGl(~sandbox, ~uniform3f, ~getUniformLocation, ())
                        );
                   let state =
                     state
                     |> RenderJobsTool.init

                     |> DirectorTool.runWithDefaultTime;
                   uniform3f
                   |> expect
                   |> toCalledWith(
                        [|pos|] |> Js.Array.concat([10., 2., 3.] |> Obj.magic |> Array.of_list)
                      )
                 }
               )
           ); */
        describe("test send light data", () => {
          describe("test send ambient light data", () => {
            let _setFakeGl = (sandbox, state) => {
              let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 0;
              let getUniformLocation =
                GLSLLocationTool.getUniformLocation(
                  ~pos,
                  sandbox,
                  "u_ambient",
                );
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~uniform3f,
                       ~getUniformLocation,
                       (),
                     ),
                   );
              (state, pos, uniform3f);
            };
            test("send u_ambient", () => {
              let (state, gameObject, material, cameraTransform) =
                _prepare(sandbox, state^);
              let state =
                SceneAPI.setAmbientLightColor([|1., 0., 0.5|], state);
              let (state, pos, uniform3f) = _setFakeGl(sandbox, state);

              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

              uniform3f
              |> expect
              |> toCalledWith([|pos |> Obj.magic, 1., 0., 0.5|]);
            });

            test("send shader record only once", () => {
              let (state, gameObject, material, cameraTransform) =
                _prepare(sandbox, state^);
              let (state, gameObject2, _, _, _) =
                FrontRenderLightJobTool.prepareGameObject(sandbox, state);
              let state =
                SceneAPI.setAmbientLightColor([|1., 0., 0.5|], state);
              let (state, pos, uniform3f) = _setFakeGl(sandbox, state);

              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

              uniform3f |> withOneArg(pos) |> getCallCount |> expect == 1;
            });
          });

          describe("test send direction light data", () => {
            let _prepareOne = (sandbox, state) =>
              FrontRenderLightForNoWorkerAndWorkerJobTool.prepareOneForDirectionLight(
                sandbox,
                state,
              );
            let _prepareFour = (sandbox, state) => {
              let (state, gameObject, _, material, _) =
                FrontRenderLightJobTool.prepareGameObject(sandbox, state);
              let (state, lightGameObject1, light1) =
                DirectionLightTool.createGameObject(state);
              let (state, lightGameObject2, light2) =
                DirectionLightTool.createGameObject(state);
              let (state, lightGameObject3, light3) =
                DirectionLightTool.createGameObject(state);
              let (state, lightGameObject4, light4) =
                DirectionLightTool.createGameObject(state);
              let (state, _, cameraTransform, _) =
                CameraTool.createCameraGameObject(state);
              (
                state,
                (
                  lightGameObject1,
                  lightGameObject2,
                  lightGameObject3,
                  lightGameObject4,
                ),
                material,
                (light1, light2, light3, light4),
                cameraTransform,
              );
            };
            let _setFakeGl = (sandbox, nameArr, state) =>
              FrontRenderLightForNoWorkerAndWorkerJobTool.setFakeGlForLight(
                sandbox,
                nameArr,
                state,
              );
            describe("send structure data", () => {
              describe("send position", () => {
                describe("fix bug", () =>
                  test("aaaa", () => {
                    
                    let (
                      state,
                      lightGameObject1,
                      _,
                      light1,
                      _,
                    ) =
                      _prepareOne(sandbox, state^);



  let (state, lightGameObject2, light2) = DirectionLightTool.createGameObject(state);


                    let position1 = (1., 2., 3.);
                    let position2 = (1., 4., 3.);
                    let state =
                      state
                      |> TransformAPI.setTransformPosition(
                           GameObjectAPI.unsafeGetGameObjectTransformComponent(
                             lightGameObject1,
                             state,
                           ),
                           position1,
                         );
                    let state =
                      state
                      |> TransformAPI.setTransformPosition(
                           GameObjectAPI.unsafeGetGameObjectTransformComponent(
                             lightGameObject2,
                             state,
                           ),
                           position2,
                         );
                    let (state, posArr, (uniform1f, uniform3f)) =
                      _setFakeGl(
                        sandbox,
                        [|"u_directionLights[0].position"|],
                        state,
                      );


                    let state =
                      state
                      |> RenderJobsTool.init;


        let state = GameObjectTool.disposeGameObject(lightGameObject1, state);


                    let state =
                      state
                      |> DirectorTool.runWithDefaultTime;

                    uniform3f
                    |> expect
                    |> toCalledWith([|posArr[0] |> Obj.magic, 1., 4., 3.|]);
                  })
                );

                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let position = (1., 2., 3.);
                  let state =
                    state
                    |> TransformAPI.setTransformPosition(
                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                           lightGameObject,
                           state,
                         ),
                         position,
                       );
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|"u_directionLights[0].position"|],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform3f
                  |> expect
                  |> toCalledWith([|posArr[0] |> Obj.magic, 1., 2., 3.|]);
                });
                test("test four lights", () => {
                  let (
                    state,
                    (
                      lightGameObject1,
                      lightGameObject2,
                      lightGameObject3,
                      lightGameObject4,
                    ),
                    material,
                    (light1, light2, light3, light4),
                    cameraTransform,
                  ) =
                    _prepareFour(sandbox, state^);
                  let state =
                    state
                    |> TransformAPI.setTransformPosition(
                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                           lightGameObject1,
                           state,
                         ),
                         (1., 2., 3.),
                       )
                    |> TransformAPI.setTransformPosition(
                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                           lightGameObject2,
                           state,
                         ),
                         (2., 2., 3.),
                       )
                    |> TransformAPI.setTransformPosition(
                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                           lightGameObject3,
                           state,
                         ),
                         (3., 2., 3.),
                       )
                    |> TransformAPI.setTransformPosition(
                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                           lightGameObject4,
                           state,
                         ),
                         (4., 2., 3.),
                       );
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|
                        "u_directionLights[0].position",
                        "u_directionLights[1].position",
                        "u_directionLights[2].position",
                        "u_directionLights[3].position",
                      |],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  (
                    uniform3f
                    |> withOneArg(posArr[0])
                    |> getCall(0)
                    |> getArgs,
                    uniform3f
                    |> withOneArg(posArr[1])
                    |> getCall(0)
                    |> getArgs,
                    uniform3f
                    |> withOneArg(posArr[2])
                    |> getCall(0)
                    |> getArgs,
                    uniform3f
                    |> withOneArg(posArr[3])
                    |> getCall(0)
                    |> getArgs,
                  )
                  |>
                  expect == (
                              [posArr[0] |> Obj.magic, 1., 2., 3.],
                              [posArr[1] |> Obj.magic, 2., 2., 3.],
                              [posArr[2] |> Obj.magic, 3., 2., 3.],
                              [posArr[3] |> Obj.magic, 4., 2., 3.],
                            );
                });
              });
              describe("send color", () =>
                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let color = [|1., 0., 0.|];
                  let state =
                    state
                    |> DirectionLightAPI.setDirectionLightColor(light, color);
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|"u_directionLights[0].color"|],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform3f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|] |> Js.Array.concat(color),
                     );
                })
              );
              describe("send intensity", () =>
                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let intensity = 2.;
                  let state =
                    state
                    |> DirectionLightAPI.setDirectionLightIntensity(
                         light,
                         intensity,
                       );
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|"u_directionLights[0].intensity"|],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform1f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|]
                       |> ArrayService.push(intensity),
                     );
                })
              );
            });
          });

          describe("test send point light data", () => {
            let _prepareOne = (sandbox, state) => {
              let (state, gameObject, _, material, _) =
                FrontRenderLightJobTool.prepareGameObject(sandbox, state);
              let (state, lightGameObject, light) =
                PointLightTool.createGameObject(state);
              let (state, _, cameraTransform, _) =
                CameraTool.createCameraGameObject(state);
              (state, lightGameObject, material, light, cameraTransform);
            };
            let _prepareFour = (sandbox, state) =>
              FrontRenderLightForNoWorkerAndWorkerJobTool.prepareFourForPointLight(
                sandbox,
                state,
              );
            let _setFakeGl = (sandbox, nameArr, state) =>
              FrontRenderLightForNoWorkerAndWorkerJobTool.setFakeGlForLight(
                sandbox,
                nameArr,
                state,
              );
            describe("send structure data", () => {
              describe("send position", () =>
                test("test four lights", () => {
                  let (
                    state,
                    (
                      lightGameObject1,
                      lightGameObject2,
                      lightGameObject3,
                      lightGameObject4,
                    ),
                    material,
                    (light1, light2, light3, light4),
                    cameraTransform,
                  ) =
                    _prepareFour(sandbox, state^);
                  let state =
                    state
                    |> TransformAPI.setTransformPosition(
                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                           lightGameObject1,
                           state,
                         ),
                         (1., 2., 3.),
                       )
                    |> TransformAPI.setTransformPosition(
                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                           lightGameObject2,
                           state,
                         ),
                         (2., 2., 3.),
                       )
                    |> TransformAPI.setTransformPosition(
                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                           lightGameObject3,
                           state,
                         ),
                         (3., 2., 3.),
                       )
                    |> TransformAPI.setTransformPosition(
                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                           lightGameObject4,
                           state,
                         ),
                         (4., 2., 3.),
                       );
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|
                        "u_pointLights[0].position",
                        "u_pointLights[1].position",
                        "u_pointLights[2].position",
                        "u_pointLights[3].position",
                      |],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  (
                    uniform3f
                    |> withOneArg(posArr[0])
                    |> getCall(0)
                    |> getArgs,
                    uniform3f
                    |> withOneArg(posArr[1])
                    |> getCall(0)
                    |> getArgs,
                    uniform3f
                    |> withOneArg(posArr[2])
                    |> getCall(0)
                    |> getArgs,
                    uniform3f
                    |> withOneArg(posArr[3])
                    |> getCall(0)
                    |> getArgs,
                  )
                  |>
                  expect == (
                              [posArr[0] |> Obj.magic, 1., 2., 3.],
                              [posArr[1] |> Obj.magic, 2., 2., 3.],
                              [posArr[2] |> Obj.magic, 3., 2., 3.],
                              [posArr[3] |> Obj.magic, 4., 2., 3.],
                            );
                })
              );
              describe("send color", () =>
                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let color = [|1., 0., 0.|];
                  let state =
                    state |> PointLightAPI.setPointLightColor(light, color);
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(sandbox, [|"u_pointLights[0].color"|], state);
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform3f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|] |> Js.Array.concat(color),
                     );
                })
              );
              describe("send intensity", () =>
                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let intensity = 2.;
                  let state =
                    state
                    |> PointLightAPI.setPointLightIntensity(light, intensity);
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|"u_pointLights[0].intensity"|],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform1f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|]
                       |> ArrayService.push(intensity),
                     );
                })
              );
              describe("send constant", () =>
                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let constant = 2.;
                  let state =
                    state
                    |> PointLightAPI.setPointLightConstant(light, constant);
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|"u_pointLights[0].constant"|],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform1f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|]
                       |> ArrayService.push(constant),
                     );
                })
              );
              describe("send linear", () =>
                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let linear = 2.;
                  let state =
                    state |> PointLightAPI.setPointLightLinear(light, linear);
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|"u_pointLights[0].linear"|],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform1f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|]
                       |> ArrayService.push(linear),
                     );
                })
              );
              describe("send quadratic", () =>
                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let quadratic = 2.5;
                  let state =
                    state
                    |> PointLightAPI.setPointLightQuadratic(light, quadratic);
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|"u_pointLights[0].quadratic"|],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform1f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|]
                       |> ArrayService.push(quadratic),
                     );
                })
              );
              describe("send range", () =>
                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let range = 2.;
                  let state =
                    state |> PointLightAPI.setPointLightRange(light, range);
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(sandbox, [|"u_pointLights[0].range"|], state);
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform1f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|] |> ArrayService.push(range),
                     );
                })
              );
            });
          });
        });
      });
      describe("test send light material data", () => {
        GLSLSenderTool.JudgeSendUniformData.testSendFloat(
          sandbox,
          "u_shininess",
          (
            _,
            (gameObjectTransform, material),
            (cameraTransform, basicCameraView),
            state,
          ) =>
            state |> LightMaterialAPI.setLightMaterialShininess(material, 30.),
          30.,
          ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
          (),
        );
        GLSLSenderTool.JudgeSendUniformData.testSendVector3(
          sandbox,
          "u_diffuse",
          (
            _,
            (gameObjectTransform, material),
            (cameraTransform, basicCameraView),
            state,
          ) =>
            state
            |> LightMaterialAPI.setLightMaterialDiffuseColor(
                 material,
                 [|1., 0., 0.5|],
               ),
          [1., 0., 0.5],
          ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
          (),
        );
        GLSLSenderTool.JudgeSendUniformData.testSendVector3(
          sandbox,
          "u_specular",
          (
            _,
            (gameObjectTransform, material),
            (cameraTransform, basicCameraView),
            state,
          ) =>
            state
            |> LightMaterialAPI.setLightMaterialSpecularColor(
                 material,
                 [|1., 0., 0.5|],
               ),
          [1., 0., 0.5],
          ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
          (),
        );
        describe("test with map", () =>
          describe(
            "send u_diffuseMapSampler, u_diffuse, u_specularMapSampler", () => {
            let _prepare = state => {
              let (state, gameObject, _, _, _, _) =
                FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
                  sandbox,
                  state,
                );
              let (state, _, _, _) =
                CameraTool.createCameraGameObject(state);
              let uniform1i = createEmptyStubWithJsObjSandbox(sandbox);
              let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
              let pos1 = 0;
              let pos2 = 1;
              let pos3 = 2;
              let getUniformLocation =
                GLSLLocationTool.getUniformLocation(
                  ~pos=pos1,
                  sandbox,
                  "u_diffuseMapSampler",
                );
              let getUniformLocation =
                GLSLLocationTool.stubLocation(
                  getUniformLocation,
                  pos2,
                  sandbox,
                  "u_specularMapSampler",
                );
              let getUniformLocation =
                GLSLLocationTool.stubLocation(
                  getUniformLocation,
                  pos3,
                  sandbox,
                  "u_diffuse",
                );
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~uniform1i,
                       ~uniform3f,
                       ~getUniformLocation,
                       (),
                     ),
                   );
              (state, (pos1, pos2, pos3), (uniform1i, uniform3f));
            };
            test("test send", () => {
              let (state, (pos1, pos2, pos3), (uniform1i, uniform3f)) =
                _prepare(state^);
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              (
                SinonTool.calledWithArg2(uniform1i, pos1, 0),
                SinonTool.calledWithArg2(uniform1i, pos2, 1),
                SinonTool.calledWith(uniform3f, pos3),
              )
              |> expect == (true, true, true);
            });
          })
        );
      });
      GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
        sandbox,
        "u_mMatrix",
        (gameObjectTransform, cameraTransform, _, state) =>
          state
          |> TransformAPI.setTransformLocalPosition(
               gameObjectTransform,
               (1., 2., 3.),
             ),
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
          1.,
        |]),
        ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
        (),
      );
      GLSLSenderTool.JudgeSendUniformData.testSendMatrix3(
        sandbox,
        "u_normalMatrix",
        (gameObjectTransform, cameraTransform, _, state) =>
          state
          |> TransformAPI.setTransformLocalPosition(
               gameObjectTransform,
               (10., 2., 3.),
             ),
        Js.Typed_array.Float32Array.make([|
          1.,
          0.,
          0.,
          0.,
          1.,
          0.,
          0.,
          0.,
          1.,
        |]),
        ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
        ~testFunc=
          prepareSendUniformData => {
            test("send per each gameObject", () => {
              let (
                state,
                _,
                (gameObjectTransform, _),
                cameraTransform,
                basicCameraView,
              ) =
                prepareSendUniformData(
                  sandbox,
                  FrontRenderLightJobTool.prepareGameObject,
                  state^,
                );
              let (state, gameObject2, _, _, _) =
                FrontRenderLightJobTool.prepareGameObject(sandbox, state);
              let state =
                state
                |> TransformAPI.setTransformLocalPosition(
                     gameObjectTransform,
                     (1., 2., 3.),
                   );
              let uniformMatrix3fv = createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 0;
              let getUniformLocation =
                GLSLLocationTool.getUniformLocation(
                  ~pos,
                  sandbox,
                  "u_normalMatrix",
                );
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~uniformMatrix3fv,
                       ~getUniformLocation,
                       (),
                     ),
                   );
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              uniformMatrix3fv |> expect |> toCalledTwice;
            });
            describe("test cache", ()
              /* TODO test more! when rotation/scale is enable  */
              =>
                test("test in different loops", () => {
                  let (
                    state,
                    _,
                    (gameObjectTransform, _),
                    cameraTransform,
                    basicCameraView,
                  ) =
                    prepareSendUniformData(
                      sandbox,
                      FrontRenderLightJobTool.prepareGameObject,
                      state^,
                    );
                  let state =
                    state
                    |> TransformAPI.setTransformLocalPosition(
                         gameObjectTransform,
                         (1., 2., 3.),
                       );
                  let uniformMatrix3fv =
                    createEmptyStubWithJsObjSandbox(sandbox);
                  let pos = 0;
                  let getUniformLocation =
                    GLSLLocationTool.getUniformLocation(
                      ~pos,
                      sandbox,
                      "u_normalMatrix",
                    );
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(
                           ~sandbox,
                           ~uniformMatrix3fv,
                           ~getUniformLocation,
                           (),
                         ),
                       );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  let state = state |> DirectorTool.runWithDefaultTime;
                  uniformMatrix3fv |> expect |> toCalledTwice;
                })
              );
          },
        (),
      );

      describe("fix bug", () => {
        let _prepare = state => {
          let (state, gameObject1, _, _, _, _) =
            RenderBasicJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state,
            );
          let (state, gameObject2, _, _, _, _) =
            FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state,
            );
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
          let pos1 = 0;
          let pos2 = 1;
          let getUniformLocation =
            GLSLLocationTool.getUniformLocation(
              ~pos=pos1,
              sandbox,
              "u_color",
            );
          let getUniformLocation =
            GLSLLocationTool.stubLocation(
              getUniformLocation,
              pos2,
              sandbox,
              "u_diffuse",
            );
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~uniform3f,
                   ~getUniformLocation,
                   (),
                 ),
               );

          (state, (pos1, pos2), uniform3f);
        };

        test(
          "should send uniform data which has different shaders but the same materials",
          () => {
          let (state, (pos1, pos2), uniform3f) = _prepare(state^);

          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          (
            SinonTool.calledWith(uniform3f, pos1),
            SinonTool.calledWith(uniform3f, pos2),
          )
          |> expect == (true, true);
        });
      });
    });

    describe("bind map", () => {
      test("if not has map, not bind", () => {
        let (state, gameObject, _, _, _) =
          FrontRenderLightJobTool.prepareGameObject(sandbox, state^);
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~bindTexture, ()),
             );
        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
        bindTexture |> expect |> not_ |> toCalled;
      });
      describe("else", () => {
        let _prepare = state => {
          let (state, gameObject, _, _, _, _) =
            FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state,
            );
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          let textureUnit0 = 0;
          let texture2D = Obj.magic(8);
          let glTexture1 = Obj.magic(11);
          let glTexture2 = Obj.magic(12);
          let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
          createTexture |> onCall(0) |> returns(glTexture1);
          createTexture |> onCall(1) |> returns(glTexture2);
          let activeTexture = createEmptyStubWithJsObjSandbox(sandbox);
          let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~textureUnit0,
                   ~texture2D,
                   ~createTexture,
                   ~activeTexture,
                   ~bindTexture,
                   (),
                 ),
               );
          (
            state,
            (texture2D, glTexture1, glTexture2),
            (activeTexture, bindTexture),
          );
        };
        test(
          "if texture of the specific unit is cached, not bind and active it again",
          () => {
          let (state, _, (activeTexture, _)) = _prepare(state^);
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          let state = state |> DirectorTool.runWithDefaultTime;
          activeTexture |> expect |> toCalledTwice;
        });
        describe("else", () => {
          test("active texture unit", () => {
            let (state, _, (activeTexture, _)) = _prepare(state^);
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            (
              SinonTool.calledWith(activeTexture, 0),
              SinonTool.calledWith(activeTexture, 1),
            )
            |> expect == (true, true);
          });
          test("bind gl texture to TEXTURE_2D target", () => {
            let (
              state,
              (texture2D, glTexture1, glTexture2),
              (_, bindTexture),
            ) =
              _prepare(state^);
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            (
              SinonTool.calledWithArg2(bindTexture, texture2D, glTexture1),
              SinonTool.calledWithArg2(bindTexture, texture2D, glTexture2),
            )
            |> expect == (true, true);
          });
        });
      });
    });

    describe("update map", () => {
      let _prepare = (~state, ~width=2, ~height=4, ()) => {
        let (state, gameObject, _, _, _, (diffuseMap, specularMap)) =
          FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
            sandbox,
            state,
          );
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        /* let source = Obj.magic({"width": width, "height": height}); */
        let source1 = BasicSourceTextureTool.buildSource(width, height);
        let source2 = BasicSourceTextureTool.buildSource(width, height);
        let state =
          state
          |> BasicSourceTextureAPI.setBasicSourceTextureSource(
               diffuseMap,
               source1,
             );
        let state =
          state
          |> BasicSourceTextureAPI.setBasicSourceTextureSource(
               specularMap,
               source2,
             );
        (state, (diffuseMap, specularMap));
      };
      test("if is updated before, not update", () => {
        let (state, _) = _prepare(~state=state^, ());
        let unpackFlipYWebgl = Obj.magic(2);
        let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~unpackFlipYWebgl,
                 ~pixelStorei,
                 (),
               ),
             );
        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
        let state = state |> DirectorTool.runWithDefaultTime;
        let state = state |> DirectorTool.runWithDefaultTime;
        pixelStorei |> withOneArg(unpackFlipYWebgl) |> expect |> toCalledTwice;
      });
      test("if source not exist, not update", () => {
        let (state, gameObject, _, _, _, _) =
          FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
            sandbox,
            state^,
          );
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        let unpackFlipYWebgl = Obj.magic(2);
        let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~unpackFlipYWebgl,
                 ~pixelStorei,
                 (),
               ),
             );
        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
        pixelStorei
        |> withOneArg(unpackFlipYWebgl)
        |> expect
        |> not_
        |> toCalled;
      });
      test("set flipY", () => {
        let (state, (map1, map2)) = _prepare(~state=state^, ());
        let state =
          state
          |> BasicSourceTextureAPI.setBasicSourceTextureFlipY(map1, false)
          |> BasicSourceTextureAPI.setBasicSourceTextureFlipY(map2, true);
        let unpackFlipYWebgl = Obj.magic(2);
        let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~unpackFlipYWebgl,
                 ~pixelStorei,
                 (),
               ),
             );
        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
        pixelStorei
        |> withTwoArgs(unpackFlipYWebgl, true)
        |> expect
        |> toCalledOnce;
      });
    });

    describe("test set map at runtime which has no map before", () =>
      test("replace material component", () => {
        let (state, gameObject1, _, material1, _) =
          FrontRenderLightJobTool.prepareGameObject(sandbox, state^);
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        let uniform1i = createEmptyStubWithJsObjSandbox(sandbox);
        let pos1 = 0;
        let pos2 = 1;
        let getUniformLocation =
          GLSLLocationTool.getUniformLocation(
            ~pos=pos1,
            sandbox,
            "u_diffuseMapSampler",
          );
        let getUniformLocation =
          GLSLLocationTool.stubLocation(
            getUniformLocation,
            pos2,
            sandbox,
            "u_specularMapSampler",
          );
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~uniform1i,
                 ~getUniformLocation,
                 (),
               ),
             );
        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

        let state =
          GameObjectAPI.disposeGameObjectLightMaterialComponent(
            gameObject1,
            material1,
            state,
          );
        let (state, material2, _) =
          LightMaterialTool.createMaterialWithMap(state);
        let state =
          GameObjectAPI.addGameObjectLightMaterialComponent(
            gameObject1,
            material2,
            state,
          );
        let state = GameObjectAPI.initGameObject(gameObject1, state);
        let state = state |> DirectorTool.runWithDefaultTime;

        (
          uniform1i |> withOneArg(pos1) |> getCallCount,
          uniform1i |> withOneArg(pos2) |> getCallCount,
        )
        |> expect == (1, 1);
      })
    );

    describe("test remove map at runtime which has map before", () =>
      test("replace material component", () => {
        let (state, gameObject1, _, material1, _, (diffuseMap, specularMap)) =
          FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
            sandbox,
            state^,
          );
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        let uniform1i = createEmptyStubWithJsObjSandbox(sandbox);
        let pos1 = 0;
        let pos2 = 1;
        let getUniformLocation =
          GLSLLocationTool.getUniformLocation(
            ~pos=pos1,
            sandbox,
            "u_diffuseMapSampler",
          );
        let getUniformLocation =
          GLSLLocationTool.stubLocation(
            getUniformLocation,
            pos2,
            sandbox,
            "u_specularMapSampler",
          );
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~uniform1i,
                 ~getUniformLocation,
                 (),
               ),
             );
        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

        let state =
          GameObjectAPI.disposeGameObjectLightMaterialComponent(
            gameObject1,
            material1,
            state,
          );
        let (state, material2) = LightMaterialAPI.createLightMaterial(state);
        let state =
          GameObjectAPI.addGameObjectLightMaterialComponent(
            gameObject1,
            material2,
            state,
          );
        let state = GameObjectAPI.initGameObject(gameObject1, state);
        let state = state |> DirectorTool.runWithDefaultTime;

        (
          uniform1i |> withOneArg(pos1) |> getCallCount,
          uniform1i |> withOneArg(pos2) |> getCallCount,
        )
        |> expect == (1, 1);
      })
    );

    describe("draw", () =>
      describe(
        "if geometry has index buffer, bind index buffer and drawElements", () => {
        let _prepareForDrawElements = (sandbox, state) => {
          let (state, _, geometry, _, _) =
            FrontRenderLightJobTool.prepareGameObject(sandbox, state);
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          (state, geometry);
        };
        test("drawElements", () => {
          let (state, geometry) = _prepareForDrawElements(sandbox, state^);
          let triangles = 1;
          let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~triangles,
                   ~drawElements,
                   (),
                 ),
               );
          let state = state |> RenderJobsTool.init;
          let state = state |> DirectorTool.runWithDefaultTime;
          drawElements
          |> withFourArgs(
               triangles,
               BoxGeometryTool.getIndicesCount(
                 geometry,
                 CreateRenderStateMainService.createRenderState(state),
               ),
               GeometryTool.getIndexType(
                 CreateRenderStateMainService.createRenderState(state),
               ),
               GeometryTool.getIndexTypeSize(
                 CreateRenderStateMainService.createRenderState(state),
               )
               * 0,
             )
          |> expect
          |> toCalledOnce;
        });
      })
    );
  });