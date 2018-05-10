let getBasicCameraViewWorldToCameraMatrix = BasicCameraViewAPI.getBasicCameraViewWorldToCameraMatrix;

let unsafeGetGameObjectBasicCameraView = BasicCameraViewAPI.unsafeGetGameObjectBasicCameraView;

let createBasicCameraView = BasicCameraViewAPI.createBasicCameraView;

let loopBody = DirectorAPI.loopBody;

let initDirector = DirectorAPI.initDirector;

let startDirector = DirectorAPI.startDirector;

let cloneGameObject = GameObjectAPI.cloneGameObject;

let batchDisposeGameObjectKeepOrder = GameObjectAPI.batchDisposeGameObjectKeepOrder;

let batchDisposeGameObject = GameObjectAPI.batchDisposeGameObject;

let initGameObject = GameObjectAPI.initGameObject;

let disposeGameObjectKeepOrder = GameObjectAPI.disposeGameObjectKeepOrder;

let disposeGameObject = GameObjectAPI.disposeGameObject;

let isGameObjectAlive = GameObjectAPI.isGameObjectAlive;

let disposeGameObjectObjectInstanceComponent = GameObjectAPI.disposeGameObjectObjectInstanceComponent;

let unsafeGetGameObjectObjectInstanceComponent = GameObjectAPI.unsafeGetGameObjectObjectInstanceComponent;

let addGameObjectObjectInstanceComponent = GameObjectAPI.addGameObjectObjectInstanceComponent;

let disposeGameObjectSourceInstanceComponent = GameObjectAPI.disposeGameObjectSourceInstanceComponent;

let hasGameObjectSourceInstanceComponent = GameObjectAPI.hasGameObjectSourceInstanceComponent;

let unsafeGetGameObjectSourceInstanceComponent = GameObjectAPI.unsafeGetGameObjectSourceInstanceComponent;

let addGameObjectSourceInstanceComponent = GameObjectAPI.addGameObjectSourceInstanceComponent;

let hasGameObjectPointLightComponent = GameObjectAPI.hasGameObjectPointLightComponent;

let unsafeGetGameObjectPointLightComponent = GameObjectAPI.unsafeGetGameObjectPointLightComponent;

let disposeGameObjectPointLightComponent = GameObjectAPI.disposeGameObjectPointLightComponent;

let addGameObjectPointLightComponent = GameObjectAPI.addGameObjectPointLightComponent;

let hasGameObjectDirectionLightComponent = GameObjectAPI.hasGameObjectDirectionLightComponent;

let unsafeGetGameObjectDirectionLightComponent = GameObjectAPI.unsafeGetGameObjectDirectionLightComponent;

let disposeGameObjectDirectionLightComponent = GameObjectAPI.disposeGameObjectDirectionLightComponent;

let addGameObjectDirectionLightComponent = GameObjectAPI.addGameObjectDirectionLightComponent;

let hasGameObjectAmbientLightComponent = GameObjectAPI.hasGameObjectAmbientLightComponent;

let unsafeGetGameObjectAmbientLightComponent = GameObjectAPI.unsafeGetGameObjectAmbientLightComponent;

let disposeGameObjectAmbientLightComponent = GameObjectAPI.disposeGameObjectAmbientLightComponent;

let addGameObjectAmbientLightComponent = GameObjectAPI.addGameObjectAmbientLightComponent;

let hasGameObjectMeshRendererComponent = GameObjectAPI.hasGameObjectMeshRendererComponent;

let unsafeGetGameObjectMeshRendererComponent = GameObjectAPI.unsafeGetGameObjectMeshRendererComponent;

let disposeGameObjectMeshRendererComponent = GameObjectAPI.disposeGameObjectMeshRendererComponent;

let addGameObjectMeshRendererComponent = GameObjectAPI.addGameObjectMeshRendererComponent;

let hasGameObjectLightMaterialComponent = GameObjectAPI.hasGameObjectLightMaterialComponent;

let unsafeGetGameObjectLightMaterialComponent = GameObjectAPI.unsafeGetGameObjectLightMaterialComponent;

