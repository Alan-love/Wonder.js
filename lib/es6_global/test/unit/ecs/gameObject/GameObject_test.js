

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as SceneAPI$Wonderjs from "../../../../src/api/SceneAPI.js";
import * as TestTool$Wonderjs from "../../../tool/TestTool.js";
import * as ArrayTool$Wonderjs from "../../../tool/service/atom/ArrayTool.js";
import * as CameraTool$Wonderjs from "../../../tool/service/camera/CameraTool.js";
import * as DisposeJob$Wonderjs from "../../../../src/job/no_worker/loop/DisposeJob.js";
import * as FakeGlTool$Wonderjs from "../../../tool/gl/FakeGlTool.js";
import * as GeometryAPI$Wonderjs from "../../../../src/api/geometry/GeometryAPI.js";
import * as SettingTool$Wonderjs from "../../../tool/service/setting/SettingTool.js";
import * as GeometryTool$Wonderjs from "../../../tool/service/geometry/GeometryTool.js";
import * as TransformAPI$Wonderjs from "../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as TransformTool$Wonderjs from "../../../tool/service/transform/TransformTool.js";
import * as VboBufferTool$Wonderjs from "../../../tool/service/vboBuffer/VboBufferTool.js";
import * as GameObjectTool$Wonderjs from "../../../tool/service/gameObject/GameObjectTool.js";
import * as PointLightTool$Wonderjs from "../../../tool/service/light/PointLightTool.js";
import * as AllMaterialTool$Wonderjs from "../../../tool/service/material/AllMaterialTool.js";
import * as BoxGeometryTool$Wonderjs from "../../../tool/service/geometry/BoxGeometryTool.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../src/api/material/BasicMaterialAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../src/api/material/LightMaterialAPI.js";
import * as MeshRendererTool$Wonderjs from "../../../tool/service/meshRenderer/MeshRendererTool.js";
import * as BasicMaterialTool$Wonderjs from "../../../tool/service/material/BasicMaterialTool.js";
import * as DirectionLightAPI$Wonderjs from "../../../../src/api/light/DirectionLightAPI.js";
import * as LightMaterialTool$Wonderjs from "../../../tool/service/material/LightMaterialTool.js";
import * as BasicCameraViewAPI$Wonderjs from "../../../../src/api/camera/BasicCameraViewAPI.js";
import * as DirectionLightTool$Wonderjs from "../../../tool/service/light/DirectionLightTool.js";
import * as ObjectInstanceTool$Wonderjs from "../../../tool/service/instance/ObjectInstanceTool.js";
import * as SourceInstanceTool$Wonderjs from "../../../tool/service/instance/SourceInstanceTool.js";
import * as BasicCameraViewTool$Wonderjs from "../../../tool/service/camera/BasicCameraViewTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as InitBasicMaterialJobTool$Wonderjs from "../../../tool/job/no_worker/init/InitBasicMaterialJobTool.js";
import * as InitLightMaterialJobTool$Wonderjs from "../../../tool/job/no_worker/init/InitLightMaterialJobTool.js";
import * as ArcballCameraControllerAPI$Wonderjs from "../../../../src/api/camera_controller/ArcballCameraControllerAPI.js";
import * as ArcballCameraControllerTool$Wonderjs from "../../../tool/service/camera_controller/ArcballCameraControllerTool.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../src/api/camera/PerspectiveCameraProjectionAPI.js";
import * as ArrayBufferViewSourceTextureAPI$Wonderjs from "../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js";
import * as PerspectiveCameraProjectionTool$Wonderjs from "../../../tool/service/camera/PerspectiveCameraProjectionTool.js";
import * as ReallocateGameObjectCPUMemoryTool$Wonderjs from "../../../tool/reallocate/ReallocateGameObjectCPUMemoryTool.js";

