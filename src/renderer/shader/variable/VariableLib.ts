/// <reference path="../../../definitions.d.ts"/>
module dy{
    export class VariableLib{
        //todo group?(common,cubemap...)

        public static a_position:ShaderVariable = {
            type:VariableType.FLOAT_4,
            value:VariableCategory.ENGINE
        };

        public static a_normal:ShaderVariable = {
            type:VariableType.FLOAT_4,
            value:VariableCategory.ENGINE
        };

        public static a_color:ShaderVariable = {
            type:VariableType.FLOAT_4,
            value:VariableCategory.ENGINE
        };

        public static a_texCoord:ShaderVariable = {
            type:VariableType.FLOAT_2,
            value:VariableCategory.ENGINE
        };

        public static u_mMatrix:ShaderVariable = {
            type:VariableType.FLOAT_MAT4,
            value:VariableCategory.ENGINE
        };

        public static u_vMatrix:ShaderVariable = {
            type:VariableType.FLOAT_MAT4,
            value:VariableCategory.ENGINE
        };

        public static u_pMatrix:ShaderVariable = {
            type:VariableType.FLOAT_MAT4,
            value:VariableCategory.ENGINE
        };

        public static u_normalMatrix:ShaderVariable = {
            type:VariableType.FLOAT_MAT4,
            value:VariableCategory.ENGINE
        };

        public static u_samplerCube0:ShaderVariable = {
            type:VariableType.SAMPLER_CUBE,
            value:VariableCategory.ENGINE
        };

        public static u_sampler2D0:ShaderVariable = {
            type:VariableType.SAMPLER_2D,
            value:VariableCategory.ENGINE
        };

        public static u_sampler2D1:ShaderVariable = {
            type:VariableType.SAMPLER_2D,
            value:VariableCategory.ENGINE
        };

        public static u_cameraPos:ShaderVariable = {
            type:VariableType.FLOAT_3,
            value:VariableCategory.ENGINE
        };

        public static u_refractionRatio:ShaderVariable = {
            type:VariableType.FLOAT_1,
            value:VariableCategory.ENGINE
        };

        public static u_reflectivity:ShaderVariable = {
            type:VariableType.FLOAT_1,
            value:VariableCategory.ENGINE
        };

        public static u_sourceRegion:ShaderVariable = {
            type:VariableType.FLOAT_4,
            value:VariableCategory.ENGINE
        };

        public static u_repeatRegion:ShaderVariable = {
            type:VariableType.FLOAT_4,
            value:VariableCategory.ENGINE
        };

        public static u_combineMode:ShaderVariable = {
            type:VariableType.NUMBER_1,
            value:VariableCategory.ENGINE
        };

        public static u_mixRatio:ShaderVariable = {
            type:VariableType.FLOAT_1,
            value:VariableCategory.ENGINE
        };

        public static u_diffuse:ShaderVariable = {
            type:VariableType.FLOAT_3,
            value:VariableCategory.ENGINE
        };

        public static u_specular:ShaderVariable = {
            type:VariableType.FLOAT_3,
            value:VariableCategory.ENGINE
        };

        public static u_shininess:ShaderVariable = {
            type:VariableType.FLOAT_1,
            value:VariableCategory.ENGINE
        };

        public static u_ambient:ShaderVariable = {
            type:VariableType.FLOAT_3,
            value:VariableCategory.ENGINE
        };

        public static u_directionLight:ShaderVariable = {
            type:VariableType.STRUCTURE,
            value:VariableCategory.ENGINE
        };

        public static u_pointLight:ShaderVariable = {
            type:VariableType.STRUCTURE,
            value:VariableCategory.ENGINE
        };
    }

    export type ShaderVariable = {
        type:VariableType;
        value:any
    }
}

