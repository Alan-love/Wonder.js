let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateSystem.getState(stateData);
      /* TODO refactor: move to utils */
      WorkerInstanceSystem.unsafeGetRenderWorker(state)
      |> Worker.postMessage({"operateType": WorkerJobConfigSystem.unsafeGetFlags(flags)[0]})
    }
  );