let disposeGameObjectLightMaterialComponent = GameObjectAPI.disposeGameObjectLightMaterialComponent;

let addGameObjectLightMaterialComponent = GameObjectAPI.addGameObjectLightMaterialComponent;

let hasGameObjectBasicMaterialComponent = GameObjectAPI.hasGameObjectBasicMaterialComponent;

let unsafeGetGameObjectBasicMaterialComponent = GameObjectAPI.unsafeGetGameObjectBasicMaterialComponent;

let disposeGameObjectBasicMaterialComponent = GameObjectAPI.disposeGameObjectBasicMaterialComponent;

let addGameObjectBasicMaterialComponent = GameObjectAPI.addGameObjectBasicMaterialComponent;

let hasGameObjectCustomGeometryComponent = GameObjectAPI.hasGameObjectCustomGeometryComponent;

let disposeGameObjectCustomGeometryComponent = GameObjectAPI.disposeGameObjectCustomGeometryComponent;

let addGameObjectCustomGeometryComponent = GameObjectAPI.addGameObjectCustomGeometryComponent;

let hasGameObjectBoxGeometryComponent = GameObjectAPI.hasGameObjectBoxGeometryComponent;

let disposeGameObjectBoxGeometryComponent = GameObjectAPI.disposeGameObjectBoxGeometryComponent;

let addGameObjectBoxGeometryComponent = GameObjectAPI.addGameObjectBoxGeometryComponent;

let unsafeGetGameObjectGeometryComponent = GameObjectAPI.unsafeGetGameObjectGeometryComponent;

let hasGameObjectTransformComponent = GameObjectAPI.hasGameObjectTransformComponent;

let unsafeGetGameObjectTransformComponent = GameObjectAPI.unsafeGetGameObjectTransformComponent;

let disposeGameObjectTransformComponent = GameObjectAPI.disposeGameObjectTransformComponent;

let addGameObjectTransformComponent = GameObjectAPI.addGameObjectTransformComponent;

let hasGameObjectPerspectiveCameraProjectionComponent = GameObjectAPI.hasGameObjectPerspectiveCameraProjectionComponent;

let unsafeGetGameObjectPerspectiveCameraProjectionComponent = GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent;

let disposeGameObjectPerspectiveCameraProjectionComponent = GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent;

let addGameObjectPerspectiveCameraProjectionComponent = GameObjectAPI.addGameObjectPerspectiveCameraProjectionComponent;

let hasGameObjectBasicCameraViewComponent = GameObjectAPI.hasGameObjectBasicCameraViewComponent;

let unsafeGetGameObjectBasicCameraViewComponent = GameObjectAPI.unsafeGetGameObjectBasicCameraViewComponent;

let disposeGameObjectBasicCameraViewComponent = GameObjectAPI.disposeGameObjectBasicCameraViewComponent;

let addGameObjectBasicCameraViewComponent = GameObjectAPI.addGameObjectBasicCameraViewComponent;

let createGameObject = GameObjectAPI.createGameObject;

let unsafeGetBoxGeometryGameObject = BoxGeometryAPI.unsafeGetBoxGeometryGameObject;

let getBoxGeometryIndices = BoxGeometryAPI.getBoxGeometryIndices;

let getBoxGeometryNormals = BoxGeometryAPI.getBoxGeometryNormals;

let getBoxGeometryTexCoords = BoxGeometryAPI.getBoxGeometryTexCoords;

let getBoxGeometryVertices = BoxGeometryAPI.getBoxGeometryVertices;

let getBoxGeometryDrawMode = BoxGeometryAPI.getBoxGeometryDrawMode;

let createBoxGeometry = BoxGeometryAPI.createBoxGeometry;

let unsafeGetCustomGeometryGameObject = CustomGeometryAPI.unsafeGetCustomGeometryGameObject;

let setCustomGeometryIndices = CustomGeometryAPI.setCustomGeometryIndices;

let getCustomGeometryIndices = CustomGeometryAPI.getCustomGeometryIndices;

