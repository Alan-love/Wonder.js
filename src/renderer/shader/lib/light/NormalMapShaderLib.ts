/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export abstract class NormalMapShaderLib extends LightMapShaderLib{
        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            super.sendShaderVariables(program, quadCmd, material);

            if(quadCmd.buffers.hasChild("tangentBuffer")){
                program.sendAttributeData("a_tangent", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("tangentBuffer"));
            }
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addAttributeVariable(["a_tangent"]);

            this.addUniformVariable([
                VariableNameTable.getVariableName("normalMap")
            ]);

            this.setSourceContent();
        }

        protected abstract setSourceContent();
    }
}

