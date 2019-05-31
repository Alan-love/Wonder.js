

import * as Most from "most";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ImageUtils$Wonderjs from "../../../asset/utils/ImageUtils.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as AssembleUtils$Wonderjs from "../../../asset/utils/AssembleUtils.js";
import * as OptionService$Wonderjs from "../../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../../service/state/main/data/StateDataMain.js";
import * as DataViewCommon$Wonderjs from "../../../asset/generate/DataViewCommon.js";
import * as GenerateABUtils$Wonderjs from "../../utils/GenerateABUtils.js";
import * as SerializeService$Wonderjs from "../../../service/atom/SerializeService.js";
import * as ABBufferViewUtils$Wonderjs from "../../all/utils/ABBufferViewUtils.js";
import * as BatchCreateSystem$Wonderjs from "../../../asset/assemble/BatchCreateSystem.js";
import * as ABArrayBufferUtils$Wonderjs from "../../all/utils/ABArrayBufferUtils.js";
import * as BatchOperateSystem$Wonderjs from "../../../asset/assemble/BatchOperateSystem.js";
import * as IsDebugMainService$Wonderjs from "../../../service/state/main/state/IsDebugMainService.js";
import * as SetIMGUIFuncSystem$Wonderjs from "../../../asset/assemble/SetIMGUIFuncSystem.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateDataMainService$Wonderjs from "../../../service/state/main/state/StateDataMainService.js";
import * as AssembleWholeWDBUtils$Wonderjs from "../../../asset/assemble/utils/AssembleWholeWDBUtils.js";
import * as BatchOperateWholeSystem$Wonderjs from "../../../asset/assemble/BatchOperateWholeSystem.js";
import * as GenerateManifestABUtils$Wonderjs from "../../all/utils/GenerateManifestABUtils.js";
import * as NameGeometryMainService$Wonderjs from "../../../service/state/main/geometry/NameGeometryMainService.js";
import * as FindDependencyDataSystem$Wonderjs from "../../all/dependency/FindDependencyDataSystem.js";
import * as BuildRootGameObjectSystem$Wonderjs from "../../../asset/assemble/BuildRootGameObjectSystem.js";
import * as CreateGeometryMainService$Wonderjs from "../../../service/state/main/geometry/CreateGeometryMainService.js";
import * as IndicesGeometryMainService$Wonderjs from "../../../service/state/main/geometry/IndicesGeometryMainService.js";
import * as NormalsGeometryMainService$Wonderjs from "../../../service/state/main/geometry/NormalsGeometryMainService.js";
import * as VerticesGeometryMainService$Wonderjs from "../../../service/state/main/geometry/VerticesGeometryMainService.js";
import * as BatchSetTextureAllDataSystem$Wonderjs from "../../../asset/assemble/BatchSetTextureAllDataSystem.js";
import * as NameBasicMaterialMainService$Wonderjs from "../../../service/state/main/material/basic/NameBasicMaterialMainService.js";
import * as NameLightMaterialMainService$Wonderjs from "../../../service/state/main/material/light/NameLightMaterialMainService.js";
import * as TexCoordsGeometryMainService$Wonderjs from "../../../service/state/main/geometry/TexCoordsGeometryMainService.js";
import * as CreateBasicMaterialMainService$Wonderjs from "../../../service/state/main/material/basic/CreateBasicMaterialMainService.js";
import * as CreateLightMaterialMainService$Wonderjs from "../../../service/state/main/material/light/CreateLightMaterialMainService.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";
import * as BatchOperateWholeGeometrySystem$Wonderjs from "../../../asset/assemble/BatchOperateWholeGeometrySystem.js";
import * as OperateBasicMaterialMainService$Wonderjs from "../../../service/state/main/material/basic/OperateBasicMaterialMainService.js";
import * as OperateLightMaterialMainService$Wonderjs from "../../../service/state/main/material/light/OperateLightMaterialMainService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as OperateRABAssetBundleMainService$Wonderjs from "../../../service/state/main/assetBundle/OperateRABAssetBundleMainService.js";
import * as OperateSABAssetBundleMainService$Wonderjs from "../../../service/state/main/assetBundle/OperateSABAssetBundleMainService.js";
import * as BatchSetWholeTextureAllDataSystem$Wonderjs from "../../../asset/assemble/BatchSetWholeTextureAllDataSystem.js";
import * as NameBasicSourceTextureMainService$Wonderjs from "../../../service/state/main/texture/basic_source/NameBasicSourceTextureMainService.js";
import * as CreateBasicSourceTextureMainService$Wonderjs from "../../../service/state/main/texture/basic_source/CreateBasicSourceTextureMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../../service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";
import * as BatchAddGameObjectComponentMainService$Wonderjs from "../../../service/state/main/gameObject/BatchAddGameObjectComponentMainService.js";

