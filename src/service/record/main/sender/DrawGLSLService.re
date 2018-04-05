open Gl;

open GlType;

let bindElementArrayBuffer =
  [@bs]
  (
    (
      gl,
      (size: int, pos: attributeLocation),
      buffer,
      vertexAttribHistoryArray: GLSLSenderType.vertexAttribHistoryArray
      /* sendAttributeState: StateSendAttributeType.sendAttributeState */
    ) =>
      /* let {lastSendElementArrayBuffer} as record = state.glslSenderRecord; */
      /* switch lastSendElementArrayBuffer {
         | Some(lastSendElementArrayBuffer) when lastSendElementArrayBuffer === buffer => state
         | _ =>
           record.lastSendElementArrayBuffer = Some(buffer); */
      bindBuffer(getElementArrayBuffer(gl), buffer, gl)
      /* } */
  );

let drawElement = ((drawMode: int, type_: int, typeSize: int, indicesCount: int), gl) => {
  let startOffset = 0;
  drawElements(drawMode, indicesCount, type_, typeSize * startOffset, gl);
  ()
};

let drawArray = (drawMode: int, verticesCount: int, gl) => {
  let startOffset = 0;
  drawArray(drawMode, startOffset, verticesCount, gl);
  ()
};

let drawElementsInstancedANGLE =
    ((drawMode, type_, typeSize: int, indicesCount: int, instancesCount), extension) => {
  let startOffset = 0;
  [@bs]
  extension##drawElementsInstancedANGLE(
    drawMode,
    indicesCount,
    type_,
    typeSize * startOffset,
    instancesCount
  )
  |> ignore
};