module wd{
    export class CommonShader extends EngineShader{
        public static create(material:Material){
        	var obj = new this(material);

        	return obj;
        }

        public update(quadCmd:QuadCommand, material:Material){
            var program = this.program;

            this.judgeRefreshShader(quadCmd, material);

            this.program.use();

            this.libs.forEach((lib:EngineShaderLib) => {
                lib.sendShaderVariables(program, quadCmd, material);
            });

            material.sendTexture(program);
        }
    }
}
