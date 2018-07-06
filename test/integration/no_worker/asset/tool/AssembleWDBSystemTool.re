let buildGLTFJsonOfMultiSceneGameObjects = () =>
  ConvertGLBTool.buildGLTFJson(
    ~scenes=
      {|
        [
            {
                "nodes": [0,1]
            }
        ]
        |},
    ~nodes={|
    [
{
},
{
}
    ]
    |},
    (),
  );

let testGLTF =
    (
      ~sandbox,
      ~embeddedGLTFJsonStr,
      ~testFunc,
      ~state,
      ~binBuffer=GLBTool.buildBinBuffer(),
      (),
    ) => {
  open Js.Promise;
  let result = ref(Obj.magic(1));

  GLBTool.prepare(sandbox);

  ConvertGLBSystem.convertGLBData((
    embeddedGLTFJsonStr |> Js.Json.parseExn,
    binBuffer,
  ))
  |. AssembleWDBSystem.assemble(state^)
  |> Most.forEach(data => result := data)
  |> then_(() => testFunc(result^) |> resolve);
};

let testGLB = (sandbox, glbFilePath, testFunc, state) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  ConvertGLBTool.testResult(sandbox, glbFilePath, ((wd, binBuffer)) =>
    AssembleWDBSystem.assembleGLBData(wd, binBuffer, state)
    |> Most.forEach(data => result := data)
    |> then_(() => testFunc(result^) |> resolve)
  );
};

let _getChildren = (parent, state) =>
  TransformAPI.unsafeGetTransformChildren(parent, state)
  |> Js.Array.sortInPlace;
let getAllChildrenTransform = (rootGameObject, state) => {
  let rec _addChildren = (parentArr, state, childrenArr) => {
    let childrenArr = childrenArr |> Js.Array.concat(parentArr);
    parentArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (state, childrenArr), parent) =>
           _addChildren(_getChildren(parent, state), state, childrenArr),
         (state, childrenArr),
       );
  };
  _addChildren(
    _getChildren(
      GameObjectAPI.unsafeGetGameObjectTransformComponent(
        rootGameObject,
        state,
      ),
      state,
    ),
    state,
    [||],
  );
};
let getAllSortedTransforms = (rootGameObject, state) => {
  let (state, allTransformChildren) =
    getAllChildrenTransform(rootGameObject, state);
  let allTransformChildren = allTransformChildren |> Js.Array.sortInPlace;
  [|
    GameObjectAPI.unsafeGetGameObjectTransformComponent(
      rootGameObject,
      state,
    ),
  |]
  |> Js.Array.concat(allTransformChildren);
};

let getAllGameObjects = (rootGameObject, state) => {
  let (state, allTransformChildren) =
    getAllChildrenTransform(rootGameObject, state);

  [|rootGameObject|]
  |> Js.Array.concat(
       allTransformChildren
       |> Js.Array.map(transform =>
            TransformAPI.unsafeGetTransformGameObject(transform, state)
          ),
     );
};

let getAllDirectionLightData = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectDirectionLightComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectDirectionLightComponent(
         gameObject,
         state,
       )
     )
  |> Js.Array.map(light =>
       (
         DirectionLightAPI.getDirectionLightColor(light, state),
         DirectionLightAPI.getDirectionLightIntensity(light, state),
       )
     );

let getAllPointLightData = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectPointLightComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectPointLightComponent(gameObject, state)
     )
  |> Js.Array.map(light =>
       (
         PointLightAPI.getPointLightColor(light, state),
         PointLightAPI.getPointLightIntensity(light, state),
         PointLightAPI.getPointLightConstant(light, state),
         PointLightAPI.getPointLightLinear(light, state),
         PointLightAPI.getPointLightQuadratic(light, state),
         PointLightAPI.getPointLightRange(light, state),
       )
     );

let getAllGeometryData = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectGeometryComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject => {
       let geometry =
         GameObjectAPI.unsafeGetGameObjectGeometryComponent(
           gameObject,
           state,
         );

       GameObjectAPI.hasGameObjectBoxGeometryComponent(gameObject, state) ?
         (
           GameObjectAPI.unsafeGetGameObjectName(gameObject, state),
           (
             BoxGeometryAPI.getBoxGeometryVertices(state),
             BoxGeometryAPI.getBoxGeometryNormals(state),
             BoxGeometryAPI.getBoxGeometryTexCoords(state),
             BoxGeometryAPI.getBoxGeometryIndices(state),
           ),
         ) :
         (
           GameObjectAPI.unsafeGetGameObjectName(gameObject, state),
           (
             CustomGeometryTool.getMainVertices(geometry, state),
             CustomGeometryTool.getMainNormals(geometry, state),
             CustomGeometryTool.getMainTexCoords(geometry, state),
             CustomGeometryTool.getMainIndices(geometry, state),
           ),
         );
     });

let batchCreate = BatchCreateSystem.batchCreate;

let getAllLightMaterials = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectLightMaterialComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectLightMaterialComponent(
         gameObject,
         state,
       )
     );

let getAllDiffuseMaps = (rootGameObject, state) =>
  getAllLightMaterials(rootGameObject, state)
  |> Js.Array.filter(lightMaterial =>
       LightMaterialAPI.hasLightMaterialDiffuseMap(lightMaterial, state)
     )
  |> Js.Array.map(lightMaterial =>
       LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(lightMaterial, state)
     );