/// <reference path="../../definitions.d.ts"/>
module dy{
    export class TriangleGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        private _width:number = null;
        get width(){
            return this._width;
        }
        set width(width:number){
            this._width = width;
        }

        private _height:number = null;
        get height(){
            return this._height;
        }
        set height(height:number){
            this._height = height;
        }

        protected computeVerticesBuffer(){
            var width = this._width,
                height = this._height,
                left = -width / 2,
                right = width / 2,
                up = height / 2,
                down = -height / 2;

            return render.ArrayBuffer.create(new Float32Array([
                    0.0, up, 0,
                    left, down, 0,
                    right, down, 0
                ]),
                3, render.BufferType.FLOAT)
        }

        protected computeIndicesBuffer(){
            return render.ElementBuffer.create(new Uint8Array([
                0, 1, 2
            ]), render.BufferType.UNSIGNED_BYTE)
        }
    }
}

