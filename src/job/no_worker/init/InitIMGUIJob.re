open StateDataMainType;

let execJob = (_, {imguiRecord, viewRecord} as state) => {
  let gl = DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

  let state = state |> IOIMGUIMainService.bindEvent;

  {
    ...state,
    imguiRecord: {
      ...imguiRecord,
      wonderImguiIMGUIRecord:
        WonderImgui.ManageIMGUIAPI.init(
          gl,
          ManageIMGUIMainService.getCanvasSize(state),
          RecordIMGUIMainService.getWonderIMGUIRecord(state),
        ),
    },
  };
};