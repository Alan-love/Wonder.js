open StateRenderType;

open VboBufferType;

open RenderSourceInstanceType;

open InstanceBufferRenderService;

let _fillObjectInstanceData =
    (
      objectInstanceTransformArray,
      matricesArrayForInstance,
      fillMatrixTypeArrFunc,
      stateOffsetTuple
    ) => {
  let (state, offset) =
    objectInstanceTransformArray
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           (stateOffsetTuple, objectInstanceTransform) =>
             [@bs]
             fillMatrixTypeArrFunc(
               objectInstanceTransform,
               matricesArrayForInstance,
               stateOffsetTuple
             )
         ),
         stateOffsetTuple
       );
  state
};

let _sendTransformMatrixDataBuffer =
    (
      (gl, extension),
      ({pos, size, getOffsetFunc}: instanceAttributeSendData, stride, index),
      state
    ) => {
  Gl.vertexAttribPointer(
    pos,
    size,
    Gl.getFloat(gl),
    Js.false_,
    stride,
    [@bs] getOffsetFunc(index),
    gl
  );
  [@bs] Obj.magic(extension)##vertexAttribDivisorANGLE(pos, 1) |> ignore;
  SendGLSLDataService.enableVertexAttribArray(
    gl,
    pos,
    state.glslSenderRecord.vertexAttribHistoryArray
  );
  state
};

let _sendTransformMatrixDataBufferData = (glDataTuple, shaderIndex, stride, state) =>
  state.glslSenderRecord
  |> HandleAttributeConfigDataService.unsafeGetInstanceAttributeSendData(shaderIndex)
  |> WonderCommonlib.ArrayService.reduceOneParami(
       [@bs]
       (
         (state, sendData, index) =>
           state |> _sendTransformMatrixDataBuffer(glDataTuple, (sendData, stride, index))
       ),
       state
     );

let _updateAndSendTransformMatrixDataBufferData =
    (
      (gl, extension) as glDataTuple,
      shaderIndex,
      (stride, matricesArrayForInstance, matrixInstanceBuffer),
      state
    ) => {
  updateData(gl, matricesArrayForInstance, matrixInstanceBuffer) |> ignore;
  _sendTransformMatrixDataBufferData(glDataTuple, shaderIndex, stride, state)
};

