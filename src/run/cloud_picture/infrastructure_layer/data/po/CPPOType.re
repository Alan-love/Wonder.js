type po = {
  pipeline: PipelineCPPOType.pipeline,
  scene: SceneCPPOType.scene,
  gameObject: GameObjectCPPOType.gameObject,
  transform: option(TransformCPPOType.transform),
  pbrMaterial: option(PBRMaterialCPPOType.pbrMaterial),
  geometry: option(GeometryCPPOType.geometry),
  basicCameraView: BasicCameraViewCPPOType.basicCameraView,
  perspectiveCameraProjection: PerspectiveCameraProjectionCPPOType.perspectiveCameraProjection,
  directionLight: option(DirectionLightCPPOType.directionLight),
  poConfig: POConfigCPPOType.poConfig,
  globalTemp: GlobalTempCPPOType.globalTemp,
  time: TimeCPPOType.time,
};
