

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as SparseMapService$Wonderjs from "../../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function getFloat32ArrayPoolMap(record) {
  return record[/* float32ArrayPoolMap */0];
}

function getUint16ArrayPoolMap(record) {
  return record[/* uint16ArrayPoolMap */1];
}

function _addTypeArrayToPool(count, typeArray, maxSize, map) {
  var match = SparseMapService$WonderCommonlib.get(count, map);
  if (match !== undefined) {
    var arr = match;
    var len = arr.length;
    if (len >= maxSize) {
      return map;
    } else {
      arr.push(typeArray);
      return map;
    }
  } else {
    return SparseMapService$WonderCommonlib.set(count, /* array */[typeArray], map);
  }
}

function addFloat32TypeArrayToPool(typeArray, maxSize, map) {
  return _addTypeArrayToPool(typeArray.length, typeArray, maxSize, map);
}

function addUint16TypeArrayToPool(typeArray, maxSize, map) {
  return _addTypeArrayToPool(typeArray.length, typeArray, maxSize, map);
}

function _getTypeArrayFromPool(count, map) {
  var match = SparseMapService$WonderCommonlib.get(count, map);
  if (match !== undefined) {
    var arr = match;
    var match$1 = arr.length;
    if (match$1 !== 0) {
      return Js_primitive.undefined_to_opt(arr.pop());
    } else {
      return undefined;
    }
  }
  
}

function getFloat32TypeArrayFromPool(count, record) {
  return _getTypeArrayFromPool(count, record[/* float32ArrayPoolMap */0]);
}

function getUint16TypeArrayFromPool(count, record) {
  return _getTypeArrayFromPool(count, record[/* uint16ArrayPoolMap */1]);
}

function _addAllTypeArrayToPool(typeArrayMap, maxSize, map, addTypeArrayToPoolFunc) {
  SparseMapService$Wonderjs.forEachValid((function (typeArray) {
          addTypeArrayToPoolFunc(typeArray, maxSize, map);
          return /* () */0;
        }), typeArrayMap);
  return map;
}

function addAllFloat32TypeArrayToPool(typeArrayMap, maxSize, map) {
  return _addAllTypeArrayToPool(typeArrayMap, maxSize, map, addFloat32TypeArrayToPool);
}

function addAllUint16TypeArrayToPool(typeArrayMap, maxSize, map) {
  return _addAllTypeArrayToPool(typeArrayMap, maxSize, map, addUint16TypeArrayToPool);
}

export {
  getFloat32ArrayPoolMap ,
  getUint16ArrayPoolMap ,
  _addTypeArrayToPool ,
  addFloat32TypeArrayToPool ,
  addUint16TypeArrayToPool ,
  _getTypeArrayFromPool ,
  getFloat32TypeArrayFromPool ,
  getUint16TypeArrayFromPool ,
  _addAllTypeArrayToPool ,
  addAllFloat32TypeArrayToPool ,
  addAllUint16TypeArrayToPool ,
  
}
/* SparseMapService-Wonderjs Not a pure module */
