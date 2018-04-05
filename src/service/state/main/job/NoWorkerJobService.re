open StateDataMainType;

let _getAllNoWorkerJobs = (executableJobs, jobHandleMap, state: StateDataMainType.state) =>
  NoWorkerJobType.(
    executableJobs
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           (list, {name, flags}: executableJob) =>
             switch (WonderCommonlib.HashMapService.get(name, jobHandleMap)) {
             | None => JobService.handleGetNoneJob(name, jobHandleMap)
             | Some(handleFunc) => list @ [(name, handleFunc(flags))]
             }
         ),
         []
       )
  );

let _getNoWorkerInitJobList = (state: StateDataMainType.state) =>
  state.jobRecord.noWorkerInitJobList;

let _getNoWorkerLoopJobList = (state: StateDataMainType.state) =>
  state.jobRecord.noWorkerLoopJobList;

let execNoWorkerInitJobs = (state: StateDataMainType.state) : state =>
  state
  |> _getNoWorkerInitJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(state), state);

let execNoWorkerLoopJobs = (state: StateDataMainType.state) : state =>
  state
  |> _getNoWorkerLoopJobList
  |> List.fold_left(
       (state, (_, handleFunc)) =>
         handleFunc(TimeControllerService.getElapsed(state.timeControllerRecord), state),
       state
     );

let init = (state: StateDataMainType.state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerInitJobList:
      _getAllNoWorkerJobs(
        OperateNoWorkerJobService.getInitPipelineExecutableJobs(
          OperateNoWorkerJobService.getSetting(state.noWorkerJobRecord),
          OperateNoWorkerJobService.getInitPipelines(state.noWorkerJobRecord),
          OperateNoWorkerJobService.getInitJobs(state.noWorkerJobRecord)
        ),
        NoWorkerJobHandleSystem.createInitJobHandleMap(),
        state
      ),
    noWorkerLoopJobList:
      _getAllNoWorkerJobs(
        OperateNoWorkerJobService.getLoopPipelineExecutableJobs(
          OperateNoWorkerJobService.getSetting(state.noWorkerJobRecord),
          OperateNoWorkerJobService.getLoopPipelines(state.noWorkerJobRecord),
          OperateNoWorkerJobService.getLoopJobs(state.noWorkerJobRecord)
        ),
        NoWorkerJobHandleSystem.createLoopJobHandleMap(),
        state
      )
  }
};

let addNoWorkerInitJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataMainType.state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerInitJobList:
      JobService.addJob(
        (targetJobName, afterJobName, targetHandleFunc),
        _getNoWorkerInitJobList(state)
      )
  }
};

let addNoWorkerLoopJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataMainType.state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerLoopJobList:
      JobService.addJob(
        (targetJobName, afterJobName, targetHandleFunc),
        _getNoWorkerLoopJobList(state)
      )
  }
};

let removeNoWorkerInitJob = (targetJobName: string, state: StateDataMainType.state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerInitJobList: JobService.removeJob(targetJobName, _getNoWorkerInitJobList(state))
  }
};

let removeNoWorkerLoopJob = (targetJobName: string, state: StateDataMainType.state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerLoopJobList: JobService.removeJob(targetJobName, _getNoWorkerLoopJobList(state))
  }
};