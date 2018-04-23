open Js.Typed_array;

open BufferPointLightService;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getColorsOffset(),
    ~length=getColorsLength()
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIntensitiesOffset(),
    ~length=getIntensitiesLength()
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getConstantsOffset(),
    ~length=getConstantsLength()
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLinearsOffset(),
    ~length=getLinearsLength()
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getQuadraticsOffset(),
    ~length=getQuadraticsLength()
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getRangesOffset(),
    ~length=getRangesLength()
  )
);