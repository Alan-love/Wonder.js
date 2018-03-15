open MainStateDataType;

let execJob = (flags, elapsed, state) => {
  ...state,
  timeControllerRecord: state.timeControllerRecord |> TimeControllerService.tick(elapsed)
};