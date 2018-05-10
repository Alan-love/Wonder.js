open BoxGeometryType;

open InstanceType;

open SourceInstanceType;

open VboBufferType;

open DisposeComponentService;

let disposeBoxGeometryBufferData =
  [@bs]
  (
    (
      geometry,
      {
        boxGeometryVertexBufferMap,
        boxGeometryTexCoordBufferMap,
        boxGeometryNormalBufferMap,
        boxGeometryElementArrayBufferMap
      } as record
    ) => {
      ...record,
      boxGeometryVertexBufferMap: disposeSparseMapData(geometry, boxGeometryVertexBufferMap),
      boxGeometryTexCoordBufferMap: disposeSparseMapData(geometry, boxGeometryTexCoordBufferMap),
      boxGeometryNormalBufferMap: disposeSparseMapData(geometry, boxGeometryNormalBufferMap),
      boxGeometryElementArrayBufferMap:
        disposeSparseMapData(geometry, boxGeometryElementArrayBufferMap)
    }
  );

let disposeCustomGeometryBufferData =
  [@bs]
  (
    (
      geometry,
      {
        customGeometryVertexBufferMap,
        customGeometryTexCoordBufferMap,
        customGeometryNormalBufferMap,
        customGeometryElementArrayBufferMap
      } as record
    ) => {
      ...record,
      customGeometryVertexBufferMap: disposeSparseMapData(geometry, customGeometryVertexBufferMap),
      customGeometryTexCoordBufferMap:
        disposeSparseMapData(geometry, customGeometryTexCoordBufferMap),
      customGeometryNormalBufferMap: disposeSparseMapData(geometry, customGeometryNormalBufferMap),
      customGeometryElementArrayBufferMap:
        disposeSparseMapData(geometry, customGeometryElementArrayBufferMap)
    }
  );

let disposeInstanceBufferData =
  [@bs]
  (
    (sourceInstance: sourceInstance, {matrixInstanceBufferMap} as record) => {
      ...record,
      matrixInstanceBufferMap: disposeSparseMapData(sourceInstance, matrixInstanceBufferMap)
    }
  );

let _disposeVboBuffer =
    (needDisposeVboBufferArr, (addBufferToPoolFunc, disposeBufferDataFunc), vboBufferRecord) =>
  needDisposeVboBufferArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (vboBufferRecord, component) =>
           [@bs]
           disposeBufferDataFunc(component, [@bs] addBufferToPoolFunc(component, vboBufferRecord))
       ),
       vboBufferRecord
     );

let disposeBoxGeometryVboBuffer = (boxGeometryNeedDisposeVboBufferArr, vboBufferRecord) =>
  _disposeVboBuffer(
    boxGeometryNeedDisposeVboBufferArr,
    ([@bs] PoolVboBufferService.addBoxGeometryBufferToPool, [@bs] disposeBoxGeometryBufferData),
    vboBufferRecord
  );

let disposeCustomGeometryVboBuffer = (customGeometryNeedDisposeVboBufferArr, vboBufferRecord) =>
  _disposeVboBuffer(
    customGeometryNeedDisposeVboBufferArr,
    (
      [@bs] PoolVboBufferService.addCustomGeometryBufferToPool,
      [@bs] disposeCustomGeometryBufferData
    ),
    vboBufferRecord
  );

let disposeSourceInstanceVboBuffer = (sourceInstanceNeedDisposeVboBufferArr, vboBufferRecord) =>
  _disposeVboBuffer(
    sourceInstanceNeedDisposeVboBufferArr,
    ([@bs] PoolVboBufferService.addInstanceBufferToPool, [@bs] disposeInstanceBufferData),
    vboBufferRecord
  );