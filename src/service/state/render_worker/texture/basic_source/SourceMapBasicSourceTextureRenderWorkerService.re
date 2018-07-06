open StateDataRenderWorkerType;

open RenderWorkerBasicSourceTextureType;

open BrowserDetectType;

open BrowserType;

let _createImageBitmapForChrome:
  (CanvasType.imageData, Js.t({..})) => Js.Promise.t(imageBitmap) = [%bs.raw
  {|
    function(imageData, config){
        return createImageBitmap(imageData, config)
    }
    |}
];

let _createImageBitmapForFirefox:
  CanvasType.imageData => Js.Promise.t(imageBitmap) = [%bs.raw
  {|
    function(imageData){
        return createImageBitmap(imageData)
    }
    |}
];

let _createImageBitmap = (texture, imageData, state) => {
  let {browser} = RecordBrowserDetectRenderWorkerService.getRecord(state);
  switch (browser) {
  | Chrome =>
    let {flipYs} =
      RecordBasicSourceTextureRenderWorkerService.getRecord(state);
    let flipY =
      OperateTypeArrayBasicSourceTextureService.isFlipY(
        texture,
        flipYs |> OptionService.unsafeGet,
      );
    _createImageBitmapForChrome(
      imageData,
      {"imageOrientation": flipY === true ? "flipY" : "none"},
    );
  | Firefox => _createImageBitmapForFirefox(imageData)
  | _ =>
    RecordBrowserDetectAllService.fatalUnknownBrowser(
      "_createImageBitmap",
      browser,
    )
  };
};

let _addSource = (texture, imageBitmap, state) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let {sourceMap} =
        RecordBasicSourceTextureRenderWorkerService.getRecord(state);
      test(
        Log.buildAssertMessage(
          ~expect={j|sourceMap shouldn't has source before|j},
          ~actual={j|has|j},
        ),
        () =>
        TextureSourceMapService.hasSource(texture, sourceMap) |> assertFalse
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  let {sourceMap} =
    RecordBasicSourceTextureRenderWorkerService.getRecord(state);
  TextureSourceMapService.addSource(texture, imageBitmap, sourceMap) |> ignore;
  state;
};

let _convertImageSrcToImageBitmapStream =
    (imageArrayBufferIndexSizeDataArr, state) =>
  Most.from(imageArrayBufferIndexSizeDataArr)
  |> Most.flatMap(((arrayBuffer, width, height, texture)) =>
       _createImageBitmap(
         texture,
         Canvas.newImageData(
           Canvas.newUint8ClampedArray(arrayBuffer),
           width,
           height,
         ),
         state,
       )
       |> Most.fromPromise
       |> Most.map(imageBitmap => _addSource(texture, imageBitmap, state))
     );

let addSourceFromImageDataStream = (imageArrayBufferIndexSizeDataArr, state) =>
  _convertImageSrcToImageBitmapStream(
    imageArrayBufferIndexSizeDataArr,
    state,
  );