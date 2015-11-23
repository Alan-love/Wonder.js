/// <reference path="../../filePath.d.ts"/>
module dy{
    export class PointLight extends Light{
        public static type:string = "pointLight";

        public static create() {
            var obj = new this();

            return obj;
        }

        private _rangeLevel:number = null;
        get rangeLevel(){
            return this._rangeLevel;
        }
        set rangeLevel(rangeLevel:number){
            this._rangeLevel = rangeLevel;
            this._attenuation.rangeLevel = this._rangeLevel;
        }

        get range(){
            return this._attenuation.range;
        }

        get constant(){
            return this._attenuation.constant;
        }

        get linear(){
            return this._attenuation.linear;
        }

        get quadratic(){
            return this._attenuation.quadratic;
        }

        private _shadowRenderList:dyCb.Hash<Array<GameObject>|dyCb.Collection<GameObject>> = null;
        get shadowRenderList(){
            return this._shadowRenderList;
        }
        set shadowRenderList(shadowRenderList:any) {
            if (JudgeUtils.isDirectObject(shadowRenderList)) {
                this._shadowRenderList = dyCb.Hash.create<Array<GameObject>|dyCb.Collection<GameObject>>(shadowRenderList);
            }
            else if (shadowRenderList instanceof dyCb.Hash) {
                this._shadowRenderList = shadowRenderList;
            }
            else {
                Log.error(true, Log.info.FUNC_MUST_BE("shadowRenderList", "object or dyCb.Hash"));
            }
        }

        public intensity:number = 1;

        public shadowMap:CubemapShadowMapTexture;
        public shadowMapRenderer:CubemapShadowMapRenderTargetRenderer;

        private _attenuation:Attenuation = Attenuation.create();

        public init(){
            if(this.castShadow){
                this.shadowMap = CubemapShadowMapTexture.create();

                this.shadowMapRenderer = CubemapShadowMapRenderTargetRenderer.create(this);
                Director.getInstance().scene.addRenderTargetRenderer(this.shadowMapRenderer);
            }
        }

        public dispose(){
            if(this.castShadow){
                this.shadowMap.dispose();

                Director.getInstance().scene.removeRenderTargetRenderer(this.shadowMapRenderer);
            }
        }
    }
}
