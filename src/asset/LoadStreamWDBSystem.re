open WonderBsMost;

open Js.Typed_array;

open Js.Promise;

let load =
    (
      wdbPath,
      (
        fetchFunc,
        handleWhenLoadingFunc,
        handleBeforeStartLoopFunc,
        handleWhenDoneFunc,
        handleWhenLoadWholeWDBFunc,
      ),
      state,
    ) => {
  let (unit8Array, mimeType, errorMsg) =
    ConvertStreamSystem.getDefault11ImageUint8ArrayData();

  AssembleUtils.buildLoadImageStream(
    unit8Array |> Uint8Array.buffer,
    mimeType,
    errorMsg,
  )
  |> Most.flatMap(image => {
       let default11Image = image |> ImageType.imageToDomExtendImageElement;

       Most.fromPromise(
         fetchFunc(wdbPath)
         |> then_(response =>
              ! Fetch.Response.ok(response) ?
                {
                  let status = Fetch.Response.status(response);
                  let statusText = Fetch.Response.statusText(response);

                  WonderLog.Log.fatal(
                    WonderLog.Log.buildFatalMessage(
                      ~title="streamLoad",
                      ~description={j|$status $statusText|j},
                      ~reason="",
                      ~solution={j||j},
                      ~params={j||j},
                    ),
                  );
                } :
                ! FetchCommon.isSupportStreamLoad(response) ?
                  {
                    WonderLog.Log.warn(
                      {j|your browser does not seem to have the Streams API yet, fallback to load whole wdb|j},
                    );

                    response
                    |> Fetch.Response.arrayBuffer
                    |> then_(wdb => {
                         handleWhenLoadingFunc(
                           wdb
                           |> LoadType.fetchArrayBufferToArrayBuffer
                           |> ArrayBuffer.byteLength,
                           FetchCommon.getContentLength(response),
                           wdbPath,
                         );

                         wdb |> resolve;
                       })
                    |> then_(wdb =>
                         AssembleWholeWDBSystem.assemble(
                           wdb |> LoadType.fetchArrayBufferToArrayBuffer,
                           (true, true, true),
                           state,
                         )
                         |> Most.tap(((state, data, rootGameObject)) =>
                              handleWhenLoadWholeWDBFunc(
                                state,
                                data,
                                rootGameObject,
                              )
                            )
                         |> Most.drain
                         |> then_(_ => resolve())
                       );
                  } :
                  {
                    /* FetchExtend.newResponse(
                         FetchExtend.newReadableStream({
                           "start": controller => {
                             let reader = _getReader(response);

                             ReadStreamChunkSystem.read(
                               (
                                 default11Image,
                                 controller,
                                 handleBeforeStartLoopFunc,
                                 handleWhenDoneFunc,
                               ),
                               [||],
                               (
                                 None,
                                 [||],
                                 None,
                                 0,
                                 [||],
                                 WonderCommonlib.SparseMapService.createEmpty(),
                               ),
                               reader,
                             );
                           },
                         }),
                       ) */

                    let contentLength =
                      FetchCommon.getContentLength(response);

                    let totalUint8Array =
                      Uint8Array.fromLength(contentLength);

                    FetchExtend.newReadableStream({
                      "start": controller => {
                        let reader = FetchCommon.getReader(response);

                        ReadStreamChunkSystem.read(
                          (
                            default11Image,
                            controller,
                            (contentLength, wdbPath, handleWhenLoadingFunc),
                            handleBeforeStartLoopFunc,
                            handleWhenDoneFunc,
                          ),
                          ([||], totalUint8Array),
                          (
                            None,
                            [||],
                            None,
                            0,
                            [||],
                            WonderCommonlib.SparseMapService.createEmpty(),
                          ),
                          reader,
                        );
                      },
                    })
                    |> ignore;

                    resolve();
                  }
            ),
       );
     });
};