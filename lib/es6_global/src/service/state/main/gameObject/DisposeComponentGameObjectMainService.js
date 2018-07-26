

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";
import * as MemorySettingService$Wonderjs from "../../../record/main/setting/MemorySettingService.js";
import * as DisposePointLightService$Wonderjs from "../../../record/main/light/point/DisposePointLightService.js";
import * as DisposeMeshRendererService$Wonderjs from "../../../record/main/meshRenderer/DisposeMeshRendererService.js";
import * as DisposeTransformMainService$Wonderjs from "../transform/DisposeTransformMainService.js";
import * as DisposeDirectionLightService$Wonderjs from "../../../record/main/light/direction/DisposeDirectionLightService.js";
import * as DisposeBasicCameraViewService$Wonderjs from "../../../record/main/basic_camera_view/DisposeBasicCameraViewService.js";
import * as DisposeBoxGeometryMainService$Wonderjs from "../geometry/box/DisposeBoxGeometryMainService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../material/basic/RecordBasicMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../material/light/RecordLightMaterialMainService.js";
import * as DisposeBasicMaterialMainService$Wonderjs from "../material/basic/DisposeBasicMaterialMainService.js";
import * as DisposeLightMaterialMainService$Wonderjs from "../material/light/DisposeLightMaterialMainService.js";
import * as DisposeCustomGeometryMainService$Wonderjs from "../geometry/custom/DisposeCustomGeometryMainService.js";
import * as DisposeObjectInstanceMainService$Wonderjs from "../instance/DisposeObjectInstanceMainService.js";
import * as DisposeSourceInstanceMainService$Wonderjs from "../instance/DisposeSourceInstanceMainService.js";
import * as MaterialArrayForWorkerInitService$Wonderjs from "../../../primitive/material/MaterialArrayForWorkerInitService.js";
import * as DisposeArcballCameraControllerMainService$Wonderjs from "../camera_controller/arcball/DisposeArcballCameraControllerMainService.js";
import * as DisposePerspectiveCameraProjectionService$Wonderjs from "../../../record/main/perspective_camera_projection/DisposePerspectiveCameraProjectionService.js";

var _removeComponent = ComponentMapService$Wonderjs.removeComponent;

function deferDisposeBasicCameraViewComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedBasicCameraViewArray */6] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedBasicCameraViewArray */6]);
  newrecord$1[/* basicCameraViewMap */23] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* basicCameraViewMap */23]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposePerspectiveCameraProjectionComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedPerspectiveCameraProjectionArray */9] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedPerspectiveCameraProjectionArray */9]);
  newrecord$1[/* perspectiveCameraProjectionMap */24] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* perspectiveCameraProjectionMap */24]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeArcballCameraControllerComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedArcballCameraControllerArray */10] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedArcballCameraControllerArray */10]);
  newrecord$1[/* arcballCameraControllerMap */25] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* arcballCameraControllerMap */25]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeTransformComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedTransformArray */7] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedTransformArray */7]);
  newrecord$1[/* transformMap */22] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* transformMap */22]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeTransformComponentForKeepOrder(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedTransformArrayForKeepOrder */8] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedTransformArrayForKeepOrder */8]);
  newrecord$1[/* transformMap */22] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* transformMap */22]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeBasicMaterialComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedBasicMaterialArray */11] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedBasicMaterialArray */11]);
  newrecord$1[/* basicMaterialMap */27] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* basicMaterialMap */27]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeLightMaterialComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedLightMaterialArray */12] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedLightMaterialArray */12]);
  newrecord$1[/* lightMaterialMap */28] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* lightMaterialMap */28]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeBoxGeometryComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedBoxGeometryArray */13] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedBoxGeometryArray */13]);
  newrecord$1[/* geometryDataMap */21] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* geometryDataMap */21]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeCustomGeometryComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedCustomGeometryArray */14] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedCustomGeometryArray */14]);
  newrecord$1[/* geometryDataMap */21] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* geometryDataMap */21]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeSourceInstanceComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedSourceInstanceArray */15] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedSourceInstanceArray */15]);
  newrecord$1[/* sourceInstanceMap */29] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* sourceInstanceMap */29]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeObjectInstanceComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedObjectInstanceArray */16] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedObjectInstanceArray */16]);
  newrecord$1[/* objectInstanceMap */30] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* objectInstanceMap */30]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeDirectionLightComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedDirectionLightArray */17] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedDirectionLightArray */17]);
  newrecord$1[/* directionLightMap */31] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* directionLightMap */31]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposePointLightComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedPointLightArray */18] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedPointLightArray */18]);
  newrecord$1[/* pointLightMap */32] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* pointLightMap */32]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeMeshRendererComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedMeshRendererComponentArray */19] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedMeshRendererComponentArray */19]);
  newrecord$1[/* meshRendererMap */26] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* meshRendererMap */26]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function batchDisposeBasicCameraViewComponent(state, componentArray) {
  var basicCameraViewRecord = state[/* basicCameraViewRecord */13];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicCameraViewRecord */13] = ComponentMapService$Wonderjs.batchDisposeComponent(basicCameraViewRecord, DisposeBasicCameraViewService$Wonderjs.handleBatchDisposeComponent, componentArray);
  return newrecord;
}

