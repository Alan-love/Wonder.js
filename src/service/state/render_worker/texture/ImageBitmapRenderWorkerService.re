open StateDataRenderWorkerType;

open BrowserDetectType;

open BrowserType;

let _createImageBitmapForChrome:
  (CanvasType.imageData, Js.t({..})) => Js.Promise.t(WorkerType.imageBitmap) = [%bs.raw
  (imageData, config) => {|
        return createImageBitmap(imageData, config)
    |}
];

let _createImageBitmapForFirefox:
  CanvasType.imageData => Js.Promise.t(WorkerType.imageBitmap) = [%bs.raw
  imageData => {|
        return createImageBitmap(imageData)
    |}
];

let createImageBitmap =
    ((imageArrayBuffer, width, height), getFlipYFunc, state) => {
  let imageData =
    Canvas.newImageData(
      Canvas.newUint8ClampedArray(imageArrayBuffer),
      width,
      height,
    );
  let {browser} = RecordBrowserDetectRenderWorkerService.getRecord(state);

  switch (browser) {
  | Chrome =>
    _createImageBitmapForChrome(
      imageData,
      {"imageOrientation": getFlipYFunc(state) === true ? "flipY" : "none"},
    )
  | Firefox => _createImageBitmapForFirefox(imageData)
  | _ =>
    RecordBrowserDetectAllService.fatalUnknownBrowser(
      "_createImageBitmap",
      browser,
    )
  };
};