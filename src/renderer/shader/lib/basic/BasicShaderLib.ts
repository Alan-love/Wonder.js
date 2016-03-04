module wd{
    export class BasicShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "basic";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:BasicMaterial){
            var colorBuffer:ArrayBuffer = quadCmd.buffers.getChild(EBufferDataType.COLOR);

            if(!colorBuffer){
                return;
            }

            /*!
             this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
             because a_color'pos is 0, and it should be array data(like Float32Array)
             refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
             */
            this.sendAttributeData(program, "a_color", colorBuffer);
            this.sendUniformData(program, "u_opacity", material.opacity);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:BasicMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_color"]);
            this.addUniformVariable(["u_opacity"]);

            this.vsSourceBody = ShaderSnippet.setPos_mvp + ShaderChunk.basic_vertex.body;
        }
    }
}

