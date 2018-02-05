open GlType;

type vboBufferData = {
  vertexBufferMap: array(buffer),
  normalBufferMap: array(buffer),
  elementArrayBufferMap: array(buffer),
  matrixInstanceBufferMap: array(buffer),
  vertexArrayBufferPool: array(buffer),
  elementArrayBufferPool: array(buffer),
  matrixInstanceBufferPool: array(buffer)
};