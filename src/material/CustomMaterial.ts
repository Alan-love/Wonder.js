/// <reference path="../filePath.d.ts"/>
module dy{
    export class CustomMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }
    }
}