function batchDisposePerspectiveCameraProjectionComponent(state, componentArray) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* perspectiveCameraProjectionRecord */14] = ComponentMapService$Wonderjs.batchDisposeComponent(perspectiveCameraProjectionRecord, DisposePerspectiveCameraProjectionService$Wonderjs.handleBatchDisposeComponent, componentArray);
  return newrecord;
}

function batchDisposeArcballCameraControllerComponent(state, componentArray) {
  return DisposeArcballCameraControllerMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
}

function batchDisposeMeshRendererComponent(state, componentArray) {
  var meshRendererRecord = state[/* meshRendererRecord */24];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* meshRendererRecord */24] = DisposeMeshRendererService$Wonderjs.handleBatchDisposeComponent(componentArray, meshRendererRecord);
  return newrecord;
}

function batchDisposeTransformComponent(state, isKeepOrder, componentArray) {
  return DisposeTransformMainService$Wonderjs.handleBatchDisposeComponent(componentArray, MemorySettingService$Wonderjs.getMaxTypeArrayPoolSize(state[/* settingRecord */0]), isKeepOrder, state);
}

function batchDisposeBoxGeometryComponent(state, componentArray) {
  return DisposeBoxGeometryMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
}

function batchDisposeCustomGeometryComponent(state, componentArray) {
  return DisposeCustomGeometryMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
}

function batchDisposeBasicMaterialComponent(state, componentArray) {
  return DisposeBasicMaterialMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
}

function batchDisposeBasicMaterialComponentForWorker(state, componentArray) {
  var state$1 = DisposeBasicMaterialMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
  var record = RecordBasicMaterialMainService$Wonderjs.getRecord(state$1);
  var materialArrayForWorkerInit = record[/* materialArrayForWorkerInit */11];
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */record[/* index */0],
    /* buffer */record[/* buffer */1],
    /* shaderIndices */record[/* shaderIndices */2],
    /* colors */record[/* colors */3],
    /* textureIndices */record[/* textureIndices */4],
    /* mapUnits */record[/* mapUnits */5],
    /* textureCountMap */record[/* textureCountMap */6],
    /* defaultColor */record[/* defaultColor */7],
    /* gameObjectMap */record[/* gameObjectMap */8],
    /* groupCountMap */record[/* groupCountMap */9],
    /* disposedIndexArray */record[/* disposedIndexArray */10],
    /* materialArrayForWorkerInit */MaterialArrayForWorkerInitService$Wonderjs.removeDisposedOnesFromMaterialArrayForWorkerInit(componentArray, materialArrayForWorkerInit)
  ];
  return newrecord;
}

function batchDisposeLightMaterialComponent(state, componentArray) {
  return DisposeLightMaterialMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
}

