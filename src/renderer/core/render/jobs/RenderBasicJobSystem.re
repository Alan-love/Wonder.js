open StateDataType;

open GlType;

/* todo optimize: curry */
let _render = (gl, state: StateDataType.state) => {
  let renderList = RenderDataSystem.getRenderListFromState(state);
  state
  |> RenderDataSystem.getRenderListFromState
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, uid: string) => {
           let materialIndex: int =
             Js.Option.getExn(GameObjectSystem.getMaterialComponent(uid, state));
           let shaderIndex = MaterialSystem.getShaderIndex(materialIndex, state);
           let shaderIndexStr =
             Js.Int.toString(MaterialSystem.getShaderIndex(materialIndex, state));
           let program = ProgramSystem.use(gl, shaderIndexStr, state);
           let state =
             state
             |> GLSLSenderSystem.disableVertexAttribArray(gl)
             |> GLSLSenderSystem.getAttributeSendData(shaderIndexStr)
             |> ArraySystem.reduceState(
                  [@bs] ((state, sendBufferFunc) => sendBufferFunc(state)),
                  state
                );
           let state =
             state
             |> GLSLSenderSystem.getUniformSendData(shaderIndexStr)
             |> ArraySystem.reduceState(
                  [@bs]
                  (
                    (state, {getArrayDataFunc, sendArrayDataFunc}) => {
                      sendArrayDataFunc(getArrayDataFunc(state));
                      state
                    }
                  ),
                  state
                );
           let drawPointsFunc = GLSLSenderSystem.getDrawPointsFunc(shaderIndexStr, state);
           drawPointsFunc(gl);
           state
         }
       ),
       state
     )
};

let getJob = (configData, gl, state) => _render(gl, state);