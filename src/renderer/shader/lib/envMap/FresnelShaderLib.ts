/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class FresnelShaderLib extends EnvMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "fresnel";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EnvMapMaterial) {
            super.sendShaderVariables(program, quadCmd, material);

            program.sendUniformData("u_refractionRatio", VariableType.FLOAT_1, material.refractionRatio);


            program.sendUniformData("u_reflectivity", VariableType.FLOAT_1, material.reflectivity);
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable(["u_refractionRatio", "u_reflectivity"]);

            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
            //this.fsSourceHead = ShaderChunk.envMap_head_fragment + ShaderChunk.fresnel_head_fragment;
            //this.fsSourceBody = ShaderChunk.envMap_body_fragment + ShaderChunk.fresnel_body_fragment;
        }
    }
}

