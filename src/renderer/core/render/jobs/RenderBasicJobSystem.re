open StateDataType;

open GlType;

open GameObjectType;

open VboBufferType;

let _render = (gl, state: StateDataType.state) =>
  switch (state |> RenderDataSystem.getRenderArrayFromState) {
  | None => state
  | Some(renderArray) =>
    renderArray
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, uid: int) => {
             let materialIndex: int = GameObjectSystem.unsafeGetMaterialComponent(uid, state);
             let shaderIndex = MaterialSystem.unsafeGetShaderIndex(materialIndex, state);
             let geometryIndex: int = GameObjectSystem.unsafeGetGeometryComponent(uid, state);
             let mappedGeometryIndex =
               GeometryIndexUtils.getMappedIndex(
                 geometryIndex,
                 GeometryIndexUtils.getMappedIndexMap(state)
               );
             let {vertexBufferMap, elementArrayBufferMap} =
               VboBufferStateUtils.getVboBufferData(state);
             let program = ProgramSystem.unsafeGetProgram(shaderIndex, state);
             let state =
               state
               |> ProgramSystem.use(gl, program)
               |> GLSLSenderConfigDataHandleSystem.getAttributeSendData(shaderIndex)
               |> ArraySystem.reduceState(
                    [@bs]
                    (
                      (state, {pos, size, buffer, sendFunc}) => {
                        let arrayBuffer =
                          switch buffer {
                          | "vertex" =>
                            ArrayBufferSystem.getOrCreateBuffer(
                              gl,
                              geometryIndex,
                              mappedGeometryIndex,
                              vertexBufferMap,
                              [@bs] GeometrySystem.getVertices,
                              state
                            )
                          | "index" =>
                            ElementArrayBufferSystem.getOrCreateBuffer(
                              gl,
                              geometryIndex,
                              mappedGeometryIndex,
                              elementArrayBufferMap,
                              [@bs] GeometrySystem.getIndices,
                              state
                            )
                          | _ => ExceptionHandleSystem.throwMessage({j|unknow buffer:$buffer|j})
                          };
                        [@bs] sendFunc(gl, size, pos, arrayBuffer, state)
                      }
                    ),
                    state
                  )
               |> GLSLSenderConfigDataHandleSystem.getUniformSendData(shaderIndex)
               |> ArraySystem.reduceState(
                    [@bs]
                    (
                      (state, {pos, getArrayDataFunc, sendArrayDataFunc}) => {
                        [@bs] sendArrayDataFunc(gl, pos, [@bs] getArrayDataFunc(uid, state));
                        state
                      }
                    ),
                    state
                  );
             GeometrySystem.hasIndices(mappedGeometryIndex, state) ?
               GLSLSenderDrawSystem.drawElement(
                 GeometrySystem.getDrawMode(gl),
                 GeometrySystem.getIndexType(gl),
                 GeometrySystem.getIndexTypeSize(gl),
                 GeometrySystem.getIndicesCount(mappedGeometryIndex, state),
                 gl
               ) :
               GLSLSenderDrawSystem.drawArray(
                 GeometrySystem.getDrawMode(gl),
                 GeometrySystem.getVerticesCount(mappedGeometryIndex, state),
                 gl
               );
             state
           }
         ),
         state
       )
  };

let getJob = (configData, gl, state) => _render(gl, state);