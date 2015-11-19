/// <reference path="../../definitions.d.ts"/>
module dy {
    export class MorphBufferContainer extends BufferContainer {
        public static create(animation:MorphAnimation) {
            var obj = new this(animation);

            return obj;
        }

        constructor(animation:MorphAnimation) {
            super();

            this._animation = animation;
        }

        public geometryData:MorphGeometryData;

        protected container:dyCb.Hash<Buffer&Array<ArrayBuffer>>;

        //private _cache:dyCb.Hash<Buffer> = dyCb.Hash.create<Buffer>();
        private _animation:MorphAnimation = null;
        private _isCacheChangeFlag:any = {};
        private _isCacheChangeInLastLoop = {};

        public init() {
        }

        //todo
        //@cache(function(type){
        //    return !this._needReCalcuteTangent(type) && this._cache.hasChild(type) && !this._animation.isFrameChange;
        //}, function(type){
        //    return this._cache.getChild(<any>type);
        //}, function(result, type){
        //    this._cache.addChild(<any>type, result);
        //})


        //todo refactor
        //@In(function (type:BufferDataType) {
        //    assert(this.geometryData.morphTargets && this.geometryData.morphTargets.getCount() > 0, Log.info.FUNC_SHOULD("set morphTargets"));
        //})
        protected getVertice(type:BufferDataType) {
            //return this._getMorphData(type, this.geometryData.morphTargets.getChild(this._animation.currentAnimName));
            //

            //var animVertice = this._getMorphData(type, this.geometryData.morphTargets.getChild(this._animation.currentAnimName));

            //return [animVertice.getChild(this._animation.currentFrame), animVertice.getChild(this._animation.nextFrame)];
            return this._getMorphData(type, this.geometryData.morphTargets);
        }

        protected getNormal(type:BufferDataType) {
            //var animNormals = this._getMorphData(type, this.geometryData.morphNormals.getChild(this._animation.currentAnimName));
            //
            //return [animNormals.getChild(this._animation.currentFrame), animNormals.getChild(this._animation.nextFrame)];
            return this._getMorphData(type, this.geometryData.morphNormals);
        }

        private _getMorphData(type:BufferDataType, morphDataContainer:dyCb.Hash<dyCb.Collection<Array<number>>>):Array<ArrayBuffer> {
            var cacheData = null,
                frames = null,
                result = null;

            if(this._isNotPlayAnimation()){
                return this._getStaticData(type);
            }

            frames = morphDataContainer.getChild(this._animation.currentAnimName);

            dyCb.Log.error(!frames, dyCb.Log.info.FUNC_NOT_EXIST(`"${this._animation.currentAnimName}" animation data`));

            cacheData = this.container.getChild(<any>type);

            if (!cacheData) {
                let currentBuffer = ArrayBuffer.create(new Float32Array(frames.getChild(this._animation.currentFrame)), 3, BufferType.FLOAT, BufferUsage.DYNAMIC_DRAW),
                    nextBuffer = ArrayBuffer.create(new Float32Array(frames.getChild(this._animation.nextFrame)), 3, BufferType.FLOAT, BufferUsage.DYNAMIC_DRAW);

                result = [currentBuffer, nextBuffer];

                this.container.addChild(<any>type, result);
                this._isCacheChangeInLastLoop[type] = false;
            }
            else {
                if (this._animation.isFrameChange && (this._isCacheChangeInLastLoop[type] || !this._isCacheChange(type))) {
                    let [currentBuffer, nextBuffer] = cacheData,
                        newCurrentBuffer = null,
                        newNextBuffer = null;


                    //todo use double-buffer cache?
                    newCurrentBuffer = nextBuffer;
                    newNextBuffer = currentBuffer.resetData(new Float32Array(frames.getChild(this._animation.nextFrame)))

                    result = [newCurrentBuffer, newNextBuffer];

                    this.container.addChild(<any>type, result);

                    this._isCacheChangeFlag[type] = true;
                    this._isCacheChangeInLastLoop[type] = true;
                }
                else {
                    this._isCacheChangeFlag[type] = false;
                    this._isCacheChangeInLastLoop[type] = false;

                    result = cacheData;
                }
            }

            return result;
        }

        private _isCacheChange(type:BufferDataType){
            return this._isCacheChangeFlag[type];
        }

        private _isNotPlayAnimation(){
            return this._animation.currentAnimName === null;
        }
        
        @In(function(type:BufferDataType){
            
        })
        private _getStaticData(type:BufferDataType){
            const CACHE_KEY = `static_${type}`;
            var cacheData = this.container.getChild(CACHE_KEY),
                data = null,
                result = null;
            
            if(cacheData){
                return cacheData;
            }
            
            switch(type){
                case BufferDataType.VERTICE:
                    data = this.geometryData.vertices;
                    break;
                case BufferDataType.NORMAL:
                    data = this.geometryData.normals;
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_SHOULD("type", "be BufferDataType.VERTICE or BufferDataType.NORMAL"));
                    break;
            }

            this._animation.interpolation = 0;

            result = [
                ArrayBuffer.create(new Float32Array(data), 3, BufferType.FLOAT, BufferUsage.DYNAMIC_DRAW),
                //todo optimize: nextFrameData to be identity array?
                ArrayBuffer.create(new Float32Array(data), 3, BufferType.FLOAT, BufferUsage.DYNAMIC_DRAW),
                ];

            this.container.addChild(CACHE_KEY, result);

            return result;
        }
    }
}
