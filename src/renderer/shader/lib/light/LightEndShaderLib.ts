/// <reference path="../../../../filePath.d.ts"/>
module wd{
    export class LightEndShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "lightEnd";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
        }
    }
}

