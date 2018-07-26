

import * as Most from "most";
import * as Blob$Wonderjs from "../../external/Blob.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as BinaryUtils$Wonderjs from "../utils/BinaryUtils.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";
import * as LoadImageSystem$Wonderjs from "../loader/LoadImageSystem.js";
import * as BatchCreateSystem$Wonderjs from "./BatchCreateSystem.js";
import * as BatchOperateSystem$Wonderjs from "./BatchOperateSystem.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as SetIMGUIFuncSystem$Wonderjs from "./SetIMGUIFuncSystem.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BuildRootGameObjectSystem$Wonderjs from "./BuildRootGameObjectSystem.js";

function _getArrayBuffer(binBuffer, bufferView, bufferViews) {
  var match = bufferViews[bufferView];
  var byteOffset = match[/* byteOffset */1];
  return binBuffer.slice(byteOffset, byteOffset + match[/* byteLength */2] | 0);
}

function _buildImageArray(param, binBuffer) {
  var bufferViews = param[/* bufferViews */8];
  var images = param[/* images */4];
  var blobObjectUrlImageArr = /* array */[];
  var match = OptionService$Wonderjs.isJsonSerializedValueNone(images);
  return Most.drain(Most.mergeArray(match ? blobObjectUrlImageArr : ArrayService$WonderCommonlib.reduceOneParami((function (streamArr, param, imageIndex) {
                            var arrayBuffer = _getArrayBuffer(binBuffer, param[/* bufferView */0], bufferViews);
                            var blob = Blob$Wonderjs.newBlobFromArrayBuffer(arrayBuffer, param[/* mimeType */1]);
                            return ArrayService$Wonderjs.push(Most.tap((function (image) {
                                              Blob$Wonderjs.revokeObjectURL(blob);
                                              ArrayService$Wonderjs.push(image, blobObjectUrlImageArr);
                                              return /* () */0;
                                            }), LoadImageSystem$Wonderjs.loadBlobImage(Blob$Wonderjs.createObjectURL(blob), "load image error. imageIndex: " + (String(imageIndex) + ""))), streamArr);
                          }), /* array */[], OptionService$Wonderjs.unsafeGetJsonSerializedValue(images)))).then((function () {
                return Promise.resolve(blobObjectUrlImageArr);
              }));
}

function _buildBufferArray(buffers, binBuffer) {
  Contract$WonderLog.requireCheck((function () {
          var bufferLen = buffers.length;
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("has only one buffer", "has " + (String(bufferLen) + "")), (function () {
                        return Contract$WonderLog.Operators[/* = */0](bufferLen, 1);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return /* array */[binBuffer];
}

function _checkWDB(dataView) {
  Contract$WonderLog.requireCheck((function () {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("Source file to be a WDB (wd Binary) model", "not"), (function () {
                  var match = DataViewCommon$Wonderjs.getUint32_1(0, dataView);
                  return Contract$WonderLog.Operators[/* = */0](match[0], 1179937896);
                }));
          var match = DataViewCommon$Wonderjs.getUint32_1(4, dataView);
          var readVersion = match[0];
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("Only WDB version 1 is supported", "Detected version: " + (String(readVersion) + "")), (function () {
                        return Contract$WonderLog.Operators[/* = */0](readVersion, 1);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return dataView;
}

function assembleGLBData(wd, binBuffer, state) {
  var buffers = wd[/* buffers */7];
  return Most.fromPromise(_buildImageArray(wd, binBuffer).then((function (blobObjectUrlImageArr) {
                    return Promise.resolve(BuildRootGameObjectSystem$Wonderjs.build(wd, BatchOperateSystem$Wonderjs.batchOperate(wd, blobObjectUrlImageArr, _buildBufferArray(buffers, binBuffer), BatchCreateSystem$Wonderjs.batchCreate(wd, SetIMGUIFuncSystem$Wonderjs.setIMGUIFunc(wd, state)))));
                  })));
}

function assemble(wdb, state) {
  var match = BinaryUtils$Wonderjs.decode(wdb, _checkWDB);
  return assembleGLBData(JSON.parse(match[0]), match[1], state);
}

export {
  _getArrayBuffer ,
  _buildImageArray ,
  _buildBufferArray ,
  _checkWDB ,
  assembleGLBData ,
  assemble ,
  
}
/* most Not a pure module */