let setCustomGeometryNormals = CustomGeometryAPI.setCustomGeometryNormals;

let getCustomGeometryNormals = CustomGeometryAPI.getCustomGeometryNormals;

let setCustomGeometryTexCoords = CustomGeometryAPI.setCustomGeometryTexCoords;

let getCustomGeometryTexCoords = CustomGeometryAPI.getCustomGeometryTexCoords;

let setCustomGeometryVertices = CustomGeometryAPI.setCustomGeometryVertices;

let getCustomGeometryVertices = CustomGeometryAPI.getCustomGeometryVertices;

let getCustomGeometryDrawMode = CustomGeometryAPI.getCustomGeometryDrawMode;

let createCustomGeometry = CustomGeometryAPI.createCustomGeometry;

let removeWorkerMainLoopJob = JobAPI.removeWorkerMainLoopJob;

let addWorkerMainLoopJob = JobAPI.addWorkerMainLoopJob;

let removeWorkerMainInitJob = JobAPI.removeWorkerMainInitJob;

let addWorkerMainInitJob = JobAPI.addWorkerMainInitJob;

let removeNoWorkerLoopJob = JobAPI.removeNoWorkerLoopJob;

let removeNoWorkerInitJob = JobAPI.removeNoWorkerInitJob;

let addNoWorkerLoopJob = JobAPI.addNoWorkerLoopJob;

let addNoWorkerInitJob = JobAPI.addNoWorkerInitJob;

let setAmbientLightColor = AmbientLightAPI.setAmbientLightColor;

let getAmbientLightColor = AmbientLightAPI.getAmbientLightColor;

let unsafeGetAmbientLightGameObject = AmbientLightAPI.unsafeGetAmbientLightGameObject;

let createAmbientLight = AmbientLightAPI.createAmbientLight;

let setDirectionLightIntensity = DirectionLightAPI.setDirectionLightIntensity;

let getDirectionLightIntensity = DirectionLightAPI.getDirectionLightIntensity;

let setDirectionLightColor = DirectionLightAPI.setDirectionLightColor;

let getDirectionLightColor = DirectionLightAPI.getDirectionLightColor;

let unsafeGetDirectionLightGameObject = DirectionLightAPI.unsafeGetDirectionLightGameObject;

let createDirectionLight = DirectionLightAPI.createDirectionLight;

let setPointLightRangeLevel = PointLightAPI.setPointLightRangeLevel;

let setPointLightRange = PointLightAPI.setPointLightRange;

let getPointLightRange = PointLightAPI.getPointLightRange;

let setPointLightQuadratic = PointLightAPI.setPointLightQuadratic;

let getPointLightQuadratic = PointLightAPI.getPointLightQuadratic;

let setPointLightLinear = PointLightAPI.setPointLightLinear;

let getPointLightLinear = PointLightAPI.getPointLightLinear;

let setPointLightConstant = PointLightAPI.setPointLightConstant;

let getPointLightConstant = PointLightAPI.getPointLightConstant;

let setPointLightIntensity = PointLightAPI.setPointLightIntensity;

let getPointLightIntensity = PointLightAPI.getPointLightIntensity;

let setPointLightColor = PointLightAPI.setPointLightColor;

let getPointLightColor = PointLightAPI.getPointLightColor;

let unsafeGetPointLightGameObject = PointLightAPI.unsafeGetPointLightGameObject;

let createPointLight = PointLightAPI.createPointLight;

let loadToData = LoaderManagerAPI.loadToData;

let load = LoaderManagerAPI.load;

let setBasicMaterialMap = BasicMaterialAPI.setBasicMaterialMap;

let getBasicMaterialMap = BasicMaterialAPI.getBasicMaterialMap;

let setBasicMaterialColor = BasicMaterialAPI.setBasicMaterialColor;

let getBasicMaterialColor = BasicMaterialAPI.getBasicMaterialColor;

let unsafeGetBasicMaterialGameObject = BasicMaterialAPI.unsafeGetBasicMaterialGameObject;

let createBasicMaterial = BasicMaterialAPI.createBasicMaterial;

