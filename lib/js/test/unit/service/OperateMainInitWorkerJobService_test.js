'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../tool/TestTool.js");
var OperateMainInitWorkerJobMainService$Wonderjs = require("../../../src/service/state/main/job/worker/OperateMainInitWorkerJobMainService.js");

describe("OperateMainInitWorkerJobMainService", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("_findFrameJob", (function () {
                describe("contract check", (function () {
                        beforeEach((function () {
                                return TestTool$Wonderjs.openContractCheck(/* () */0);
                              }));
                        return Wonder_jest.test("frame job should only has one", (function () {
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect frame job only has one", Wonder_jest.Expect[/* expect */0]((function () {
                                                        return OperateMainInitWorkerJobMainService$Wonderjs._findFrameJob(/* array */[
                                                                    /* record */[
                                                                      /* name */"frame",
                                                                      /* link */1,
                                                                      /* jobs */1
                                                                    ],
                                                                    /* record */[
                                                                      /* name */"frame",
                                                                      /* link */1,
                                                                      /* jobs */1
                                                                    ]
                                                                  ]);
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
