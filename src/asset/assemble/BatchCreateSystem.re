open StateDataMainType;

open WDType;

let _checkNotExceedMaxCountByIndex = (maxCount, indexArr) => {
  Array.unsafe_get(indexArr, (indexArr |> Js.Array.length) - 1)
  |> BufferService.checkNotExceedMaxCountByIndex(maxCount)
  |> ignore;
  indexArr;
};

let _batchCreateGameObject = ({gameObjects}, {gameObjectRecord} as state) => {
  let {count}: gameObjects = gameObjects;
  let {uid, aliveUidArray}: GameObjectType.gameObjectRecord = gameObjectRecord;
  let uidArr = ArrayService.range(uid, uid + count - 1);
  (
    {
      ...state,
      gameObjectRecord: {
        ...gameObjectRecord,
        uid: uid + count,
        aliveUidArray: aliveUidArray |> Js.Array.concat(uidArr),
      },
    },
    uidArr,
  );
};

let _setDefaultChildren = (indexArr, childMap) =>
  indexArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. childMap, index) =>
         WonderCommonlib.SparseMapService.set(
           index,
           WonderCommonlib.ArrayService.createEmpty(),
           childMap,
         ),
       childMap,
     );

let _initTransformDataWhenCreate =
    (
      indexArr,
      (
        {
          childMap,
          localToWorldMatrices,
          localPositions,
          defaultLocalToWorldMatrix,
          defaultLocalPosition,
        }: TransformType.transformRecord
      ) as transformRecord,
    ) => {
  ...transformRecord,
  childMap: childMap |> _setDefaultChildren(indexArr),
};

let _batchCreateTransform = ({transforms}, {settingRecord} as state) => {
  AssembleCommon.checkNotDisposedBefore(
    RecordTransformMainService.getRecord(state).disposedIndexArray,
  );
  let ({index, disposedIndexArray}: TransformType.transformRecord) as transformRecord =
    RecordTransformMainService.getRecord(state);
  let newIndex = index + (transforms |> Js.Array.length);
  let indexArr =
    ArrayService.range(index, newIndex - 1)
    |> _checkNotExceedMaxCountByIndex(
         BufferSettingService.getTransformCount(settingRecord),
       );
  transformRecord.index = newIndex;
  let transformRecord =
    _initTransformDataWhenCreate(indexArr, transformRecord);
  state.transformRecord =
    Some(
      indexArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. transformRecord, index) =>
             transformRecord |> DirtyTransformService.mark(index, true),
           transformRecord,
         ),
    );
  (state, indexArr);
};

let _batchCreateGeometry = ({geometrys}, {settingRecord} as state) => {
  AssembleCommon.checkNotDisposedBefore(
    RecordGeometryMainService.getRecord(state).disposedIndexArray,
  );
  let ({index, aliveIndexArray}: GeometryType.geometryRecord) as geometryRecord =
    RecordGeometryMainService.getRecord(state);
  let newIndex = index + (geometrys |> Js.Array.length);
  let indexArr =
    ArrayService.range(index, newIndex - 1)
    |> _checkNotExceedMaxCountByIndex(
         BufferSettingService.getGeometryCount(settingRecord),
       );
  state.geometryRecord =
    Some({
      ...geometryRecord,
      index: newIndex,
      aliveIndexArray: aliveIndexArray |> Js.Array.concat(indexArr),
    });
  (state, indexArr);
};

let _batchCreateMeshRenderer = ({meshRenderers}, {settingRecord} as state) => {
  AssembleCommon.checkNotDisposedBefore(
    RecordMeshRendererMainService.getRecord(state).disposedIndexArray,
  );

  let ({index}: MeshRendererType.meshRendererRecord) as meshRendererRecord =
    RecordMeshRendererMainService.getRecord(state);
  let newIndex = index + (meshRenderers |> Js.Array.length);
  let indexArr =
    ArrayService.range(index, newIndex - 1)
    |> _checkNotExceedMaxCountByIndex(
         BufferSettingService.getMeshRendererCount(settingRecord),
       );
  state.meshRendererRecord = Some({...meshRendererRecord, index: newIndex});
  (state, indexArr);
};

