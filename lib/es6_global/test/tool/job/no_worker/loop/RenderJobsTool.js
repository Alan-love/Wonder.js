

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as TestTool$Wonderjs from "../../../TestTool.js";
import * as FakeGlTool$Wonderjs from "../../../gl/FakeGlTool.js";
import * as DirectorTool$Wonderjs from "../../../core/DirectorTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as BoxGeometryTool$Wonderjs from "../../../service/geometry/BoxGeometryTool.js";
import * as MeshRendererAPI$Wonderjs from "../../../../../src/api/MeshRendererAPI.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../src/api/material/BasicMaterialAPI.js";
import * as GLSLLocationTool$Wonderjs from "../../../service/location/GLSLLocationTool.js";
import * as PregetGLSLDataTool$Wonderjs from "./PregetGLSLDataTool.js";

function initWithJobConfig(sandbox, noWorkerJobRecord) {
  return DirectorTool$Wonderjs.prepare(TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, noWorkerJobRecord, undefined, /* () */0));
}

function initWithJobConfigAndBufferConfig(sandbox, noWorkerJobRecord, buffer) {
  return DirectorTool$Wonderjs.prepare(TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, buffer, noWorkerJobRecord, undefined, /* () */0));
}

function initWithJobConfigWithoutBuildFakeDom(sandbox, noWorkerJobRecord) {
  return DirectorTool$Wonderjs.prepare(TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, noWorkerJobRecord, undefined, /* () */0));
}

function prepareGameObject(_, state) {
  var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
  var material = match[1];
  var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(match[0]);
  var geometry = match$1[1];
  var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$1[0]);
  var meshRenderer = match$2[1];
  var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
  var gameObject = match$3[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectBoxGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$3[0])));
  return /* tuple */[
          state$1,
          gameObject,
          geometry,
          material,
          meshRenderer
        ];
}

function init(state) {
  return DirectorTool$Wonderjs.init(PregetGLSLDataTool$Wonderjs.preparePrecision(state));
}

function passGl(sandbox, state) {
  return FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
}

function buildConfigData($staropt$star, $staropt$star$1, _) {
  var flags = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : undefined;
  var shader = $staropt$star$1 !== undefined ? Js_primitive.valFromOption($staropt$star$1) : undefined;
  return /* tuple */[
          flags,
          shader
        ];
}

function prepareForUseProgramCase(sandbox, prepareFunc, state) {
  var state$1 = Curry._2(prepareFunc, sandbox, state);
  var createProgram = Sinon.returns(1, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
  var useProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(useProgram), undefined, /* () */0), state$1);
  return /* tuple */[
          state$2,
          1,
          useProgram
        ];
}

function testSendShaderUniformDataOnlyOnce(sandbox, name, param, state) {
  var prepareGameObject = param[2];
  var setFakeGlFunc = param[1];
  var prepareSendUinformDataFunc = param[0];
  return Wonder_jest.test("send shader uniform record only once", (function () {
                var match = Curry._3(prepareSendUinformDataFunc, sandbox, prepareGameObject, state[0]);
                var match$1 = Curry._2(prepareGameObject, sandbox, match[0]);
                var uniformDataStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, name);
                var state$1 = Curry._3(setFakeGlFunc, uniformDataStub, getUniformLocation, match$1[0]);
                DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(PregetGLSLDataTool$Wonderjs.preparePrecision(state$1)));
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(0, uniformDataStub))), 1);
              }));
}

function testSendShaderUniformMatrix4DataOnlyOnce(sandbox, name, param, state) {
  return testSendShaderUniformDataOnlyOnce(sandbox, name, /* tuple */[
              param[0],
              (function (stub, getUniformLocation, state) {
                  return FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(stub), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                }),
              param[1]
            ], state);
}

function testSendShaderUniformMatrix3DataOnlyOnce(sandbox, name, param, state) {
  return testSendShaderUniformDataOnlyOnce(sandbox, name, /* tuple */[
              param[0],
              (function (stub, getUniformLocation, state) {
                  return FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(stub), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                }),
              param[1]
            ], state);
}

function testSendShaderUniformVec3DataOnlyOnce(sandbox, name, param, state) {
  return testSendShaderUniformDataOnlyOnce(sandbox, name, /* tuple */[
              param[0],
              (function (stub, getUniformLocation, state) {
                  return FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(stub), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                }),
              param[1]
            ], state);
}

export {
  initWithJobConfig ,
  initWithJobConfigAndBufferConfig ,
  initWithJobConfigWithoutBuildFakeDom ,
  prepareGameObject ,
  init ,
  passGl ,
  buildConfigData ,
  prepareForUseProgramCase ,
  testSendShaderUniformDataOnlyOnce ,
  testSendShaderUniformMatrix4DataOnlyOnce ,
  testSendShaderUniformMatrix3DataOnlyOnce ,
  testSendShaderUniformVec3DataOnlyOnce ,
  
}
/* Sinon Not a pure module */
