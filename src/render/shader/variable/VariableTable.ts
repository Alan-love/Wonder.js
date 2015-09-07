/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    const _table = dyCb.Hash.create<string>();

    //todo remove <any>
    _table.addChild(<any>VariableType.FLOAT_1, "float");
    _table.addChild(<any>VariableType.FLOAT_3, "vec3");
    _table.addChild(<any>VariableType.FLOAT_4, "vec4");
    _table.addChild(<any>VariableType.FLOAT_MAT4, "mat4");
    _table.addChild(<any>VariableType.NUMBER_1, "int");

    export class VariableTable{
        public static getVariableType(type:VariableType){
            //todo remove <any>
            var result = _table.getChild(<any>type);

            dyCb.Log.error(result === void 0, dyCb.Log.info.FUNC_NOT_EXIST(type, "in VariableTable"));

            return result;
        }
    }
}

