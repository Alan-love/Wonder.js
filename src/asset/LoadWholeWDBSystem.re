open Js.Promise;

open WonderBsMost.Most;

let load =
    (
      wdbPath,
      (isSetIMGUIFunc, isBindEvent),
      (fetchFunc, handleWhenLoadingFunc),
      state,
    ) =>
  fromPromise(
    fetchFunc(wdbPath)
    |> then_(response => {
         handleWhenLoadingFunc(
           FetchCommon.getContentLength(response),
           wdbPath,
         );

         response |> resolve;
       })
    |> then_(Fetch.Response.arrayBuffer),
  )
  |> flatMap(wdb =>
       AssembleWholeWDBSystem.assemble(
         wdb |> LoadType.fetchArrayBufferToArrayBuffer,
         (isSetIMGUIFunc, isBindEvent),
         state,
       )
     );