describe("GameObject", (function () {
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
        describe("createGameObject", (function () {
                Wonder_jest.test("create a new gameObject which is just uidStr(string)", (function () {
                        var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 1);
                      }));
                Wonder_jest.test("add new transform component", (function () {
                        var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectTransformComponent(match[1], match[0])), true);
                      }));
                describe("change state", (function () {
                        return Wonder_jest.test("state->uid + 1", (function () {
                                      var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                      var record = GameObjectTool$Wonderjs.getGameObjectRecord(match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](record[/* uid */0]), 2);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test operate component", (function () {
                describe("test transform component", (function () {
                        describe("addGameObjectTransformComponent", (function () {
                                Wonder_jest.test("if this type of component is already exist, error", (function () {
                                        var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                        var gameObject = match[1];
                                        var state$1 = match[0];
                                        return Wonder_jest.Expect[/* toThrowMessage */20]("expect this type of the component shouldn't be added before, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                          var match = TransformAPI$Wonderjs.createTransform(state$1);
                                                          return GameObjectAPI$Wonderjs.addGameObjectTransformComponent(gameObject, match[1], match[0]);
                                                        })));
                                      }));
                                return Wonder_jest.test("can get component's gameObject", (function () {
                                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                              var gameObject = match[1];
                                              var state$1 = match[0];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformGameObject(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$1), state$1)), gameObject);
                                            }));
                              }));
                        describe("unsafeGetGameObjectTransformComponent", (function () {
                                return Wonder_jest.test("get transform component", (function () {
                                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                              return TransformTool$Wonderjs.isTransform(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match[1], match[0]));
                                            }));
                              }));
                        describe("hasGameObjectTransformComponent", (function () {
                                return Wonder_jest.test("has transform component", (function () {
                                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectTransformComponent(match[1], match[0])), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test material component", (function () {
                        describe("unsafeGetGameObjectBasicMaterialComponent", (function () {
                                return Wonder_jest.test("get material component", (function () {
                                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                              var gameObject = match[1];
                                              var match$1 = BasicMaterialAPI$Wonderjs.createBasicMaterial(match[0]);
                                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, match$1[1], match$1[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectBasicMaterialComponent(gameObject, state$1)), true);
                                            }));
                              }));
                        describe("hasGameObjectBasicMaterialComponent", (function () {
                                return Wonder_jest.test("has material component", (function () {
                                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                              var gameObject = match[1];
                                              var match$1 = BasicMaterialAPI$Wonderjs.createBasicMaterial(match[0]);
                                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, match$1[1], match$1[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectBasicMaterialComponent(gameObject, state$1)), true);
                                            }));
                              }));
                        describe("unsafeGetGameObjectLightMaterialComponent", (function () {
                                return Wonder_jest.test("get material component", (function () {
                                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                              var gameObject = match[1];
                                              var match$1 = LightMaterialAPI$Wonderjs.createLightMaterial(match[0]);
                                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, match$1[1], match$1[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectLightMaterialComponent(gameObject, state$1)), true);
                                            }));
                              }));
                        describe("hasGameObjectLightMaterialComponent", (function () {
                                return Wonder_jest.test("has material component", (function () {
                                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                              var gameObject = match[1];
                                              var match$1 = LightMaterialAPI$Wonderjs.createLightMaterial(match[0]);
                                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, match$1[1], match$1[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectLightMaterialComponent(gameObject, state$1)), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test geometry component", (function () {
                        describe("unsafeGetGeometryComponent", (function () {
                                return Wonder_jest.test("get geometry component", (function () {
                                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                              var gameObject = match[1];
                                              var match$1 = GeometryAPI$Wonderjs.createGeometry(match[0]);
                                              var match$2 = GeometryAPI$Wonderjs.createGeometry(match$1[0]);
                                              var geometry2 = match$2[1];
                                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry2, match$2[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent(gameObject, state$1)), geometry2);
                                            }));
                              }));
                        describe("hasGameObjectGeometryComponent", (function () {
                                return Wonder_jest.test("has geometry component", (function () {
                                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                              var gameObject = match[1];
                                              var match$1 = GeometryAPI$Wonderjs.createGeometry(match[0]);
                                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, match$1[1], match$1[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectGeometryComponent(gameObject, state$1)), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test meshRenderer component", (function () {
                        describe("unsafeGetGameObjectMeshRendererComponent", (function () {
                                return Wonder_jest.test("get meshRenderer component", (function () {
                                              var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                              return MeshRendererTool$Wonderjs.isMeshRenderer(GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent(match[1], match[0]));
                                            }));
                              }));
                        describe("hasGameObjectMeshRendererComponent", (function () {
                                return Wonder_jest.test("has meshRenderer component", (function () {
                                              var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectMeshRendererComponent(match[1], match[0])), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test light component", (function () {
                        describe("unsafeGetGameObjectDirectionLightComponent", (function () {
                                return Wonder_jest.test("get light component", (function () {
                                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                              var gameObject = match[1];
                                              var match$1 = DirectionLightAPI$Wonderjs.createDirectionLight(match[0]);
                                              var light = match$1[1];
                                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectDirectionLightComponent(gameObject, light, match$1[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.unsafeGetGameObjectDirectionLightComponent(gameObject, state$1)), light);
                                            }));
                              }));
                        describe("hasGameObjectDirectionLightComponent", (function () {
                                return Wonder_jest.test("has light component", (function () {
                                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                              var gameObject = match[1];
                                              var match$1 = DirectionLightAPI$Wonderjs.createDirectionLight(match[0]);
                                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectDirectionLightComponent(gameObject, match$1[1], match$1[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectDirectionLightComponent(gameObject, state$1)), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test basicCameraView component", (function () {
                        var _prepare = function () {
                          var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                          var gameObject = match[1];
                          var match$1 = BasicCameraViewAPI$Wonderjs.createBasicCameraView(match[0]);
                          var basicCameraView = match$1[1];
                          var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent(gameObject, basicCameraView, match$1[0]);
                          return /* tuple */[
                                  state$1,
                                  gameObject,
                                  basicCameraView
                                ];
                        };
                        describe("addGameObjectBasicCameraViewComponent", (function () {
                                Wonder_jest.test("if this type of component is already exist, error", (function () {
                                        var match = _prepare(/* () */0);
                                        var gameObject = match[1];
                                        var state = match[0];
                                        return Wonder_jest.Expect[/* toThrowMessage */20]("expect this type of the component shouldn't be added before, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                          var match = BasicCameraViewAPI$Wonderjs.createBasicCameraView(state);
                                                          return GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent(gameObject, match[1], match[0]);
                                                        })));
                                      }));
                                return Wonder_jest.test("can get component's gameObject", (function () {
                                              var match = _prepare(/* () */0);
                                              var gameObject = match[1];
                                              var state = match[0];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicCameraViewAPI$Wonderjs.unsafeGetBasicCameraViewGameObject(GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent(gameObject, state), state)), gameObject);
                                            }));
                              }));
                        describe("unsafeGetGameObjectBasicCameraViewComponent", (function () {
                                return Wonder_jest.test("get basicCameraView component", (function () {
                                              var match = _prepare(/* () */0);
                                              return BasicCameraViewTool$Wonderjs.isBasicCameraView(GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent(match[1], match[0]));
                                            }));
                              }));
                        describe("hasGameObjectBasicCameraViewComponent", (function () {
                                return Wonder_jest.test("has basicCameraView component", (function () {
                                              var match = _prepare(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectBasicCameraViewComponent(match[1], match[0])), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test perspectiveCameraProjection component", (function () {
                        var _prepare = function () {
                          var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                          var gameObject = match[1];
                          var match$1 = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(match[0]);
                          var perspectiveCameraProjection = match$1[1];
                          var state$1 = GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent(gameObject, perspectiveCameraProjection, match$1[0]);
                          return /* tuple */[
                                  state$1,
                                  gameObject,
                                  perspectiveCameraProjection
                                ];
                        };
                        describe("addGameObjectPerspectiveCameraProjectionComponent", (function () {
                                Wonder_jest.test("if this type of component is already exist, error", (function () {
                                        var match = _prepare(/* () */0);
                                        var gameObject = match[1];
                                        var state = match[0];
                                        return Wonder_jest.Expect[/* toThrowMessage */20]("expect this type of the component shouldn't be added before, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                          var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state);
                                                          return GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent(gameObject, match[1], match[0]);
                                                        })));
                                      }));
                                return Wonder_jest.test("can get component's gameObject", (function () {
                                              var match = _prepare(/* () */0);
                                              var gameObject = match[1];
                                              var state = match[0];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionGameObject(GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent(gameObject, state), state)), gameObject);
                                            }));
                              }));
                        describe("unsafeGetGameObjectPerspectiveCameraProjectionComponent", (function () {
                                return Wonder_jest.test("get perspectiveCameraProjection component", (function () {
                                              var match = _prepare(/* () */0);
                                              return PerspectiveCameraProjectionTool$Wonderjs.isPerspectiveCameraProjection(GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent(match[1], match[0]));
                                            }));
                              }));
                        describe("hasGameObjectPerspectiveCameraProjectionComponent", (function () {
                                return Wonder_jest.test("has perspectiveCameraProjection component", (function () {
                                              var match = _prepare(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectPerspectiveCameraProjectionComponent(match[1], match[0])), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test arcballCameraController component", (function () {
                        var _prepare = function () {
                          var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                          var gameObject = match[1];
                          var match$1 = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(match[0]);
                          var arcballCameraController = match$1[1];
                          var state$1 = GameObjectAPI$Wonderjs.addGameObjectArcballCameraControllerComponent(gameObject, arcballCameraController, match$1[0]);
                          return /* tuple */[
                                  state$1,
                                  gameObject,
                                  arcballCameraController
                                ];
                        };
                        describe("addGameObjectArcballCameraControllerComponent", (function () {
                                Wonder_jest.test("if this type of component is already exist, error", (function () {
                                        var match = _prepare(/* () */0);
                                        var gameObject = match[1];
                                        var state = match[0];
                                        return Wonder_jest.Expect[/* toThrowMessage */20]("expect this type of the component shouldn't be added before, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                          var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state);
                                                          return GameObjectAPI$Wonderjs.addGameObjectArcballCameraControllerComponent(gameObject, match[1], match[0]);
                                                        })));
                                      }));
                                return Wonder_jest.test("can get component's gameObject", (function () {
                                              var match = _prepare(/* () */0);
                                              var gameObject = match[1];
                                              var state = match[0];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerGameObject(GameObjectAPI$Wonderjs.unsafeGetGameObjectArcballCameraControllerComponent(gameObject, state), state)), gameObject);
                                            }));
                              }));
                        describe("unsafeGetGameObjectArcballCameraControllerComponent", (function () {
                                return Wonder_jest.test("get arcballCameraController component", (function () {
                                              var match = _prepare(/* () */0);
                                              return ArcballCameraControllerTool$Wonderjs.isArcballCameraController(GameObjectAPI$Wonderjs.unsafeGetGameObjectArcballCameraControllerComponent(match[1], match[0]));
                                            }));
                              }));
                        describe("hasGameObjectArcballCameraControllerComponent", (function () {
                                return Wonder_jest.test("has arcballCameraController component", (function () {
                                              var match = _prepare(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectArcballCameraControllerComponent(match[1], match[0])), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("getAllChildrenTransform", (function () {
                return Wonder_jest.test("get all children' transform", (function () {
                              var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                              var gameObject1 = match[1];
                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                              var match$2 = GameObjectTool$Wonderjs.createGameObject(match$1[0]);
                              var gameObject2 = match$2[1];
                              var match$3 = GameObjectTool$Wonderjs.createGameObject(match$2[0]);
                              var state$1 = GameObjectTool$Wonderjs.addChild(gameObject2, match$3[1], GameObjectTool$Wonderjs.addChild(gameObject1, gameObject2, match$3[0]));
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllChildrenTransform(gameObject1, state$1)), /* array */[
                                          match$2[2],
                                          match$3[2]
                                        ]);
                            }));
              }));
        describe("getAllGameObjects", (function () {
                Wonder_jest.test("get itself and all children", (function () {
                        var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                        var gameObject1 = match[1];
                        var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                        var match$2 = GameObjectTool$Wonderjs.createGameObject(match$1[0]);
                        var gameObject2 = match$2[1];
                        var match$3 = GameObjectTool$Wonderjs.createGameObject(match$2[0]);
                        var gameObject3 = match$3[1];
                        var state$1 = GameObjectTool$Wonderjs.addChild(gameObject2, gameObject3, GameObjectTool$Wonderjs.addChild(gameObject1, gameObject2, match$3[0]));
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllGameObjects(gameObject1, state$1)), /* array */[
                                    gameObject1,
                                    gameObject2,
                                    gameObject3
                                  ]);
                      }));
                describe("fix bug", (function () {
                        return Wonder_jest.test("not sort transform children", (function () {
                                      var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                      var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                                      var gameObject1 = match$1[1];
                                      var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                                      var match$3 = GameObjectTool$Wonderjs.createGameObject(match$2[0]);
                                      var state$1 = GameObjectTool$Wonderjs.addChild(gameObject1, match[1], GameObjectTool$Wonderjs.addChild(gameObject1, match$3[1], match$3[0]));
                                      GameObjectAPI$Wonderjs.getAllGameObjects(gameObject1, state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$Wonderjs.getChildren(gameObject1, state$1).map((function (gameObject) {
                                                            return GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$1);
                                                          }))), /* array */[
                                                  match$3[2],
                                                  match[2]
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test get all components", (function () {
                var _createMaterialGameObjects = function (state) {
                  var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                  var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                  var match$2 = LightMaterialTool$Wonderjs.createGameObject(match$1[0]);
                  var match$3 = GeometryTool$Wonderjs.createGameObject(match$2[0]);
                  return /* tuple */[
                          match$3[0],
                          /* tuple */[
                            match[1],
                            match$1[1],
                            match$2[1],
                            match$3[1]
                          ],
                          /* tuple */[
                            match[2],
                            match$1[2],
                            match$2[2]
                          ],
                          match$3[2]
                        ];
                };
                var _createCameraGameObjects = function (state) {
                  var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                  var match$1 = match[3];
                  var match$2 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                  var match$3 = match$2[3];
                  var match$4 = LightMaterialTool$Wonderjs.createGameObject(match$2[0]);
                  var match$5 = GeometryTool$Wonderjs.createGameObject(match$4[0]);
                  return /* tuple */[
                          match$5[0],
                          /* tuple */[
                            match[1],
                            match$2[1],
                            match$4[1],
                            match$5[1]
                          ],
                          /* tuple */[
                            match$1[0],
                            match$3[0]
                          ],
                          /* tuple */[
                            match$1[1],
                            match$3[1]
                          ],
                          match$4[2],
                          match$5[2]
                        ];
                };
                var _createLightGameObjects = function (state) {
                  var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                  var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                  var match$2 = PointLightTool$Wonderjs.createGameObject(match$1[0]);
                  var match$3 = GeometryTool$Wonderjs.createGameObject(match$2[0]);
                  return /* tuple */[
                          match$3[0],
                          /* tuple */[
                            match[1],
                            match$1[1],
                            match$2[1],
                            match$3[1]
                          ],
                          /* tuple */[
                            match[2],
                            match$1[2],
                            match$2[2]
                          ],
                          match$3[2]
                        ];
                };
                var _createGeometryGameObjects = function (state) {
                  var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                  var match$1 = GeometryTool$Wonderjs.createGameObject(match[0]);
                  var match$2 = BoxGeometryTool$Wonderjs.createGameObject(match$1[0]);
                  return /* tuple */[
                          match$2[0],
                          /* tuple */[
                            match[1],
                            match$1[1],
                            match$2[1]
                          ],
                          /* tuple */[
                            match[2],
                            match$1[2],
                            match$2[2]
                          ]
                        ];
                };
                describe("test get all components of gameObject", (function () {
                        describe("getAllDirectionLightComponentsOfGameObject", (function () {
                                return Wonder_jest.test("test", (function () {
                                              var match = _createLightGameObjects(state);
                                              var match$1 = match[1];
                                              var state$1 = SceneAPI$Wonderjs.addSceneChildren(/* array */[
                                                    match$1[1],
                                                    match$1[2],
                                                    match$1[3]
                                                  ], match[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllDirectionLightComponentsOfGameObject(SceneAPI$Wonderjs.getSceneGameObject(state$1), state$1)), /* array */[match[2][1]]);
                                            }));
                              }));
                        describe("getAllPointLightComponentsOfGameObject", (function () {
                                return Wonder_jest.test("test", (function () {
                                              var match = _createLightGameObjects(state);
                                              var match$1 = match[1];
                                              var state$1 = SceneAPI$Wonderjs.addSceneChildren(/* array */[
                                                    match$1[1],
                                                    match$1[2],
                                                    match$1[3]
                                                  ], match[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllPointLightComponentsOfGameObject(SceneAPI$Wonderjs.getSceneGameObject(state$1), state$1)), /* array */[match[2][2]]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test get all components of state", (function () {
                        describe("getAllDirectionLightComponents", (function () {
                                Wonder_jest.test("get all components", (function () {
                                        var match = _createLightGameObjects(state);
                                        var match$1 = match[2];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllDirectionLightComponents(match[0])), /* array */[
                                                    match$1[0],
                                                    match$1[1]
                                                  ]);
                                      }));
                                return Wonder_jest.test("test dispose", (function () {
                                              var match = _createLightGameObjects(state);
                                              var match$1 = match[1];
                                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObject(match$1[2], GameObjectAPI$Wonderjs.disposeGameObject(match$1[1], match[0]));
                                              var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllDirectionLightComponents(state$2)), /* array */[match[2][0]]);
                                            }));
                              }));
                        describe("getAllPointLightComponents", (function () {
                                Wonder_jest.test("get all components", (function () {
                                        var match = _createLightGameObjects(state);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllPointLightComponents(match[0])), /* array */[match[2][2]]);
                                      }));
                                return Wonder_jest.test("test dispose", (function () {
                                              var match = _createLightGameObjects(state);
                                              var match$1 = match[1];
                                              var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match$1[2], GameObjectTool$Wonderjs.disposeGameObject(match$1[1], match[0]));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllPointLightComponents(state$1)), /* array */[]);
                                            }));
                              }));
                        describe("getAllGeometryComponents", (function () {
                                Wonder_jest.test("get all components", (function () {
                                        var match = _createGeometryGameObjects(state);
                                        var match$1 = match[2];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllGeometryComponents(match[0])), /* array */[
                                                    match$1[0],
                                                    match$1[1],
                                                    match$1[2]
                                                  ]);
                                      }));
                                Wonder_jest.test("include the ones not add to gameObject", (function () {
                                        var match = _createGeometryGameObjects(state);
                                        var match$1 = match[2];
                                        var match$2 = GeometryAPI$Wonderjs.createGeometry(match[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllGeometryComponents(match$2[0])), /* array */[
                                                    match$1[0],
                                                    match$1[1],
                                                    match$1[2]
                                                  ]);
                                      }));
                                return Wonder_jest.test("test dispose", (function () {
                                              var match = _createGeometryGameObjects(state);
                                              var match$1 = match[1];
                                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObject(match$1[2], GameObjectAPI$Wonderjs.disposeGameObject(match$1[1], match[0]));
                                              var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllGeometryComponents(state$2)), /* array */[match[2][0]]);
                                            }));
                              }));
                        describe("getAllBasicCameraViewComponents", (function () {
                                Wonder_jest.test("get all components", (function () {
                                        var match = _createCameraGameObjects(state);
                                        var match$1 = match[2];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllBasicCameraViewComponents(match[0])), /* array */[
                                                    match$1[0],
                                                    match$1[1]
                                                  ]);
                                      }));
                                return Wonder_jest.test("test dispose", (function () {
                                              var match = _createCameraGameObjects(state);
                                              var match$1 = match[1];
                                              var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match$1[2], GameObjectTool$Wonderjs.disposeGameObject(match$1[1], match[0]));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllBasicCameraViewComponents(state$1)), /* array */[match[2][0]]);
                                            }));
                              }));
                        describe("getAllPerspectiveCameraProjectionComponents", (function () {
                                Wonder_jest.test("get all components", (function () {
                                        var match = _createCameraGameObjects(state);
                                        var match$1 = match[3];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllPerspectiveCameraProjectionComponents(match[0])), /* array */[
                                                    match$1[0],
                                                    match$1[1]
                                                  ]);
                                      }));
                                return Wonder_jest.test("test dispose", (function () {
                                              var match = _createCameraGameObjects(state);
                                              var match$1 = match[1];
                                              var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match$1[2], GameObjectTool$Wonderjs.disposeGameObject(match$1[1], match[0]));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllPerspectiveCameraProjectionComponents(state$1)), /* array */[match[3][0]]);
                                            }));
                              }));
                        describe("getAllBasicMaterialComponents", (function () {
                                Wonder_jest.test("get all components", (function () {
                                        var match = _createMaterialGameObjects(state);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllBasicMaterialComponents(match[0])), /* array */[match[2][1]]);
                                      }));
                                return Wonder_jest.test("test dispose", (function () {
                                              var match = _createMaterialGameObjects(state);
                                              var match$1 = match[1];
                                              var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match$1[1], GameObjectTool$Wonderjs.disposeGameObject(match$1[0], match[0]));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllBasicMaterialComponents(state$1)), /* array */[]);
                                            }));
                              }));
                        describe("getAllLightMaterialComponents", (function () {
                                Wonder_jest.test("get all components", (function () {
                                        var match = _createMaterialGameObjects(state);
                                        var match$1 = match[2];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllLightMaterialComponents(match[0])), /* array */[
                                                    match$1[0],
                                                    match$1[2]
                                                  ]);
                                      }));
                                return Wonder_jest.test("test dispose", (function () {
                                              var match = _createMaterialGameObjects(state);
                                              var match$1 = match[1];
                                              var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match$1[1], GameObjectTool$Wonderjs.disposeGameObject(match$1[0], match[0]));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllLightMaterialComponents(state$1)), /* array */[match[2][2]]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("unsafeGetGameObjectName", (function () {
                return Wonder_jest.test("if no name, contract error", (function () {
                              TestTool$Wonderjs.openContractCheck(/* () */0);
                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                              var gameObject = match[1];
                              var state$1 = match[0];
                              return Wonder_jest.Expect[/* toThrowMessage */20]("expect data exist", Wonder_jest.Expect[/* expect */0]((function () {
                                                return GameObjectAPI$Wonderjs.unsafeGetGameObjectName(gameObject, state$1);
                                              })));
                            }));
              }));
        describe("setGameObjectName", (function () {
                return Wonder_jest.test("set name", (function () {
                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                              var gameObject = match[1];
                              var name = "gameObject1";
                              var state$1 = GameObjectAPI$Wonderjs.setGameObjectName(gameObject, name, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.unsafeGetGameObjectName(gameObject, state$1)), name);
                            }));
              }));
        describe("removeGameObjectGeometryComponent", (function () {
                var _prepareAndExec = function (state) {
                  var match = BoxGeometryTool$Wonderjs.createGameObject(state);
                  var geometry1 = match[2];
                  var gameObject1 = match[1];
                  var state$1 = GameObjectAPI$Wonderjs.removeGameObjectGeometryComponent(gameObject1, geometry1, match[0]);
                  return /* tuple */[
                          state$1,
                          gameObject1,
                          geometry1
                        ];
                };
                Wonder_jest.test("remove geometry from gameObject", (function () {
                        var match = _prepareAndExec(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectGeometryComponent(match[1], match[0])), false);
                      }));
                return Wonder_jest.test("remove gameObject from geometry", (function () {
                              var match = _prepareAndExec(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryTool$Wonderjs.hasGameObject(match[2], match[0])), false);
                            }));
              }));
        describe("removeGameObjectBasicMaterialComponent", (function () {
                var _prepareAndExec = function (state) {
                  var match = BasicMaterialTool$Wonderjs.createGameObject(state);
                  var material1 = match[2];
                  var gameObject1 = match[1];
                  var state$1 = GameObjectAPI$Wonderjs.removeGameObjectBasicMaterialComponent(gameObject1, material1, match[0]);
                  return /* tuple */[
                          state$1,
                          gameObject1,
                          material1
                        ];
                };
                Wonder_jest.test("remove material from gameObject", (function () {
                        var match = _prepareAndExec(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectBasicMaterialComponent(match[1], match[0])), false);
                      }));
                return Wonder_jest.test("remove gameObject from material", (function () {
                              var match = _prepareAndExec(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialTool$Wonderjs.hasGameObject(match[2], match[0])), false);
                            }));
              }));
        describe("removeGameObjectLightMaterialComponent", (function () {
                var _prepareAndExec = function (state) {
                  var match = LightMaterialTool$Wonderjs.createGameObject(state);
                  var material1 = match[2];
                  var gameObject1 = match[1];
                  var state$1 = GameObjectAPI$Wonderjs.removeGameObjectLightMaterialComponent(gameObject1, material1, match[0]);
                  return /* tuple */[
                          state$1,
                          gameObject1,
                          material1
                        ];
                };
                Wonder_jest.test("remove material from gameObject", (function () {
                        var match = _prepareAndExec(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectLightMaterialComponent(match[1], match[0])), false);
                      }));
                return Wonder_jest.test("remove gameObject from material", (function () {
                              var match = _prepareAndExec(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialTool$Wonderjs.hasGameObject(match[2], match[0])), false);
                            }));
              }));
        describe("dispose", (function () {
                describe("test alive", (function () {
                        Wonder_jest.test("disposed one shouldn't alive before reallocate", (function () {
                                var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                var gameObject = match[1];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObject(gameObject, match[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.isGameObjectAlive(gameObject, state$1)), false);
                              }));
                        return Wonder_jest.test("disposed one shouldn't alive after reallocate", (function () {
                                      var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                      var match = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                      var gameObject1 = match[1];
                                      var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                      var gameObject2 = match$1[1];
                                      var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                                      var gameObject3 = match$2[1];
                                      var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
                                      var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, match$3[0]);
                                      var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$2);
                                      var state$4 = GameObjectTool$Wonderjs.disposeGameObject(gameObject3, state$3);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      GameObjectAPI$Wonderjs.isGameObjectAlive(gameObject1, state$4),
                                                      GameObjectAPI$Wonderjs.isGameObjectAlive(gameObject2, state$4),
                                                      GameObjectAPI$Wonderjs.isGameObjectAlive(gameObject3, state$4),
                                                      GameObjectAPI$Wonderjs.isGameObjectAlive(match$3[1], state$4)
                                                    ]), /* tuple */[
                                                  false,
                                                  false,
                                                  false,
                                                  true
                                                ]);
                                    }));
                      }));
                describe("dispose name map", (function () {
                        return Wonder_jest.test("test", (function () {
                                      TestTool$Wonderjs.openContractCheck(/* () */0);
                                      var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                      var gameObject1 = match[1];
                                      var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                      var state$1 = GameObjectAPI$Wonderjs.setGameObjectName(match$1[1], "a2", GameObjectAPI$Wonderjs.setGameObjectName(gameObject1, "a1", match$1[0]));
                                      var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, state$1);
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect gameObject alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                        return GameObjectAPI$Wonderjs.unsafeGetGameObjectName(gameObject1, state$2);
                                                      })));
                                    }));
                      }));
                describe("dispose all components", (function () {
                        Wonder_jest.test("dispose transform component", (function () {
                                var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                var gameObject1 = match[1];
                                var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                var state$1 = match$1[0];
                                var transform1 = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject1, state$1);
                                var transform2 = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[1], state$1);
                                var state$2 = TransformAPI$Wonderjs.setTransformParent(transform1, transform2, state$1);
                                var state$3 = TransformAPI$Wonderjs.setTransformLocalPosition(transform2, /* tuple */[
                                      2,
                                      3,
                                      4
                                    ], TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                          1,
                                          2,
                                          3
                                        ], state$2));
                                var state$4 = GameObjectAPI$Wonderjs.disposeGameObject(gameObject1, state$3);
                                var state$5 = DisposeJob$Wonderjs.execJob(undefined, state$4);
                                return Wonder_jest.Expect[/* toThrowMessage */20]("expect gameObject alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject1, state$5);
                                                })));
                              }));
                        Wonder_jest.test("dispose meshRenderer component", (function () {
                                var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                var match$1 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(match[0]);
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match[1], match$1[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderArray(state$1)), /* array */[match$1[1]]);
                              }));
                        describe("dispose material component", (function () {
                                Wonder_jest.test("test basic material component", (function () {
                                        var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                        var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                                        var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match[1], match$1[0]);
                                        var match$2 = BasicMaterialTool$Wonderjs.getRecord(state$1);
                                        var disposedIndexArray = match$2[/* disposedIndexArray */9];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        disposedIndexArray.includes(match[2]),
                                                        disposedIndexArray.includes(match$1[2])
                                                      ]), /* tuple */[
                                                    true,
                                                    false
                                                  ]);
                                      }));
                                return Wonder_jest.test("test light material component", (function () {
                                              var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                              var match$1 = LightMaterialTool$Wonderjs.createGameObject(match[0]);
                                              var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match[1], match$1[0]);
                                              var match$2 = LightMaterialTool$Wonderjs.getRecord(state$1);
                                              var disposedIndexArray = match$2[/* disposedIndexArray */14];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              disposedIndexArray.includes(match[2]),
                                                              disposedIndexArray.includes(match$1[2])
                                                            ]), /* tuple */[
                                                          true,
                                                          false
                                                        ]);
                                            }));
                              }));
                        Wonder_jest.test("dispose geometry component", (function () {
                                var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                                var match$1 = GeometryTool$Wonderjs.createGameObject(match[0]);
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match[1], match$1[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                GeometryTool$Wonderjs.isGeometryDisposed(match[2], state$1),
                                                GeometryTool$Wonderjs.isGeometryDisposed(match$1[2], state$1)
                                              ]), /* tuple */[
                                            true,
                                            false
                                          ]);
                              }));
                        describe("dispose light component", (function () {
                                describe("test direction light component", (function () {
                                        return Wonder_jest.test("test dispose one", (function () {
                                                      var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                                      var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match[1], match$1[0]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      DirectionLightTool$Wonderjs.isAlive(match[2], state$1),
                                                                      DirectionLightTool$Wonderjs.isAlive(match$1[2], state$1)
                                                                    ]), /* tuple */[
                                                                  false,
                                                                  true
                                                                ]);
                                                    }));
                                      }));
                                describe("test point light component", (function () {
                                        return Wonder_jest.test("test dispose one", (function () {
                                                      var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                                      var match$1 = PointLightTool$Wonderjs.createGameObject(match[0]);
                                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match[1], match$1[0]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      PointLightTool$Wonderjs.isAlive(match[2], state$1),
                                                                      PointLightTool$Wonderjs.isAlive(match$1[2], state$1)
                                                                    ]), /* tuple */[
                                                                  false,
                                                                  true
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        Wonder_jest.test("dispose basicCameraView component", (function () {
                                var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match[1], match$1[0]);
                                var match$2 = state$1[/* basicCameraViewRecord */13];
                                var disposedIndexArray = match$2[/* disposedIndexArray */3];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                disposedIndexArray.includes(match[3][0]),
                                                disposedIndexArray.includes(match$1[3][0])
                                              ]), /* tuple */[
                                            true,
                                            false
                                          ]);
                              }));
                        Wonder_jest.test("dispose perspectiveCameraProjection component", (function () {
                                var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match[1], match$1[0]);
                                var match$2 = state$1[/* perspectiveCameraProjectionRecord */14];
                                var disposedIndexArray = match$2[/* disposedIndexArray */8];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                disposedIndexArray.includes(match[3][1]),
                                                disposedIndexArray.includes(match$1[3][1])
                                              ]), /* tuple */[
                                            true,
                                            false
                                          ]);
                              }));
                        Wonder_jest.test("dispose arcballCameraController component", (function () {
                                var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state[0]);
                                var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match[1], match$1[0]);
                                var match$2 = state$1[/* arcballCameraControllerRecord */24];
                                var disposedIndexArray = match$2[/* disposedIndexArray */18];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                disposedIndexArray.includes(match[3][0]),
                                                disposedIndexArray.includes(match$1[3][0])
                                              ]), /* tuple */[
                                            true,
                                            false
                                          ]);
                              }));
                        Wonder_jest.test("dispose sourceInstance component", (function () {
                                var match = SourceInstanceTool$Wonderjs.createSourceInstanceGameObject(state[0]);
                                var sourceInstance = match[2];
                                var state$1 = VboBufferTool$Wonderjs.addVboBufferToSourceInstanceBufferMap(sourceInstance, match[0]);
                                var state$2 = GameObjectTool$Wonderjs.disposeGameObject(match[1], state$1);
                                var match$1 = SourceInstanceTool$Wonderjs.getRecord(state$2);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[/* disposedIndexArray */8]), /* array */[sourceInstance]);
                              }));
                        return Wonder_jest.test("dispose objectInstance component", (function () {
                                      var match = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(state[0]);
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match[3], match[0]);
                                      var match$1 = ObjectInstanceTool$Wonderjs.getObjectInstanceRecord(state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[/* disposedIndexArray */2]), /* array */[match[4]]);
                                    }));
                      }));
                describe("replace components", (function () {
                        Wonder_jest.test("replace basic material component", (function () {
                                var match = BasicMaterialTool$Wonderjs.createGameObjectWithMap(state[0]);
                                var gameObject1 = match[1];
                                var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectBasicMaterialComponent(gameObject1, match[2][0], match[0]);
                                var match$1 = BasicMaterialTool$Wonderjs.createMaterialWithMap(state$1);
                                var material2 = match$1[1];
                                var state$2 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject1, material2, match$1[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent(gameObject1, state$2)), material2);
                              }));
                        Wonder_jest.test("replace light material component", (function () {
                                var match = LightMaterialTool$Wonderjs.createGameObjectWithMap(state[0]);
                                var gameObject1 = match[1];
                                var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent(gameObject1, match[2][0], match[0]);
                                var match$1 = LightMaterialTool$Wonderjs.createMaterialWithMap(state$1);
                                var material2 = match$1[1];
                                var state$2 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject1, material2, match$1[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(gameObject1, state$2)), material2);
                              }));
                        return Wonder_jest.test("replace geometry component", (function () {
                                      var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                                      var gameObject1 = match[1];
                                      var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectGeometryComponent(gameObject1, match[2], match[0]);
                                      var match$1 = GeometryAPI$Wonderjs.createGeometry(state$1);
                                      var geometry2 = match$1[1];
                                      var state$2 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject1, geometry2, match$1[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent(gameObject1, state$2)), geometry2);
                                    }));
                      }));
                describe("test reallocate gameObject", (function () {
                        describe("if have dispose too many gameObjects, reallocate gameObject", (function () {
                                describe("reallocate name map", (function () {
                                        return Wonder_jest.test("new nameMap should only has alive data", (function () {
                                                      var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                                      var match = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                                      var gameObject1 = match[1];
                                                      var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                                      var gameObject2 = match$1[1];
                                                      var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                                                      var gameObject3 = match$2[1];
                                                      var name = "a1";
                                                      var state$2 = GameObjectAPI$Wonderjs.setGameObjectName(gameObject3, name, GameObjectAPI$Wonderjs.setGameObjectName(gameObject2, name, GameObjectAPI$Wonderjs.setGameObjectName(gameObject1, name, match$2[0])));
                                                      var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, state$2);
                                                      var state$4 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$3);
                                                      var match$3 = GameObjectTool$Wonderjs.getGameObjectRecord(state$4);
                                                      var nameMap = match$3[/* nameMap */1];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      SparseMapService$WonderCommonlib.has(gameObject1, nameMap),
                                                                      SparseMapService$WonderCommonlib.has(gameObject2, nameMap),
                                                                      SparseMapService$WonderCommonlib.has(gameObject3, nameMap)
                                                                    ]), /* tuple */[
                                                                  false,
                                                                  false,
                                                                  true
                                                                ]);
                                                    }));
                                      }));
                                describe("reallocate component maps", (function () {
                                        Wonder_jest.test("new transformMap should only has alive data", (function () {
                                                var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                                var match = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                                var gameObject1 = match[1];
                                                var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                                var gameObject2 = match$1[1];
                                                var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                                                var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, match$2[0]);
                                                var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$2);
                                                var match$3 = GameObjectTool$Wonderjs.getGameObjectRecord(state$3);
                                                var transformMap = match$3[/* transformMap */24];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                SparseMapService$WonderCommonlib.has(gameObject1, transformMap),
                                                                SparseMapService$WonderCommonlib.has(gameObject2, transformMap),
                                                                SparseMapService$WonderCommonlib.has(match$2[1], transformMap)
                                                              ]), /* tuple */[
                                                            false,
                                                            false,
                                                            true
                                                          ]);
                                              }));
                                        Wonder_jest.test("new meshRendererMap should only has alive data", (function () {
                                                var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                                var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state$1);
                                                var gameObject1 = match[1];
                                                var match$1 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(match[0]);
                                                var gameObject2 = match$1[1];
                                                var match$2 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(match$1[0]);
                                                var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, match$2[0]);
                                                var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$2);
                                                var match$3 = GameObjectTool$Wonderjs.getGameObjectRecord(state$3);
                                                var meshRendererMap = match$3[/* meshRendererMap */28];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                SparseMapService$WonderCommonlib.has(gameObject1, meshRendererMap),
                                                                SparseMapService$WonderCommonlib.has(gameObject2, meshRendererMap),
                                                                SparseMapService$WonderCommonlib.has(match$2[1], meshRendererMap)
                                                              ]), /* tuple */[
                                                            false,
                                                            false,
                                                            true
                                                          ]);
                                              }));
                                        describe("test current component data map", (function () {
                                                return Wonder_jest.test("new geometryMap should only has alive data", (function () {
                                                              var state = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, undefined, /* () */0);
                                                              var state$1 = SettingTool$Wonderjs.setMemory(state, 2, /* () */0);
                                                              var match = BoxGeometryTool$Wonderjs.createGameObject(state$1);
                                                              var gameObject1 = match[1];
                                                              var match$1 = BoxGeometryTool$Wonderjs.createGameObject(match[0]);
                                                              var gameObject2 = match$1[1];
                                                              var match$2 = BoxGeometryTool$Wonderjs.createGameObject(match$1[0]);
                                                              var state$2 = match$2[0];
                                                              var match$3 = GameObjectTool$Wonderjs.getGameObjectRecord(state$2);
                                                              var oldCurrentGeometryDataMap = match$3[/* geometryMap */23];
                                                              var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, state$2);
                                                              var state$4 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$3);
                                                              var match$4 = GameObjectTool$Wonderjs.getGameObjectRecord(state$4);
                                                              var geometryMap = match$4[/* geometryMap */23];
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              ArrayTool$Wonderjs.isArraySame(geometryMap, oldCurrentGeometryDataMap),
                                                                              SparseMapService$WonderCommonlib.has(gameObject1, geometryMap),
                                                                              SparseMapService$WonderCommonlib.has(gameObject2, geometryMap),
                                                                              SparseMapService$WonderCommonlib.has(match$2[1], geometryMap)
                                                                            ]), /* tuple */[
                                                                          false,
                                                                          false,
                                                                          false,
                                                                          true
                                                                        ]);
                                                            }));
                                              }));
                                        describe("test geometry map", (function () {
                                                return Wonder_jest.test("new geometryMap should only has alive data", (function () {
                                                              var state = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, undefined, /* () */0);
                                                              var state$1 = SettingTool$Wonderjs.setMemory(state, 2, /* () */0);
                                                              var match = BoxGeometryTool$Wonderjs.createGameObject(state$1);
                                                              var gameObject1 = match[1];
                                                              var match$1 = BoxGeometryTool$Wonderjs.createGameObject(match[0]);
                                                              var gameObject2 = match$1[1];
                                                              var match$2 = BoxGeometryTool$Wonderjs.createGameObject(match$1[0]);
                                                              var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, match$2[0]);
                                                              var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$2);
                                                              var match$3 = GameObjectTool$Wonderjs.getGameObjectRecord(state$3);
                                                              var geometryMap = match$3[/* geometryMap */23];
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              SparseMapService$WonderCommonlib.has(gameObject1, geometryMap),
                                                                              SparseMapService$WonderCommonlib.has(gameObject2, geometryMap),
                                                                              SparseMapService$WonderCommonlib.has(match$2[1], geometryMap)
                                                                            ]), /* tuple */[
                                                                          false,
                                                                          false,
                                                                          true
                                                                        ]);
                                                            }));
                                              }));
                                        describe("test material map", (function () {
                                                Wonder_jest.test("new basicMaterialMap should only has alive data", (function () {
                                                        var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                                        var match = BasicMaterialTool$Wonderjs.createGameObject(state$1);
                                                        var gameObject1 = match[1];
                                                        var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                                                        var gameObject2 = match$1[1];
                                                        var match$2 = BasicMaterialTool$Wonderjs.createGameObject(match$1[0]);
                                                        var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, match$2[0]);
                                                        var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$2);
                                                        var match$3 = GameObjectTool$Wonderjs.getGameObjectRecord(state$3);
                                                        var basicMaterialMap = match$3[/* basicMaterialMap */29];
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        SparseMapService$WonderCommonlib.has(gameObject1, basicMaterialMap),
                                                                        SparseMapService$WonderCommonlib.has(gameObject2, basicMaterialMap),
                                                                        SparseMapService$WonderCommonlib.has(match$2[1], basicMaterialMap)
                                                                      ]), /* tuple */[
                                                                    false,
                                                                    false,
                                                                    true
                                                                  ]);
                                                      }));
                                                return Wonder_jest.test("new lightMaterialMap should only has alive data", (function () {
                                                              var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                                              var match = LightMaterialTool$Wonderjs.createGameObject(state$1);
                                                              var gameObject1 = match[1];
                                                              var match$1 = LightMaterialTool$Wonderjs.createGameObject(match[0]);
                                                              var gameObject2 = match$1[1];
                                                              var match$2 = LightMaterialTool$Wonderjs.createGameObject(match$1[0]);
                                                              var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, match$2[0]);
                                                              var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$2);
                                                              var match$3 = GameObjectTool$Wonderjs.getGameObjectRecord(state$3);
                                                              var lightMaterialMap = match$3[/* lightMaterialMap */30];
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              SparseMapService$WonderCommonlib.has(gameObject1, lightMaterialMap),
                                                                              SparseMapService$WonderCommonlib.has(gameObject2, lightMaterialMap),
                                                                              SparseMapService$WonderCommonlib.has(match$2[1], lightMaterialMap)
                                                                            ]), /* tuple */[
                                                                          false,
                                                                          false,
                                                                          true
                                                                        ]);
                                                            }));
                                              }));
                                        describe("test light map", (function () {
                                                var _test = function (createGameObjectFunc, getDataMapFunc, state) {
                                                  var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                                  var match = Curry._1(createGameObjectFunc, state$1);
                                                  var gameObject1 = match[1];
                                                  var match$1 = Curry._1(createGameObjectFunc, match[0]);
                                                  var gameObject2 = match$1[1];
                                                  var match$2 = Curry._1(createGameObjectFunc, match$1[0]);
                                                  var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, match$2[0]);
                                                  var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$2);
                                                  var lightMap = Curry._1(getDataMapFunc, GameObjectTool$Wonderjs.getGameObjectRecord(state$3));
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                  SparseMapService$WonderCommonlib.has(gameObject1, lightMap),
                                                                  SparseMapService$WonderCommonlib.has(gameObject2, lightMap),
                                                                  SparseMapService$WonderCommonlib.has(match$2[1], lightMap)
                                                                ]), /* tuple */[
                                                              false,
                                                              false,
                                                              true
                                                            ]);
                                                };
                                                Wonder_jest.test("new directionLightMap should only has alive data", (function () {
                                                        return _test(DirectionLightTool$Wonderjs.createGameObject, (function (param) {
                                                                      return param[/* directionLightMap */33];
                                                                    }), state);
                                                      }));
                                                return Wonder_jest.test("new pointLightMap should only has alive data", (function () {
                                                              return _test(PointLightTool$Wonderjs.createGameObject, (function (param) {
                                                                            return param[/* pointLightMap */34];
                                                                          }), state);
                                                            }));
                                              }));
                                        Wonder_jest.test("new basicCameraViewMap should only has alive data", (function () {
                                                var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                                var match = CameraTool$Wonderjs.createCameraGameObject(state$1);
                                                var gameObject1 = match[1];
                                                var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                                var gameObject2 = match$1[1];
                                                var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                                var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, match$2[0]);
                                                var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$2);
                                                var match$3 = GameObjectTool$Wonderjs.getGameObjectRecord(state$3);
                                                var basicCameraViewMap = match$3[/* basicCameraViewMap */25];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                SparseMapService$WonderCommonlib.has(gameObject1, basicCameraViewMap),
                                                                SparseMapService$WonderCommonlib.has(gameObject2, basicCameraViewMap),
                                                                SparseMapService$WonderCommonlib.has(match$2[1], basicCameraViewMap)
                                                              ]), /* tuple */[
                                                            false,
                                                            false,
                                                            true
                                                          ]);
                                              }));
                                        Wonder_jest.test("new perspectiveCameraProjectionMap should only has alive data", (function () {
                                                var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                                var match = CameraTool$Wonderjs.createCameraGameObject(state$1);
                                                var gameObject1 = match[1];
                                                var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                                var gameObject2 = match$1[1];
                                                var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                                var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, match$2[0]);
                                                var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$2);
                                                var match$3 = GameObjectTool$Wonderjs.getGameObjectRecord(state$3);
                                                var perspectiveCameraProjectionMap = match$3[/* perspectiveCameraProjectionMap */26];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                SparseMapService$WonderCommonlib.has(gameObject1, perspectiveCameraProjectionMap),
                                                                SparseMapService$WonderCommonlib.has(gameObject2, perspectiveCameraProjectionMap),
                                                                SparseMapService$WonderCommonlib.has(match$2[1], perspectiveCameraProjectionMap)
                                                              ]), /* tuple */[
                                                            false,
                                                            false,
                                                            true
                                                          ]);
                                              }));
                                        Wonder_jest.test("new arcballCameraControllerMap should only has alive data", (function () {
                                                var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                                var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state$1);
                                                var gameObject1 = match[1];
                                                var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                                var gameObject2 = match$1[1];
                                                var match$2 = ArcballCameraControllerTool$Wonderjs.createGameObject(match$1[0]);
                                                var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, match$2[0]);
                                                var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$2);
                                                var match$3 = GameObjectTool$Wonderjs.getGameObjectRecord(state$3);
                                                var arcballCameraControllerMap = match$3[/* arcballCameraControllerMap */27];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                SparseMapService$WonderCommonlib.has(gameObject1, arcballCameraControllerMap),
                                                                SparseMapService$WonderCommonlib.has(gameObject2, arcballCameraControllerMap),
                                                                SparseMapService$WonderCommonlib.has(match$2[1], arcballCameraControllerMap)
                                                              ]), /* tuple */[
                                                            false,
                                                            false,
                                                            true
                                                          ]);
                                              }));
                                        Wonder_jest.test("new sourceInstanceMap should only has alive data", (function () {
                                                var state$1 = SettingTool$Wonderjs.setMemory(state[0], 1, /* () */0);
                                                var match = SourceInstanceTool$Wonderjs.createSourceInstanceGameObject(state$1);
                                                var gameObject1 = match[1];
                                                var match$1 = SourceInstanceTool$Wonderjs.createSourceInstanceGameObject(match[0]);
                                                var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, match$1[0]);
                                                var match$2 = GameObjectTool$Wonderjs.getGameObjectRecord(state$2);
                                                var sourceInstanceMap = match$2[/* sourceInstanceMap */31];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                SparseMapService$WonderCommonlib.has(gameObject1, sourceInstanceMap),
                                                                SparseMapService$WonderCommonlib.has(match$1[1], sourceInstanceMap)
                                                              ]), /* tuple */[
                                                            false,
                                                            true
                                                          ]);
                                              }));
                                        return Wonder_jest.test("new objectInstanceMap should only has alive data", (function () {
                                                      var state$1 = SettingTool$Wonderjs.setMemory(state[0], 1, /* () */0);
                                                      var match = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(state$1);
                                                      var objectInstanceGameObject1 = match[3];
                                                      var match$1 = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(match[0]);
                                                      var state$2 = GameObjectTool$Wonderjs.disposeGameObject(objectInstanceGameObject1, match$1[0]);
                                                      var match$2 = GameObjectTool$Wonderjs.getGameObjectRecord(state$2);
                                                      var objectInstanceMap = match$2[/* objectInstanceMap */32];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      SparseMapService$WonderCommonlib.has(objectInstanceGameObject1, objectInstanceMap),
                                                                      SparseMapService$WonderCommonlib.has(match$1[3], objectInstanceMap)
                                                                    ]), /* tuple */[
                                                                  false,
                                                                  true
                                                                ]);
                                                    }));
                                      }));
                                describe("test reallocate twice", (function () {
                                        return Wonder_jest.test("test reallocate component maps", (function () {
                                                      var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                                      var match = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                                      var gameObject1 = match[1];
                                                      var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                                      var gameObject2 = match$1[1];
                                                      var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                                                      var gameObject3 = match$2[1];
                                                      var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
                                                      var gameObject4 = match$3[1];
                                                      var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, match$3[0]);
                                                      var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$2);
                                                      var state$4 = GameObjectTool$Wonderjs.disposeGameObject(gameObject3, state$3);
                                                      var state$5 = GameObjectTool$Wonderjs.disposeGameObject(gameObject4, state$4);
                                                      var match$4 = GameObjectTool$Wonderjs.getGameObjectRecord(state$5);
                                                      var transformMap = match$4[/* transformMap */24];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      SparseMapService$WonderCommonlib.has(gameObject1, transformMap),
                                                                      SparseMapService$WonderCommonlib.has(gameObject2, transformMap),
                                                                      SparseMapService$WonderCommonlib.has(gameObject3, transformMap),
                                                                      SparseMapService$WonderCommonlib.has(gameObject4, transformMap)
                                                                    ]), /* tuple */[
                                                                  false,
                                                                  false,
                                                                  false,
                                                                  false
                                                                ]);
                                                    }));
                                      }));
                                Wonder_jest.test("empty disposedUidMap", (function () {
                                        var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                        var match = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                        var gameObject1 = match[1];
                                        var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                        var gameObject2 = match$1[1];
                                        var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                                        var gameObject3 = match$2[1];
                                        var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, match$2[0]);
                                        var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$2);
                                        var state$4 = GameObjectTool$Wonderjs.disposeGameObject(gameObject3, state$3);
                                        var match$3 = GameObjectTool$Wonderjs.getGameObjectRecord(state$4);
                                        var disposedUidMap = match$3[/* disposedUidMap */3];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        SparseMapService$WonderCommonlib.has(gameObject1, disposedUidMap),
                                                        SparseMapService$WonderCommonlib.has(gameObject2, disposedUidMap),
                                                        SparseMapService$WonderCommonlib.has(gameObject3, disposedUidMap)
                                                      ]), /* tuple */[
                                                    false,
                                                    false,
                                                    true
                                                  ]);
                                      }));
                                return Wonder_jest.test("update aliveUidArray", (function () {
                                              var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                              var match = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                              var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                                              var gameObject3 = match$2[1];
                                              var state$2 = GameObjectTool$Wonderjs.disposeGameObject(match[1], match$2[0]);
                                              var state$3 = GameObjectTool$Wonderjs.disposeGameObject(match$1[1], state$2);
                                              var state$4 = GameObjectTool$Wonderjs.disposeGameObject(gameObject3, state$3);
                                              var match$3 = GameObjectTool$Wonderjs.getGameObjectRecord(state$4);
                                              var aliveUidArray = match$3[/* aliveUidArray */22];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](aliveUidArray), /* array */[
                                                          SceneAPI$Wonderjs.getSceneGameObject(state$4),
                                                          gameObject3
                                                        ]);
                                            }));
                              }));
                        describe("optimize: should only reallocate once in one loop", (function () {
                                Wonder_jest.test("test can correctly reallocate", (function () {
                                        var match = ReallocateGameObjectCPUMemoryTool$Wonderjs.prepareForOptimize(state);
                                        return ReallocateGameObjectCPUMemoryTool$Wonderjs.judgeForOptimize(match[0], match[1], match[2], match[3]);
                                      }));
                                return Wonder_jest.test("test dispose sourceInstance", (function () {
                                              TestTool$Wonderjs.closeContractCheck(/* () */0);
                                              var state$1 = SettingTool$Wonderjs.setMemory(state[0], 1, /* () */0);
                                              var match = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(state$1);
                                              var match$1 = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(match[0]);
                                              var match$2 = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(match$1[0]);
                                              var state$2 = GameObjectTool$Wonderjs.disposeGameObject(match[1], match$2[0]);
                                              var state$3 = GameObjectTool$Wonderjs.disposeGameObject(match$1[1], state$2);
                                              var match$3 = GameObjectTool$Wonderjs.getGameObjectRecord(state$3);
                                              var objectInstanceMap = match$3[/* objectInstanceMap */32];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              SparseMapService$WonderCommonlib.has(match[3], objectInstanceMap),
                                                              SparseMapService$WonderCommonlib.has(match$1[3], objectInstanceMap),
                                                              SparseMapService$WonderCommonlib.has(match$2[3], objectInstanceMap)
                                                            ]), /* tuple */[
                                                          false,
                                                          false,
                                                          true
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("disposeKeepOrder", (function () {
                return Wonder_jest.test("not change its current parent's children order", (function () {
                              return GameObjectTool$Wonderjs.testDisposeKeepOrder(GameObjectAPI$Wonderjs.disposeGameObjectKeepOrder, state);
                            }));
              }));
        describe("disposeGameObjectKeepOrderRemoveGeometry", (function () {
                Wonder_jest.test("not change its current parent's children order", (function () {
                        return GameObjectTool$Wonderjs.testDisposeKeepOrder(GameObjectAPI$Wonderjs.disposeGameObjectKeepOrderRemoveGeometry, state);
                      }));
                return Wonder_jest.test("remove geometry component instead of dispose", (function () {
                              var match = GeometryTool$Wonderjs.createGameObjectAndSetPointData(state[0]);
                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrderRemoveGeometry(match[1], match[0]);
                              var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.getGeometryVertices(match[2], state$2)), match[3][0]);
                            }));
              }));
        describe("disposeGameObjectKeepOrderRemoveMaterial", (function () {
                Wonder_jest.test("not change its current parent's children order", (function () {
                        return GameObjectTool$Wonderjs.testDisposeKeepOrder(GameObjectAPI$Wonderjs.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial, state);
                      }));
                Wonder_jest.test("remove basicMaterial component instead of dispose", (function () {
                        var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                        var basicMaterial1 = match[2];
                        var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(match[1], match[0]);
                        var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        BasicMaterialTool$Wonderjs.hasGameObject(basicMaterial1, state$2),
                                        BasicMaterialAPI$Wonderjs.getBasicMaterialColor(basicMaterial1, state$2)
                                      ]), /* tuple */[
                                    false,
                                    BasicMaterialTool$Wonderjs.getDefaultColor(state$2)
                                  ]);
                      }));
                return Wonder_jest.test("remove lightMaterial component instead of dispose", (function () {
                              var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                              var lightMaterial1 = match[2];
                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(match[1], match[0]);
                              var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              LightMaterialTool$Wonderjs.hasGameObject(lightMaterial1, state$2),
                                              LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(lightMaterial1, state$2)
                                            ]), /* tuple */[
                                          false,
                                          LightMaterialTool$Wonderjs.getDefaultDiffuseColor(state$2)
                                        ]);
                            }));
              }));
        describe("disposeGameObjectDisposeGeometryRemoveMaterial", (function () {
                Wonder_jest.test("gameObject shouldn't be alive", (function () {
                        var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                        var gameObject1 = match[1];
                        var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectDisposeGeometryRemoveMaterial(gameObject1, match[0]);
                        var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$Wonderjs.isAlive(gameObject1, state$2)), false);
                      }));
                Wonder_jest.test("remove lightMaterial component instead of dispose", (function () {
                        var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                        var lightMaterial1 = match[2];
                        var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectDisposeGeometryRemoveMaterial(match[1], match[0]);
                        var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        LightMaterialTool$Wonderjs.hasGameObject(lightMaterial1, state$2),
                                        LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(lightMaterial1, state$2)
                                      ]), /* tuple */[
                                    false,
                                    LightMaterialTool$Wonderjs.getDefaultDiffuseColor(state$2)
                                  ]);
                      }));
                return Wonder_jest.test("dispose geometry component instead of remove", (function () {
                              var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                              var geometry1 = match[2];
                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectDisposeGeometryRemoveMaterial(match[1], match[0]);
                              var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              GeometryTool$Wonderjs.hasGameObject(geometry1, state$2),
                                              GeometryTool$Wonderjs.isGeometryDisposed(geometry1, state$2)
                                            ]), /* tuple */[
                                          false,
                                          true
                                        ]);
                            }));
              }));
        describe("test batchDispose gameObject", (function () {
                describe("test reallocate gameObject", (function () {
                        return Wonder_jest.test("if have dispose too many gameObjects, reallocate gameObject", (function () {
                                      var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                      var match = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                      var gameObject1 = match[1];
                                      var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                      var gameObject2 = match$1[1];
                                      var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                                      var gameObject3 = match$2[1];
                                      var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
                                      var gameObject4 = match$3[1];
                                      var state$2 = GameObjectTool$Wonderjs.batchDisposeGameObject(/* array */[
                                            gameObject1,
                                            gameObject2,
                                            gameObject3,
                                            gameObject4
                                          ], match$3[0]);
                                      var match$4 = GameObjectTool$Wonderjs.getGameObjectRecord(state$2);
                                      var disposeCount = match$4[/* disposeCount */2];
                                      var transformMap = match$4[/* transformMap */24];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      disposeCount,
                                                      SparseMapService$WonderCommonlib.has(gameObject1, transformMap),
                                                      SparseMapService$WonderCommonlib.has(gameObject2, transformMap),
                                                      SparseMapService$WonderCommonlib.has(gameObject3, transformMap),
                                                      SparseMapService$WonderCommonlib.has(gameObject4, transformMap)
                                                    ]), /* tuple */[
                                                  0,
                                                  false,
                                                  false,
                                                  false,
                                                  false
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("initGameObject", (function () {
                describe("init components", (function () {
                        beforeEach((function () {
                                state[0] = InitBasicMaterialJobTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0));
                                return /* () */0;
                              }));
                        Wonder_jest.test("init basic material component", (function () {
                                var match = InitBasicMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                var attachShader = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(attachShader), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                GameObjectAPI$Wonderjs.initGameObject(match[1], state$2);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(attachShader)), 2);
                              }));
                        Wonder_jest.test("init light material component", (function () {
                                var match = InitLightMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                var attachShader = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(attachShader), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                GameObjectAPI$Wonderjs.initGameObject(match[1], state$2);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(attachShader)), 2);
                              }));
                        describe("init maps", (function () {
                                describe("init basic material->map", (function () {
                                        Wonder_jest.test("if has no map, not init map", (function () {
                                                var match = InitBasicMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                                var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                GameObjectAPI$Wonderjs.initGameObject(match[1], state$2);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createTexture)), 0);
                                              }));
                                        return Wonder_jest.test("else, init map", (function () {
                                                      var match = InitBasicMaterialJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                                                      var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                      var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                      GameObjectAPI$Wonderjs.initGameObject(match[1], state$2);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createTexture)), 1);
                                                    }));
                                      }));
                                describe("init light material->map", (function () {
                                        describe("test basic source texture", (function () {
                                                Wonder_jest.test("if has no map, not init map", (function () {
                                                        var match = InitLightMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                                        var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                        var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                        GameObjectAPI$Wonderjs.initGameObject(match[1], state$2);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createTexture)), 0);
                                                      }));
                                                return Wonder_jest.test("else, init map", (function () {
                                                              var match = InitLightMaterialJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                                                              var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                              var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                              GameObjectAPI$Wonderjs.initGameObject(match[1], state$2);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createTexture)), 2);
                                                            }));
                                              }));
                                        describe("test arrayBufferView source texture", (function () {
                                                return Wonder_jest.test("test init map", (function () {
                                                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                                                              var match$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(match[0]);
                                                              var match$2 = InitLightMaterialJobTool$Wonderjs.prepareGameObjectWithMap(sandbox, match[1], match$1[1], match$1[0]);
                                                              var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                                                              var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                              GameObjectAPI$Wonderjs.initGameObject(match$2[1], state$2);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createTexture)), 2);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return Wonder_jest.test("init perspectiveCameraProjection component", (function () {
                                      var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                      var attachShader = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(attachShader), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                      var state$3 = GameObjectAPI$Wonderjs.initGameObject(match[1], state$2);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionTool$Wonderjs.unsafeGetPMatrix(match[3][1], state$3)), new Float32Array(/* array */[
                                                      1.7320507764816284,
                                                      0,
                                                      0,
                                                      0,
                                                      0,
                                                      1.7320507764816284,
                                                      0,
                                                      0,
                                                      0,
                                                      0,
                                                      -1.0002000331878662,
                                                      -1,
                                                      0,
                                                      0,
                                                      -0.20002000033855438,
                                                      0
                                                    ]));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("contract check: is alive", (function () {
                describe("if gameObject is disposed", (function () {
                        var _testTwoParamFunc = function (func) {
                          var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                          var gameObject = match[1];
                          var state$1 = GameObjectTool$Wonderjs.disposeGameObject(gameObject, match[0]);
                          return Wonder_jest.Expect[/* toThrowMessage */20]("expect gameObject alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                            return Curry._2(func, gameObject, state$1);
                                          })));
                        };
                        var _testThreeParmFunc = function (func) {
                          var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                          var gameObject = match[1];
                          var state$1 = GameObjectTool$Wonderjs.disposeGameObject(gameObject, match[0]);
                          return Wonder_jest.Expect[/* toThrowMessage */20]("expect gameObject alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                            return Curry._3(func, gameObject, 1, state$1);
                                          })));
                        };
                        Wonder_jest.test("unsafeGetGameObjectTransformComponent should error", (function () {
                                return _testTwoParamFunc(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent);
                              }));
                        Wonder_jest.test("unsafeGetGameObjectBasicMaterialComponent should error", (function () {
                                return _testTwoParamFunc(GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent);
                              }));
                        Wonder_jest.test("unsafeGetGameObjectLightMaterialComponent should error", (function () {
                                return _testTwoParamFunc(GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent);
                              }));
                        Wonder_jest.test("unsafeGetGameObjectMeshRendererComponent should error", (function () {
                                return _testTwoParamFunc(GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent);
                              }));
                        Wonder_jest.test("unsafeGetGeometryComponent should error", (function () {
                                return _testTwoParamFunc(GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent);
                              }));
                        Wonder_jest.test("unsafeGetGameObjectBasicCameraViewComponent should error", (function () {
                                return _testTwoParamFunc(GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent);
                              }));
                        Wonder_jest.test("disposeGameObject should error", (function () {
                                return _testTwoParamFunc(GameObjectAPI$Wonderjs.disposeGameObject);
                              }));
                        Wonder_jest.test("batchDisposeGameObject should error", (function () {
                                var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                var gameObject = match[1];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObject(gameObject, match[0]);
                                return Wonder_jest.Expect[/* toThrowMessage */20]("expect gameObject alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                  return GameObjectAPI$Wonderjs.batchDisposeGameObject(/* array */[gameObject], state$1);
                                                })));
                              }));
                        Wonder_jest.test("initGameObject should error", (function () {
                                return _testTwoParamFunc(GameObjectAPI$Wonderjs.initGameObject);
                              }));
                        Wonder_jest.test("hasGameObjectGeometryComponent should error", (function () {
                                return _testTwoParamFunc(GameObjectAPI$Wonderjs.hasGameObjectGeometryComponent);
                              }));
                        Wonder_jest.test("addGameObjectTransformComponent should error", (function () {
                                return _testThreeParmFunc(GameObjectAPI$Wonderjs.addGameObjectTransformComponent);
                              }));
                        Wonder_jest.test("disposeGameObjectTransformComponent should error", (function () {
                                var func = GameObjectAPI$Wonderjs.disposeGameObjectTransformComponent;
                                var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                var gameObject = match[1];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObject(gameObject, match[0]);
                                return Wonder_jest.Expect[/* toThrowMessage */20]("expect gameObject alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                  return Curry._4(func, gameObject, 1, 2, state$1);
                                                })));
                              }));
                        Wonder_jest.test("addGameObjectBasicCameraViewComponent should error", (function () {
                                return _testThreeParmFunc(GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent);
                              }));
                        Wonder_jest.test("disposeGameObjectBasicCameraViewComponent should error", (function () {
                                return _testThreeParmFunc(GameObjectAPI$Wonderjs.disposeGameObjectBasicCameraViewComponent);
                              }));
                        Wonder_jest.test("addGameObjectBasicMaterialComponent should error", (function () {
                                return _testThreeParmFunc(GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent);
                              }));
                        Wonder_jest.test("disposeGameObjectBasicMaterialComponent should error", (function () {
                                return _testThreeParmFunc(GameObjectAPI$Wonderjs.disposeGameObjectBasicMaterialComponent);
                              }));
                        Wonder_jest.test("addGameObjectLightMaterialComponent should error", (function () {
                                return _testThreeParmFunc(GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent);
                              }));
                        Wonder_jest.test("disposeGameObjectLightMaterialComponent should error", (function () {
                                return _testThreeParmFunc(GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent);
                              }));
                        Wonder_jest.test("addGameObjectMeshRendererComponent should error", (function () {
                                return _testThreeParmFunc(GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent);
                              }));
                        Wonder_jest.test("disposeGameObjectMeshRendererComponent should error", (function () {
                                return _testThreeParmFunc(GameObjectAPI$Wonderjs.disposeGameObjectMeshRendererComponent);
                              }));
                        Wonder_jest.test("addGameObjectGeometryComponent should error", (function () {
                                return _testThreeParmFunc(GameObjectAPI$Wonderjs.addGameObjectGeometryComponent);
                              }));
                        Wonder_jest.test("addGameObjectGeometryComponent should error", (function () {
                                return _testThreeParmFunc(GameObjectAPI$Wonderjs.addGameObjectGeometryComponent);
                              }));
                        return Wonder_jest.test("disposeGameObjectGeometryComponentshould error", (function () {
                                      return _testThreeParmFunc(GameObjectAPI$Wonderjs.disposeGameObjectGeometryComponent);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
