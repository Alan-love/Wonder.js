open MainStateDataType;

open GeometryType;

open BoxGeometryType;

open DisposeGeometryMainService;

open RenderGeometryService;

let createBoxGeometry = (state) => {
  let (boxGeometryRecord, index) = CreateBoxGeometryService.create(state.boxGeometryRecord);
  ({...state, boxGeometryRecord}, index)
};

let setBoxGeometryConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  {
    ...state,
    boxGeometryRecord:
      ConfigDataBoxGeometryService.setConfigData(geometry, configData, state.boxGeometryRecord)
  }
};

let getBoxGeometryDrawMode = (state: MainStateDataType.state) =>
  [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord) |> getDrawMode;

let unsafeGetBoxGeometryVertices = (geometry: int, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  [@bs] VerticesGeometryMainService.unsafeGetVertices(geometry, state)
};

let setBoxGeometryVertices =
    (geometry: int, record: Js.Typed_array.Float32Array.t, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  {
    ...state,
    boxGeometryRecord: {
      ...state.boxGeometryRecord,
      verticesMap: VerticesService.setVertices(geometry, record, state.boxGeometryRecord.verticesMap)
    }
  }
};

let unsafeGetBoxGeometryNormals = (geometry: int, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  [@bs] NormalsGeometryMainService.unsafeGetNormals(geometry, state)
};

let setBoxGeometryNormals =
    (geometry: int, record: Js.Typed_array.Float32Array.t, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  {
    ...state,
    boxGeometryRecord: {
      ...state.boxGeometryRecord,
      normalsMap: NormalsService.setNormals(geometry, record, state.boxGeometryRecord)
    }
  }
};

let unsafeGetBoxGeometryIndices = (geometry: int, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  [@bs] IndicesGeometryMainService.unsafeGetIndices(geometry, state)
};

let setBoxGeometryIndices =
    (geometry: int, record: Js.Typed_array.Uint16Array.t, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  {
    ...state,
    boxGeometryRecord: {
      ...state.boxGeometryRecord,
      indicesMap: IndicesService.setIndices(geometry, record, state.boxGeometryRecord)
    }
  }
};

let unsafeGetBoxGeometryConfigData = (geometry: geometry, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  ConfigDataGeometryService.unsafeGetConfigData(geometry, state.boxGeometryRecord)
};

let unsafeGetBoxGeometryGameObject = (geometry: geometry, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  GameObjectGeometryService.unsafeGetGameObject(geometry, state.boxGeometryRecord)
};