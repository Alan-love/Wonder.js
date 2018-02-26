let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateSystem.getState(stateData);
      /* TODO refactor: move to utils */
      WorkerInstanceSystem.unsafeGetRenderWorker(state)
      |> WorkerUtils.postMessage({"operateType": JobConfigSystem.unsafeGetFlags(flags)[0]})
    }
  );