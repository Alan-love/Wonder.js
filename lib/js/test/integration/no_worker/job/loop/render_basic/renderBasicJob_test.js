'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var SinonTool$Wonderjs = require("../../../tool/sinon/SinonTool.js");
var CameraTool$Wonderjs = require("../../../../../tool/service/camera/CameraTool.js");
var FakeGlTool$Wonderjs = require("../../../../../tool/gl/FakeGlTool.js");
var DirectorTool$Wonderjs = require("../../../../../tool/core/DirectorTool.js");
var GeometryTool$Wonderjs = require("../../../../../tool/service/geometry/GeometryTool.js");
var TransformAPI$Wonderjs = require("../../../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var TransformTool$Wonderjs = require("../../../../../tool/service/transform/TransformTool.js");
var BoxGeometryAPI$Wonderjs = require("../../../../../../src/api/geometry/BoxGeometryAPI.js");
var GLSLSenderTool$Wonderjs = require("../../../../../tool/service/sender/GLSLSenderTool.js");
var RenderJobsTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../../tool/service/geometry/BoxGeometryTool.js");
var BasicMaterialAPI$Wonderjs = require("../../../../../../src/api/material/BasicMaterialAPI.js");
var GLSLLocationTool$Wonderjs = require("../../../../../tool/service/location/GLSLLocationTool.js");
var BasicMaterialTool$Wonderjs = require("../../../../../tool/service/material/BasicMaterialTool.js");
var LoopRenderJobTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/LoopRenderJobTool.js");
var SourceTextureTool$Wonderjs = require("../../../../../tool/service/texture/SourceTextureTool.js");
var RenderBasicJobTool$Wonderjs = require("../../../../../tool/job/render_basic/RenderBasicJobTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../../src/api/texture/BasicSourceTextureAPI.js");
var BasicSourceTextureTool$Wonderjs = require("../../../../../tool/service/texture/BasicSourceTextureTool.js");
var CreateRenderStateMainService$Wonderjs = require("../../../../../../src/service/state/main/render/CreateRenderStateMainService.js");
var ArrayBufferViewSourceTextureAPI$Wonderjs = require("../../../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js");
var PerspectiveCameraProjectionTool$Wonderjs = require("../../../../../tool/service/camera/PerspectiveCameraProjectionTool.js");
var ArrayBufferViewSourceTextureTool$Wonderjs = require("../../../../../tool/service/texture/ArrayBufferViewSourceTextureTool.js");
var RenderBasicForNoWorkerAndWorkerJobTool$Wonderjs = require("../../../../tool/job/RenderBasicForNoWorkerAndWorkerJobTool.js");

describe("test render basic job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("use program", (function () {
                var _prepare = RenderBasicForNoWorkerAndWorkerJobTool$Wonderjs.prepareForUseProgramCase;
                Wonder_jest.test("test use", (function () {
                        var match = RenderJobsTool$Wonderjs.prepareForUseProgramCase(sandbox, _prepare, state[0]);
                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                        return Sinon.toCalledWith(/* array */[match[1]], Wonder_jest.Expect[/* expect */0](match[2]));
                      }));
                return Wonder_jest.test("if the program is already used, not use again", (function () {
                              var match = RenderJobsTool$Wonderjs.prepareForUseProgramCase(sandbox, _prepare, state[0]);
                              var state$1 = RenderJobsTool$Wonderjs.init(match[0]);
                              var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                              DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(match[2])), 1);
                            }));
              }));
        describe("send attribute data", (function () {
                var _prepare = function (sandbox, state) {
                  var match = RenderBasicJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state);
                  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
                };
                describe("init vbo buffers when first send", (function () {
                        var _prepare = function (sandbox, state) {
                          var match = RenderBasicJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state);
                          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                          return /* tuple */[
                                  match$1[0],
                                  match[2]
                                ];
                        };
                        var _prepareForBufferData = function (state, getBoxGeometryPointsFunc) {
                          var match = _prepare(sandbox, state[0]);
                          var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                          var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                          var points = Curry._1(getBoxGeometryPointsFunc, state$2);
                          return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, points, 2, bufferData)));
                        };
                        Wonder_jest.test("create buffer", (function () {
                                var match = _prepare(sandbox, state[0]);
                                var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), 3);
                              }));
                        describe("init vertex buffer", (function () {
                                Wonder_jest.test("bufferData", (function () {
                                        return _prepareForBufferData(state, BoxGeometryAPI$Wonderjs.getBoxGeometryVertices);
                                      }));
                                return Wonder_jest.test("bind buffer and unbind buffer", (function () {
                                              var match = _prepare(sandbox, state[0]);
                                              var createBuffer = Sinon.returns(10, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                              var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bindBuffer), undefined, Js_primitive.some(createBuffer), Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              Sinon.calledBefore(Sinon.withTwoArgs(1, 10, bindBuffer), bufferData),
                                                              Sinon.calledAfter(Sinon.withTwoArgs(1, null, bindBuffer), bufferData)
                                                            ]), /* tuple */[
                                                          true,
                                                          true
                                                        ]);
                                            }));
                              }));
                        describe("init texCoord buffer", (function () {
                                return Wonder_jest.test("bufferData", (function () {
                                              return _prepareForBufferData(state, BoxGeometryAPI$Wonderjs.getBoxGeometryTexCoords);
                                            }));
                              }));
                        describe("init index buffer", (function () {
                                Wonder_jest.test("bufferData", (function () {
                                        var match = _prepare(sandbox, state[0]);
                                        var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                        var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                        var indices = BoxGeometryAPI$Wonderjs.getBoxGeometryIndices(state$2);
                                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, indices, 2, bufferData)));
                                      }));
                                return Wonder_jest.test("bind buffer and unbind buffer", (function () {
                                              var match = _prepare(sandbox, state[0]);
                                              var createBuffer = Sinon.returns(10, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                              var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 5, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bindBuffer), undefined, Js_primitive.some(createBuffer), Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              Sinon.calledBefore(Sinon.withTwoArgs(5, 10, bindBuffer), bufferData),
                                                              Sinon.calledAfter(Sinon.withTwoArgs(5, null, bindBuffer), Sinon.withOneArg(5, bufferData))
                                                            ]), /* tuple */[
                                                          true,
                                                          true
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("send buffer", (function () {
                        describe("optimize", (function () {
                                var _prepare = function (sandbox, state) {
                                  var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
                                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                  return /* tuple */[
                                          match$1[0],
                                          match[2]
                                        ];
                                };
                                Wonder_jest.test("if lastSendGeometryData === geometryIndex, not send", (function () {
                                        var match = _prepare(sandbox, state[0]);
                                        var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObjectWithSharedGeometry(sandbox, match[1], match[0]);
                                        var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                        var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                        DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(vertexAttribPointer)), 1);
                                      }));
                                return Wonder_jest.test("else, send", (function () {
                                              var match = _prepare(sandbox, state[0]);
                                              var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                              var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                              var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                              DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(vertexAttribPointer)), 2);
                                            }));
                              }));
                        describe("send a_position", (function () {
                                Wonder_jest.test("bind array buffer", (function () {
                                        var state$1 = _prepare(sandbox, state[0]);
                                        var createBuffer = Sinon.returns(10, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                        var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bindBuffer), undefined, Js_primitive.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                        return Sinon.toCalledWith(/* array */[
                                                    1,
                                                    10
                                                  ], Wonder_jest.Expect[/* expect */0](bindBuffer));
                                      }));
                                Wonder_jest.test("attach buffer to attribute", (function () {
                                        var state$1 = _prepare(sandbox, state[0]);
                                        var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, "a_position");
                                        var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                        return Sinon.toCalledWith(/* array */[
                                                    0,
                                                    3,
                                                    1,
                                                    false,
                                                    0,
                                                    0
                                                  ], Wonder_jest.Expect[/* expect */0](vertexAttribPointer));
                                      }));
                                describe("enable attribute", (function () {
                                        Wonder_jest.test("if already enabled since use this program, not enable", (function () {
                                                var state$1 = _prepare(sandbox, state[0]);
                                                var enableVertexAttribArray = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, "a_position");
                                                var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(enableVertexAttribArray), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                                var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                DirectorTool$Wonderjs.runWithDefaultTime(state$4);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(0, enableVertexAttribArray))), 1);
                                              }));
                                        return Wonder_jest.test("else, enable", (function () {
                                                      var state$1 = _prepare(sandbox, state[0]);
                                                      var enableVertexAttribArray = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, "a_position");
                                                      var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(enableVertexAttribArray), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                      var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                                      var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                      var state$5 = GLSLSenderTool$Wonderjs.clearLastSendGeometry(GLSLSenderTool$Wonderjs.disableVertexAttribArray(state$4));
                                                      DirectorTool$Wonderjs.runWithDefaultTime(state$5);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(0, enableVertexAttribArray))), 2);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("send a_texCoord", (function () {
                                return Wonder_jest.test("attach buffer to attribute", (function () {
                                              var state$1 = _prepare(sandbox, state[0]);
                                              var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, "a_texCoord");
                                              var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                              return Sinon.toCalledWith(/* array */[
                                                          0,
                                                          2,
                                                          1,
                                                          false,
                                                          0,
                                                          0
                                                        ], Wonder_jest.Expect[/* expect */0](vertexAttribPointer));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("send uniform data", (function () {
                var testSendShaderUniformMatrix4DataOnlyOnce = function (name, prepareSendUinformDataFunc) {
                  return RenderJobsTool$Wonderjs.testSendShaderUniformMatrix4DataOnlyOnce(sandbox, name, /* tuple */[
                              prepareSendUinformDataFunc,
                              RenderBasicJobTool$Wonderjs.prepareGameObject
                            ], state);
                };
                GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendMatrix4 */1](sandbox, "u_mMatrix", (function (gameObjectTransform, _, _$1, state) {
                        return TransformAPI$Wonderjs.setTransformLocalPosition(gameObjectTransform, /* tuple */[
                                    1,
                                    2,
                                    3
                                  ], state);
                      }), new Float32Array(/* array */[
                          1,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          1,
                          2,
                          3,
                          1
                        ]), RenderBasicJobTool$Wonderjs.prepareGameObject, (function (prepareSendUniformData) {
                        Wonder_jest.test("if not do any transform operation, should still send identity matrix value on the first send", (function () {
                                var match = Curry._3(prepareSendUniformData, sandbox, RenderBasicJobTool$Wonderjs.prepareGameObject, state[0]);
                                var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_mMatrix");
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Sinon.toCalledWith(/* array */[
                                            0,
                                            false,
                                            TransformTool$Wonderjs.getDefaultLocalToWorldMatrixTypeArray(state$2)
                                          ], Wonder_jest.Expect[/* expect */0](uniformMatrix4fv));
                              }));
                        describe("test two gameObjects", (function () {
                                return Wonder_jest.test("if only set first one's transform, second one's sended u_mMatrix data shouldn't be affect", (function () {
                                              var match = Curry._3(prepareSendUniformData, sandbox, RenderBasicJobTool$Wonderjs.prepareGameObject, state[0]);
                                              var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                              var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[2][0], /* tuple */[
                                                    1,
                                                    2,
                                                    3
                                                  ], match$1[0]);
                                              var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_mMatrix");
                                              var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                              var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                              return Sinon.toCalledWith(/* array */[
                                                          0,
                                                          false,
                                                          TransformTool$Wonderjs.getDefaultLocalToWorldMatrixTypeArray(state$3)
                                                        ], Wonder_jest.Expect[/* expect */0](Sinon.getCall(1, Sinon.withOneArg(0, uniformMatrix4fv))));
                                            }));
                              }));
                        return /* () */0;
                      }), /* () */0);
                GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendMatrix4 */1](sandbox, "u_vMatrix", (function (_, cameraTransform, _$1, state) {
                        return TransformAPI$Wonderjs.setTransformLocalPosition(cameraTransform, /* tuple */[
                                    10,
                                    2,
                                    3
                                  ], state);
                      }), new Float32Array(/* array */[
                          1,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          -10,
                          -2,
                          -3,
                          1
                        ]), RenderBasicJobTool$Wonderjs.prepareGameObject, (function (prepareSendUniformData) {
                        return testSendShaderUniformMatrix4DataOnlyOnce("u_vMatrix", prepareSendUniformData);
                      }), /* () */0);
                GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendMatrix4 */1](sandbox, "u_pMatrix", (function (_, _$1, _$2, state) {
                        return state;
                      }), PerspectiveCameraProjectionTool$Wonderjs.getPMatrixOfCreateBasicCameraViewPerspectiveCamera(/* () */0), RenderBasicJobTool$Wonderjs.prepareGameObject, (function (prepareSendUniformData) {
                        return testSendShaderUniformMatrix4DataOnlyOnce("u_pMatrix", prepareSendUniformData);
                      }), /* () */0);
                GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendVector3 */4](sandbox, "u_color", (function (_, param, _$1, state) {
                        return BasicMaterialAPI$Wonderjs.setBasicMaterialColor(param[1], /* array */[
                                    0,
                                    1,
                                    0.2
                                  ], state);
                      }), /* :: */[
                      0,
                      /* :: */[
                        1,
                        /* :: */[
                          0.20000000298023224,
                          /* [] */0
                        ]
                      ]
                    ], RenderBasicJobTool$Wonderjs.prepareGameObject, (function (prepareSendUniformData) {
                        describe("test two gameObjects", (function () {
                                return Wonder_jest.test("if only set first one's color, second one's sended u_color record shouldn't be affect", (function () {
                                              var match = Curry._3(prepareSendUniformData, sandbox, RenderBasicJobTool$Wonderjs.prepareGameObject, state[0]);
                                              var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                              var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(match[2][1], /* array */[
                                                    0,
                                                    1,
                                                    0.2
                                                  ], match$1[0]);
                                              var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_color");
                                              var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getArgs(Sinon.getCall(1, Sinon.withOneArg(0, uniform3f)))), /* :: */[
                                                          0,
                                                          /* :: */[
                                                            1,
                                                            /* :: */[
                                                              1,
                                                              /* :: */[
                                                                1,
                                                                /* [] */0
                                                              ]
                                                            ]
                                                          ]
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }), /* () */0);
                describe("test with map", (function () {
                        describe("send u_mapSampler and u_color", (function () {
                                var _prepare = function (state) {
                                  var match = RenderBasicJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state);
                                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                  var uniform1i = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                  var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                  var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_mapSampler");
                                  var getUniformLocation$1 = GLSLLocationTool$Wonderjs.stubLocation(getUniformLocation, 1, sandbox, "u_color");
                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation$1), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform1i), undefined, Js_primitive.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                  return /* tuple */[
                                          state$1,
                                          /* tuple */[
                                            0,
                                            1
                                          ],
                                          /* tuple */[
                                            uniform1i,
                                            uniform3f
                                          ]
                                        ];
                                };
                                Wonder_jest.test("if cached, not send", (function () {
                                        var match = _prepare(state[0]);
                                        var match$1 = match[2];
                                        var match$2 = match[1];
                                        var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                        DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        Sinon.getCallCount(Sinon.withTwoArgs(match$2[0], 0, match$1[0])),
                                                        Sinon.getCallCount(Sinon.withOneArg(match$2[1], match$1[1]))
                                                      ]), /* tuple */[
                                                    1,
                                                    1
                                                  ]);
                                      }));
                                return Wonder_jest.test("else, send", (function () {
                                              var match = _prepare(state[0]);
                                              var match$1 = match[2];
                                              var match$2 = match[1];
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              Sinon.getCallCount(Sinon.withTwoArgs(match$2[0], 0, match$1[0])),
                                                              Sinon.getCallCount(Sinon.withFourArgs(match$2[1], 1, 1, 1, match$1[1]))
                                                            ]), /* tuple */[
                                                          1,
                                                          1
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("bind map", (function () {
                describe("test basic source texture", (function () {
                        Wonder_jest.test("if not has map, not bind", (function () {
                                var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](bindTexture)));
                              }));
                        describe("else", (function () {
                                var _prepare = function (state) {
                                  var match = RenderBasicJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state);
                                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                  var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                  Sinon.returns(11, Sinon.onCall(0, createTexture));
                                  var activeTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                  var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 8, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createTexture), Js_primitive.some(activeTexture), Js_primitive.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                  return /* tuple */[
                                          state$1,
                                          /* tuple */[
                                            8,
                                            11
                                          ],
                                          /* tuple */[
                                            activeTexture,
                                            bindTexture
                                          ]
                                        ];
                                };
                                Wonder_jest.test("if texture of the specific unit is cached, not bind and active it again", (function () {
                                        var match = _prepare(state[0]);
                                        var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                        DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[2][0]));
                                      }));
                                describe("else", (function () {
                                        Wonder_jest.test("active texture unit 0", (function () {
                                                var match = _prepare(state[0]);
                                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                                return Sinon.toCalledWith(/* array */[0], Wonder_jest.Expect[/* expect */0](match[2][0]));
                                              }));
                                        return Wonder_jest.test("bind gl texture to TEXTURE_2D target", (function () {
                                                      var match = _prepare(state[0]);
                                                      var match$1 = match[1];
                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                                      return Sinon.toCalledWith(/* array */[
                                                                  match$1[0],
                                                                  match$1[1]
                                                                ], Wonder_jest.Expect[/* expect */0](match[2][1]));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test arrayBufferView source texture", (function () {
                        var _prepare = function (state) {
                          var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
                          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                          var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          Sinon.returns(11, Sinon.onCall(0, createTexture));
                          Sinon.returns(12, Sinon.onCall(1, createTexture));
                          var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 8, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createTexture), undefined, Js_primitive.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                          return /* tuple */[
                                  state$1,
                                  /* tuple */[
                                    8,
                                    11,
                                    12
                                  ],
                                  match[3],
                                  bindTexture
                                ];
                        };
                        Wonder_jest.test("if has map, bind", (function () {
                                var match = _prepare(state[0]);
                                var match$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(match[0]);
                                var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(match[2], match$1[1], match$1[0]);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[3]));
                              }));
                        return Wonder_jest.test("if has basic source map and arrayBufferView source map, bind the latest setted map", (function () {
                                      var match = _prepare(state[0]);
                                      var bindTexture = match[3];
                                      var material = match[2];
                                      var match$1 = match[1];
                                      var match$2 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                                      var match$3 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(match$2[0]);
                                      var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material, match$2[1], match$3[0]);
                                      var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                      var state$3 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material, match$3[1], state$2);
                                      DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      Sinon.getCallCount(bindTexture),
                                                      SinonTool$Wonderjs.calledWithArg2(Sinon.getCall(1, bindTexture), match$1[0], match$1[2])
                                                    ]), /* tuple */[
                                                  2,
                                                  true
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("update map", (function () {
                describe("test basic source texture", (function () {
                        var _prepare = function (state, $staropt$star, $staropt$star$1, _) {
                          var width = $staropt$star !== undefined ? $staropt$star : 2;
                          var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 4;
                          var match = RenderBasicJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state);
                          var map = match[5];
                          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                          var source = BasicSourceTextureTool$Wonderjs.buildSource(width, height);
                          var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(map, source, match$1[0]);
                          return /* tuple */[
                                  state$1,
                                  map
                                ];
                        };
                        Wonder_jest.test("if is updated before, not update", (function () {
                                var match = _prepare(state[0], undefined, undefined, /* () */0);
                                var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(2, pixelStorei)));
                              }));
                        Wonder_jest.test("if source not exist, not update", (function () {
                                var match = RenderBasicJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                                var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(2, pixelStorei))));
                              }));
                        Wonder_jest.test("set flipY", (function () {
                                var match = _prepare(state[0], undefined, undefined, /* () */0);
                                var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(match[1], true, match[0]);
                                var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(2, true, pixelStorei)));
                              }));
                        Wonder_jest.test("set unpack_colorspace_conversion_webgl to be none", (function () {
                                var match = _prepare(state[0], undefined, undefined, /* () */0);
                                var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, Js_primitive.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(3, 2, pixelStorei)));
                              }));
                        describe("set texture parameters", (function () {
                                describe("if source is power of two", (function () {
                                        var _prepare$1 = function (state) {
                                          var match = _prepare(state, 2, 4, /* () */0);
                                          return /* tuple */[
                                                  match[0],
                                                  match[1]
                                                ];
                                        };
                                        Wonder_jest.test("set wrap", (function () {
                                                var match = _prepare$1(state[0]);
                                                var texParameteri = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, 2, 3, undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(texParameteri), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                Sinon.getCallCount(Sinon.withThreeArgs(1, 2, 4, texParameteri)),
                                                                Sinon.getCallCount(Sinon.withThreeArgs(1, 3, 4, texParameteri))
                                                              ]), /* tuple */[
                                                            1,
                                                            1
                                                          ]);
                                              }));
                                        return Wonder_jest.test("set filter", (function () {
                                                      var match = _prepare$1(state[0]);
                                                      var texParameteri = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, 4, 5, undefined, undefined, undefined, 2, undefined, undefined, 3, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(texParameteri), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      Sinon.getCallCount(Sinon.withThreeArgs(1, 4, 3, texParameteri)),
                                                                      Sinon.getCallCount(Sinon.withThreeArgs(1, 5, 2, texParameteri))
                                                                    ]), /* tuple */[
                                                                  1,
                                                                  1
                                                                ]);
                                                    }));
                                      }));
                                describe("else", (function () {
                                        var _prepare$1 = function (state) {
                                          var match = _prepare(state, 3, 4, /* () */0);
                                          return /* tuple */[
                                                  match[0],
                                                  match[1]
                                                ];
                                        };
                                        Wonder_jest.test("set wrap to CLAMP_TO_EDGE", (function () {
                                                var match = _prepare$1(state[0]);
                                                var texParameteri = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, 2, 3, undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(texParameteri), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                Sinon.getCallCount(Sinon.withThreeArgs(1, 2, 4, texParameteri)),
                                                                Sinon.getCallCount(Sinon.withThreeArgs(1, 3, 4, texParameteri))
                                                              ]), /* tuple */[
                                                            1,
                                                            1
                                                          ]);
                                              }));
                                        describe("set filter with fallback", (function () {
                                                var _setFakeGl = function (sandbox, state) {
                                                  var texParameteri = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, 4, 5, undefined, undefined, undefined, 2, undefined, undefined, 3, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(texParameteri), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                                  return /* tuple */[
                                                          state$1,
                                                          1,
                                                          2,
                                                          3,
                                                          4,
                                                          5,
                                                          texParameteri
                                                        ];
                                                };
                                                Wonder_jest.test("if filter === NEAREST or NEAREST_MIPMAP_MEAREST or NEAREST_MIPMAP_LINEAR, set NEAREST", (function () {
                                                        var match = _prepare$1(state[0]);
                                                        var map = match[1];
                                                        var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter(map, BasicSourceTextureTool$Wonderjs.getNearest(/* () */0), BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(map, BasicSourceTextureTool$Wonderjs.getNearestMipmapLinear(/* () */0), match[0]));
                                                        var match$1 = _setFakeGl(sandbox, state$1);
                                                        var texParameteri = match$1[6];
                                                        var nearest = match$1[2];
                                                        var texture2D = match$1[1];
                                                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        Sinon.getCallCount(Sinon.withThreeArgs(texture2D, match$1[4], nearest, texParameteri)),
                                                                        Sinon.getCallCount(Sinon.withThreeArgs(texture2D, match$1[5], nearest, texParameteri))
                                                                      ]), /* tuple */[
                                                                    1,
                                                                    1
                                                                  ]);
                                                      }));
                                                return Wonder_jest.test("else, set LINEAR", (function () {
                                                              var match = _prepare$1(state[0]);
                                                              var map = match[1];
                                                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter(map, BasicSourceTextureTool$Wonderjs.getLinear(/* () */0), BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(map, BasicSourceTextureTool$Wonderjs.getLinearMipmapNearest(/* () */0), match[0]));
                                                              var match$1 = _setFakeGl(sandbox, state$1);
                                                              var texParameteri = match$1[6];
                                                              var linear = match$1[3];
                                                              var texture2D = match$1[1];
                                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              Sinon.getCallCount(Sinon.withThreeArgs(texture2D, match$1[4], linear, texParameteri)),
                                                                              Sinon.getCallCount(Sinon.withThreeArgs(texture2D, match$1[5], linear, texParameteri))
                                                                            ]), /* tuple */[
                                                                          1,
                                                                          1
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("allocate source to texture", (function () {
                                describe("draw no mipmap twoD texture", (function () {
                                        Wonder_jest.test("test draw", (function () {
                                                var match = _prepare(state[0], undefined, undefined, /* () */0);
                                                var state$1 = match[0];
                                                var source = BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(match[1], state$1);
                                                var texImage2D = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(texImage2D), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                                return Sinon.toCalledWith(/* array */[
                                                            1,
                                                            0,
                                                            2,
                                                            2,
                                                            3,
                                                            source
                                                          ], Wonder_jest.Expect[/* expect */0](texImage2D));
                                              }));
                                        return Wonder_jest.test("test different format,type", (function () {
                                                      var match = _prepare(state[0], undefined, undefined, /* () */0);
                                                      var map = match[1];
                                                      var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFormat(map, BasicSourceTextureTool$Wonderjs.getAlpha(/* () */0), match[0]);
                                                      var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureType(map, BasicSourceTextureTool$Wonderjs.getUnsignedShort565(/* () */0), state$1);
                                                      var source = BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(map, state$2);
                                                      var texImage2D = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      var state$3 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(texImage2D), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$2);
                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$3));
                                                      return Sinon.toCalledWith(/* array */[
                                                                  1,
                                                                  0,
                                                                  2,
                                                                  2,
                                                                  3,
                                                                  source
                                                                ], Wonder_jest.Expect[/* expect */0](texImage2D));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("generate mipmap", (function () {
                                var _exec = function (state) {
                                  var generateMipmap = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(generateMipmap), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                  var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                  return /* tuple */[
                                          state$2,
                                          1,
                                          generateMipmap
                                        ];
                                };
                                Wonder_jest.test("if filter is mipmap and is source power of two, generate", (function () {
                                        var match = _prepare(state[0], 2, 4, /* () */0);
                                        var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(match[1], BasicSourceTextureTool$Wonderjs.getNearestMipmapNearest(/* () */0), match[0]);
                                        var match$1 = _exec(state$1);
                                        return Sinon.toCalledWith(/* array */[match$1[1]], Wonder_jest.Expect[/* expect */0](match$1[2]));
                                      }));
                                describe("else, not generate", (function () {
                                        Wonder_jest.test("test filter isn't mipmap", (function () {
                                                var match = _prepare(state[0], 2, 4, /* () */0);
                                                var map = match[1];
                                                var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter(map, BasicSourceTextureTool$Wonderjs.getNearest(/* () */0), BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(map, BasicSourceTextureTool$Wonderjs.getNearest(/* () */0), match[0]));
                                                var match$1 = _exec(state$1);
                                                return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match$1[2])));
                                              }));
                                        return Wonder_jest.test("test source isn't power of two", (function () {
                                                      var match = _prepare(state[0], 1, 4, /* () */0);
                                                      var map = match[1];
                                                      var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter(map, BasicSourceTextureTool$Wonderjs.getNearest(/* () */0), BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(map, BasicSourceTextureTool$Wonderjs.getLinearMipmapLinear(/* () */0), match[0]));
                                                      var match$1 = _exec(state$1);
                                                      return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match$1[2])));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test arrayBufferView source texture", (function () {
                        var _prepare = function (state, $staropt$star, $staropt$star$1, _) {
                          var width = $staropt$star !== undefined ? $staropt$star : 2;
                          var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 4;
                          var source = ArrayBufferViewSourceTextureTool$Wonderjs.buildSource(/* () */0);
                          var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state);
                          var map = match[1];
                          var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWidth(map, width, match[0]);
                          var state$2 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureHeight(map, height, state$1);
                          var state$3 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureSource(map, source, state$2);
                          var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObjectWithMap(sandbox, map, state$3);
                          var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                          return /* tuple */[
                                  match$2[0],
                                  match$1[5]
                                ];
                        };
                        describe("set texture parameters", (function () {
                                describe("if source isn't power of two", (function () {
                                        var _prepare$1 = function (state) {
                                          var match = _prepare(state, 3, 4, /* () */0);
                                          return /* tuple */[
                                                  match[0],
                                                  match[1]
                                                ];
                                        };
                                        return Wonder_jest.test("set wrap to CLAMP_TO_EDGE", (function () {
                                                      var match = _prepare$1(state[0]);
                                                      var texParameteri = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, 2, 3, undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(texParameteri), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      Sinon.getCallCount(Sinon.withThreeArgs(1, 2, 4, texParameteri)),
                                                                      Sinon.getCallCount(Sinon.withThreeArgs(1, 3, 4, texParameteri))
                                                                    ]), /* tuple */[
                                                                  1,
                                                                  1
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("allocate source to texture", (function () {
                                describe("draw no mipmap twoD texture", (function () {
                                        describe("contract check", (function () {
                                                var _test = function (width, height, state) {
                                                  var match = _prepare(state, width, height, /* () */0);
                                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                  return Wonder_jest.Expect[/* toThrowMessage */20]("expect width/height shouldn't be 0", Wonder_jest.Expect[/* expect */0]((function () {
                                                                    DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                                    return /* () */0;
                                                                  })));
                                                };
                                                Wonder_jest.test("width shouldn't be 0", (function () {
                                                        return _test(0, 20, state[0]);
                                                      }));
                                                return Wonder_jest.test("height shouldn't be 0", (function () {
                                                              return _test(20, 0, state[0]);
                                                            }));
                                              }));
                                        return Wonder_jest.test("test draw", (function () {
                                                      var match = _prepare(state[0], 10, 20, /* () */0);
                                                      var state$1 = match[0];
                                                      var source = ArrayBufferViewSourceTextureAPI$Wonderjs.unsafeGetArrayBufferViewSourceTextureSource(match[1], state$1);
                                                      var texImage2D = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(texImage2D), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                                      return Sinon.toCalledWith(/* array */[
                                                                  1,
                                                                  0,
                                                                  2,
                                                                  10,
                                                                  20,
                                                                  0,
                                                                  2,
                                                                  3,
                                                                  source
                                                                ], Wonder_jest.Expect[/* expect */0](texImage2D));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("generate mipmap", (function () {
                                var _exec = function (state) {
                                  var generateMipmap = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(generateMipmap), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                  var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                  return /* tuple */[
                                          state$2,
                                          1,
                                          generateMipmap
                                        ];
                                };
                                Wonder_jest.test("if filter is mipmap and is source power of two, generate", (function () {
                                        var match = _prepare(state[0], 2, 4, /* () */0);
                                        var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMagFilter(match[1], SourceTextureTool$Wonderjs.getNearestMipmapNearest(/* () */0), match[0]);
                                        var match$1 = _exec(state$1);
                                        return Sinon.toCalledWith(/* array */[match$1[1]], Wonder_jest.Expect[/* expect */0](match$1[2]));
                                      }));
                                describe("else, not generate", (function () {
                                        Wonder_jest.test("test filter isn't mipmap", (function () {
                                                var match = _prepare(state[0], 2, 4, /* () */0);
                                                var map = match[1];
                                                var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMinFilter(map, SourceTextureTool$Wonderjs.getNearest(/* () */0), ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMagFilter(map, SourceTextureTool$Wonderjs.getNearest(/* () */0), match[0]));
                                                var match$1 = _exec(state$1);
                                                return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match$1[2])));
                                              }));
                                        return Wonder_jest.test("test source isn't power of two", (function () {
                                                      var match = _prepare(state[0], 1, 4, /* () */0);
                                                      var map = match[1];
                                                      var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMinFilter(map, SourceTextureTool$Wonderjs.getNearest(/* () */0), ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMagFilter(map, SourceTextureTool$Wonderjs.getLinearMipmapLinear(/* () */0), match[0]));
                                                      var match$1 = _exec(state$1);
                                                      return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match$1[2])));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test set map at runtime which has no map before", (function () {
                return Wonder_jest.test("replace material component", (function () {
                              var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                              var gameObject1 = match[1];
                              var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                              var uniform1i = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_mapSampler");
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform1i), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                              var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                              var state$3 = GameObjectAPI$Wonderjs.disposeGameObjectBasicMaterialComponent(gameObject1, match[3], state$2);
                              var match$2 = BasicMaterialTool$Wonderjs.createMaterialWithMap(state$3);
                              var state$4 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject1, match$2[1], match$2[0]);
                              var state$5 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, state$4);
                              DirectorTool$Wonderjs.runWithDefaultTime(state$5);
                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(0, 0, uniform1i)));
                            }));
              }));
        describe("test remove map at runtime which has map before", (function () {
                return Wonder_jest.test("replace material component", (function () {
                              var match = RenderBasicJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                              var gameObject1 = match[1];
                              var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                              var uniform1i = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_mapSampler");
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform1i), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                              var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                              var state$3 = GameObjectAPI$Wonderjs.disposeGameObjectBasicMaterialComponent(gameObject1, match[3], state$2);
                              var match$2 = BasicMaterialAPI$Wonderjs.createBasicMaterial(state$3);
                              var state$4 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject1, match$2[1], match$2[0]);
                              var state$5 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, state$4);
                              var state$6 = GLSLSenderTool$Wonderjs.clearShaderCache(state$5);
                              DirectorTool$Wonderjs.runWithDefaultTime(state$6);
                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(0, uniform1i)));
                            }));
              }));
        describe("optimize", (function () {
                return Wonder_jest.test("if lastSendMaterialData === shaderIndex, not bind and not update", (function () {
                              var match = RenderBasicJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                              var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObjectWithSharedMaterial(sandbox, match[3], match[0]);
                              var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                              var source1 = BasicSourceTextureTool$Wonderjs.buildSource(10, 20);
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(match[5], source1, match$2[0]);
                              var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              Sinon.getCallCount(Sinon.withOneArg(2, pixelStorei)),
                                              Sinon.getCallCount(bindTexture)
                                            ]), /* tuple */[
                                          1,
                                          1
                                        ]);
                            }));
              }));
        describe("draw", (function () {
                describe("if geometry has index buffer, bind index buffer and drawElements", (function () {
                        var _prepareForDrawElements = function (sandbox, state) {
                          var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
                          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                          return /* tuple */[
                                  match$1[0],
                                  match[2]
                                ];
                        };
                        describe("bind index buffer", (function () {
                                var _prepareForElementArrayBuffer = function (state) {
                                  var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                  var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bindBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                  var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                  return /* tuple */[
                                          state$2,
                                          bindBuffer,
                                          1
                                        ];
                                };
                                describe("optimize", (function () {
                                        Wonder_jest.test("if lastSendGeometryData === geometryIndex, not bind", (function () {
                                                var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                                var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                                var match$2 = RenderBasicJobTool$Wonderjs.prepareGameObjectWithSharedGeometry(sandbox, match[2], match$1[0]);
                                                var match$3 = _prepareForElementArrayBuffer(match$2[0]);
                                                DirectorTool$Wonderjs.runWithDefaultTime(match$3[0]);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(match$3[2], match$3[1]))), 3);
                                              }));
                                        return Wonder_jest.test("else, bind", (function () {
                                                      var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                                      var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                                      var match$2 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, match$1[0]);
                                                      var match$3 = _prepareForElementArrayBuffer(match$2[0]);
                                                      DirectorTool$Wonderjs.runWithDefaultTime(match$3[0]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(match$3[2], match$3[1]))), 6);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return Wonder_jest.test("drawElements", (function () {
                                      var match = _prepareForDrawElements(sandbox, state[0]);
                                      var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                      var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withFourArgs(1, BoxGeometryTool$Wonderjs.getIndicesCount(match[1], CreateRenderStateMainService$Wonderjs.createRenderState(state$3)), GeometryTool$Wonderjs.getIndexType(CreateRenderStateMainService$Wonderjs.createRenderState(state$3)), Caml_int32.imul(GeometryTool$Wonderjs.getIndexTypeSize(CreateRenderStateMainService$Wonderjs.createRenderState(state$3)), 0), drawElements)));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
