/// <reference path="geometry/RectGeometry.ts"/>
/// <reference path="material/MeshMaterial.ts"/>
/// <reference path="ArrayBuffer.ts"/>
/// <reference path="ElementBuffer.ts"/>
/// <reference path="math/Matrix.ts"/>
/// <reference path="DrawMode.ts"/>
module Engine3D{
    export class Mesh{
        //todo be Geometry,Material(add baseClass Geometry,Material)
        public static create(gemo:RectGeometry, material: MeshMaterial):Mesh {
            var obj = new this(material);

            obj.initWhenCreate(gemo);

            return obj;
        }

        private _matrix:Matrix = null;
        get matrix(){
            return this._matrix;
        }
        set matrix(matrix:Matrix){
            this._matrix = matrix;
        }

        private _material:MeshMaterial = null;
        get material(){
            return this._material;
        }
        set material(material:MeshMaterial){
            this._material = material;
        }

        private _buffers:{
            vertexBuffer:ArrayBuffer
            texCoordBuffer?: ArrayBuffer
            normalBuffer?:ArrayBuffer
            indexBuffer?: ElementBuffer
        }= null;

        private _drawMode:DrawMode = DrawMode.TRIANGLES;
        get drawMode(){
            return this._drawMode;
        }
        set drawMode(drawMode:DrawMode){
            this._drawMode = drawMode;
        }

        constructor(material:MeshMaterial){
            this._material = material;
            this._matrix = Matrix.create();
        }

        public initWhenCreate(gemo:RectGeometry){
            this._initBuffer(gemo);
        }

        //todo extract render
        public draw(program){
            this._sendData(program);

            this._draw();
        }

        private _initBuffer(gemo:RectGeometry){
            this._buffers = {
                vertexBuffer:gemo.vertices? ArrayBuffer.create(gemo.vertices, 3, BufferType.FLOAT) : null,
                texCoordBuffer: gemo.texCoords? ArrayBuffer.create(gemo.texCoords, 2, BufferType.FLOAT) : null,
                normalBuffer: gemo.normals? ArrayBuffer.create(gemo.normals, 3, BufferType.FLOAT) : null,
                indexBuffer: gemo.indices? ElementBuffer.create(gemo.indices, BufferType.UNSIGNED_SHORT) : null
            };
        }

        private _sendData(program){
            if(this._buffers.vertexBuffer){
                program.setAttributeData("a_position", AttributeDataType.BUFFER, this._buffers.vertexBuffer);
            }
            else{
                throw new Error("must has vertexBuffer");
            }

            if(this._material.color){
                //this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
                //because a_color'pos is 0, and it should be array data(like Float32Array)
                //refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
                program.setAttributeData("a_color", AttributeDataType.FLOAT_4, [this._material.color.r, this._material.color.g, this._material.color.b, 1.0]);
            }
        }

        private _draw(){
            var totalNum = 0,
                startOffset = 0,
                gl = WebGLContext.gl;

            if (this._buffers.indexBuffer) {
                totalNum = this._buffers.indexBuffer.num;
                gl.bindBuffer(gl.ARRAY_BUFFER, this._buffers.vertexBuffer.buffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffers.indexBuffer.buffer);
                gl.drawElements(gl[this._drawMode], totalNum, this._buffers.indexBuffer.type, this._buffers.indexBuffer.typeSize * startOffset);
            } else {
                totalNum = this._buffers.vertexBuffer.num;
                gl.drawArrays(gl[this._drawMode], startOffset, totalNum);
            }
        }
    }
}
