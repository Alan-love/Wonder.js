open StateDataMainType;

open WonderImgui;

let execJob = (flags, state) => {
  let canvas = ViewService.unsafeGetCanvas(state.viewRecord) |> Obj.magic;

  {
    ...state,
    imguiRecord:
      ManageIMGUIAPI.render(
        DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
        (canvas##width, canvas##height),
        state.imguiRecord,
      ),
  };
};