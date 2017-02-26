import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { EngineShaderLib } from "../EngineShaderLib";
import { Program } from "../../../program/Program";
import { QuadCommand } from "../../../command/QuadCommand";
import { EngineMaterial } from "../../../../material/EngineMaterial";
import { ShaderChunk } from "../../chunk/ShaderChunk";

@registerClass("CommonShaderLib")
export class CommonShaderLib extends EngineShaderLib {
    public static create() {
        var obj = new this();

        return obj;
    }

    public type: string = "common";

    public sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial) {
        this.sendUniformData(program, "u_vMatrix", cmd.vMatrix);
        this.sendUniformData(program, "u_pMatrix", cmd.pMatrix);
        this.sendUniformData(program, "u_mMatrix", cmd.mMatrix);
    }

    public setShaderDefinition(cmd: QuadCommand, material: EngineMaterial) {
        super.setShaderDefinition(cmd, material);

        //todo use VariableLib.xxx?
        // this.addUniformVariable(["u_vMatrix", "u_pMatrix"]);
        this.addUniformVariable(["u_vMatrix", "u_pMatrix", "u_mMatrix"]);

        this.vsSourceDefine = ShaderChunk.common_define.define + ShaderChunk.common_vertex.define;
        this.vsSourceFuncDefine = ShaderChunk.common_function.funcDefine + ShaderChunk.common_vertex.funcDefine;

        this.fsSourceDefine = ShaderChunk.common_define.define + ShaderChunk.common_fragment.define;
        this.fsSourceFuncDefine = ShaderChunk.common_function.funcDefine + ShaderChunk.common_fragment.funcDefine;
    }
}