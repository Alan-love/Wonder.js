type t = {
  mutable config: option(IConfigDp.config),
  mutable repo: option(IRepoDp.repo),
};

let dpContainer = {config: None, repo: None};

let _unsafeGetConfigDp = () => {
  dpContainer.config->OptionSt.unsafeGet;
};

let unsafeGetSettingConfigDp = () => {
  _unsafeGetConfigDp().setting;
};

let setConfigDp = dp => {
  dpContainer.config = dp->Some;

  ();
};

let _unsafeGetRepoDp = () => {
  dpContainer.repo->OptionSt.unsafeGet;
};

let unsafeGetSceneRepoDp = () => {
  _unsafeGetRepoDp().sceneRepo;
};

let unsafeGetGameObjectRepoDp = () => {
  _unsafeGetRepoDp().gameObjectRepo;
};

let unsafeGetTransformRepoDp = () => {
  _unsafeGetRepoDp().transformRepo;
};

let setRepoDp = dp => {
  dpContainer.repo = dp->Some;

  ();
};