let setLightMaterialShininess = LightMaterialAPI.setLightMaterialShininess;

let getLightMaterialShininess = LightMaterialAPI.getLightMaterialShininess;

let setLightMaterialSpecularColor = LightMaterialAPI.setLightMaterialSpecularColor;

let getLightMaterialSpecularColor = LightMaterialAPI.getLightMaterialSpecularColor;

let setLightMaterialDiffuseColor = LightMaterialAPI.setLightMaterialDiffuseColor;

let getLightMaterialDiffuseColor = LightMaterialAPI.getLightMaterialDiffuseColor;

let unsafeGetLightMaterialGameObject = LightMaterialAPI.unsafeGetLightMaterialGameObject;

let createLightMaterial = LightMaterialAPI.createLightMaterial;

let unsafeGetMeshRendererGameObject = MeshRendererAPI.unsafeGetMeshRendererGameObject;

let createMeshRenderer = MeshRendererAPI.createMeshRenderer;

let setPerspectiveCameraFar = PerspectiveCameraProjectionAPI.setPerspectiveCameraFar;

let unsafeGetPerspectiveCameraFar = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFar;

let setPerspectiveCameraNear = PerspectiveCameraProjectionAPI.setPerspectiveCameraNear;

let unsafeGetPerspectiveCameraNear = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraNear;

let setPerspectiveCameraAspect = PerspectiveCameraProjectionAPI.setPerspectiveCameraAspect;

let unsafeGetPerspectiveCameraAspect = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraAspect;

let setPerspectiveCameraFovy = PerspectiveCameraProjectionAPI.setPerspectiveCameraFovy;

let unsafeGetPerspectiveCameraFovy = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFovy;

let unsafeGetPerspectiveCameraProjectionGameObject = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraProjectionGameObject;

let unsafeGetPerspectiveCameraProjectionPMatrix = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraProjectionPMatrix;

let createPerspectiveCameraProjection = PerspectiveCameraProjectionAPI.createPerspectiveCameraProjection;

let setCurrentCameraGameObject = SceneAPI.setCurrentCameraGameObject;

let getCurrentCameraGameObject = SceneAPI.getCurrentCameraGameObject;

let markSourceInstanceModelMatrixIsStatic = SourceInstanceAPI.markSourceInstanceModelMatrixIsStatic;

let getSourceInstanceObjectInstanceTransformArray = SourceInstanceAPI.getSourceInstanceObjectInstanceTransformArray;

let createObjectInstanceGameObject = SourceInstanceAPI.createObjectInstanceGameObject;

let unsafeGetSourceInstanceGameObject = SourceInstanceAPI.unsafeGetSourceInstanceGameObject;

let createSourceInstance = SourceInstanceAPI.createSourceInstance;

let setIsDebug = StateAPI.setIsDebug;

let setStateToData = StateAPI.setStateToData;

let setState = StateAPI.setState;

let createState = StateAPI.createState;

let getStateFromData = StateAPI.getStateFromData;

let unsafeGetState = StateAPI.unsafeGetState;

let createStateData = StateAPI.createStateData;

let getStateData = StateAPI.getStateData;

let restoreState = StateAPI.restoreState;

let deepCopyForRestore = StateAPI.deepCopyForRestore;

let setTextureHeight = TextureAPI.setTextureHeight;

let getTextureHeight = TextureAPI.getTextureHeight;

let setTextureWidth = TextureAPI.setTextureWidth;

let getTextureWidth = TextureAPI.getTextureWidth;

let setTextureSource = TextureAPI.setTextureSource;

let unsafeGetTextureSource = TextureAPI.unsafeGetTextureSource;

let createTexture = TextureAPI.createTexture;

let getFps = TimeControllerAPI.getFps;

let getGameTime = TimeControllerAPI.getGameTime;

let setTransformPosition = TransformAPI.setTransformPosition;

let getTransformPosition = TransformAPI.getTransformPosition;

let setTransformLocalPosition = TransformAPI.setTransformLocalPosition;