function getContentData(ab) {
  var dataView = DataViewCommon$Wonderjs.create(ab);
  var match = GenerateManifestABUtils$Wonderjs.RABAndSAB[/* readHeader */0](dataView);
  var contentArrayBuffer = GenerateManifestABUtils$Wonderjs.RABAndSAB[/* getContentBuffer */1](match[1], ab);
  var contentDataView = DataViewCommon$Wonderjs.create(contentArrayBuffer);
  var match$1 = GenerateABUtils$Wonderjs.readHeader(contentDataView);
  var jsonByteLength = match$1[1];
  var jsonStr = GenerateABUtils$Wonderjs.getJsonStr(jsonByteLength, contentArrayBuffer);
  var buffer = GenerateABUtils$Wonderjs.getBuffer(jsonByteLength, contentArrayBuffer);
  return /* tuple */[
          JSON.parse(jsonStr),
          buffer
        ];
}

var All = /* module */[/* getContentData */getContentData];

function _isImageBufferDataDependencyAndRemoved(param) {
  return ABBufferViewUtils$Wonderjs.isNoneBufferViewIndex(param[/* bufferView */1]);
}

function _buildImageArray(param, binBuffer, allDependencyRABRelativePath, state) {
  var bufferViews = param[/* bufferViews */8];
  var images = param[/* images */4];
  var blobObjectUrlImageArr = /* array */[];
  var match = OptionService$Wonderjs.isJsonSerializedValueNone(images);
  if (match) {
    return Promise.resolve(blobObjectUrlImageArr);
  } else {
    return Most.drain(Most.mergeArray(ArrayService$Wonderjs.reduceOneParamValidi((function (streamArr, imageData, imageIndex) {
                            var name = imageData[/* name */0];
                            var match = _isImageBufferDataDependencyAndRemoved(imageData);
                            var tmp;
                            if (match) {
                              tmp = Most.just(OperateRABAssetBundleMainService$Wonderjs.unsafeFindDataInAllDependencyRABByName(allDependencyRABRelativePath, name, state, OperateRABAssetBundleMainService$Wonderjs.findImageByName));
                            } else {
                              var arrayBuffer = ABArrayBufferUtils$Wonderjs.SAB[/* getArrayBufferFromBufferViews */0](binBuffer, imageData[/* bufferView */1], bufferViews);
                              tmp = Most.map((function (image) {
                                      return image;
                                    }), Most.tap((function (image) {
                                          return ImageUtils$Wonderjs.setImageName(image, name);
                                        }), AssembleUtils$Wonderjs.buildLoadImageStream(arrayBuffer, imageData[/* mimeType */2], "load image error. imageName: " + (String(name) + ""))));
                            }
                            return ArrayService$Wonderjs.push(Most.tap((function (image) {
                                              blobObjectUrlImageArr[imageIndex] = image;
                                              return /* () */0;
                                            }), tmp), streamArr);
                          }), /* array */[], OptionService$Wonderjs.unsafeGetJsonSerializedValue(images)))).then((function (param) {
                  return Promise.resolve(blobObjectUrlImageArr);
                }));
  }
}

