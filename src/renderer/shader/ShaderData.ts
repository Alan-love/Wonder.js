export class ShaderData{
    public static index:number = null;
    public static count:number = null;

    // public static vsSourceMap = null;
    // public static fsSourceMap = null;
    public static programMap:ProgramMap = null;
    public static attributeLocationMap:AttributeLocationMap = null;
    public static uniformLocationMap:UniformLocationMap = null;

    public static sendAttributeConfigMap:SendAttributeConfigMap = null;
    public static sendUniformConfigMap = null;

    public static lastUsedProgram:WebGLProgram = null;

    public static vertexAttribHistory:Array<boolean> = null;

    public static lastBindedArrayBuffer:WebGLBuffer = null;
    public static lastBindedIndexBuffer:WebGLBuffer = null;
}

export type SendAttributeConfigMap = {
    [index:number]: Array<SendAttributeConfig>
}

export type SendAttributeConfig = {
    name:string;
    buffer:string;
}

export type SendUniformConfigMap = {
    [index:number]: Array<SendUniformConfig>
}

export type SendUniformConfig = {
    name:string;
    field:string;
    type:"mat4";
}

export type ProgramMap = {
    [index:number]: WebGLProgram
}

export type AttributeLocationMap = {
    [name:string]:number;
}

export type UniformLocationMap = {
    [name:string]:WebGLUniformLocation;
}
