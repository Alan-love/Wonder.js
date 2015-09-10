/// <reference path="../../definitions.d.ts"/>
module dy{
    export class RectGeometry extends Geometry{
        public static create(){
                var geom = new this();

                return geom;
            }

        public width:number = null;
        public height:number = null;

        protected computeVerticesBuffer(){
            var width = this.width,
                height = this.height,
            left = -width / 2,
                right = width / 2,
                up = height / 2,
                down = -height / 2;

            return render.ArrayBuffer.create(new Float32Array([
                right, up, 0,
                left, up, 0,
                left, down, 0,
                right, down, 0
            ]),
                3, render.BufferType.FLOAT)
        }

        protected computeIndicesBuffer(){
            return render.ElementBuffer.create(new Uint16Array([
                0, 1, 2,   0, 2, 3
            ]), render.BufferType.UNSIGNED_SHORT)
        }

        protected computeNormalsBuffer(){
            return render.ArrayBuffer.create(new Float32Array([
                    0, 0, 1,
                    0, 0, 1,
                    0, 0, 1,
                    0, 0, 1
                ]),
                3, render.BufferType.FLOAT)
        }

        protected computeTexCoordsBuffer(){
            return render.ArrayBuffer.create(new Float32Array([
                    1.0, 1.0,
                    0.0, 1.0,
                    0.0, 0.0,
                    1.0, 0.0
                ]),
                2, render.BufferType.FLOAT);
        }
    }
}