function _isGeometryBufferDataDependencyAndRemoved(param) {
  if (ABBufferViewUtils$Wonderjs.isNoneAccessorIndex(param[/* position */1]) && OptionService$Wonderjs.isJsonSerializedValueNone(param[/* normal */2]) && OptionService$Wonderjs.isJsonSerializedValueNone(param[/* texCoord */3])) {
    return ABBufferViewUtils$Wonderjs.isNoneAccessorIndex(param[/* index */4]);
  } else {
    return false;
  }
}

function _replaceCreatedGeometryToDependencyGeometry(param, binBuffer, allDependencyRABRelativePath, state, createdGeometryArr) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (geometryArr, geometryData, geometryIndex) {
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(geometryData);
                var geometry;
                if (match) {
                  geometry = createdGeometryArr[geometryIndex];
                } else {
                  var geometryData$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(geometryData);
                  var match$1 = _isGeometryBufferDataDependencyAndRemoved(geometryData$1);
                  geometry = match$1 ? OperateRABAssetBundleMainService$Wonderjs.unsafeFindDataInAllDependencyRABByName(allDependencyRABRelativePath, geometryData$1[/* name */0], state, OperateRABAssetBundleMainService$Wonderjs.findGeometryByName) : createdGeometryArr[geometryIndex];
                }
                return ArrayService$Wonderjs.push(geometry, geometryArr);
              }), ArrayService$WonderCommonlib.createEmpty(/* () */0), param[/* geometrys */16]);
}

