'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../tool/TestTool.js");
var MainStateTool$Wonderjs = require("../../../tool/service/state/MainStateTool.js");
var NoWorkerJobTool$Wonderjs = require("../../../tool/service/job/no_worker/NoWorkerJobTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");
var NoWorkerJobHandleSystem$Wonderjs = require("../../../../src/job/no_worker/NoWorkerJobHandleSystem.js");

describe("NoWorkerJob", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("init", (function () {
                describe("contract check", (function () {
                        return Wonder_jest.test("job defined in config file should exist job handle map", (function () {
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("can't find job handle function whose job name is customJob", Wonder_jest.Expect[/* expect */0]((function () {
                                                        return NoWorkerJobTool$Wonderjs.init(/* tuple */[
                                                                    NoWorkerJobHandleSystem$Wonderjs.createInitJobHandleMap,
                                                                    NoWorkerJobHandleSystem$Wonderjs.createLoopJobHandleMap
                                                                  ], TestTool$Wonderjs.initWithJobConfig(sandbox, "true", undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n[\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"customJob\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n    {\n\n          \"name\": \"customJob\"\n    }\n]\n        ", undefined, /* () */0), undefined, /* () */0));
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
