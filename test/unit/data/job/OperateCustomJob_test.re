open Wonder_jest;

let _ =
  describe(
    "Job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.initWithJobConfig(
              ~sandbox,
              ~noWorkerJobConfig=
                NoWorkerJobConfigTool.buildNoWorkerJobConfig(
                  ~initPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "start_time"
        }
      ]
    }
  ]
        |},
                  ~initJobs={j|
[

    {
        "name": "start_time"
    }
]
        |j},
                  ~loopPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "tick"
        }
      ]
    }
  ]
        |},
                  ~loopJobs={j|
[

    {
        "name": "tick"
    }
]
        |j},
                  ()
                ),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test operate custom job",
        () => {
          describe(
            "test operate noWorker job",
            () =>
              describe(
                "test operate noWorker init job",
                () => {
                  let _prepare = (state) => {
                    let (state, _, _, _) =
                      InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
                    state |> NoWorkerJobTool.init
                  };
                  describe(
                    "addNoWorkerInitJob",
                    () =>
                      describe(
                        "add job to noWorker init pipeline",
                        () => {
                          beforeEach(() => state := DirectorTool.prepare(state^));
                          describe(
                            "test add job after target job",
                            () =>
                              test(
                                "test add two job",
                                () => {
                                  let state = _prepare(state);
                                  let customData = [||];
                                  let state =
                                    state
                                    |> Job.addNoWorkerInitJob(
                                         "customJob1",
                                         "start_time",
                                         (state) => {
                                           customData |> ArraySystem.push(1) |> ignore;
                                           state
                                         }
                                       )
                                    |> Job.addNoWorkerInitJob(
                                         "customJob2",
                                         "customJob1",
                                         (state) => {
                                           customData |> ArraySystem.push(2) |> ignore;
                                           state
                                         }
                                       );
                                  let state = state |> NoWorkerJobTool.execInitJobs;
                                  customData |> expect == [|1, 2|]
                                }
                              )
                          );
                          test(
                            "test add job to head",
                            () => {
                              let state = _prepare(state);
                              let customData = [||];
                              let state =
                                state
                                |> Job.addNoWorkerInitJob(
                                     "customJob1",
                                     "",
                                     (state) => {
                                       customData |> ArraySystem.push(1) |> ignore;
                                       state
                                     }
                                   )
                                |> Job.addNoWorkerInitJob(
                                     "customJob2",
                                     "start_time",
                                     (state) => {
                                       customData |> ArraySystem.push(2) |> ignore;
                                       state
                                     }
                                   );
                              let state = state |> NoWorkerJobTool.execInitJobs;
                              customData |> expect == [|1, 2|]
                            }
                          )
                        }
                      )
                  );
                  describe(
                    "removeNoWorkerInitJob",
                    () => {
                      test(
                        "test remove custom added job",
                        () => {
                          let state = _prepare(state);
                          let customData = [||];
                          let state =
                            state
                            |> Job.addNoWorkerInitJob(
                                 "customJob",
                                 "start_time",
                                 (state) => {
                                   customData |> ArraySystem.push(1) |> ignore;
                                   state
                                 }
                               )
                            |> Job.removeNoWorkerInitJob("customJob");
                          let state = state |> NoWorkerJobTool.execInitJobs;
                          customData |> expect == [||]
                        }
                      );
                      test(
                        "test remove default job",
                        () => {
                          let state = _prepare(state);
                          let state = state |> Job.removeNoWorkerInitJob("start_time");
                          state
                          |> NoWorkerJobTool.getNoWorkerInitJobList
                          |> NoWorkerJobTool.isJobExistInJobList("start_time")
                          |> expect == false
                        }
                      )
                    }
                  )
                }
              )
          );
          describe(
            "test operate noWorker noWorker job",
            () => {
              let _prepare = (state) => {
                let (state, _, _, _) = InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
                state |> NoWorkerJobTool.init
              };
              describe(
                "addNoWorkerLoopJob",
                () =>
                  describe(
                    "add job to noWorker loop pipeline",
                    () =>
                      describe(
                        "test add job after target job",
                        () =>
                          test(
                            "test add one job",
                            () => {
                              let state = _prepare(state);
                              let customData = [||];
                              let state =
                                state
                                |> Job.addNoWorkerLoopJob(
                                     "customJob",
                                     "tick",
                                     (elapsed, state) => {
                                       customData |> ArraySystem.push(elapsed) |> ignore;
                                       state
                                     }
                                   );
                              let elapsed = 100.1;
                              let state = state |> NoWorkerJobTool.execLoopJobs(elapsed);
                              customData |> expect == [|elapsed|]
                            }
                          )
                      )
                  )
              );
              describe(
                "removeNoWorkerLoopJob",
                () =>
                  test(
                    "test remove custom added job",
                    () => {
                      let state = _prepare(state);
                      let customData = [||];
                      let state =
                        state
                        |> Job.addNoWorkerLoopJob(
                             "customJob",
                             "tick",
                             (elapsed, state) => {
                               customData |> ArraySystem.push(elapsed) |> ignore;
                               state
                             }
                           )
                        |> Job.removeNoWorkerLoopJob("customJob");
                      let elapsed = 100.1;
                      let state = state |> NoWorkerJobTool.execLoopJobs(elapsed);
                      customData |> expect == [||]
                    }
                  )
              )
            }
          )
        }
      )
    }
  );