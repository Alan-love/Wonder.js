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

let _batchAddBasicCameraViewComponent =
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

let batchAddBasicCameraViewComponentForClone = _batchAddBasicCameraViewComponent;

let _batchAddPerspectiveCameraProjectionComponent =
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

let batchAddPerspectiveCameraProjectionComponentForClone = _batchAddPerspectiveCameraProjectionComponent;

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

let _batchAddMeshRendererComponent =
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

let batchAddMeshRendererComponentForClone = _batchAddMeshRendererComponent;

let _batchAddSharableComponent =
    (
      (uidArr: array(int), componentArr: array(component), componentMap),
      (increaseGroupCountFunc, handleAddComponentFunc),
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
         let record = increaseGroupCountFunc(. component, record);
         handleAddComponentFunc(. component, uid, record);
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
      (
        increaseGroupCountFunc,
        handleAddComponentFunc,
        batchAddComponentDataFunc,
      ),
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
         let record = increaseGroupCountFunc(. component, record);
         handleAddComponentFunc(. component, uid, record);
       },
       record,
     );
};

let _batchAddBoxGeometryComponentDataForClone =
  (. (geometryDataMap, type_), component, uid) =>
    CurrentComponentDataMapRenderService.addToMap(
      uid,
      (component, type_),
      geometryDataMap,
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
          gameObjectRecord.geometryDataMap,
          CurrentComponentDataMapService.getBoxGeometryType(),
        ),
      ),
      (
        GroupBoxGeometryService.increaseGroupCount,
        AddBoxGeometryService.handleAddComponent,
        _batchAddBoxGeometryComponentDataForClone,
      ),
      state |> RecordBoxGeometryMainService.getRecord,
    ),
};

let _batchAddCustomGeometryComponentData =
  (. (geometryDataMap, type_), component, uid) =>
    CurrentComponentDataMapRenderService.addToMap(
      uid,
      (component, type_),
      geometryDataMap,
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
            gameObjectRecord.geometryDataMap,
            CurrentComponentDataMapService.getCustomGeometryType(),
          ),
        ),
        (
          GroupCustomGeometryService.increaseGroupCount,
          AddCustomGeometryService.handleAddComponent,
          _batchAddCustomGeometryComponentData,
        ),
        state |> RecordCustomGeometryMainService.getRecord,
      ),
    ),
};

let batchAddCustomGeometryComponentForClone = _batchAddCustomGeometryComponent;

let _batchAddMaterialComponent =
    (
      (uidArr: array(int), componentArr: array(component), componentMap),
      funcTuple,
      record,
    ) =>
  _batchAddSharableComponent(
    (uidArr, componentArr, componentMap),
    funcTuple,
    record,
  );

let batchAddBasicMaterialComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {gameObjectRecord} as state,
    ) => {
  ...state,
  basicMaterialRecord:
    Some(
      _batchAddMaterialComponent(
        (uidArr, componentArr, gameObjectRecord.basicMaterialMap),
        (
          GroupBasicMaterialService.increaseGroupCount,
          AddBasicMaterialService.handleAddComponent,
        ),
        RecordBasicMaterialMainService.getRecord(state),
      ),
    ),
};

let _batchAddLightMaterialComponent =
    (
      uidArr: array(int),
      componentArr: array(component),
      {gameObjectRecord} as state,
    ) => {
  ...state,
  lightMaterialRecord:
    Some(
      _batchAddMaterialComponent(
        (uidArr, componentArr, gameObjectRecord.lightMaterialMap),
        (
          GroupLightMaterialService.increaseGroupCount,
          AddLightMaterialService.handleAddComponent,
        ),
        RecordLightMaterialMainService.getRecord(state),
      ),
    ),
};

let batchAddLightMaterialComponentForClone = _batchAddLightMaterialComponent;

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

let batchAddBasicCameraViewComponentForCreate = _batchAddBasicCameraViewComponent;

let batchAddPerspectiveCameraProjectionComponentForCreate = _batchAddPerspectiveCameraProjectionComponent;

let batchAddLightMaterialComponentForCreate = _batchAddLightMaterialComponent;

let batchAddMeshRendererComponentForCreate = _batchAddMeshRendererComponent;