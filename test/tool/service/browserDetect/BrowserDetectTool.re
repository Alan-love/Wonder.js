open BrowserDetectType;

let setChrome = () => {
  let state = MainStateTool.unsafeGetState();
  let state = {
    ...state,
    browserDetectRecord: {
      browser: Chrome,
    },
  };
  MainStateTool.setState(state);
};

let setFirefox = () => {
  let state = MainStateTool.unsafeGetState();
  let state = {
    ...state,
    browserDetectRecord: {
      browser: Firefox,
    },
  };
  MainStateTool.setState(state);
};

let setAndroid = () => {
  let state = MainStateTool.unsafeGetState();
  let state = {
    ...state,
    browserDetectRecord: {
      browser: Android,
    },
  };
  MainStateTool.setState(state);
};

let setUnknown = () => {
  let state = MainStateTool.unsafeGetState();
  let state = {
    ...state,
    browserDetectRecord: {
      browser: Unknown,
    },
  };
  MainStateTool.setState(state);
};