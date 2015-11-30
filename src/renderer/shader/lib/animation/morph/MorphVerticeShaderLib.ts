/// <reference path="../../../../../filePath.d.ts"/>
module wd{
    export class MorphVerticeShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "morphVertice";

        @require(function(program:Program, quadCmd:QuadCommand, material:Material){
            assert(!!quadCmd.animation, Log.info.FUNC_SHOULD("gameObject", "add MorphAnimation component"));
        })
        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material){
            if (quadCmd.buffers.hasChild(BufferDataType.VERTICE)) {
                let morphVerticeData = quadCmd.buffers.getChild(BufferDataType.VERTICE);


                this.sendAttributeData(program, "a_currentFramePosition", morphVerticeData[0]);
                this.sendAttributeData(program, "a_nextFramePosition", morphVerticeData[1]);
            }
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_currentFramePosition", "a_nextFramePosition"]);
        }
    }
}

