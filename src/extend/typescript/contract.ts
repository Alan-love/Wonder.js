/// <reference path="../../definitions.d.ts"/>
module dy{
    export function assert(cond:boolean, message:string="contract error"){
        dyCb.Log.error(!cond, message);
    }


    export function In(InFunc) {
        return function (target, name, descriptor) {
            var value = descriptor.value;

            descriptor.value = function(args){
                try{
                    InFunc.apply(this, arguments);
                }
                catch(e){
                    throw new Error(`In contract error:\n${e.message}`);
                }

                return value.apply(this, arguments);
            };

            return descriptor;
        }
    }

    export function Out(OutFunc) {
        return function (target, name, descriptor) {
            var value = descriptor.value;

            descriptor.value = function(args){
                var result = value.apply(descriptor, arguments);

                try{
                    OutFunc.call(this, result);
                }
                catch(e){
                    throw new Error(`Out contract error:\n${e.message}`);
                }

                return result;
            };

            return descriptor;
        }
    }

    export function Invariant(func) {
        return function (target) {
            try{
                func(target, new target());
            }
            catch(e){
                throw new Error(`Invariant contract error:\n${e.message}`);
            }
        }
    }
}
