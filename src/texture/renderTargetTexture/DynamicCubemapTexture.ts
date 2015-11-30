/// <reference path="../../filePath.d.ts"/>
module wd {
    export class DynamicCubemapTexture extends CubemapRenderTargetTexture {
        public static create() {
            var obj = new this();

            return obj;
        }

        private _renderList:wdCb.Hash<[string, Array<GameObject>]> = null;
        get renderList() {
            return this._renderList;
        }

        set renderList(renderList:any) {
            if (JudgeUtils.isDirectObject(renderList)) {
                this._renderList = wdCb.Hash.create<[string, Array<GameObject>]>(renderList);
            }
            else if (renderList instanceof wdCb.Hash) {
                this._renderList = renderList;
            }
            else {
                Log.error(true, Log.info.FUNC_MUST_BE("renderList", "array or wdCb.Collection"));
            }
        }

        public size:number = 256;
        public near:number = 0.1;
        public far:number = 100;
        public mode:EnvMapMode = null;

        public init() {
            super.init();

            this.width = this.size;
            this.height = this.size;

            Director.getInstance().scene.addRenderTargetRenderer(DynamicCubemapRenderTargetRenderer.create(this));

            return this;
        }

        public getSamplerName(unit:number){
            return this.getSamplerNameByVariableData(unit, VariableType.SAMPLER_CUBE);
        }
    }
}

