open StateDataMainType;

let execJob = (_, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateDataMainService.unsafeGetState(stateData);

    BrowserDetectMainService.detectMobileNotSupportWorker(state);

    None;
  });