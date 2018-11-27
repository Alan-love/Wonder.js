'use strict';

var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var CameraTool$Wonderjs = require("../../../tool/service/camera/CameraTool.js");
var PointLightTool$Wonderjs = require("../../../tool/service/light/PointLightTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../worker/tool/FakeGlWorkerTool.js");
var GLSLLocationTool$Wonderjs = require("../../../tool/service/location/GLSLLocationTool.js");
var DirectionLightTool$Wonderjs = require("../../../tool/service/light/DirectionLightTool.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");

function prepareForUseProgramCase(sandbox, state) {
  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
}

function setFakeGlForLight(sandbox, nameArr, state) {
  var uniform1f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var posArr = nameArr.map((function (_, index) {
          return index;
        }));
  var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocationWithNameArr(sandbox, Sinon.createEmptyStubWithJsObjSandbox(sandbox), nameArr, posArr);
  var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform1f), Js_primitive.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
  return /* tuple */[
          state$1,
          posArr,
          /* tuple */[
            uniform1f,
            uniform3f
          ]
        ];
}

function prepareOneForDirectionLight(sandbox, state) {
  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
  var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
  var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
  return /* tuple */[
          match$2[0],
          match$1[1],
          match[3],
          match$1[2],
          match$2[2]
        ];
}

function prepareFourForPointLight(sandbox, state) {
  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
  var match$1 = PointLightTool$Wonderjs.createGameObject(match[0]);
  var match$2 = PointLightTool$Wonderjs.createGameObject(match$1[0]);
  var match$3 = PointLightTool$Wonderjs.createGameObject(match$2[0]);
  var match$4 = PointLightTool$Wonderjs.createGameObject(match$3[0]);
  var match$5 = CameraTool$Wonderjs.createCameraGameObject(match$4[0]);
  return /* tuple */[
          match$5[0],
          /* tuple */[
            match$1[1],
            match$2[1],
            match$3[1],
            match$4[1]
          ],
          match[3],
          /* tuple */[
            match$1[2],
            match$2[2],
            match$3[2],
            match$4[2]
          ],
          match$5[2]
        ];
}

exports.prepareForUseProgramCase = prepareForUseProgramCase;
exports.setFakeGlForLight = setFakeGlForLight;
exports.prepareOneForDirectionLight = prepareOneForDirectionLight;
exports.prepareFourForPointLight = prepareFourForPointLight;
/* Sinon Not a pure module */
