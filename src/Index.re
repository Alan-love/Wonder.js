let load = LoaderManager.load;

let initDirector = Director.initDirector;

let startDirector = Director.startDirector;

let setState = State.setState;

let getState = State.getState;

let getStateData = State.getStateData;

let restoreState = State.restoreState;

let deepCopyStateForRestore = State.deepCopyStateForRestore;

let getFps = TimeController.getFps;

let getGameTime = TimeController.getGameTime;

let removeRenderRenderJob = Job.removeRenderRenderJob;

let removeRenderInitJob = Job.removeRenderInitJob;

let addRenderRenderJob = Job.addRenderRenderJob;

let addRenderInitJob = Job.addRenderInitJob;

let removeLogicUpdateJob = Job.removeLogicUpdateJob;

let removeLogicInitJob = Job.removeLogicInitJob;

let addLogicUpdateJob = Job.addLogicUpdateJob;

let addLogicInitJob = Job.addLogicInitJob;

let cloneGameObject = GameObject.cloneGameObject;

let batchDisposeGameObject = GameObject.batchDisposeGameObject;

let initGameObject = GameObject.initGameObject;

let disposeGameObject = GameObject.disposeGameObject;

let isGameObjectAlive = GameObject.isGameObjectAlive;

let hasGameObjectPointLightComponent = GameObject.hasGameObjectPointLightComponent;

let getGameObjectPointLightComponent = GameObject.getGameObjectPointLightComponent;

let disposeGameObjectPointLightComponent = GameObject.disposeGameObjectPointLightComponent;

let addGameObjectPointLightComponent = GameObject.addGameObjectPointLightComponent;

let hasGameObjectDirectionLightComponent = GameObject.hasGameObjectDirectionLightComponent;

let getGameObjectDirectionLightComponent = GameObject.getGameObjectDirectionLightComponent;

let disposeGameObjectDirectionLightComponent = GameObject.disposeGameObjectDirectionLightComponent;

let addGameObjectDirectionLightComponent = GameObject.addGameObjectDirectionLightComponent;

let hasGameObjectAmbientLightComponent = GameObject.hasGameObjectAmbientLightComponent;

let getGameObjectAmbientLightComponent = GameObject.getGameObjectAmbientLightComponent;

let disposeGameObjectAmbientLightComponent = GameObject.disposeGameObjectAmbientLightComponent;

let addGameObjectAmbientLightComponent = GameObject.addGameObjectAmbientLightComponent;

let disposeGameObjectObjectInstanceComponent = GameObject.disposeGameObjectObjectInstanceComponent;

let getGameObjectObjectInstanceComponent = GameObject.getGameObjectObjectInstanceComponent;

let addGameObjectObjectInstanceComponent = GameObject.addGameObjectObjectInstanceComponent;

let disposeGameObjectSourceInstanceComponent = GameObject.disposeGameObjectSourceInstanceComponent;

let hasGameObjectSourceInstanceComponent = GameObject.hasGameObjectSourceInstanceComponent;

let getGameObjectSourceInstanceComponent = GameObject.getGameObjectSourceInstanceComponent;

let addGameObjectSourceInstanceComponent = GameObject.addGameObjectSourceInstanceComponent;

let hasGameObjectGeometryComponent = GameObject.hasGameObjectGeometryComponent;

let getGameObjectGeometryComponent = GameObject.getGameObjectGeometryComponent;

let disposeGameObjectGeometryComponent = GameObject.disposeGameObjectGeometryComponent;

let addGameObjectGeometryComponent = GameObject.addGameObjectGeometryComponent;

let hasGameObjectMeshRendererComponent = GameObject.hasGameObjectMeshRendererComponent;

let getGameObjectMeshRendererComponent = GameObject.getGameObjectMeshRendererComponent;

let disposeGameObjectMeshRendererComponent = GameObject.disposeGameObjectMeshRendererComponent;

let addGameObjectMeshRendererComponent = GameObject.addGameObjectMeshRendererComponent;

let hasGameObjectLightMaterialComponent = GameObject.hasGameObjectLightMaterialComponent;

let getGameObjectLightMaterialComponent = GameObject.getGameObjectLightMaterialComponent;

let disposeGameObjectLightMaterialComponent = GameObject.disposeGameObjectLightMaterialComponent;

