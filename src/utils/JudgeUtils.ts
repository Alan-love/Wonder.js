/// <reference path="../filePath.d.ts"/>
module dy {
    export class JudgeUtils extends wdCb.JudgeUtils{
        public static isView(obj) {
            return !!obj && obj.offset && obj.width && obj.height && this.isFunction(obj.getContext);
        }

        public static isEqual(target1:GameObject, target2:GameObject) {
            return target1.uid === target2.uid;
        }

        /*
         ///isPowerOfTwo方法是否2的幂,如果该值是2的幂，返回true。
         */
        ///<summary>isPowerOfTwo</summary>
        ///<returns type="Number">如果该值是2的幂，返回true。</returns>
        public static isPowerOfTwo(value:number) {
            return (value & (value - 1)) === 0 && value !== 0;
        }

        public static isFloatArray(data:any){
            return Object.prototype.toString.call(data) === "[object Float32Array]" || Object.prototype.toString.call(data) === "[object Float16Array]";
        }
    }
}
