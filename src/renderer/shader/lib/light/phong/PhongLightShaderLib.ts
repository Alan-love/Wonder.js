/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class PhongLightShaderLib extends LightShaderLib {
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        protected setSourceContent(){
            this.vsSourceHead = ShaderChunk.light_phong_head_vertex;
            this.vsSourceBody = ShaderChunk.light_phong_body_vertex;
            this.fsSourceHead = ShaderChunk.light_phong_head_fragment + ShaderChunk.light_common_head;
            this.fsSourceBody = ShaderChunk.light_phong_body_fragment;
        }

        protected setSourceDefine(direction_lights_count:number, point_lights_count:number){
            this.fsSourceDefineList.addChildren([{
                name: "DIRECTION_LIGHTS_COUNT",
                value: direction_lights_count
            }, {
                name: "POINT_LIGHTS_COUNT",
                value: point_lights_count
            }]);
        }
    }
}