let _batchCreateBasicCameraView =
    (
      {basicCameraViews, perspectiveCameraProjections},
      {basicCameraViewRecord} as state,
    ) => {
  /*
   TODO check after add orhiCameraProjection
   WonderLog.Contract.requireCheck(
        () => {
          open WonderLog;
          open Contract;
          open Operators;

          let basicCameraViewCount = basicCameraViews |> Js.Array.length;

          let perspectiveCameraProjectionCount =
            perspectiveCameraProjections |> Js.Array.length;

          test(
            Log.buildAssertMessage(
              ~expect=
                {j|basicCameraViews' count:$basicCameraViewCount === cameraProjects' count:$perspectiveCameraProjectionCount|j},
              ~actual={j|not|j},
            ),
            () =>
            basicCameraViewCount == perspectiveCameraProjectionCount
          );
        },
        IsDebugMainService.getIsDebug(StateDataMain.stateData),
      ); */

  AssembleCommon.checkNotDisposedBefore(
    basicCameraViewRecord.disposedIndexArray,
  );

  let {index}: BasicCameraViewType.basicCameraViewRecord = basicCameraViewRecord;
  let newIndex = index + (basicCameraViews |> Js.Array.length);
  let indexArr = ArrayService.range(index, newIndex - 1);
  state.basicCameraViewRecord = {...basicCameraViewRecord, index: newIndex};
  (state, indexArr);
};

let _batchCreatePerspectiveCameraProjection =
    (
      {perspectiveCameraProjections},
      {perspectiveCameraProjectionRecord} as state,
    ) => {
  AssembleCommon.checkNotDisposedBefore(
    perspectiveCameraProjectionRecord.disposedIndexArray,
  );

  let {index, pMatrixMap}: PerspectiveCameraProjectionType.perspectiveCameraProjectionRecord = perspectiveCameraProjectionRecord;

  let newIndex = index + (perspectiveCameraProjections |> Js.Array.length);

  let indexArr = ArrayService.range(index, newIndex - 1);

  state.perspectiveCameraProjectionRecord = {
    ...perspectiveCameraProjectionRecord,
    index: newIndex,
    dirtyArray: indexArr,
    pMatrixMap:
      indexArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. pMatrixMap, index) =>
             PMatrixService.setDefaultPMatrix(index, pMatrixMap),
           pMatrixMap,
         ),
  };
  (state, indexArr);
};

/* TODO use batch create */
let _createArcballCameraControllerOneByOne =
    ({arcballCameraControllers}, {arcballCameraControllerRecord} as state) => {
  AssembleCommon.checkNotDisposedBefore(
    arcballCameraControllerRecord.disposedIndexArray,
  );

  let (arcballCameraControllerRecord, indexArr) =
    arcballCameraControllers
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (arcballCameraControllerRecord, indexArr), _) => {
           let (arcballCameraControllerRecord, index) =
             CreateArcballCameraControllerService.create(
               arcballCameraControllerRecord,
             );

           (
             arcballCameraControllerRecord,
             indexArr |> ArrayService.push(index),
           );
         },
         (arcballCameraControllerRecord, [||]),
       );

  ({...state, arcballCameraControllerRecord}, indexArr);
};

let _batchCreateBasicMaterial = ({basicMaterials}, {settingRecord} as state) => {
  let ({index, textureCountMap}: BasicMaterialType.basicMaterialRecord) as basicMaterialRecord =
    RecordBasicMaterialMainService.getRecord(state);

  AssembleCommon.checkNotDisposedBefore(
    basicMaterialRecord.disposedIndexArray,
  );

  let newIndex = index + (basicMaterials |> Js.Array.length);
  let indexArr =
    ArrayService.range(index, newIndex - 1)
    |> _checkNotExceedMaxCountByIndex(
         BufferSettingService.getBasicMaterialCount(settingRecord),
       );
  state.basicMaterialRecord =
    Some({
      ...basicMaterialRecord,
      index: newIndex,
      textureCountMap:
        indexArr
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. textureCountMap, index) =>
               WonderCommonlib.SparseMapService.set(
                 index,
                 TextureCountMapMaterialService.getDefaultCount(),
                 textureCountMap,
               ),
             textureCountMap,
           ),
    });
  (state, indexArr);
};

let _batchCreateLightMaterial = ({lightMaterials}, {settingRecord} as state) => {
  let ({index, textureCountMap}: LightMaterialType.lightMaterialRecord) as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);

  AssembleCommon.checkNotDisposedBefore(
    lightMaterialRecord.disposedIndexArray,
  );

  let newIndex = index + (lightMaterials |> Js.Array.length);
  let indexArr =
    ArrayService.range(index, newIndex - 1)
    |> _checkNotExceedMaxCountByIndex(
         BufferSettingService.getLightMaterialCount(settingRecord),
       );
  state.lightMaterialRecord =
    Some({
      ...lightMaterialRecord,
      index: newIndex,
      textureCountMap:
        indexArr
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. textureCountMap, index) =>
               WonderCommonlib.SparseMapService.set(
                 index,
                 TextureCountMapMaterialService.getDefaultCount(),
                 textureCountMap,
               ),
             textureCountMap,
           ),
    });
  (state, indexArr);
};

