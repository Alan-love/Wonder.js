module wd{
    export class VideoTexture extends CommonTexture{
        public static create(asset:VideoTextureAsset) {
            var obj = new this();

            obj.initWhenCreate(asset);

            return obj;
        }

        private _video:Video = null;
        private _startLoopHandler:() => void = null;

        public initWhenCreate(asset:VideoTextureAsset){
            super.initWhenCreate(asset);

            this._video = asset.video;
        }

        public init(){
            super.init();

            this._startLoopHandler = wdCb.FunctionUtils.bind(this, () => {
                if(this._video.isStop){
                    this.needUpdate = false;
                }
                else{
                    this.needUpdate = true;
                }
            });

            EventManager.on(<any>EEngineEvent.STARTLOOP, this._startLoopHandler);

            return this;
        }

        public dispose(){
            EventManager.off(<any>EEngineEvent.STARTLOOP, this._startLoopHandler);
        }

        protected needClampMaxSize(){
            return false;
        }
    }
}

