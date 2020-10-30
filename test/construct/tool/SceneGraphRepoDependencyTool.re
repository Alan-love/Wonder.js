open SceneGraphRepoDpCPType;

open Sinon;

let _createEmptyList = () => [];

let buildSceneRepo =
    (
      ~sandbox,
      ~getSceneGameObject=createEmptyStub(refJsObjToSandbox(sandbox^)),
      (),
    )
    : sceneRepo => {
  getSceneGameObject: getSceneGameObject,
};

let buildGameObjectRepo =
    (
      ~sandbox,
      ~getTransform=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getDirectionLight=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getBasicCameraView=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getPerspectiveCameraProjection=createEmptyStub(
                                        refJsObjToSandbox(sandbox^),
                                      ),
      ~getBSDFMaterial=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getAllGeometryGameObjects=createEmptyStub(refJsObjToSandbox(sandbox^))
                                 ->SinonTool.returns(_createEmptyList()),
      ~getAllGameObjectBSDFMaterials=createEmptyStub(
                                       refJsObjToSandbox(sandbox^),
                                     )
                                     ->SinonTool.returns(_createEmptyList()),
      (),
    )
    : gameObjectRepo => {
  getTransform,
  getDirectionLight,
  getBasicCameraView,
  getPerspectiveCameraProjection,
  getBSDFMaterial,
  getAllGeometryGameObjects,
  getAllGameObjectBSDFMaterials,
};

let buildTransformRepo =
    (
      ~sandbox,
      ~getLocalToWorldMatrix=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getNormalMatrix=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getLocalPosition=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getLocalRotation=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getLocalScale=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getPosition=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getRotation=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getScale=createEmptyStub(refJsObjToSandbox(sandbox^)),
      (),
    )
    : transformRepo => {
  getLocalToWorldMatrix,
  getNormalMatrix,
  getLocalPosition,
  getLocalRotation,
  getLocalScale,
  getPosition,
  getRotation,
  getScale,
};

let buildDirectionLightRepo =
    (
      ~sandbox,
      ~getColor=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getIntensity=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getDirection=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getAllLights=createEmptyStub(refJsObjToSandbox(sandbox^))
                    ->SinonTool.returns(_createEmptyList()),
      (),
    )
    : directionLightRepo => {
  getColor,
  getIntensity,
  getDirection,
  getAllLights,
};

let buildBasicCameraViewRepo =
    (
      ~sandbox,
      ~getGameObject=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getViewWorldToCameraMatrix=createEmptyStub(
                                    refJsObjToSandbox(sandbox^),
                                  ),
      ~getActiveBasicCameraView=createEmptyStub(refJsObjToSandbox(sandbox^))
                                ->SinonTool.returns(Js.Nullable.null),
      (),
    )
    : basicCameraViewRepo => {
  getGameObject,
  getViewWorldToCameraMatrix,
  getActiveBasicCameraView,
};

let buildPerspectiveCameraProjectionRepo =
    (
      ~sandbox,
      ~getPMatrix=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getFovy=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getNear=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getFar=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getAspect=createEmptyStub(refJsObjToSandbox(sandbox^)),
      (),
    )
    : perspectiveCameraProjectionRepo => {
  getPMatrix,
  getFovy,
  getAspect,
  getNear,
  getFar,
};

let buildBSDFMaterialRepo =
    (
      ~sandbox,
      ~getDiffuseColor=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getSpecular=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getSpecularColor=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getRoughness=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getMetalness=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getTransmission=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getIOR=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getDiffuseMapImageId=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getChannelRoughnessMetallicMapImageId=createEmptyStub(
                                               refJsObjToSandbox(sandbox^),
                                             ),
      ~getEmissionMapImageId=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getNormalMapImageId=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getTransmissionMapImageId=createEmptyStub(
                                   refJsObjToSandbox(sandbox^),
                                 ),
      ~getSpecularMapImageId=createEmptyStub(refJsObjToSandbox(sandbox^)),
      (),
    )
    : bsdfMaterialRepo => {
  getDiffuseColor,
  getSpecular,
  getSpecularColor,
  getRoughness,
  getMetalness,
  getTransmission,
  getIOR,
  getDiffuseMapImageId,
  getChannelRoughnessMetallicMapImageId,
  getEmissionMapImageId,
  getNormalMapImageId,
  getTransmissionMapImageId,
  getSpecularMapImageId,
};

let build =
    (
      ~sandbox,
      ~sceneRepo=buildSceneRepo(~sandbox, ()),
      ~gameObjectRepo=buildGameObjectRepo(~sandbox, ()),
      ~transformRepo=buildTransformRepo(~sandbox, ()),
      ~directionLightRepo=buildDirectionLightRepo(~sandbox, ()),
      ~basicCameraViewRepo=buildBasicCameraViewRepo(~sandbox, ()),
      ~perspectiveCameraProjectionRepo=buildPerspectiveCameraProjectionRepo(
                                         ~sandbox,
                                         (),
                                       ),
      ~bsdfMaterialRepo=buildBSDFMaterialRepo(~sandbox, ()),
      (),
    )
    : sceneGraphRepo => {
  sceneRepo,
  gameObjectRepo,
  transformRepo,
  directionLightRepo,
  basicCameraViewRepo,
  perspectiveCameraProjectionRepo,
  bsdfMaterialRepo,
};

let set = dp => {
  SceneGraphRepoDpCPAPI.set(dp);
};

let getRepo = ((repo, _)) => repo;
