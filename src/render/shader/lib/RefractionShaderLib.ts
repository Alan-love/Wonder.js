/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class RefractionShaderLib extends CubemapShaderLib{
        private static _instance:RefractionShaderLib = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public sendShaderVariables(program:Program, quadCmd:render.QuadCommand, material:CubemapMaterial) {
            super.sendShaderVariables(program, quadCmd, material);

            program.sendUniformData("u_refractionRatio", render.VariableType.FLOAT_1, material.refractionRatio);
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable(["u_refractionRatio"]);

            this.setVsSource();
            this.fsSourceHead = ShaderChunk.cubemap_head_fragment + ShaderChunk.refraction_head_fragment;
            this.fsSourceBody = ShaderChunk.cubemap_body_fragment + ShaderChunk.refraction_body_fragment;
        }
    }
}

