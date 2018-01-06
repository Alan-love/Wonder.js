open GlType;

open Gl;

open Js.Typed_array;

open VboBufferType;

let createBuffer =
  [@bs]
  (
    (gl, data: Float32Array.t, state: StateDataType.state) => {
      let buffer = VboBufferPoolCommon.getArrayBuffer(gl, state);
      bindBuffer(getArrayBuffer(gl), buffer, gl);
      bufferFloat32Data(getArrayBuffer(gl), data, getStaticDraw(gl), gl);
      resetBuffer(getArrayBuffer(gl), Js.Nullable.null, gl);
      buffer
    }
  );

let getOrCreateBuffer =
    (gl, geometryIndex, bufferMap, getDataFunc, state: StateDataType.state) =>
  VboBufferSystem.getOrCreateBuffer(
    gl,
    geometryIndex,
    bufferMap,
    createBuffer,
    getDataFunc,
    state
  );