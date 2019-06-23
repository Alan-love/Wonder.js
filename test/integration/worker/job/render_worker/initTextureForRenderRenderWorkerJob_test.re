open Wonder_jest;

open Js.Promise;

let _ =
  describe("test init texture for render render worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestMainWorkerTool.initWithJobConfig(
          ~sandbox,
          ~buffer=SettingTool.buildBufferConfigStr(),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test send render data->init texture to render worker", () => {
      describe("test basic source texture", () => {
        let _prepare = state => {
          let (
            state,
            context,
            (
              imageDataArrayBuffer1,
              imageDataArrayBuffer2,
              imageDataArrayBuffer3,
              imageDataArrayBuffer4,
            ),
            (gameObject1, gameObject2),
            (map1, map2),
            (source1, source2),
          ) =
            BasicSourceTextureRenderWorkerTool.prepareStateAndCreateTwoGameObjects(
              sandbox,
            );
          let state =
            state
            |> GameObjectAPI.initGameObject(gameObject1)
            |> GameObjectAPI.initGameObject(gameObject2);
          (
            state,
            context,
            (
              imageDataArrayBuffer1,
              imageDataArrayBuffer2,
              imageDataArrayBuffer3,
              imageDataArrayBuffer4,
            ),
            (gameObject1, gameObject2),
            (map1, map2),
            (source1, source2),
          );
        };
        describe("test send texture data", () => {
          testPromise(
            "send needAddedImageDataArray, needInitedTextureIndexArray", () => {
            let (
              state,
              context,
              (
                imageDataArrayBuffer1,
                imageDataArrayBuffer2,
                imageDataArrayBuffer3,
                imageDataArrayBuffer4,
              ),
              (gameObject1, gameObject2),
              (map1, map2),
              (source1, source2),
            ) =
              _prepare();
            let renderWorker =
              WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
            let postMessageToRenderWorker =
              WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
            WorkerJobWorkerTool.execMainWorkerJob(
              ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
              ~completeFunc=
                _ =>
                  postMessageToRenderWorker
                  |> expect
                  |> toCalledWith([|
                       SendRenderRenderDataWorkerTool.buildRenderRenderData(
                         ~basicSourceTextureData={
                           "needAddedImageDataArray": [|
                             (
                               imageDataArrayBuffer1,
                               source1##width,
                               source1##height,
                               0,
                             ),
                             (
                               imageDataArrayBuffer2,
                               source2##width,
                               source2##height,
                               1,
                             ),
                           |],
                           "needInitedTextureIndexArray": [|map1, map2|],
                         },
                         (),
                       ),
                     |])
                  |> resolve,
              (),
            );
          });
          testPromise(
            "needAddedImageDataArray, needInitedTextureIndexArray shouldn't contain duplicate data",
            () => {
              let (
                state,
                context,
                (
                  imageDataArrayBuffer1,
                  imageDataArrayBuffer2,
                  imageDataArrayBuffer3,
                  imageDataArrayBuffer4,
                ),
                (gameObject1, gameObject2),
                (map1, map2),
                (source1, source2),
              ) =
                _prepare();
              let state =
                state
                |> BasicSourceTextureAPI.setBasicSourceTextureSource(
                     map1,
                     source1,
                   );
              let state =
                state
                |> BasicSourceTextureAPI.setBasicSourceTextureSource(
                     map2,
                     source2,
                   );
              let state =
                state
                |> GameObjectAPI.initGameObject(gameObject1)
                |> GameObjectAPI.initGameObject(gameObject2);
              let renderWorker =
                WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
              let postMessageToRenderWorker =
                WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
              WorkerJobWorkerTool.execMainWorkerJob(
                ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
                ~completeFunc=
                  _ =>
                    postMessageToRenderWorker
                    |> expect
                    |> toCalledWith([|
                         SendRenderRenderDataWorkerTool.buildRenderRenderData(
                           ~basicSourceTextureData={
                             "needAddedImageDataArray": [|
                               (
                                 imageDataArrayBuffer1,
                                 source1##width,
                                 source1##height,
                                 0,
                               ),
                               (
                                 imageDataArrayBuffer2,
                                 source2##width,
                                 source2##height,
                                 1,
                               ),
                             |],
                             "needInitedTextureIndexArray": [|map1, map2|],
                           },
                           (),
                         ),
                       |])
                    |> resolve,
                (),
              );
            },
          );
        });
        testPromise(
          "clear basicSourceTextureRecord->needAddedSourceArray, needInitedTextureIndexArray after send",
          () => {
            open BasicSourceTextureType;
            let (
              state,
              context,
              (
                imageDataArrayBuffer1,
                imageDataArrayBuffer2,
                imageDataArrayBuffer3,
                imageDataArrayBuffer4,
              ),
              (gameObject1, gameObject2),
              (map1, map2),
              (source1, source2),
            ) =
              _prepare();
            WorkerJobWorkerTool.execMainWorkerJob(
              ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
              ~completeFunc=
                state => {
                  let {needAddedSourceArray, needInitedTextureIndexArray} =
                    BasicSourceTextureTool.getRecord(state);
                  (
                    needAddedSourceArray |> Js.Array.length,
                    needInitedTextureIndexArray |> Js.Array.length,
                  )
                  |> expect == (0, 0)
                  |> resolve;
                },
              (),
            );
          },
        );
      });

      describe("test arrayBufferView source texture", () => {
        let _prepare = state => {
          let (
            state,
            (gameObject1, gameObject2),
            (map1, map2),
            (source1, source2),
          ) =
            ArrayBufferViewSourceTextureRenderWorkerTool.prepareStateAndCreateTwoGameObjects(
              sandbox,
            );
          let state =
            state
            |> GameObjectAPI.initGameObject(gameObject1)
            |> GameObjectAPI.initGameObject(gameObject2);
          (
            state,
            (gameObject1, gameObject2),
            (map1, map2),
            (source1, source2),
          );
        };
        describe("test send texture data", () =>
          testPromise(
            "send needAddedSourceArray, needInitedTextureIndexArray", () => {
            let (
              state,
              (gameObject1, gameObject2),
              (map1, map2),
              (source1, source2),
            ) =
              _prepare();
            let renderWorker =
              WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
            let postMessageToRenderWorker =
              WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
            WorkerJobWorkerTool.execMainWorkerJob(
              ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
              ~completeFunc=
                _ =>
                  postMessageToRenderWorker
                  |> expect
                  |> toCalledWith([|
                       SendRenderRenderDataWorkerTool.buildRenderRenderData(
                         ~arrayBufferViewSourceTextureData={
                           "needAddedSourceArray": [|
                             (map1, source1),
                             (map2, source2),
                           |],
                           "needInitedTextureIndexArray": [|map1, map2|],
                         },
                         (),
                       ),
                     |])
                  |> resolve,
              (),
            );
          })
        );
        testPromise(
          "needAddedSourceArray, needInitedTextureIndexArray shouldn't contain duplicate data",
          () => {
            let (
              state,
              (gameObject1, gameObject2),
              (map1, map2),
              (source1, source2),
            ) =
              _prepare();
            let state =
              state
              |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureSource(
                   map1,
                   source1,
                 );
            let state =
              state
              |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureSource(
                   map2,
                   source2,
                 );
            let state =
              state
              |> GameObjectAPI.initGameObject(gameObject1)
              |> GameObjectAPI.initGameObject(gameObject2);
            let renderWorker =
              WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
            let postMessageToRenderWorker =
              WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
            WorkerJobWorkerTool.execMainWorkerJob(
              ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
              ~completeFunc=
                _ =>
                  postMessageToRenderWorker
                  |> expect
                  |> toCalledWith([|
                       SendRenderRenderDataWorkerTool.buildRenderRenderData(
                         ~arrayBufferViewSourceTextureData={
                           "needAddedSourceArray": [|
                             (map1, source1),
                             (map2, source2),
                           |],
                           "needInitedTextureIndexArray": [|map1, map2|],
                         },
                         (),
                       ),
                     |])
                  |> resolve,
              (),
            );
          },
        );
        testPromise(
          "clear arrayBufferViewSourceTextureRecord->needAddedSourceArray, needInitedTextureIndexArray after send",
          () => {
            open ArrayBufferViewSourceTextureType;
            let (
              state,
              (gameObject1, gameObject2),
              (map1, map2),
              (source1, source2),
            ) =
              _prepare();
            WorkerJobWorkerTool.execMainWorkerJob(
              ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
              ~completeFunc=
                state => {
                  let {needAddedSourceArray, needInitedTextureIndexArray} =
                    ArrayBufferViewSourceTextureTool.getRecord(state);
                  (
                    needAddedSourceArray |> Js.Array.length,
                    needInitedTextureIndexArray |> Js.Array.length,
                  )
                  |> expect == (0, 0)
                  |> resolve;
                },
              (),
            );
          },
        );
      });

      describe("test cubemap texture", () => {
        let _prepare = state => {
          let (
            state,
            context,
            (
              imageDataArrayBuffer1,
              imageDataArrayBuffer2,
              imageDataArrayBuffer3,
              imageDataArrayBuffer4,
              imageDataArrayBuffer5,
              imageDataArrayBuffer6,
              imageDataArrayBuffer7,
              imageDataArrayBuffer8,
              imageDataArrayBuffer9,
              imageDataArrayBuffer10,
              imageDataArrayBuffer11,
              imageDataArrayBuffer12,
            ),
            (map1, map2),
            (allSource1, allSource2),
          ) =
            CubemapTextureRenderWorkerTool.prepareStateAndCreateTwoMaps(
              sandbox,
            );

          let state = WorkerWorkerTool.setFakeWorkersAndSetState(state);

          let state =
            state
            |> CubemapTextureAPI.initCubemapTexture(map1)
            |> CubemapTextureAPI.initCubemapTexture(map2);

          (
            state,
            context,
            (
              imageDataArrayBuffer1,
              imageDataArrayBuffer2,
              imageDataArrayBuffer3,
              imageDataArrayBuffer4,
              imageDataArrayBuffer5,
              imageDataArrayBuffer6,
              imageDataArrayBuffer7,
              imageDataArrayBuffer8,
              imageDataArrayBuffer9,
              imageDataArrayBuffer10,
              imageDataArrayBuffer11,
              imageDataArrayBuffer12,
            ),
            (map1, map2),
            (allSource1, allSource2),
          );
        };
        describe("test send texture data", () => {
          testPromise(
            "send all needAddedImageDataArray data and needInitedTextureIndexArray",
            () => {
            let (
              state,
              context,
              (
                imageDataArrayBuffer1,
                imageDataArrayBuffer2,
                imageDataArrayBuffer3,
                imageDataArrayBuffer4,
                imageDataArrayBuffer5,
                imageDataArrayBuffer6,
                imageDataArrayBuffer7,
                imageDataArrayBuffer8,
                imageDataArrayBuffer9,
                imageDataArrayBuffer10,
                imageDataArrayBuffer11,
                imageDataArrayBuffer12,
              ),
              (map1, map2),
              (
                (
                  pxSource1,
                  nxSource1,
                  pySource1,
                  nySource1,
                  pzSource1,
                  nzSource1,
                ),
                (
                  pxSource2,
                  nxSource2,
                  pySource2,
                  nySource2,
                  pzSource2,
                  nzSource2,
                ),
              ),
            ) =
              _prepare();
            let renderWorker =
              WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
            let postMessageToRenderWorker =
              WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
            WorkerJobWorkerTool.execMainWorkerJob(
              ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
              ~completeFunc=
                _ =>
                  postMessageToRenderWorker
                  |> expect
                  |> toCalledWith([|
                       SendRenderRenderDataWorkerTool.buildRenderRenderData(
                         ~cubemapTextureData={
                           "needAddedPXImageDataArray": [|
                             (
                               imageDataArrayBuffer1,
                               pxSource1##width,
                               pxSource1##height,
                               0,
                             ),
                             (
                               imageDataArrayBuffer2,
                               pxSource2##width,
                               pxSource2##height,
                               1,
                             ),
                           |],
                           "needAddedNXImageDataArray": [|
                             (
                               imageDataArrayBuffer3,
                               nxSource1##width,
                               nxSource1##height,
                               0,
                             ),
                             (
                               imageDataArrayBuffer4,
                               nxSource2##width,
                               nxSource2##height,
                               1,
                             ),
                           |],
                           "needAddedPYImageDataArray": [|
                             (
                               imageDataArrayBuffer5,
                               pySource1##width,
                               pySource1##height,
                               0,
                             ),
                             (
                               imageDataArrayBuffer6,
                               pySource2##width,
                               pySource2##height,
                               1,
                             ),
                           |],
                           "needAddedNYImageDataArray": [|
                             (
                               imageDataArrayBuffer7,
                               nySource1##width,
                               nySource1##height,
                               0,
                             ),
                             (
                               imageDataArrayBuffer8,
                               nySource2##width,
                               nySource2##height,
                               1,
                             ),
                           |],
                           "needAddedPZImageDataArray": [|
                             (
                               imageDataArrayBuffer9,
                               pzSource1##width,
                               pzSource1##height,
                               0,
                             ),
                             (
                               imageDataArrayBuffer10,
                               pzSource2##width,
                               pzSource2##height,
                               1,
                             ),
                           |],
                           "needAddedNZImageDataArray": [|
                             (
                               imageDataArrayBuffer11,
                               nzSource1##width,
                               nzSource1##height,
                               0,
                             ),
                             (
                               imageDataArrayBuffer12,
                               nzSource2##width,
                               nzSource2##height,
                               1,
                             ),
                           |],
                           "needInitedTextureIndexArray": [|map1, map2|],
                         },
                         (),
                       ),
                     |])
                  |> resolve,
              (),
            );
          });
          testPromise(
            "all needAddedImageDataArray data and needInitedTextureIndexArray shouldn't contain duplicate data",
            () => {
              let (
                state,
                context,
                (
                  imageDataArrayBuffer1,
                  imageDataArrayBuffer2,
                  imageDataArrayBuffer3,
                  imageDataArrayBuffer4,
                  imageDataArrayBuffer5,
                  imageDataArrayBuffer6,
                  imageDataArrayBuffer7,
                  imageDataArrayBuffer8,
                  imageDataArrayBuffer9,
                  imageDataArrayBuffer10,
                  imageDataArrayBuffer11,
                  imageDataArrayBuffer12,
                ),
                (map1, map2),
                (
                  (
                    pxSource1,
                    nxSource1,
                    pySource1,
                    nySource1,
                    pzSource1,
                    nzSource1,
                  ),
                  (
                    pxSource2,
                    nxSource2,
                    pySource2,
                    nySource2,
                    pzSource2,
                    nzSource2,
                  ),
                ),
              ) =
                _prepare();
              let state =
                state
                |> CubemapTextureAPI.setCubemapTexturePXSource(
                     map1,
                     pxSource1,
                   );
              let state =
                state
                |> CubemapTextureAPI.setCubemapTexturePYSource(
                     map2,
                     pySource2,
                   );
              let renderWorker =
                WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
              let postMessageToRenderWorker =
                WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
              WorkerJobWorkerTool.execMainWorkerJob(
                ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
                ~completeFunc=
                  _ =>
                    postMessageToRenderWorker
                    |> expect
                    |> toCalledWith([|
                         SendRenderRenderDataWorkerTool.buildRenderRenderData(
                           ~cubemapTextureData={
                             "needAddedPXImageDataArray": [|
                               (
                                 imageDataArrayBuffer1,
                                 pxSource1##width,
                                 pxSource1##height,
                                 0,
                               ),
                               (
                                 imageDataArrayBuffer2,
                                 pxSource2##width,
                                 pxSource2##height,
                                 1,
                               ),
                             |],
                             "needAddedNXImageDataArray": [|
                               (
                                 imageDataArrayBuffer3,
                                 nxSource1##width,
                                 nxSource1##height,
                                 0,
                               ),
                               (
                                 imageDataArrayBuffer4,
                                 nxSource2##width,
                                 nxSource2##height,
                                 1,
                               ),
                             |],
                             "needAddedPYImageDataArray": [|
                               (
                                 imageDataArrayBuffer5,
                                 pySource1##width,
                                 pySource1##height,
                                 0,
                               ),
                               (
                                 imageDataArrayBuffer6,
                                 pySource2##width,
                                 pySource2##height,
                                 1,
                               ),
                             |],
                             "needAddedNYImageDataArray": [|
                               (
                                 imageDataArrayBuffer7,
                                 nySource1##width,
                                 nySource1##height,
                                 0,
                               ),
                               (
                                 imageDataArrayBuffer8,
                                 nySource2##width,
                                 nySource2##height,
                                 1,
                               ),
                             |],
                             "needAddedPZImageDataArray": [|
                               (
                                 imageDataArrayBuffer9,
                                 pzSource1##width,
                                 pzSource1##height,
                                 0,
                               ),
                               (
                                 imageDataArrayBuffer10,
                                 pzSource2##width,
                                 pzSource2##height,
                                 1,
                               ),
                             |],
                             "needAddedNZImageDataArray": [|
                               (
                                 imageDataArrayBuffer11,
                                 nzSource1##width,
                                 nzSource1##height,
                                 0,
                               ),
                               (
                                 imageDataArrayBuffer12,
                                 nzSource2##width,
                                 nzSource2##height,
                                 1,
                               ),
                             |],
                             "needInitedTextureIndexArray": [|map1, map2|],
                           },
                           (),
                         ),
                       |])
                    |> resolve,
                (),
              );
            },
          );
        });

        testPromise(
          "clear cubemapTextureRecord->all needAddedSourceArray data and needInitedTextureIndexArray after send",
          () => {
            open CubemapTextureType;
            let (state, context, _, _, _) = _prepare();
            WorkerJobWorkerTool.execMainWorkerJob(
              ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
              ~completeFunc=
                state => {
                  let {
                    needAddedPXSourceArray,
                    needAddedNXSourceArray,
                    needAddedPYSourceArray,
                    needAddedNYSourceArray,
                    needAddedPZSourceArray,
                    needAddedNZSourceArray,
                    needInitedTextureIndexArray,
                  } =
                    CubemapTextureTool.getRecord(state);

                  (
                    needAddedPXSourceArray |> Js.Array.length,
                    needAddedNXSourceArray |> Js.Array.length,
                    needAddedPYSourceArray |> Js.Array.length,
                    needAddedNYSourceArray |> Js.Array.length,
                    needAddedPZSourceArray |> Js.Array.length,
                    needAddedNZSourceArray |> Js.Array.length,
                    needInitedTextureIndexArray |> Js.Array.length,
                  )
                  |> expect == (0, 0, 0, 0, 0, 0, 0)
                  |> resolve;
                },
              (),
            );
          },
        );
      });
    });

    describe("test render worker job", () => {
      describe("test basic source texture", () => {
        let _prepare = state => {
          let (
            state,
            context,
            (
              imageDataArrayBuffer1,
              imageDataArrayBuffer2,
              imageDataArrayBuffer3,
              imageDataArrayBuffer4,
            ),
            (gameObject1, gameObject2),
            (map1, map2),
            (source1, source2),
          ) =
            BasicSourceTextureRenderWorkerTool.prepareStateAndCreateTwoGameObjects(
              sandbox,
            );
          let state =
            state
            |> FakeGlWorkerTool.setFakeGl(
                 FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
               );
          (
            state,
            context,
            (
              imageDataArrayBuffer1,
              imageDataArrayBuffer2,
              imageDataArrayBuffer3,
              imageDataArrayBuffer4,
            ),
            (gameObject1, gameObject2),
            (map1, map2),
            (source1, source2),
          );
        };
        let _judge = (judgeFunc, state) => {
          BrowserDetectTool.setChrome();
          RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
            ~state,
            ~sandbox,
            ~completeFunc=
              _ => {
                let state = MainStateTool.unsafeGetState();
                let (state, (map3, map4), (source3, source4)) =
                  BasicSourceTextureRenderWorkerTool.createTwoMaps(state);
                let (state, gameObject3, _, _, _, map3) =
                  FrontRenderLightJobTool.prepareGameObjectWithDiffuseMap(
                    sandbox,
                    map3,
                    state,
                  );
                let (state, gameObject4, _, _, _, map4) =
                  FrontRenderLightJobTool.prepareGameObjectWithDiffuseMap(
                    sandbox,
                    map4,
                    state,
                  );
                let state =
                  state
                  |> GameObjectAPI.initGameObject(gameObject3)
                  |> GameObjectAPI.initGameObject(gameObject4);
                RenderJobsRenderWorkerTool.mainLoopAndRender(
                  ~state,
                  ~sandbox,
                  ~completeFunc=
                    _ =>
                      judgeFunc(
                        (gameObject3, gameObject4),
                        (map3, map4),
                        (source3, source4),
                      )
                      |> resolve,
                  (),
                );
              },
            (),
          );
        };
        beforeAllPromise(() =>
          BasicSourceTextureRenderWorkerTool.buildFakeCreateImageBitmapFunc()
        );
        afterAllPromise(() =>
          BasicSourceTextureRenderWorkerTool.clearFakeCreateImageBitmapFunc()
        );
        describe("add source to sourceMap", () =>
          testPromise("test for chrome", () => {
            let (
              state,
              context,
              (
                imageDataArrayBuffer1,
                imageDataArrayBuffer2,
                imageDataArrayBuffer3,
                imageDataArrayBuffer4,
              ),
              (gameObject1, gameObject2),
              (map1, map2),
              (source1, source2),
            ) =
              _prepare();
            _judge(
              (
                (gameObject3, gameObject4),
                (map3, map4),
                (source3, source4),
              ) =>
                (
                  BasicSourceTextureRenderWorkerTool.unsafeGetSource(
                    map3,
                    RenderWorkerStateTool.unsafeGetState(),
                  )
                  |> Obj.magic,
                  BasicSourceTextureRenderWorkerTool.unsafeGetSource(
                    map4,
                    RenderWorkerStateTool.unsafeGetState(),
                  )
                  |> Obj.magic,
                )
                |> expect
                == (
                     [|
                       imageDataArrayBuffer3,
                       source3##width,
                       source3##height,
                       {"imageOrientation": "flipY"} |> Obj.magic,
                     |],
                     [|
                       imageDataArrayBuffer4,
                       source4##width,
                       source4##height,
                       {"imageOrientation": "flipY"} |> Obj.magic,
                     |],
                   ),
              state,
            );
          })
        );
        describe("init added textures", () =>
          testPromise("test create gl texture", () => {
            let (
              state,
              context,
              (
                imageDataArrayBuffer1,
                imageDataArrayBuffer2,
                imageDataArrayBuffer3,
                imageDataArrayBuffer4,
              ),
              (gameObject1, gameObject2),
              (map1, map2),
              (source1, source2),
            ) =
              _prepare();
            let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlWorkerTool.setFakeGl(
                   FakeGlWorkerTool.buildFakeGl(~sandbox, ~createTexture, ()),
                 );
            _judge(
              (
                (gameObject3, gameObject4),
                (map3, map4),
                (source3, source4),
              ) =>
                createTexture |> getCallCount |> expect == 4,
              state,
            );
          })
        );
      });

      describe("test arrayBufferView source texture", () => {
        let _prepare = state => {
          let (
            state,
            (gameObject1, gameObject2),
            (map1, map2),
            (source1, source2),
          ) =
            ArrayBufferViewSourceTextureRenderWorkerTool.prepareStateAndCreateTwoGameObjects(
              sandbox,
            );
          let state =
            state
            |> FakeGlWorkerTool.setFakeGl(
                 FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
               );
          (
            state,
            (gameObject1, gameObject2),
            (map1, map2),
            (source1, source2),
          );
        };
        let _judge = (judgeFunc, state) => {
          BrowserDetectTool.setChrome();
          RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
            ~state,
            ~sandbox,
            ~completeFunc=
              _ => {
                let state = MainStateTool.unsafeGetState();
                let (state, (map3, map4), (source3, source4)) =
                  ArrayBufferViewSourceTextureRenderWorkerTool.createTwoMaps(
                    state,
                  );
                let (state, gameObject3, _, _, _, map3) =
                  FrontRenderLightJobTool.prepareGameObjectWithDiffuseMap(
                    sandbox,
                    map3,
                    state,
                  );
                let (state, gameObject4, _, _, _, map4) =
                  FrontRenderLightJobTool.prepareGameObjectWithDiffuseMap(
                    sandbox,
                    map4,
                    state,
                  );
                let state =
                  state
                  |> GameObjectAPI.initGameObject(gameObject3)
                  |> GameObjectAPI.initGameObject(gameObject4);
                RenderJobsRenderWorkerTool.mainLoopAndRender(
                  ~state,
                  ~sandbox,
                  ~completeFunc=
                    _ =>
                      judgeFunc(
                        (gameObject3, gameObject4),
                        (map3, map4),
                        (source3, source4),
                      )
                      |> resolve,
                  (),
                );
              },
            (),
          );
        };
        describe("add source to sourceMap", () =>
          testPromise("test", () => {
            let (
              state,
              (gameObject1, gameObject2),
              (map1, map2),
              (source1, source2),
            ) =
              _prepare();
            _judge(
              (
                (gameObject3, gameObject4),
                (map3, map4),
                (source3, source4),
              ) =>
                (
                  ArrayBufferViewSourceTextureRenderWorkerTool.unsafeGetSource(
                    map3,
                    RenderWorkerStateTool.unsafeGetState(),
                  )
                  |> Obj.magic,
                  ArrayBufferViewSourceTextureRenderWorkerTool.unsafeGetSource(
                    map4,
                    RenderWorkerStateTool.unsafeGetState(),
                  )
                  |> Obj.magic,
                )
                |> expect == (source3, source4),
              state,
            );
          })
        );
        describe("init added textures", () =>
          testPromise("test create gl texture", () => {
            let (
              state,
              (gameObject1, gameObject2),
              (map1, map2),
              (source1, source2),
            ) =
              _prepare();
            let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlWorkerTool.setFakeGl(
                   FakeGlWorkerTool.buildFakeGl(~sandbox, ~createTexture, ()),
                 );
            _judge(
              (
                (gameObject3, gameObject4),
                (map3, map4),
                (source3, source4),
              ) =>
                createTexture |> getCallCount |> expect == 4,
              state,
            );
          })
        );
      });
    });
  });