let _sendTransformMatrixData =
    (
      (transformIndex, sourceInstance),
      (
        (gl, extension, shaderIndex),
        (
          defaultCapacity,
          strideForCapacity,
          strideForSend,
          objectInstanceTransformArray,
          instanceRenderListCount
        ),
        (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap, matrixFloat32ArrayMap)
      ),
      fillMatrixTypeArrFunc,
      state
    ) => {
  let matrixInstanceBuffer =
    InstanceBufferRenderService.getOrCreateBuffer(
      (gl, sourceInstance, defaultCapacity),
      (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
      state
    );
  let matricesArrayForInstance =
    InstanceBufferRenderService.getOrCreateMatrixFloat32Array(
      sourceInstance,
      defaultCapacity,
      (matrixInstanceBufferCapacityMap, matrixFloat32ArrayMap),
      state
    );
  let (matrixInstanceBuffer, matricesArrayForInstance) =
    setCapacityAndUpdateBufferTypeArray(
      (gl, sourceInstance, instanceRenderListCount * strideForCapacity, defaultCapacity),
      (matrixInstanceBuffer, matricesArrayForInstance),
      (matrixInstanceBufferMap, matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap),
      state
    );
  [@bs] fillMatrixTypeArrFunc(transformIndex, matricesArrayForInstance, (state, 0))
  |> _fillObjectInstanceData(
       objectInstanceTransformArray,
       matricesArrayForInstance,
       fillMatrixTypeArrFunc
     )
  |> _updateAndSendTransformMatrixDataBufferData(
       (gl, extension),
       shaderIndex,
       (strideForSend, matricesArrayForInstance, matrixInstanceBuffer)
     )
};

let _sendStaticTransformMatrixData =
    (
      (transformIndex, sourceInstance) as componentTuple,
      (
        (gl, extension, shaderIndex),
        (
          defaultCapacity,
          strideForCapacity,
          strideForSend,
          objectInstanceTransformArray,
          instanceRenderListCount
        ),
        (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap, matrixFloat32ArrayMap)
      ) as dataTuple,
      fillMatrixTypeArrFunc,
      state
    ) =>
  StaticRenderSourceInstanceService.isSendTransformMatrixData(
    sourceInstance,
    state.sourceInstanceRecord
  ) ?
    {
      InstanceBufferRenderService.bind(
        gl,
        InstanceBufferRenderService.getOrCreateBuffer(
          (gl, sourceInstance, defaultCapacity),
          (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
          state
        )
      )
      |> ignore;
      _sendTransformMatrixDataBufferData((gl, extension), shaderIndex, strideForSend, state)
    } :
    {
      let state =
        state |> _sendTransformMatrixData(componentTuple, dataTuple, fillMatrixTypeArrFunc);
      {
        ...state,
        sourceInstanceRecord:
          state.sourceInstanceRecord
          |> StaticRenderSourceInstanceService.markIsSendTransformMatrixData(sourceInstance, true)
      }
    };

let _sendDynamicTransformMatrixData =
    (
      (transformIndex, sourceInstance) as componentTuple,
      (glDataTuple, _, matrixMapTuple) as dataTuple,
      fillMatrixTypeArrFunc,
      {sourceInstanceRecord} as state
    ) =>
  {
    ...state,
    sourceInstanceRecord:
      sourceInstanceRecord
      |> StaticRenderSourceInstanceService.markIsSendTransformMatrixData(sourceInstance, false)
  }
  |> _sendTransformMatrixData(componentTuple, dataTuple, fillMatrixTypeArrFunc);

let _geMatrixMapTuple = (state) => {
  let {matrixInstanceBufferMap} = state.vboBufferRecord;
  let {matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap} = state.sourceInstanceRecord;
  (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap, matrixFloat32ArrayMap)
};

let _renderSourceInstanceGameObject = (gl, indexTuple, renderFunc, state) =>
  [@bs] renderFunc(gl, indexTuple, state);

let _prepareData =
    (gl, shaderIndex, (sourceInstance, defaultCapacity, strideForCapacity, strideForSend), state) => {
  let extension = GPUDetectService.unsafeGetInstanceExtension(state.gpuDetectRecord);
  let objectInstanceTransformArray =
    GetObjectInstanceArrayRenderService.getObjectInstanceTransformArray(
      sourceInstance,
      state.sourceInstanceRecord
    );
  let instanceRenderListCount = Js.Array.length(objectInstanceTransformArray) + 1;
  (
    (gl, extension, shaderIndex),
    (
      defaultCapacity,
      strideForCapacity,
      strideForSend,
      objectInstanceTransformArray,
      instanceRenderListCount
    ),
    _geMatrixMapTuple(state)
  )
};

let render =
    (
      gl,
      (
        (transformIndex, materialIndex, shaderIndex, geometryIndex, geometryType, sourceInstance) as indexTuple,
        defaultCapacity,
        strideForCapacity,
        strideForSend
      ),
      (renderFunc, fillMatrixTypeArrFunc),
      state
    ) => {
  /* TODO optimize for static record:
     use bufferData instead of bufferSubData(use STATIC_DRAW)
     use accurate buffer capacity(can't change) */
  let state =
    _renderSourceInstanceGameObject(
      gl,
      (transformIndex, materialIndex, shaderIndex, geometryIndex, geometryType),
      renderFunc,
      state
    );
  let ((gl, extension, _), (_, _, _, _, instanceRenderListCount), matrixMapTuple) as dataTuple =
    _prepareData(
      gl,
      shaderIndex,
      (sourceInstance, defaultCapacity, strideForCapacity, strideForSend),
      state
    );
  let state =
    StaticRenderSourceInstanceService.isTransformStatic(sourceInstance, state.sourceInstanceRecord) ?
      _sendStaticTransformMatrixData(
        (transformIndex, sourceInstance),
        dataTuple,
        fillMatrixTypeArrFunc,
        state
      ) :
      _sendDynamicTransformMatrixData(
        (transformIndex, sourceInstance),
        dataTuple,
        fillMatrixTypeArrFunc,
        state
      );
  let getIndicesCountFunc =
    CurrentComponentDataMapRenderService.getGetIndicesCountFunc(geometryType);
  DrawGLSLService.drawElementsInstancedANGLE(
    (
      RenderGeometryService.getDrawMode(gl),
      RenderGeometryService.getIndexType(gl),
      RenderGeometryService.getIndexTypeSize(gl),
      [@bs] getIndicesCountFunc(geometryIndex, state),
      instanceRenderListCount
    ),
    Obj.magic(extension)
  );
  /* TODO unbind? */
  state
};

let fillMatrixTypeArr = (transformIndex, matricesArrayForInstance, (state, offset)) =>
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (matricesArrayForInstance, offset),
    ([@bs] GetTransformDataRenderService.getLocalToWorldMatrixTypeArray(transformIndex, state), 0),
    16
  );