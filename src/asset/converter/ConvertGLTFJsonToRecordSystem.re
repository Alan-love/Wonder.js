open GLTFType;

open Json;

open Decode;

let _convertAsset = json =>
  json
  |> field("asset", json =>
       {
         version: json |> field("version", string),
         generator: json |> optional(field("generator", string)),
       }
     );

let _convertSamplers = json =>
  json
  |> optional(
       field(
         "samplers",
         array(json =>
           {
             magFilter: json |> optional(field("magFilter", int)),
             minFilter: json |> optional(field("minFilter", int)),
             wrapS: json |> optional(field("wrapS", int)),
             wrapT: json |> optional(field("wrapT", int)),
           }
         ),
       ),
     );

let _convertBuffers = json =>
  json
  |> field(
       "buffers",
       array(json =>
         {
           uri: json |> optional(field("uri", string)),
           byteLength: json |> field("byteLength", int),
         }
       ),
     );

let _convertBufferViews = json =>
  json
  |> field(
       "bufferViews",
       array(json =>
         {
           buffer: json |> field("buffer", int),
           byteOffset: json |> optional(field("byteOffset", int)),
           byteLength: json |> field("byteLength", int),
           byteStride: json |> optional(field("byteStride", int)),
           /* target: json |> optional(field("target", int)) */
         }
       ),
     );

let _convertAccessors = json =>
  json
  |> field(
       "accessors",
       array(json =>
         {
           bufferView: json |> optional(field("bufferView", int)),
           byteOffset: json |> optional(field("byteOffset", int)),
           count: json |> field("count", int),
           componentType: json |> field("componentType", int),
           type_: json |> field("type", string),
         }
       ),
     );

let _convertTextures = json =>
  json
  |> optional(
       field(
         "textures",
         array(json =>
           {
             name: json |> optional(field("name", string)),
             sampler: json |> optional(field("sampler", int)),
             source: json |> optional(field("source", int)),
           }
         ),
       ),
     );

let _convertImages = json =>
  json
  |> optional(
       field(
         "images",
         array(json =>
           {
             uri: json |> optional(field("uri", string)),
             name: json |> optional(field("name", string)),
           }
         ),
       ),
     );

let _convertScens = json =>
  json
  |> field(
       "scenes",
       array(json =>
         {
           nodes: json |> optional(field("nodes", array(int))),
           extensions:
             json
             |> optional(
                  field("extensions", json =>
                    (
                      {
                        khr_lights:
                          json
                          |> optional(
                               field("KHR_lights", json =>
                                 (
                                   {light: json |> field("light", int)}: GLTFType.sceneKHRLightsExtension
                                 )
                               ),
                             ),
                      }: GLTFType.sceneExtensions
                    )
                  ),
                ),
         }
       ),
     );

let _convertExtensions = json =>
  json
  |> optional(
       field("extensions", json =>
         {
           khr_lights:
             json
             |> optional(
                  field("KHR_lights", json =>
                    {
                      lights:
                        json
                        |> field(
                             "lights",
                             array(json =>
                               {
                                 type_: json |> field("type", string),
                                 color:
                                   json
                                   |> optional(field("color", array(float))),
                                 intensity:
                                   json
                                   |> optional(field("intensity", float)),
                                 constantAttenuation:
                                   json
                                   |> optional(
                                        field("constantAttenuation", float),
                                      ),
                                 linearAttenuation:
                                   json
                                   |> optional(
                                        field("linearAttenuation", float),
                                      ),
                                 quadraticAttenuation:
                                   json
                                   |> optional(
                                        field("quadraticAttenuation", float),
                                      ),
                                 range:
                                   json |> optional(field("range", float)),
                               }
                             ),
                           ),
                    }
                  ),
                ),
         }
       ),
     );

let _convertCameras = json =>
  json
  |> optional(
       field(
         "cameras",
         array(json =>
           {
             type_: json |> field("type", string),
             perspective:
               json
               |> optional(
                    field("perspective", json =>
                      {
                        aspectRatio:
                          json |> optional(field("aspectRatio", float)),
                        yfov: json |> field("yfov", float),
                        zfar: json |> optional(field("zfar", float)),
                        znear: json |> field("znear", float),
                      }
                    ),
                  ),
             orthographic:
               json
               |> optional(
                    field("orthographic", json =>
                      {
                        xmag: json |> field("xmag", float),
                        ymag: json |> field("ymag", float),
                        zfar: json |> field("zfar", float),
                        znear: json |> field("znear", float),
                      }
                    ),
                  ),
           }
         ),
       ),
     );

