module wd{
    export class CommonShader extends EngineShader{
        public static create(){
        	var obj = new this();

        	return obj;
        }

        public update(quadCmd:QuadCommand, material:Material){
            var program = this.program;

            this.judgeRefreshShader(material);

            this.program.use();

            this.libs.forEach((lib:EngineShaderLib) => {
                lib.sendShaderVariables(program, quadCmd, material);
            });

            material.sendTexture(program);
        }
    }
}
