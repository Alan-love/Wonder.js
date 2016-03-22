module wd{
    export class InstanceNormalMatrixShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "instance_normalMatrix";

        public sendShaderVariables(program:Program, cmd:InstanceCommand, material:EngineMaterial){
        }

        public setShaderDefinition(cmd:InstanceCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addAttributeVariable(["a_normalVec4_0", "a_normalVec4_1","a_normalVec4_2"]);
        }
    }
}

