open GlType;

open Gl;

open StateDataType;

open Contract;

open GlslSenderStateUtils;

open GLSLSenderSendDataSystem;

open GLSLSenderDrawSystem;

let addAttributeSendData =
    (
      gl,
      materialIndexStr: string,
      shaderIndex: int,
      geometryIndex: int,
      program: program,
      shaderLibDataArr: shader_libs,
      attributeLocationMap,
      state: StateDataType.state
    ) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "shouldn't be added before",
          () =>
            getGLSLSenderData(state).attributeSendDataMap
            |> HashMapSystem.get(materialIndexStr)
            |> assertNotExist
        )
      )
  );
  let sendDataArr = ArraySystem.createEmpty();
  shaderLibDataArr
  |> Js.Array.forEach(
       ({variables}) =>
         switch variables {
         | None => ()
         | Some({attributes}) =>
           switch attributes {
           | None => ()
           | Some(attributes) =>
             attributes
             |> Js.Array.forEach(
                  ({name, buffer, type_}) =>
                    switch (name, type_) {
                    | (Some(name), Some(type_)) =>
                      sendDataArr
                      |> Js.Array.push(
                           sendBuffer(
                             gl,
                             getBufferSizeByType(type_),
                             GLSLLocationSystem.getAttribLocation(
                               program,
                               name,
                               attributeLocationMap,
                               gl
                             ),
                             switch buffer {
                             | "vertex" =>
                               ArrayBufferSystem.createBuffer(
                                 gl,
                                 geometryIndex,
                                 GeometrySystem.getVertices(geometryIndex, state)
                               )
                             }
                           )
                         )
                      |> ignore
                    | (_, _) =>
                      sendDataArr
                      |> Js.Array.push(
                           bindIndexBuffer(
                             gl,
                             switch buffer {
                             | "index" =>
                               ElementArrayBufferSystem.createBuffer(
                                 gl,
                                 geometryIndex,
                                 GeometrySystem.getIndices(geometryIndex, state)
                               )
                             }
                           )
                         )
                      |> ignore
                    }
                )
           }
         }
     );
  getGLSLSenderData(state).attributeSendDataMap
  |> HashMapSystem.set(materialIndexStr, sendDataArr)
  |> ignore;
  let shaderIndexStr = Js.Int.toString(shaderIndex);
  state |> GLSLLocationSystem.setAttributeLocationMap(shaderIndexStr, attributeLocationMap)
};

let _getModelMMatrixData = (uid: string, state: StateDataType.state) => {
  let transform = Js.Option.getExn(GameObjectSystem.getTransformComponent(uid, state));
  TransformSystem.getLocalToWorldMatrix(transform, state)
};

let addUniformSendData =
    (
      gl,
      materialIndexStr: string,
      shaderIndex: int,
      geometryIndex: int,
      uid: string,
      program: program,
      shaderLibDataArr: shader_libs,
      uniformLocationMap,
      state: StateDataType.state
    )
    : StateDataType.state => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "shouldn't be added before",
          () =>
            getGLSLSenderData(state).uniformSendDataMap
            |> HashMapSystem.get(materialIndexStr)
            |> assertNotExist
        )
      )
  );
  let sendDataArr = ArraySystem.createEmpty();
  shaderLibDataArr
  |> Js.Array.forEach(
       ({variables}) =>
         switch variables {
         | None => ()
         | Some({uniforms}) =>
           switch uniforms {
           | None => ()
           | Some(uniforms) =>
             uniforms
             |> Js.Array.forEach(
                  ({name, field, type_, from}) =>
                    sendDataArr
                    |> Js.Array.push({
                         getArrayDataFunc:
                           switch from {
                           | "camera" =>
                             switch field {
                             | "vMatrix" => RenderDataSystem.getCameraVMatrixDataFromState
                             | "pMatrix" => RenderDataSystem.getCameraPMatrixDataFromState
                             }
                           | "model" =>
                             switch field {
                             | "mMatrix" => _getModelMMatrixData(uid)
                             }
                           },
                         sendArrayDataFunc:
                           switch type_ {
                           | "mat4" =>
                             sendMatrix4(
                               gl,
                               GLSLLocationSystem.getUniformLocation(
                                 program,
                                 name,
                                 uniformLocationMap,
                                 gl
                               )
                             )
                           }
                       })
                    |> ignore
                )
           }
         }
     );
  getGLSLSenderData(state).uniformSendDataMap
  |> HashMapSystem.set(materialIndexStr, sendDataArr)
  |> ignore;
  let shaderIndexStr = Js.Int.toString(shaderIndex);
  state |> GLSLLocationSystem.setUniformLocationMap(shaderIndexStr, uniformLocationMap)
};

let addDrawPointsFunc =
    (gl, materialIndexStr: string, geometryIndex: int, state: StateDataType.state) => {
  getGLSLSenderData(state).drawPointsFuncMap
  |> HashMapSystem.set(
       materialIndexStr,
       GeometrySystem.hasIndices(geometryIndex, state) ?
         drawElement(
           GeometrySystem.getDrawMode(gl),
           GeometrySystem.getIndexType(gl),
           GeometrySystem.getIndexTypeSize(gl),
           GeometrySystem.getIndicesCount(geometryIndex, state)
         ) :
         drawArray(
           GeometrySystem.getDrawMode(gl),
           GeometrySystem.getVerticesCount(geometryIndex, state)
         )
     )
  |> ignore;
  state
};

let getAttributeSendData = (shaderIndexStr: string, state: StateDataType.state) => {
  let {attributeSendDataMap} = getGLSLSenderData(state);
  attributeSendDataMap
  |> HashMapSystem.unsafeGet(shaderIndexStr)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test
             /* ("attribute send data should exist", () => Js.Nullable.to_opt(r) |> assertExist) */
             (
               "attribute send data should exist",
               () => {
                 let {attributeSendDataMap} = getGLSLSenderData(state);
                 attributeSendDataMap |> HashMapSystem.get(shaderIndexStr) |> assertExist
               }
             )
         )
     )
};

let getUniformSendData = (shaderIndexStr: string, state: StateDataType.state) => {
  let {uniformSendDataMap} = getGLSLSenderData(state);
  uniformSendDataMap
  |> HashMapSystem.unsafeGet(shaderIndexStr)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "uniform send data should exist",
             () => {
               let {uniformSendDataMap} = getGLSLSenderData(state);
               uniformSendDataMap |> HashMapSystem.get(shaderIndexStr) |> assertExist
             }
           )
         )
     )
};

let getDrawPointsFunc = (shaderIndexStr: string, state: StateDataType.state) => {
  let {drawPointsFuncMap} = getGLSLSenderData(state);
  drawPointsFuncMap
  |> HashMapSystem.unsafeGet(shaderIndexStr)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "draw points func should exist",
             () => {
               let {drawPointsFuncMap} = getGLSLSenderData(state);
               drawPointsFuncMap |> HashMapSystem.get(shaderIndexStr) |> assertExist
             }
           )
         )
     )
};