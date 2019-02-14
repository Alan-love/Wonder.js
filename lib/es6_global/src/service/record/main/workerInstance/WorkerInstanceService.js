

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";

function unsafeGetRenderWorker(param) {
  var renderWorker = param[/* renderWorker */0];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("render worker exist", "not"), (function () {
                        return Contract$WonderLog.assertExist(renderWorker);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OptionService$Wonderjs.unsafeGet(renderWorker);
}

function _setRenderWorker(_, worker) {
  return /* record */[/* renderWorker */Js_primitive.some(worker)];
}

function _getValidFileDir(dir) {
  var lastChar = dir.slice(-1);
  if (lastChar !== "/") {
    return "" + (String(dir) + "/");
  } else {
    return dir;
  }
}

function _getRenderWorkerFilePath(workerFileDir) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("workerFileDir be defined", "is empty string|"), (function () {
                        return Contract$WonderLog.assertGt(/* Int */0, workerFileDir.length, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return _getValidFileDir(workerFileDir) + "wd.render.worker.js";
}

function _createWorker(workerFilePath) {
  return new Worker(workerFilePath);
}

function initWorkInstances(workerFileDir, _) {
  var worker = new Worker(_getRenderWorkerFilePath(workerFileDir));
  return /* record */[/* renderWorker */Js_primitive.some(worker)];
}

export {
  unsafeGetRenderWorker ,
  _setRenderWorker ,
  _getValidFileDir ,
  _getRenderWorkerFilePath ,
  _createWorker ,
  initWorkInstances ,
  
}
/* Log-WonderLog Not a pure module */
