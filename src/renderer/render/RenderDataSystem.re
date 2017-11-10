open RenderDataType;

let _getRenderData = (state: StateDataType.state) => state.renderData;

let _getCameraData = (state: StateDataType.state) => Js.Option.getExn(state.renderData.cameraData);

let getCameraVMatrixDataFromState = (state: StateDataType.state) => _getCameraData(state).vMatrix;

let getCameraPMatrixDataFromState = (state: StateDataType.state) => _getCameraData(state).pMatrix;

let getRenderListFromState = (state: StateDataType.state) => state.renderData.renderList;

let setRenderList = (renderList, state: StateDataType.state) =>
  _getRenderData(state).renderList = (
    switch (Js.Array.length(renderList)) {
    | 0 => None
    | _ => Some(renderList)
    }
  );

let setCameraData = (cameraData, state: StateDataType.state) =>
  _getRenderData(state).cameraData = cameraData;

let isFirstRender = (state: StateDataType.state) => _getRenderData(state).isFirstRender == true;

let markIsNotFirstRender = (state: StateDataType.state) => {
  _getRenderData(state).isFirstRender = false;
  state
};

let initData = () => {isFirstRender: true, renderList: None, cameraData: None};