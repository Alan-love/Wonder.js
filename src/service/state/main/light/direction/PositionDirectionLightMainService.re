open StateDataType;

let getPosition = (index, state) =>
  state
  |> PositionLightMainService.getPosition(
       GameObjectDirectionLightService.unsafeGetGameObject(index, state.directionLightRecord)
     );