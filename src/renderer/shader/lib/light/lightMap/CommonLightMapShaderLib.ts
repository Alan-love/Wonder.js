module wd{
    export class CommonLightMapShaderLib extends EngineShaderLib{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:LightMaterial){
            var texCoordBuffer:ArrayBuffer = cmd.buffers.getChild(EBufferDataType.TEXCOORD);

            if(!texCoordBuffer){
                return;
            }

            this.sendAttributeBuffer(program, "a_texCoord", texCoordBuffer);

            this.sendUniformData(program, "u_specular", material.specularColor.toVector3());
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addAttributeVariable(["a_texCoord"]);
            this.addUniformVariable(["u_specular"]);
        }
    }
}

