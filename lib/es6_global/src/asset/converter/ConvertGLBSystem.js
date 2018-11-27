

import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as GLTFUtils$Wonderjs from "../utils/GLTFUtils.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";
import * as TypeArrayService$Wonderjs from "../../service/primitive/buffer/TypeArrayService.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ConvertImagesSystem$Wonderjs from "./ConvertImagesSystem.js";
import * as ConvertLightsSystem$Wonderjs from "./ConvertLightsSystem.js";
import * as ConvertStreamSystem$Wonderjs from "./ConvertStreamSystem.js";
import * as ConvertBuffersSystem$Wonderjs from "./ConvertBuffersSystem.js";
import * as ConvertCamerasSystem$Wonderjs from "./ConvertCamerasSystem.js";
import * as ConvertIndicesSystem$Wonderjs from "./indices/ConvertIndicesSystem.js";
import * as ConvertTexturesSystem$Wonderjs from "./ConvertTexturesSystem.js";
import * as ConvertGeometrysSystem$Wonderjs from "./ConvertGeometrysSystem.js";
import * as ConvertMaterialsSystem$Wonderjs from "./ConvertMaterialsSystem.js";
import * as ConvertTransformsSystem$Wonderjs from "./ConvertTransformsSystem.js";
import * as ConvertGameObjectsSystem$Wonderjs from "./ConvertGameObjectsSystem.js";
import * as ConvertMeshRenderersSystem$Wonderjs from "./ConvertMeshRenderersSystem.js";
import * as ConvertDefaultMaterialSystem$Wonderjs from "./ConvertDefaultMaterialSystem.js";
import * as ConvertMultiPrimitivesSystem$Wonderjs from "./ConvertMultiPrimitivesSystem.js";
import * as ConvertGLTFJsonToRecordSystem$Wonderjs from "./ConvertGLTFJsonToRecordSystem.js";

function _convertIMGUI(extras) {
  if (extras !== undefined) {
    var imgui = extras[/* imgui */0];
    if (imgui !== undefined) {
      var match = imgui;
      return /* record */[
              /* imguiFunc */match[/* imguiFunc */0],
              /* customData */match[/* customData */1]
            ];
    } else {
      return undefined;
    }
  }
  
}

