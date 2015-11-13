/// <reference path="../definitions.d.ts"/>
module dy{
    import JudgeUtils = dyRt.JudgeUtils;
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

        public init(){
            this.shader.addLib(BasicShaderLib.create());
            
            this._initMap();

            super.init();
        }

        private _initMap(){
            var mapCount = this.textureManager.getMapCount();

            if(mapCount > 0){
                if(mapCount > 1){
                    this.shader.addLib(MultiMapShaderLib.create());
                }
                else{
                    this.shader.addLib(BasicMapShaderLib.create());
                }
            }
        }
    }
}

