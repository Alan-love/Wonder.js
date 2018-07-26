

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SceneAPI$Wonderjs from "../../../src/api/SceneAPI.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as CameraTool$Wonderjs from "../../tool/service/camera/CameraTool.js";
import * as MainStateTool$Wonderjs from "../../tool/service/state/MainStateTool.js";
import * as GameObjectTool$Wonderjs from "../../tool/service/gameObject/GameObjectTool.js";

describe("CameraSceneMainService", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("getCurrentCameraGameObject", (function () {
                describe("if not set current cameraGameObject before, find the first gameObject who has basicCameraView component", (function () {
                        Wonder_jest.test("if not find, return None", (function () {
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SceneAPI$Wonderjs.getCurrentCameraGameObject(state[0])), undefined);
                              }));
                        return Wonder_jest.test("if find, return Some(gameObject)", (function () {
                                      var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                      var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                      var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SceneAPI$Wonderjs.getCurrentCameraGameObject(match$2[0])), match$1[1]);
                                    }));
                      }));
                return Wonder_jest.test("else, return setted one", (function () {
                              var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                              var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                              var gameObject2 = match$1[1];
                              var state$1 = SceneAPI$Wonderjs.setCurrentCameraGameObject(gameObject2, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SceneAPI$Wonderjs.getCurrentCameraGameObject(state$1)), gameObject2);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
