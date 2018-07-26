

import * as List from "../../../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Pervasives from "../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as JobService$Wonderjs from "../../../../primitive/job/JobService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as HashMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as OperateNoWorkerJobService$Wonderjs from "../../../../record/main/noWorkerJob/OperateNoWorkerJobService.js";

function _getAllNoWorkerJobs(executableJobs, jobHandleMap, _) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (list, param) {
                var name = param[/* name */0];
                var match = HashMapService$WonderCommonlib.get(name, jobHandleMap);
                if (match !== undefined) {
                  return Pervasives.$at(list, /* :: */[
                              /* tuple */[
                                name,
                                Curry._1(match, param[/* flags */1])
                              ],
                              /* [] */0
                            ]);
                } else {
                  return JobService$Wonderjs.handleGetNoneJob(name, jobHandleMap);
                }
              }), /* [] */0, executableJobs);
}

function _getNoWorkerInitJobList(state) {
  return state[/* jobRecord */1][/* noWorkerInitJobList */0];
}

function _getNoWorkerLoopJobList(state) {
  return state[/* jobRecord */1][/* noWorkerLoopJobList */1];
}

function execNoWorkerInitJobs(state) {
  return List.fold_left((function (state, param) {
                return Curry._1(param[1], state);
              }), state, state[/* jobRecord */1][/* noWorkerInitJobList */0]);
}

function execNoWorkerLoopJobs(state) {
  return List.fold_left((function (state, param) {
                return Curry._1(param[1], state);
              }), state, state[/* jobRecord */1][/* noWorkerLoopJobList */1]);
}

function init(param, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init$1 = state[/* jobRecord */1];
  newrecord[/* jobRecord */1] = /* record */[
    /* noWorkerInitJobList */_getAllNoWorkerJobs(OperateNoWorkerJobService$Wonderjs.getInitPipelineExecutableJobs(OperateNoWorkerJobService$Wonderjs.getSetting(state[/* noWorkerJobRecord */2]), OperateNoWorkerJobService$Wonderjs.getInitPipelines(state[/* noWorkerJobRecord */2]), OperateNoWorkerJobService$Wonderjs.getInitJobs(state[/* noWorkerJobRecord */2])), Curry._1(param[0], /* () */0), state),
    /* noWorkerLoopJobList */_getAllNoWorkerJobs(OperateNoWorkerJobService$Wonderjs.getLoopPipelineExecutableJobs(OperateNoWorkerJobService$Wonderjs.getSetting(state[/* noWorkerJobRecord */2]), OperateNoWorkerJobService$Wonderjs.getLoopPipelines(state[/* noWorkerJobRecord */2]), OperateNoWorkerJobService$Wonderjs.getLoopJobs(state[/* noWorkerJobRecord */2])), Curry._1(param[1], /* () */0), state),
    /* workerCustomMainInitTargetJobMap */init$1[/* workerCustomMainInitTargetJobMap */2],
    /* workerCustomMainInitSourceJobMap */init$1[/* workerCustomMainInitSourceJobMap */3],
    /* workerCustomMainInitRemovedDefaultJobMap */init$1[/* workerCustomMainInitRemovedDefaultJobMap */4],
    /* workerCustomMainLoopTargetJobMap */init$1[/* workerCustomMainLoopTargetJobMap */5],
    /* workerCustomMainLoopSourceJobMap */init$1[/* workerCustomMainLoopSourceJobMap */6],
    /* workerCustomMainLoopRemovedDefaultJobMap */init$1[/* workerCustomMainLoopRemovedDefaultJobMap */7]
  ];
  return newrecord;
}

function addNoWorkerInitJob(param, action, targetHandleFunc, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobRecord */1];
  newrecord[/* jobRecord */1] = /* record */[
    /* noWorkerInitJobList */JobService$Wonderjs.addJob(/* tuple */[
          param[0],
          param[1],
          action,
          targetHandleFunc
        ], state[/* jobRecord */1][/* noWorkerInitJobList */0]),
    /* noWorkerLoopJobList */init[/* noWorkerLoopJobList */1],
    /* workerCustomMainInitTargetJobMap */init[/* workerCustomMainInitTargetJobMap */2],
    /* workerCustomMainInitSourceJobMap */init[/* workerCustomMainInitSourceJobMap */3],
    /* workerCustomMainInitRemovedDefaultJobMap */init[/* workerCustomMainInitRemovedDefaultJobMap */4],
    /* workerCustomMainLoopTargetJobMap */init[/* workerCustomMainLoopTargetJobMap */5],
    /* workerCustomMainLoopSourceJobMap */init[/* workerCustomMainLoopSourceJobMap */6],
    /* workerCustomMainLoopRemovedDefaultJobMap */init[/* workerCustomMainLoopRemovedDefaultJobMap */7]
  ];
  return newrecord;
}

