

import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

var getMappedIndex = SparseMapService$WonderCommonlib.unsafeGet;

var setMappedIndex = SparseMapService$WonderCommonlib.set;

function markDisposed(index, mappedIndexMap) {
  return SparseMapService$WonderCommonlib.set(index, -1, mappedIndexMap);
}

function isDisposed(mappedIndex) {
  return mappedIndex === -1;
}

function isComponentAlive(component, mappedIndexMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(component, mappedIndexMap) !== -1;
}

export {
  getMappedIndex ,
  setMappedIndex ,
  markDisposed ,
  isDisposed ,
  isComponentAlive ,
  
}
/* No side effect */
