/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class BuildShadowMapShaderLib extends ShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "buildShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.vsSourceBody = ShaderSnippet.setPos_mvp;
        }
    }
}

