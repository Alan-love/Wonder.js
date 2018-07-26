

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../TestTool.js";
import * as GameObjectTool$Wonderjs from "../gameObject/GameObjectTool.js";
import * as DeviceManagerService$Wonderjs from "../../../../src/service/record/all/device/DeviceManagerService.js";
import * as RenderGeometryService$Wonderjs from "../../../../src/service/record/main/geometry/RenderGeometryService.js";

function getIndexType(state) {
  return RenderGeometryService$Wonderjs.getIndexType(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */18]));
}

function getIndexTypeSize(state) {
  return RenderGeometryService$Wonderjs.getIndexTypeSize(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */18]));
}

function isGeometry(geometry) {
  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* >= */2], Wonder_jest.Expect[/* expect */0](geometry), 0);
}

function batchDisposeGeometryByCloseContractCheck(gameObjectArr, state) {
  TestTool$Wonderjs.closeContractCheck(/* () */0);
  var state$1 = GameObjectTool$Wonderjs.batchDisposeGameObject(gameObjectArr, state);
  TestTool$Wonderjs.openContractCheck(/* () */0);
  return state$1;
}

export {
  getIndexType ,
  getIndexTypeSize ,
  isGeometry ,
  batchDisposeGeometryByCloseContractCheck ,
  
}
/* Wonder_jest Not a pure module */
