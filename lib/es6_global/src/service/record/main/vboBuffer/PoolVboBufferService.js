

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as SparseMapService$Wonderjs from "../../../atom/SparseMapService.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function _getBufferAndSetBufferMap(gl, bufferPool) {
  var match = bufferPool.pop();
  if (match !== undefined) {
    return match;
  } else {
    return gl.createBuffer();
  }
}

function getArrayBuffer(gl, param) {
  return _getBufferAndSetBufferMap(gl, param[/* vertexArrayBufferPool */9]);
}

function getElementArrayBuffer(gl, param) {
  return _getBufferAndSetBufferMap(gl, param[/* elementArrayBufferPool */10]);
}

function getInstanceBuffer(gl, param) {
  return _getBufferAndSetBufferMap(gl, param[/* matrixInstanceBufferPool */11]);
}

function addAllBufferToPool(param) {
  var matrixInstanceBufferPool = param[/* matrixInstanceBufferPool */11];
  var elementArrayBufferPool = param[/* elementArrayBufferPool */10];
  var vertexArrayBufferPool = param[/* vertexArrayBufferPool */9];
  SparseMapService$Wonderjs.forEachValid((function (buffer) {
          vertexArrayBufferPool.push(buffer);
          return /* () */0;
        }), param[/* boxGeometryVertexBufferMap */0]);
  SparseMapService$Wonderjs.forEachValid((function (buffer) {
          vertexArrayBufferPool.push(buffer);
          return /* () */0;
        }), param[/* boxGeometryTexCoordBufferMap */1]);
  SparseMapService$Wonderjs.forEachValid((function (buffer) {
          vertexArrayBufferPool.push(buffer);
          return /* () */0;
        }), param[/* boxGeometryNormalBufferMap */2]);
  SparseMapService$Wonderjs.forEachValid((function (buffer) {
          elementArrayBufferPool.push(buffer);
          return /* () */0;
        }), param[/* boxGeometryElementArrayBufferMap */3]);
  SparseMapService$Wonderjs.forEachValid((function (buffer) {
          vertexArrayBufferPool.push(buffer);
          return /* () */0;
        }), param[/* customGeometryVertexBufferMap */4]);
  SparseMapService$Wonderjs.forEachValid((function (buffer) {
          vertexArrayBufferPool.push(buffer);
          return /* () */0;
        }), param[/* customGeometryTexCoordBufferMap */5]);
  SparseMapService$Wonderjs.forEachValid((function (buffer) {
          vertexArrayBufferPool.push(buffer);
          return /* () */0;
        }), param[/* customGeometryNormalBufferMap */6]);
  SparseMapService$Wonderjs.forEachValid((function (buffer) {
          elementArrayBufferPool.push(buffer);
          return /* () */0;
        }), param[/* customGeometryElementArrayBufferMap */7]);
  SparseMapService$Wonderjs.forEachValid((function (buffer) {
          matrixInstanceBufferPool.push(buffer);
          return /* () */0;
        }), param[/* matrixInstanceBufferMap */8]);
  return /* tuple */[
          vertexArrayBufferPool,
          elementArrayBufferPool,
          matrixInstanceBufferPool
        ];
}

var _getBufferFromBufferMap = SparseMapService$WonderCommonlib.get;

function _addBufferToPool(geometryIndex, bufferMap, pool) {
  var match = SparseMapService$WonderCommonlib.get(geometryIndex, bufferMap);
  if (match !== undefined) {
    return ArrayService$Wonderjs.push(Js_primitive.valFromOption(match), pool);
  } else {
    return pool;
  }
}

function addBoxGeometryBufferToPool(geometryIndex, record) {
  return /* record */[
          /* boxGeometryVertexBufferMap */record[/* boxGeometryVertexBufferMap */0],
          /* boxGeometryTexCoordBufferMap */record[/* boxGeometryTexCoordBufferMap */1],
          /* boxGeometryNormalBufferMap */record[/* boxGeometryNormalBufferMap */2],
          /* boxGeometryElementArrayBufferMap */record[/* boxGeometryElementArrayBufferMap */3],
          /* customGeometryVertexBufferMap */record[/* customGeometryVertexBufferMap */4],
          /* customGeometryTexCoordBufferMap */record[/* customGeometryTexCoordBufferMap */5],
          /* customGeometryNormalBufferMap */record[/* customGeometryNormalBufferMap */6],
          /* customGeometryElementArrayBufferMap */record[/* customGeometryElementArrayBufferMap */7],
          /* matrixInstanceBufferMap */record[/* matrixInstanceBufferMap */8],
          /* vertexArrayBufferPool */_addBufferToPool(geometryIndex, record[/* boxGeometryNormalBufferMap */2], _addBufferToPool(geometryIndex, record[/* boxGeometryTexCoordBufferMap */1], _addBufferToPool(geometryIndex, record[/* boxGeometryVertexBufferMap */0], record[/* vertexArrayBufferPool */9]))),
          /* elementArrayBufferPool */_addBufferToPool(geometryIndex, record[/* boxGeometryElementArrayBufferMap */3], record[/* elementArrayBufferPool */10]),
          /* matrixInstanceBufferPool */record[/* matrixInstanceBufferPool */11]
        ];
}

