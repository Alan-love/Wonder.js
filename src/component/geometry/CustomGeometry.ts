/// <reference path="../../filePath.d.ts"/>
module wd{
    //todo support morphTargets?
    export class CustomGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        private _vertices:Array<number> = null;
        get vertices(){
            return this._vertices;
        }
        set vertices(vertices:Array<number>){
            this._vertices = vertices;

            if(this.buffers){
                this.buffers.geometryData.vertices = vertices;
                this.buffers.removeCache(BufferDataType.VERTICE);
            }
        }

        private _texCoords:Array<number> = null;
        get texCoords(){
            return this._texCoords;
        }
        set texCoords(texCoords:Array<number>){
            this._texCoords = texCoords;

            if(this.buffers) {
                this.buffers.geometryData.texCoords = texCoords;
                this.buffers.removeCache(BufferDataType.TEXCOORD);
            }
        }

        private _colors:Array<number> = null;
        get colors(){
            return this._colors;
        }
        set colors(colors:Array<number>){
            this._colors = colors;
            if(this.buffers) {
                this.buffers.geometryData.colors = colors;
                this.buffers.removeCache(BufferDataType.COLOR);
            }
        }

        private _indices:Array<number> = null;
        get indices(){
            return this._indices;
        }
        set indices(indices:Array<number>){
            this._indices = indices;
            if(this.buffers) {
                this.buffers.geometryData.faces = GeometryUtils.convertToFaces(indices, this.normals);
                this.buffers.removeCache(BufferDataType.INDICE);
            }
        }

        private _normals:Array<number> = null;
        get normals(){
            return this._normals;
        }
        set normals(normals:Array<number>){
            this._normals = normals;
            if(this.buffers) {
                this.buffers.geometryData.faces = GeometryUtils.convertToFaces(this.indices, normals);
                this.buffers.removeCache(BufferDataType.NORMAL);
            }
        }

        protected computeData(){
            return {
                vertices: this.vertices,
                faces: GeometryUtils.convertToFaces(this.indices, this.normals),
                texCoords: this.texCoords,
                colors: this.colors
            };
        }

        protected createBufferContainer():BufferContainer{
            return CommonBufferContainer.create();
        }
    }
}

