open StateDataType;

open Contract;

open GlType;

open Gl;

open GLSLSenderStateUtils;

open Js.Typed_array;

let getGLSLSenderData = getGLSLSenderData;

/* TODO optimize? */
let disableVertexAttribArray = (gl, state: StateDataType.state) => {

  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "vertexAttribHistory:array('a) should has no hole",
          () => {
            let {vertexAttribHistoryArray} = getGLSLSenderData(state);
            vertexAttribHistoryArray
            |> Js.Array.filter(WonderCommonlib.JudgeUtils.isBool)
            |> Js.Array.length == Js.Array.length(vertexAttribHistoryArray)
          }
        )
      )
  );
  let {vertexAttribHistoryArray} as data = getGLSLSenderData(state);
  vertexAttribHistoryArray
  |> Js.Array.forEachi(
       (isEnable: bool, pos: int) =>
         isEnable ?
           disableVertexAttribArray(pos, gl) :
           /* if (isEnable === false || i > gl.VERTEX_ATTRIB_ARRAY_ENABLED) { */
           ExceptionHandleSystem.throwMessage("should always be true")
     );
  data.vertexAttribHistoryArray = WonderCommonlib.ArraySystem.createEmpty();
  state
};

let deepCopyStateForRestore = GLSLSenderStateUtils.deepCopyStateForRestore;

let restore = GLSLSenderStateUtils.restore;