function _checkDependencyGeometryShouldHasVertices(geometryArr, geometryIndex, state) {
  return Contract$WonderLog.requireCheck((function (param) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("dependency geometry has vertices", "not"), (function (param) {
                              var geometry = geometryArr[geometryIndex];
                              return Contract$WonderLog.assertTrue(VerticesGeometryMainService$Wonderjs.hasVertices(geometry, state));
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
}

function _batchSetGeometryData(sceneAssetBundleContent, geometryArr, bufferArr, state) {
  var dataViewArr = bufferArr.map(DataViewCommon$Wonderjs.create);
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, geometryData, geometryIndex) {
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(geometryData);
                if (match) {
                  return state;
                } else {
                  var geometryData$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(geometryData);
                  var match$1 = _isGeometryBufferDataDependencyAndRemoved(geometryData$1);
                  if (match$1) {
                    _checkDependencyGeometryShouldHasVertices(geometryArr, geometryIndex, state);
                    return state;
                  } else {
                    var geometry = geometryArr[geometryIndex];
                    return BatchOperateWholeGeometrySystem$Wonderjs.setGeometryData(geometry, sceneAssetBundleContent, dataViewArr, geometryData$1, state);
                  }
                }
              }), state, sceneAssetBundleContent[/* geometrys */16]);
}

function _batchOperate(sceneAssetBundleContent, blobObjectUrlImageArr, bufferArr, param) {
  var basicSourceTextureArr = param[3];
  var match = param[2];
  var scriptArr = match[10];
  var pointLightArr = match[9];
  var directionLightArr = match[8];
  var lightMaterialArr = match[7];
  var basicMaterialArr = match[6];
  var arcballCameraControllerArr = match[5];
  var perspectiveCameraProjectionArr = match[4];
  var basicCameraViewArr = match[3];
  var meshRendererArr = match[2];
  var geometryArr = match[1];
  var transformArr = match[0];
  var gameObjectArr = param[1];
  var state = BatchOperateSystem$Wonderjs.batchSetNamesAndGameObjectIsActiveAndIsRoot(sceneAssetBundleContent, /* tuple */[
        param[0],
        gameObjectArr,
        /* tuple */[
          transformArr,
          geometryArr
        ],
        basicSourceTextureArr
      ]);
  var match$1 = BatchOperateSystem$Wonderjs.getBatchComponentGameObjectData(/* tuple */[
        gameObjectArr,
        transformArr,
        geometryArr,
        meshRendererArr,
        basicCameraViewArr,
        perspectiveCameraProjectionArr,
        arcballCameraControllerArr,
        basicMaterialArr,
        lightMaterialArr,
        directionLightArr,
        pointLightArr,
        scriptArr
      ], sceneAssetBundleContent[/* indices */2], sceneAssetBundleContent, state);
  var match$2 = match$1[0];
  var gameObjectGeometrys = match$2[5];
  var geometryGameObjects = match$2[4];
  var gameObjectTransforms = match$2[3];
  var state$1 = BatchSetTextureAllDataSystem$Wonderjs.batchSetFormatAndFlipY(basicSourceTextureArr, sceneAssetBundleContent[/* basicSourceTextures */5], match$1[1]);
  var basicSourceTextureData = BatchOperateWholeSystem$Wonderjs.getBatchAllTypeTextureData(lightMaterialArr, basicSourceTextureArr, blobObjectUrlImageArr, sceneAssetBundleContent);
  return /* tuple */[
          BatchSetWholeTextureAllDataSystem$Wonderjs.batchSet(basicSourceTextureData, BatchAddGameObjectComponentMainService$Wonderjs.batchAddGeometryComponentForCreate(geometryGameObjects, gameObjectGeometrys, BatchOperateSystem$Wonderjs.batchAddComponent(sceneAssetBundleContent, /* tuple */[
                        match$2[2],
                        gameObjectTransforms,
                        geometryGameObjects,
                        gameObjectGeometrys,
                        match$2[6],
                        match$2[7],
                        match$2[8],
                        match$2[9],
                        match$2[10],
                        match$2[11],
                        match$2[12],
                        match$2[13],
                        match$2[14],
                        match$2[15],
                        match$2[16],
                        match$2[17],
                        match$2[18],
                        match$2[19],
                        match$2[20],
                        match$2[21],
                        match$2[22],
                        match$2[23]
                      ], _batchSetGeometryData(sceneAssetBundleContent, geometryArr, bufferArr, BatchOperateSystem$Wonderjs.batchSetComponentData(sceneAssetBundleContent, /* tuple */[
                                true,
                                true
                              ], /* tuple */[
                                transformArr,
                                geometryArr,
                                meshRendererArr,
                                basicCameraViewArr,
                                perspectiveCameraProjectionArr,
                                arcballCameraControllerArr,
                                basicMaterialArr,
                                lightMaterialArr,
                                directionLightArr,
                                pointLightArr,
                                scriptArr
                              ], /* tuple */[
                                match$2[0],
                                match$2[1],
                                gameObjectTransforms
                              ], state$1))))),
          gameObjectArr
        ];
}

function assemble(sabRelativePath, sab, wholeDependencyRelationMap) {
  var allDependencyRABRelativePath = FindDependencyDataSystem$Wonderjs.findAllDependencyRABRelativePathByDepthSearch(sabRelativePath, wholeDependencyRelationMap);
  var match = getContentData(sab);
  var binBuffer = match[1];
  var sceneAssetBundleContent = match[0];
  var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
  return Most.fromPromise(_buildImageArray(sceneAssetBundleContent, binBuffer, allDependencyRABRelativePath, state).then((function (blobObjectUrlImageArr) {
                    var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
                    var imguiData = sceneAssetBundleContent[/* scene */1][/* imgui */2];
                    var hasIMGUIFunc = !OptionService$Wonderjs.isJsonSerializedValueNone(imguiData);
                    var state$1 = hasIMGUIFunc ? SetIMGUIFuncSystem$Wonderjs.setIMGUIFunc(sceneAssetBundleContent, state) : state;
                    var match = BatchCreateSystem$Wonderjs.batchCreate(true, sceneAssetBundleContent, state$1);
                    var match$1 = match[2];
                    var state$2 = match[0];
                    var geometryArr = _replaceCreatedGeometryToDependencyGeometry(sceneAssetBundleContent, binBuffer, allDependencyRABRelativePath, state$2, match$1[1]);
                    var match$2 = _batchOperate(sceneAssetBundleContent, blobObjectUrlImageArr, AssembleWholeWDBUtils$Wonderjs.buildBufferArray(sceneAssetBundleContent[/* buffers */7], binBuffer), /* tuple */[
                          state$2,
                          match[1],
                          /* tuple */[
                            match$1[0],
                            geometryArr,
                            match$1[2],
                            match$1[3],
                            match$1[4],
                            match$1[5],
                            match$1[6],
                            match$1[7],
                            match$1[8],
                            match$1[9],
                            match$1[10]
                          ],
                          match[3]
                        ]);
                    var match$3 = BuildRootGameObjectSystem$Wonderjs.build(sceneAssetBundleContent, /* tuple */[
                          match$2[0],
                          match$2[1]
                        ]);
                    StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, OperateSABAssetBundleMainService$Wonderjs.markAssembled(sabRelativePath, match$3[0]));
                    return Promise.resolve(match$3[1]);
                  })));
}

