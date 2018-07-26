

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as AddTransformService$Wonderjs from "../../../record/main/transform/AddTransformService.js";
import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";
import * as AddPointLightService$Wonderjs from "../../../record/main/light/point/AddPointLightService.js";
import * as AddBoxGeometryService$Wonderjs from "../../../record/main/geometry/box/AddBoxGeometryService.js";
import * as AddBasicMaterialService$Wonderjs from "../../../record/main/material/basic/AddBasicMaterialService.js";
import * as AddLightMaterialService$Wonderjs from "../../../record/main/material/light/AddLightMaterialService.js";
import * as GroupBoxGeometryService$Wonderjs from "../../../record/main/geometry/box/GroupBoxGeometryService.js";
import * as AddCustomGeometryService$Wonderjs from "../../../record/main/geometry/custom/AddCustomGeometryService.js";
import * as AddDirectionLightService$Wonderjs from "../../../record/main/light/direction/AddDirectionLightService.js";
import * as AddObjectInstanceService$Wonderjs from "../../../record/main/instance/objectInstance/AddObjectInstanceService.js";
import * as AddSourceInstanceService$Wonderjs from "../../../record/main/instance/sourceInstance/AddSourceInstanceService.js";
import * as AddBasicCameraViewService$Wonderjs from "../../../record/main/basic_camera_view/AddBasicCameraViewService.js";
import * as GroupBasicMaterialService$Wonderjs from "../../../record/main/material/basic/GroupBasicMaterialService.js";
import * as GroupLightMaterialService$Wonderjs from "../../../record/main/material/light/GroupLightMaterialService.js";
import * as AddMeshRendererMainService$Wonderjs from "../meshRenderer/AddMeshRendererMainService.js";
import * as GroupCustomGeometryService$Wonderjs from "../../../record/main/geometry/custom/GroupCustomGeometryService.js";
import * as RecordTransformMainService$Wonderjs from "../transform/RecordTransformMainService.js";
import * as GameObjectBoxGeometryService$Wonderjs from "../../../record/main/geometry/box/GameObjectBoxGeometryService.js";
import * as RecordBoxGeometryMainService$Wonderjs from "../geometry/box/RecordBoxGeometryMainService.js";
import * as CurrentComponentDataMapService$Wonderjs from "../../../record/all/gameObject/CurrentComponentDataMapService.js";
import * as GameObjectBasicMaterialService$Wonderjs from "../../../record/main/material/basic/GameObjectBasicMaterialService.js";
import * as GameObjectLightMaterialService$Wonderjs from "../../../record/main/material/light/GameObjectLightMaterialService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../material/basic/RecordBasicMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../material/light/RecordLightMaterialMainService.js";
import * as GameObjectCustomGeometryService$Wonderjs from "../../../record/main/geometry/custom/GameObjectCustomGeometryService.js";
import * as RecordCustomGeometryMainService$Wonderjs from "../geometry/custom/RecordCustomGeometryMainService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "../instance/RecordSourceInstanceMainService.js";
import * as AddArcballCameraControllerService$Wonderjs from "../../../record/main/camera_controller/arcball/AddArcballCameraControllerService.js";
import * as CurrentComponentDataMapRenderService$Wonderjs from "../../render/gameObject/CurrentComponentDataMapRenderService.js";
import * as AddPerspectiveCameraProjectionService$Wonderjs from "../../../record/main/perspective_camera_projection/AddPerspectiveCameraProjectionService.js";

function _addComponent(param, handleAddComponentFunc, componentRecord) {
  var component = param[1];
  var uid = param[0];
  ComponentMapService$Wonderjs.addComponent(uid, component, param[2]);
  return handleAddComponentFunc(component, uid, componentRecord);
}

function _addComponentWithState(param, handleAddComponentFunc, state) {
  var component = param[1];
  var uid = param[0];
  ComponentMapService$Wonderjs.addComponent(uid, component, param[2]);
  return handleAddComponentFunc(component, uid, state);
}

function _addSharableComponent(param, param$1, componentRecord) {
  var component = param[1];
  var uid = param[0];
  ComponentMapService$Wonderjs.addComponent(uid, component, param[2]);
  if (param[3] !== undefined) {
    return param$1[0](component, componentRecord);
  } else {
    return param$1[1](component, uid, componentRecord);
  }
}

function addBasicCameraViewComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var basicCameraViewRecord = state[/* basicCameraViewRecord */13];
  state[/* basicCameraViewRecord */13] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* basicCameraViewMap */23]
      ], AddBasicCameraViewService$Wonderjs.handleAddComponent, basicCameraViewRecord);
  return state;
}

function addPerspectiveCameraProjectionComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  state[/* perspectiveCameraProjectionRecord */14] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* perspectiveCameraProjectionMap */24]
      ], AddPerspectiveCameraProjectionService$Wonderjs.handleAddComponent, perspectiveCameraProjectionRecord);
  return state;
}

function addArcballCameraControllerComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* arcballCameraControllerMap */25]
      ], AddArcballCameraControllerService$Wonderjs.handleAddComponent, state[/* arcballCameraControllerRecord */25]);
  return newrecord;
}

function addTransformComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  state[/* transformRecord */11] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* transformMap */22]
      ], AddTransformService$Wonderjs.handleAddComponent, RecordTransformMainService$Wonderjs.getRecord(state));
  return state;
}

