'use strict';

var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var BoxGeometryTool$Wonderjs = require("../../../../tool/service/geometry/BoxGeometryTool.js");
var CustomGeometryTool$Wonderjs = require("../../../../tool/service/geometry/CustomGeometryTool.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");

var getFlattenClonedGameObjectArr = ArrayService$WonderCommonlib.flatten;

var cloneGameObject = GameObjectAPI$Wonderjs.cloneGameObject;

function cloneWithBoxGeometry(state, gameObject1, geometry1, count) {
  var match = cloneGameObject(gameObject1, count, false, state);
  var clonedGameObjectArr = match[1];
  var state$1 = match[0];
  return /* tuple */[
          state$1,
          gameObject1,
          geometry1,
          ArrayService$WonderCommonlib.flatten(clonedGameObjectArr),
          ArrayService$WonderCommonlib.flatten(clonedGameObjectArr).map((function (clonedGameObject) {
                  return BoxGeometryTool$Wonderjs.unsafeGetBoxGeometryComponent(clonedGameObject, state$1);
                }))
        ];
}

function cloneWithCustomGeometry(state, gameObject1, geometry1, count) {
  var match = cloneGameObject(gameObject1, count, false, state);
  var clonedGameObjectArr = match[1];
  var state$1 = match[0];
  return /* tuple */[
          state$1,
          gameObject1,
          geometry1,
          ArrayService$WonderCommonlib.flatten(clonedGameObjectArr),
          ArrayService$WonderCommonlib.flatten(clonedGameObjectArr).map((function (clonedGameObject) {
                  return CustomGeometryTool$Wonderjs.unsafeGetGeometryComponent(clonedGameObject, state$1);
                }))
        ];
}

function cloneWithBasicMaterial(state, gameObject1, material1, count, isShareMaterial) {
  var match = cloneGameObject(gameObject1, count, isShareMaterial, state);
  var clonedGameObjectArr = match[1];
  var state$1 = match[0];
  return /* tuple */[
          state$1,
          gameObject1,
          material1,
          ArrayService$WonderCommonlib.flatten(clonedGameObjectArr),
          ArrayService$WonderCommonlib.flatten(clonedGameObjectArr).map((function (clonedGameObject) {
                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent(clonedGameObject, state$1);
                }))
        ];
}

exports.getFlattenClonedGameObjectArr = getFlattenClonedGameObjectArr;
exports.cloneGameObject = cloneGameObject;
exports.cloneWithBoxGeometry = cloneWithBoxGeometry;
exports.cloneWithCustomGeometry = cloneWithCustomGeometry;
exports.cloneWithBasicMaterial = cloneWithBasicMaterial;
/* GameObjectAPI-Wonderjs Not a pure module */
