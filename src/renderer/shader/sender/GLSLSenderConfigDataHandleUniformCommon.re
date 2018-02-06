open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

open RenderJobConfigType;

let _getModelMatrixNoCachableData =
  [@bs]
  (
    (transform, state: StateDataType.state) =>
      TransformAdmin.getLocalToWorldMatrixTypeArray(transform, state)
  );

let _getNormalMatrixNoCachableData =
  [@bs]
  (
    (transform, state: StateDataType.state) => {
      let (normalMatrix, _) = TransformAdmin.getNormalMatrixTypeArray(transform, state);
      normalMatrix
    }
  );

let _addCameraSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "vMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderNoCachableCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      RenderDataSystem.getCameraVMatrixDataFromState
    )
  | "pMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderNoCachableCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      RenderDataSystem.getCameraPMatrixDataFromState
    )
  | "position" =>
    GLSLSenderConfigDataHandleUniformShaderCachableCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      RenderDataSystem.getCameraPositionDataFromState
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addCameraSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _addAmbientLightSendData =
    ((field, program, uniformCacheMap, uniformLocationMap), sendDataArrTuple) =>
  switch field {
  | "send" =>
    GLSLSenderConfigDataHandleUniformShaderCachableFunctionCommon.addUniformSendDataByType(
      (program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
      SendAmbientLightHandle.send
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addAmbientLightSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _addDirectionLightSendData =
    ((field, program, uniformCacheMap, uniformLocationMap), sendDataArrTuple) =>
  switch field {
  | "send" =>
    GLSLSenderConfigDataHandleUniformShaderCachableFunctionCommon.addUniformSendDataByType(
      (program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
      SendDirectionLightHandle.send
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addDirectionLightSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _addPointLightSendData =
    ((field, program, uniformCacheMap, uniformLocationMap), sendDataArrTuple) =>
  switch field {
  | "send" =>
    GLSLSenderConfigDataHandleUniformShaderCachableFunctionCommon.addUniformSendDataByType(
      (program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
      SendPointLightHandle.send
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addPointLightSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _addBasicMaterialSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "color" =>
    GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      BasicMaterialAdminAci.unsafeGetColor
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addBasicMaterialSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _addLightMaterialSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "diffuseColor" =>
    GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      LightMaterialAdminAci.unsafeGetDiffuseColor
    )
  | "specularColor" =>
    GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      LightMaterialAdminAci.unsafeGetSpecularColor
    )
  | "shininess" =>
    GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      LightMaterialAdminAci.unsafeGetShininess
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addLightMaterialSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _addModelSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "mMatrix" =>
    GLSLSenderConfigDataHandleUniformRenderObjectModelCommon.addUniformSendDataByType(
      (pos, type_),
      sendDataArrTuple,
      _getModelMatrixNoCachableData
    )
  | "normalMatrix" =>
    GLSLSenderConfigDataHandleUniformRenderObjectModelCommon.addUniformSendDataByType(
      (pos, type_),
      sendDataArrTuple,
      _getNormalMatrixNoCachableData
    )
  | "instance_mMatrix" =>
    GLSLSenderConfigDataHandleUniformInstanceCommon.addUniformSendDataByType(
      pos,
      sendDataArrTuple,
      (_getModelMatrixNoCachableData, GLSLSenderSendDataUtils.sendMatrix4)
    )
  | "instance_normalMatrix" =>
    GLSLSenderConfigDataHandleUniformInstanceCommon.addUniformSendDataByType(
      pos,
      sendDataArrTuple,
      (_getNormalMatrixNoCachableData, GLSLSenderSendDataUtils.sendMatrix3)
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addModelSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _setToUniformSendMap =
    (
      shaderIndex,
      {
        uniformRenderObjectSendModelDataMap,
        uniformRenderObjectSendMaterialDataMap,
        uniformShaderSendNoCachableDataMap,
        uniformShaderSendCachableDataMap,
        uniformShaderSendCachableFunctionDataMap,
        uniformInstanceSendNoCachableDataMap
      },
      state,
      (
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      )
    ) => {
  GLSLSenderConfigDataHandleUniformRenderObjectModelCommon.setToUniformSendMap(
    shaderIndex,
    uniformRenderObjectSendModelDataMap,
    renderObjectSendModelDataArr
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.setToUniformSendMap(
    shaderIndex,
    uniformRenderObjectSendMaterialDataMap,
    renderObjectSendMaterialDataArr
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformShaderNoCachableCommon.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendNoCachableDataMap,
    shaderSendNoCachableDataArr
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformShaderCachableCommon.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendCachableDataMap,
    shaderSendCachableDataArr
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformShaderCachableFunctionCommon.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendCachableFunctionDataMap,
    shaderSendCachableFunctionDataArr
  )
  |> ignore;
  /* TODO rename to GLSLSenderConfigDataHandleUniformInstanceNoCachableCommon? */
  GLSLSenderConfigDataHandleUniformInstanceCommon.setToUniformSendMap(
    shaderIndex,
    uniformInstanceSendNoCachableDataMap,
    instanceSendNoCachableDataArr
  )
  |> ignore;
  state
};

let _readUniforms =
    (
      (gl, program, uniformLocationMap, uniformCacheMap: GLSLSenderType.shaderCacheMap),
      sendDataArrTuple,
      uniforms
    ) =>
  switch uniforms {
  /* TODO use record instead of tuple */
  | None => sendDataArrTuple
  | Some(uniforms) =>
    uniforms
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (sendDataArrTuple, {name, field, type_, from}) =>
             switch from {
             | "camera" =>
               _addCameraSendData(
                 (
                   field,
                   GLSLLocationSystem.getUniformLocation(program, name, uniformLocationMap, gl),
                   name,
                   type_,
                   uniformCacheMap
                 ),
                 sendDataArrTuple
               )
             | "basicMaterial" =>
               _addBasicMaterialSendData(
                 (
                   field,
                   GLSLLocationSystem.getUniformLocation(program, name, uniformLocationMap, gl),
                   name,
                   type_,
                   uniformCacheMap
                 ),
                 sendDataArrTuple
               )
             | "lightMaterial" =>
               _addLightMaterialSendData(
                 (
                   field,
                   GLSLLocationSystem.getUniformLocation(program, name, uniformLocationMap, gl),
                   name,
                   type_,
                   uniformCacheMap
                 ),
                 sendDataArrTuple
               )
             | "ambientLight" =>
               _addAmbientLightSendData(
                 (field, program, uniformCacheMap, uniformLocationMap),
                 sendDataArrTuple
               )
             | "directionLight" =>
               _addDirectionLightSendData(
                 (field, program, uniformCacheMap, uniformLocationMap),
                 sendDataArrTuple
               )
             | "pointLight" =>
               _addPointLightSendData(
                 (field, program, uniformCacheMap, uniformLocationMap),
                 sendDataArrTuple
               )
             | "model" =>
               _addModelSendData(
                 (
                   field,
                   GLSLLocationSystem.getUniformLocation(program, name, uniformLocationMap, gl),
                   name,
                   type_,
                   uniformCacheMap
                 ),
                 sendDataArrTuple
               )
             | _ =>
               WonderLog.Log.fatal(
                 WonderLog.Log.buildFatalMessage(
                   ~title="_readUniforms",
                   ~description={j|unknow from:$from|j},
                   ~reason="",
                   ~solution={j||j},
                   ~params={j||j}
                 )
               )
             }
         ),
         sendDataArrTuple
       )
  };

let _readUniformSendData = (shaderLibDataArr, gl, program, (uniformLocationMap, uniformCacheMap)) =>
  shaderLibDataArr
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (sendDataArrTuple, {variables}) =>
           switch variables {
           | None => sendDataArrTuple
           | Some({uniforms}) =>
             _readUniforms(
               (gl, program, uniformLocationMap, uniformCacheMap),
               sendDataArrTuple,
               uniforms
             )
           }
       ),
       ([||], [||], [||], [||], [||], [||])
     );

let _checkShouldNotAddBefore = (shaderIndex, state) =>
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|not be added before|j}, ~actual={j|be|j}),
              () =>
                getGLSLSenderData(state).uniformRenderObjectSendModelDataMap
                |> WonderCommonlib.SparseMapSystem.get(shaderIndex)
                |> assertNotExist
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );

let addUniformSendData =
    (
      gl,
      (program: program, shaderIndex: int, shaderLibDataArr: shader_libs),
      state: StateDataType.state
    )
    : StateDataType.state => {
  _checkShouldNotAddBefore(shaderIndex, state);
  let data = getGLSLSenderData(state);
  let uniformLocationMap =
    getOrCreateHashMap(state |> GLSLLocationSystem.getUniformLocationMap(shaderIndex));
  _readUniformSendData(
    shaderLibDataArr,
    gl,
    program,
    (
      uniformLocationMap,
      getOrCreateHashMap(data |> GLSLSenderSendDataUtils.getCacheMap(shaderIndex))
    )
  )
  |> _setToUniformSendMap(shaderIndex, data, state)
  |> GLSLLocationSystem.setUniformLocationMap(shaderIndex, uniformLocationMap)
};

let unsafeGetUniformRenderObjectSendMaterialData = GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.unsafeGetUniformSendData;

let unsafeGetUniformRenderObjectSendModelData = GLSLSenderConfigDataHandleUniformRenderObjectModelCommon.unsafeGetUniformSendData;

let unsafeGetUniformShaderSendNoCachableData = GLSLSenderConfigDataHandleUniformShaderNoCachableCommon.unsafeGetUniformSendData;

let unsafeGetUniformShaderSendCachableData = GLSLSenderConfigDataHandleUniformShaderCachableCommon.unsafeGetUniformSendData;

let unsafeGetUniformShaderSendCachableFunctionData = GLSLSenderConfigDataHandleUniformShaderCachableFunctionCommon.unsafeGetUniformSendData;

let unsafeGetUniformInstanceSendNoCachableData = GLSLSenderConfigDataHandleUniformInstanceCommon.unsafeGetUniformSendData;