function addCustomGeometryBufferToPool(geometryIndex, record) {
  return /* record */[
          /* boxGeometryVertexBufferMap */record[/* boxGeometryVertexBufferMap */0],
          /* boxGeometryTexCoordBufferMap */record[/* boxGeometryTexCoordBufferMap */1],
          /* boxGeometryNormalBufferMap */record[/* boxGeometryNormalBufferMap */2],
          /* boxGeometryElementArrayBufferMap */record[/* boxGeometryElementArrayBufferMap */3],
          /* customGeometryVertexBufferMap */record[/* customGeometryVertexBufferMap */4],
          /* customGeometryTexCoordBufferMap */record[/* customGeometryTexCoordBufferMap */5],
          /* customGeometryNormalBufferMap */record[/* customGeometryNormalBufferMap */6],
          /* customGeometryElementArrayBufferMap */record[/* customGeometryElementArrayBufferMap */7],
          /* matrixInstanceBufferMap */record[/* matrixInstanceBufferMap */8],
          /* vertexArrayBufferPool */_addBufferToPool(geometryIndex, record[/* customGeometryNormalBufferMap */6], _addBufferToPool(geometryIndex, record[/* customGeometryTexCoordBufferMap */5], _addBufferToPool(geometryIndex, record[/* customGeometryVertexBufferMap */4], record[/* vertexArrayBufferPool */9]))),
          /* elementArrayBufferPool */_addBufferToPool(geometryIndex, record[/* customGeometryElementArrayBufferMap */7], record[/* elementArrayBufferPool */10]),
          /* matrixInstanceBufferPool */record[/* matrixInstanceBufferPool */11]
        ];
}

function _unsafeGetBufferFromBufferMap(index, bufferMap) {
  return Contract$WonderLog.ensureCheck((function () {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("buffer exist in bufferMap", "not"), (function () {
                              return Contract$WonderLog.assertTrue(SparseMapService$WonderCommonlib.has(index, bufferMap));
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), SparseMapService$WonderCommonlib.unsafeGet(index, bufferMap));
}

function addInstanceBufferToPool(sourceInstanceIndex, record) {
  var match = SparseMapService$WonderCommonlib.get(sourceInstanceIndex, record[/* matrixInstanceBufferMap */8]);
  if (match !== undefined) {
    return /* record */[
            /* boxGeometryVertexBufferMap */record[/* boxGeometryVertexBufferMap */0],
            /* boxGeometryTexCoordBufferMap */record[/* boxGeometryTexCoordBufferMap */1],
            /* boxGeometryNormalBufferMap */record[/* boxGeometryNormalBufferMap */2],
            /* boxGeometryElementArrayBufferMap */record[/* boxGeometryElementArrayBufferMap */3],
            /* customGeometryVertexBufferMap */record[/* customGeometryVertexBufferMap */4],
            /* customGeometryTexCoordBufferMap */record[/* customGeometryTexCoordBufferMap */5],
            /* customGeometryNormalBufferMap */record[/* customGeometryNormalBufferMap */6],
            /* customGeometryElementArrayBufferMap */record[/* customGeometryElementArrayBufferMap */7],
            /* matrixInstanceBufferMap */record[/* matrixInstanceBufferMap */8],
            /* vertexArrayBufferPool */record[/* vertexArrayBufferPool */9],
            /* elementArrayBufferPool */record[/* elementArrayBufferPool */10],
            /* matrixInstanceBufferPool */ArrayService$Wonderjs.push(Js_primitive.valFromOption(match), record[/* matrixInstanceBufferPool */11])
          ];
  } else {
    return record;
  }
}

export {
  _getBufferAndSetBufferMap ,
  getArrayBuffer ,
  getElementArrayBuffer ,
  getInstanceBuffer ,
  addAllBufferToPool ,
  _getBufferFromBufferMap ,
  _addBufferToPool ,
  addBoxGeometryBufferToPool ,
  addCustomGeometryBufferToPool ,
  _unsafeGetBufferFromBufferMap ,
  addInstanceBufferToPool ,
  
}
/* Log-WonderLog Not a pure module */
