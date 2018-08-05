open WonderBsJson.Json;

open Encode;

open StateDataMainType;

open GenerateSceneGraphType;

let _encodeNodeTransform = ({translation, rotation, scale}: nodeData, list) => {
  let list =
    switch (translation) {
    | None => list
    | Some(translation) => [
        ("translation", translation |> positionTupleToArray |> numberArray),
        ...list,
      ]
    };

  let list =
    switch (rotation) {
    | None => list
    | Some(rotation) => [
        ("rotation", rotation |> rotationTupleToArray |> numberArray),
        ...list,
      ]
    };

  switch (scale) {
  | None => list
  | Some(scale) => [
      ("scale", scale |> scaleTupleToArray |> numberArray),
      ...list,
    ]
  };
};

let _encodeNodeExtensions = (extensions, list) =>
  switch (extensions) {
  | None => list
  | Some(({khr_lights}: nodeExtensions)) =>
    let extensionList = [];
    let extensionList =
      switch (khr_lights) {
      | None => extensionList
      | Some({light}) => [
          ("KHR_lights", [("light", light |> int)] |> object_),
          ...extensionList,
        ]
      };

    [("extensions", extensionList |> object_), ...list];
  };

let _encodeNodeMaterial = (basicMaterial, lightMaterial, extraList) => {
  let extraList =
    switch (basicMaterial) {
    | None => extraList
    | Some(basicMaterial) => [
        ("basicMaterial", basicMaterial |> int),
        ...extraList,
      ]
    };

  let extraList =
    switch (lightMaterial) {
    | None => extraList
    | Some(lightMaterial) => [
        ("lightMaterial", lightMaterial |> int),
        ...extraList,
      ]
    };

  extraList;
};

let _encodeNodeCameraController = (cameraController, extraList) =>
  switch (cameraController) {
  | None => extraList
  | Some(cameraController) => [
      ("cameraController", cameraController |> int),
      ...extraList,
    ]
  };

let _encodeNodeExtras = (extras, list) =>
  switch (extras) {
  | None => list
  | Some(
      (
        {
          basicCameraView,
          meshRenderer,
          basicMaterial,
          lightMaterial,
          cameraController,
        }: nodeExtras
      ),
    ) =>
    let extraList = [];

    let extraList =
      switch (basicCameraView) {
      | None => extraList
      | Some(basicCameraView) => [
          ("basicCameraView", basicCameraView |> int),
          ...extraList,
        ]
      };

    let extraList =
      switch (meshRenderer) {
      | None => extraList
      | Some(meshRenderer) => [
          ("meshRenderer", meshRenderer |> int),
          ...extraList,
        ]
      };

    let extraList =
      _encodeNodeMaterial(basicMaterial, lightMaterial, extraList);

    let extraList = _encodeNodeCameraController(cameraController, extraList);

    [("extras", extraList |> object_), ...list];
  };

let _encodeNodeComponents =
    ({mesh, camera, extras, extensions}: nodeData, list) => {
  let list =
    switch (mesh) {
    | None => list
    | Some(mesh) => [("mesh", mesh |> int), ...list]
    };

  let list =
    switch (camera) {
    | None => list
    | Some(camera) => [("camera", camera |> int), ...list]
    };

  let list = _encodeNodeExtras(extras, list);

  _encodeNodeExtensions(extensions, list);
};

let _encodeNodes = (nodeDataArr, state) => (
  "nodes",
  nodeDataArr
  |> Js.Array.map((({gameObject, children}: nodeData) as nodeData) => {
       let list = [];

       let list =
         switch (NameGameObjectMainService.getName(gameObject, state)) {
         | None => list
         | Some(name) => [("name", name |> string), ...list]
         };

       let list =
         switch (children) {
         | None => list
         | Some(children) => [("children", children |> intArray), ...list]
         };

       let list =
         list
         |> _encodeNodeTransform(nodeData)
         |> _encodeNodeComponents(nodeData);

       list |> List.rev |> object_;
     })
  |> jsonArray,
);

let _encodePerspectiveCamera = ({near, far, fovy, aspect}) => {
  let perspectiveList = [("znear", near |> float), ("yfov", fovy |> float)];

  let perspectiveList =
    switch (far) {
    | None => perspectiveList
    | Some(far) => [("zfar", far |> float), ...perspectiveList]
    };

  switch (aspect) {
  | None => perspectiveList
  | Some(aspect) => [("aspectRatio", aspect |> float), ...perspectiveList]
  };
};

