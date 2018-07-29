open StateDataMainType;

open PointLightType;

open CreatePointLightService;

open GameObjectPointLightService;

open DisposePointLightService;

open OperatePointLightService;

let createPointLight = state => {
  let (pointLightRecord, index) =
    CreatePointLightService.create(. state.pointLightRecord);
  state.pointLightRecord = pointLightRecord;
  (state, index);
};

let unsafeGetPointLightGameObject = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetGameObject(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord),
    ),
    state.pointLightRecord,
  );
};

let getPointLightColor = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getColor(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord),
    ),
    state.pointLightRecord,
  );
};

let setPointLightColor = (light, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      setColor(
        MappedIndexService.getMappedIndex(
          light,
          IndexPointLightService.getMappedIndexMap(state.pointLightRecord),
        ),
        color,
        state.pointLightRecord,
      ),
  };
};

let getPointLightIntensity = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getIntensity(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord),
    ),
    state.pointLightRecord,
  );
};

let setPointLightIntensity = (light, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      setIntensity(
        MappedIndexService.getMappedIndex(
          light,
          IndexPointLightService.getMappedIndexMap(state.pointLightRecord),
        ),
        color,
        state.pointLightRecord,
      ),
  };
};

let getPointLightConstant = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getConstant(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord),
    ),
    state.pointLightRecord,
  );
};

let setPointLightConstant = (light, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      setConstant(
        MappedIndexService.getMappedIndex(
          light,
          IndexPointLightService.getMappedIndexMap(state.pointLightRecord),
        ),
        color,
        state.pointLightRecord,
      ),
  };
};

let getPointLightLinear = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getLinear(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord),
    ),
    state.pointLightRecord,
  );
};

let setPointLightLinear = (light, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      setLinear(
        MappedIndexService.getMappedIndex(
          light,
          IndexPointLightService.getMappedIndexMap(state.pointLightRecord),
        ),
        color,
        state.pointLightRecord,
      ),
  };
};

let getPointLightQuadratic = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getQuadratic(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord),
    ),
    state.pointLightRecord,
  );
};

let setPointLightQuadratic = (light, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      setQuadratic(
        MappedIndexService.getMappedIndex(
          light,
          IndexPointLightService.getMappedIndexMap(state.pointLightRecord),
        ),
        color,
        state.pointLightRecord,
      ),
  };
};

let getPointLightRange = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getRange(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord),
    ),
    state.pointLightRecord,
  );
};

let setPointLightRange = (light, range, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      setRange(
        MappedIndexService.getMappedIndex(
          light,
          IndexPointLightService.getMappedIndexMap(state.pointLightRecord),
        ),
        range,
        state.pointLightRecord,
      ),
  };
};

let setPointLightRangeLevel = (light, level, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      setRangeLevel(
        MappedIndexService.getMappedIndex(
          light,
          IndexPointLightService.getMappedIndexMap(state.pointLightRecord),
        ),
        level,
        state.pointLightRecord,
      ),
  };
};

let isExceedMaxCount = ({pointLightRecord}) =>
  MaxCountLightService.isExceedMaxCount(
    pointLightRecord.index,
    BufferPointLightService.getBufferMaxCount(),
  );