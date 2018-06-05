open StateDataMainType;

open VboBufferType;

open ComponentType;

let _checkBatchAdd = (uidArr, componentArr) =>
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let gameObjectCount = uidArr |> Js.Array.length;
      let componentCount = componentArr |> Js.Array.length;
      test(
        Log.buildAssertMessage(
          ~expect={j|one gameObject should add one component|j},
          ~actual=
            {j|$gameObjectCount gameObject add $componentCount components|j},
        ),
        () =>
        gameObjectCount == componentCount
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

let _batchAddComponent =
    (
      (uidArr: array(int), componentArr: array(component), componentMap),
      handleAddComponentFunc,
      componentRecord,
    ) => {
  _checkBatchAdd(uidArr, componentArr);
  uidArr
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. componentRecord, uid, index) => {
         let component = Array.unsafe_get(componentArr, index);
         ComponentMapService.addComponent(uid, component, componentMap);
         handleAddComponentFunc(. component, uid, componentRecord);
       },
       componentRecord,
     );
};

let _batchAddComponentWithState =
    (
      (uidArr: array(int), componentArr: array(component), componentMap),
      handleAddComponentFunc,
      state,
    ) => {
  _checkBatchAdd(uidArr, componentArr);
  uidArr
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, uid, index) => {
         let component = Array.unsafe_get(componentArr, index);
         ComponentMapService.addComponent(uid, component, componentMap);
         handleAddComponentFunc(. component, uid, state);
       },
       state,
     );
};

let batchAddBasicCameraViewComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {basicCameraViewRecord, gameObjectRecord} as state,
    ) => {
  ...state,
  basicCameraViewRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.basicCameraViewMap),
      AddBasicCameraViewService.handleAddComponent,
      basicCameraViewRecord,
    ),
};

let batchAddPerspectiveCameraProjectionComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {perspectiveCameraProjectionRecord, gameObjectRecord} as state,
    ) => {
  ...state,
  perspectiveCameraProjectionRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.perspectiveCameraProjectionMap),
      AddPerspectiveCameraProjectionService.handleAddComponent,
      perspectiveCameraProjectionRecord,
    ),
};

let _batchAddTransformComponent =
    (
      uidArr: array(int),
      componentArr: array(component),
      {gameObjectRecord} as state,
    ) => {
  ...state,
  transformRecord:
    Some(
      _batchAddComponent(
        (uidArr, componentArr, gameObjectRecord.transformMap),
        AddTransformService.handleAddComponent,
        state |> RecordTransformMainService.getRecord,
      ),
    ),
};

let batchAddTransformComponentForClone = _batchAddTransformComponent;

let batchAddMeshRendererComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {gameObjectRecord} as state,
    ) =>
  _batchAddComponentWithState(
    (uidArr, componentArr, gameObjectRecord.meshRendererMap),
    AddMeshRendererMainService.handleAddComponent,
    state,
  );

let _batchAddSharableComponent =
    (
      (uidArr: array(int), componentArr: array(component), componentMap),
      increaseGroupCountFunc,
      record,
    ) => {
  _checkBatchAdd(uidArr, componentArr);
  uidArr
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. record, uid, index) => {
         let component = Array.unsafe_get(componentArr, index);
         componentMap
         |> ComponentMapService.addComponent(uid, component)
         |> ignore;
         increaseGroupCountFunc(. component, record);
       },
       record,
     );
};

let _batchAddSharableGeometryComponent =
    (
      (
        uidArr: array(int),
        componentArr: array(component),
        dataTupleForBatchAddComponentDataFunc,
      ),
      increaseGroupCountFunc,
      batchAddComponentDataFunc,
      record,
    ) => {
  _checkBatchAdd(uidArr, componentArr);
  uidArr
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. record, uid, index) => {
         let component = Array.unsafe_get(componentArr, index);
         batchAddComponentDataFunc(.
           dataTupleForBatchAddComponentDataFunc,
           component,
           uid,
         )
         |> ignore;
         increaseGroupCountFunc(. component, record);
       },
       record,
     );
};

let _batchAddBoxGeometryComponentDataForClone =
  (. (currentGeometryDataMap, type_), component, uid) =>
    CurrentComponentDataMapRenderService.addToMap(
      uid,
      (component, type_),
      currentGeometryDataMap,
    );

let batchAddBoxGeometryComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {gameObjectRecord} as state,
    ) => {
  ...state,
  boxGeometryRecord:
    _batchAddSharableGeometryComponent(
      (
        uidArr,
        componentArr,
        (
          gameObjectRecord.currentGeometryDataMap,
          CurrentComponentDataMapRenderService.getBoxGeometryType(),
        ),
      ),
      GroupBoxGeometryService.increaseGroupCount,
      _batchAddBoxGeometryComponentDataForClone,
      state |> RecordBoxGeometryMainService.getRecord,
    ),
};

let _batchAddCustomGeometryComponentData =
  (. (currentGeometryDataMap, type_), component, uid) =>
    CurrentComponentDataMapRenderService.addToMap(
      uid,
      (component, type_),
      currentGeometryDataMap,
    );

let _batchAddCustomGeometryComponent =
    (
      uidArr: array(int),
      componentArr: array(component),
      {gameObjectRecord} as state,
    ) => {
  ...state,
  customGeometryRecord:
    Some(
      _batchAddSharableGeometryComponent(
        (
          uidArr,
          componentArr,
          (
            gameObjectRecord.currentGeometryDataMap,
            CurrentComponentDataMapRenderService.getCustomGeometryType(),
          ),
        ),
        GroupCustomGeometryService.increaseGroupCount,
        _batchAddCustomGeometryComponentData,
        state |> RecordCustomGeometryMainService.getRecord,
      ),
    ),
};

let batchAddCustomGeometryComponentForClone = _batchAddCustomGeometryComponent;

let _batchAddMaterialComponentForClone =
    (
      isShareMaterial,
      (uidArr: array(int), componentArr: array(component), componentMap),
      (increaseGroupCountFunc, handleAddComponentFunc),
      record,
    ) =>
  isShareMaterial ?
    _batchAddSharableComponent(
      (uidArr, componentArr, componentMap),
      increaseGroupCountFunc,
      record,
    ) :
    _batchAddComponent(
      (uidArr, componentArr, componentMap),
      handleAddComponentFunc,
      record,
    );

let batchAddBasicMaterialComponentForClone =
    (
      isShareMaterial,
      uidArr: array(int),
      componentArr: array(component),
      {gameObjectRecord} as state,
    ) => {
  ...state,
  basicMaterialRecord:
    Some(
      _batchAddMaterialComponentForClone(
        isShareMaterial,
        (uidArr, componentArr, gameObjectRecord.basicMaterialMap),
        (
          GroupBasicMaterialService.increaseGroupCount,
          AddBasicMaterialService.handleAddComponent,
        ),
        RecordBasicMaterialMainService.getRecord(state),
      ),
    ),
};

let batchAddLightMaterialComponentForClone =
    (
      isShareMaterial,
      uidArr: array(int),
      componentArr: array(component),
      {gameObjectRecord} as state,
    ) => {
  ...state,
  lightMaterialRecord:
    Some(
      _batchAddMaterialComponentForClone(
        isShareMaterial,
        (uidArr, componentArr, gameObjectRecord.lightMaterialMap),
        (
          GroupLightMaterialService.increaseGroupCount,
          AddLightMaterialService.handleAddComponent,
        ),
        RecordLightMaterialMainService.getRecord(state),
      ),
    ),
};

let batchAddAmbientLightComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {ambientLightRecord, gameObjectRecord} as state,
    ) => {
  ...state,
  ambientLightRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.ambientLightMap),
      AddAmbientLightService.handleAddComponent,
      ambientLightRecord,
    ),
};

let batchAddDirectionLightComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {directionLightRecord, gameObjectRecord} as state,
    ) => {
  ...state,
  directionLightRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.directionLightMap),
      AddDirectionLightService.handleAddComponent,
      directionLightRecord,
    ),
};

let batchAddPointLightComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {pointLightRecord, gameObjectRecord} as state,
    ) => {
  ...state,
  pointLightRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.pointLightMap),
      AddPointLightService.handleAddComponent,
      pointLightRecord,
    ),
};

let batchAddTransformComponentForCreate = _batchAddTransformComponent;

let batchAddCustomGeometryComponentForCreate = _batchAddCustomGeometryComponent;