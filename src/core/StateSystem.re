open StateDataType;

let getState (stateData: stateData) :state => Js.Option.getExn stateData.state;

/* let getState (stateData: stateData) :state => Js.Option.getExn stateData.state; */
let setState (stateData: stateData) (state: state) => {
  stateData.state = Some state;
  state
};

let createState () => {
  viewData: {canvas: None, contextConfig: None},
  initConfigData: {isTest: Some false},
  deviceManagerData: {gl: None}
};

let getOptionValueFromState value => Js.Option.getExn value;