function addNoWorkerLoopJob(param, action, targetHandleFunc, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobRecord */1];
  newrecord[/* jobRecord */1] = /* record */[
    /* noWorkerInitJobList */init[/* noWorkerInitJobList */0],
    /* noWorkerLoopJobList */JobService$Wonderjs.addJob(/* tuple */[
          param[0],
          param[1],
          action,
          targetHandleFunc
        ], state[/* jobRecord */1][/* noWorkerLoopJobList */1]),
    /* workerCustomMainInitTargetJobMap */init[/* workerCustomMainInitTargetJobMap */2],
    /* workerCustomMainInitSourceJobMap */init[/* workerCustomMainInitSourceJobMap */3],
    /* workerCustomMainInitRemovedDefaultJobMap */init[/* workerCustomMainInitRemovedDefaultJobMap */4],
    /* workerCustomMainLoopTargetJobMap */init[/* workerCustomMainLoopTargetJobMap */5],
    /* workerCustomMainLoopSourceJobMap */init[/* workerCustomMainLoopSourceJobMap */6],
    /* workerCustomMainLoopRemovedDefaultJobMap */init[/* workerCustomMainLoopRemovedDefaultJobMap */7]
  ];
  return newrecord;
}

function removeNoWorkerInitJob(targetJobName, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobRecord */1];
  newrecord[/* jobRecord */1] = /* record */[
    /* noWorkerInitJobList */JobService$Wonderjs.removeJob(targetJobName, state[/* jobRecord */1][/* noWorkerInitJobList */0]),
    /* noWorkerLoopJobList */init[/* noWorkerLoopJobList */1],
    /* workerCustomMainInitTargetJobMap */init[/* workerCustomMainInitTargetJobMap */2],
    /* workerCustomMainInitSourceJobMap */init[/* workerCustomMainInitSourceJobMap */3],
    /* workerCustomMainInitRemovedDefaultJobMap */init[/* workerCustomMainInitRemovedDefaultJobMap */4],
    /* workerCustomMainLoopTargetJobMap */init[/* workerCustomMainLoopTargetJobMap */5],
    /* workerCustomMainLoopSourceJobMap */init[/* workerCustomMainLoopSourceJobMap */6],
    /* workerCustomMainLoopRemovedDefaultJobMap */init[/* workerCustomMainLoopRemovedDefaultJobMap */7]
  ];
  return newrecord;
}

function removeNoWorkerLoopJob(targetJobName, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobRecord */1];
  newrecord[/* jobRecord */1] = /* record */[
    /* noWorkerInitJobList */init[/* noWorkerInitJobList */0],
    /* noWorkerLoopJobList */JobService$Wonderjs.removeJob(targetJobName, state[/* jobRecord */1][/* noWorkerLoopJobList */1]),
    /* workerCustomMainInitTargetJobMap */init[/* workerCustomMainInitTargetJobMap */2],
    /* workerCustomMainInitSourceJobMap */init[/* workerCustomMainInitSourceJobMap */3],
    /* workerCustomMainInitRemovedDefaultJobMap */init[/* workerCustomMainInitRemovedDefaultJobMap */4],
    /* workerCustomMainLoopTargetJobMap */init[/* workerCustomMainLoopTargetJobMap */5],
    /* workerCustomMainLoopSourceJobMap */init[/* workerCustomMainLoopSourceJobMap */6],
    /* workerCustomMainLoopRemovedDefaultJobMap */init[/* workerCustomMainLoopRemovedDefaultJobMap */7]
  ];
  return newrecord;
}

export {
  _getAllNoWorkerJobs ,
  _getNoWorkerInitJobList ,
  _getNoWorkerLoopJobList ,
  execNoWorkerInitJobs ,
  execNoWorkerLoopJobs ,
  init ,
  addNoWorkerInitJob ,
  addNoWorkerLoopJob ,
  removeNoWorkerInitJob ,
  removeNoWorkerLoopJob ,
  
}
/* JobService-Wonderjs Not a pure module */