let _encodeCameras = cameraProjectionDataArr => (
  "cameras",
  cameraProjectionDataArr
  |> Js.Array.map(({type_, perspective}: cameraProjectionData) =>
       [
         ("type", type_ |> string),
         ("perspective", _encodePerspectiveCamera(perspective) |> object_),
       ]
       |> object_
     )
  |> jsonArray,
);

let _encodeExtras =
    (
      basicCameraViewDataArr,
      meshRendererDataArr,
      basicMaterialDataArr,
      arcballCameraControllerDataArr,
    ) => {
  let extrasList = [];

  let extrasList =
    switch (basicCameraViewDataArr |> Js.Array.length) {
    | 0 => extrasList
    | _ => [
        (
          "basicCameraViews",
          basicCameraViewDataArr
          |> Js.Array.map((({isActive}: basicCameraViewData) as data) =>
               [("isActive", isActive |> bool)] |> object_
             )
          |> jsonArray,
        ),
        ...extrasList,
      ]
    };

  let extrasList =
    switch (meshRendererDataArr |> Js.Array.length) {
    | 0 => extrasList
    | _ => [
        (
          "meshRenderers",
          meshRendererDataArr
          |> Js.Array.map((({drawMode}: meshRendererData) as data) =>
               [("drawMode", drawMode |> int)] |> object_
             )
          |> jsonArray,
        ),
        ...extrasList,
      ]
    };

  let extrasList =
    switch (basicMaterialDataArr |> Js.Array.length) {
    | 0 => extrasList
    | _ => [
        (
          "basicMaterials",
          basicMaterialDataArr
          |> Js.Array.map((({colorFactor, name}: basicMaterialData) as data) => {
               let list = [];

               let list =
                 switch (colorFactor) {
                 | None => list
                 | Some(colorFactor) => [
                     ("colorFactor", colorFactor |> numberArray),
                     ...list,
                   ]
                 };

               let list =
                 switch (name) {
                 | None => list
                 | Some(name) => [("name", name |> string), ...list]
                 };

               list |> object_;
             })
          |> jsonArray,
        ),
        ...extrasList,
      ]
    };

  let extrasList =
    switch (arcballCameraControllerDataArr |> Js.Array.length) {
    | 0 => extrasList
    | _ => [
        (
          "arcballCameraControllers",
          arcballCameraControllerDataArr
          |> Js.Array.map(
               (
                 (
                   {
                     distance,
                     minDistance,
                     phi,
                     theta,
                     thetaMargin,
                     target,
                     moveSpeedX,
                     moveSpeedY,
                     rotateSpeed,
                     wheelSpeed,
                     isBindEvent,
                   }: arcballCameraControllerData
                 ) as data,
               ) =>
               [
                 ("distance", distance |> float),
                 ("minDistance", minDistance |> float),
                 ("phi", phi |> float),
                 ("theta", theta |> float),
                 ("thetaMargin", thetaMargin |> float),
                 ("target", target |> targetTupleToArray |> numberArray),
                 ("moveSpeedX", moveSpeedX |> float),
                 ("moveSpeedY", moveSpeedY |> float),
                 ("rotateSpeed", rotateSpeed |> float),
                 ("wheelSpeed", wheelSpeed |> float),
                 ("isBindEvent", isBindEvent |> bool),
               ]
               |> object_
             )
          |> jsonArray,
        ),
        ...extrasList,
      ]
    };

  ("extras", extrasList |> object_);
};

