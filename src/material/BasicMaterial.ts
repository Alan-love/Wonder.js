/// <reference path="../definitions.d.ts"/>
module dy{
    export class BasicMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }
        
        private _map:Texture|Array<Texture> = null;
        set map(map:Texture|Array<Texture>){
            if(map instanceof Texture){
                this.addMap(map);
            }
            else{
                let mapArr:Array<Texture> = (arguments[0]);

                dyCb.Log.error(mapArr.length > 2, dyCb.Log.info.FUNC_SUPPORT("only", "map.count <= 2"));

                for(let m of mapArr){
                    this.addMap(m);
                }
            }
        }

        protected addShaderLib(){
            this.shader.addLib(BasicShaderLib.create());

            this._setMapShaderLib();
            //this._setEnvMapShaderLib();
        }

        private _setMapShaderLib(){
            var mapCount = this.mapManager.getMapCount();

            if(mapCount > 0){
                if(mapCount > 1){
                    this.shader.addLib(MultiMapShaderLib.create());
                }
                else{
                    this.shader.addLib(BasicMapShaderLib.create());
                }
            }
        }

        //private _setEnvMapShaderLib(){
        //    var envMap = this.envMap;
        //
        //    if(!envMap){
        //        return;
        //    }
        //
        //    this.addNormalShaderLib();
        //
        //    switch (envMap.mode){
        //        case EnvMapMode.NORMAL:
        //            this.shader.addLib(BasicEnvMapForBasicShaderLib.create());
        //            break;
        //        case EnvMapMode.REFLECTION:
        //            this.shader.addLib(ReflectionForBasicShaderLib.create());
        //            break;
        //        case EnvMapMode.REFRACTION:
        //            this.shader.addLib(RefractionForBasicShaderLib.create());
        //            break;
        //        case EnvMapMode.FRESNEL:
        //            this.shader.addLib(FresnelForBasicShaderLib.create());
        //            break;
        //        default:
        //            Log.error(true, Log.info.FUNC_INVALID("EnvMapMode"));
        //            break;
        //    }
        //}
    }
}

