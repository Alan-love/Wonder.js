

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ClonePointLightService$Wonderjs from "../../../record/main/light/point/ClonePointLightService.js";
import * as CloneBoxGeometryService$Wonderjs from "../../../record/main/geometry/box/CloneBoxGeometryService.js";
import * as CloneMeshRendererService$Wonderjs from "../../../record/main/meshRenderer/CloneMeshRendererService.js";
import * as CloneTransformMainService$Wonderjs from "../transform/CloneTransformMainService.js";
import * as CloneCustomGeometryService$Wonderjs from "../../../record/main/geometry/custom/CloneCustomGeometryService.js";
import * as CloneDirectionLightService$Wonderjs from "../../../record/main/light/direction/CloneDirectionLightService.js";
import * as CloneBasicCameraViewService$Wonderjs from "../../../record/main/basic_camera_view/CloneBasicCameraViewService.js";
import * as CloneBasicMaterialMainService$Wonderjs from "../material/basic/CloneBasicMaterialMainService.js";
import * as CloneLightMaterialMainService$Wonderjs from "../material/light/CloneLightMaterialMainService.js";
import * as CloneArcballCameraControllerService$Wonderjs from "../../../record/main/camera_controller/arcball/CloneArcballCameraControllerService.js";
import * as ClonePerspectiveCameraProjectionService$Wonderjs from "../../../record/main/perspective_camera_projection/ClonePerspectiveCameraProjectionService.js";

function cloneBasicCameraViewComponent(sourceComponent, countRangeArr, state) {
  var basicCameraViewRecord = state[/* basicCameraViewRecord */13];
  var match = CloneBasicCameraViewService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, basicCameraViewRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* basicCameraViewRecord */13] = match[0], newrecord),
          match[1]
        ];
}

function clonePerspectiveCameraProjectionComponent(sourceComponent, countRangeArr, state) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  var match = ClonePerspectiveCameraProjectionService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, perspectiveCameraProjectionRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* perspectiveCameraProjectionRecord */14] = match[0], newrecord),
          match[1]
        ];
}

function cloneArcballCameraControllerComponent(sourceComponent, countRangeArr, state) {
  var match = CloneArcballCameraControllerService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, state[/* arcballCameraControllerRecord */25]);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* arcballCameraControllerRecord */25] = match[0], newrecord),
          match[1]
        ];
}

var cloneTransformComponent = CloneTransformMainService$Wonderjs.handleCloneComponent;

function cloneMeshRendererComponent(sourceComponent, countRangeArr, state) {
  var meshRendererRecord = state[/* meshRendererRecord */24];
  var match = CloneMeshRendererService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, meshRendererRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* meshRendererRecord */24] = match[0], newrecord),
          match[1]
        ];
}

function cloneBoxGeometryComponent(sourceComponent, countRangeArr, state) {
  var boxGeometryRecord = state[/* boxGeometryRecord */22];
  var match = CloneBoxGeometryService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, boxGeometryRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* boxGeometryRecord */22] = match[0], newrecord),
          match[1]
        ];
}

function cloneCustomGeometryComponent(sourceComponent, countRangeArr, state) {
  var customGeometryRecord = state[/* customGeometryRecord */23];
  var match = CloneCustomGeometryService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, customGeometryRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* customGeometryRecord */23] = match[0], newrecord),
          match[1]
        ];
}

function cloneBasicMaterialComponent(isShareMaterial, sourceComponent, countRangeArr, state) {
  return CloneBasicMaterialMainService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, isShareMaterial, state);
}

function cloneLightMaterialComponent(isShareMaterial, sourceComponent, countRangeArr, state) {
  return CloneLightMaterialMainService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, isShareMaterial, state);
}

function cloneDirectionLightComponent(sourceComponent, countRangeArr, state) {
  var directionLightRecord = state[/* directionLightRecord */20];
  var match = CloneDirectionLightService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, directionLightRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* directionLightRecord */20] = match[0], newrecord),
          match[1]
        ];
}

function clonePointLightComponent(sourceComponent, countRangeArr, state) {
  var pointLightRecord = state[/* pointLightRecord */21];
  var match = ClonePointLightService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, pointLightRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* pointLightRecord */21] = match[0], newrecord),
          match[1]
        ];
}

export {
  cloneBasicCameraViewComponent ,
  clonePerspectiveCameraProjectionComponent ,
  cloneArcballCameraControllerComponent ,
  cloneTransformComponent ,
  cloneMeshRendererComponent ,
  cloneBoxGeometryComponent ,
  cloneCustomGeometryComponent ,
  cloneBasicMaterialComponent ,
  cloneLightMaterialComponent ,
  cloneDirectionLightComponent ,
  clonePointLightComponent ,
  
}
/* ClonePointLightService-Wonderjs Not a pure module */