let _convertMeshes = json =>
  json
  |> field(
       "meshes",
       array(json =>
         {
           name: json |> optional(field("name", string)),
           primitives:
             json
             |> field(
                  "primitives",
                  array(json =>
                    {
                      attributes:
                        json
                        |> field("attributes", json =>
                             {
                               position: json |> field("POSITION", int),
                               normal:
                                 json |> optional(field("NORMAL", int)),
                               texCoord_0:
                                 json |> optional(field("TEXCOORD_0", int)),
                               texCoord_1:
                                 json |> optional(field("TEXCOORD_1", int)),
                             }
                           ),
                      indices: json |> optional(field("indices", int)),
                      material: json |> optional(field("material", int)),
                    }
                  ),
                ),
         }
       ),
     );

let _convertMaterials = json =>
  json
  |> optional(
       field(
         "materials",
         array(json =>
           {
             name: json |> optional(field("name", string)),
             pbrMetallicRoughness:
               json
               |> optional(
                    field("pbrMetallicRoughness", json =>
                      {
                        baseColorFactor:
                          json
                          |> optional(
                               field("baseColorFactor", array(float)),
                             ),
                        baseColorTexture:
                          json
                          |> optional(
                               field("baseColorTexture", json =>
                                 {
                                   index: json |> field("index", int),
                                   texCoord:
                                     json |> optional(field("texCoord", int)),
                                 }
                               ),
                             ),
                        metallicFactor:
                          json |> optional(field("metallicFactor", float)),
                        roughnessFactor:
                          json |> optional(field("roughnessFactor", float)),
                        metallicRoughnessTexture:
                          json
                          |> optional(
                               field("metallicRoughnessTexture", json =>
                                 {
                                   index: json |> field("index", int),
                                   texCoord:
                                     json |> optional(field("texCoord", int)),
                                 }
                               ),
                             ),
                      }
                    ),
                  ),
           }
         ),
       ),
     );

let _convertNodes = json =>
  json
  |> field(
       "nodes",
       array(json =>
         {
           name: json |> optimizedOptional(optimizedField("name", string)),
           camera: json |> optimizedOptional(optimizedField("camera", int)),
           mesh: json |> optimizedOptional(optimizedField("mesh", int)),
           matrix:
             json
             |> optimizedOptional(optimizedField("matrix", array(float))),
           translation:
             json
             |> optimizedOptional(
                  optimizedField("translation", array(float)),
                ),
           rotation:
             json
             |> optimizedOptional(optimizedField("rotation", array(float))),
           scale:
             json
             |> optimizedOptional(optimizedField("scale", array(float))),
           children:
             json
             |> optimizedOptional(optimizedField("children", array(int))),
           extras:
             json
             |> optimizedOptional(
                  optimizedField("extras", json =>
                    {
                      material:
                        json
                        |> optimizedOptional(optimizedField("material", int)),
                    }
                  ),
                ),
           extensions:
             json
             |> optional(
                  field("extensions", json =>
                    (
                      {
                        khr_lights:
                          json
                          |> optional(
                               field("KHR_lights", json =>
                                 (
                                   {light: json |> field("light", int)}: GLTFType.nodeKHRLightsExtension
                                 )
                               ),
                             ),
                      }: GLTFType.nodeExtensions
                    )
                  ),
                ),
         }
       ),
     );

let convert = json : GLTFType.gltf => {
  extensionsUsed: json |> optional(field("extensionsUsed", array(string))),
  extensions: _convertExtensions(json),
  asset: _convertAsset(json),
  scenes: _convertScens(json),
  scene: json |> optional(field("scene", int)),
  images: _convertImages(json),
  textures: _convertTextures(json),
  samplers: _convertSamplers(json),
  buffers: _convertBuffers(json),
  bufferViews: _convertBufferViews(json),
  accessors: _convertAccessors(json),
  cameras: _convertCameras(json),
  nodes: _convertNodes(json),
  meshes: _convertMeshes(json),
  materials: _convertMaterials(json),
};