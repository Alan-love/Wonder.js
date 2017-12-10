open StateDataType;

open VboBufferType;

open SourceInstanceType;

open InstanceBufferSystem;

let _fillModelMatrixTypeArr = (uid, matricesArrayForInstance, offset, transformData, state) => {
  let transform = GameObjectAdmin.unsafeGetTransformComponent(uid, state);
  TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
    matricesArrayForInstance,
    offset,
    TransformAdmin.getLocalToWorldMatrixTypeArray(transform, state),
    0,
    16
  );
  state
};

let _sendModelMatrixData =
    (
      gl,
      sourceUid,
      extension,
      sourceInstance,
      shaderIndex,
      objectInstanceList,
      instanceRenderListCount,
      modelMatrixInstanceBufferCapacityMap,
      modelMatrixInstanceBufferMap,
      modelMatrixFloat32ArrayMap,
      transformData,
      state
    ) => {
  let modelMatrixInstanceBuffer =
    InstanceBufferSystem.getOrCreateBuffer(
      gl,
      sourceInstance,
      modelMatrixInstanceBufferCapacityMap,
      modelMatrixInstanceBufferMap
    );
  /*! instanceCount * 4(float size) * 4(vec count) * 4(component count) */
  let stride = 64;
  let matricesArrayForInstance =
    InstanceBufferSystem.getOrCreateModelMatrixFloat32Array(
      sourceInstance,
      modelMatrixInstanceBufferCapacityMap,
      modelMatrixFloat32ArrayMap
    );
  let (modelMatrixInstanceBuffer, matricesArrayForInstance) =
    setCapacityAndUpdateBufferAndTypeArray(
      gl,
      sourceInstance,
      instanceRenderListCount * stride,
      modelMatrixInstanceBuffer,
      matricesArrayForInstance,
      modelMatrixInstanceBufferMap,
      modelMatrixFloat32ArrayMap,
      modelMatrixInstanceBufferCapacityMap
    );
  let offset = ref(0);
  let state =
    state |> _fillModelMatrixTypeArr(sourceUid, matricesArrayForInstance, offset^, transformData);
  offset := offset^ + 16;
  let state =
    objectInstanceList
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, objectInstance) => {
             let state =
               state
               |> _fillModelMatrixTypeArr(
                    objectInstance,
                    matricesArrayForInstance,
                    offset^,
                    transformData
                  );
             offset := offset^ + 16;
             state
           }
         ),
         state
       );
  let _ = updateData(gl, matricesArrayForInstance, modelMatrixInstanceBuffer);
  state
  |> GLSLSenderConfigDataHandleSystem.getInstanceAttributeSendData(shaderIndex)
  |> WonderCommonlib.ArraySystem.forEachi(
       [@bs]
       (
         ({pos}: instanceAttributeSendData, index) => {
           Gl.enableVertexAttribArray(pos, gl);
           Gl.vertexAttribPointer(pos, 4, Gl.getFloat(gl), Js.false_, stride, index * 16, gl);
           [@bs] Obj.magic(extension)##vertexAttribDivisorANGLE(pos, 1)
         }
       )
     );
  state
};

let render = (gl, uid, state: StateDataType.state) => {
  /* todo optimize for static data:
     use bufferData instead of bufferSubData(use STATIC_DRAW)
     use accurate buffer capacity(can't change) */
  let (state, shaderIndex, mappedGeometryIndex) = state |> RenderBasicSystem.render(gl, uid);
  let extension = GPUStateSystem.getData(state).extensionInstancedArrays |> Js.Option.getExn;
  let transformData = TransformAdmin.getData(state);
  let {modelMatrixInstanceBufferMap} = VboBufferStateSystem.getVboBufferData(state);
  let {modelMatrixFloat32ArrayMap, modelMatrixInstanceBufferCapacityMap} =
    SourceInstanceStateSystem.getData(state);
  let sourceInstance = GameObjectComponentCommon.unsafeGetSourceInstanceComponent(uid, state);
  let objectInstanceList = SourceInstanceSystem.getObjectInstanceList(sourceInstance, state);
  let instanceRenderListCount = Js.Array.length(objectInstanceList) + 1;
  let state =
    SourceInstanceSystem.isModelMatrixIsStatic(sourceInstance, state) ?
      SourceInstanceStaticSystem.isSendModelMatrix(sourceInstance, state) ?
        state :
        _sendModelMatrixData(
          gl,
          uid,
          extension,
          sourceInstance,
          shaderIndex,
          objectInstanceList,
          instanceRenderListCount,
          modelMatrixInstanceBufferCapacityMap,
          modelMatrixInstanceBufferMap,
          modelMatrixFloat32ArrayMap,
          transformData,
          state
        )
        |> SourceInstanceStaticSystem.markSendModelMatrix(sourceInstance, true) :
      state
      |> SourceInstanceStaticSystem.markSendModelMatrix(sourceInstance, false)
      |> _sendModelMatrixData(
           gl,
           uid,
           extension,
           sourceInstance,
           shaderIndex,
           objectInstanceList,
           instanceRenderListCount,
           modelMatrixInstanceBufferCapacityMap,
           modelMatrixInstanceBufferMap,
           modelMatrixFloat32ArrayMap,
           transformData
         );
  GLSLSenderDrawSystem.drawElementsInstancedANGLE(
    GeometrySystem.getDrawMode(gl),
    GeometrySystem.getIndexType(gl),
    GeometrySystem.getIndexTypeSize(gl),
    GeometrySystem.getIndicesCount(mappedGeometryIndex, state),
    instanceRenderListCount,
    Obj.magic(extension)
  );
  /* todo unbind? */
  state
};