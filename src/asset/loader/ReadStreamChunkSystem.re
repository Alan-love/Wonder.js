open Js.Typed_array;

open Js.Promise;

let _readReader:
  FetchExtendType.reader => Js.Promise.t(FetchExtendType.streamData) = [%raw
  reader => {|
  return reader.read();
  |}
];

let _close = [%raw controller => {|
  controller.close();
  |}];

let _getTotalLoadedByteLength = loadedUint8ArrayArr =>
  loadedUint8ArrayArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. byteLength, loadedUint8Array) =>
         byteLength + (loadedUint8Array |> Uint8Array.byteLength),
       0,
     );

let _getAllChunkLengths =
    (
      allChunkLengths,
      totalLoadedByteLength,
      (loadedUint8ArrayArr, totalUint8Array),
    ) =>
  switch (allChunkLengths) {
  | None =>
    let dataView =
      LoadStreamWDBUtil.buildLoadedDataView(
        totalLoadedByteLength,
        (loadedUint8ArrayArr, totalUint8Array),
      );

    let (jsonChunkLength, _) =
      DataViewCommon.getUint32_1(.
        BufferUtils.getHeaderByteLength(),
        dataView,
      );
    let (streamChunkLength, _) =
      DataViewCommon.getUint32_1(.
        BufferUtils.getHeaderByteLength()
        + BufferUtils.getWDBChunkHeaderByteLength(),
        dataView,
      );
    let (binBufferChunkLength, _) =
      DataViewCommon.getUint32_1(.
        BufferUtils.getHeaderByteLength()
        + BufferUtils.getWDBChunkHeaderByteLength()
        + BufferUtils.getWDBChunkHeaderByteLength(),
        dataView,
      );
    (jsonChunkLength, streamChunkLength, binBufferChunkLength);

  | Some(allChunkLengths) => allChunkLengths
  };

let _getStreamChunkData =
    (
      streamChunkArr,
      chunkLengthData,
      totalLoadedByteLength,
      (loadedUint8ArrayArr, totalUint8Array),
    ) =>
  Js.Array.length(streamChunkArr) > 0 ?
    streamChunkArr :
    {
      let dataView =
        LoadStreamWDBUtil.buildLoadedDataView(
          totalLoadedByteLength,
          (loadedUint8ArrayArr, totalUint8Array),
        );

      ConvertStreamSystem.getStreamChunkArr(chunkLengthData, dataView);
    };

let _getJsonChunkStr =
    (
      jsonChunkLength,
      totalLoadedByteLength,
      (loadedUint8ArrayArr, totalUint8Array),
    ) => {
  let dataView =
    LoadStreamWDBUtil.buildLoadedDataView(
      totalLoadedByteLength,
      (loadedUint8ArrayArr, totalUint8Array),
    );

  BufferUtils.getWDBJsonChunkStr(
    jsonChunkLength,
    dataView |> DataView.buffer,
  );
};

let _assembleAndStartLoop =
    (
      assembleData,
      jsonChunkLength,
      totalLoadedByteLength,
      loadedUint8ArrayArr,
      default11Image,
      handleBeforeStartLoopFunc,
      state,
    ) =>
  switch (assembleData) {
  | Some(assembleData) => (state, assembleData)
  | None =>
    let (
      state,
      rootGameObject,
      (geometryArr, geometryGameObjects, gameObjectGeometrys),
      (basicSourceTextureArr, imageTextureIndices, images),
    ) =
      AssembleStreamWDBSystem.assemble(
        _getJsonChunkStr(
          jsonChunkLength,
          totalLoadedByteLength,
          loadedUint8ArrayArr,
        )
        |> Js.Json.parseExn
        |> Obj.magic,
        default11Image,
        state,
      );

    let state = handleBeforeStartLoopFunc(state, rootGameObject);

    DirectorMainService.start(state);

    (
      StateDataMainService.unsafeGetState(StateDataMain.stateData),
      (
        rootGameObject,
        (geometryArr, geometryGameObjects, gameObjectGeometrys),
        (basicSourceTextureArr, imageTextureIndices, images),
      ),
    );
  };

let _isLoadHeader = totalLoadedByteLength =>
  totalLoadedByteLength < BufferUtils.getWDBHeaderTotalByteLength();

let _computeHeaderJsonStreamChunkTotalByteLength =
    (jsonChunkLength, streamChunkLength) =>
  BufferUtils.getWDBHeaderTotalByteLength()
  + (jsonChunkLength |> BufferUtils.alignedLength)
  + (streamChunkLength |> BufferUtils.alignedLength);

let _isLoadBinBufferChunk =
    (headerJsonStreamChunkTotalByteLength, totalLoadedByteLength) =>
  totalLoadedByteLength >= headerJsonStreamChunkTotalByteLength;

let _isLoadStreamChunk = (jsonChunkLength, totalLoadedByteLength) =>
  totalLoadedByteLength >= BufferUtils.getWDBHeaderTotalByteLength()
  + jsonChunkLength;

