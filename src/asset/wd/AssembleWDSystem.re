open StateDataMainType;

open WDType;

open Js.Typed_array;

let _getAccessorTypeSize = ({type_}) =>
  switch type_ {
  | SCALAR => 1
  | VEC2 => 2
  | VEC3 => 3
  | VEC4 => 4
  | MAT2 => 4
  | MAT3 => 9
  | MAT4 => 16
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getAccessorTypeSize",
        ~description={j|unknown type_:$type_ |j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _getBufferAttributeData = (accessorIndex, bufferArr, {accessors, bufferViews, buffers}) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|not support interleaved buffer data|j},
                ~actual={j|is interleaved|j}
              ),
              () => {
                let accessor = Array.unsafe_get(accessors, accessorIndex);
                let bufferView = Array.unsafe_get(bufferViews, accessor.bufferView);
                switch bufferView.byteStride {
                | Some(byteStride) =>
                  byteStride == _getAccessorTypeSize(accessor) * Float32Array._BYTES_PER_ELEMENT
                }
              }
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  let accessor = Array.unsafe_get(accessors, accessorIndex);
  let bufferView = Array.unsafe_get(bufferViews, accessor.bufferView);
  Float32Array.fromBufferRange(
    Array.unsafe_get(bufferArr, bufferView.buffer),
    ~offset=accessor.byteOffset + bufferView.byteOffset,
    ~length=accessor.count * _getAccessorTypeSize(accessor)
  )
};

/* TODO duplicate with _getBufferAttributeData */
let _getBufferIndexData = (accessorIndex, bufferArr, {accessors, bufferViews, buffers}) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|not support interleaved buffer data|j},
                ~actual={j|is interleaved|j}
              ),
              () => {
                let accessor = Array.unsafe_get(accessors, accessorIndex);
                let bufferView = Array.unsafe_get(bufferViews, accessor.bufferView);
                switch bufferView.byteStride {
                | Some(byteStride) =>
                  byteStride == _getAccessorTypeSize(accessor) * Uint16Array._BYTES_PER_ELEMENT
                }
              }
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  let accessor = Array.unsafe_get(accessors, accessorIndex);
  let bufferView = Array.unsafe_get(bufferViews, accessor.bufferView);
  Uint16Array.fromBufferRange(
    Array.unsafe_get(bufferArr, bufferView.buffer),
    ~offset=accessor.byteOffset + bufferView.byteOffset,
    ~length=accessor.count * _getAccessorTypeSize(accessor)
  )
};

let _normalizeTexCoords = (texCoords) => {
  for (i in 0 to Float32Array.length(texCoords) / 2) {
    let index = i * 2 + 1;
    Float32Array.unsafe_set(texCoords, index, 1.0 -. Float32Array.unsafe_get(texCoords, index))
  };
  texCoords
};

let _batchSetCustomGeometryData = ({geometrys} as wdRecord, geometryArr, bufferArr, state) =>
  /* TODO optimize: first get all geometry point data; then batch set?(need benchmark test) */
  geometrys
  |> WonderCommonlib.ArrayService.reduceOneParami(
       [@bs]
       (
         (state, {position, normal, texCoord, index}: WDType.geometry, geometryIndex) => {
           let geometry = Array.unsafe_get(geometryArr, geometryIndex);
           let state =
             VerticesCustomGeometryMainService.setVerticesByTypeArray(
               geometry,
               _getBufferAttributeData(position, bufferArr, wdRecord),
               state
             );
           let state =
             switch normal {
             | None => state
             | Some(normal) =>
               NormalsCustomGeometryMainService.setNormalsByTypeArray(
                 geometry,
                 _getBufferAttributeData(normal, bufferArr, wdRecord),
                 state
               )
             };
           let state =
             switch texCoord {
             | None => state
             | Some(texCoord) =>
               TexCoordsCustomGeometryMainService.setTexCoordsByTypeArray(
                 geometry,
                 _getBufferAttributeData(texCoord, bufferArr, wdRecord) |> _normalizeTexCoords,
                 state
               )
             };
           let state =
             IndicesCustomGeometryMainService.setIndicesByTypeArray(
               geometry,
               _getBufferIndexData(index, bufferArr, wdRecord),
               state
             );
           state
         }
       ),
       state
     );

