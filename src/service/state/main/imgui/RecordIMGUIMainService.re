open StateDataMainType;

open IMGUIType;

let getRecord = state => state.imguiRecord;

let getWonderIMGUIRecord = state => getRecord(state).wonderImguiIMGUIRecord;

let getIOData = state => getRecord(state).ioData;

let create = () => {
  ioData: {
    pointUp: false,
    pointDown: false,
    pointPosition: (0, 0),
    pointMovementDelta: (0, 0),
  },
  extendData: {
    customControlData: {
      funcMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    },
    skinData: {
      allSkinDataMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    },
  },
  isSetIMGUIFuncInRenderWorkerForWorker: false,
  wonderImguiIMGUIRecord: WonderImgui.ManageIMGUIService.createRecord(),
};