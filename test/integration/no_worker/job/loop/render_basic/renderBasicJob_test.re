open Wonder_jest;

let _ =
  describe(
    "test render basic job",
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
            RenderJobsTool.initWithJobConfig(sandbox, LoopRenderJobTool.buildNoWorkerJobConfig())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "use program",
        () => {
          let _prepare = (sandbox, state) =>
            RenderBasicForNoWorkerAndWorkerJobTool.prepareForUseProgramCase(sandbox, state);
          let _prepareForUseProgram = (sandbox, state) =>
            RenderJobsTool.prepareForUseProgramCase(sandbox, _prepare, state);
          test(
            "test use",
            () => {
              let (state, program, useProgram) = _prepareForUseProgram(sandbox, state^);
              let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              useProgram |> expect |> toCalledWith([|program|])
            }
          );
          test(
            "if the program is already used, not use again",
            () => {
              let (state, program, useProgram) = _prepareForUseProgram(sandbox, state^);
              let state = state |> RenderJobsTool.init;
              let state = state |> DirectorTool.runWithDefaultTime;
              let state = state |> DirectorTool.runWithDefaultTime;
              useProgram |> getCallCount |> expect == 1
            }
          )
          /* test
             ("different shader use different program",
             (
             () => {

             })
             ); */
          /* TODO should test with more attribute */
          /* describe(
               "disable all attributes",
               () => {
                 let _prepareForDisable = (sandbox, state) => {
                   let state = _prepare(sandbox, state);
                   let pos = 0;
                   let getAttribLocation =
                     GLSLLocationTool.getAttribLocation(~pos, sandbox, "a_position");
                   let disableVertexAttribArray = createEmptyStubWithJsObjSandbox(sandbox);
                   let state =
                     state
                     |> FakeGlTool.setFakeGl(
                          FakeGlTool.buildFakeGl(
                            ~sandbox,
                            ~getAttribLocation,
                            ~disableVertexAttribArray,
                            ()
                          )
                        );
                   (state, pos, disableVertexAttribArray)
                 };
                 test(
                   "if switch program, disable all attributes",
                   () => {
                     let (state, pos, disableVertexAttribArray) = _prepareForDisable(sandbox, state^);
                     let state = state |> RenderJobsTool.init;
                     let state = state |> DirectorTool.runWithDefaultTime;
                     let state = state |> ProgramTool.clearLastUsedProgram;
                     let state = state |> DirectorTool.runWithDefaultTime;
                     disableVertexAttribArray |> withOneArg(pos) |> getCallCount |> expect == 1
                   }
                 );
                 test(
                   "else, not disable",
                   () => {
                     let (state, pos, disableVertexAttribArray) = _prepareForDisable(sandbox, state^);
                     let state = state |> RenderJobsTool.init;
                     let state = state |> DirectorTool.runWithDefaultTime;
                     let state = state |> DirectorTool.runWithDefaultTime;
                     disableVertexAttribArray |> withOneArg(pos) |> getCallCount |> expect == 0
                   }
                 )
               }
             ) */
        }
      );
      describe(
        "send attribute data",
        () => {
          let _prepare = (sandbox, state) => {
            /* let (state, _, _, _, _) = RenderBasicJobTool.prepareGameObject(sandbox, state); */
            let (state, gameObject, geometry, _, _, _) =
              RenderBasicJobTool.prepareGameObjectWithMap(sandbox, state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            state
          };
          describe(
            "init vbo buffers when first send",
            () => {
              let _prepare = (sandbox, state) => {
                let (state, gameObject, geometry, _, _, _) =
                  RenderBasicJobTool.prepareGameObjectWithMap(sandbox, state);
                let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                (state, geometry)
              };
              let _prepareForBufferData = (state, getBoxGeometryPointsFunc) => {
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
                         ()
                       )
                     );
                let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                let points = getBoxGeometryPointsFunc(state);
                bufferData
                |> withThreeArgs(array_buffer, points, static_draw)
                |> expect
                |> toCalledOnce
              };
              test(
                "create buffer",
                () => {
                  let (state, _) = _prepare(sandbox, state^);
                  let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()));
                  let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                  getCallCount(createBuffer) |> expect == 3
                }
              );
              describe(
                "init vertex buffer",
                () => {
                  test(
                    "bufferData",
                    () => _prepareForBufferData(state, BoxGeometryAPI.getBoxGeometryVertices)
                  );
                  test(
                    "bind buffer and unbind buffer",
                    () => {
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
                               ()
                             )
                           );
                      let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                      (
                        calledBefore(bindBuffer |> withTwoArgs(array_buffer, buffer), bufferData),
                        calledAfter(
                          bindBuffer |> withTwoArgs(array_buffer, Js.Nullable.null),
                          bufferData
                        )
                      )
                      |> expect == (true, true)
                    }
                  )
                }
              );
              describe(
                "init texCoord buffer",
                () =>
                  test(
                    "bufferData",
                    () => _prepareForBufferData(state, BoxGeometryAPI.getBoxGeometryTexCoords)
                  )
              );
              describe(
                "init index buffer",
                () => {
                  test(
                    "bufferData",
                    () => {
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
                               ()
                             )
                           );
                      let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                      let indices = BoxGeometryAPI.getBoxGeometryIndices(state);
                      bufferData
                      |> withThreeArgs(element_array_buffer, indices, static_draw)
                      |> expect
                      |> toCalledOnce
                    }
                  );
                  test(
                    "bind buffer and unbind buffer",
                    () => {
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
                               ()
                             )
                           );
                      let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                      (
                        calledBefore(
                          bindBuffer |> withTwoArgs(element_array_buffer, buffer),
                          bufferData
                        ),
                        calledAfter(
                          bindBuffer |> withTwoArgs(element_array_buffer, Js.Nullable.null),
                          bufferData |> withOneArg(element_array_buffer)
                        )
                      )
                      |> expect == (true, true)
                    }
                  )
                }
              )
            }
          );
          describe(
            "send buffer",
            () => {
              describe(
                "optimize",
                () => {
                  let _prepare = (sandbox, state) => {
                    let (state, _, geometry, _, _) =
                      RenderBasicJobTool.prepareGameObject(sandbox, state);
                    let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                    (state, geometry)
                  };
                  test(
                    "if lastSendGeometry === geometryIndex, not send",
                    () => {
                      let (state, geometry) = _prepare(sandbox, state^);
                      let (state, _, _, _, _) =
                        RenderBasicJobTool.prepareGameObjectWithSharedGeometry(
                          sandbox,
                          geometry,
                          state
                        );
                      let float = 1;
                      let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~float, ~vertexAttribPointer, ())
                           );
                      let state = state |> RenderJobsTool.init;
                      let state = state |> DirectorTool.runWithDefaultTime;
                      vertexAttribPointer |> getCallCount |> expect == 1
                    }
                  );
                  test(
                    "else, send",
                    () => {
                      let (state, geometry) = _prepare(sandbox, state^);
                      let (state, _, _, _, _) =
                        RenderBasicJobTool.prepareGameObject(sandbox, state);
                      let float = 1;
                      let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~float, ~vertexAttribPointer, ())
                           );
                      let state = state |> RenderJobsTool.init;
                      let state = state |> DirectorTool.runWithDefaultTime;
                      vertexAttribPointer |> getCallCount |> expect == 2
                    }
                  )
                }
              );
              describe(
                "send a_position",
                () => {
                  test(
                    "bind array buffer",
                    () => {
                      let state = _prepare(sandbox, state^);
                      let array_buffer = 1;
                      let buffer = Obj.magic(10);
                      let createBuffer =
                        createEmptyStubWithJsObjSandbox(sandbox) |> returns(buffer);
                      let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~array_buffer,
                               ~createBuffer,
                               ~bindBuffer,
                               ()
                             )
                           );
                      let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                      bindBuffer |> expect |> toCalledWith([|array_buffer, buffer|])
                    }
                  );
                  test(
                    "attach buffer to attribute",
                    () => {
                      let state = _prepare(sandbox, state^);
                      let float = 1;
                      let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
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
                               ()
                             )
                           );
                      let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                      vertexAttribPointer
                      |> expect
                      |> toCalledWith([|pos, 3, float, Obj.magic(Js.false_), 0, 0|])
                    }
                  );
                  describe(
                    "enable attribute",
                    () => {
                      test(
                        "if already enabled since use this program, not enable",
                        () => {
                          let state = _prepare(sandbox, state^);
                          let float = 1;
                          let enableVertexAttribArray = createEmptyStubWithJsObjSandbox(sandbox);
                          let pos = 0;
                          let getAttribLocation =
                            GLSLLocationTool.getAttribLocation(~pos, sandbox, "a_position");
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(
                                   ~sandbox,
                                   ~float,
                                   ~enableVertexAttribArray,
                                   ~getAttribLocation,
                                   ()
                                 )
                               );
                          let state = state |> RenderJobsTool.init;
                          let state = state |> DirectorTool.runWithDefaultTime;
                          let state = state |> DirectorTool.runWithDefaultTime;
                          enableVertexAttribArray |> withOneArg(pos) |> getCallCount |> expect == 1
                        }
                      );
                      test(
                        "else, enable",
                        () => {
                          let state = _prepare(sandbox, state^);
                          let float = 1;
                          let enableVertexAttribArray = createEmptyStubWithJsObjSandbox(sandbox);
                          let pos = 0;
                          let getAttribLocation =
                            GLSLLocationTool.getAttribLocation(~pos, sandbox, "a_position");
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(
                                   ~sandbox,
                                   ~float,
                                   ~enableVertexAttribArray,
                                   ~getAttribLocation,
                                   ()
                                 )
                               );
                          let state = state |> RenderJobsTool.init;
                          let state = state |> DirectorTool.runWithDefaultTime;
                          let state =
                            state
                            |> GLSLSenderTool.disableVertexAttribArray
                            |> GLSLSenderTool.clearLastSendGeometry;
                          let state = state |> DirectorTool.runWithDefaultTime;
                          enableVertexAttribArray |> withOneArg(pos) |> getCallCount |> expect == 2
                        }
                      )
                      /* test
                         ("differenc shader's vertexAttribHistory of the same attribute record pos are independent",
                         (
                         () => {
                           TODO test switch program
                         })
                         );
                         */
                    }
                  )
                }
              );
              describe(
                "send a_texCoord",
                () =>
                  test(
                    "attach buffer to attribute",
                    () => {
                      let state = _prepare(sandbox, state^);
                      let float = 1;
                      let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
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
                               ()
                             )
                           );
                      let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                      vertexAttribPointer
                      |> expect
                      |> toCalledWith([|pos, 2, float, Obj.magic(Js.false_), 0, 0|])
                    }
                  )
              )
            }
          )
        }
      );
      describe(
        "send uniform data",
        () => {
          let testSendShaderUniformMatrix4DataOnlyOnce = (name, prepareSendUinformDataFunc) =>
            RenderJobsTool.testSendShaderUniformMatrix4DataOnlyOnce(
              sandbox,
              name,
              (prepareSendUinformDataFunc, RenderBasicJobTool.prepareGameObject),
              state
            );
          GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
            sandbox,
            "u_mMatrix",
            (gameObjectTransform, cameraTransform, _, state) => {
              let state =
                state |> TransformAPI.setTransformLocalPosition(gameObjectTransform, (1., 2., 3.));
              state
            },
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
            |]),
            ~prepareGameObjectFunc=RenderBasicJobTool.prepareGameObject,
            ~testFunc=
              (prepareSendUniformData) => {
                test(
                  "if not do any transform operation, should still send identity matrix value on the first send",
                  () => {
                    let (state, _, (gameObjectTransform, _), cameraTransform, basicCameraView) =
                      prepareSendUniformData(
                        sandbox,
                        RenderBasicJobTool.prepareGameObject,
                        state^
                      );
                    let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 0;
                    let getUniformLocation =
                      GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_mMatrix");
                    let state =
                      state
                      |> FakeGlTool.setFakeGl(
                           FakeGlTool.buildFakeGl(
                             ~sandbox,
                             ~uniformMatrix4fv,
                             ~getUniformLocation,
                             ()
                           )
                         );
                    let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                    uniformMatrix4fv
                    |> expect
                    |> toCalledWith([|
                         pos,
                         Obj.magic(Js.false_),
                         Obj.magic(TransformTool.getDefaultLocalToWorldMatrixTypeArray(state))
                       |])
                  }
                );
                describe(
                  "test two gameObjects",
                  () =>
                    test(
                      "if only set first one's transform, second one's sended u_mMatrix data shouldn't be affect",
                      () => {
                        let (state, _, (gameObjectTransform, _), cameraTransform, basicCameraView) =
                          prepareSendUniformData(
                            sandbox,
                            RenderBasicJobTool.prepareGameObject,
                            state^
                          );
                        let (state, gameObject2, _, _, _) =
                          RenderBasicJobTool.prepareGameObject(sandbox, state);
                        let state =
                          state
                          |> TransformAPI.setTransformLocalPosition(
                               gameObjectTransform,
                               (1., 2., 3.)
                             );
                        let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                        let pos = 0;
                        let getUniformLocation =
                          GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_mMatrix");
                        let state =
                          state
                          |> FakeGlTool.setFakeGl(
                               FakeGlTool.buildFakeGl(
                                 ~sandbox,
                                 ~uniformMatrix4fv,
                                 ~getUniformLocation,
                                 ()
                               )
                             );
                        let state =
                          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                        uniformMatrix4fv
                        |> withOneArg(pos)
                        |> getCall(1)
                        |> expect
                        |> toCalledWith([|
                             pos,
                             Obj.magic(Js.false_),
                             Obj.magic(TransformTool.getDefaultLocalToWorldMatrixTypeArray(state))
                           |])
                      }
                    )
                )
              },
            ()
          );
          GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
            sandbox,
            "u_vMatrix",
            (gameObjectTransform, cameraTransform, _, state) =>
              state |> TransformAPI.setTransformLocalPosition(cameraTransform, (10., 2., 3.)),
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
              1.
            |]),
            ~prepareGameObjectFunc=RenderBasicJobTool.prepareGameObject,
            ~testFunc=
              (prepareSendUniformData) =>
                testSendShaderUniformMatrix4DataOnlyOnce("u_vMatrix", prepareSendUniformData),
            ()
          );
          GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
            sandbox,
            "u_pMatrix",
            (gameObjectTransform, cameraTransform, basicCameraView, state) => state,
            PerspectiveCameraProjectionTool.getPMatrixOfCreateBasicCameraViewPerspectiveCamera(),
            ~prepareGameObjectFunc=RenderBasicJobTool.prepareGameObject,
            ~testFunc=
              (prepareSendUniformData) =>
                testSendShaderUniformMatrix4DataOnlyOnce("u_pMatrix", prepareSendUniformData),
            ()
          );
          GLSLSenderTool.JudgeSendUniformData.testSendVector3(
            sandbox,
            "u_color",
            (_, (gameObjectTransform, material), (cameraTransform, basicCameraView), state) =>
              state |> BasicMaterialAPI.setBasicMaterialColor(material, [|0., 1., 0.2|]),
            [0., 1., 0.20000000298023224],
            ~prepareGameObjectFunc=RenderBasicJobTool.prepareGameObject,
            ~testFunc=
              (prepareSendUniformData) =>
                describe(
                  "test two gameObjects",
                  () =>
                    test(
                      "if only set first one's color, second one's sended u_color record shouldn't be affect",
                      () => {
                        let name = "u_color";
                        let (state, _, (_, material1), _, _) =
                          prepareSendUniformData(
                            sandbox,
                            RenderBasicJobTool.prepareGameObject,
                            state^
                          );
                        let (state, gameObject2, _, material2, _) =
                          RenderBasicJobTool.prepareGameObject(sandbox, state);
                        let state =
                          state
                          |> BasicMaterialAPI.setBasicMaterialColor(material1, [|0., 1., 0.2|]);
                        let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                        let pos = 0;
                        let getUniformLocation =
                          GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
                        let state =
                          state
                          |> FakeGlTool.setFakeGl(
                               FakeGlTool.buildFakeGl(
                                 ~sandbox,
                                 ~uniform3f,
                                 ~getUniformLocation,
                                 ()
                               )
                             );
                        let state =
                          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                        let defaultData = [1., 1., 1.];
                        uniform3f
                        |> withOneArg(pos)
                        |> getCall(1)
                        |> getArgs
                        |> expect == [pos, ...defaultData |> Obj.magic]
                      }
                    )
                ),
            ()
          );
          describe(
            "send u_sampler2D",
            () => {
              let _prepare = (state) => {
                let (state, gameObject, _, _, _, _) =
                  RenderBasicJobTool.prepareGameObjectWithMap(sandbox, state);
                let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                let uniform1i = createEmptyStubWithJsObjSandbox(sandbox);
                let pos = 0;
                let getUniformLocation =
                  GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_sampler2D");
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ~uniform1i, ~getUniformLocation, ())
                     );
                (state, pos, uniform1i)
              };
              test(
                "if cached, not send",
                () => {
                  let (state, pos, uniform1i) = _prepare(state^);
                  let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                  let state = state |> DirectorTool.runWithDefaultTime;
                  uniform1i |> withTwoArgs(pos, 0) |> expect |> toCalledOnce
                }
              );
              test(
                "else, send",
                () => {
                  let (state, pos, uniform1i) = _prepare(state^);
                  let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                  uniform1i |> withOneArg(pos) |> expect |> toCalledWith([|pos, 0|])
                }
              )
            }
          )
        }
      );
      describe(
        "bind map",
        () => {
          test(
            "if not has map, not bind",
            () => {
              let (state, gameObject, _, _, _) =
                RenderBasicJobTool.prepareGameObject(sandbox, state^);
              let (state, _, _, _) = CameraTool.createCameraGameObject(state);
              let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~bindTexture, ()));
              let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              bindTexture |> expect |> not_ |> toCalled
            }
          );
          describe(
            "else",
            () => {
              let _prepare = (state) => {
                let (state, gameObject, _, _, _, _) =
                  RenderBasicJobTool.prepareGameObjectWithMap(sandbox, state);
                let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                let textureUnit0 = 0;
                let texture2D = Obj.magic(8);
                let glTexture = Obj.magic(11);
                let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
                createTexture |> onCall(0) |> returns(glTexture);
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
                         ()
                       )
                     );
                (state, (texture2D, glTexture), (activeTexture, bindTexture))
              };
              test(
                "if texture of the specific unit is cached, not bind and active it again",
                () => {
                  let (state, _, (activeTexture, _)) = _prepare(state^);
                  let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                  let state = state |> DirectorTool.runWithDefaultTime;
                  activeTexture |> expect |> toCalledOnce
                }
              );
              describe(
                "else",
                () => {
                  test(
                    "active texture unit 0",
                    () => {
                      let (state, _, (activeTexture, _)) = _prepare(state^);
                      let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                      activeTexture |> expect |> toCalledWith([|0|])
                    }
                  );
                  test(
                    "bind gl texture to TEXTURE_2D target",
                    () => {
                      let (state, (texture2D, glTexture), (_, bindTexture)) = _prepare(state^);
                      let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                      bindTexture |> expect |> toCalledWith([|texture2D, glTexture|])
                    }
                  )
                }
              )
            }
          )
        }
      );
      describe(
        "update map",
        () => {
          let _prepare = (~state, ~width=2, ~height=4, ()) => {
            let (state, gameObject, _, _, _, map) =
              RenderBasicJobTool.prepareGameObjectWithMap(sandbox, state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            let source = Obj.magic({"width": width, "height": height});
            let state = state |> TextureAPI.setTextureSource(map, source);
            (state, map)
          };
          test(
            "if is updated before, not update",
            () => {
              let (state, map) = _prepare(~state=state^, ());
              let unpackFlipYWebgl = Obj.magic(2);
              let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~unpackFlipYWebgl, ~pixelStorei, ())
                   );
              let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              let state = state |> DirectorTool.runWithDefaultTime;
              let state = state |> DirectorTool.runWithDefaultTime;
              pixelStorei |> withOneArg(unpackFlipYWebgl) |> expect |> toCalledOnce
            }
          );
          test(
            "if source not exist, not update",
            () => {
              let (state, gameObject, _, _, _, map) =
                RenderBasicJobTool.prepareGameObjectWithMap(sandbox, state^);
              let (state, _, _, _) = CameraTool.createCameraGameObject(state);
              let unpackFlipYWebgl = Obj.magic(2);
              let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~unpackFlipYWebgl, ~pixelStorei, ())
                   );
              let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              pixelStorei |> withOneArg(unpackFlipYWebgl) |> expect |> not_ |> toCalled
            }
          );
          test(
            "set flipY true",
            () => {
              let (state, map) = _prepare(~state=state^, ());
              let unpackFlipYWebgl = Obj.magic(2);
              let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~unpackFlipYWebgl, ~pixelStorei, ())
                   );
              let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              pixelStorei |> withTwoArgs(unpackFlipYWebgl, Js.true_) |> expect |> toCalledOnce
            }
          );
          describe(
            "set texture parameters",
            () => {
              describe(
                "if source is power of two",
                () => {
                  let _prepare = (state) => {
                    let (state, map) = _prepare(~state, ~width=2, ~height=4, ());
                    (state, map)
                  };
                  test(
                    "set wrap",
                    () => {
                      let (state, map) = _prepare(state^);
                      let texture2D = Obj.magic(1);
                      let textureWrapS = Obj.magic(2);
                      let textureWrapT = Obj.magic(3);
                      let clampToEdge = Obj.magic(4);
                      let texParameteri = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~texture2D,
                               ~textureWrapS,
                               ~textureWrapT,
                               ~clampToEdge,
                               ~texParameteri,
                               ()
                             )
                           );
                      let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                      (
                        texParameteri
                        |> withThreeArgs(texture2D, textureWrapS, clampToEdge)
                        |> getCallCount,
                        texParameteri
                        |> withThreeArgs(texture2D, textureWrapT, clampToEdge)
                        |> getCallCount
                      )
                      |> expect == (1, 1)
                    }
                  );
                  test(
                    "set filter",
                    () => {
                      let (state, map) = _prepare(state^);
                      let texture2D = Obj.magic(1);
                      let nearest = Obj.magic(2);
                      let linear = Obj.magic(3);
                      let textureMagFilter = Obj.magic(4);
                      let textureMinFilter = Obj.magic(5);
                      let texParameteri = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~texture2D,
                               ~nearest,
                               ~linear,
                               ~textureMagFilter,
                               ~textureMinFilter,
                               ~texParameteri,
                               ()
                             )
                           );
                      let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                      (
                        texParameteri
                        |> withThreeArgs(texture2D, textureMagFilter, linear)
                        |> getCallCount,
                        texParameteri
                        |> withThreeArgs(texture2D, textureMinFilter, nearest)
                        |> getCallCount
                      )
                      |> expect == (1, 1)
                    }
                  )
                }
              );
              describe(
                "else",
                () => {
                  let _prepare = (state) => {
                    let (state, map) = _prepare(~state, ~width=3, ~height=4, ());
                    (state, map)
                  };
                  test(
                    "set wrap to CLAMP_TO_EDGE",
                    () => {
                      let (state, map) = _prepare(state^);
                      let texture2D = Obj.magic(1);
                      let textureWrapS = Obj.magic(2);
                      let textureWrapT = Obj.magic(3);
                      let clampToEdge = Obj.magic(4);
                      let texParameteri = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~texture2D,
                               ~textureWrapS,
                               ~textureWrapT,
                               ~clampToEdge,
                               ~texParameteri,
                               ()
                             )
                           );
                      let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                      (
                        texParameteri
                        |> withThreeArgs(texture2D, textureWrapS, clampToEdge)
                        |> getCallCount,
                        texParameteri
                        |> withThreeArgs(texture2D, textureWrapT, clampToEdge)
                        |> getCallCount
                      )
                      |> expect == (1, 1)
                    }
                  );
                  describe(
                    "set filter with fallback",
                    () => {
                      let _setFakeGl = (sandbox, state) => {
                        let texture2D = Obj.magic(1);
                        let nearest = Obj.magic(2);
                        let linear = Obj.magic(3);
                        let textureMagFilter = Obj.magic(4);
                        let textureMinFilter = Obj.magic(5);
                        let texParameteri = createEmptyStubWithJsObjSandbox(sandbox);
                        let state =
                          state
                          |> FakeGlTool.setFakeGl(
                               FakeGlTool.buildFakeGl(
                                 ~sandbox,
                                 ~texture2D,
                                 ~nearest,
                                 ~linear,
                                 ~textureMagFilter,
                                 ~textureMinFilter,
                                 ~texParameteri,
                                 ()
                               )
                             );
                        (
                          state,
                          texture2D,
                          nearest,
                          linear,
                          textureMagFilter,
                          textureMinFilter,
                          texParameteri
                        )
                      };
                      test(
                        "if filter === NEAREST or NEAREST_MIPMAP_MEAREST or NEAREST_MIPMAP_LINEAR, set NEAREST",
                        () => {
                          let (state, map) = _prepare(state^);
                          let state =
                            state
                            |> TextureAPI.setTextureMagFilter(
                                 map,
                                 TextureTool.getFilterNearestMipmapLinear()
                               )
                            |> TextureAPI.setTextureMinFilter(map, TextureTool.getFilterNearest());
                          let (
                            state,
                            texture2D,
                            nearest,
                            linear,
                            textureMagFilter,
                            textureMinFilter,
                            texParameteri
                          ) =
                            _setFakeGl(sandbox, state);
                          let state =
                            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                          (
                            texParameteri
                            |> withThreeArgs(texture2D, textureMagFilter, nearest)
                            |> getCallCount,
                            texParameteri
                            |> withThreeArgs(texture2D, textureMinFilter, nearest)
                            |> getCallCount
                          )
                          |> expect == (1, 1)
                        }
                      );
                      test(
                        "else, set LINEAR",
                        () => {
                          let (state, map) = _prepare(state^);
                          let state =
                            state
                            |> TextureAPI.setTextureMagFilter(
                                 map,
                                 TextureTool.getFilterLinearMipmapNearest()
                               )
                            |> TextureAPI.setTextureMinFilter(map, TextureTool.getFilterLinear());
                          let (
                            state,
                            texture2D,
                            nearest,
                            linear,
                            textureMagFilter,
                            textureMinFilter,
                            texParameteri
                          ) =
                            _setFakeGl(sandbox, state);
                          let state =
                            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                          (
                            texParameteri
                            |> withThreeArgs(texture2D, textureMagFilter, linear)
                            |> getCallCount,
                            texParameteri
                            |> withThreeArgs(texture2D, textureMinFilter, linear)
                            |> getCallCount
                          )
                          |> expect == (1, 1)
                        }
                      )
                    }
                  )
                }
              )
            }
          );
          describe(
            "allocate source to texture",
            () =>
              describe(
                "draw no mipmap twoD texture",
                () =>
                  test(
                    "test",
                    () => {
                      /* TODO set format,type */
                      let (state, map) = _prepare(~state=state^, ());
                      let source = TextureAPI.unsafeGetTextureSource(map, state);
                      let texture2D = Obj.magic(1);
                      let rgba = Obj.magic(2);
                      let unsignedByte = Obj.magic(3);
                      let texImage2D = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~texture2D,
                               ~rgba,
                               ~unsignedByte,
                               ~texImage2D,
                               ()
                             )
                           );
                      let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                      texImage2D
                      |> expect
                      |> toCalledWith([|
                           texture2D,
                           0,
                           rgba,
                           rgba,
                           unsignedByte,
                           source |> Obj.magic
                         |])
                    }
                  )
              )
          )
        }
      );
      describe(
        "draw",
        () =>
          describe(
            "if geometry has index buffer, bind index buffer and drawElements",
            () => {
              let _prepareForDrawElements = (sandbox, state) => {
                let (state, _, geometry, _, _) =
                  RenderBasicJobTool.prepareGameObject(sandbox, state);
                let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                (state, geometry)
              };
              describe(
                "bind index buffer",
                () => {
                  let _prepareForElementArrayBuffer = (state) => {
                    let element_array_buffer = 1;
                    let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                    let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
                    let state =
                      state
                      |> FakeGlTool.setFakeGl(
                           FakeGlTool.buildFakeGl(
                             ~sandbox,
                             ~element_array_buffer,
                             ~bindBuffer,
                             ~drawElements,
                             ()
                           )
                         );
                    let state = state |> RenderJobsTool.init;
                    (state, bindBuffer, element_array_buffer)
                  };
                  describe(
                    "optimize",
                    () => {
                      test(
                        "if lastSendGeometry === geometryIndex, not bind",
                        () => {
                          let (state, _, geometry, _, _) =
                            RenderBasicJobTool.prepareGameObject(sandbox, state^);
                          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                          let (state, _, _, _, _) =
                            RenderBasicJobTool.prepareGameObjectWithSharedGeometry(
                              sandbox,
                              geometry,
                              state
                            );
                          let (state, bindBuffer, element_array_buffer) =
                            _prepareForElementArrayBuffer(state);
                          let state = state |> DirectorTool.runWithDefaultTime;
                          bindBuffer
                          |> withOneArg(element_array_buffer)
                          |> getCallCount
                          |> expect == 3
                        }
                      );
                      test(
                        "else, bind",
                        () => {
                          let (state, _, geometry, _, _) =
                            RenderBasicJobTool.prepareGameObject(sandbox, state^);
                          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                          let (state, _, _, _, _) =
                            RenderBasicJobTool.prepareGameObject(sandbox, state);
                          let (state, bindBuffer, element_array_buffer) =
                            _prepareForElementArrayBuffer(state);
                          let state = state |> DirectorTool.runWithDefaultTime;
                          bindBuffer
                          |> withOneArg(element_array_buffer)
                          |> getCallCount
                          |> expect == 3
                          * 2
                        }
                      )
                    }
                  )
                }
              );
              test(
                "drawElements",
                () => {
                  let (state, geometry) = _prepareForDrawElements(sandbox, state^);
                  let triangles = 1;
                  let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~triangles, ~drawElements, ())
                       );
                  let state = state |> RenderJobsTool.init;
                  let state = state |> DirectorTool.runWithDefaultTime;
                  drawElements
                  |> withFourArgs(
                       triangles,
                       BoxGeometryTool.getIndicesCount(
                         geometry,
                         CreateRenderStateMainService.createRenderState(state)
                       ),
                       GeometryTool.getIndexType(
                         CreateRenderStateMainService.createRenderState(state)
                       ),
                       GeometryTool.getIndexTypeSize(
                         CreateRenderStateMainService.createRenderState(state)
                       )
                       * 0
                     )
                  |> expect
                  |> toCalledOnce
                }
              )
              /* describe(
                   "fix bug",
                   () => {
                     let _prepareTwoForDrawElements = (sandbox, state) => {
                       let (state, _, geometry1, _, _) =
                         RenderBasicJobTool.prepareGameObject(sandbox, state);
                       let (state, _, geometry2, _, _) =
                         RenderBasicJobTool.prepareGameObject(sandbox, state);
                       let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                       (state, geometry1, geometry2)
                     };
                     TODO use diferent geometry which have different indices count!
                     test(
                       "different gameObject(with the same material, different geometry) should drawElements with different geometry record",
                       () => {
                         let (state, geometry1, geometry2) = _prepareTwoForDrawElements(sandbox, state^);
                         let triangles = 1;
                         let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
                         let state =
                           state
                           |> FakeGlTool.setFakeGl(
                                FakeGlTool.buildFakeGl(~sandbox, ~triangles, ~drawElements, ())
                              );
                         let state = state |> RenderJobsTool.init;
                         let state = state |> DirectorTool.runWithDefaultTime;
                         (
                           drawElements
                         |> withFourArgs(
                              triangles,
                              BoxGeometryTool.getIndicesCount(geometry1, state),
                                                 GeometryTool.getIndexType( CreateRenderStateMainService.createRenderState(state)),
                              GeometryTool.getIndexTypeSize(CreateRenderStateMainService.createRenderState(state)) * 0
                            )
                            |> getCallCount,
                           drawElements
                         |> withFourArgs(
                              triangles,
                              BoxGeometryTool.getIndicesCount(geometry2, state),
                                                 GeometryTool.getIndexType( CreateRenderStateMainService.createRenderState(state)),
                              GeometryTool.getIndexTypeSize(CreateRenderStateMainService.createRenderState(state)) * 0
                            )
                            |> getCallCount
                         ) |> expect == (1, 1)
                       }
                     )
                   }
                 ) */
            }
          )
      )
      /* TODO test
         test
         ("if gameObject not has indices, contract error",
         (
         () => {

         })
         ); */
    }
  );