function batchDisposeLightMaterialComponentForWorker(state, componentArray) {
  var state$1 = DisposeLightMaterialMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
  var record = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
  var materialArrayForWorkerInit = record[/* materialArrayForWorkerInit */17];
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */record[/* index */0],
    /* buffer */record[/* buffer */1],
    /* shaderIndices */record[/* shaderIndices */2],
    /* diffuseColors */record[/* diffuseColors */3],
    /* specularColors */record[/* specularColors */4],
    /* shininess */record[/* shininess */5],
    /* textureIndices */record[/* textureIndices */6],
    /* diffuseMapUnits */record[/* diffuseMapUnits */7],
    /* specularMapUnits */record[/* specularMapUnits */8],
    /* textureCountMap */record[/* textureCountMap */9],
    /* defaultDiffuseColor */record[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */record[/* defaultSpecularColor */11],
    /* defaultShininess */record[/* defaultShininess */12],
    /* gameObjectMap */record[/* gameObjectMap */13],
    /* groupCountMap */record[/* groupCountMap */14],
    /* disposedIndexArray */record[/* disposedIndexArray */15],
    /* nameMap */record[/* nameMap */16],
    /* materialArrayForWorkerInit */MaterialArrayForWorkerInitService$Wonderjs.removeDisposedOnesFromMaterialArrayForWorkerInit(componentArray, materialArrayForWorkerInit)
  ];
  return newrecord;
}

function batchDisposeDirectionLightComponent(state, componentArray) {
  var directionLightRecord = state[/* directionLightRecord */20];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* directionLightRecord */20] = ComponentMapService$Wonderjs.batchDisposeComponent(directionLightRecord, DisposeDirectionLightService$Wonderjs.handleBatchDisposeComponent, componentArray);
  return newrecord;
}

function batchDisposePointLightComponent(state, componentArray) {
  var pointLightRecord = state[/* pointLightRecord */21];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* pointLightRecord */21] = ComponentMapService$Wonderjs.batchDisposeComponent(pointLightRecord, DisposePointLightService$Wonderjs.handleBatchDisposeComponent, componentArray);
  return newrecord;
}

function batchDisposeSourceInstanceComponent(state, isKeepOrder, disposeGameObjectFunc, componentArray) {
  return DisposeSourceInstanceMainService$Wonderjs.handleBatchDisposeComponent(componentArray, isKeepOrder, disposeGameObjectFunc, state);
}

function batchDisposeObjectInstanceComponent(state, componentArray) {
  var match = componentArray.length;
  if (match !== 0) {
    return DisposeObjectInstanceMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
  } else {
    return state;
  }
}

export {
  _removeComponent ,
  deferDisposeBasicCameraViewComponent ,
  deferDisposePerspectiveCameraProjectionComponent ,
  deferDisposeArcballCameraControllerComponent ,
  deferDisposeTransformComponent ,
  deferDisposeTransformComponentForKeepOrder ,
  deferDisposeBasicMaterialComponent ,
  deferDisposeLightMaterialComponent ,
  deferDisposeBoxGeometryComponent ,
  deferDisposeCustomGeometryComponent ,
  deferDisposeSourceInstanceComponent ,
  deferDisposeObjectInstanceComponent ,
  deferDisposeDirectionLightComponent ,
  deferDisposePointLightComponent ,
  deferDisposeMeshRendererComponent ,
  batchDisposeBasicCameraViewComponent ,
  batchDisposePerspectiveCameraProjectionComponent ,
  batchDisposeArcballCameraControllerComponent ,
  batchDisposeMeshRendererComponent ,
  batchDisposeTransformComponent ,
  batchDisposeBoxGeometryComponent ,
  batchDisposeCustomGeometryComponent ,
  batchDisposeBasicMaterialComponent ,
  batchDisposeBasicMaterialComponentForWorker ,
  batchDisposeLightMaterialComponent ,
  batchDisposeLightMaterialComponentForWorker ,
  batchDisposeDirectionLightComponent ,
  batchDisposePointLightComponent ,
  batchDisposeSourceInstanceComponent ,
  batchDisposeObjectInstanceComponent ,
  
}
/* ArrayService-Wonderjs Not a pure module */
