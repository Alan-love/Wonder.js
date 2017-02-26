import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { EngineShaderLib } from "../EngineShaderLib";
import { Program } from "../../../program/Program";
import { QuadCommand } from "../../../command/QuadCommand";
import { BasicMaterial } from "../../../../material/BasicMaterial";

@registerClass("BasicMaterialColorShaderLib")
export class BasicMaterialColorShaderLib extends EngineShaderLib {
    public static create() {
        var obj = new this();

        return obj;
    }

    public type: string = "basic_materialColor";

    public sendShaderVariables(program: Program, cmd: QuadCommand, material: BasicMaterial) {
        this.sendUniformData(program, "u_color", material.color.toVector3());
    }

    public setShaderDefinition(cmd: QuadCommand, material: BasicMaterial) {
        super.setShaderDefinition(cmd, material);

        this.addUniformVariable(["u_color"]);
    }
}