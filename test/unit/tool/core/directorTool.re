let prepare = (state: StateDataType.state) => {
  Root.root##performance#={"now": () => 0.};
  state
};

let init = (state: StateDataType.state) => DirectorSystem._init(state);

let initSystem = (state: StateDataType.state) => DirectorSystem._initSystem(state);

let sync = (state: StateDataType.state, ~time=0., ()) => DirectorSystem._sync(time, state);

let run = (state: StateDataType.state, ~time=0., ()) => DirectorSystem._run(time, state);

let loopBody = (~time: float=0., ()) => DirectorSystem.loopBody(time);

let updateSystem = (~time: float=0., state: StateDataType.state) =>
  DirectorSystem._updateSystem(time, state);