open MainStateDataType;

open SourceInstanceType;

open DisposeSourceInstanceMainService;

open CreateObjectInstanceGameObjectMainService;

open ObjectInstanceArraySourceInstanceService;

open StaticSourceInstanceService;

let createSourceInstance = (state) => {
  let (sourceInstanceRecord, index) =
    CreateSourceInstanceService.create(state.sourceInstanceRecord);
  ({...state, sourceInstanceRecord}, index)
};

let createObjectInstanceGameObject = (sourceInstance, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              sourceInstance,
              isAlive,
              state.sourceInstanceRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  createInstance(sourceInstance, state)
};

let getSourceInstanceObjectInstanceArray = (sourceInstance, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              sourceInstance,
              isAlive,
              state.sourceInstanceRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  getObjectInstanceArray(sourceInstance, state.sourceInstanceRecord)
};

let markSourceInstanceModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: Js.boolean, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              sourceInstance,
              isAlive,
              state.sourceInstanceRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  {
    ...state,
    sourceInstanceRecord:
      markModelMatrixIsStatic(sourceInstance, Js.to_bool(isStatic), state.sourceInstanceRecord)
  }
};