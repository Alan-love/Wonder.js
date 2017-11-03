open StateDataType;

open ViewSystem;

open GlType;

open DomType;

let getGL = [@bs] ((state: state) =>Js.Option.getExn  (state.deviceManagerData.gl));

let setGL = (gl: webgl1Context, ~state: state) => {...state, deviceManagerData: {gl: Some(gl)}};

/* let createGL (state: state) =>
   state |> getCanvas |> getContext options::(getContextConfig state); */
let createGL = (canvas: htmlElement, contextConfig: MainConfigType.contextConfig) =>
  getContext(canvas, contextConfig);