var SAB = /* module */[
  /* _isImageBufferDataDependencyAndRemoved */_isImageBufferDataDependencyAndRemoved,
  /* _buildImageArray */_buildImageArray,
  /* _isGeometryBufferDataDependencyAndRemoved */_isGeometryBufferDataDependencyAndRemoved,
  /* _replaceCreatedGeometryToDependencyGeometry */_replaceCreatedGeometryToDependencyGeometry,
  /* _checkDependencyGeometryShouldHasVertices */_checkDependencyGeometryShouldHasVertices,
  /* _batchSetGeometryData */_batchSetGeometryData,
  /* _batchOperate */_batchOperate,
  /* assemble */assemble
];

function _isImageBufferDataDependencyAndRemoved$1(param) {
  return ABBufferViewUtils$Wonderjs.isNoneBufferViewIndex(param[/* bufferView */1]);
}

function _buildImageData(param, buffer, allDependencyRABRelativePath, state) {
  var bufferViews = param[/* bufferViews */7];
  return Most.reduce((function (param, param$1) {
                var image = param$1[0];
                return /* tuple */[
                        ImmutableHashMapService$WonderCommonlib.set(param$1[2], image, param[0]),
                        ImmutableSparseMapService$WonderCommonlib.set(param$1[1], image, param[1])
                      ];
              }), /* tuple */[
              ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0),
              ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
            ], Most.mergeArray(ArrayService$WonderCommonlib.reduceOneParami((function (streamArr, imageData, imageIndex) {
                        var name = imageData[/* name */0];
                        var match = _isImageBufferDataDependencyAndRemoved$1(imageData);
                        var tmp;
                        if (match) {
                          tmp = Most.just(OperateRABAssetBundleMainService$Wonderjs.unsafeFindDataInAllDependencyRABByName(allDependencyRABRelativePath, name, state, OperateRABAssetBundleMainService$Wonderjs.findImageByName));
                        } else {
                          var arrayBuffer = ABArrayBufferUtils$Wonderjs.RAB[/* getArrayBufferFromBufferViews */0](buffer, imageData[/* bufferView */1], bufferViews);
                          tmp = Most.map((function (image) {
                                  ImageUtils$Wonderjs.setImageName(image, name);
                                  return image;
                                }), AssembleUtils$Wonderjs.buildLoadImageStream(arrayBuffer, imageData[/* mimeType */2], "load image error. imageName: " + (String(name) + "")));
                        }
                        return ArrayService$Wonderjs.push(Most.map((function (image) {
                                          return /* tuple */[
                                                  image,
                                                  imageIndex,
                                                  name
                                                ];
                                        }), tmp), streamArr);
                      }), /* array */[], param[/* images */1])));
}

