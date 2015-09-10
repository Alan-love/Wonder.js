/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class VariableLib{
        //todo group?(common,cubemap...)

        public static a_position:IShaderVariable = {
            type:VariableType.FLOAT_4,
            value:VariableCategory.ENGINE
        };

        public static a_normal:IShaderVariable = {
            type:VariableType.FLOAT_4,
            value:VariableCategory.ENGINE
        };

        public static a_color:IShaderVariable = {
            type:VariableType.FLOAT_4,
            value:VariableCategory.ENGINE
        };

        public static a_texCoord:IShaderVariable = {
            type:VariableType.FLOAT_2,
            value:VariableCategory.ENGINE
        };

        public static u_mMatrix:IShaderVariable = {
            type:VariableType.FLOAT_MAT4,
            value:VariableCategory.ENGINE
        };

        public static u_vMatrix:IShaderVariable = {
            type:VariableType.FLOAT_MAT4,
            value:VariableCategory.ENGINE
        };

        public static u_pMatrix:IShaderVariable = {
            type:VariableType.FLOAT_MAT4,
            value:VariableCategory.ENGINE
        };

        public static u_normalMatrix:IShaderVariable = {
            type:VariableType.FLOAT_MAT4,
            value:VariableCategory.ENGINE
        };

        public static u_samplerCube0:IShaderVariable = {
            type:VariableType.SAMPLER_CUBE,
            value:VariableCategory.ENGINE
        };

        public static u_sampler2D0:IShaderVariable = {
            type:VariableType.SAMPLER_2D,
            value:VariableCategory.ENGINE
        };

        public static u_sampler2D1:IShaderVariable = {
            type:VariableType.SAMPLER_2D,
            value:VariableCategory.ENGINE
        };

        public static u_cameraPos:IShaderVariable = {
            type:VariableType.FLOAT_3,
            value:VariableCategory.ENGINE
        };

        public static u_refractionRatio:IShaderVariable = {
            type:VariableType.FLOAT_1,
            value:VariableCategory.ENGINE
        };

        public static u_reflectivity:IShaderVariable = {
            type:VariableType.FLOAT_1,
            value:VariableCategory.ENGINE
        };

        public static u_sourceRegion:IShaderVariable = {
            type:VariableType.FLOAT_4,
            value:VariableCategory.ENGINE
        };

        public static u_repeatRegion:IShaderVariable = {
            type:VariableType.FLOAT_4,
            value:VariableCategory.ENGINE
        };

        public static u_combineMode:IShaderVariable = {
            type:VariableType.NUMBER_1,
            value:VariableCategory.ENGINE
        };

        public static u_mixRatio:IShaderVariable = {
            type:VariableType.FLOAT_1,
            value:VariableCategory.ENGINE
        };
    }

    export interface IShaderVariable{
        type:VariableType;
        value:any
    }
}

