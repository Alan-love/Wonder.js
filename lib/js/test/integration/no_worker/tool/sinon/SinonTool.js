'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var ArrayService$Wonderjs = require("../../../../../src/service/atom/ArrayService.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");

var _defer = (
   function(timeout, returnedData) {
     return new Promise((resolve, reject)=>{
     setTimeout(function(){
       resolve(returnedData)
     }, timeout)
     });
   }
    );

function calledWith(stub, arg) {
  return stub.calledWith(arg);
}

function calledWithArg2(stub, arg1, arg2) {
  return stub.calledWith(arg1, arg2);
}

function calledWithArg4(stub, arg1, arg2, arg3, arg4) {
  return stub.calledWith(arg1, arg2, arg3, arg4);
}

function deferReturns(timeout, returnedData, stub) {
  return Sinon.returns(Curry._2(_defer, timeout, returnedData), stub);
}

function returnDifferentOnEachCall(stub) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (stub, i) {
                return Sinon.returns(i, Sinon.onCall(i, stub));
              }), stub, ArrayService$Wonderjs.range(0, 100));
}

exports._defer = _defer;
exports.calledWith = calledWith;
exports.calledWithArg2 = calledWithArg2;
exports.calledWithArg4 = calledWithArg4;
exports.deferReturns = deferReturns;
exports.returnDifferentOnEachCall = returnDifferentOnEachCall;
/* _defer Not a pure module */
