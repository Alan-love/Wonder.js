

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as PromiseTool$Wonderjs from "../../../tool/PromiseTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TestWorkerTool$Wonderjs from "../../tool/TestWorkerTool.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../src/api/material/BasicMaterialAPI.js";
import * as FakeGlWorkerTool$Wonderjs from "../../tool/FakeGlWorkerTool.js";
import * as BasicMaterialTool$Wonderjs from "../../../../tool/service/material/BasicMaterialTool.js";
import * as BrowserDetectTool$Wonderjs from "../../../../tool/service/browserDetect/BrowserDetectTool.js";
import * as TestMainWorkerTool$Wonderjs from "../main_worker/tool/TestMainWorkerTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../../tool/service/state/RenderWorkerStateTool.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as MainInitJobMainWorkerTool$Wonderjs from "../main_worker/tool/MainInitJobMainWorkerTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "./tool/RenderJobsRenderWorkerTool.js";
import * as SendInitRenderDataWorkerTool$Wonderjs from "../tool/SendInitRenderDataWorkerTool.js";
import * as WorkerInstanceMainWorkerTool$Wonderjs from "../main_worker/tool/WorkerInstanceMainWorkerTool.js";
import * as ArrayBufferViewSourceTextureTool$Wonderjs from "../../../../tool/service/texture/ArrayBufferViewSourceTextureTool.js";
import * as BasicSourceTextureRenderWorkerTool$Wonderjs from "../../tool/BasicSourceTextureRenderWorkerTool.js";
import * as ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs from "../../tool/ArrayBufferViewSourceTextureRenderWorkerTool.js";

