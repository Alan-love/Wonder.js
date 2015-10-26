/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class LightCommonShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "lightCommon";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){

        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.setVsSource(this.getVsChunk("light_common.glsl"));
            this.setVsSource(this.getVsChunk(), "+");

            this.setFsSource(this.getFsChunk("light_common.glsl"));
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}