let getTransformLocalPosition = TransformAPI.getTransformLocalPosition;

let unsafeGetTransformChildren = TransformAPI.unsafeGetTransformChildren;

let setTransformParentKeepOrder = TransformAPI.setTransformParentKeepOrder;

let setTransformParent = TransformAPI.setTransformParent;

let unsafeGetTransformParent = TransformAPI.unsafeGetTransformParent;

let unsafeGetTransformGameObject = TransformAPI.unsafeGetTransformGameObject;

let createTransform = TransformAPI.createTransform;

let getBasicCameraViewWorldToCameraMatrix = BasicCameraViewAPI.getBasicCameraViewWorldToCameraMatrix;

let unsafeGetGameObjectBasicCameraView = BasicCameraViewAPI.unsafeGetGameObjectBasicCameraView;

let createBasicCameraView = BasicCameraViewAPI.createBasicCameraView;

let loopBody = DirectorAPI.loopBody;

let initDirector = DirectorAPI.initDirector;

let startDirector = DirectorAPI.startDirector;

let cloneGameObject = GameObjectAPI.cloneGameObject;

let batchDisposeGameObjectKeepOrder = GameObjectAPI.batchDisposeGameObjectKeepOrder;

let batchDisposeGameObject = GameObjectAPI.batchDisposeGameObject;

let initGameObject = GameObjectAPI.initGameObject;

let disposeGameObjectKeepOrder = GameObjectAPI.disposeGameObjectKeepOrder;

let disposeGameObject = GameObjectAPI.disposeGameObject;

let isGameObjectAlive = GameObjectAPI.isGameObjectAlive;

let disposeGameObjectObjectInstanceComponent = GameObjectAPI.disposeGameObjectObjectInstanceComponent;

let unsafeGetGameObjectObjectInstanceComponent = GameObjectAPI.unsafeGetGameObjectObjectInstanceComponent;

let addGameObjectObjectInstanceComponent = GameObjectAPI.addGameObjectObjectInstanceComponent;

let disposeGameObjectSourceInstanceComponent = GameObjectAPI.disposeGameObjectSourceInstanceComponent;

let hasGameObjectSourceInstanceComponent = GameObjectAPI.hasGameObjectSourceInstanceComponent;

let unsafeGetGameObjectSourceInstanceComponent = GameObjectAPI.unsafeGetGameObjectSourceInstanceComponent;

let addGameObjectSourceInstanceComponent = GameObjectAPI.addGameObjectSourceInstanceComponent;

let hasGameObjectPointLightComponent = GameObjectAPI.hasGameObjectPointLightComponent;

let unsafeGetGameObjectPointLightComponent = GameObjectAPI.unsafeGetGameObjectPointLightComponent;

let disposeGameObjectPointLightComponent = GameObjectAPI.disposeGameObjectPointLightComponent;

let addGameObjectPointLightComponent = GameObjectAPI.addGameObjectPointLightComponent;

let hasGameObjectDirectionLightComponent = GameObjectAPI.hasGameObjectDirectionLightComponent;

let unsafeGetGameObjectDirectionLightComponent = GameObjectAPI.unsafeGetGameObjectDirectionLightComponent;

let disposeGameObjectDirectionLightComponent = GameObjectAPI.disposeGameObjectDirectionLightComponent;

let addGameObjectDirectionLightComponent = GameObjectAPI.addGameObjectDirectionLightComponent;

let hasGameObjectAmbientLightComponent = GameObjectAPI.hasGameObjectAmbientLightComponent;

let unsafeGetGameObjectAmbientLightComponent = GameObjectAPI.unsafeGetGameObjectAmbientLightComponent;

let disposeGameObjectAmbientLightComponent = GameObjectAPI.disposeGameObjectAmbientLightComponent;

let addGameObjectAmbientLightComponent = GameObjectAPI.addGameObjectAmbientLightComponent;

let hasGameObjectMeshRendererComponent = GameObjectAPI.hasGameObjectMeshRendererComponent;

let unsafeGetGameObjectMeshRendererComponent = GameObjectAPI.unsafeGetGameObjectMeshRendererComponent;

