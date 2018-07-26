

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as GLSLTool$Wonderjs from "../../../render/core/GLSLTool.js";
import * as FakeGlTool$Wonderjs from "../../../gl/FakeGlTool.js";
import * as GLSLLocationTool$Wonderjs from "../../../service/location/GLSLLocationTool.js";

function testGetLocation(sandbox, name, param, state) {
  var match = Curry._2(param[0], sandbox, state[0]);
  var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(undefined, sandbox, name);
  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
  Curry._1(param[1], state$1);
  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, name, getUniformLocation)));
}

function testLocationCache(sandbox, name, param, state) {
  var prepareGameObjectFunc = param[0];
  var match = Curry._2(prepareGameObjectFunc, sandbox, state[0]);
  var match$1 = Curry._2(prepareGameObjectFunc, sandbox, match[0]);
  var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(undefined, sandbox, name);
  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
  Curry._1(param[1], state$1);
  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, name, getUniformLocation)));
}

function testOnlySeGlPositionGlFragColorOnce(sandbox, prepareForJudgeGLSLFunc, state) {
  var shaderSource = Curry._2(prepareForJudgeGLSLFunc, sandbox, state[0]);
  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                  GLSLTool$Wonderjs.containSpecifyCount(GLSLTool$Wonderjs.getVsSource(shaderSource), "gl_Position =", 1, /* () */0),
                  GLSLTool$Wonderjs.containSpecifyCount(GLSLTool$Wonderjs.getFsSource(shaderSource), "gl_FragColor =", 1, /* () */0)
                ]), /* tuple */[
              true,
              true
            ]);
}

function testCommonShaderLibGlsl(sandbox, prepareForJudgeGLSLFunc, state) {
  var shaderSource = Curry._2(prepareForJudgeGLSLFunc, sandbox, state[0]);
  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                      "uniform mat4 u_vMatrix;\n",
                      /* :: */[
                        "uniform mat4 u_pMatrix;\n",
                        /* [] */0
                      ]
                    ])), true);
}

function testVertexShaderLibGlsl(sandbox, prepareForJudgeGLSLFunc, state) {
  var shaderSource = Curry._2(prepareForJudgeGLSLFunc, sandbox, state[0]);
  return Wonder_jest.Expect[/* toContainString */11]("attribute vec3 a_position;\n")(Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.getVsSource(shaderSource)));
}

export {
  testGetLocation ,
  testLocationCache ,
  testOnlySeGlPositionGlFragColorOnce ,
  testCommonShaderLibGlsl ,
  testVertexShaderLibGlsl ,
  
}
/* Sinon Not a pure module */
