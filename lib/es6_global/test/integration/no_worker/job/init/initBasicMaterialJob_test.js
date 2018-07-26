

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as GLSLTool$Wonderjs from "../../../../tool/render/core/GLSLTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as GLSLLocationTool$Wonderjs from "../../../../tool/service/location/GLSLLocationTool.js";
import * as InitMaterialTool$Wonderjs from "../../../../tool/job/no_worker/init/InitMaterialTool.js";
import * as InitMaterialJobTool$Wonderjs from "../../../../tool/job/no_worker/init/InitMaterialJobTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as InitBasicMaterialJobTool$Wonderjs from "../../../../tool/job/no_worker/init/InitBasicMaterialJobTool.js";

describe("test init basic material job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildNoWorkerJobConfig = function () {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_basic_material\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_basic_material\"\n        }\n]\n        ", undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = InitBasicMaterialJobTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test get attribute location", (function () {
                describe("test get a_position location", (function () {
                        Wonder_jest.test("test get location", (function () {
                                var match = InitBasicMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_position");
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                InitBasicMaterialJobTool$Wonderjs.exec(state$1);
                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_position", getAttribLocation)));
                              }));
                        describe("test cache", (function () {
                                return Wonder_jest.test("if cached, not query gl location", (function () {
                                              var match = InitBasicMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                              var match$1 = InitBasicMaterialJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                              var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_position");
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                              InitBasicMaterialJobTool$Wonderjs.exec(state$1);
                                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_position", getAttribLocation)));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test get a_texCoord location", (function () {
                        Wonder_jest.test("test get location", (function () {
                                var match = InitBasicMaterialJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                                var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_texCoord");
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                InitBasicMaterialJobTool$Wonderjs.exec(state$1);
                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_texCoord", getAttribLocation)));
                              }));
                        describe("test cache", (function () {
                                return Wonder_jest.test("if cached, not query gl location", (function () {
                                              var match = InitBasicMaterialJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                                              var match$1 = InitBasicMaterialJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, match[0]);
                                              var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_texCoord");
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                              InitBasicMaterialJobTool$Wonderjs.exec(state$1);
                                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_texCoord", getAttribLocation)));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test get uniform location", (function () {
                var _testGetLocation = function (name) {
                  return InitMaterialTool$Wonderjs.testGetLocation(sandbox, name, /* tuple */[
                              InitBasicMaterialJobTool$Wonderjs.prepareGameObjectWithCreatedMap,
                              InitBasicMaterialJobTool$Wonderjs.exec
                            ], state);
                };
                describe("test get u_mMatrix location", (function () {
                        Wonder_jest.test("test get location", (function () {
                                return _testGetLocation("u_mMatrix");
                              }));
                        describe("test cache", (function () {
                                return Wonder_jest.test("if cached, not query gl location", (function () {
                                              return InitMaterialTool$Wonderjs.testLocationCache(sandbox, "u_mMatrix", /* tuple */[
                                                          InitBasicMaterialJobTool$Wonderjs.prepareGameObject,
                                                          InitBasicMaterialJobTool$Wonderjs.exec
                                                        ], state);
                                            }));
                              }));
                        return /* () */0;
                      }));
                Wonder_jest.test("test get u_color location", (function () {
                        return _testGetLocation("u_color");
                      }));
                return Wonder_jest.test("test get u_mapSampler location", (function () {
                              return _testGetLocation("u_mapSampler");
                            }));
              }));
        describe("test glsl", (function () {
                Wonder_jest.test("glsl only set glPosition,glFragColor once", (function () {
                        return InitMaterialTool$Wonderjs.testOnlySeGlPositionGlFragColorOnce(sandbox, InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL, state);
                      }));
                describe("test shader lib's glsl", (function () {
                        Wonder_jest.test("test common shader lib's glsl", (function () {
                                return InitMaterialTool$Wonderjs.testCommonShaderLibGlsl(sandbox, InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL, state);
                              }));
                        Wonder_jest.test("test vertex shader lib's glsl", (function () {
                                return InitMaterialTool$Wonderjs.testVertexShaderLibGlsl(sandbox, InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL, state);
                              }));
                        describe("test modelMatrix instance shader libs", (function () {
                                return InitMaterialJobTool$Wonderjs.testModelMatrixInstanceShaderLibs(sandbox, /* tuple */[
                                            InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL,
                                            InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSLNotExec,
                                            InitBasicMaterialJobTool$Wonderjs.exec
                                          ], state);
                              }));
                        describe("test basic shader lib's glsl", (function () {
                                return Wonder_jest.test("test vs glsl", (function () {
                                              var shaderSource = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL(sandbox, state[0]);
                                              return Wonder_jest.Expect[/* toContainString */11]("gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);")(Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.getVsSource(shaderSource)));
                                            }));
                              }));
                        describe("test basic_color shader lib's glsl", (function () {
                                return Wonder_jest.test("test fs glsl", (function () {
                                              var shaderSource = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL(sandbox, state[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSource(shaderSource), /* :: */[
                                                                  "uniform vec3 u_color;",
                                                                  /* :: */[
                                                                    "vec4 totalColor = vec4(u_color, 1.0);\n         ",
                                                                    /* [] */0
                                                                  ]
                                                                ])), true);
                                            }));
                              }));
                        describe("test map shader lib's glsl", (function () {
                                describe("if has map, add basic_map shader lib", (function () {
                                        Wonder_jest.test("test vs glsl", (function () {
                                                var shaderSource = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSLWithMap(sandbox, state[0]);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                                                                    "varying vec2 v_mapCoord0;",
                                                                    /* :: */[
                                                                      "v_mapCoord0 = a_texCoord;",
                                                                      /* [] */0
                                                                    ]
                                                                  ])), true);
                                              }));
                                        describe("test fs glsl", (function () {
                                                Wonder_jest.test("test", (function () {
                                                        var shaderSource = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSLWithMap(sandbox, state[0]);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSource(shaderSource), /* :: */[
                                                                            "uniform sampler2D u_mapSampler;",
                                                                            /* :: */[
                                                                              "uniform vec3 u_color;",
                                                                              /* :: */[
                                                                                "varying vec2 v_mapCoord0;",
                                                                                /* :: */[
                                                                                  "vec4 totalColor = vec4(texture2D(u_mapSampler, v_mapCoord0).rgb * u_color, 1.0);",
                                                                                  /* [] */0
                                                                                ]
                                                                              ]
                                                                            ]
                                                                          ])), true);
                                                      }));
                                                return Wonder_jest.test("should contain u_color only once", (function () {
                                                              var shaderSource = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSLWithMap(sandbox, state[0]);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containSpecifyCount(GLSLTool$Wonderjs.getFsSource(shaderSource), "uniform vec3 u_color;", 1, /* () */0)), true);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("else, not add", (function () {
                                        return Wonder_jest.test("test vs glsl", (function () {
                                                      var shaderSource = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL(sandbox, state[0]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                                                                          "varying vec2 v_mapCoord0;",
                                                                          /* [] */0
                                                                        ])), false);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return Wonder_jest.test("test basic_end shader lib's glsl", (function () {
                                      var shaderSource = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL(sandbox, state[0]);
                                      return Wonder_jest.Expect[/* toContainString */11]("gl_FragColor = vec4(totalColor.rgb, totalColor.a);")(Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.getFsSource(shaderSource)));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
