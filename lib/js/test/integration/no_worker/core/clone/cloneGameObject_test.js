'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var CloneTool$Wonderjs = require("../../tool/core/CloneTool.js");
var CameraTool$Wonderjs = require("../../../../tool/service/camera/CameraTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var TransformAPI$Wonderjs = require("../../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var PointLightAPI$Wonderjs = require("../../../../../src/api/light/PointLightAPI.js");
var TypeArrayTool$Wonderjs = require("../../../../tool/service/primitive/TypeArrayTool.js");
var BoxGeometryAPI$Wonderjs = require("../../../../../src/api/geometry/BoxGeometryAPI.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var PointLightTool$Wonderjs = require("../../../../tool/service/light/PointLightTool.js");
var Vector3Service$Wonderjs = require("../../../../../src/service/atom/Vector3Service.js");
var AllMaterialTool$Wonderjs = require("../../../../tool/service/material/AllMaterialTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../tool/service/geometry/BoxGeometryTool.js");
var BasicMaterialAPI$Wonderjs = require("../../../../../src/api/material/BasicMaterialAPI.js");
var LightMaterialAPI$Wonderjs = require("../../../../../src/api/material/LightMaterialAPI.js");
var MeshRendererTool$Wonderjs = require("../../../../tool/service/meshRenderer/MeshRendererTool.js");
var BasicMaterialTool$Wonderjs = require("../../../../tool/service/material/BasicMaterialTool.js");
var CustomGeometryAPI$Wonderjs = require("../../../../../src/api/geometry/CustomGeometryAPI.js");
var DirectionLightAPI$Wonderjs = require("../../../../../src/api/light/DirectionLightAPI.js");
var LightMaterialTool$Wonderjs = require("../../../../tool/service/material/LightMaterialTool.js");
var BasicCameraViewAPI$Wonderjs = require("../../../../../src/api/BasicCameraViewAPI.js");
var CustomGeometryTool$Wonderjs = require("../../../../tool/service/geometry/CustomGeometryTool.js");
var DirectionLightTool$Wonderjs = require("../../../../tool/service/light/DirectionLightTool.js");
var ObjectInstanceTool$Wonderjs = require("../../../../tool/service/instance/ObjectInstanceTool.js");
var SourceInstanceTool$Wonderjs = require("../../../../tool/service/instance/SourceInstanceTool.js");
var ArcballCameraControllerAPI$Wonderjs = require("../../../../../src/api/camera_controller/ArcballCameraControllerAPI.js");
var ArcballCameraControllerTool$Wonderjs = require("../../../../tool/service/camera_controller/ArcballCameraControllerTool.js");
var PerspectiveCameraProjectionAPI$Wonderjs = require("../../../../../src/api/PerspectiveCameraProjectionAPI.js");
var RecordBasicMaterialMainService$Wonderjs = require("../../../../../src/service/state/main/material/basic/RecordBasicMaterialMainService.js");

describe("clone gameObject", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _cloneGameObject = function (gameObject, count, state) {
          return CloneTool$Wonderjs.cloneGameObject(gameObject, count, false, state);
        };
        var _getClonedTransformMatrixDataArr = function (gameObject, count, state) {
          var match = _cloneGameObject(gameObject, count, state);
          var clonedGameObjectArr = match[1];
          var state$1 = match[0];
          return /* tuple */[
                  CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                  CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                          return GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(clonedGameObject, state$1);
                        }))
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.test("clone gameObject", (function () {
                var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                var match$1 = _cloneGameObject(match[1], 2, match[0]);
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1]), /* array */[/* array */[
                              2,
                              3
                            ]]);
              }));
        describe("clone components", (function () {
                describe("contract check", (function () {
                        Wonder_jest.test("shouldn't clone sourceInstance gameObject", (function () {
                                var match = SourceInstanceTool$Wonderjs.createSourceInstanceGameObject(state[0]);
                                var gameObject = match[1];
                                var state$1 = match[0];
                                return Wonder_jest.Expect[/* toThrowMessage */20]("expect not clone sourceInstance gameObject, but actual do", Wonder_jest.Expect[/* expect */0]((function () {
                                                  _cloneGameObject(gameObject, 2, state$1);
                                                  return /* () */0;
                                                })));
                              }));
                        return Wonder_jest.test("shouldn't clone objectInstance gameObject", (function () {
                                      var match = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(state[0]);
                                      var objectInstanceGameObject = match[3];
                                      var state$1 = match[0];
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect not clone objectInstance gameObject, but actual do", Wonder_jest.Expect[/* expect */0]((function () {
                                                        _cloneGameObject(objectInstanceGameObject, 2, state$1);
                                                        return /* () */0;
                                                      })));
                                    }));
                      }));
                describe("test clone meshRenderer component", (function () {
                        Wonder_jest.test("test clone specific count", (function () {
                                var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                var match$1 = _cloneGameObject(match[1], 2, match[0]);
                                var state$1 = match$1[0];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](CloneTool$Wonderjs.getFlattenClonedGameObjectArr(match$1[1]).map((function (clonedGameObject) {
                                                      return GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent(clonedGameObject, state$1);
                                                    })).length), 2);
                              }));
                        return Wonder_jest.test("add cloned gameObject to renderGameObjectArray", (function () {
                                      var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                      var gameObject1 = match[1];
                                      var match$1 = _cloneGameObject(gameObject1, 2, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderArray(match$1[0])), /* array */[gameObject1].concat(CloneTool$Wonderjs.getFlattenClonedGameObjectArr(match$1[1])));
                                    }));
                      }));
                describe("test clone light component", (function () {
                        describe("test clone direction light component", (function () {
                                var _clone = function (gameObject, state) {
                                  var match = _cloneGameObject(gameObject, 2, state);
                                  var clonedGameObjectArr = match[1];
                                  var state$1 = match[0];
                                  return /* tuple */[
                                          state$1,
                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectDirectionLightComponent(clonedGameObject, state$1);
                                                }))
                                        ];
                                };
                                Wonder_jest.test("test clone specific count", (function () {
                                        var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                        var match$1 = _clone(match[1], match[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[2].length), 2);
                                      }));
                                describe("set cloned record", (function () {
                                        Wonder_jest.test("set color", (function () {
                                                var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                                var color1 = /* array */[
                                                  1,
                                                  0,
                                                  1
                                                ];
                                                var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightColor(match[2], color1, match[0]);
                                                var match$1 = _clone(match[1], state$1);
                                                var clonedComponentArr = match$1[2];
                                                var state$2 = match$1[0];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                DirectionLightAPI$Wonderjs.getDirectionLightColor(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                DirectionLightAPI$Wonderjs.getDirectionLightColor(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                              ]), /* tuple */[
                                                            color1,
                                                            color1
                                                          ]);
                                              }));
                                        return Wonder_jest.test("set intensity", (function () {
                                                      var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                                      var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(match[2], 2, match[0]);
                                                      var match$1 = _clone(match[1], state$1);
                                                      var clonedComponentArr = match$1[2];
                                                      var state$2 = match$1[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      DirectionLightAPI$Wonderjs.getDirectionLightIntensity(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                      DirectionLightAPI$Wonderjs.getDirectionLightIntensity(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                                    ]), /* tuple */[
                                                                  2,
                                                                  2
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test clone point light component", (function () {
                                var _clone = function (gameObject, state) {
                                  var match = _cloneGameObject(gameObject, 2, state);
                                  var clonedGameObjectArr = match[1];
                                  var state$1 = match[0];
                                  return /* tuple */[
                                          state$1,
                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectPointLightComponent(clonedGameObject, state$1);
                                                }))
                                        ];
                                };
                                Wonder_jest.test("test clone specific count", (function () {
                                        var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                        var match$1 = _clone(match[1], match[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[2].length), 2);
                                      }));
                                describe("set cloned record", (function () {
                                        Wonder_jest.test("set color", (function () {
                                                var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                                var color1 = /* array */[
                                                  1,
                                                  0,
                                                  1
                                                ];
                                                var state$1 = PointLightAPI$Wonderjs.setPointLightColor(match[2], color1, match[0]);
                                                var match$1 = _clone(match[1], state$1);
                                                var clonedComponentArr = match$1[2];
                                                var state$2 = match$1[0];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                PointLightAPI$Wonderjs.getPointLightColor(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                PointLightAPI$Wonderjs.getPointLightColor(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                              ]), /* tuple */[
                                                            color1,
                                                            color1
                                                          ]);
                                              }));
                                        Wonder_jest.test("set intensity", (function () {
                                                var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                                var state$1 = PointLightAPI$Wonderjs.setPointLightIntensity(match[2], 2, match[0]);
                                                var match$1 = _clone(match[1], state$1);
                                                var clonedComponentArr = match$1[2];
                                                var state$2 = match$1[0];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                PointLightAPI$Wonderjs.getPointLightIntensity(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                PointLightAPI$Wonderjs.getPointLightIntensity(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                              ]), /* tuple */[
                                                            2,
                                                            2
                                                          ]);
                                              }));
                                        Wonder_jest.test("set constant", (function () {
                                                var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                                var state$1 = PointLightAPI$Wonderjs.setPointLightConstant(match[2], 2, match[0]);
                                                var match$1 = _clone(match[1], state$1);
                                                var clonedComponentArr = match$1[2];
                                                var state$2 = match$1[0];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                PointLightAPI$Wonderjs.getPointLightConstant(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                PointLightAPI$Wonderjs.getPointLightConstant(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                              ]), /* tuple */[
                                                            2,
                                                            2
                                                          ]);
                                              }));
                                        Wonder_jest.test("set linear", (function () {
                                                var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                                var state$1 = PointLightAPI$Wonderjs.setPointLightLinear(match[2], 2, match[0]);
                                                var match$1 = _clone(match[1], state$1);
                                                var clonedComponentArr = match$1[2];
                                                var state$2 = match$1[0];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                PointLightAPI$Wonderjs.getPointLightLinear(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                PointLightAPI$Wonderjs.getPointLightLinear(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                              ]), /* tuple */[
                                                            2,
                                                            2
                                                          ]);
                                              }));
                                        Wonder_jest.test("set quadratic", (function () {
                                                var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                                var state$1 = PointLightAPI$Wonderjs.setPointLightQuadratic(match[2], 2, match[0]);
                                                var match$1 = _clone(match[1], state$1);
                                                var clonedComponentArr = match$1[2];
                                                var state$2 = match$1[0];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                PointLightAPI$Wonderjs.getPointLightQuadratic(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                PointLightAPI$Wonderjs.getPointLightQuadratic(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                              ]), /* tuple */[
                                                            2,
                                                            2
                                                          ]);
                                              }));
                                        return Wonder_jest.test("set range", (function () {
                                                      var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                                      var state$1 = PointLightAPI$Wonderjs.setPointLightRange(match[2], 2, match[0]);
                                                      var match$1 = _clone(match[1], state$1);
                                                      var clonedComponentArr = match$1[2];
                                                      var state$2 = match$1[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      PointLightAPI$Wonderjs.getPointLightRange(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                      PointLightAPI$Wonderjs.getPointLightRange(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                                    ]), /* tuple */[
                                                                  2,
                                                                  2
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test clone geometry component", (function () {
                        describe("test clone shared geometry", (function () {
                                describe("test clone box geometry component", (function () {
                                        var _createAndInitGameObject = function (state) {
                                          var match = BoxGeometryTool$Wonderjs.createGameObject(state);
                                          var gameObject1 = match[1];
                                          var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]);
                                          return /* tuple */[
                                                  state$1,
                                                  gameObject1,
                                                  match[2]
                                                ];
                                        };
                                        var _prepare = function (state) {
                                          var match = _createAndInitGameObject(state);
                                          return CloneTool$Wonderjs.cloneWithBoxGeometry(match[0], match[1], match[2], 2);
                                        };
                                        Wonder_jest.test("test clone specific count of customGeometrys", (function () {
                                                var match = _prepare(state[0]);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].length), 2);
                                              }));
                                        Wonder_jest.test("cloned one == source one", (function () {
                                                var match = _prepare(state[0]);
                                                var geometry = match[2];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4]), /* array */[
                                                            geometry,
                                                            geometry
                                                          ]);
                                              }));
                                        return Wonder_jest.test("cloned one's gameObject ===  the last gameObject which add the geometry", (function () {
                                                      var match = _prepare(state[0]);
                                                      var clonedGeometryArr = match[4];
                                                      var clonedGameObjectArr = match[3];
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      BoxGeometryAPI$Wonderjs.unsafeGetBoxGeometryGameObject(Caml_array.caml_array_get(clonedGeometryArr, 0), state$1),
                                                                      BoxGeometryAPI$Wonderjs.unsafeGetBoxGeometryGameObject(Caml_array.caml_array_get(clonedGeometryArr, 1), state$1)
                                                                    ]), /* tuple */[
                                                                  Caml_array.caml_array_get(clonedGameObjectArr, 1),
                                                                  Caml_array.caml_array_get(clonedGameObjectArr, 1)
                                                                ]);
                                                    }));
                                      }));
                                describe("test clone custom geometry component", (function () {
                                        var _createAndInitGameObject = function (state) {
                                          var match = CustomGeometryTool$Wonderjs.createGameObject(state);
                                          var gameObject1 = match[1];
                                          var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]);
                                          return /* tuple */[
                                                  state$1,
                                                  gameObject1,
                                                  match[2]
                                                ];
                                        };
                                        var _prepare = function (state) {
                                          var match = _createAndInitGameObject(state);
                                          return CloneTool$Wonderjs.cloneWithCustomGeometry(match[0], match[1], match[2], 2);
                                        };
                                        Wonder_jest.test("test clone specific count of customGeometrys", (function () {
                                                var match = _prepare(state[0]);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].length), 2);
                                              }));
                                        Wonder_jest.test("cloned one == source one", (function () {
                                                var match = _prepare(state[0]);
                                                var geometry = match[2];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4]), /* array */[
                                                            geometry,
                                                            geometry
                                                          ]);
                                              }));
                                        return Wonder_jest.test("cloned one's gameObject ===  the last gameObject which add the geometry", (function () {
                                                      var match = _prepare(state[0]);
                                                      var clonedGeometryArr = match[4];
                                                      var clonedGameObjectArr = match[3];
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      CustomGeometryAPI$Wonderjs.unsafeGetCustomGeometryGameObject(Caml_array.caml_array_get(clonedGeometryArr, 0), state$1),
                                                                      CustomGeometryAPI$Wonderjs.unsafeGetCustomGeometryGameObject(Caml_array.caml_array_get(clonedGeometryArr, 1), state$1)
                                                                    ]), /* tuple */[
                                                                  Caml_array.caml_array_get(clonedGameObjectArr, 1),
                                                                  Caml_array.caml_array_get(clonedGameObjectArr, 1)
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test clone material component", (function () {
                        describe("test clone basic material component", (function () {
                                var _cloneGameObject = function (gameObject, isShareMaterial, count, state) {
                                  return CloneTool$Wonderjs.cloneGameObject(gameObject, count, isShareMaterial, state);
                                };
                                var _prepare = function (isShareMaterial) {
                                  var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                  var material1 = match[2];
                                  var gameObject1 = match[1];
                                  var state$1 = BasicMaterialTool$Wonderjs.setShaderIndex(material1, 1, match[0]);
                                  var match$1 = _cloneGameObject(gameObject1, isShareMaterial, 2, state$1);
                                  var clonedGameObjectArr = match$1[1];
                                  var state$2 = match$1[0];
                                  return /* tuple */[
                                          state$2,
                                          gameObject1,
                                          material1,
                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent(clonedGameObject, state$2);
                                                }))
                                        ];
                                };
                                describe("test clone shared material", (function () {
                                        Wonder_jest.test("cloned one== source one", (function () {
                                                var match = _prepare(true);
                                                var material = match[2];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4]), /* array */[
                                                            material,
                                                            material
                                                          ]);
                                              }));
                                        Wonder_jest.test("cloned one's gameObject ===  the last gameObject which add the material", (function () {
                                                var match = _prepare(true);
                                                var clonedMaterialArr = match[4];
                                                var clonedGameObjectArr = match[3];
                                                var state = match[0];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObject(Caml_array.caml_array_get(clonedMaterialArr, 0), state),
                                                                BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObject(Caml_array.caml_array_get(clonedMaterialArr, 1), state)
                                                              ]), /* tuple */[
                                                            Caml_array.caml_array_get(clonedGameObjectArr, 1),
                                                            Caml_array.caml_array_get(clonedGameObjectArr, 1)
                                                          ]);
                                              }));
                                        return Wonder_jest.test("increase group count", (function () {
                                                      var match = _prepare(true);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialTool$Wonderjs.getGroupCount(match[2], match[0])), 2);
                                                    }));
                                      }));
                                describe("test clone not shared material", (function () {
                                        Wonder_jest.test("cloned ones are new created ones", (function () {
                                                var match = _prepare(false);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4]), /* array */[
                                                            1,
                                                            2
                                                          ]);
                                              }));
                                        Wonder_jest.test("add cloned one's gameObject to map", (function () {
                                                var match = _prepare(false);
                                                var clonedMaterialArr = match[4];
                                                var clonedGameObjectArr = match[3];
                                                var state = match[0];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObject(Caml_array.caml_array_get(clonedMaterialArr, 0), state),
                                                                BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObject(Caml_array.caml_array_get(clonedMaterialArr, 1), state)
                                                              ]), /* tuple */[
                                                            Caml_array.caml_array_get(clonedGameObjectArr, 0),
                                                            Caml_array.caml_array_get(clonedGameObjectArr, 1)
                                                          ]);
                                              }));
                                        Wonder_jest.test("not change group count", (function () {
                                                var match = _prepare(false);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialTool$Wonderjs.getGroupCount(match[2], match[0])), 0);
                                              }));
                                        describe("cloned one' data === source one's data", (function () {
                                                var _prepare = function () {
                                                  var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                                  return /* tuple */[
                                                          match[0],
                                                          match[1],
                                                          match[2]
                                                        ];
                                                };
                                                var _clone = function (gameObject, state) {
                                                  var match = _cloneGameObject(gameObject, false, 2, state);
                                                  var clonedGameObjectArr = match[1];
                                                  var state$1 = match[0];
                                                  return /* tuple */[
                                                          state$1,
                                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent(clonedGameObject, state$1);
                                                                }))
                                                        ];
                                                };
                                                Wonder_jest.test("test color", (function () {
                                                        var match = _prepare(/* () */0);
                                                        var material = match[2];
                                                        var color = /* array */[
                                                          1,
                                                          0.2,
                                                          0.3
                                                        ];
                                                        var state = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, match[0]);
                                                        var match$1 = _clone(match[1], state);
                                                        var clonedMaterialArr = match$1[2];
                                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                        var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        TypeArrayTool$Wonderjs.truncateArray(BasicMaterialAPI$Wonderjs.getBasicMaterialColor(material, state$2)),
                                                                        TypeArrayTool$Wonderjs.truncateArray(BasicMaterialAPI$Wonderjs.getBasicMaterialColor(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2)),
                                                                        TypeArrayTool$Wonderjs.truncateArray(BasicMaterialAPI$Wonderjs.getBasicMaterialColor(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2))
                                                                      ]), /* tuple */[
                                                                    color,
                                                                    color,
                                                                    color
                                                                  ]);
                                                      }));
                                                return Wonder_jest.test("test map", (function () {
                                                              var match = BasicMaterialTool$Wonderjs.createGameObjectWithMap(state[0]);
                                                              var match$1 = match[2];
                                                              var map = match$1[1];
                                                              var match$2 = _clone(match[1], match[0]);
                                                              var clonedMaterialArr = match$2[2];
                                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                                                              var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialMap(match$1[0], state$2),
                                                                              BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialMap(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2),
                                                                              BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialMap(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2)
                                                                            ]), /* tuple */[
                                                                          map,
                                                                          map,
                                                                          map
                                                                        ]);
                                                            }));
                                              }));
                                        describe("test init cloned material", (function () {
                                                return Wonder_jest.test("can correctly set cloned one's shader index", (function () {
                                                              var match = _prepare(false);
                                                              var clonedMaterialArr = match[4];
                                                              var clonedGameObjectArr = match[3];
                                                              var state = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                              var state$1 = AllMaterialTool$Wonderjs.prepareForInit(state);
                                                              var state$2 = GameObjectAPI$Wonderjs.initGameObject(Caml_array.caml_array_get(clonedGameObjectArr, 1), GameObjectAPI$Wonderjs.initGameObject(Caml_array.caml_array_get(clonedGameObjectArr, 0), state$1));
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              BasicMaterialTool$Wonderjs.getShaderIndex(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2),
                                                                              BasicMaterialTool$Wonderjs.getShaderIndex(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2)
                                                                            ]), /* tuple */[
                                                                          1,
                                                                          1
                                                                        ]);
                                                            }));
                                              }));
                                        describe("fix bug", (function () {
                                                return Wonder_jest.test("basicMaterialRecord.index should be correct after clone", (function () {
                                                              var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                                              var match$1 = _cloneGameObject(match[1], false, 2, match[0]);
                                                              var match$2 = RecordBasicMaterialMainService$Wonderjs.getRecord(match$1[0]);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* == */0], Wonder_jest.Expect[/* expect */0](match$2[/* index */0]), 3);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("test clone light material component", (function () {
                                var _cloneGameObject = function (gameObject, isShareMaterial, count, state) {
                                  return CloneTool$Wonderjs.cloneGameObject(gameObject, count, isShareMaterial, state);
                                };
                                var _prepare = function (isShareMaterial) {
                                  var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                  var material1 = match[2];
                                  var gameObject1 = match[1];
                                  var state$1 = LightMaterialTool$Wonderjs.setShaderIndex(material1, 1, match[0]);
                                  var match$1 = _cloneGameObject(gameObject1, isShareMaterial, 2, state$1);
                                  var clonedGameObjectArr = match$1[1];
                                  var state$2 = match$1[0];
                                  return /* tuple */[
                                          state$2,
                                          gameObject1,
                                          material1,
                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(clonedGameObject, state$2);
                                                }))
                                        ];
                                };
                                describe("test clone shared material", (function () {
                                        return Wonder_jest.test("cloned one === source one", (function () {
                                                      var match = _prepare(true);
                                                      var material = match[2];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4]), /* array */[
                                                                  material,
                                                                  material
                                                                ]);
                                                    }));
                                      }));
                                describe("test clone not shared material", (function () {
                                        Wonder_jest.test("cloned ones are new created ones", (function () {
                                                var match = _prepare(false);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4]), /* array */[
                                                            1,
                                                            2
                                                          ]);
                                              }));
                                        describe("cloned one' data === source one's data", (function () {
                                                var _prepare = function () {
                                                  var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                                  return /* tuple */[
                                                          match[0],
                                                          match[1],
                                                          match[2]
                                                        ];
                                                };
                                                var _clone = function (gameObject, state) {
                                                  var match = _cloneGameObject(gameObject, false, 2, state);
                                                  var clonedGameObjectArr = match[1];
                                                  var state$1 = match[0];
                                                  return /* tuple */[
                                                          state$1,
                                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(clonedGameObject, state$1);
                                                                }))
                                                        ];
                                                };
                                                Wonder_jest.test("test diffuse color", (function () {
                                                        var match = _prepare(/* () */0);
                                                        var color = /* array */[
                                                          1,
                                                          0.2,
                                                          0.3
                                                        ];
                                                        var state = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(match[2], color, match[0]);
                                                        var match$1 = _clone(match[1], state);
                                                        var clonedMaterialArr = match$1[2];
                                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                        var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2)),
                                                                        TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2))
                                                                      ]), /* tuple */[
                                                                    color,
                                                                    color
                                                                  ]);
                                                      }));
                                                Wonder_jest.test("test specular color", (function () {
                                                        var match = _prepare(/* () */0);
                                                        var color = /* array */[
                                                          1,
                                                          0.2,
                                                          0.3
                                                        ];
                                                        var state = LightMaterialAPI$Wonderjs.setLightMaterialSpecularColor(match[2], color, match[0]);
                                                        var match$1 = _clone(match[1], state);
                                                        var clonedMaterialArr = match$1[2];
                                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                        var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2)),
                                                                        TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2))
                                                                      ]), /* tuple */[
                                                                    color,
                                                                    color
                                                                  ]);
                                                      }));
                                                Wonder_jest.test("test shininess", (function () {
                                                        var match = _prepare(/* () */0);
                                                        var state = LightMaterialAPI$Wonderjs.setLightMaterialShininess(match[2], 28.5, match[0]);
                                                        var match$1 = _clone(match[1], state);
                                                        var clonedMaterialArr = match$1[2];
                                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                        var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        LightMaterialAPI$Wonderjs.getLightMaterialShininess(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2),
                                                                        LightMaterialAPI$Wonderjs.getLightMaterialShininess(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2)
                                                                      ]), /* tuple */[
                                                                    28.5,
                                                                    28.5
                                                                  ]);
                                                      }));
                                                return Wonder_jest.test("test diffuse map + specular map", (function () {
                                                              var match = LightMaterialTool$Wonderjs.createGameObjectWithMap(state[0]);
                                                              var match$1 = match[2];
                                                              var match$2 = match$1[1];
                                                              var map2 = match$2[1];
                                                              var map1 = match$2[0];
                                                              var material = match$1[0];
                                                              var match$3 = _clone(match[1], match[0]);
                                                              var clonedMaterialArr = match$3[2];
                                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$3[0]);
                                                              var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(material, state$2),
                                                                              LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2),
                                                                              LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2),
                                                                              LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(material, state$2),
                                                                              LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2),
                                                                              LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2)
                                                                            ]), /* tuple */[
                                                                          map1,
                                                                          map1,
                                                                          map1,
                                                                          map2,
                                                                          map2,
                                                                          map2
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test clone transform component", (function () {
                        var _prepare = function () {
                          var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                          var gameObject1 = match[1];
                          var state$1 = match[0];
                          var match$1 = _getClonedTransformMatrixDataArr(gameObject1, 2, state$1);
                          return /* tuple */[
                                  state$1,
                                  gameObject1,
                                  match[2],
                                  match$1[0],
                                  match$1[1]
                                ];
                        };
                        Wonder_jest.test("test clone specific count of transforms", (function () {
                                var match = _prepare(/* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].length), 2);
                              }));
                        describe("set cloned transform's localPosition by source transform's localPosition", (function () {
                                Wonder_jest.test("test", (function () {
                                        var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                        var pos1 = /* tuple */[
                                          1,
                                          2,
                                          3
                                        ];
                                        var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[2], pos1, match[0]);
                                        var match$1 = _getClonedTransformMatrixDataArr(match[1], 2, state$1);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1].map((function (transform) {
                                                              return TransformAPI$Wonderjs.getTransformLocalPosition(transform, state$1);
                                                            }))), /* array */[
                                                    pos1,
                                                    pos1
                                                  ]);
                                      }));
                                describe("fix bug", (function () {
                                        return Wonder_jest.test("source transform,cloned transforms shouldn't affect each other", (function () {
                                                      var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                                      var transform1 = match[2];
                                                      var pos1 = /* tuple */[
                                                        1,
                                                        2,
                                                        3
                                                      ];
                                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, pos1, match[0]);
                                                      var match$1 = _getClonedTransformMatrixDataArr(match[1], 2, state$1);
                                                      var clonedTransformArr = match$1[1];
                                                      var pos2 = /* tuple */[
                                                        2,
                                                        4,
                                                        6
                                                      ];
                                                      var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(Caml_array.caml_array_get(clonedTransformArr, 1), pos2, state$1);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      TransformAPI$Wonderjs.getTransformLocalPosition(transform1, state$2),
                                                                      clonedTransformArr.map((function (transform) {
                                                                              return TransformAPI$Wonderjs.getTransformLocalPosition(transform, state$2);
                                                                            }))
                                                                    ]), /* tuple */[
                                                                  pos1,
                                                                  /* array */[
                                                                    pos1,
                                                                    pos2
                                                                  ]
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("set cloned transform's localRotation by source transform's localRotation", (function () {
                                return Wonder_jest.test("test", (function () {
                                              var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                              var rotation1 = /* tuple */[
                                                1,
                                                2,
                                                3,
                                                1
                                              ];
                                              var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(match[2], rotation1, match[0]);
                                              var match$1 = _getClonedTransformMatrixDataArr(match[1], 2, state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1].map((function (transform) {
                                                                    return TransformAPI$Wonderjs.getTransformLocalRotation(transform, state$1);
                                                                  }))), /* array */[
                                                          rotation1,
                                                          rotation1
                                                        ]);
                                            }));
                              }));
                        describe("set cloned transform's localScale by source transform's localScale", (function () {
                                return Wonder_jest.test("test", (function () {
                                              var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                              var scale1 = /* tuple */[
                                                1,
                                                2,
                                                3
                                              ];
                                              var state$1 = TransformAPI$Wonderjs.setTransformLocalScale(match[2], scale1, match[0]);
                                              var match$1 = _getClonedTransformMatrixDataArr(match[1], 2, state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1].map((function (transform) {
                                                                    return TransformAPI$Wonderjs.getTransformLocalScale(transform, state$1);
                                                                  }))), /* array */[
                                                          scale1,
                                                          scale1
                                                        ]);
                                            }));
                              }));
                        return Wonder_jest.test("add cloned transform's gameObject to map", (function () {
                                      var match = _prepare(/* () */0);
                                      var clonedTransformArr = match[4];
                                      var clonedGameObjectArr = match[3];
                                      var state = match[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      TransformAPI$Wonderjs.unsafeGetTransformGameObject(Caml_array.caml_array_get(clonedTransformArr, 0), state),
                                                      TransformAPI$Wonderjs.unsafeGetTransformGameObject(Caml_array.caml_array_get(clonedTransformArr, 1), state)
                                                    ]), /* tuple */[
                                                  Caml_array.caml_array_get(clonedGameObjectArr, 0),
                                                  Caml_array.caml_array_get(clonedGameObjectArr, 1)
                                                ]);
                                    }));
                      }));
                describe("test clone basicCameraView component", (function () {
                        var _prepare = function (state) {
                          var match = BasicCameraViewAPI$Wonderjs.createBasicCameraView(state);
                          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                          var gameObject1 = match$1[1];
                          var match$2 = _cloneGameObject(gameObject1, 2, match$1[0]);
                          var clonedGameObjectArr = match$2[1];
                          var state$1 = match$2[0];
                          return /* tuple */[
                                  state$1,
                                  gameObject1,
                                  match$1[3][0],
                                  clonedGameObjectArr,
                                  CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                          return GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent(clonedGameObject, state$1);
                                        }))
                                ];
                        };
                        return Wonder_jest.test("test clone specific count of basicCameraViews", (function () {
                                      var match = _prepare(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].length), 2);
                                    }));
                      }));
                describe("test clone perspectiveCameraProjection component", (function () {
                        var _prepare = function (state) {
                          var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state);
                          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                          var gameObject1 = match$1[1];
                          var match$2 = _cloneGameObject(gameObject1, 2, match$1[0]);
                          var clonedGameObjectArr = match$2[1];
                          var state$1 = match$2[0];
                          return /* tuple */[
                                  state$1,
                                  gameObject1,
                                  match$1[3][1],
                                  clonedGameObjectArr,
                                  CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                          return GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent(clonedGameObject, state$1);
                                        }))
                                ];
                        };
                        Wonder_jest.test("test clone specific count of perspectiveCameraProjections", (function () {
                                var match = _prepare(state[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].length), 2);
                              }));
                        Wonder_jest.test("set cloned perspectiveCameraProjection's near by source one's near", (function () {
                                var match = _prepare(state[0]);
                                var state$1 = match[0];
                                var sourceNear = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraNear(match[2], state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].map((function (perspectiveCameraProjection) {
                                                      return PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraNear(perspectiveCameraProjection, state$1);
                                                    }))), /* array */[
                                            sourceNear,
                                            sourceNear
                                          ]);
                              }));
                        Wonder_jest.test("set cloned perspectiveCameraProjection's far by source one's far", (function () {
                                var match = _prepare(state[0]);
                                var state$1 = match[0];
                                var sourceFar = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFar(match[2], state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].map((function (perspectiveCameraProjection) {
                                                      return PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFar(perspectiveCameraProjection, state$1);
                                                    }))), /* array */[
                                            sourceFar,
                                            sourceFar
                                          ]);
                              }));
                        Wonder_jest.test("set cloned perspectiveCameraProjection's fovy by source one's fovy", (function () {
                                var match = _prepare(state[0]);
                                var state$1 = match[0];
                                var sourceFovy = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFovy(match[2], state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].map((function (perspectiveCameraProjection) {
                                                      return PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFovy(perspectiveCameraProjection, state$1);
                                                    }))), /* array */[
                                            sourceFovy,
                                            sourceFovy
                                          ]);
                              }));
                        return Wonder_jest.test("set cloned perspectiveCameraProjection's aspect by source one's aspect", (function () {
                                      var match = _prepare(state[0]);
                                      var state$1 = match[0];
                                      var sourceAspect = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraAspect(match[2], state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].map((function (perspectiveCameraProjection) {
                                                            return PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraAspect(perspectiveCameraProjection, state$1);
                                                          }))), /* array */[
                                                  sourceAspect,
                                                  sourceAspect
                                                ]);
                                    }));
                      }));
                describe("test clone cameraController component", (function () {
                        var _prepare = function (state) {
                          var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state);
                          var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                          var cameraController1 = match$1[3][0];
                          var gameObject1 = match$1[1];
                          var state$1 = match$1[0];
                          ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance(cameraController1, 2.2, state$1);
                          var match$2 = _cloneGameObject(gameObject1, 2, state$1);
                          var clonedGameObjectArr = match$2[1];
                          var state$2 = match$2[0];
                          return /* tuple */[
                                  state$2,
                                  gameObject1,
                                  cameraController1,
                                  clonedGameObjectArr,
                                  CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                          return GameObjectAPI$Wonderjs.unsafeGetGameObjectArcballCameraControllerComponent(clonedGameObject, state$2);
                                        })),
                                  2.2
                                ];
                        };
                        Wonder_jest.test("test clone specific count of cameraControllers", (function () {
                                var match = _prepare(state[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].length), 2);
                              }));
                        return Wonder_jest.test("set cloned cameraController's distance by source one's distance", (function () {
                                      var match = _prepare(state[0]);
                                      var distance = match[5];
                                      var state$1 = match[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].map((function (cameraController) {
                                                            return ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state$1);
                                                          }))), /* array */[
                                                  distance,
                                                  distance
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("clone children", (function () {
                describe("test clone gameObject", (function () {
                        return Wonder_jest.test("get all cloned gameObjects(include cloned children)", (function () {
                                      var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                      var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                                      var state$1 = TransformAPI$Wonderjs.setTransformParent(match[2], match$1[2], match$1[0]);
                                      var match$2 = _cloneGameObject(match[1], 2, state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$2[1]), /* array */[
                                                  /* array */[
                                                    3,
                                                    4
                                                  ],
                                                  /* array */[
                                                    5,
                                                    6
                                                  ]
                                                ]);
                                    }));
                      }));
                describe("cloned children's components", (function () {
                        Wonder_jest.test("test clone meshRenderer component", (function () {
                                var _createMeshRendererGameObject = function (state) {
                                  var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state);
                                  var gameObject1 = match[1];
                                  var state$1 = match[0];
                                  return /* tuple */[
                                          state$1,
                                          gameObject1,
                                          match[2],
                                          GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject1, state$1)
                                        ];
                                };
                                var match = _createMeshRendererGameObject(state[0]);
                                var match$1 = _createMeshRendererGameObject(match[0]);
                                var state$1 = TransformAPI$Wonderjs.setTransformParent(match[3], match$1[3], match$1[0]);
                                var match$2 = _cloneGameObject(match[1], 2, state$1);
                                var state$2 = match$2[0];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](CloneTool$Wonderjs.getFlattenClonedGameObjectArr(match$2[1]).map((function (clonedGameObject) {
                                                      return GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent(clonedGameObject, state$2);
                                                    })).length), 4);
                              }));
                        describe("test clone transform component", (function () {
                                var _prepare = function () {
                                  var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                  var transform1 = match[2];
                                  var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                                  var transform2 = match$1[2];
                                  var match$2 = GameObjectTool$Wonderjs.createGameObject(match$1[0]);
                                  var transform3 = match$2[2];
                                  var match$3 = GameObjectTool$Wonderjs.createGameObject(match$2[0]);
                                  var transform4 = match$3[2];
                                  var state$1 = TransformAPI$Wonderjs.setTransformParent(transform3, transform4, TransformAPI$Wonderjs.setTransformParent(transform1, transform3, TransformAPI$Wonderjs.setTransformParent(transform1, transform2, match$3[0])));
                                  return /* tuple */[
                                          state$1,
                                          match[1],
                                          transform1,
                                          match$1[1],
                                          transform2,
                                          match$2[1],
                                          transform3,
                                          match$3[1],
                                          transform4
                                        ];
                                };
                                Wonder_jest.test("set parent", (function () {
                                        var match = _prepare(/* () */0);
                                        var state = match[0];
                                        var match$1 = _getClonedTransformMatrixDataArr(match[1], 2, state);
                                        var clonedTransformArr = match$1[1];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        TransformAPI$Wonderjs.unsafeGetTransformParent(Caml_array.caml_array_get(clonedTransformArr, 0), state),
                                                        TransformAPI$Wonderjs.unsafeGetTransformParent(Caml_array.caml_array_get(clonedTransformArr, 1), state),
                                                        TransformAPI$Wonderjs.unsafeGetTransformParent(Caml_array.caml_array_get(clonedTransformArr, 2), state),
                                                        TransformAPI$Wonderjs.unsafeGetTransformParent(Caml_array.caml_array_get(clonedTransformArr, 3), state),
                                                        TransformAPI$Wonderjs.unsafeGetTransformParent(Caml_array.caml_array_get(clonedTransformArr, 4), state),
                                                        TransformAPI$Wonderjs.unsafeGetTransformParent(Caml_array.caml_array_get(clonedTransformArr, 5), state),
                                                        TransformAPI$Wonderjs.unsafeGetTransformParent(Caml_array.caml_array_get(clonedTransformArr, 6), state),
                                                        TransformAPI$Wonderjs.unsafeGetTransformParent(Caml_array.caml_array_get(clonedTransformArr, 7), state)
                                                      ]), /* tuple */[
                                                    undefined,
                                                    undefined,
                                                    Caml_array.caml_array_get(clonedTransformArr, 0),
                                                    Caml_array.caml_array_get(clonedTransformArr, 1),
                                                    Caml_array.caml_array_get(clonedTransformArr, 0),
                                                    Caml_array.caml_array_get(clonedTransformArr, 1),
                                                    Caml_array.caml_array_get(clonedTransformArr, 4),
                                                    Caml_array.caml_array_get(clonedTransformArr, 5)
                                                  ]);
                                      }));
                                return Wonder_jest.test("test set cloned transform's localPosition by corresponding source transform's localPosition", (function () {
                                              var match = _prepare(/* () */0);
                                              var pos1 = /* tuple */[
                                                1,
                                                2,
                                                3
                                              ];
                                              var pos2 = /* tuple */[
                                                2,
                                                2,
                                                3
                                              ];
                                              var pos3 = /* tuple */[
                                                3,
                                                20,
                                                3
                                              ];
                                              var pos4 = /* tuple */[
                                                4,
                                                2,
                                                3
                                              ];
                                              var state = TransformAPI$Wonderjs.setTransformLocalPosition(match[2], pos1, match[0]);
                                              var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[4], pos2, state);
                                              var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(match[6], pos3, state$1);
                                              var state$3 = TransformAPI$Wonderjs.setTransformLocalPosition(match[8], pos4, state$2);
                                              var match$1 = _getClonedTransformMatrixDataArr(match[1], 1, state$3);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1].map((function (transform) {
                                                                    return TransformAPI$Wonderjs.getTransformPosition(transform, state$3);
                                                                  }))), /* array */[
                                                          pos1,
                                                          Vector3Service$Wonderjs.add(/* Float */0, pos1, pos2),
                                                          Vector3Service$Wonderjs.add(/* Float */0, pos1, pos3),
                                                          Vector3Service$Wonderjs.add(/* Float */0, Vector3Service$Wonderjs.add(/* Float */0, pos1, pos3), pos4)
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
