module wd{
    export class ArticulatedAnimation extends Animation{
        public static create() {
            var obj = new this();

            return obj;
        }

        public data:ArticulatedAnimationData = null;

        private _currentFrame:number = null;
        private _currentAnimName:string = null;
        private _beginElapsedTimeOfFirstFrame:number = null;
        private _prevFrameTime:number = null;
        private _currentAnimData:wdCb.Collection<ArticulatedAnimationFrameData> = null;
        private _currentFrameData:ArticulatedAnimationFrameData = null;
        private _prevFrameData:ArticulatedAnimationFrameData = null;
        private _startFrameDataMap:wdCb.Hash<any> = wdCb.Hash.create<any>();

        public init(){
        }

        public dispose(){
        }

        public play(animName:string);
        public play(animIndex:number);

        @require(function(...args){
            if(JudgeUtils.isNumber(args[0])){
                let animIndex:number = args[0];

                assert(this.data.getCount() >= animIndex + 1, Log.info.FUNC_NOT_EXIST(`animation index:${animIndex}`));
            }
            else if(JudgeUtils.isString(args[0])){
                let animName:string = args[0];

                assert(this.data.hasChild(animName), Log.info.FUNC_NOT_EXIST(`animation name:${animName}`));
            }
        })
        @ensure(function(){
            assert(!!this._currentAnimData, Log.info.FUNC_NOT_EXIST(`animation name:${this._currentAnimName}`));

            this._currentAnimData.forEach((data:ArticulatedAnimationFrameData) => {
                assert(data.time >= 0, Log.info.FUNC_SHOULD("time", ">= 0"));

                assert(data.targets.getCount() > 0, Log.info.FUNC_SHOULD("ArticulatedAnimationFrameData->targets.getCount()", "> 0"));

                data.targets.forEach((target:ArticulatedAnimationFrameTargetData) => {
                    var data = target.data;

                    switch (target.target){
                        case EArticulatedAnimationTarget.TRANSLATION:
                            assert(data instanceof Vector3, Log.info.FUNC_MUST_BE("if target:EArticulatedAnimationTarget === TRANSLATION, its data", "Vector3"));
                            break;
                        case EArticulatedAnimationTarget.ROTATION:
                            assert(data instanceof Quaternion, Log.info.FUNC_MUST_BE("if target:EArticulatedAnimationTarget ===ROTATION, its data", "Quaternion"));
                            break;
                        case EArticulatedAnimationTarget.SCALE:
                            assert(data instanceof Vector3, Log.info.FUNC_MUST_BE("if target:EArticulatedAnimationTarget === SCALE, its data", "Vector3"));
                            break;
                        default:
                            Log.error(true, Log.info.FUNC_NOT_SUPPORT(`EArticulatedAnimationTarget:${target.target}`));
                            break;
                    }
                })
            })
        })
        public play(...args){
            if(JudgeUtils.isNumber(args[0])){
                let animIndex:number = args[0],
                    i = 0,
                    self = this;

                this.data.forEach((data:wdCb.Collection<ArticulatedAnimationFrameData>, animName:string) => {
                    if(animIndex === i){
                        self._currentAnimName = animName;
                        self._currentAnimData = data;

                        return wdCb.$BREAK;
                    }

                    i++;
                });
            }
            else if(JudgeUtils.isString(args[0])){
                let animName:string = args[0];

                this._currentAnimName = animName;
                this._currentAnimData = this.data.getChild(animName);
            }

            this.resetAnim();
            this._saveStartFrameData();

            this.frameCount = this._currentAnimData.getCount();
            this.state = EAnimationState.RUN;
        }

        protected handleWhenPause(elapsedTime:number):void{
        }

        protected handleWhenCurrentFrameFinish(elapsedTime:number):void{
            this.isFrameChange = true;

            this._updateFrame(elapsedTime);
            this._updateTargetsToBeLastEndFrameData();
            this._saveStartFrameData();
        }

        protected handleBeforeJudgeWhetherCurrentFrameFinish(elapsedTime:number):void{
            if(this._beginElapsedTimeOfFirstFrame === null){
                this._beginElapsedTimeOfFirstFrame = this.getCurrentTime();
            }
        }

        @require(function(elapsedTime:number){
            assert(elapsedTime - this._beginElapsedTimeOfFirstFrame - this.pauseDuration >= 0, Log.info.FUNC_SHOULD(`elapsedTime of current frame:${elapsedTime - this._beginElapsedTimeOfFirstFrame - this.pauseDuration}`, ">= 0"));
        })
        protected isCurrentFrameFinish(elapsedTime:number):boolean{
            return elapsedTime - this._beginElapsedTimeOfFirstFrame - this.pauseDuration > this._currentFrameData.time;
        }

        protected handleAfterJudgeWhetherCurrentFrameFinish(elapsedTime:number):void{
            this._updateTargets(elapsedTime);
        }

        protected resetAnim(){
            this._beginElapsedTimeOfFirstFrame = null;
            this._prevFrameTime = 0;
            this.pauseDuration = 0;
            this._currentFrame = 0;

            this._prevFrameData = null;
            this._updateCurrentFrameData();

            this._startFrameDataMap.removeAllChildren();
        }

