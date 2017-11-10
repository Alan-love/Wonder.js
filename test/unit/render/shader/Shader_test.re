open Jest;

let _ =
  describe(
    "Shader",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := InitBasicMaterialTool.initWithRenderConfig()
        }
      );
      describe(
        "init material shader",
        () => {
          test(
            "generate shaderIndex, set to material data",
            () => {
              let (state, _, _, material1) =
                InitBasicMaterialTool.prepareGameObject(sandbox, state^);
              let (state, _, _, material2) =
                InitBasicMaterialTool.prepareGameObject(sandbox, state);
              let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
              let state = state |> InitBasicMaterialTool.exec;
              (
                MaterialTool.getShaderIndex(material1, state),
                MaterialTool.getShaderIndex(material2, state)
              )
              |> expect == (0, 1)
            }
          );
          test(
            "create program",
            () => {
              let (state, _, _, _) = InitBasicMaterialTool.prepareGameObject(sandbox, state^);
              let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createProgram, ()));
              let state = state |> InitBasicMaterialTool.exec;
              getCallCount(createProgram) |> expect == 1
            }
          );
          test(
            "register program",
            () => {
              let (state, _, _, material) =
                InitBasicMaterialTool.prepareGameObject(sandbox, state^);
              let program = Obj.magic(100);
              let createProgram = createEmptyStubWithJsObjSandbox(sandbox) |> setReturn(program);
              let state =
                state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createProgram, ()));
              let state = state |> InitBasicMaterialTool.exec;
              let shaderIndex = MaterialTool.getShaderIndex(material, state);
              state
              |> ProgramTool.getProgram(Js.Int.toString(shaderIndex))
              |> Js.Option.getExn
              |> expect == program
            }
          );
          describe(
            "init shader",
            () => {
              test(
                "create vs shader",
                () => {
                  let (state, _, _, _) = InitBasicMaterialTool.prepareGameObject(sandbox, state^);
                  let vertex_shader = 1;
                  let createShader = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~vertex_shader, ~createShader, ())
                       );
                  let state = state |> InitBasicMaterialTool.exec;
                  withOneArg(vertex_shader, createShader) |> expect |> toCalledOnce
                }
              );
              test(
                "create fs shader",
                () => {
                  let (state, _, _, _) = InitBasicMaterialTool.prepareGameObject(sandbox, state^);
                  let fragment_shader = 1;
                  let createShader = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~fragment_shader, ~createShader, ())
                       );
                  let state = state |> InitBasicMaterialTool.exec;
                  withOneArg(fragment_shader, createShader) |> expect |> toCalledOnce
                }
              );
              describe(
                "compile shader",
                () => {
                  test(
                    "compile vs and fs shader",
                    () => {
                      let (state, _, _, _) =
                        InitBasicMaterialTool.prepareGameObject(sandbox, state^);
                      let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
                      let compileShader = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ~compileShader, ())
                           );
                      let state = state |> InitBasicMaterialTool.exec;
                      (getCallCount(shaderSource), getCallCount(compileShader)) |> expect == (2, 2)
                    }
                  );
                  describe(
                    "check COMPILE_STATUS",
                    () =>
                      test(
                        "if gl.getShaderParameter return Js.false_, log shader info",
                        () => {
                          let (state, _, _, _) =
                            InitBasicMaterialTool.prepareGameObject(sandbox, state^);
                          let compile_status = 0;
                          let shader1 = 1;
                          let shader2 = 2;
                          let createShader =
                            createEmptyStubWithJsObjSandbox(sandbox)
                            |> onCall(0)
                            |> setReturn(shader1)
                            |> onCall(1)
                            |> setReturn(shader2);
                          let getShaderParameter =
                            createEmptyStubWithJsObjSandbox(sandbox)
                            |> withTwoArgs(shader1, compile_status)
                            |> setReturn(Js.false_)
                            |> withTwoArgs(shader2, compile_status)
                            |> setReturn(Js.false_);
                          let getShaderInfoLog = createEmptyStubWithJsObjSandbox(sandbox);
                          let log =
                            createMethodStubWithJsObjSandbox(sandbox, Console.console, "log");
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(
                                   ~sandbox,
                                   ~compile_status,
                                   ~getShaderParameter,
                                   ~createShader,
                                   ~getShaderInfoLog,
                                   ()
                                 )
                               );
                          let state = state |> InitBasicMaterialTool.exec;
                          (getCallCount(log), getCallCount(getShaderInfoLog)) |> expect == (4, 2)
                        }
                      )
                  );
                  test(
                    "attach vs and fs shader",
                    () => {
                      let (state, _, _, _) =
                        InitBasicMaterialTool.prepareGameObject(sandbox, state^);
                      let attachShader = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~attachShader, ())
                           );
                      let state = state |> InitBasicMaterialTool.exec;
                      getCallCount(attachShader) |> expect == 2
                    }
                  );
                  test(
                    {|avoid "Attribute 0 is disabled."(because this has significant performance penalty)|},
                    () => {
                      let (state, _, _, _) =
                        InitBasicMaterialTool.prepareGameObject(sandbox, state^);
                      let bindAttribLocation = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~bindAttribLocation, ())
                           );
                      let state = state |> InitBasicMaterialTool.exec;
                      getCallCount(bindAttribLocation |> withThreeArgs(matchAny, 0, "a_position"))
                      |> expect == 1
                    }
                  );
                  describe(
                    "link program",
                    () => {
                      test(
                        "test",
                        () => {
                          let (state, _, _, _) =
                            InitBasicMaterialTool.prepareGameObject(sandbox, state^);
                          let linkProgram = createEmptyStubWithJsObjSandbox(sandbox);
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(~sandbox, ~linkProgram, ())
                               );
                          let state = state |> InitBasicMaterialTool.exec;
                          getCallCount(linkProgram) |> expect == 1
                        }
                      );
                      describe(
                        "contract check",
                        () =>
                          test(
                            "if getProgramParameter returns Js.false_, error",
                            () => {
                              let (state, _, _, _) =
                                InitBasicMaterialTool.prepareGameObject(sandbox, state^);
                              let link_status = 0;
                              let getProgramParameter =
                                createEmptyStubWithJsObjSandbox(sandbox)
                                |> withTwoArgs(matchAny, link_status)
                                |> setReturn(Js.false_);
                              let programInfo = "err";
                              let getProgramInfoLog =
                                createEmptyStubWithJsObjSandbox(sandbox) |> setReturn(programInfo);
                              let state =
                                state
                                |> FakeGlTool.setFakeGl(
                                     FakeGlTool.buildFakeGl(
                                       ~sandbox,
                                       ~link_status,
                                       ~getProgramParameter,
                                       ~getProgramInfoLog,
                                       ()
                                     )
                                   );
                              expect(() => state |> InitBasicMaterialTool.exec |> ignore)
                              |> toThrowMessage({j|link program error:$programInfo|j})
                            }
                          )
                      )
                    }
                  );
                  test(
                    "delete vs and fs shader after link",
                    () => {
                      let (state, _, _, _) =
                        InitBasicMaterialTool.prepareGameObject(sandbox, state^);
                      let deleteShader = createEmptyStubWithJsObjSandbox(sandbox);
                      let linkProgram = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~deleteShader, ~linkProgram, ())
                           );
                      let state = state |> InitBasicMaterialTool.exec;
                      (
                        getCallCount(deleteShader),
                        calledAfter(deleteShader |> getCall(0), linkProgram |> getCall(0)),
                        calledAfter(deleteShader |> getCall(1), linkProgram |> getCall(0))
                      )
                      |> expect == (2, true, true)
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