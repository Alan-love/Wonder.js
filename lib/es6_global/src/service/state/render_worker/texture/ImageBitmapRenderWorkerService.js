

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as RecordBrowserDetectAllService$Wonderjs from "../../../record/all/browserDetect/RecordBrowserDetectAllService.js";
import * as RecordBrowserDetectRenderWorkerService$Wonderjs from "../browserDetect/RecordBrowserDetectRenderWorkerService.js";

var _createImageBitmapForChrome = function (imageData,config){
        return createImageBitmap(imageData, config)
    };

var _createImageBitmapForFirefox = function (imageData){
        return createImageBitmap(imageData)
    };

function createImageBitmapFromImageData(param, getFlipYFunc, state) {
  var imageData = new ImageData(new Uint8ClampedArray(param[0]), param[1], param[2]);
  var match = RecordBrowserDetectRenderWorkerService$Wonderjs.getRecord(state);
  var browser = match[/* browser */0];
  if (browser !== 1) {
    if (browser !== 0) {
      return RecordBrowserDetectAllService$Wonderjs.fatalUnknownBrowser("_createImageBitmap", browser);
    } else {
      var match$1 = Curry._1(getFlipYFunc, state) === true;
      return _createImageBitmapForChrome(imageData, {
                  imageOrientation: match$1 ? "flipY" : "none"
                });
    }
  } else {
    return _createImageBitmapForFirefox(imageData);
  }
}

export {
  _createImageBitmapForChrome ,
  _createImageBitmapForFirefox ,
  createImageBitmapFromImageData ,
  
}
/* RecordBrowserDetectAllService-Wonderjs Not a pure module */