function _addSharableGeometryComponent(param, param$1, componentRecord) {
  var component = param[1];
  if (param[2] !== undefined) {
    return param$1[0](component, componentRecord);
  } else {
    return param$1[1](component, param[0], componentRecord);
  }
}

function _addCurrentBoxGeometryComponentData(uid, component, param) {
  var geometryDataMap = param[/* geometryDataMap */21];
  return CurrentComponentDataMapRenderService$Wonderjs.addToMap(uid, /* tuple */[
              component,
              CurrentComponentDataMapService$Wonderjs.getBoxGeometryType(/* () */0)
            ], geometryDataMap);
}

function addBoxGeometryComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  _addCurrentBoxGeometryComponentData(uid, component, gameObjectRecord);
  var boxGeometryRecord = RecordBoxGeometryMainService$Wonderjs.getRecord(state);
  state[/* boxGeometryRecord */22] = _addSharableGeometryComponent(/* tuple */[
        uid,
        component,
        GameObjectBoxGeometryService$Wonderjs.getGameObject(component, boxGeometryRecord)
      ], /* tuple */[
        GroupBoxGeometryService$Wonderjs.increaseGroupCount,
        AddBoxGeometryService$Wonderjs.handleAddComponent
      ], boxGeometryRecord);
  return state;
}

function _addCurrentCustomGeometryComponentData(uid, component, param) {
  var geometryDataMap = param[/* geometryDataMap */21];
  return CurrentComponentDataMapRenderService$Wonderjs.addToMap(uid, /* tuple */[
              component,
              CurrentComponentDataMapService$Wonderjs.getCustomGeometryType(/* () */0)
            ], geometryDataMap);
}

function addCustomGeometryComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  _addCurrentCustomGeometryComponentData(uid, component, gameObjectRecord);
  var customGeometryRecord = RecordCustomGeometryMainService$Wonderjs.getRecord(state);
  state[/* customGeometryRecord */23] = _addSharableGeometryComponent(/* tuple */[
        uid,
        component,
        GameObjectCustomGeometryService$Wonderjs.getGameObject(component, customGeometryRecord)
      ], /* tuple */[
        GroupCustomGeometryService$Wonderjs.increaseGroupCount,
        AddCustomGeometryService$Wonderjs.handleAddComponent
      ], customGeometryRecord);
  return state;
}

function addBasicMaterialComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  state[/* basicMaterialRecord */15] = _addSharableComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* basicMaterialMap */27],
        GameObjectBasicMaterialService$Wonderjs.getGameObject(component, basicMaterialRecord)
      ], /* tuple */[
        GroupBasicMaterialService$Wonderjs.increaseGroupCount,
        AddBasicMaterialService$Wonderjs.handleAddComponent
      ], basicMaterialRecord);
  return state;
}

function addLightMaterialComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  state[/* lightMaterialRecord */16] = _addSharableComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* lightMaterialMap */28],
        GameObjectLightMaterialService$Wonderjs.getGameObject(component, lightMaterialRecord)
      ], /* tuple */[
        GroupLightMaterialService$Wonderjs.increaseGroupCount,
        AddLightMaterialService$Wonderjs.handleAddComponent
      ], lightMaterialRecord);
  return state;
}

function addMeshRendererComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return _addComponentWithState(/* tuple */[
              uid,
              component,
              gameObjectRecord[/* meshRendererMap */26]
            ], AddMeshRendererMainService$Wonderjs.handleAddComponent, state);
}

function addDirectionLightComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var directionLightRecord = state[/* directionLightRecord */20];
  state[/* directionLightRecord */20] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* directionLightMap */31]
      ], AddDirectionLightService$Wonderjs.handleAddComponent, directionLightRecord);
  return state;
}

function addPointLightComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var pointLightRecord = state[/* pointLightRecord */21];
  state[/* pointLightRecord */21] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* pointLightMap */32]
      ], AddPointLightService$Wonderjs.handleAddComponent, pointLightRecord);
  return state;
}

function addSourceInstanceComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  state[/* sourceInstanceRecord */6] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* sourceInstanceMap */29]
      ], AddSourceInstanceService$Wonderjs.handleAddComponent, RecordSourceInstanceMainService$Wonderjs.getRecord(state));
  return state;
}

function addObjectInstanceComponent(uid, component, state) {
  var objectInstanceRecord = state[/* objectInstanceRecord */7];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  state[/* objectInstanceRecord */7] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* objectInstanceMap */30]
      ], AddObjectInstanceService$Wonderjs.handleAddComponent, objectInstanceRecord);
  return state;
}

export {
  _addComponent ,
  _addComponentWithState ,
  _addSharableComponent ,
  addBasicCameraViewComponent ,
  addPerspectiveCameraProjectionComponent ,
  addArcballCameraControllerComponent ,
  addTransformComponent ,
  _addSharableGeometryComponent ,
  _addCurrentBoxGeometryComponentData ,
  addBoxGeometryComponent ,
  _addCurrentCustomGeometryComponentData ,
  addCustomGeometryComponent ,
  addBasicMaterialComponent ,
  addLightMaterialComponent ,
  addMeshRendererComponent ,
  addDirectionLightComponent ,
  addPointLightComponent ,
  addSourceInstanceComponent ,
  addObjectInstanceComponent ,
  
}
/* ComponentMapService-Wonderjs Not a pure module */
