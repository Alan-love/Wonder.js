open Js.Promise;

let load =
    (
      ~wdbPath,
      ~fetchFunc,
      ~isSetIMGUIFunc=true,
      ~isBindEvent=true,
      ~isActiveCamera=true,
      ~handleWhenLoadingFunc=(contentLength, wdbPath) => (),
      (),
    ) => {
  let result = ref(Obj.magic(1));

  MainStateTool.unsafeGetState()
  |> LoaderManagerSystem.loadWholeWDB(
       wdbPath,
       (isSetIMGUIFunc, isBindEvent, isActiveCamera),
       (fetchFunc, handleWhenLoadingFunc),
     )
  |> WonderBsMost.Most.forEach(data => result := data)
  |> then_(() => result^ |> resolve);
};