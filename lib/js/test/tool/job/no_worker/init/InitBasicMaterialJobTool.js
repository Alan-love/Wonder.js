'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var TestTool$Wonderjs = require("../../../TestTool.js");
var FakeGlTool$Wonderjs = require("../../../gl/FakeGlTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var BoxGeometryTool$Wonderjs = require("../../../service/geometry/BoxGeometryTool.js");
var BasicMaterialAPI$Wonderjs = require("../../../../../src/api/material/BasicMaterialAPI.js");
var InitRenderJobTool$Wonderjs = require("./InitRenderJobTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/BasicSourceTextureAPI.js");

function initWithJobConfigWithoutBuildFakeDom(sandbox, noWorkerJobRecord) {
  return TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, noWorkerJobRecord, undefined, /* () */0);
}

function initWithJobConfig(sandbox, noWorkerJobRecord) {
  return TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, noWorkerJobRecord, undefined, /* () */0);
}

function prepareGameObject(_, state) {
  var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
  var material = match[1];
  var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(match[0]);
  var geometry = match$1[1];
  var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
  var gameObject = match$2[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$2[0]));
  return /* tuple */[
          state$1,
          gameObject,
          geometry,
          material
        ];
}

function prepareGameObjectWithCreatedMap(_, state) {
  var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
  var material = match[1];
  var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
  var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material, match$1[1], match$1[0]);
  var match$2 = BoxGeometryTool$Wonderjs.createBoxGeometry(state$1);
  var geometry = match$2[1];
  var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
  var gameObject = match$3[1];
  var state$2 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$3[0]));
  return /* tuple */[
          state$2,
          gameObject,
          geometry,
          material
        ];
}

var exec = InitRenderJobTool$Wonderjs.exec;

function _prepareForJudgeGLSLNotExec(sandbox, prepareGameObjectFunc, state) {
  var match = Curry._2(prepareGameObjectFunc, sandbox, state);
  var shaderSource = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var createProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(shaderSource), undefined, undefined, undefined, Js_primitive.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
  return /* tuple */[
          state$1,
          shaderSource,
          match[1]
        ];
}

function prepareForJudgeGLSLNotExec(sandbox, state) {
  return _prepareForJudgeGLSLNotExec(sandbox, prepareGameObject, state);
}

function prepareForJudgeGLSL(sandbox, state) {
  var match = _prepareForJudgeGLSLNotExec(sandbox, prepareGameObject, state);
  var state$1 = InitRenderJobTool$Wonderjs.exec(match[0]);
  return /* tuple */[
          state$1,
          match[1]
        ];
}

function prepareForJudgeGLSLNotExecWithMap(sandbox, state) {
  return _prepareForJudgeGLSLNotExec(sandbox, prepareGameObjectWithCreatedMap, state);
}

function prepareForJudgeGLSLWithMap(sandbox, state) {
  var match = _prepareForJudgeGLSLNotExec(sandbox, prepareGameObjectWithCreatedMap, state);
  var state$1 = InitRenderJobTool$Wonderjs.exec(match[0]);
  return /* tuple */[
          state$1,
          match[1]
        ];
}

exports.initWithJobConfigWithoutBuildFakeDom = initWithJobConfigWithoutBuildFakeDom;
exports.initWithJobConfig = initWithJobConfig;
exports.prepareGameObject = prepareGameObject;
exports.prepareGameObjectWithCreatedMap = prepareGameObjectWithCreatedMap;
exports.exec = exec;
exports._prepareForJudgeGLSLNotExec = _prepareForJudgeGLSLNotExec;
exports.prepareForJudgeGLSLNotExec = prepareForJudgeGLSLNotExec;
exports.prepareForJudgeGLSL = prepareForJudgeGLSL;
exports.prepareForJudgeGLSLNotExecWithMap = prepareForJudgeGLSLNotExecWithMap;
exports.prepareForJudgeGLSLWithMap = prepareForJudgeGLSLWithMap;
/* Sinon Not a pure module */