describe("test init texture render worker job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        describe("init all textures", (function () {
                var _prepareForBasicSourceTexture = function () {
                  var match = BasicSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoMaps(sandbox);
                  var match$1 = match[4];
                  var match$2 = match[3];
                  var match$3 = match[2];
                  var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                  return /* tuple */[
                          state,
                          match[1],
                          /* tuple */[
                            match$3[0],
                            match$3[1],
                            match$3[2],
                            match$3[3]
                          ],
                          /* tuple */[
                            match$2[0],
                            match$2[1]
                          ],
                          /* tuple */[
                            match$1[0],
                            match$1[1]
                          ]
                        ];
                };
                var _prepareForArrayBufferViewSourceTexture = function () {
                  var match = ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoMaps(sandbox);
                  var match$1 = match[2];
                  var match$2 = match[1];
                  var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                  return /* tuple */[
                          state,
                          /* tuple */[
                            match$2[0],
                            match$2[1]
                          ],
                          /* tuple */[
                            match$1[0],
                            match$1[1]
                          ]
                        ];
                };
                describe("test init two textures", (function () {
                        describe("test send init data to render worker", (function () {
                                var _initTwoGameObjects = function (map1, map2, state) {
                                  var match = BasicMaterialTool$Wonderjs.createGameObject(state);
                                  var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                                  var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(match[2], map1, match$1[0]);
                                  var state$2 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(match$1[2], map2, state$1);
                                  var state$3 = GameObjectAPI$Wonderjs.initGameObject(match[1], state$2);
                                  return GameObjectAPI$Wonderjs.initGameObject(match$1[1], state$3);
                                };
                                describe("contract check", (function () {
                                        Wonder_jest.testPromise("basicSourceTextureRecord->needInitedTextureIndexArray should be empty", (function () {
                                                var match = _prepareForBasicSourceTexture(/* () */0);
                                                var match$1 = match[3];
                                                var state = _initTwoGameObjects(match$1[0], match$1[1], match[0]);
                                                MainStateTool$Wonderjs.setState(state);
                                                return PromiseTool$Wonderjs.judgeErrorMessage("basicSourceTextureRecord->needInitedTextureIndexArray should be empty, but actual is 0,1", MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function () {
                                                                  return Promise.resolve(Wonder_jest.fail("should error before"));
                                                                }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0)));
                                              }));
                                        return Wonder_jest.testPromise("arrayBufferViewSourceTextureRecord->needInitedTextureIndexArray should be empty", (function () {
                                                      var match = _prepareForArrayBufferViewSourceTexture(/* () */0);
                                                      var match$1 = match[1];
                                                      var state = _initTwoGameObjects(match$1[0], match$1[1], match[0]);
                                                      MainStateTool$Wonderjs.setState(state);
                                                      return PromiseTool$Wonderjs.judgeErrorMessage("arrayBufferViewSourceTextureRecord->needInitedTextureIndexArray should be empty, but actual is 50,51", MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function () {
                                                                        return Promise.resolve(Wonder_jest.fail("should error before"));
                                                                      }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0)));
                                                    }));
                                      }));
                                describe("test basic source texture", (function () {
                                        describe("send needAddedImageDataArray", (function () {
                                                return Wonder_jest.testPromise("convert source to imageData", (function () {
                                                              var match = _prepareForBasicSourceTexture(/* () */0);
                                                              var match$1 = match[4];
                                                              var source2 = match$1[1];
                                                              var source1 = match$1[0];
                                                              var match$2 = match[2];
                                                              var imageDataArrayBuffer2 = match$2[1];
                                                              var imageDataArrayBuffer1 = match$2[0];
                                                              var context = match[1];
                                                              var drawImage = context.drawImage;
                                                              var getImageData = context.getImageData;
                                                              return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                            Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, {
                                                                                                          buffer: Sinon$1.match.any,
                                                                                                          basicSourceTextureData: {
                                                                                                            index: 2,
                                                                                                            needAddedImageDataArray: /* array */[
                                                                                                              /* tuple */[
                                                                                                                imageDataArrayBuffer1,
                                                                                                                source1.width,
                                                                                                                source1.height,
                                                                                                                0
                                                                                                              ],
                                                                                                              /* tuple */[
                                                                                                                imageDataArrayBuffer2,
                                                                                                                source2.width,
                                                                                                                source2.height,
                                                                                                                1
                                                                                                              ]
                                                                                                            ]
                                                                                                          },
                                                                                                          arrayBufferViewSourceTextureData: Sinon$1.match.any
                                                                                                        }, undefined, /* () */0), postMessageToRenderWorker)),
                                                                                            Sinon.getCallCount(Sinon.withThreeArgs(source1, 0, 0, drawImage)),
                                                                                            Sinon.getCallCount(Sinon.withThreeArgs(source2, 0, 0, drawImage)),
                                                                                            Sinon.getCallCount(Sinon.withFourArgs(0, 0, source1.width, source1.height, getImageData)),
                                                                                            Sinon.getCallCount(Sinon.withFourArgs(0, 0, source2.width, source2.height, getImageData))
                                                                                          ]), /* tuple */[
                                                                                        1,
                                                                                        1,
                                                                                        1,
                                                                                        1,
                                                                                        1
                                                                                      ]);
                                                                          }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                            }));
                                              }));
                                        return Wonder_jest.testPromise("clear basicSourceTextureRecord->needAddedSourceArray, needInitedTextureIndexArray after send", (function () {
                                                      var match = _prepareForBasicSourceTexture(/* () */0);
                                                      var match$1 = match[3];
                                                      TestMainWorkerTool$Wonderjs.closeContractCheck(/* () */0);
                                                      _initTwoGameObjects(match$1[0], match$1[1], match[0]);
                                                      return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function () {
                                                                    var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                    var match = BasicSourceTextureTool$Wonderjs.getRecord(state);
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                    match[/* needAddedSourceArray */13].length,
                                                                                    match[/* needInitedTextureIndexArray */14].length
                                                                                  ]), /* tuple */[
                                                                                0,
                                                                                0
                                                                              ]);
                                                                  }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                    }));
                                      }));
                                describe("test arrayBufferView source texture", (function () {
                                        describe("send sourceMap", (function () {
                                                return Wonder_jest.testPromise("test", (function () {
                                                              var match = _prepareForArrayBufferViewSourceTexture(/* () */0);
                                                              var match$1 = match[2];
                                                              var source2 = match$1[1];
                                                              var source1 = match$1[0];
                                                              MainStateTool$Wonderjs.setState(match[0]);
                                                              return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, {
                                                                                                        buffer: Sinon$1.match.any,
                                                                                                        arrayBufferViewSourceTextureData: {
                                                                                                          index: 2,
                                                                                                          sourceMap: /* array */[
                                                                                                            source1,
                                                                                                            source2
                                                                                                          ]
                                                                                                        },
                                                                                                        basicSourceTextureData: Sinon$1.match.any
                                                                                                      }, undefined, /* () */0), postMessageToRenderWorker))), 1);
                                                                          }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                            }));
                                              }));
                                        return Wonder_jest.testPromise("clear arrayBufferViewSourceTextureRecord->needAddedSourceArray, needInitedTextureIndexArray after send", (function () {
                                                      var match = _prepareForArrayBufferViewSourceTexture(/* () */0);
                                                      var match$1 = match[1];
                                                      TestMainWorkerTool$Wonderjs.closeContractCheck(/* () */0);
                                                      _initTwoGameObjects(match$1[0], match$1[1], match[0]);
                                                      return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function () {
                                                                    var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                    var match = ArrayBufferViewSourceTextureTool$Wonderjs.getRecord(state);
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[/* needInitedTextureIndexArray */16].length), 0);
                                                                  }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test render worker job", (function () {
                                describe("test basic source texture", (function () {
                                        beforeAll((function () {
                                                return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                                              }));
                                        afterAll((function () {
                                                return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                                              }));
                                        describe("add source to sourceMap", (function () {
                                                describe("test for chrome", (function () {
                                                        Wonder_jest.testPromise("test flipY", (function () {
                                                                var match = _prepareForBasicSourceTexture(/* () */0);
                                                                var match$1 = match[4];
                                                                var source2 = match$1[1];
                                                                var source1 = match$1[0];
                                                                var match$2 = match[3];
                                                                var map2 = match$2[1];
                                                                var map1 = match$2[0];
                                                                var match$3 = match[2];
                                                                var imageDataArrayBuffer2 = match$3[1];
                                                                var imageDataArrayBuffer1 = match$3[0];
                                                                var state = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(map2, true, BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(map1, true, match[0]));
                                                                BrowserDetectTool$Wonderjs.setChrome(/* () */0);
                                                                return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                  BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map1, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                                                  BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map2, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
                                                                                                ]), /* tuple */[
                                                                                              /* array */[
                                                                                                imageDataArrayBuffer1,
                                                                                                source1.width,
                                                                                                source1.height,
                                                                                                {
                                                                                                  imageOrientation: "flipY"
                                                                                                }
                                                                                              ],
                                                                                              /* array */[
                                                                                                imageDataArrayBuffer2,
                                                                                                source2.width,
                                                                                                source2.height,
                                                                                                {
                                                                                                  imageOrientation: "flipY"
                                                                                                }
                                                                                              ]
                                                                                            ]));
                                                                            }), state);
                                                              }));
                                                        return Wonder_jest.testPromise("test not flipY", (function () {
                                                                      var match = _prepareForBasicSourceTexture(/* () */0);
                                                                      var match$1 = match[4];
                                                                      var source2 = match$1[1];
                                                                      var source1 = match$1[0];
                                                                      var match$2 = match[3];
                                                                      var map2 = match$2[1];
                                                                      var map1 = match$2[0];
                                                                      var match$3 = match[2];
                                                                      var imageDataArrayBuffer2 = match$3[1];
                                                                      var imageDataArrayBuffer1 = match$3[0];
                                                                      var state = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(map2, false, BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(map1, false, match[0]));
                                                                      BrowserDetectTool$Wonderjs.setChrome(/* () */0);
                                                                      return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                        BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map1, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                                                        BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map2, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
                                                                                                      ]), /* tuple */[
                                                                                                    /* array */[
                                                                                                      imageDataArrayBuffer1,
                                                                                                      source1.width,
                                                                                                      source1.height,
                                                                                                      {
                                                                                                        imageOrientation: "none"
                                                                                                      }
                                                                                                    ],
                                                                                                    /* array */[
                                                                                                      imageDataArrayBuffer2,
                                                                                                      source2.width,
                                                                                                      source2.height,
                                                                                                      {
                                                                                                        imageOrientation: "none"
                                                                                                      }
                                                                                                    ]
                                                                                                  ]));
                                                                                  }), state);
                                                                    }));
                                                      }));
                                                return Wonder_jest.testPromise("test for firefox", (function () {
                                                              var match = _prepareForBasicSourceTexture(/* () */0);
                                                              var match$1 = match[4];
                                                              var source2 = match$1[1];
                                                              var source1 = match$1[0];
                                                              var match$2 = match[3];
                                                              var map2 = match$2[1];
                                                              var map1 = match$2[0];
                                                              var match$3 = match[2];
                                                              var imageDataArrayBuffer2 = match$3[1];
                                                              var imageDataArrayBuffer1 = match$3[0];
                                                              BrowserDetectTool$Wonderjs.setFirefox(/* () */0);
                                                              return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map1, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                                                BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map2, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
                                                                                              ]), /* tuple */[
                                                                                            /* array */[
                                                                                              imageDataArrayBuffer1,
                                                                                              source1.width,
                                                                                              source1.height,
                                                                                              undefined
                                                                                            ],
                                                                                            /* array */[
                                                                                              imageDataArrayBuffer2,
                                                                                              source2.width,
                                                                                              source2.height,
                                                                                              undefined
                                                                                            ]
                                                                                          ]));
                                                                          }), match[0]);
                                                            }));
                                              }));
                                        describe("init added textures", (function () {
                                                return Wonder_jest.testPromise("test create gl texture", (function () {
                                                              var match = _prepareForBasicSourceTexture(/* () */0);
                                                              var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                              var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                              BrowserDetectTool$Wonderjs.setChrome(/* () */0);
                                                              return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                                                            return Promise.resolve(Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](createTexture)));
                                                                          }), state);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test arrayBufferView source texture", (function () {
                                        describe("add source map", (function () {
                                                return Wonder_jest.testPromise("test", (function () {
                                                              var match = _prepareForArrayBufferViewSourceTexture(/* () */0);
                                                              var match$1 = match[2];
                                                              var source2 = match$1[1];
                                                              var source1 = match$1[0];
                                                              var match$2 = match[1];
                                                              var map2 = match$2[1];
                                                              var map1 = match$2[0];
                                                              return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map1, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                                                ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map2, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
                                                                                              ]), /* tuple */[
                                                                                            source1,
                                                                                            source2
                                                                                          ]));
                                                                          }), match[0]);
                                                            }));
                                              }));
                                        describe("create gl texture", (function () {
                                                return Wonder_jest.testPromise("test create", (function () {
                                                              var match = _prepareForArrayBufferViewSourceTexture(/* () */0);
                                                              var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                              var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                              return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                                                            return Promise.resolve(Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](createTexture)));
                                                                          }), state);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
