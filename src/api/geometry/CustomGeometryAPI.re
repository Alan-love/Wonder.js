open StateDataMainType;

open GeometryType;

open CustomGeometryType;

open DisposeCustomGeometryMainService;

open RenderGeometryService;

let createCustomGeometry = (state) => {
  let (customGeometryRecord, index) =
    CreateCustomGeometryService.create(state |> RecordCustomGeometryMainService.getRecord);
  state.customGeometryRecord = Some(customGeometryRecord);
  (state, index)
};

let getCustomGeometryDrawMode = (state: StateDataMainType.state) =>
  [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord) |> getDrawMode;

let getCustomGeometryVertices = (geometry: int, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordCustomGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] VerticesCustomGeometryMainService.getVertices(geometry, state)
};

let setCustomGeometryVertices =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordCustomGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  VerticesCustomGeometryMainService.setVerticesByTypeArray(geometry, data, state)
};

let getCustomGeometryNormals = (geometry: int, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordCustomGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] NormalsCustomGeometryMainService.getNormals(geometry, state)
};

let setCustomGeometryNormals =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordCustomGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  NormalsCustomGeometryMainService.setNormalsByTypeArray(geometry, data, state)
};

let getCustomGeometryIndices = (geometry: int, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordCustomGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] IndicesCustomGeometryMainService.getIndices(geometry, state)
};

let setCustomGeometryIndices =
    (geometry: int, data: Js.Typed_array.Uint16Array.t, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordCustomGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  IndicesCustomGeometryMainService.setIndicesByTypeArray(geometry, data, state)
};

let unsafeGetCustomGeometryGameObject = (geometry: geometry, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordCustomGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  GameObjectCustomGeometryService.unsafeGetGameObject(
    geometry,
    RecordCustomGeometryMainService.getRecord(state)
  )
};