let rec read =
        (
          (
            default11Image,
            controller,
            (contentLength, wdbPath, handleWhenLoadingFunc),
            handleBeforeStartLoopFunc,
            handleWhenDoneFunc,
          ),
          (loadedUint8ArrayArr, totalUint8Array),
          (
            allChunkLengths,
            streamChunkArr,
            assembleData,
            nextStreamChunkIndex,
            loadedStreamChunkArrWhichNotHasAllData,
            loadBlobImageMap,
          ),
          reader,
        ) =>
  _readReader(reader)
  |> then_(streamData =>
       FetchExtend.isDone(streamData) ?
         {
           WonderLog.Log.log("done") |> ignore;

           _close(controller);

           switch (assembleData) {
           | None => resolve()
           | Some((rootGameObject, _, _)) =>
             handleWhenDoneFunc(
               StateDataMainService.unsafeGetState(StateDataMain.stateData),
               rootGameObject,
             )
             |> StateDataMainService.setState(StateDataMain.stateData)
             |> ignore;

             resolve();
           };
         } :
         {
           /* TODO use requestIdleCallback + timeout? */

           let value = streamData##value;

           WonderLog.Log.logJson(("value", value |> Uint8Array.byteLength))
           |> ignore;

           let loadedUint8ArrayArr =
             loadedUint8ArrayArr |> ArrayService.push(value);

           let totalLoadedByteLength =
             _getTotalLoadedByteLength(loadedUint8ArrayArr);

           handleWhenLoadingFunc(
             totalLoadedByteLength,
             contentLength,
             wdbPath,
           );

           _isLoadHeader(totalLoadedByteLength) ?
             read(
               (
                 default11Image,
                 controller,
                 (contentLength, wdbPath, handleWhenLoadingFunc),
                 handleBeforeStartLoopFunc,
                 handleWhenDoneFunc,
               ),
               (loadedUint8ArrayArr, totalUint8Array),
               (
                 allChunkLengths,
                 streamChunkArr,
                 assembleData,
                 nextStreamChunkIndex,
                 loadedStreamChunkArrWhichNotHasAllData,
                 loadBlobImageMap,
               ),
               reader,
             ) :
             {
               let (jsonChunkLength, streamChunkLength, binBufferChunkLength) as allChunkLengths =
                 _getAllChunkLengths(
                   allChunkLengths,
                   totalLoadedByteLength,
                   (loadedUint8ArrayArr, totalUint8Array),
                 );

               /* WonderLog.Log.print(("allChunkLengths: ", allChunkLengths))
                  |> ignore; */

               let headerJsonStreamChunkTotalByteLength =
                 _computeHeaderJsonStreamChunkTotalByteLength(
                   jsonChunkLength,
                   streamChunkLength,
                 );

               _isLoadBinBufferChunk(
                 headerJsonStreamChunkTotalByteLength,
                 totalLoadedByteLength,
               ) ?
                 {
                   let streamChunkArr =
                     _getStreamChunkData(
                       streamChunkArr,
                       (jsonChunkLength, streamChunkLength),
                       totalLoadedByteLength,
                       (loadedUint8ArrayArr, totalUint8Array),
                     );

                   /* WonderLog.Log.print(("streamChunkArr: ", streamChunkArr))
                      |> ignore; */

                   let state =
                     StateDataMainService.unsafeGetState(
                       StateDataMain.stateData,
                     );

                   let (state, assembleData) =
                     _assembleAndStartLoop(
                       assembleData,
                       jsonChunkLength,
                       totalLoadedByteLength,
                       (loadedUint8ArrayArr, totalUint8Array),
                       default11Image,
                       handleBeforeStartLoopFunc,
                       state,
                     );

                   LoadStreamWDBBinBufferSystem.handleBinBufferData(
                     (
                       headerJsonStreamChunkTotalByteLength,
                       totalLoadedByteLength,
                       (loadedUint8ArrayArr, totalUint8Array),
                     ),
                     (
                       nextStreamChunkIndex,
                       streamChunkArr,
                       loadedStreamChunkArrWhichNotHasAllData,
                       loadBlobImageMap,
                     ),
                     assembleData,
                     state,
                   )
                   |> then_(
                        (
                          (
                            state,
                            streamChunkArr,
                            assembleData,
                            nextStreamChunkIndex,
                            loadedStreamChunkArrWhichNotHasAllData,
                            loadBlobImageMap,
                          ),
                        ) => {
                        StateDataMainService.setState(
                          StateDataMain.stateData,
                          state,
                        )
                        |> ignore;

                        read(
                          (
                            default11Image,
                            controller,
                            (contentLength, wdbPath, handleWhenLoadingFunc),
                            handleBeforeStartLoopFunc,
                            handleWhenDoneFunc,
                          ),
                          (loadedUint8ArrayArr, totalUint8Array),
                          (
                            allChunkLengths |. Some,
                            streamChunkArr,
                            assembleData |. Some,
                            nextStreamChunkIndex,
                            loadedStreamChunkArrWhichNotHasAllData,
                            loadBlobImageMap,
                          ),
                          reader,
                        );
                      });
                 } :
                 read(
                   (
                     default11Image,
                     controller,
                     (contentLength, wdbPath, handleWhenLoadingFunc),
                     handleBeforeStartLoopFunc,
                     handleWhenDoneFunc,
                   ),
                   (loadedUint8ArrayArr, totalUint8Array),
                   (
                     allChunkLengths |. Some,
                     streamChunkArr,
                     assembleData,
                     nextStreamChunkIndex,
                     loadedStreamChunkArrWhichNotHasAllData,
                     loadBlobImageMap,
                   ),
                   reader,
                 );
             };
         }
     )
  |> catch(e => {
       WonderLog.Log.error(e) |> ignore;

       reject(StreamType.ReadError);
     });