let _batchCreateBasicSourceTextureArr =
    ({basicSourceTextures}, {settingRecord} as state) => {
  let basicSourceTextureRecord =
    RecordBasicSourceTextureMainService.getRecord(state);

  AssembleCommon.checkNotDisposedBefore(
    basicSourceTextureRecord.disposedIndexArray,
  );

  let (state, indexArr) =
    basicSourceTextures
    |> ArrayService.reduceOneParamValidi(
         (. (state, indexArr), _, basicSourceTextureIndex) => {
           let (state, index) =
             CreateBasicSourceTextureMainService.create(. state);

           Array.unsafe_set(indexArr, basicSourceTextureIndex, index);

           (state, indexArr);
         },
         (state, [||]),
       );

  let state =
    indexArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. state, index) =>
           OperateBasicSourceTextureMainService.setFlipY(index, false, state),
         state,
       );

  (state, indexArr);
};

let _batchCreateDirectionLightArr =
    ({directionLights}, {directionLightRecord} as state) => {
  let {index, mappedIndexMap}: DirectionLightType.directionLightRecord = directionLightRecord;

  let newIndex = index + (directionLights |> Js.Array.length);
  let indexArr =
    ArrayService.range(index, newIndex - 1)
    |> _checkNotExceedMaxCountByIndex(
         BufferDirectionLightService.getBufferMaxCount(),
       );

  state.directionLightRecord = {
    ...directionLightRecord,
    index: newIndex,
    mappedIndexMap:
      indexArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. mappedIndexMap, index) =>
             mappedIndexMap |> MappedIndexService.setMappedIndex(index, index),
           mappedIndexMap,
         ),
  };
  (state, indexArr);
};

let _batchCreatePointLightArr = ({pointLights}, {pointLightRecord} as state) => {
  let {index, mappedIndexMap}: PointLightType.pointLightRecord = pointLightRecord;

  let newIndex = index + (pointLights |> Js.Array.length);
  let indexArr =
    ArrayService.range(index, newIndex - 1)
    |> _checkNotExceedMaxCountByIndex(
         BufferPointLightService.getBufferMaxCount(),
       );

  state.pointLightRecord = {
    ...pointLightRecord,
    index: newIndex,
    mappedIndexMap:
      indexArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. mappedIndexMap, index) =>
             mappedIndexMap |> MappedIndexService.setMappedIndex(index, index),
           mappedIndexMap,
         ),
  };
  (state, indexArr);
};

let batchCreate = (wd, state) => {
  let (state, gameObjectArr) = _batchCreateGameObject(wd, state);
  let (state, transformArr) = _batchCreateTransform(wd, state);
  let (state, geometryArr) = _batchCreateGeometry(wd, state);
  let (state, meshRendererArr) = _batchCreateMeshRenderer(wd, state);
  let (state, basicCameraViewArr) = _batchCreateBasicCameraView(wd, state);
  let (state, perspectiveCameraProjectionArr) =
    _batchCreatePerspectiveCameraProjection(wd, state);
  let (state, arcballCameraControllerArr) =
    _createArcballCameraControllerOneByOne(wd, state);
  let (state, basicMaterialArr) = _batchCreateBasicMaterial(wd, state);
  let (state, lightMaterialArr) = _batchCreateLightMaterial(wd, state);
  let (state, basicSourceTextureArr) =
    _batchCreateBasicSourceTextureArr(wd, state);
  /* let (state, arrayBufferViewSourceTextureArr) =
     _batchCreateArrayBufferViewSourceTextureArr(wd, state); */
  let (state, directionLightArr) = _batchCreateDirectionLightArr(wd, state);
  let (state, pointLightArr) = _batchCreatePointLightArr(wd, state);

  (
    state,
    gameObjectArr,
    (
      transformArr,
      geometryArr,
      meshRendererArr,
      basicCameraViewArr,
      perspectiveCameraProjectionArr,
      arcballCameraControllerArr,
      basicMaterialArr,
      lightMaterialArr,
      directionLightArr,
      pointLightArr,
    ),
    basicSourceTextureArr,
  );
  /* |> WonderLog.Contract.ensureCheck(
       (
         (
           state,
           gameObjectArr,
           (
             transformArr,
             geometryArr,
             basicCameraViewArr,
             perspectiveCameraProjectionArr,
             lightMaterialArr,
             directionLightArr,
             pointLightArr,
           ),
           basicSourceTextureArr,
         ),
       ) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|only has one type texture|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 (
                   basicSourceTextureArr
                   |> Js.Option.isSome
                   && arrayBufferViewSourceTextureArr
                   |> Js.Option.isNone
                   || arrayBufferViewSourceTextureArr
                   |> Js.Option.isSome
                   && basicSourceTextureArr
                   |> Js.Option.isNone
                 )
                 |> assertTrue
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     ); */
};