let _checkNotExceedMaxCountByIndex = (maxCount, indexArr) => {
  Array.unsafe_get(indexArr, (indexArr |> Js.Array.length) - 1)
  |> BufferService.checkNotExceedMaxCountByIndex(maxCount)
  |> ignore;
  indexArr
};

let _batchCreateCustomGeometry = ({geometrys}, {settingRecord} as state) => {
  let ({index, aliveIndexArray}: CustomGeometryType.customGeometryRecord) as customGeometryRecord =
    RecordCustomGeometryMainService.getRecord(state);
  let newIndex = index + (geometrys |> Js.Array.length);
  let indexArr =
    ArrayService.range(index, newIndex - 1)
    |> _checkNotExceedMaxCountByIndex(BufferSettingService.getCustomGeometryCount(settingRecord));
  state.customGeometryRecord =
    Some({
      ...customGeometryRecord,
      index: newIndex,
      aliveIndexArray: aliveIndexArray |> Js.Array.concat(indexArr)
    });
  (state, indexArr)
};

let _addChildrenToParent = (parent, children, (parentMap, childMap)) => (
  /* WonderLog.Contract.requireCheck(
       () => {
         open WonderLog;
         open Contract;
         open Operators;
         test(
           Log.buildAssertMessage(~expect={j|child not has parent|j}, ~actual={j|has|j}),
           () => getParent(child, record) |> assertNotExist
         );
         test(
           Log.buildAssertMessage(~expect={j|parent not already has the child|j}, ~actual={j|has|j}),
           () => unsafeGetChildren(parent, record) |> Js.Array.includes(child) |> assertFalse
         )
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  children
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (parentMap, child) =>
           /* TODO duplicate with HierachyTransformService */
           WonderCommonlib.SparseMapService.set(
             child,
             TransformType.transformToJsUndefine(parent),
             parentMap
           )
       ),
       parentMap
     ),
  WonderCommonlib.SparseMapService.set(parent, children, childMap)
);

let _batchSetTransformParent = ({indices}, transformArr, state) => {
  let ({parentMap, childMap}: TransformType.transformRecord) as transformRecord =
    RecordTransformMainService.getRecord(state);
  let (parentMap, childMap) =
    indices.gameObjectIndices.childrenTransformIndices
    |> WonderCommonlib.ArrayService.reduceOneParami(
         [@bs]
         (
           (hierachyDataTuple, childrenTransforms, parentTransform) =>
             switch childrenTransforms {
             | None => hierachyDataTuple
             | Some(childrenTransforms) =>
               _addChildrenToParent(parentTransform, childrenTransforms, hierachyDataTuple)
             }
         ),
         (parentMap, childMap)
       );
  {...state, transformRecord: Some({...transformRecord, parentMap, childMap})}
};

let _batchSetTransformData = ({transforms}, transformArr, state) => {
  /* TODO set local rotation, scale */
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|transformArr->length === transforms->length|j},
                ~actual={j|not|j}
              ),
              () => transformArr |> Js.Array.length == (transforms |> Js.Array.length)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  let ({localPositions}: TransformType.transformRecord) as transformRecord =
    RecordTransformMainService.getRecord(state);
  {
    ...state,
    transformRecord:
      Some({
        ...transformRecord,
        localPositions:
          transforms
          |> WonderCommonlib.ArrayService.reduceOneParami(
               [@bs]
               (
                 (localPositions, {translation}, index) => {
                   let transform = transformArr[index];
                   RecordTransformMainService.setLocalPositionByTuple(
                     transform,
                     translation,
                     localPositions
                   )
                 }
               ),
               localPositions
             )
      })
  }
};

/* let _setDefaultChildren = (indexArr, childMap) =>
   indexArr
   |> WonderCommonlib.ArrayService.reduceOneParam(
        [@bs]
        (
          (childMap, index) =>
            WonderCommonlib.SparseMapService.set(
              index,
              WonderCommonlib.ArrayService.createEmpty(),
              childMap
            )
        ),
        childMap
      ); */
