open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);

    let data = MessageService.getRecord(e);
    let imguiData = data##imguiData;

    imguiData##imguiFunc |> OptionService.isJsonSerializedValueNone ?
      e :
      {
        let imguiRecord =
          RecordIMGUIRenderWorkerService.getRecord(state)
          |> WonderImgui.ManageIMGUIAPI.setIMGUIFunc(
               imguiData##customData
               |> OptionService.unsafeGetJsonSerializedValue,
               imguiData##imguiFunc
               |> OptionService.unsafeGetJsonSerializedValue
               |> SerializeService.deserializeFunction,
             );

        state.imguiRecord = imguiRecord;

        let state =
          WonderImgui.ManageIMGUIService.render(
            DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
            imguiData##ioData,
            Obj.magic(RecordAPIRenderWorkerService.getAPIJsObj(state)),
            (
              ManageIMGUIRenderWorkerService.getRecord |> Obj.magic,
              ManageIMGUIRenderWorkerService.setRecord |> Obj.magic,
            ),
            state |> Obj.magic,
          )
          |> Obj.magic;

        state |> StateRenderWorkerService.setState(stateData);

        e;
      };
  });