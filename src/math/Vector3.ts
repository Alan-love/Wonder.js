/// <reference path="../definitions.d.ts"/>
module Engine3D{
    export class Vector3{
        public static create(x, y, z):Vector3 ;
        public static create():Vector3 ;
        public static create():Vector3 {
            var m = null;

            if(arguments.length === 0){
                m = new this();
            }
            else{
                m = new this(arguments[0], arguments[1], arguments[2]);
            }

            return m;
        }

        private _values: Float32Array;
        get values():Float32Array { return this._values; }
        set values(values: Float32Array) {
            this._values = values;
        }

        constructor(x, y, z);
        constructor();
        constructor(){
            this._values = new Float32Array(3);

            if(arguments.length > 0){
                this._values[0] = arguments[0];
                this._values[1] = arguments[1];
                this._values[2] =arguments[2];
            }
        }

        public normalize(): Vector3{
            var v = this._values;
            var d = Math.sqrt(
                v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
            );

            if(d === 0){
                return Vector3.create(0, 0, 0);
            }

            v[0] = v[0] / d;
            v[1] = v[1] / d;
            v[2] = v[2] / d;

            return this;
        }

        public sub(v:Vector3):Vector3 {
            return Vector3.create(
                this._values[0] - v.values[0],
                this._values[1] - v.values[1],
                this._values[2] - v.values[2]
            )
        }

        public reverse():Vector3{
            this._values[0] = -this._values[0];
            this._values[1] = -this._values[1];
            this._values[2] = -this._values[2];

            return this;
        }

        public copy(): Vector3{
            var result = Vector3.create(),
                i = 0,
                len = this._values.length;

            for(i = 0; i < len; i++){
                result.values[i] = this._values[i];
            }

            return result;
        }

        public toVec4(): Vector4{
            return Vector4.create(this._values[0], this._values[1], this._values[2], 1.0);
        }
    }
}
