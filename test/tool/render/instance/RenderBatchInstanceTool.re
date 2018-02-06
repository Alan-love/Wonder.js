let _render = (state: StateDataType.state) => state |> WebGLRenderTool.render;

let testProgram = (sandbox, prepareFunc, state) => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;
  open Sinon;
  let _prepareForUseProgram = (sandbox, state) => {
    let (state, _, _, _) = FrontRenderLightBatchInstanceTool.prepare(sandbox, 1, state);
    let program = Obj.magic(1);
    let createProgram = createEmptyStubWithJsObjSandbox(sandbox) |> onCall(0) |> returns(program);
    let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
    let state =
      state
      |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createProgram, ~useProgram, ()));
    (state, program, createProgram, useProgram)
  };
  test(
    "create program and use program only once",
    () => {
      let (state, program, createProgram, useProgram) = _prepareForUseProgram(sandbox, state^);
      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
      createProgram |> getCallCount |> expect == 1
    }
  );
  test(
    "only use sourceInstance's gameObject's program",
    () => {
      let (state, program, createProgram, useProgram) = _prepareForUseProgram(sandbox, state^);
      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
      useProgram |> expect |> toCalledWith([|program|])
    }
  )
};

let testAttachBufferToAttribute = (sandbox, (name, callIndex, size), prepareFunc, state) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          test(
            "test attach buffer to attribute",
            () => {
              let (state, _, _, _) = prepareFunc(sandbox, 1, state^);
              let float = 1;
              let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 0;
              let getAttribLocation = GLSLLocationTool.getAttribLocation(~pos, sandbox, name);
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
              let state = state |> RenderJobsTool.initSystemAndRender |> _render;
              vertexAttribPointer
              |> getCall(callIndex)
              |> expect
              |> toCalledWith([|pos, size, float, Obj.magic(Js.false_), 0, 0|])
            }
          )
        )
      )
    )
  );

let testSendShaderUniformData = (sandbox, (prepareFunc, createSourceInstanceGameObjectFunc), state) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          test(
            "send shader uniform data only once per shader",
            () => {
              let name = "u_vMatrix";
              let (state, _, _, _) = prepareFunc(sandbox, 1, state^);
              let (state, gameObject2, _, _) =
                createSourceInstanceGameObjectFunc(sandbox, 1, state);
              let (state, gameObject3, _, _, _) = RenderJobsTool.prepareGameObject(sandbox, state);
              let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 1;
              let getUniformLocation = GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~uniformMatrix4fv, ~getUniformLocation, ())
                   );
              let state =
                state
                |> RenderJobsTool.initSystemAndRender
                |> RenderJobsTool.updateSystem
                |> _render;
              uniformMatrix4fv |> withOneArg(pos) |> getCallCount |> expect == 2
            }
          )
        )
      )
    )
  );

/* let testSendObjectInstanceGameObjectData = (sandbox, name, (prepareFunc, createSourceInstanceGameObjectFunc), state) => {
   open Wonder_jest;
   open Expect;
   open Expect.Operators;
   open Sinon;
                   let (state, _, _, _) =
                     FrontRenderLightBatchInstanceTool.prepare(sandbox, 2, state^);
                   let (state, gameObject2, _, _) =
                     createSourceInstanceGameObjectFunc(sandbox, 3, state);
                   let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                   let pos = 1;
                   let getUniformLocation =
                     GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
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
                     state
                     |> RenderJobsTool.initSystemAndRender
                     |> RenderJobsTool.updateSystem
                     |> _render;
                   uniformMatrix4fv |> withOneArg(pos) |> getCallCount |> expect == 2 + 3

   }; */
let testDrawElements = (sandbox, prepareFunc, state) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          test(
            "drawElements",
            () => {
              let (state, _, geometry, _) = prepareFunc(sandbox, 3, state^);
              let triangles = 1;
              let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~triangles, ~drawElements, ())
                   );
              let state = state |> RenderJobsTool.initSystemAndRender;
              let state = state |> _render;
              drawElements
              |> withFourArgs(
                   triangles,
                   GeometryTool.getIndicesCount(geometry, state),
                   GeometryTool.getIndexType(state),
                   GeometryTool.getIndexTypeSize(state) * 0
                 )
              |> expect
              |> toCalledThrice
            }
          )
        )
      )
    )
  );