function _convertToScene(ambientLightArr, param) {
  var scenes = param[/* scenes */1];
  Contract$WonderLog.requireCheck((function () {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("only has one scene", "not"), (function () {
                  return Contract$WonderLog.Operators[/* = */0](scenes.length, 1);
                }));
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("has one ambientLight at most", "not"), (function () {
                        return Contract$WonderLog.Operators[/* <= */11](ambientLightArr.length, 1);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = ConvertCommon$Wonderjs.getScene(scenes, param[/* scene */2]);
  var match$1 = ambientLightArr.length === 1;
  return /* record */[
          /* gameObjects */OptionService$Wonderjs.unsafeGet(match[/* nodes */0]),
          /* ambientLight */match$1 ? /* record */[/* color */Caml_array.caml_array_get(ambientLightArr, 0)[/* color */0]] : undefined,
          /* imgui */_convertIMGUI(match[/* extras */2])
        ];
}

function _checkAndWarn(gltf) {
  var hasTexCoord_1 = /* record */[/* contents */false];
  ArrayService$WonderCommonlib.forEach((function (param) {
          var match = param[/* primitives */0][0];
          var match$1 = Js_option.isSome(match[/* attributes */0][/* texCoord_1 */3]);
          if (match$1) {
            hasTexCoord_1[0] = true;
            return /* () */0;
          } else {
            return /* () */0;
          }
        }), gltf[/* meshes */11]);
  var match = hasTexCoord_1[0];
  if (match) {
    Log$WonderLog.warn("not support texCoord_1");
  }
  return gltf;
}

function _buildWDBJsonUint8Array(gltf) {
  var gltf$1 = _checkAndWarn(gltf);
  var gltf$2 = ConvertDefaultMaterialSystem$Wonderjs.convert(ConvertMultiPrimitivesSystem$Wonderjs.convertMultiPrimitivesToNodes(gltf$1));
  var transforms = ConvertTransformsSystem$Wonderjs.convertToTransforms(gltf$2);
  var match = ConvertStreamSystem$Wonderjs.buildJsonData(transforms, gltf$2);
  var gltf$3 = match[2];
  var match$1 = ConvertLightsSystem$Wonderjs.convertToLights(gltf$3);
  var indices = ConvertIndicesSystem$Wonderjs.convertToIndices(gltf$3);
  var encoder = new TextEncoder();
  return /* tuple */[
          match[0],
          match[1],
          encoder.encode(JSON.stringify(/* record */[
                    /* asset : record */[
                      /* version */gltf$2[/* asset */0][/* version */0],
                      /* generator */GLTFUtils$Wonderjs.getGenerator(/* () */0)
                    ],
                    /* scene */_convertToScene(match$1[0], gltf$3),
                    /* indices */indices,
                    /* gameObjects */ConvertGameObjectsSystem$Wonderjs.convert(gltf$3),
                    /* images */ConvertImagesSystem$Wonderjs.convertToImages(gltf$3),
                    /* basicSourceTextures */ConvertTexturesSystem$Wonderjs.convertToBasicSourceTextures(gltf$3),
                    /* samplers */ConvertTexturesSystem$Wonderjs.convertToSamplers(gltf$3),
                    /* buffers */ConvertBuffersSystem$Wonderjs.convertToBuffers(gltf$3),
                    /* bufferViews */ConvertBuffersSystem$Wonderjs.convertToBufferViews(gltf$3),
                    /* accessors */ConvertBuffersSystem$Wonderjs.convertToAccessors(gltf$3),
                    /* directionLights */match$1[1],
                    /* pointLights */match$1[2],
                    /* basicCameraViews */ConvertCamerasSystem$Wonderjs.convertToBasicCameraViews(gltf$3),
                    /* perspectiveCameraProjections */ConvertCamerasSystem$Wonderjs.convertToPerspectiveCameraProjections(gltf$3),
                    /* arcballCameraControllers */ConvertCamerasSystem$Wonderjs.convertToArcballCameraControllers(gltf$3),
                    /* transforms */transforms,
                    /* geometrys */ConvertGeometrysSystem$Wonderjs.convertToGeometrys(gltf$3),
                    /* meshRenderers */ConvertMeshRenderersSystem$Wonderjs.convertToMeshRenderers(indices[/* gameObjectIndices */0][/* geometryGameObjectIndexData */9], gltf$3),
                    /* basicMaterials */ConvertMaterialsSystem$Wonderjs.convertToBasicMaterials(gltf$3),
                    /* lightMaterials */ConvertMaterialsSystem$Wonderjs.convertToLightMaterials(gltf$3)
                  ]))
        ];
}

function _writeHeader(totalByteLength, jsonChunkByteLength, streamChunkByteLength, binBufferChunkByteLength, dataView) {
  var __x = DataViewCommon$Wonderjs.writeUint32_1(1179937896, 0, dataView);
  var __x$1 = DataViewCommon$Wonderjs.writeUint32_1(1, __x, dataView);
  var __x$2 = DataViewCommon$Wonderjs.writeUint32_1(totalByteLength, __x$1, dataView);
  var __x$3 = DataViewCommon$Wonderjs.writeUint32_1(jsonChunkByteLength, __x$2, dataView);
  var __x$4 = DataViewCommon$Wonderjs.writeUint32_1(streamChunkByteLength, __x$3, dataView);
  return DataViewCommon$Wonderjs.writeUint32_1(binBufferChunkByteLength, __x$4, dataView);
}

function _writeJson(byteOffset, param, dataView) {
  return BufferUtils$Wonderjs.copyUint8ArrayToArrayBuffer(byteOffset, /* tuple */[
              param[0],
              param[1],
              param[2]
            ], dataView);
}

function _getEmptyEncodedUint8Data() {
  var encoder = new TextEncoder();
  var emptyUint8DataArr = encoder.encode(" ");
  return TypeArrayService$Wonderjs.getUint8_1(0, emptyUint8DataArr);
}

function _convertGLBToWDB(gltf, binBuffer) {
  var match = _buildWDBJsonUint8Array(gltf);
  var jsonUint8Array = match[2];
  var streamChunkArr = match[1];
  var bufferViewDataArr = match[0];
  var jsonChunkByteLength = jsonUint8Array.byteLength;
  var jsonChunkAlignedByteLength = BufferUtils$Wonderjs.alignedLength(jsonChunkByteLength);
  var totalByteLength = ((BufferUtils$Wonderjs.getWDBHeaderTotalByteLength(/* () */0) + jsonChunkAlignedByteLength | 0) + BufferUtils$Wonderjs.alignedLength(ConvertStreamSystem$Wonderjs.getStreamChunkTotalByteLength(streamChunkArr)) | 0) + ConvertStreamSystem$Wonderjs.getBinBufferChunkTotalAlignedByteLength(bufferViewDataArr) | 0;
  var wdb = new ArrayBuffer(totalByteLength);
  var dataView = DataViewCommon$Wonderjs.create(wdb);
  var byteOffset = _writeHeader(totalByteLength, jsonChunkByteLength, ConvertStreamSystem$Wonderjs.getStreamChunkTotalByteLength(streamChunkArr), ConvertStreamSystem$Wonderjs.getBinBufferChunkTotalAlignedByteLength(bufferViewDataArr), dataView);
  var emptyEncodedUint8Data = _getEmptyEncodedUint8Data(/* () */0);
  var match$1 = _writeJson(byteOffset, /* tuple */[
        emptyEncodedUint8Data,
        jsonChunkAlignedByteLength,
        jsonUint8Array
      ], dataView);
  var match$2 = ConvertStreamSystem$Wonderjs.buildStreamChunk(match$1[0], streamChunkArr, match$1[2]);
  ConvertStreamSystem$Wonderjs.buildBinBufferChunk(match$2[0], bufferViewDataArr, binBuffer, match$2[1]);
  return wdb;
}

function _checkGLB(dataView) {
  Contract$WonderLog.requireCheck((function () {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("Source file to be a GLB (glTF Binary) model", "not"), (function () {
                  var match = DataViewCommon$Wonderjs.getUint32_1(0, dataView);
                  return Contract$WonderLog.Operators[/* = */0](match[0], 1179937895);
                }));
          var match = DataViewCommon$Wonderjs.getUint32_1(4, dataView);
          var readVersion = match[0];
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("Only GLB version 2 is supported", "Detected version: " + (String(readVersion) + "")), (function () {
                        return Contract$WonderLog.Operators[/* = */0](readVersion, 2);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return dataView;
}

function convertGLBData(gltf, binBuffer) {
  return _convertGLBToWDB(ConvertGLTFJsonToRecordSystem$Wonderjs.convert(gltf), binBuffer);
}

function convertGLB(glb) {
  var match = BufferUtils$Wonderjs.decodeGLB(glb, _checkGLB);
  var gltf = JSON.parse(match[0]);
  return _convertGLBToWDB(ConvertGLTFJsonToRecordSystem$Wonderjs.convert(gltf), match[1]);
}

export {
  _convertIMGUI ,
  _convertToScene ,
  _checkAndWarn ,
  _buildWDBJsonUint8Array ,
  _writeHeader ,
  _writeJson ,
  _getEmptyEncodedUint8Data ,
  _convertGLBToWDB ,
  _checkGLB ,
  convertGLBData ,
  convertGLB ,
  
}
/* Log-WonderLog Not a pure module */
