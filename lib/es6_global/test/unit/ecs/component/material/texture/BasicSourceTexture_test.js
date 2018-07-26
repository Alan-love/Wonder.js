

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../../tool/TestTool.js";
import * as SettingTool$Wonderjs from "../../../../../tool/service/setting/SettingTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../../src/service/state/main/state/CreateStateMainService.js";

describe("BasicSourceTexture", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("createBasicSourceTexture", (function () {
                Wonder_jest.test("create a new texture which is just index(int)", (function () {
                        var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                return Wonder_jest.test("shouldn't exceed buffer count", (function () {
                              var state = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, /* () */0), /* () */0);
                              BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
                              BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
                              return Wonder_jest.Expect[/* toThrowMessage */20]("expect index: 2 <= maxIndex: 1, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
                                                return /* () */0;
                                              })));
                            }));
              }));
        describe("test default data", (function () {
                describe("is need updates", (function () {
                        return Wonder_jest.test("default is need update", (function () {
                                      var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureTool$Wonderjs.isNeedUpdate(match[1], match[0])), true);
                                    }));
                      }));
                describe("is flipY", (function () {
                        return Wonder_jest.test("default is true", (function () {
                                      var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY(match[1], match[0])), true);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("getBasicSourceTextureWidth", (function () {
                describe("if set source", (function () {
                        var _prepare = function (state) {
                          var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                          var texture = match[1];
                          var source = {
                            width: 100
                          };
                          var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(texture, source, match[0]);
                          return /* tuple */[
                                  state$1,
                                  texture,
                                  source
                                ];
                        };
                        return Wonder_jest.test("return source.width", (function () {
                                      var match = _prepare(state);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWidth(match[1], match[0])), match[2].width);
                                    }));
                      }));
                return Wonder_jest.test("else, fatal", (function () {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = match[0];
                              return Wonder_jest.Expect[/* toThrowMessage */20]("source should exist", Wonder_jest.Expect[/* expect */0]((function () {
                                                return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWidth(texture, state$1);
                                              })));
                            }));
              }));
        describe("getBasicSourceTextureHeight", (function () {
                describe("if set source", (function () {
                        var _prepare = function (state) {
                          var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                          var texture = match[1];
                          var source = {
                            height: 100
                          };
                          var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(texture, source, match[0]);
                          return /* tuple */[
                                  state$1,
                                  texture,
                                  source
                                ];
                        };
                        return Wonder_jest.test("return source.height", (function () {
                                      var match = _prepare(state);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureHeight(match[1], match[0])), match[2].height);
                                    }));
                      }));
                return Wonder_jest.test("else, fatal", (function () {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = match[0];
                              return Wonder_jest.Expect[/* toThrowMessage */20]("source should exist", Wonder_jest.Expect[/* expect */0]((function () {
                                                return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureHeight(texture, state$1);
                                              })));
                            }));
              }));
        describe("setBasicSourceTextureWrapS", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapS(texture, /* MIRRORED_REPEAT */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapS(texture, state$1)), /* MIRRORED_REPEAT */1);
                            }));
              }));
        describe("setBasicSourceTextureWrapT", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapT(texture, /* MIRRORED_REPEAT */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapT(texture, state$1)), /* MIRRORED_REPEAT */1);
                            }));
              }));
        describe("setBasicSourceTextureMagFilter", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(texture, /* LINEAR */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMagFilter(texture, state$1)), /* LINEAR */1);
                            }));
              }));
        describe("setBasicSourceTextureMinFilter", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter(texture, /* LINEAR */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMinFilter(texture, state$1)), /* LINEAR */1);
                            }));
              }));
        describe("setBasicSourceTextureFormat", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFormat(texture, /* RGB */0, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFormat(texture, state$1)), /* RGB */0);
                            }));
              }));
        describe("setBasicSourceTextureType", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureType(texture, 1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureType(texture, state$1)), 1);
                            }));
              }));
        describe("setBasicSourceTextureFlipY", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(texture, false, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY(texture, state$1)), false);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