let addGameObjectLightMaterialComponent = GameObject.addGameObjectLightMaterialComponent;

let hasGameObjectBasicMaterialComponent = GameObject.hasGameObjectBasicMaterialComponent;

let getGameObjectBasicMaterialComponent = GameObject.getGameObjectBasicMaterialComponent;

let disposeGameObjectBasicMaterialComponent = GameObject.disposeGameObjectBasicMaterialComponent;

let addGameObjectBasicMaterialComponent = GameObject.addGameObjectBasicMaterialComponent;

let hasGameObjectCameraControllerComponent = GameObject.hasGameObjectCameraControllerComponent;

let getGameObjectCameraControllerComponent = GameObject.getGameObjectCameraControllerComponent;

let disposeGameObjectCameraControllerComponent = GameObject.disposeGameObjectCameraControllerComponent;

let addGameObjectCameraControllerComponent = GameObject.addGameObjectCameraControllerComponent;

let hasGameObjectTransformComponent = GameObject.hasGameObjectTransformComponent;

let getGameObjectTransformComponent = GameObject.getGameObjectTransformComponent;

let disposeGameObjectTransformComponent = GameObject.disposeGameObjectTransformComponent;

let addGameObjectTransformComponent = GameObject.addGameObjectTransformComponent;

let createGameObject = GameObject.createGameObject;

let getCameraControllerWorldToCameraMatrix = CameraController.getCameraControllerWorldToCameraMatrix;

let getCameraControllerGameObject = CameraController.getCameraControllerGameObject;

let getCameraControllerPMatrix = CameraController.getCameraControllerPMatrix;

let setCameraControllerPerspectiveCamera = CameraController.setCameraControllerPerspectiveCamera;

let createCameraController = CameraController.createCameraController;

let setPerspectiveCameraFar = PerspectiveCamera.setPerspectiveCameraFar;

let getPerspectiveCameraFar = PerspectiveCamera.getPerspectiveCameraFar;

let setPerspectiveCameraNear = PerspectiveCamera.setPerspectiveCameraNear;

let getPerspectiveCameraNear = PerspectiveCamera.getPerspectiveCameraNear;

let setPerspectiveCameraAspect = PerspectiveCamera.setPerspectiveCameraAspect;

let getPerspectiveCameraAspect = PerspectiveCamera.getPerspectiveCameraAspect;

let setPerspectiveCameraFovy = PerspectiveCamera.setPerspectiveCameraFovy;

let getPerspectiveCameraFovy = PerspectiveCamera.getPerspectiveCameraFovy;

let setBoxGeometryConfigData = BoxGeometry.setBoxGeometryConfigData;

let createBoxGeometry = BoxGeometry.createBoxGeometry;

let getGeometryGameObject = Geometry.getGeometryGameObject;

let getGeometryConfigData = Geometry.getGeometryConfigData;

let setGeometryIndices = Geometry.setGeometryIndices;

let getGeometryIndices = Geometry.getGeometryIndices;

let setGeometryNormals = Geometry.setGeometryNormals;

let getGeometryNormals = Geometry.getGeometryNormals;

let setGeometryVertices = Geometry.setGeometryVertices;

let getGeometryVertices = Geometry.getGeometryVertices;

let getGeometryDrawMode = Geometry.getGeometryDrawMode;

let markSourceInstanceModelMatrixIsStatic = SourceInstance.markSourceInstanceModelMatrixIsStatic;

let getSourceInstanceObjectInstanceArray = SourceInstance.getSourceInstanceObjectInstanceArray;

let createSourceInstanceObjectInstance = SourceInstance.createSourceInstanceObjectInstance;

let createSourceInstance = SourceInstance.createSourceInstance;

let setAmbientLightColor = AmbientLight.setAmbientLightColor;

let getAmbientLightColor = AmbientLight.getAmbientLightColor;

let getAmbientLightGameObject = AmbientLight.getAmbientLightGameObject;

let createAmbientLight = AmbientLight.createAmbientLight;

let setDirectionLightIntensity = DirectionLight.setDirectionLightIntensity;

let getDirectionLightIntensity = DirectionLight.getDirectionLightIntensity;

let setDirectionLightColor = DirectionLight.setDirectionLightColor;

