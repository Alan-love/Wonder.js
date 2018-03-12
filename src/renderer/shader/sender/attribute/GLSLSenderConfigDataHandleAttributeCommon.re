open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderDrawUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

open RenderConfigType;

let _addModelMatrixInstanceArrayBufferSendData =
    ((gl, program, name, attributeLocationMap), (sendDataArr, instanceSendNoCachableDataArr)) => (
  sendDataArr,
  instanceSendNoCachableDataArr
  |> ArrayService.push({
       pos: GLSLLocationSystem.getAttribLocation(program, name, attributeLocationMap, gl),
       size: 4,
       getOffsetFunc: [@bs] ((index) => index * 16)
     })
);

let _addNormalMatrixInstanceArrayBufferSendData =
    ((gl, program, name, attributeLocationMap), (sendDataArr, instanceSendNoCachableDataArr)) => (
  sendDataArr,
  instanceSendNoCachableDataArr
  |> ArrayService.push({
       pos: GLSLLocationSystem.getAttribLocation(program, name, attributeLocationMap, gl),
       size: 3,
       getOffsetFunc: [@bs] ((index) => (index - 4) * 12 + 64)
     })
);

let _addOtherArrayBufferSendData =
    (
      (gl, program, name, buffer, type_, attributeLocationMap),
      (sendDataArr, instanceSendNoCachableDataArr)
    ) => (
  sendDataArr
  |> ArrayService.push({
       pos: GLSLLocationSystem.getAttribLocation(program, name, attributeLocationMap, gl),
       size: getBufferSizeByType(type_),
       buffer,
       sendFunc: sendBuffer
     }),
  instanceSendNoCachableDataArr
);

let _addElementBufferSendData = (buffer, (sendDataArr, instanceSendNoCachableDataArr)) => (
  sendDataArr |> ArrayService.push({pos: 0, size: 0, buffer, sendFunc: bindElementArrayBuffer}),
  instanceSendNoCachableDataArr
);

let _readAttributes = ((gl, program, attributeLocationMap), sendDataArrTuple, attributes) =>
  switch attributes {
  | None => sendDataArrTuple
  | Some(attributes) =>
    attributes
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (sendDataArrTuple, {name, buffer, type_}) =>
             switch (name, type_) {
             | (Some(name), Some(type_)) =>
               switch buffer {
               | "instance_mMatrix" =>
                 _addModelMatrixInstanceArrayBufferSendData(
                   (gl, program, name, attributeLocationMap),
                   sendDataArrTuple
                 )
               | "instance_normalMatrix" =>
                 _addNormalMatrixInstanceArrayBufferSendData(
                   (gl, program, name, attributeLocationMap),
                   sendDataArrTuple
                 )
               | _ =>
                 _addOtherArrayBufferSendData(
                   (gl, program, name, buffer, type_, attributeLocationMap),
                   sendDataArrTuple
                 )
               }
             | (_, _) => _addElementBufferSendData(buffer, sendDataArrTuple)
             }
         ),
         sendDataArrTuple
       )
  };

let _readAttributeSendData = (shaderLibDataArr, gl, program, attributeLocationMap) =>
  shaderLibDataArr
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (sendDataArrTuple, {variables}) =>
           switch variables {
           | None => sendDataArrTuple
           | Some({attributes}) =>
             _readAttributes((gl, program, attributeLocationMap), sendDataArrTuple, attributes)
           }
       ),
       ([||], [||])
     );

let _setToAttributeSendMap =
    (shaderIndex, attributeLocationMap, state, (sendDataArr, instanceSendNoCachableDataArr)) => {
  let {attributeSendDataMap, instanceAttributeSendDataMap} = getGLSLSenderData(state);
  attributeSendDataMap |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendDataArr) |> ignore;
  instanceAttributeSendDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendNoCachableDataArr)
  |> ignore;
  state
};

let addAttributeSendData =
    (
      (gl, shaderIndex: int, program: program),
      shaderLibDataArr: shader_libs,
      state: StateDataType.state
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|not be added before|j}, ~actual={j|be|j}),
              () =>
                getGLSLSenderData(state).attributeSendDataMap
                |> WonderCommonlib.SparseMapSystem.get(shaderIndex)
                |> assertNotExist
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  let attributeLocationMap =
    getOrCreateHashMap(state |> GLSLLocationSystem.getAttributeLocationMap(shaderIndex));
  _readAttributeSendData(shaderLibDataArr, gl, program, attributeLocationMap)
  |> _setToAttributeSendMap(shaderIndex, attributeLocationMap, state)
  |> GLSLLocationSystem.setAttributeLocationMap(shaderIndex, attributeLocationMap)
};

let unsafeGetAttributeSendData = (shaderIndex: int, state: StateDataType.state) => {
  let {attributeSendDataMap} = getGLSLSenderData(state);
  attributeSendDataMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex)
  |> WonderLog.Contract.ensureCheck(
       (sendData) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|attribute send data exist|j},
                   ~actual={j|not|j}
                 ),
                 () => sendData |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
     )
};

let unsafeGetInstanceAttributeSendData = (shaderIndex: int, state: StateDataType.state) => {
  let {instanceAttributeSendDataMap} = getGLSLSenderData(state);
  instanceAttributeSendDataMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex)
  |> WonderLog.Contract.ensureCheck(
       (sendData) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|instance attribute send data exist|j},
                   ~actual={j|not|j}
                 ),
                 () => sendData |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
     )
};