let _encodeSceneExtras = imguiData => {
  let extrasList = [];

  let extrasList =
    switch (imguiData) {
    | (None, None) => extrasList

    | (Some(customData), Some(imguiFuncStr)) => [
        (
          "imgui",
          [
            ("customData", customData |> Obj.magic |> int),
            ("imguiFunc", imguiFuncStr |> string),
          ]
          |> object_,
        ),
        ...extrasList,
      ]
    | _ =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_encodeScenes",
          ~description={j|imguiData error|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    };

  [("extras", extrasList |> object_)];
};

let _encodeScenes = (extensionsUsedArr, (lightDataArr, imguiData), state) => {
  let list = [("nodes", [|0|] |> intArray)];

  let list =
    extensionsUsedArr |> Js.Array.includes("KHR_lights") ?
      [
        (
          "extensions",
          [
            (
              "KHR_lights",
              [
                (
                  "light",
                  BuildLightDataSystem.getAmbientLightIndex(lightDataArr)
                  |> int,
                ),
              ]
              |> object_,
            ),
          ]
          |> object_,
        ),
        ...list,
      ] :
      list;

  let list = list @ _encodeSceneExtras(imguiData);

  ("scenes", [|list |> object_|] |> jsonArray);
};

let _encodeLightMaterials = materialDataArr => (
  "materials",
  materialDataArr
  |> Js.Array.map(
       ({baseColorFactor, baseColorTexture, name}: lightMaterialData) => {
       let list = [];

       let list =
         switch (name) {
         | None => list
         | Some(name) => [("name", name |> string), ...list]
         };

       let pbrMetallicRoughnessList = [];

       let pbrMetallicRoughnessList =
         switch (baseColorFactor) {
         | None => pbrMetallicRoughnessList
         | Some(baseColorFactor) => [
             ("baseColorFactor", baseColorFactor |> numberArray),
             ...pbrMetallicRoughnessList,
           ]
         };

       let pbrMetallicRoughnessList =
         switch (baseColorTexture) {
         | None => pbrMetallicRoughnessList
         | Some(baseColorTexture) => [
             (
               "baseColorTexture",
               [("index", baseColorTexture |> int)] |> object_,
             ),
             ...pbrMetallicRoughnessList,
           ]
         };

       let list = [
         ("pbrMetallicRoughness", pbrMetallicRoughnessList |> object_),
         ...list,
       ];

       list |> List.rev |> object_;
     })
  |> jsonArray,
);

let _encodeTextures = textureDataArr => (
  "textures",
  textureDataArr
  |> Js.Array.map(({name, sampler, source}: textureData) => {
       let list = [];

       let list =
         switch (name) {
         | None => list
         | Some(name) => [("name", name |> string), ...list]
         };

       let list = [
         ("sampler", sampler |> int),
         ("source", source |> int),
         ...list,
       ];

       list |> object_;
     })
  |> jsonArray,
);

let _encodeSamplers = samplerDataArr => (
  "samplers",
  samplerDataArr
  |> Js.Array.map(({wrapS, wrapT, magFilter, minFilter}: samplerData) => {
       let list = [
         ("wrapS", wrapS |> int),
         ("wrapT", wrapT |> int),
         ("magFilter", magFilter |> int),
         ("minFilter", minFilter |> int),
       ];

       list |> object_;
     })
  |> jsonArray,
);

let _encodeImages = imageUint8DataArr => (
  "images",
  imageUint8DataArr
  |> Js.Array.map(({bufferView, mimeType}) => {
       let list = [
         ("bufferView", bufferView |> int),
         ("mimeType", mimeType |> string),
       ];

       list |> object_;
     })
  |> jsonArray,
);

let _encodeAttributes = (position, normal, texCoord_0, indices) => {
  let attributesList = [("POSITION", position |> int)];

  let attributesList =
    switch (normal) {
    | None => attributesList
    | Some(normal) => [("NORMAL", normal |> int), ...attributesList]
    };

  let attributesList =
    switch (texCoord_0) {
    | None => attributesList
    | Some(texCoord_0) => [
        ("TEXCOORD_0", texCoord_0 |> int),
        ...attributesList,
      ]
    };

  [
    ("attributes", attributesList |> List.rev |> object_),
    ("indices", indices |> int),
  ];
};

let _encodeMeshes = meshDataArr => (
  "meshes",
  meshDataArr
  |> Js.Array.map(({primitives, name}: meshData) => {
       let {attributes, indices, material}: primitives = primitives;

       let {position, normal, texCoord_0}: attributes = attributes;

       let primitivesList =
         _encodeAttributes(position, normal, texCoord_0, indices);

       let primitivesList =
         switch (material) {
         | None => primitivesList
         | Some(material) =>
           primitivesList |> List.append([("material", material |> int)])
         };

       let primitives = (
         "primitives",
         [|primitivesList |> object_|] |> jsonArray,
       );

       switch (name) {
       | None => [primitives] |> object_

       | Some(name) => [primitives, ("name", name |> string)] |> object_
       };
     })
  |> jsonArray,
);

let _encodeExtensionsUsed = extensionsUsedArr => (
  "extensionsUsedArr",
  extensionsUsedArr |> stringArray,
);

let _encodeLights =
    (
      {
        type_,
        color,
        intensity,
        constantAttenuation,
        linearAttenuation,
        quadraticAttenuation,
        range,
      }: lightData,
    ) => {
  let khrLightsExtensionList = [("type", type_ |> string)];

  let khrLightsExtensionList =
    switch (color) {
    | None => khrLightsExtensionList
    | Some(color) => [
        ("color", color |> numberArray),
        ...khrLightsExtensionList,
      ]
    };

  let khrLightsExtensionList =
    switch (intensity) {
    | None => khrLightsExtensionList
    | Some(intensity) => [
        ("intensity", intensity |> float),
        ...khrLightsExtensionList,
      ]
    };

  let khrLightsExtensionList =
    switch (constantAttenuation) {
    | None => khrLightsExtensionList
    | Some(constantAttenuation) => [
        ("constantAttenuation", constantAttenuation |> float),
        ...khrLightsExtensionList,
      ]
    };

  let khrLightsExtensionList =
    switch (linearAttenuation) {
    | None => khrLightsExtensionList
    | Some(linearAttenuation) => [
        ("linearAttenuation", linearAttenuation |> float),
        ...khrLightsExtensionList,
      ]
    };

  let khrLightsExtensionList =
    switch (quadraticAttenuation) {
    | None => khrLightsExtensionList
    | Some(quadraticAttenuation) => [
        ("quadraticAttenuation", quadraticAttenuation |> float),
        ...khrLightsExtensionList,
      ]
    };

  switch (range) {
  | None => khrLightsExtensionList
  | Some(range) => [("range", range |> float), ...khrLightsExtensionList]
  };
};

let _encodeExtensions = lightDataArr => (
  "extensions",
  [
    (
      "KHR_lights",
      [
        (
          "lights",
          lightDataArr
          |> Js.Array.map(lightData => _encodeLights(lightData) |> object_)
          |> jsonArray,
        ),
      ]
      |> object_,
    ),
  ]
  |> object_,
);

let _encodeBuffers = totalByteLength => (
  "buffers",
  [|[("byteLength", totalByteLength |> int)] |> object_|] |> jsonArray,
);

let _encodeBufferViews = bufferViewDataArr => (
  "bufferViews",
  bufferViewDataArr
  |> Js.Array.map(({buffer, byteOffset, byteLength}: bufferViewData) =>
       [
         ("buffer", buffer |> int),
         ("byteOffset", byteOffset |> int),
         ("byteLength", byteLength |> int),
       ]
       |> object_
     )
  |> jsonArray,
);

let _encodeAccessors = accessorDataArr => (
  "accessors",
  accessorDataArr
  |> Js.Array.map(({bufferView, componentType, count, type_}: accessorData) =>
       [
         ("bufferView", bufferView |> int),
         ("componentType", componentType |> int),
         ("count", count |> int),
         ("type", type_ |> string),
       ]
       |> object_
     )
  |> jsonArray,
);

let _encodeAsset = () => (
  "asset",
  [
    ("version", "2.0" |> string),
    ("generator", GLTFUtils.getGenerator() |> string),
  ]
  |> object_,
);

let _hasExtensions = lightDataArr => lightDataArr |> Js.Array.length > 0;

let encode =
    (
      totalByteLength,
      (
        nodeDataArr,
        bufferViewDataArr,
        accessorDataArr,
        meshDataArr,
        meshRendererDataArr,
        basicMaterialDataArr,
        lightMaterialDataArr,
        textureDataArr,
        samplerDataArr,
        imageUint8DataArr,
        basicCameraViewDataArr,
        cameraProjectionDataArr,
        arcballCameraControllerDataArr,
        lightDataArr,
        imguiData,
        extensionsUsedArr,
      ),
      state,
    ) => {
  let list = [
    _encodeAsset(),
    ("scene", 0 |> int),
    _encodeScenes(extensionsUsedArr, (lightDataArr, imguiData), state),
    _encodeCameras(cameraProjectionDataArr),
    _encodeExtras(
      basicCameraViewDataArr,
      meshRendererDataArr,
      basicMaterialDataArr,
      arcballCameraControllerDataArr,
    ),
    _encodeNodes(nodeDataArr, state),
    _encodeLightMaterials(lightMaterialDataArr),
    _encodeTextures(textureDataArr),
    _encodeSamplers(samplerDataArr),
    _encodeImages(imageUint8DataArr),
    _encodeBuffers(totalByteLength),
    _encodeBufferViews(bufferViewDataArr),
    _encodeAccessors(accessorDataArr),
    _encodeMeshes(meshDataArr),
  ];

  let list =
    extensionsUsedArr |> Js.Array.length > 0 ?
      [_encodeExtensionsUsed(extensionsUsedArr), ...list] : list;

  let list =
    _hasExtensions(lightDataArr) ?
      [_encodeExtensions(lightDataArr), ...list] : list;

  list |> object_;
};