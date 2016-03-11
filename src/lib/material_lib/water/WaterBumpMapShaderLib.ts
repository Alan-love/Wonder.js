module wd{
    export class WaterBumpMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "water_bump";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:WaterMaterial){
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:WaterMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("bumpMap")
            ]);
        }
    }
}

