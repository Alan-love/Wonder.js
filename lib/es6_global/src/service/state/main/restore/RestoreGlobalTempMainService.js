

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function restore(currentState, targetState) {
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* globalTempRecord */34] = currentState[/* globalTempRecord */34];
  return newrecord;
}

export {
  restore ,
  
}
/* No side effect */