let getDirectionLightColor = DirectionLight.getDirectionLightColor;

let getDirectionLightGameObject = DirectionLight.getDirectionLightGameObject;

let createDirectionLight = DirectionLight.createDirectionLight;

let setPointLightRangeLevel = PointLight.setPointLightRangeLevel;

let setPointLightRange = PointLight.setPointLightRange;

let getPointLightRange = PointLight.getPointLightRange;

let setPointLightQuadratic = PointLight.setPointLightQuadratic;

let getPointLightQuadratic = PointLight.getPointLightQuadratic;

let setPointLightLinear = PointLight.setPointLightLinear;

let getPointLightLinear = PointLight.getPointLightLinear;

let setPointLightConstant = PointLight.setPointLightConstant;

let getPointLightConstant = PointLight.getPointLightConstant;

let setPointLightIntensity = PointLight.setPointLightIntensity;

let getPointLightIntensity = PointLight.getPointLightIntensity;

let setPointLightColor = PointLight.setPointLightColor;

let getPointLightColor = PointLight.getPointLightColor;

let getPointLightGameObject = PointLight.getPointLightGameObject;

let createPointLight = PointLight.createPointLight;

let setBasicMaterialColor = BasicMaterial.setBasicMaterialColor;

let getBasicMaterialColor = BasicMaterial.getBasicMaterialColor;

let getBasicMaterialGameObject = BasicMaterial.getBasicMaterialGameObject;

let createBasicMaterial = BasicMaterial.createBasicMaterial;

let setLightMaterialShininess = LightMaterial.setLightMaterialShininess;

let getLightMaterialShininess = LightMaterial.getLightMaterialShininess;

let setLightMaterialSpecularColor = LightMaterial.setLightMaterialSpecularColor;

let getLightMaterialSpecularColor = LightMaterial.getLightMaterialSpecularColor;

let setLightMaterialDiffuseColor = LightMaterial.setLightMaterialDiffuseColor;

let getLightMaterialDiffuseColor = LightMaterial.getLightMaterialDiffuseColor;

let getLightMaterialGameObject = LightMaterial.getLightMaterialGameObject;

let createLightMaterial = LightMaterial.createLightMaterial;

let getMeshRendererGameObject = MeshRenderer.getMeshRendererGameObject;

let createMeshRenderer = MeshRenderer.createMeshRenderer;

let setTransformPosition = Transform.setTransformPosition;

let getTransformPosition = Transform.getTransformPosition;

let setTransformLocalPosition = Transform.setTransformLocalPosition;

let getTransformLocalPosition = Transform.getTransformLocalPosition;

let getTransformChildren = Transform.getTransformChildren;

let setTransformParentKeepOrder = Transform.setTransformParentKeepOrder;

let setTransformParent = Transform.setTransformParent;

let getTransformParent = Transform.getTransformParent;

let getTransformGameObject = Transform.getTransformGameObject;

let createTransform = Transform.createTransform;

let load = LoaderManager.load;

let initDirector = Director.initDirector;

let startDirector = Director.startDirector;

let setState = State.setState;

let getState = State.getState;

let getStateData = State.getStateData;

let restoreState = State.restoreState;

let deepCopyStateForRestore = State.deepCopyStateForRestore;

let getFps = TimeController.getFps;

let getGameTime = TimeController.getGameTime;

let removeRenderRenderJob = Job.removeRenderRenderJob;

let removeRenderInitJob = Job.removeRenderInitJob;

let addRenderRenderJob = Job.addRenderRenderJob;

let addRenderInitJob = Job.addRenderInitJob;

let removeLogicUpdateJob = Job.removeLogicUpdateJob;

let removeLogicInitJob = Job.removeLogicInitJob;

let addLogicUpdateJob = Job.addLogicUpdateJob;

let addLogicInitJob = Job.addLogicInitJob;

let cloneGameObject = GameObject.cloneGameObject;

let batchDisposeGameObject = GameObject.batchDisposeGameObject;

let initGameObject = GameObject.initGameObject;

let disposeGameObject = GameObject.disposeGameObject;

let isGameObjectAlive = GameObject.isGameObjectAlive;

let hasGameObjectPointLightComponent = GameObject.hasGameObjectPointLightComponent;

