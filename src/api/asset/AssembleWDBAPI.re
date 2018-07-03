open Js.Promise;

let assembleGLB = (glb, state) =>
  ConvertGLBSystem.convertGLB(glb) |. AssembleWDBSystem.assemble(state);

let assembleWDB = (wdb, state) => AssembleWDBSystem.assemble(wdb, state);