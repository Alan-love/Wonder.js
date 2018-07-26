'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GLSLTool$Wonderjs = require("../../../../tool/render/core/GLSLTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var InstanceTool$Wonderjs = require("../../../../tool/service/instance/InstanceTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var TestWorkerTool$Wonderjs = require("../../tool/TestWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("../main_worker/tool/TestMainWorkerTool.js");
var InstanceRenderWorkerTool$Wonderjs = require("./tool/InstanceRenderWorkerTool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("./tool/RenderJobsRenderWorkerTool.js");
var InitBasicMaterialJobRenderWorkerTool$Wonderjs = require("./tool/InitBasicMaterialJobRenderWorkerTool.js");

describe("test init basic material render worker job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        describe("test glsl", (function () {
                describe("test shader lib's glsl", (function () {
                        describe("test modelMatrix instance shader libs", (function () {
                                Wonder_jest.testPromise("if has no sourceInstance component, use modelMatrix_noInstance shader lib", (function () {
                                        var match = InitBasicMaterialJobRenderWorkerTool$Wonderjs.prepareForJudgeGLSLNotExec(sandbox, state[0]);
                                        var shaderSource = match[1];
                                        return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                                                                              "uniform mat4 u_mMatrix;",
                                                                              /* :: */[
                                                                                "mat4 mMatrix = u_mMatrix;",
                                                                                /* [] */0
                                                                              ]
                                                                            ])), true));
                                                    }), match[0]);
                                      }));
                                describe("else", (function () {
                                        return Wonder_jest.testPromise("if support hardware instance, use modelMatrix_hardware_instance shader lib", (function () {
                                                      var match = InitBasicMaterialJobRenderWorkerTool$Wonderjs.prepareForJudgeGLSLNotExec(sandbox, state[0]);
                                                      var shaderSource = match[1];
                                                      var match$1 = InstanceTool$Wonderjs.addSourceInstance(match[2], match[0]);
                                                      InstanceRenderWorkerTool$Wonderjs.setGPUDetectDataAllowHardwareInstance(sandbox);
                                                      return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                                                                                            "attribute vec4 a_mVec4_0;",
                                                                                            /* :: */[
                                                                                              "attribute vec4 a_mVec4_1;",
                                                                                              /* :: */[
                                                                                                "attribute vec4 a_mVec4_2;",
                                                                                                /* :: */[
                                                                                                  "attribute vec4 a_mVec4_3;",
                                                                                                  /* :: */[
                                                                                                    "mat4 mMatrix = mat4(a_mVec4_0, a_mVec4_1, a_mVec4_2, a_mVec4_3);",
                                                                                                    /* [] */0
                                                                                                  ]
                                                                                                ]
                                                                                              ]
                                                                                            ]
                                                                                          ])), true));
                                                                  }), match$1[0]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
