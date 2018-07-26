

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../main/data/StateDataMain.js";
import * as ProgramService$Wonderjs from "../../../record/all/program/ProgramService.js";
import * as IsDebugMainService$Wonderjs from "../../main/state/IsDebugMainService.js";
import * as HashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../primitive/buffer/DefaultTypeArrayValueService.js";

function _genereateShaderIndex(record) {
  var index = record[/* index */0];
  record[/* index */0] = index + 1 | 0;
  return Contract$WonderLog.ensureCheck((function (r) {
                var defaultShaderIndex = DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0);
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not equal default shader index:" + (String(defaultShaderIndex) + " "), "equal"), (function () {
                              return Contract$WonderLog.Operators[/* <>= */3](r, defaultShaderIndex);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), index);
}

function _getShaderIndex(key, param) {
  var shaderIndexMap = param[/* shaderIndexMap */1];
  return HashMapService$WonderCommonlib.get(key, shaderIndexMap);
}

function _setShaderIndex(key, shaderIndex, param) {
  var shaderIndexMap = param[/* shaderIndexMap */1];
  return HashMapService$WonderCommonlib.set(key, shaderIndex, shaderIndexMap);
}

function _join(array) {
  var output = "";
  for(var i = 0 ,i_finish = array.length - 1 | 0; i <= i_finish; ++i){
    output = output + Caml_array.caml_array_get(array, i)[/* name */0];
  }
  return output;
}

var _buildShaderIndexMapKey = _join;

function _createProgramAndInit(gl, shaderIndex, param, programRecord) {
  return ProgramService$Wonderjs.initShader(param[0], param[1], gl, ProgramService$Wonderjs.registerProgram(shaderIndex, programRecord, gl.createProgram()));
}

function initMaterialShader(materialIndex, param, param$1, param$2) {
  var shaderRecord = param$2[0];
  var shaderLibDataArr = param[1];
  var gl = param[0];
  var key = _join(shaderLibDataArr);
  var match = _getShaderIndex(key, shaderRecord);
  if (match !== undefined) {
    return match;
  } else {
    var shaderIndex = _genereateShaderIndex(shaderRecord);
    _setShaderIndex(key, shaderIndex, shaderRecord);
    var match$1 = param$1[0](materialIndex, shaderLibDataArr, param$1[1], /* tuple */[
          param$2[2],
          param$2[5]
        ]);
    var program = _createProgramAndInit(gl, shaderIndex, /* tuple */[
          match$1[0],
          match$1[1]
        ], param$2[1]);
    var recordTuple = param$1[2](/* tuple */[
          gl,
          shaderIndex,
          program
        ], shaderLibDataArr, /* tuple */[
          param$2[3],
          param$2[4]
        ]);
    param$1[3](gl, /* tuple */[
          program,
          shaderIndex,
          shaderLibDataArr
        ], recordTuple);
    return shaderIndex;
  }
}

export {
  _genereateShaderIndex ,
  _getShaderIndex ,
  _setShaderIndex ,
  _join ,
  _buildShaderIndexMapKey ,
  _createProgramAndInit ,
  initMaterialShader ,
  
}
/* Log-WonderLog Not a pure module */
