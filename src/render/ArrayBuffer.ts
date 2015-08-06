/// <reference path="../definitions.d.ts"/>
module dy.render{
    export class ArrayBuffer extends Buffer{
        public static create(data, num, type:BufferType):render.ArrayBuffer {
            var obj = new this();

            obj.initWhenCreate(data, num, type);

            return obj;
        }

        private _count:number = null;
        get count(){
            return this._count;
        }
        set count(count:number){
            this._count = count;
        }

        public initWhenCreate(data, num, type:BufferType) {
            var gl = Director.getInstance().gl;

            if(!data){
                return null;
            }

            this.innerBuffer = gl.createBuffer();   // Create a buffer object
            if (!this.innerBuffer) {
                dyCb.Log.log('Failed to create the this.innerBuffer object');
                return null;
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this.innerBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            this.innerNum = num;
            this.innerType = gl[type];
            this._count = data.length / num;

            return this.innerBuffer;
        }
    }
}