function _buildTextureData(param, imageMapByIndex, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, textureIndex) {
                var name = param$1[/* name */0];
                var match = CreateBasicSourceTextureMainService$Wonderjs.create(param[2]);
                var texture = match[1];
                var state = OperateBasicSourceTextureMainService$Wonderjs.setSource(texture, ImmutableSparseMapService$WonderCommonlib.unsafeGet(param$1[/* source */1], imageMapByIndex), NameBasicSourceTextureMainService$Wonderjs.setName(texture, name, OperateBasicSourceTextureMainService$Wonderjs.setFlipY(texture, param$1[/* flipY */8], OperateBasicSourceTextureMainService$Wonderjs.setType(texture, param$1[/* type_ */7], OperateBasicSourceTextureMainService$Wonderjs.setFormat(texture, param$1[/* format */6], OperateBasicSourceTextureMainService$Wonderjs.setMinFilter(texture, param$1[/* minFilter */3], OperateBasicSourceTextureMainService$Wonderjs.setMagFilter(texture, param$1[/* magFilter */2], OperateBasicSourceTextureMainService$Wonderjs.setWrapT(texture, param$1[/* wrapT */5], OperateBasicSourceTextureMainService$Wonderjs.setWrapS(texture, param$1[/* wrapS */4], match[0])))))))));
                return /* tuple */[
                        ImmutableHashMapService$WonderCommonlib.set(name, texture, param[0]),
                        ImmutableSparseMapService$WonderCommonlib.set(textureIndex, texture, param[1]),
                        state
                      ];
              }), /* tuple */[
              ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0),
              ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              state
            ], param[/* textures */0]);
}

function _buildBasicMaterialData(basicMaterials, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var name = param$1[/* name */0];
                var match = CreateBasicMaterialMainService$Wonderjs.create(param[1]);
                var material = match[1];
                var state = OperateBasicMaterialMainService$Wonderjs.setColor(material, param$1[/* color */1], NameBasicMaterialMainService$Wonderjs.setName(material, name, match[0]));
                return /* tuple */[
                        ImmutableHashMapService$WonderCommonlib.set(name, material, param[0]),
                        state
                      ];
              }), /* tuple */[
              ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0),
              state
            ], basicMaterials);
}

function _buildLightMaterialData(lightMaterials, textureMapByIndex, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var diffuseMap = param$1[/* diffuseMap */2];
                var name = param$1[/* name */0];
                var match = CreateLightMaterialMainService$Wonderjs.create(param[1]);
                var material = match[1];
                var state = OperateLightMaterialMainService$Wonderjs.setShininess(material, param$1[/* shininess */3], OperateLightMaterialMainService$Wonderjs.setDiffuseColor(material, param$1[/* diffuseColor */1], NameLightMaterialMainService$Wonderjs.setName(material, name, match[0])));
                var match$1 = OptionService$Wonderjs.isJsonSerializedValueNone(diffuseMap);
                var state$1;
                if (match$1) {
                  state$1 = state;
                } else {
                  var diffuseMap$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(diffuseMap);
                  state$1 = OperateLightMaterialMainService$Wonderjs.setDiffuseMap(material, ImmutableSparseMapService$WonderCommonlib.unsafeGet(diffuseMap$1, textureMapByIndex), state);
                }
                return /* tuple */[
                        ImmutableHashMapService$WonderCommonlib.set(name, material, param[0]),
                        state$1
                      ];
              }), /* tuple */[
              ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0),
              state
            ], lightMaterials);
}

function _buildMaterialData(param, textureMapByIndex, state) {
  var match = _buildBasicMaterialData(param[/* basicMaterials */2], state);
  var match$1 = _buildLightMaterialData(param[/* lightMaterials */3], textureMapByIndex, match[1]);
  return /* tuple */[
          match[0],
          match$1[0],
          match$1[1]
        ];
}

function _isGeometryBufferDataDependencyAndRemoved$1(param) {
  if (ABBufferViewUtils$Wonderjs.isNoneBufferViewIndex(param[/* vertexBufferView */2]) && ABBufferViewUtils$Wonderjs.isNoneBufferViewIndex(param[/* normalBufferView */3]) && ABBufferViewUtils$Wonderjs.isNoneBufferViewIndex(param[/* texCoordBufferView */4])) {
    return ABBufferViewUtils$Wonderjs.isNoneBufferViewIndex(param[/* indexBufferView */5]);
  } else {
    return false;
  }
}

