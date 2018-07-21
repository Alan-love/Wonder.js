type target = (float, float, float);

type arcballCameraController = {
  distance: float,
  minDistance: float,
  phi: float,
  theta: float,
  thetaMargin: float,
  target,
  moveSpeedX: float,
  moveSpeedY: float,
  rotateSpeed: float,
  wheelSpeed: float,
};

type imgui = {
  imguiFunc: string,
  customData: WonderImgui.IMGUIType.customDataForIMGUIFunc,
};