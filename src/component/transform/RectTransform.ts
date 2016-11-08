module wd{
    export class RectTransform extends Transform{
        public static create() {
            var obj = new this();

            return obj;
        }

        public entityObject:UIObject;

        private _rotationMatrix:Matrix3 = null;
        @cacheGetter(function(){
            return this._rotationMatrixCache !== null;
        }, function(){
            return this._rotationMatrixCache;
        }, function(result){
            this._rotationMatrixCache = result;
        })
        get rotationMatrix(){
            return this.getMatrix<Matrix3>("syncRotation", "_rotationMatrix");
        }

        private _localPositionAndScaleMatrix:Matrix3 = Matrix3.create();
        @cacheGetter(function(){
            return this._localPositionAndScaleMatrixCache !== null;
        }, function(){
            return this._localPositionAndScaleMatrixCache;
        }, function(result){
            this._localPositionAndScaleMatrixCache = result;
        })
        get localPositionAndScaleMatrix(){
            return this.getMatrix<Matrix3>("syncPositionAndScale", "_localPositionAndScaleMatrix");
        }

        //todo optimize:position, rotation, ... add cache

        private _position:Vector2 = Vector2.create();
        @cloneAttributeAsCloneable()
        get position(){
            this._position = this.localPositionAndScaleMatrix.getTranslation();

            return this._position;
        }
        set position(position:Vector2){
            if (this.p_parent === null) {
                this._localPosition = position;
            }
            else {
                this._localPosition = this.p_parent.localPositionAndScaleMatrix.clone().invert().multiplyPoint(position);
            }

            this.isTranslate = true;
            this._markRendererDirty();
        }

        private _rotation:number = 0;
        @cloneAttributeAsBasicType()
        get rotation(){
            this._rotation = this.rotationMatrix.getRotation();

            return this._rotation;
        }
        set rotation(angle:number){
            this.resetRotation();
            this.rotate(angle);

            this.dirtyRotation = true;
            this.isRotate = true;
            this._markRendererDirty();
        }

        private _scale:Vector2 = Vector2.create(1, 1);
        @cloneAttributeAsCloneable()
        get scale(){
            this._scale = this.localPositionAndScaleMatrix.getScale();

            return this._scale;
        }
        set scale(scale:Vector2){
            if (this.p_parent === null) {
                this._localScale = scale;
            }
            else {
                this._localScale = this.p_parent.localPositionAndScaleMatrix.clone().invert().multiplyVector2(scale);
            }

            this.isScale = true;
            this._markRendererDirty();
        }

        //todo add skew attri


        private _localPosition:Vector2 = Vector2.create(0, 0);
        @cloneAttributeAsCloneable()
        get localPosition(){
            return this._localPosition;
        }
        set localPosition(position:Vector2){
            this._localPosition = position;

            this.isLocalTranslate = true;
            this._markRendererDirty();
        }

        private _localScale:Vector2 = Vector2.create(1, 1);
        @cloneAttributeAsCloneable()
        get localScale(){
            return this._localScale;
        }
        set localScale(scale:Vector2){
            this._localScale = scale;

            this.isLocalScale = true;
            this._markRendererDirty();
        }

        //todo extract RootRectTransform?

        private _anchorX:Vector2 = Vector2.create(0.5, 0.5);
        @requireSetter(function(anchorX:Vector2){
            assert(anchorX.x <= anchorX.y, Log.info.FUNC_SHOULD("minX", "<= maxY"));
            assert(anchorX.x >= 0 && anchorX.x <= 1, Log.info.FUNC_SHOULD("minX", ">= 0 && <= 1"));
            assert(anchorX.y >= 0 && anchorX.y <= 1, Log.info.FUNC_SHOULD("maxX", ">= 0 && <= 1"));
        })
        @cloneAttributeAsCloneable()
        get anchorX(){
            return this._anchorX;
        }
        set anchorX(anchorX:Vector2){
            var parentWidth = null;

            if(this._anchorX.isEqual(anchorX)){
                return;
            }

            this._anchorX = anchorX;

            if(anchorX.x === anchorX.y){
                let widthFromAnchorToPosition = (anchorX.x - 0.5) * this._getParentWidth();

                this.position = Vector2.create(this._getParentPosition().x + widthFromAnchorToPosition, this.position.y);

                return;
            }

            parentWidth = this._getParentWidth();

            this.position = Vector2.create(this._getParentPosition().x + (anchorX.x + anchorX.y - 1) / 2 * parentWidth, this.position.y);

            this.width = parentWidth / this._getParentScale().x * (anchorX.y - anchorX.x) * this.scale.x;
        }

        private _anchorY:Vector2 = Vector2.create(0.5, 0.5);
        @requireSetter(function(anchorY:Vector2){
            assert(anchorY.x <= anchorY.y, Log.info.FUNC_SHOULD("minY", "<= maxY"));
            assert(anchorY.x >= 0 && anchorY.x <= 1, Log.info.FUNC_SHOULD("minY", ">= 0 && <= 1"));
            assert(anchorY.y >= 0 && anchorY.y <= 1, Log.info.FUNC_SHOULD("maxY", ">= 0 && <= 1"));
        })
        @cloneAttributeAsCloneable()
        get anchorY(){
            return this._anchorY;
        }
        set anchorY(anchorY:Vector2){
            var parentHeight = null;

            if(this._anchorY.isEqual(anchorY)){
                return;
            }

            this._anchorY = anchorY;

            if(anchorY.x === anchorY.y){
                let heightFromAnchorToPosition = (anchorY.x - 0.5) * this._getParentHeight();

                this.position = Vector2.create(this.position.x, this._getParentPosition().y + heightFromAnchorToPosition);

                return;
            }

            parentHeight = this._getParentHeight();

            this.position = Vector2.create(this.position.x, this._getParentPosition().y + (anchorY.x + anchorY.y - 1) / 2 * parentHeight);

            this.height = parentHeight / this._getParentScale().y * (anchorY.y - anchorY.x) * this.scale.y;
        }

        private _width:number = null;
        @cloneAttributeAsBasicType()
        get width(){
            return this._width * this.scale.x;
        }
        set width(width:number){
            if(this._width === width){
                return;
            }

            this._width = width;

            if(this.entityObject){
                EventManager.trigger(this.entityObject, CustomEvent.create(<any>EEngineEvent.UI_WIDTH_CHANGE));
            }
        }

        private _height:number = null;
        @cloneAttributeAsBasicType()
        get height(){
            return this._height * this.scale.y;
        }
        set height(height:number){
            if(this._height === height) {
                return;
            }

            this._height = height;

            if(this.entityObject){
                EventManager.trigger(this.entityObject, CustomEvent.create(<any>EEngineEvent.UI_HEIGHT_CHANGE));
            }
        }


        public dirtyRotation:boolean = true;
        public dirtyPositionAndScale:boolean = true;
        @cloneAttributeAsCloneable()
        public pivot:Vector2 = Vector2.create(0, 0);
        @cloneAttributeAsBasicType()
        public zIndex:number = 1;

        protected p_parent:RectTransform;
        protected children:wdCb.Collection<RectTransform>;

        private _localRotationMatrix:Matrix3 = Matrix3.create();
        private _localToParentMatrix:Matrix3 = Matrix3.create();
        private _rotationMatrixCache:Matrix3 = null;
        private _localPositionAndScaleMatrixCache:Matrix3 = null;

        public syncRotation(){
            if(this.dirtyRotation){
                if (this.p_parent === null) {
                    this._rotationMatrix = this._localRotationMatrix.clone();
                }
                else {
                    this._rotationMatrix = this.p_parent.rotationMatrix.clone().multiply(this._localRotationMatrix);
                }

                this.children.forEach((child:RectTransform) => {
                    child.dirtyRotation = true;
                });
            }
        }

        public syncPositionAndScale(){
            if (this.dirtyLocal) {
                this._localToParentMatrix.setTS(this._localPosition, this._localScale);

                this.dirtyLocal = false;
                this.dirtyPositionAndScale = true;
            }

            if (this.dirtyPositionAndScale) {
                if (this.p_parent === null) {
                    this._localPositionAndScaleMatrix = this._localToParentMatrix.clone();
                }
                else {
                    this._localPositionAndScaleMatrix = this.p_parent.localPositionAndScaleMatrix.clone().multiply(this._localToParentMatrix);
                }

                this.dirtyLocal = false;

                this.children.forEach((child:RectTransform) => {
                    child.dirtyPositionAndScale = true;
                });
            }
        }

        public translate(translation:Vector2);
        public translate(x:number, y:number);

        public translate(...args){
            var translation = null;

            if(args.length === 2){
                translation = Vector2.create(args[0], args[1]);
            }
            else{
                translation = args[0];
            }

            this.position = translation.add(this.position);

            return this;
        }

        /*!
        if pivot is not the center point, the actual position will change, but the "position" attr will not change now!

        //todo change "position" when rotate to get the actual position
         */

        public rotate(angle:number){
            var position = this.position;

            this.rotateAround(angle, position.x + this.pivot.x, position.y - this.pivot.y);

            this.dirtyRotation = true;
            this.isRotate = true;

            return this;
        }

        public rotateAround(angle:number, center:Vector2);
        public rotateAround(angle:number, centerX:number, centerY:number);

        public rotateAround(...args){
            var angle = null,
                center = null,
                position = null,
                x = null,
                y = null;

            if(args.length === 2){
                angle = args[0];
                center = args[1];
            }
            else{
                angle = args[0];
                center = Vector2.create(args[1], args[2]);
            }

            x = center.x;
            y = center.y;

            this._translateInRotationMatrix(x, y);
            this._rotateAroundCanvasOriginPoint(angle);
            this._translateInRotationMatrix(-x, -y);

            return this;
        }

        private _translateInRotationMatrix(x:number, y:number){
            this._localRotationMatrix.translate(x, y);

            return this;
        }

        public resetPosition(){
            this.position = Vector2.create(0, 0);
        }

        public resetScale(){
            this.scale = Vector2.create(1, 1);
        }

        public resetRotation(){
            this._localRotationMatrix.setIdentity();
        }

        /*!
         //todo add skew to implement rotate around x/y/z axis for 3d rotate?

         can refer to http://www.senocular.com/flash/tutorials/transformmatrix/
         */

        protected handleWhenSetTransformState(transformState:ETransformState):void{
            var eventName:string = null;

            switch (transformState){
                case ETransformState.ISTRANSLATE:
                    eventName = <any>EEngineEvent.TRANSFORM_TRANSLATE;
                    break;
                case ETransformState.ISROTATE:
                    eventName = <any>EEngineEvent.TRANSFORM_ROTATE;
                    break;
                case ETransformState.ISSCALE:
                    eventName = <any>EEngineEvent.TRANSFORM_SCALE;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNKNOW(`transformState:${transformState}`));
                    break;
            }

            EventManager.trigger(this.entityObject, CustomEvent.create(eventName));
        }

        protected clearCache(){
            this._rotationMatrixCache = null;
            this._localPositionAndScaleMatrixCache = null;
        }

        private _rotateAroundCanvasOriginPoint(angle:number){
            this._localRotationMatrix.rotate(angle);

            this.dirtyRotation = true;

            return this;
        }

        private _getParentWidth(){
            if(this.p_parent === null){
                return DeviceManager.getInstance().view.width;
            }

            return this.p_parent.width;
        }

        private _getParentHeight(){
            if(this.p_parent === null){
                return DeviceManager.getInstance().view.height;
            }

            return this.p_parent.height;
        }

        private _getParentPosition(){
            if(this.p_parent === null){
                let view = DeviceManager.getInstance().view;

                return Vector2.create(view.width / 2, view.height / 2);
            }

            return this.p_parent.position;
        }

        private _getParentScale(){
            if(this.p_parent === null){
                return Vector2.create(1, 1);
            }

            return this.p_parent.scale;
        }

        private _markRendererDirty(){
            var renderer = UIRendererUtils.getUIRenderer(this.entityObject);

            if(!renderer){
                return;
            }

            renderer.dirty = true;
        }
    }
}