function _setGeometryDataFromBuffer(geometry, param, param$1, state) {
  var bufferView = param[1];
  var match = ABBufferViewUtils$Wonderjs.isNoneBufferViewIndex(bufferView);
  var arrayBuffer = match ? new ArrayBuffer(0) : ABArrayBufferUtils$Wonderjs.RAB[/* getArrayBufferFromBufferViews */0](param[0], bufferView, param[2]);
  return Curry._3(param$1[1], geometry, Curry._1(param$1[0], arrayBuffer), state);
}

function _buildGeometryData(param, allDependencyRABRelativePath, buffer, state) {
  var bufferViews = param[/* bufferViews */7];
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, geometryData) {
                var name = geometryData[/* name */0];
                var state = param[1];
                var match = _isGeometryBufferDataDependencyAndRemoved$1(geometryData);
                var match$1;
                if (match) {
                  match$1 = /* tuple */[
                    state,
                    OperateRABAssetBundleMainService$Wonderjs.unsafeFindDataInAllDependencyRABByName(allDependencyRABRelativePath, name, state, OperateRABAssetBundleMainService$Wonderjs.findGeometryByName)
                  ];
                } else {
                  var match$2 = CreateGeometryMainService$Wonderjs.create(state);
                  var geometry = match$2[1];
                  var state$1 = NameGeometryMainService$Wonderjs.setName(geometry, name, match$2[0]);
                  var state$2 = _setGeometryDataFromBuffer(geometry, /* tuple */[
                        buffer,
                        geometryData[/* vertexBufferView */2],
                        bufferViews
                      ], /* tuple */[
                        (function (prim) {
                            return new Float32Array(prim);
                          }),
                        VerticesGeometryMainService$Wonderjs.setVerticesByTypeArray
                      ], state$1);
                  var state$3 = _setGeometryDataFromBuffer(geometry, /* tuple */[
                        buffer,
                        geometryData[/* normalBufferView */3],
                        bufferViews
                      ], /* tuple */[
                        (function (prim) {
                            return new Float32Array(prim);
                          }),
                        NormalsGeometryMainService$Wonderjs.setNormalsByTypeArray
                      ], state$2);
                  var state$4 = _setGeometryDataFromBuffer(geometry, /* tuple */[
                        buffer,
                        geometryData[/* texCoordBufferView */4],
                        bufferViews
                      ], /* tuple */[
                        (function (prim) {
                            return new Float32Array(prim);
                          }),
                        TexCoordsGeometryMainService$Wonderjs.setTexCoordsByTypeArray
                      ], state$3);
                  var state$5 = _setGeometryDataFromBuffer(geometry, /* tuple */[
                        buffer,
                        geometryData[/* indexBufferView */5],
                        bufferViews
                      ], geometryData[/* indexDataType */1] ? /* tuple */[
                          (function (prim) {
                              return new Uint32Array(prim);
                            }),
                          IndicesGeometryMainService$Wonderjs.setIndicesByUint32Array
                        ] : /* tuple */[
                          (function (prim) {
                              return new Uint16Array(prim);
                            }),
                          IndicesGeometryMainService$Wonderjs.setIndicesByUint16Array
                        ], state$4);
                  match$1 = /* tuple */[
                    state$5,
                    geometry
                  ];
                }
                return /* tuple */[
                        ImmutableHashMapService$WonderCommonlib.set(name, match$1[1], param[0]),
                        match$1[0]
                      ];
              }), /* tuple */[
              ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0),
              state
            ], param[/* geometrys */4]);
}

function convertEventFunctionDataStrToRecord(eventFunctionDataStr) {
  var match = JSON.parse(eventFunctionDataStr);
  var dispose = match[/* dispose */2];
  var update = match[/* update */1];
  var init = match[/* init */0];
  var match$1 = OptionService$Wonderjs.isJsonSerializedValueNone(init);
  var match$2 = OptionService$Wonderjs.isJsonSerializedValueNone(update);
  var match$3 = OptionService$Wonderjs.isJsonSerializedValueNone(dispose);
  return /* record */[
          /* init */match$1 ? undefined : Caml_option.some(SerializeService$Wonderjs.deserializeFunction(init)),
          /* update */match$2 ? undefined : Caml_option.some(SerializeService$Wonderjs.deserializeFunction(update)),
          /* dispose */match$3 ? undefined : Caml_option.some(SerializeService$Wonderjs.deserializeFunction(dispose))
        ];
}