        private _updateTargets(elapsedTime:number):void{
            var self = this,
                transform = this.entityObject.transform,
                startFrameDataMap = this._startFrameDataMap;

            this._currentFrameData.targets.forEach((target:ArticulatedAnimationFrameTargetData) => {
                var endFrameData = target.data,
                    startFrameData = startFrameDataMap.getChild(<any>target.target),
                    interpolation = self._computeInterpolation(elapsedTime, target.interpolationMethod);

                switch (target.target){
                    case EArticulatedAnimationTarget.TRANSLATION:
                        transform.localPosition = Vector3.create().lerp(startFrameData, endFrameData, interpolation);
                        break;
                    case EArticulatedAnimationTarget.ROTATION:
                        transform.localRotation = Quaternion.create().slerp(startFrameData, endFrameData, interpolation);
                        break;
                    case EArticulatedAnimationTarget.SCALE:
                        transform.localScale = Vector3.create().lerp(startFrameData, endFrameData, interpolation);
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_NOT_SUPPORT(`EArticulatedAnimationTarget:${target.target}`));
                        break;
                }
            });
        }

        @ensure(function(interpolation:number, elapsedTime:number, interpolationMethod:EKeyFrameInterpolation){
            assert(interpolation >= 0 && interpolation <= 1 , Log.info.FUNC_SHOULD(`interpolation:${interpolation}`, ">= 0 && <= 1"));
        })
        private _computeInterpolation(elapsedTime:number, interpolationMethod:EKeyFrameInterpolation){
            var interpolation:number = null;

            switch (interpolationMethod){
                case EKeyFrameInterpolation.LINEAR:
                    if(this._currentFrameData.time - this._prevFrameTime === 0){
                        interpolation = 1;
                    }
                    else{
                        interpolation = (elapsedTime - this._beginElapsedTimeOfFirstFrame - this.pauseDuration - this._prevFrameTime) / (this._currentFrameData.time - this._prevFrameTime);
                    }
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`interpolationMethod:${interpolationMethod}`));
                    break
            }

            return interpolation;
        }

        @require(function(){
            assert(this._currentFrameData !== null, Log.info.FUNC_SHOULD("set currentFrameData"));
        })
        private _saveStartFrameData(){
            var startFrameDataMap = this._startFrameDataMap,
                transform = this.entityObject.transform;

            this._currentFrameData.targets.forEach((target:ArticulatedAnimationFrameTargetData) => {
                var startFrameData = null;

                switch (target.target){
                    case EArticulatedAnimationTarget.TRANSLATION:
                        startFrameData = transform.localPosition;
                        break;
                    case EArticulatedAnimationTarget.ROTATION:
                        startFrameData = transform.localRotation;
                        break;
                    case EArticulatedAnimationTarget.SCALE:
                        startFrameData = transform.localScale;
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_NOT_SUPPORT(`EArticulatedAnimationTarget:${target.target}`));
                        break;
                }

                startFrameDataMap.addChild(<any>target.target, startFrameData);
            });
        }

        private _updateCurrentFrameData(){
            this._currentFrameData = this._currentAnimData.getChild(this._currentFrame);
        }

        private _updateFrame(elapsedTime:number){
            this._updateCurrentFrameIndex(elapsedTime);

            if(this._isFinishAllFrames()){
                this._currentFrame = 0;
                this._beginElapsedTimeOfFirstFrame = this._getBeginElapsedTimeOfFirstFrameWhenFinishAllFrames(elapsedTime);
                this._prevFrameTime = 0;

                this._prevFrameData = this._currentAnimData.getChild(this.frameCount - 1);
                this._updateCurrentFrameData();
            }
            else{
                this._prevFrameTime = this._currentAnimData.getChild(this._currentFrame - 1).time;
            }
        }

        @require(function(elapsedTime:number){
            var lastEndFrameTime = this._currentAnimData.getChild(this.frameCount - 1).time;

            assert(elapsedTime >= lastEndFrameTime, Log.info.FUNC_SHOULD(`elapsedTime:${elapsedTime}`, `>= lastEndFrameTime:${lastEndFrameTime}`));
        })
        private _getBeginElapsedTimeOfFirstFrameWhenFinishAllFrames(elapsedTime:number){
            return elapsedTime -  elapsedTime % this._currentAnimData.getChild(this.frameCount - 1).time;
        }

        private _isFinishAllFrames(){
            return this._currentFrame >= this.frameCount;
        }

        private _updateCurrentFrameIndex(elapsedTime:number){
            do{
                this._currentFrame++;

                this._prevFrameData = this._currentFrameData;
                this._updateCurrentFrameData();
            }while(!this._isFinishAllFrames() && this.isCurrentFrameFinish(elapsedTime));
        }

        @require(function(){
            assert(this._prevFrameData !== null, Log.info.FUNC_SHOULD_NOT("prevFrameData", "be null"));
        })
        private _updateTargetsToBeLastEndFrameData(){
            var self = this,
                transform = this.entityObject.transform;

            this._prevFrameData.targets.forEach((target:ArticulatedAnimationFrameTargetData) => {
                self._setTargetData(target.target, transform, target.data);
            });
        }

        private _setTargetData(target:EArticulatedAnimationTarget, transform:ThreeDTransform, data:any){
            switch (target){
                case EArticulatedAnimationTarget.TRANSLATION:
                    transform.localPosition = data;
                    break;
                case EArticulatedAnimationTarget.ROTATION:
                    transform.localRotation = data;
                    break;
                case EArticulatedAnimationTarget.SCALE:
                    transform.localScale = data;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`EArticulatedAnimationTarget:${target}`));
                    break;
            }
        }
    }

    export type ArticulatedAnimationData = wdCb.Hash<wdCb.Collection<ArticulatedAnimationFrameData>>

    export type ArticulatedAnimationFrameData = {
        time:number,

        targets:wdCb.Collection<ArticulatedAnimationFrameTargetData>
    }

    export type ArticulatedAnimationFrameTargetData = {
        interpolationMethod:EKeyFrameInterpolation,
        target:EArticulatedAnimationTarget,
        data:any
    }
}