let getGameObjectPointLightComponent = GameObject.getGameObjectPointLightComponent;

let disposeGameObjectPointLightComponent = GameObject.disposeGameObjectPointLightComponent;

let addGameObjectPointLightComponent = GameObject.addGameObjectPointLightComponent;

let hasGameObjectDirectionLightComponent = GameObject.hasGameObjectDirectionLightComponent;

let getGameObjectDirectionLightComponent = GameObject.getGameObjectDirectionLightComponent;

let disposeGameObjectDirectionLightComponent = GameObject.disposeGameObjectDirectionLightComponent;

let addGameObjectDirectionLightComponent = GameObject.addGameObjectDirectionLightComponent;

let hasGameObjectAmbientLightComponent = GameObject.hasGameObjectAmbientLightComponent;

let getGameObjectAmbientLightComponent = GameObject.getGameObjectAmbientLightComponent;

let disposeGameObjectAmbientLightComponent = GameObject.disposeGameObjectAmbientLightComponent;

let addGameObjectAmbientLightComponent = GameObject.addGameObjectAmbientLightComponent;

let disposeGameObjectObjectInstanceComponent = GameObject.disposeGameObjectObjectInstanceComponent;

let getGameObjectObjectInstanceComponent = GameObject.getGameObjectObjectInstanceComponent;

let addGameObjectObjectInstanceComponent = GameObject.addGameObjectObjectInstanceComponent;

let disposeGameObjectSourceInstanceComponent = GameObject.disposeGameObjectSourceInstanceComponent;

let hasGameObjectSourceInstanceComponent = GameObject.hasGameObjectSourceInstanceComponent;

let getGameObjectSourceInstanceComponent = GameObject.getGameObjectSourceInstanceComponent;

let addGameObjectSourceInstanceComponent = GameObject.addGameObjectSourceInstanceComponent;

let hasGameObjectGeometryComponent = GameObject.hasGameObjectGeometryComponent;

let getGameObjectGeometryComponent = GameObject.getGameObjectGeometryComponent;

let disposeGameObjectGeometryComponent = GameObject.disposeGameObjectGeometryComponent;

let addGameObjectGeometryComponent = GameObject.addGameObjectGeometryComponent;

let hasGameObjectMeshRendererComponent = GameObject.hasGameObjectMeshRendererComponent;

let getGameObjectMeshRendererComponent = GameObject.getGameObjectMeshRendererComponent;

let disposeGameObjectMeshRendererComponent = GameObject.disposeGameObjectMeshRendererComponent;

let addGameObjectMeshRendererComponent = GameObject.addGameObjectMeshRendererComponent;

let hasGameObjectLightMaterialComponent = GameObject.hasGameObjectLightMaterialComponent;

let getGameObjectLightMaterialComponent = GameObject.getGameObjectLightMaterialComponent;

let disposeGameObjectLightMaterialComponent = GameObject.disposeGameObjectLightMaterialComponent;

let addGameObjectLightMaterialComponent = GameObject.addGameObjectLightMaterialComponent;

let hasGameObjectBasicMaterialComponent = GameObject.hasGameObjectBasicMaterialComponent;

let getGameObjectBasicMaterialComponent = GameObject.getGameObjectBasicMaterialComponent;

let disposeGameObjectBasicMaterialComponent = GameObject.disposeGameObjectBasicMaterialComponent;

let addGameObjectBasicMaterialComponent = GameObject.addGameObjectBasicMaterialComponent;

let hasGameObjectCameraControllerComponent = GameObject.hasGameObjectCameraControllerComponent;

let getGameObjectCameraControllerComponent = GameObject.getGameObjectCameraControllerComponent;

let disposeGameObjectCameraControllerComponent = GameObject.disposeGameObjectCameraControllerComponent;

let addGameObjectCameraControllerComponent = GameObject.addGameObjectCameraControllerComponent;

let hasGameObjectTransformComponent = GameObject.hasGameObjectTransformComponent;

let getGameObjectTransformComponent = GameObject.getGameObjectTransformComponent;

let disposeGameObjectTransformComponent = GameObject.disposeGameObjectTransformComponent;

let addGameObjectTransformComponent = GameObject.addGameObjectTransformComponent;

let createGameObject = GameObject.createGameObject;