let disposeGameObjectMeshRendererComponent = GameObjectAPI.disposeGameObjectMeshRendererComponent;

let addGameObjectMeshRendererComponent = GameObjectAPI.addGameObjectMeshRendererComponent;

let hasGameObjectLightMaterialComponent = GameObjectAPI.hasGameObjectLightMaterialComponent;

let unsafeGetGameObjectLightMaterialComponent = GameObjectAPI.unsafeGetGameObjectLightMaterialComponent;

let disposeGameObjectLightMaterialComponent = GameObjectAPI.disposeGameObjectLightMaterialComponent;

let addGameObjectLightMaterialComponent = GameObjectAPI.addGameObjectLightMaterialComponent;

let hasGameObjectBasicMaterialComponent = GameObjectAPI.hasGameObjectBasicMaterialComponent;

let unsafeGetGameObjectBasicMaterialComponent = GameObjectAPI.unsafeGetGameObjectBasicMaterialComponent;

let disposeGameObjectBasicMaterialComponent = GameObjectAPI.disposeGameObjectBasicMaterialComponent;

let addGameObjectBasicMaterialComponent = GameObjectAPI.addGameObjectBasicMaterialComponent;

let hasGameObjectCustomGeometryComponent = GameObjectAPI.hasGameObjectCustomGeometryComponent;

let disposeGameObjectCustomGeometryComponent = GameObjectAPI.disposeGameObjectCustomGeometryComponent;

let addGameObjectCustomGeometryComponent = GameObjectAPI.addGameObjectCustomGeometryComponent;

let hasGameObjectBoxGeometryComponent = GameObjectAPI.hasGameObjectBoxGeometryComponent;

let disposeGameObjectBoxGeometryComponent = GameObjectAPI.disposeGameObjectBoxGeometryComponent;

let addGameObjectBoxGeometryComponent = GameObjectAPI.addGameObjectBoxGeometryComponent;

let unsafeGetGameObjectGeometryComponent = GameObjectAPI.unsafeGetGameObjectGeometryComponent;

let hasGameObjectTransformComponent = GameObjectAPI.hasGameObjectTransformComponent;

let unsafeGetGameObjectTransformComponent = GameObjectAPI.unsafeGetGameObjectTransformComponent;

let disposeGameObjectTransformComponent = GameObjectAPI.disposeGameObjectTransformComponent;

let addGameObjectTransformComponent = GameObjectAPI.addGameObjectTransformComponent;

let hasGameObjectPerspectiveCameraProjectionComponent = GameObjectAPI.hasGameObjectPerspectiveCameraProjectionComponent;

let unsafeGetGameObjectPerspectiveCameraProjectionComponent = GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent;

let disposeGameObjectPerspectiveCameraProjectionComponent = GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent;

let addGameObjectPerspectiveCameraProjectionComponent = GameObjectAPI.addGameObjectPerspectiveCameraProjectionComponent;

let hasGameObjectBasicCameraViewComponent = GameObjectAPI.hasGameObjectBasicCameraViewComponent;

let unsafeGetGameObjectBasicCameraViewComponent = GameObjectAPI.unsafeGetGameObjectBasicCameraViewComponent;

let disposeGameObjectBasicCameraViewComponent = GameObjectAPI.disposeGameObjectBasicCameraViewComponent;

let addGameObjectBasicCameraViewComponent = GameObjectAPI.addGameObjectBasicCameraViewComponent;

let createGameObject = GameObjectAPI.createGameObject;

let removeWorkerMainLoopJob = JobAPI.removeWorkerMainLoopJob;

let addWorkerMainLoopJob = JobAPI.addWorkerMainLoopJob;

let removeWorkerMainInitJob = JobAPI.removeWorkerMainInitJob;

let addWorkerMainInitJob = JobAPI.addWorkerMainInitJob;

let removeNoWorkerLoopJob = JobAPI.removeNoWorkerLoopJob;

let removeNoWorkerInitJob = JobAPI.removeNoWorkerInitJob;

