

import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function isDeleted(item) {
  return item == null;
}

function length(prim) {
  return prim.length;
}

function copy(prim) {
  return prim.slice();
}

function getValidValues(map) {
  return map.filter((function (value) {
                return value !== undefined;
              }));
}

function getValidKeys(map) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (arr, value, key) {
                if (value === undefined) {
                  return arr;
                } else {
                  arr.push(key);
                  return arr;
                }
              }), /* array */[], map);
}

function mapValid(func, map) {
  return map.map((function (value) {
                if (value === undefined) {
                  return value;
                } else {
                  return func(value);
                }
              }));
}

function forEachValid(func, map) {
  return ArrayService$WonderCommonlib.forEach((function (value) {
                if (value === undefined) {
                  return /* () */0;
                } else {
                  return func(value);
                }
              }), map);
}

function forEachiValid(func, map) {
  return ArrayService$WonderCommonlib.forEachi((function (value, index) {
                if (value === undefined) {
                  return /* () */0;
                } else {
                  return func(value, index);
                }
              }), map);
}

function reduceValid(func, initValue, map) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (previousValue, value) {
                if (value === undefined) {
                  return previousValue;
                } else {
                  return func(previousValue, value);
                }
              }), initValue, map);
}

function reduceiValid(func, initValue, map) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (previousValue, value, index) {
                if (value === undefined) {
                  return previousValue;
                } else {
                  return func(previousValue, value, index);
                }
              }), initValue, map);
}

function indexOf(targetValue, map) {
  return map.indexOf(targetValue);
}

export {
  isDeleted ,
  length ,
  copy ,
  getValidValues ,
  getValidKeys ,
  mapValid ,
  forEachValid ,
  forEachiValid ,
  reduceValid ,
  reduceiValid ,
  indexOf ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