/* let _initTransformDataWhenCreate =
     (
       indexArr,
       (
         {
           childMap,
           localToWorldMatrices,
           localPositions,
           defaultLocalToWorldMatrix,
           defaultLocalPosition
         }: TransformType.transformRecord
       ) as transformRecord
     ) =>
   /* _isNotNeedInitData(index, childMap) ?
      transformRecord : */
   {...transformRecord, childMap: childMap |> _setDefaultChildren(indexArr)}; */
let _batchCreateTransform = ({transforms}, {settingRecord} as state) => {
  let ({index, disposedIndexArray}: TransformType.transformRecord) as transformRecord =
    RecordTransformMainService.getRecord(state);
  let newIndex = index + (transforms |> Js.Array.length);
  let indexArr =
    ArrayService.range(index, newIndex - 1)
    |> _checkNotExceedMaxCountByIndex(BufferSettingService.getTransformCount(settingRecord));
  /* let (index, newIndex, disposedIndexArray) = generateIndex(index, disposedIndexArray); */
  transformRecord.index = newIndex;
  /* let transformRecord = _initTransformDataWhenCreate(indexArr, transformRecord); */
  /* transformRecord.disposedIndexArray = disposedIndexArray; */
  state.transformRecord =
    Some(
      indexArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs]
           (
             (transformRecord, index) => transformRecord |> DirtyTransformService.mark(index, true)
           ),
           transformRecord
         )
    );
  (state, indexArr)
};

let _batchCreateGameObject = ({gameObjects}, {gameObjectRecord} as state) => {
  let {count}: gameObjects = gameObjects;
  let {uid, aliveUidArray}: GameObjectType.gameObjectRecord = gameObjectRecord;
  let uidArr = ArrayService.range(uid, uid + count - 1);
  /* gameObjectRecord.uid = uid + count;

     aliveUidArray |> Js.Array.concat(
         uidArr
     ); */
  (
    {
      ...state,
      gameObjectRecord: {
        ...gameObjectRecord,
        uid: uid + count,
        aliveUidArray: aliveUidArray |> Js.Array.concat(uidArr)
      }
    },
    uidArr
  )
};

let _buildSceneGameObject = ({scene}, gameObjectArr, {gameObjectRecord} as state) => {
  let gameObjects = scene.gameObjects;
  switch (gameObjects |> Js.Array.length) {
  | 1 =>
    /* TODO test */
    (state, Array.unsafe_get(gameObjectArr, gameObjects[0]))
  | _ =>
    let (state, gameObject) = CreateGameObjectMainService.create(state);
    let ({parentMap, childMap}: TransformType.transformRecord) as transformRecord =
      RecordTransformMainService.getRecord(state);
    let (parentMap, childMap) =
      _addChildrenToParent(
        GetComponentGameObjectService.unsafeGetTransformComponent(gameObject, gameObjectRecord),
        scene.gameObjects
        |> Js.Array.map(
             (gameObjectIndex) =>
               GetComponentGameObjectService.unsafeGetTransformComponent(
                 Array.unsafe_get(gameObjectArr, gameObjectIndex),
                 gameObjectRecord
               )
           ),
        (parentMap, childMap)
      );
    ({...state, transformRecord: Some({...transformRecord, parentMap, childMap})}, gameObject)
  }
};

let assemble = ((wdRecord, imageArr, bufferArr), state) => {
  let (state, gameObjectArr) = _batchCreateGameObject(wdRecord, state);
  let (state, transformArr) = _batchCreateTransform(wdRecord, state);
  let (state, customGeometryArr) = _batchCreateCustomGeometry(wdRecord, state);
  let state =
    state
    |> _batchSetTransformData(wdRecord, transformArr)
    |> _batchSetTransformParent(wdRecord, transformArr)
    |> _batchSetCustomGeometryData(wdRecord, customGeometryArr, bufferArr)
    |> BatchAddGameObjectComponentMainService.batchAddTransformComponentForCreate(
         gameObjectArr,
         transformArr
       )
    |> BatchAddGameObjectComponentMainService.batchAddCustomGeometryComponentForCreate(
         gameObjectArr,
         customGeometryArr
       );
  _buildSceneGameObject(wdRecord, gameObjectArr, state)
};