let addNoWorkerLoopJob = JobAPI.addNoWorkerLoopJob;

let addNoWorkerInitJob = JobAPI.addNoWorkerInitJob;

let loadToData = LoaderManagerAPI.loadToData;

let load = LoaderManagerAPI.load;

let unsafeGetMeshRendererGameObject = MeshRendererAPI.unsafeGetMeshRendererGameObject;

let createMeshRenderer = MeshRendererAPI.createMeshRenderer;

let setPerspectiveCameraFar = PerspectiveCameraProjectionAPI.setPerspectiveCameraFar;

let unsafeGetPerspectiveCameraFar = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFar;

let setPerspectiveCameraNear = PerspectiveCameraProjectionAPI.setPerspectiveCameraNear;

let unsafeGetPerspectiveCameraNear = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraNear;

let setPerspectiveCameraAspect = PerspectiveCameraProjectionAPI.setPerspectiveCameraAspect;

let unsafeGetPerspectiveCameraAspect = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraAspect;

let setPerspectiveCameraFovy = PerspectiveCameraProjectionAPI.setPerspectiveCameraFovy;

let unsafeGetPerspectiveCameraFovy = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFovy;

let unsafeGetPerspectiveCameraProjectionGameObject = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraProjectionGameObject;

let unsafeGetPerspectiveCameraProjectionPMatrix = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraProjectionPMatrix;

let createPerspectiveCameraProjection = PerspectiveCameraProjectionAPI.createPerspectiveCameraProjection;

let setCurrentCameraGameObject = SceneAPI.setCurrentCameraGameObject;

let getCurrentCameraGameObject = SceneAPI.getCurrentCameraGameObject;

let markSourceInstanceModelMatrixIsStatic = SourceInstanceAPI.markSourceInstanceModelMatrixIsStatic;

let getSourceInstanceObjectInstanceTransformArray = SourceInstanceAPI.getSourceInstanceObjectInstanceTransformArray;

let createObjectInstanceGameObject = SourceInstanceAPI.createObjectInstanceGameObject;

let unsafeGetSourceInstanceGameObject = SourceInstanceAPI.unsafeGetSourceInstanceGameObject;

let createSourceInstance = SourceInstanceAPI.createSourceInstance;

let setIsDebug = StateAPI.setIsDebug;

let setStateToData = StateAPI.setStateToData;

let setState = StateAPI.setState;

let createState = StateAPI.createState;

let getStateFromData = StateAPI.getStateFromData;

let unsafeGetState = StateAPI.unsafeGetState;

let createStateData = StateAPI.createStateData;

let getStateData = StateAPI.getStateData;

let restoreState = StateAPI.restoreState;

let deepCopyForRestore = StateAPI.deepCopyForRestore;

let setTextureHeight = TextureAPI.setTextureHeight;

let getTextureHeight = TextureAPI.getTextureHeight;

let setTextureWidth = TextureAPI.setTextureWidth;

let getTextureWidth = TextureAPI.getTextureWidth;

let setTextureSource = TextureAPI.setTextureSource;

let unsafeGetTextureSource = TextureAPI.unsafeGetTextureSource;

let createTexture = TextureAPI.createTexture;

let getFps = TimeControllerAPI.getFps;

let getGameTime = TimeControllerAPI.getGameTime;

let setTransformPosition = TransformAPI.setTransformPosition;

let getTransformPosition = TransformAPI.getTransformPosition;

let setTransformLocalPosition = TransformAPI.setTransformLocalPosition;

let getTransformLocalPosition = TransformAPI.getTransformLocalPosition;

let unsafeGetTransformChildren = TransformAPI.unsafeGetTransformChildren;

let setTransformParentKeepOrder = TransformAPI.setTransformParentKeepOrder;

let setTransformParent = TransformAPI.setTransformParent;

let unsafeGetTransformParent = TransformAPI.unsafeGetTransformParent;

let unsafeGetTransformGameObject = TransformAPI.unsafeGetTransformGameObject;

let createTransform = TransformAPI.createTransform;