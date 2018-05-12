open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test init texture render worker job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => TestWorkerTool.clear(sandbox));
      describe(
        "init all textures",
        () => {
          let _buildFakeContext = (imageDataArrayBuffer1, imageDataArrayBuffer2) => {
            let getImageData =
              createEmptyStubWithJsObjSandbox(sandbox)
              |> onCall(0)
              |> returns({"data": {"buffer": imageDataArrayBuffer1}})
              |> onCall(1)
              |> returns({"data": {"buffer": imageDataArrayBuffer2}});
            {"drawImage": createEmptyStubWithJsObjSandbox(sandbox), "getImageData": getImageData}
          };
          let _buildFakeCanvas = (context) =>
            {
              "width": 0.,
              "height": 0.,
              "style": {"left": "", "top": "", "width": "", "height": "", "position": "static"},
              "getContext": createEmptyStubWithJsObjSandbox(sandbox) |> returns(context)
            }
            |> SettingWorkerTool.addTransferControlToOffscreen;
          let _prepareState = (imageDataArrayBuffer1, imageDataArrayBuffer2) => {
            let context = _buildFakeContext(imageDataArrayBuffer1, imageDataArrayBuffer2);
            let canvas =
              SettingWorkerTool.buildFakeCanvasForNotPassCanvasIdWithCanvas(
                sandbox,
                _buildFakeCanvas(context)
              );
            let state =
              TestMainWorkerTool.initWithJobConfig(
                ~sandbox,
                ~workerJobRecord=WorkerJobTool.buildWorkerJobConfig(),
                ()
              );
            (state, context)
          };
          let _prepare = () => {
            let imageDataArrayBuffer1 = Obj.magic(11);
            let imageDataArrayBuffer2 = Obj.magic(12);
            let (state, context) = _prepareState(imageDataArrayBuffer1, imageDataArrayBuffer2);
            let (state, map1) = TextureAPI.createTexture(state);
            let (state, map2) = TextureAPI.createTexture(state);
            let source1 = TextureTool.buildSource(100, 200);
            let source2 = TextureTool.buildSource(110, 210);
            let state = state |> TextureAPI.setTextureSource(map1, source1);
            let state = state |> TextureAPI.setTextureSource(map2, source2);
            let state =
              state |> FakeGlWorkerTool.setFakeGl(FakeGlWorkerTool.buildFakeGl(~sandbox, ()));
            (
              state,
              context,
              (imageDataArrayBuffer1, imageDataArrayBuffer2),
              (map1, map2),
              (source1, source2)
            )
          };
          describe(
            "test init two textures",
            () => {
              describe(
                "test send init data to render worker",
                () =>
                  describe(
                    "send needAddedImageDataArray",
                    () =>
                      testPromise(
                        "convert source to imageData",
                        () => {
                          let (
                            state,
                            context,
                            (imageDataArrayBuffer1, imageDataArrayBuffer2),
                            (map1, map2),
                            (source1, source2)
                          ) =
                            _prepare();
                          let drawImage = context##drawImage;
                          let getImageData = context##getImageData;
                          MainInitJobMainWorkerTool.prepare()
                          |> MainInitJobMainWorkerTool.test(
                               sandbox,
                               (state) =>
                                 WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state),
                               (postMessageToRenderWorker) =>
                                 (
                                   postMessageToRenderWorker
                                   |> withOneArg(
                                        SendInitRenderDataWorkerTool.buildInitRenderData(
                                          ~textureData={
                                            "buffer": Sinon.matchAny,
                                            "index": 2,
                                            "needAddedImageDataArray": [|
                                              (
                                                imageDataArrayBuffer1,
                                                source1##width,
                                                source1##height,
                                                0
                                              ),
                                              (
                                                imageDataArrayBuffer2,
                                                source2##width,
                                                source2##height,
                                                1
                                              )
                                            |]
                                          },
                                          ()
                                        )
                                      )
                                   |> getCallCount,
                                   drawImage |> withThreeArgs(source1, 0., 0.) |> getCallCount,
                                   drawImage |> withThreeArgs(source2, 0., 0.) |> getCallCount,
                                   getImageData
                                   |> withFourArgs(0., 0., source1##width, source1##height)
                                   |> getCallCount,
                                   getImageData
                                   |> withFourArgs(0., 0., source2##width, source2##height)
                                   |> getCallCount
                                 )
                                 |> expect == (1, 1, 1, 1, 1)
                             )
                        }
                      )
                  )
              );
              describe(
                "test render worker job",
                () => {
                  let _buildFakeCreateImageBitmapFunc = [%bs.raw
                    {|
  function(){
    window.createImageBitmap = function(imageData, config){

    return new Promise(function(resolve, reject){
      resolve([imageData.uint8ClampedArray.arrayBuffer, imageData.width, imageData.height, config ]);
    }) ;
  }


window.ImageData = function(uint8ClampedArray, width, height){
  this.uint8ClampedArray = uint8ClampedArray;
  this.width = width;
  this.height = height;
}


window.Uint8ClampedArray = function(arrayBuffer){
  this.arrayBuffer = arrayBuffer;
}

  }
  |}
                  ];
                  let _clearFakeCreateImageBitmapFunc = [%bs.raw
                    {|
  function(){
    window.createImageBitmap = undefined;
  }
  |}
                  ];
                  beforeAllPromise(() => _buildFakeCreateImageBitmapFunc());
                  afterAllPromise(() => _clearFakeCreateImageBitmapFunc());
                  describe(
                    "add source to sourceMap",
                    () => {
                      /* TODO test not flipY */
                      testPromise(
                        "test for chrome",
                        () => {
                          let (
                            state,
                            context,
                            (imageDataArrayBuffer1, imageDataArrayBuffer2),
                            (map1, map2),
                            (source1, source2)
                          ) =
                            _prepare();
                          BrowserDetectTool.setChrome();
                          RenderJobsRenderWorkerTool.init(
                            (state) =>
                              (
                                TextureRenderWorkerTool.unsafeGetSource(
                                  map1,
                                  RenderWorkerStateTool.unsafeGetState()
                                )
                                |> Obj.magic,
                                TextureRenderWorkerTool.unsafeGetSource(
                                  map2,
                                  RenderWorkerStateTool.unsafeGetState()
                                )
                                |> Obj.magic
                              )
                              |>
                              expect == (
                                          [|
                                            imageDataArrayBuffer1,
                                            source1##width,
                                            source1##height,
                                            {"imageOrientation": "flipY"} |> Obj.magic
                                          |],
                                          [|
                                            imageDataArrayBuffer2,
                                            source2##width,
                                            source2##height,
                                            {"imageOrientation": "flipY"} |> Obj.magic
                                          |]
                                        )
                              |> resolve,
                            state
                          )
                        }
                      );
                      testPromise(
                        "test for firefox",
                        () => {
                          let (
                            state,
                            context,
                            (imageDataArrayBuffer1, imageDataArrayBuffer2),
                            (map1, map2),
                            (source1, source2)
                          ) =
                            _prepare();
                          BrowserDetectTool.setFirefox();
                          RenderJobsRenderWorkerTool.init(
                            (state) =>
                              (
                                TextureRenderWorkerTool.unsafeGetSource(
                                  map1,
                                  RenderWorkerStateTool.unsafeGetState()
                                )
                                |> Obj.magic,
                                TextureRenderWorkerTool.unsafeGetSource(
                                  map2,
                                  RenderWorkerStateTool.unsafeGetState()
                                )
                                |> Obj.magic
                              )
                              |>
                              expect == (
                                          [|
                                            imageDataArrayBuffer1,
                                            source1##width,
                                            source1##height,
                                            Js.Undefined.empty |> Obj.magic
                                          |],
                                          [|
                                            imageDataArrayBuffer2,
                                            source2##width,
                                            source2##height,
                                            Js.Undefined.empty |> Obj.magic
                                          |]
                                        )
                              |> resolve,
                            state
                          )
                        }
                      )
                    }
                  );
                  describe(
                    "create gl texture",
                    () =>
                      testPromise(
                        "test create",
                        () => {
                          let (
                            state,
                            context,
                            (imageDataArrayBuffer1, imageDataArrayBuffer2),
                            (map1, map2),
                            (source1, source2)
                          ) =
                            _prepare();
                          let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
                          let state =
                            state
                            |> FakeGlWorkerTool.setFakeGl(
                                 FakeGlWorkerTool.buildFakeGl(~sandbox, ~createTexture, ())
                               );
                          BrowserDetectTool.setChrome();
                          RenderJobsRenderWorkerTool.init(
                            (state) => createTexture |> expect |> toCalledTwice |> resolve,
                            state
                          )
                        }
                      )
                  )
                }
              )
            }
          )
        }
      )
    }
  );