'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var DisposeJob$Wonderjs = require("../../../../../src/job/no_worker/loop/DisposeJob.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var TypeArrayTool$Wonderjs = require("../../../../tool/service/primitive/TypeArrayTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var AllMaterialTool$Wonderjs = require("../../../../tool/service/material/AllMaterialTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../../src/api/material/LightMaterialAPI.js");
var BasicMaterialTool$Wonderjs = require("../../../../tool/service/material/BasicMaterialTool.js");
var LightMaterialTool$Wonderjs = require("../../../../tool/service/material/LightMaterialTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/BasicSourceTextureAPI.js");
var BasicSourceTextureTool$Wonderjs = require("../../../../tool/service/texture/BasicSourceTextureTool.js");
var SparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/SparseMapService.js");

describe("LightMaterial", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("createLightMaterial", (function () {
                Wonder_jest.test("create a new material which is just index(int)", (function () {
                        var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                describe("set default value", (function () {
                        return Wonder_jest.test("init emptyMapUnitArray", (function () {
                                      state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialTool$Wonderjs.getEmptyMapUnitArray(match[1], match[0])), /* array */[
                                                  2,
                                                  1,
                                                  0
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("unsafeGetLightMaterialGameObjects", (function () {
                return Wonder_jest.test("get material's gameObjects", (function () {
                              var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                              var material = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject1 = match$1[1];
                              var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                              var gameObject2 = match$2[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject1, material, match$2[0]);
                              var state$2 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject2, material, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.unsafeGetLightMaterialGameObjects(material, state$2)), /* array */[
                                          gameObject1,
                                          gameObject2
                                        ]);
                            }));
              }));
        describe("operate data", (function () {
                Wonder_jest.test("get the data from array buffer may not equal to the value which is setted", (function () {
                        var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                        var material = match[1];
                        var color = /* array */[
                          0.2,
                          0.3,
                          0.5
                        ];
                        var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material, color, match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(material, state$1)), /* array */[
                                    0.20000000298023224,
                                    0.30000001192092896,
                                    0.5
                                  ]);
                      }));
                describe("getLightMaterialDiffuseColor", (function () {
                        return Wonder_jest.test("test default color", (function () {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(match[1], match[0])), /* array */[
                                                  1,
                                                  1,
                                                  1
                                                ]);
                                    }));
                      }));
                describe("setLightMaterialDiffuseColor", (function () {
                        return Wonder_jest.test("test set color", (function () {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      var material = match[1];
                                      var color = /* array */[
                                        0.2,
                                        0.3,
                                        0.5
                                      ];
                                      var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material, color, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(material, state$1))), color);
                                    }));
                      }));
                describe("getLightMaterialSpecularColor", (function () {
                        return Wonder_jest.test("test default color", (function () {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor(match[1], match[0])), /* array */[
                                                  1,
                                                  1,
                                                  1
                                                ]);
                                    }));
                      }));
                describe("setLightMaterialSpecularColor", (function () {
                        return Wonder_jest.test("test set color", (function () {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      var material = match[1];
                                      var color = /* array */[
                                        0.2,
                                        0.3,
                                        0.5
                                      ];
                                      var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularColor(material, color, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor(material, state$1))), color);
                                    }));
                      }));
                describe("getLightMaterialShininess", (function () {
                        return Wonder_jest.test("test default shininess", (function () {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.getLightMaterialShininess(match[1], match[0])), 32);
                                    }));
                      }));
                describe("setLightMaterialShininess", (function () {
                        return Wonder_jest.test("test set shininess", (function () {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      var material = match[1];
                                      var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialShininess(material, 30, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.getLightMaterialShininess(material, state$1)), 30);
                                    }));
                      }));
                describe("unsafeGetLightMaterialDiffuseMap", (function () {
                        return Wonder_jest.test("if has no map, error", (function () {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      var material = match[1];
                                      var state$1 = match[0];
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect data exist", Wonder_jest.Expect[/* expect */0]((function () {
                                                        return LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(material, state$1);
                                                      })));
                                    }));
                      }));
                describe("unsafeGetLightMaterialSpecularMap", (function () {
                        return Wonder_jest.test("if has no map, error", (function () {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      var material = match[1];
                                      var state$1 = match[0];
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect data exist", Wonder_jest.Expect[/* expect */0]((function () {
                                                        return LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(material, state$1);
                                                      })));
                                    }));
                      }));
                describe("setLightMaterialDiffuseMap, setLightMaterialSpecularMap", (function () {
                        var _prepare = function (state) {
                          var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
                          var material = match[1];
                          var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                          var map1 = match$1[1];
                          var match$2 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match$1[0]);
                          var map2 = match$2[1];
                          var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material, map1, match$2[0]);
                          var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, map2, state$1);
                          return /* tuple */[
                                  state$2,
                                  material,
                                  /* tuple */[
                                    map1,
                                    map2
                                  ]
                                ];
                        };
                        Wonder_jest.test("set map unit", (function () {
                                var match = _prepare(state[0]);
                                var material = match[1];
                                var state$1 = match[0];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(material, state$1),
                                                LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(material, state$1)
                                              ]), /* tuple */[
                                            1,
                                            0
                                          ]);
                              }));
                        return Wonder_jest.test("save texture index", (function () {
                                      var match = _prepare(state[0]);
                                      var match$1 = match[2];
                                      var material = match[1];
                                      var state$1 = match[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(material, state$1),
                                                      LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(material, state$1)
                                                    ]), /* tuple */[
                                                  match$1[1],
                                                  match$1[0]
                                                ]);
                                    }));
                      }));
                describe("removeLightMaterialDiffuseMap, removeLightMaterialSpecularMap", (function () {
                        var _prepare = function (state) {
                          var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
                          var material = match[1];
                          var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                          var map1 = match$1[1];
                          var match$2 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match$1[0]);
                          var map2 = match$2[1];
                          var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, map2, LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material, map1, match$2[0]));
                          return /* tuple */[
                                  state$1,
                                  material,
                                  /* tuple */[
                                    map1,
                                    map2
                                  ]
                                ];
                        };
                        var _exec = function (material, state) {
                          return LightMaterialAPI$Wonderjs.removeLightMaterialDiffuseMap(material, LightMaterialAPI$Wonderjs.removeLightMaterialSpecularMap(material, state));
                        };
                        Wonder_jest.test("has map should return false", (function () {
                                var match = _prepare(state[0]);
                                var material = match[1];
                                var state$1 = _exec(material, match[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                LightMaterialAPI$Wonderjs.hasLightMaterialDiffuseMap(material, state$1),
                                                LightMaterialAPI$Wonderjs.hasLightMaterialSpecularMap(material, state$1)
                                              ]), /* tuple */[
                                            false,
                                            false
                                          ]);
                              }));
                        describe("test set new map after remove", (function () {
                                return Wonder_jest.test("should get correct map", (function () {
                                              var match = _prepare(state[0]);
                                              var material = match[1];
                                              var state$1 = LightMaterialAPI$Wonderjs.removeLightMaterialSpecularMap(material, match[0]);
                                              var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state$1);
                                              var map3 = match$1[1];
                                              var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material, map3, match$1[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(material, state$2),
                                                              LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(material, state$2)
                                                            ]), /* tuple */[
                                                          map3,
                                                          match[2][1]
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("disposeComponent", (function () {
                describe("dispose data", (function () {
                        Wonder_jest.test("remove from gameObjectsMap, nameMap, emptyMapUnitArrayMap", (function () {
                                var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                var material1 = match[2];
                                var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialName(material1, "name", match[0]);
                                var state$2 = GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent(match[1], material1, state$1);
                                var match$1 = LightMaterialTool$Wonderjs.getRecord(state$2);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                LightMaterialTool$Wonderjs.hasGameObject(material1, state$2),
                                                SparseMapService$WonderCommonlib.has(material1, match$1[/* nameMap */15]),
                                                SparseMapService$WonderCommonlib.has(material1, match$1[/* emptyMapUnitArrayMap */9])
                                              ]), /* tuple */[
                                            false,
                                            false,
                                            false
                                          ]);
                              }));
                        describe("test remove from type array", (function () {
                                var _testRemoveFromTypeArr = function (state, valueTuple, defaultValue, param) {
                                  return AllMaterialTool$Wonderjs.testRemoveFromTypeArr(state, valueTuple, defaultValue, /* tuple */[
                                              GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent,
                                              param[0],
                                              param[1],
                                              param[2]
                                            ]);
                                };
                                describe("remove from shaderIndices", (function () {
                                        return Wonder_jest.test("reset removed one's value", (function () {
                                                      return _testRemoveFromTypeArr(state, /* tuple */[
                                                                  1,
                                                                  2
                                                                ], LightMaterialTool$Wonderjs.getDefaultShaderIndex(state[0]), /* tuple */[
                                                                  LightMaterialTool$Wonderjs.createGameObject,
                                                                  LightMaterialTool$Wonderjs.getShaderIndex,
                                                                  LightMaterialTool$Wonderjs.setShaderIndex
                                                                ]);
                                                    }));
                                      }));
                                describe("remove from diffuseColors", (function () {
                                        return Wonder_jest.test("reset removed one's value", (function () {
                                                      return _testRemoveFromTypeArr(state, /* tuple */[
                                                                  /* array */[
                                                                    1,
                                                                    0.2,
                                                                    0.3
                                                                  ],
                                                                  /* array */[
                                                                    0,
                                                                    0.2,
                                                                    0.3
                                                                  ]
                                                                ], LightMaterialTool$Wonderjs.getDefaultDiffuseColor(state[0]), /* tuple */[
                                                                  LightMaterialTool$Wonderjs.createGameObject,
                                                                  (function (material, state) {
                                                                      return TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(material, state));
                                                                    }),
                                                                  LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor
                                                                ]);
                                                    }));
                                      }));
                                describe("remove from specularColors", (function () {
                                        return Wonder_jest.test("reset removed one's value", (function () {
                                                      return _testRemoveFromTypeArr(state, /* tuple */[
                                                                  /* array */[
                                                                    1,
                                                                    0.2,
                                                                    0.3
                                                                  ],
                                                                  /* array */[
                                                                    0,
                                                                    0.2,
                                                                    0.3
                                                                  ]
                                                                ], LightMaterialTool$Wonderjs.getDefaultSpecularColor(state[0]), /* tuple */[
                                                                  LightMaterialTool$Wonderjs.createGameObject,
                                                                  (function (material, state) {
                                                                      return TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor(material, state));
                                                                    }),
                                                                  LightMaterialAPI$Wonderjs.setLightMaterialSpecularColor
                                                                ]);
                                                    }));
                                      }));
                                describe("remove from shininess", (function () {
                                        return Wonder_jest.test("reset removed one's value", (function () {
                                                      return _testRemoveFromTypeArr(state, /* tuple */[
                                                                  1,
                                                                  2
                                                                ], LightMaterialTool$Wonderjs.getDefaultShininess(state[0]), /* tuple */[
                                                                  LightMaterialTool$Wonderjs.createGameObject,
                                                                  LightMaterialAPI$Wonderjs.getLightMaterialShininess,
                                                                  LightMaterialAPI$Wonderjs.setLightMaterialShininess
                                                                ]);
                                                    }));
                                      }));
                                describe("test map typeArrays", (function () {
                                        var _testRemoveFromTypeArr = function (state, valueTuple, defaultValue, param) {
                                          return AllMaterialTool$Wonderjs.testRemoveFromTypeArrWithMap(state, valueTuple, defaultValue, /* tuple */[
                                                      GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent,
                                                      param[0],
                                                      param[1],
                                                      param[2]
                                                    ]);
                                        };
                                        describe("remove from textureIndices", (function () {
                                                return Wonder_jest.test("reset material's all texture indices", (function () {
                                                              var state = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                                              var match = LightMaterialTool$Wonderjs.createGameObjectWithMap(state);
                                                              var material1 = match[2][0];
                                                              var state$1 = match[0];
                                                              var match$1 = LightMaterialTool$Wonderjs.getRecord(state$1);
                                                              var textureIndices = match$1[/* textureIndices */6];
                                                              var sourceIndex = LightMaterialTool$Wonderjs.getTextureIndicesIndex(material1, state$1);
                                                              textureIndices[sourceIndex] = 1;
                                                              textureIndices[sourceIndex + 1 | 0] = 2;
                                                              textureIndices[sourceIndex + 2 | 0] = 3;
                                                              var defaultTextureIndex = LightMaterialTool$Wonderjs.getDefaultTextureIndex(/* () */0);
                                                              GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent(match[1], material1, state$1);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](textureIndices.slice(0, 5)), new Uint32Array(/* array */[
                                                                              defaultTextureIndex,
                                                                              defaultTextureIndex,
                                                                              3,
                                                                              0,
                                                                              0
                                                                            ]));
                                                            }));
                                              }));
                                        describe("remove from diffuseMapUnits", (function () {
                                                return Wonder_jest.test("reset removed one's value", (function () {
                                                              return _testRemoveFromTypeArr(state, /* tuple */[
                                                                          1,
                                                                          2
                                                                        ], BasicSourceTextureTool$Wonderjs.getDefaultUnit(/* () */0), /* tuple */[
                                                                          LightMaterialTool$Wonderjs.createGameObjectWithMap,
                                                                          LightMaterialTool$Wonderjs.getDiffuseMapUnit,
                                                                          LightMaterialTool$Wonderjs.setDiffuseMapUnit
                                                                        ]);
                                                            }));
                                              }));
                                        describe("remove from specularMapUnits", (function () {
                                                return Wonder_jest.test("reset removed one's value", (function () {
                                                              return _testRemoveFromTypeArr(state, /* tuple */[
                                                                          1,
                                                                          2
                                                                        ], BasicSourceTextureTool$Wonderjs.getDefaultUnit(/* () */0), /* tuple */[
                                                                          LightMaterialTool$Wonderjs.createGameObjectWithMap,
                                                                          LightMaterialTool$Wonderjs.getSpecularMapUnit,
                                                                          LightMaterialTool$Wonderjs.setSpecularMapUnit
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        Wonder_jest.test("remove gameObject", (function () {
                                var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                var lightMaterial1 = match[1];
                                var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                var gameObject1 = match$1[1];
                                var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject1, lightMaterial1, match$1[0]);
                                var match$2 = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                var gameObject2 = match$2[1];
                                var state$2 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject2, lightMaterial1, match$2[0]);
                                var match$3 = GameObjectAPI$Wonderjs.createGameObject(state$2);
                                var gameObject3 = match$3[1];
                                var state$3 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject3, lightMaterial1, match$3[0]);
                                var state$4 = GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent(gameObject1, lightMaterial1, state$3);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.unsafeGetLightMaterialGameObjects(lightMaterial1, state$4)), /* array */[
                                            gameObject3,
                                            gameObject2
                                          ]);
                              }));
                        describe("fix bug", (function () {
                                return Wonder_jest.test("if have create other gameObjects, shouldn't affect dispose lightMaterial gameObjects", (function () {
                                              var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                              var match$1 = LightMaterialTool$Wonderjs.createGameObject(match[0]);
                                              var state$1 = DisposeJob$Wonderjs.execJob(undefined, GameObjectAPI$Wonderjs.batchDisposeGameObject(/* array */[
                                                        match[1],
                                                        match$1[1]
                                                      ], match$1[0]));
                                              var match$2 = LightMaterialTool$Wonderjs.createGameObject(state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.unsafeGetLightMaterialGameObjects(match$2[2], match$2[0])), /* array */[match$2[1]]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("getAllLightMaterials", (function () {
                var _createLightMaterialGameObjects = function (state) {
                  var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                  var match$1 = LightMaterialTool$Wonderjs.createGameObject(match[0]);
                  var match$2 = LightMaterialTool$Wonderjs.createGameObject(match$1[0]);
                  return /* tuple */[
                          match$2[0],
                          /* tuple */[
                            match[1],
                            match$1[1],
                            match$2[1]
                          ],
                          /* tuple */[
                            match[2],
                            match$1[2],
                            match$2[2]
                          ]
                        ];
                };
                Wonder_jest.test("get all components include the ones add or not add to gameObject", (function () {
                        var match = _createLightMaterialGameObjects(state);
                        var match$1 = match[2];
                        var match$2 = LightMaterialAPI$Wonderjs.createLightMaterial(match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.getAllLightMaterials(match$2[0])), /* array */[
                                    match$1[0],
                                    match$1[1],
                                    match$1[2],
                                    match$2[1]
                                  ]);
                      }));
                return Wonder_jest.test("test dispose", (function () {
                              var match = _createLightMaterialGameObjects(state);
                              var match$1 = match[1];
                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObject(match$1[2], GameObjectAPI$Wonderjs.disposeGameObject(match$1[1], match[0]));
                              var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllLightMaterialComponents(state$2)), /* array */[match[2][0]]);
                            }));
              }));
        describe("contract check: is alive", (function () {
                describe("if material is disposed", (function () {
                        var _testGetFunc = function (getFunc) {
                          var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                          var material = match[1];
                          var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                          var gameObject = match$1[1];
                          var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$1[0]);
                          var state$2 = GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent(gameObject, material, state$1);
                          return Wonder_jest.Expect[/* toThrowMessage */20]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                            return Curry._2(getFunc, material, state$2);
                                          })));
                        };
                        Wonder_jest.test("unsafeGetLightMaterialGameObjects should error", (function () {
                                return _testGetFunc(LightMaterialAPI$Wonderjs.unsafeGetLightMaterialGameObjects);
                              }));
                        Wonder_jest.test("getLightMaterialDiffuseColor should error", (function () {
                                return _testGetFunc(LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor);
                              }));
                        return Wonder_jest.test("getLightMaterialSpecularColor should error", (function () {
                                      return _testGetFunc(LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