function _buildScriptEventFunctionData(param, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var eventFunctionData = convertEventFunctionDataStrToRecord(param$1[/* eventFunctionDataStr */1]);
                return /* tuple */[
                        ImmutableHashMapService$WonderCommonlib.set(param$1[/* name */0], eventFunctionData, param[0]),
                        param[1]
                      ];
              }), /* tuple */[
              ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0),
              state
            ], param[/* scriptEventFunctions */5]);
}

function convertAttributeStrToRecord(attributeMapStr) {
  return JSON.parse(attributeMapStr);
}

function _buildScriptAttributeData(param, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var attribute = JSON.parse(param$1[/* attributeStr */1]);
                return /* tuple */[
                        ImmutableHashMapService$WonderCommonlib.set(param$1[/* name */0], attribute, param[0]),
                        param[1]
                      ];
              }), /* tuple */[
              ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0),
              state
            ], param[/* scriptAttributes */6]);
}

function assemble$1(rabRelativePath, rab, wholeDependencyRelationMap) {
  var allDependencyRABRelativePath = FindDependencyDataSystem$Wonderjs.findAllDependencyRABRelativePathByDepthSearch(rabRelativePath, wholeDependencyRelationMap);
  var match = getContentData(rab);
  var buffer = match[1];
  var resourceAssetBundleContent = match[0];
  var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
  return Most.map((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
                var match = _buildTextureData(resourceAssetBundleContent, param[1], state);
                var match$1 = _buildMaterialData(resourceAssetBundleContent, match[1], match[2]);
                var match$2 = _buildGeometryData(resourceAssetBundleContent, allDependencyRABRelativePath, buffer, match$1[2]);
                var match$3 = _buildScriptEventFunctionData(resourceAssetBundleContent, match$2[1]);
                var match$4 = _buildScriptAttributeData(resourceAssetBundleContent, match$3[1]);
                var state$1 = OperateRABAssetBundleMainService$Wonderjs.setAssembleRABData(rabRelativePath, /* tuple */[
                      param[0],
                      match[0],
                      match$1[0],
                      match$1[1],
                      match$2[0],
                      match$3[0],
                      match$4[0]
                    ], match$4[1]);
                StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, OperateRABAssetBundleMainService$Wonderjs.markAssembled(rabRelativePath, state$1));
                return /* () */0;
              }), Most.fromPromise(_buildImageData(resourceAssetBundleContent, buffer, allDependencyRABRelativePath, state)));
}

var RAB = /* module */[
  /* _isImageBufferDataDependencyAndRemoved */_isImageBufferDataDependencyAndRemoved$1,
  /* _buildImageData */_buildImageData,
  /* _buildTextureData */_buildTextureData,
  /* _buildBasicMaterialData */_buildBasicMaterialData,
  /* _buildLightMaterialData */_buildLightMaterialData,
  /* _buildMaterialData */_buildMaterialData,
  /* _isGeometryBufferDataDependencyAndRemoved */_isGeometryBufferDataDependencyAndRemoved$1,
  /* _setGeometryDataFromBuffer */_setGeometryDataFromBuffer,
  /* _buildGeometryData */_buildGeometryData,
  /* convertEventFunctionDataStrToRecord */convertEventFunctionDataStrToRecord,
  /* _buildScriptEventFunctionData */_buildScriptEventFunctionData,
  /* convertAttributeStrToRecord */convertAttributeStrToRecord,
  /* _buildScriptAttributeData */_buildScriptAttributeData,
  /* assemble */assemble$1
];

export {
  All ,
  SAB ,
  RAB ,
  
}
/* most Not a pure module */
