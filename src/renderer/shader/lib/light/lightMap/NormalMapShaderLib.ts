module wd{
    export class NormalMapShaderLib extends LightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "normalMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            super.sendShaderVariables(program, quadCmd, material);

            if(quadCmd.buffers.hasChild(EBufferDataType.TANGENT)){
                this.sendAttributeData(program, "a_tangent", <ArrayBuffer>quadCmd.buffers.getChild(EBufferDataType.TANGENT));
            }
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_tangent"]);

            this.addUniformVariable([
                VariableNameTable.getVariableName("normalMap")
            ]);
        }
    }
}

