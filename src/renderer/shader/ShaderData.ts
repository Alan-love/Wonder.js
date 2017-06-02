import { Shader } from "./Shader";

export class ShaderData {
    public static index: number = null;
    public static count: number = null;

    // public static vsSourceMap = null;
    // public static fsSourceMap = null;

    public static shaderMap: ShaderShaderMap = null;
    public static isInitMap: ShaderIsInitMap = null;
}

export type ShaderShaderMap = {
    [materialClassName: string]: Shader
}

export type ShaderIsInitMap = {
    [index: number]: boolean
}
