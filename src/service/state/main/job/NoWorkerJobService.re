open MainStateDataType;

let _getAllNoWorkerJobs = (executableJobs, jobHandleMap, state: MainStateDataType.state) =>
  NoWorkerJobConfigType.(
    executableJobs
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (list, {name, flags}: executableJob) =>
             switch (WonderCommonlib.HashMapSystem.get(name, jobHandleMap)) {
             | None => JobService.handleGetNoneJob(name, jobHandleMap)
             | Some(handleFunc) => list @ [(name, handleFunc(flags))]
             }
         ),
         []
       )
  );

let _getNoWorkerInitJobList = (state: MainStateDataType.state) => state.jobRecord.noWorkerInitJobList;

let _getNoWorkerLoopJobList = (state: MainStateDataType.state) => state.jobRecord.noWorkerLoopJobList;

let execNoWorkerInitJobs = (state: MainStateDataType.state) : state =>
  state
  |> _getNoWorkerInitJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(state), state);

let execNoWorkerLoopJobs = (elapsed: float, state: MainStateDataType.state) : state =>
  state
  |> _getNoWorkerLoopJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(elapsed, state), state);

let init = (state: MainStateDataType.state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerInitJobList:
      _getAllNoWorkerJobs(
        NoWorkerJobConfigSystem.getInitPipelineExecutableJobs(
          NoWorkerJobConfigSystem.getSetting(state),
          NoWorkerJobConfigSystem.getInitPipelines(state),
          NoWorkerJobConfigSystem.getInitJobs(state)
        ),
        NoWorkerJobHandleSystem.createInitJobHandleMap(),
        state
      ),
    noWorkerLoopJobList:
      _getAllNoWorkerJobs(
        NoWorkerJobConfigSystem.getLoopPipelineExecutableJobs(
          NoWorkerJobConfigSystem.getSetting(state),
          NoWorkerJobConfigSystem.getLoopPipelines(state),
          NoWorkerJobConfigSystem.getLoopJobs(state)
        ),
        NoWorkerJobHandleSystem.createLoopJobHandleMap(),
        state
      )
  }
};

 let addNoWorkerInitJob =
     (targetJobName: string, afterJobName: string, targetHandleFunc, state: MainStateDataType.state) => {
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
     (targetJobName: string, afterJobName: string, targetHandleFunc, state: MainStateDataType.state) => {
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

 let removeNoWorkerInitJob = (targetJobName: string, state: MainStateDataType.state) => {
   ...state,
   jobRecord: {
     ...state.jobRecord,
     noWorkerInitJobList: JobService.removeJob(targetJobName, _getNoWorkerInitJobList(state))
   }
 };

 let removeNoWorkerLoopJob = (targetJobName: string, state: MainStateDataType.state) => {
   ...state,
   jobRecord: {
     ...state.jobRecord,
     noWorkerLoopJobList: JobService.removeJob(targetJobName, _getNoWorkerLoopJobList(state))
   }
 };