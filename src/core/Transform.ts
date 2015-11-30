/// <reference path="../filePath.d.ts"/>

/*! referenced from:
 https://github.com/playcanvas/engine
 */
module dy{
    //todo addChildAndSaveTransform?(playCanvas->scene_graphnode.js)
    //todo inherit from Component?
    export class Transform extends Entity{
        public static create(gameObject:GameObject) {
            var obj = new this(gameObject);

            return obj;
        }

        private _localToParentMatrix:Matrix4 = Matrix4.create();
        get localToParentMatrix(){
            //return this._localToParentMatrix;
            if (this.dirtyLocal) {
                this._localToParentMatrix.setTRS(this._localPosition, this._localRotation, this._localScale);

                this.dirtyLocal = false;
                this.dirtyWorld = true;
            }
            return this._localToParentMatrix;
        }

        private _localToWorldMatrix:Matrix4 = null;
        get localToWorldMatrix(){
            var syncList = wdCb.Collection.create<Transform>(),
                current = this;

            while (current !== null) {
                syncList.addChild(current);
                current = current.parent;
            }

            syncList.reverse().forEach((transform:Transform) => {
                transform.sync();
            });

            return this._localToWorldMatrix;
        }
        set localToWorldMatrix(localToWorldMatrix:Matrix4){
            this._localToWorldMatrix = localToWorldMatrix;
        }

        private _parent:Transform = null;
        get parent(){
            return this._parent;
        }
        set parent(parent:Transform){
            if(this._parent){
                this._parent.removeChild(this);
            }

            if(!parent){
                this._parent = null;

                return;
            }

            this._parent = parent;
            this._parent.addChild(this);

            //todo can has multi parent?
        }

        private _position:Vector3 = Vector3.create();
        get position(){
            this._position = this.localToWorldMatrix.getTranslation();

            return this._position;
            //return this.getWorldTransform(this).getTranslation();
        }
        set position(position:Vector3){
            if (this._parent === null) {
                this._localPosition = position.copy();
            }
            else {
                this._localPosition = this._parent.localToWorldMatrix.copy().invert().multiplyVector3(position);
            }

            this.dirtyLocal = true;
        }

        private _rotation:Quaternion = Quaternion.create(0, 0, 0, 1);
        get rotation(){
            this._rotation.setFromMatrix(this.localToWorldMatrix);

            return this._rotation;
        }
        set rotation(rotation:Quaternion){
            if (this._parent === null) {
                this._localRotation = rotation.copy();
            }
            else {
                this._localRotation = this._parent.rotation.copy().invert().multiply(rotation);
            }

            this.dirtyLocal = true;
        }

        private _scale:Vector3 = Vector3.create(1, 1, 1);
        get scale(){
            this._scale = this.localToWorldMatrix.getScale();

            return this._scale;
        }
        set scale(scale:Vector3){
            if (this._parent === null) {
                this._localScale = scale.copy();
            }
            else {
                this._localScale = this._parent.localToWorldMatrix.copy().invert().multiplyVector3(scale);
            }

            this.dirtyLocal = true;
        }

        private _eulerAngles:Vector3 = null;
        get eulerAngles(){
            this._eulerAngles = this.localToWorldMatrix.getEulerAngles();
            return this._eulerAngles;
            //return this._rotation.getEulerAngles();
        }
        set eulerAngles(eulerAngles:Vector3){
            //this._eulerAngles = eulerAngles;
            this._localRotation.setFromEulerAngles(eulerAngles);

            if (this._parent !== null) {
                this._localRotation = this._parent.rotation.copy().invert().multiply(this._localRotation);
            }

            this.dirtyLocal = true;
        }

        private _localPosition:Vector3 = Vector3.create(0, 0, 0);
        get localPosition(){
            return this._localPosition;
            //return this._parent ? this._parent.localToWorldMatrix.copy().inverseOf().multiplyVector3(this._position)
            //return this._parent ? this._position.sub(this._parent.position) : this._position;
        }
        set localPosition(position:Vector3){
            this._localPosition = position.copy();

            this.dirtyLocal = true;
        }

        private _localRotation:Quaternion = Quaternion.create(0, 0, 0, 1);
        get localRotation(){
            return this._localRotation;
            //return this._localRotationWithParent.multiply(this._localRotationWithoutParent);
            //return this._parent ? this._parent.rotation.copy().invert().multiply(this._rotation)
            //return this._parent ? this._rotation.sub(this._parent.rotation) : this._rotation;
        }
        set localRotation(rotation:Quaternion){
            this._localRotation = rotation.copy();

            this.dirtyLocal = true;
        }

        private _localEulerAngles:Vector3 = null;
        get localEulerAngles(){
            //return this.localRotation.getEulerAngles();
            this._localEulerAngles = this._localRotation.getEulerAngles();
            return this._localEulerAngles;
        }
        set localEulerAngles(localEulerAngles:Vector3){
            //this._localEulerAngles = localEulerAngles;
            this._localRotation.setFromEulerAngles(localEulerAngles);

            this.dirtyLocal = true;
        }

        private _localScale:Vector3 = Vector3.create(1, 1, 1);
        get localScale(){
            return this._localScale;
            //return this._parent ? this._parent.localToWorldMatrix.copy().inverseOf().multiplyVector3(this._scale)
            //    : this._scale;
            //return this._parent ? this._scale.sub(this._parent.scale) : this._scale;
        }
        set localScale(scale:Vector3){
            this._localScale = scale.copy();

            this.dirtyLocal = true;
        }

        get up(){
            return this.localToWorldMatrix.getY().normalize();
        }

        get right(){
            return this.localToWorldMatrix.getX().normalize();
        }

        get forward(){
            //todo why scale(-1)?
            //return this.localToWorldMatrix.getZ().normalize();
            return this.localToWorldMatrix.getZ().normalize().scale(-1);
        }

        public dirtyWorld:boolean = null;
        public dirtyLocal:boolean = true;

        private _children:wdCb.Collection<Transform> = wdCb.Collection.create<Transform>();
        private _gameObject:GameObject = null;


        constructor(gameObject:GameObject){
            super();

            this._gameObject = gameObject;
        }

        public addChild(child:Transform){
            this._children.addChild(child);
        }

        public removeChild(child:Transform){
            //this.removeFlag(child);
            this._children.removeChild(child);
        }

        public sync(){
            if (this.dirtyLocal) {
                this._localToParentMatrix.setTRS(this._localPosition, this._localRotation, this._localScale);

                this.dirtyLocal = false;
                this.dirtyWorld = true;
            }

            if (this.dirtyWorld) {
                if (this._parent === null) {
                    this._localToWorldMatrix = this._localToParentMatrix.copy();
                }
                else {
                    this._localToWorldMatrix = this._parent.localToWorldMatrix.copy().multiply(this._localToParentMatrix);
                }

                this.dirtyWorld = false;

                this._children.forEach((child:Transform) => {
                    child.dirtyWorld = true;
                });
            }
        }

        //private _flags:wdCb.Collection<Flag> = wdCb.Collection.create<Flag>();

        public translateLocal(translation:Vector3);
        public translateLocal(x:number, y:number, z:number);


        public translateLocal(arg) {
            var translation = null;

            if(arguments.length === 3){
                translation = Vector3.create(arguments[0], arguments[1], arguments[2]);
            }
            else{
                translation = arguments[0];
            }

            this._localPosition = this._localPosition.add(this._localRotation.multiplyVector3(translation));

            this.dirtyLocal = true;

            return this;
        }

        public translate(translation:Vector3);
        public translate(x:number, y:number, z:number);

        public translate(arg){
            var translation = null;

            if(arguments.length === 3){
                translation = Vector3.create(arguments[0], arguments[1], arguments[2]);
            }
            else{
                translation = arguments[0];
            }

            this.position = translation.add(this.position);

            return this;
        }

        public rotate(eulerAngles:Vector3);
        public rotate(x:number, y:number, z:number);

        public rotate(arg){
            var eulerAngles = null,
                quaternion = Quaternion.create();

            if(arguments.length === 3){
                eulerAngles = Vector3.create(arguments[0], arguments[1], arguments[2]);
            }
            else{
                eulerAngles = arguments[0];
            }

            quaternion.setFromEulerAngles(eulerAngles);

            if (this._parent === null) {
                this._localRotation = quaternion.multiply(this._localRotation);
            }
            else {
                //todo understand why?
                quaternion = this._parent.rotation.copy().invert().multiply(quaternion);
                this._localRotation = quaternion.multiply(this.rotation);
            }

            this.dirtyLocal = true;

            return this;
        }

        public rotateLocal(eulerAngles:Vector3);
        public rotateLocal(x:number, y:number, z:number);

        public rotateLocal(arg){
            var eulerAngles = null,
                quaternion = Quaternion.create();

            if(arguments.length === 3){
                eulerAngles = Vector3.create(arguments[0], arguments[1], arguments[2]);
            }
            else{
                eulerAngles = arguments[0];
            }

            quaternion.setFromEulerAngles(eulerAngles);

            this._localRotation.multiply(quaternion);

            this.dirtyLocal = true;

            return this;
        }

        public rotateAround(angle:number, center:Vector3, axis:Vector3);
        public rotateAround(angle:number, centerX:number, centerY:number, centerZ:number, axisX:number, axisY:number, axisZ:number);

        public rotateAround(arg){
            var angle = null,
                center = null,
                axis = null,
                rot:Quaternion = null,
                dir:Vector3 = null;

            if(arguments.length === 3){
                angle = arguments[0];
                center = arguments[1];
                axis = arguments[2];
            }
            else{
                angle = arguments[0];
                center = Vector3.create(arguments[1], arguments[2], arguments[3]);
                axis = Vector3.create(arguments[4], arguments[5], arguments[6]);
            }

            rot = Quaternion.create().setFromAxisAngle(angle, axis);
            dir = this.position.copy().sub(center); // find current direction relative to center

            dir = rot.multiplyVector3(dir); // rotate the direction

            this.position = center.add(dir); // define new position
            //todo why "this.rotation = this.rotation.multiply(rot)" will cause gameobject rotate direction is around self?
            this.rotation = rot.multiply(this.rotation);

            return this;
        }

        public lookAt(target:Vector3);
        public lookAt(targetX:number, targetY:number, targetZ:number);
        public lookAt(target:Vector3, up:Vector3);
        public lookAt(targetX:number, targetY:number, targetZ:number, upX:number, upY:number, upZ:number);

        public lookAt(args){
            var target = null,
                up = null;

            if(arguments.length === 1){
                target = arguments[0];
                up = Vector3.up;
            }
            else if(arguments.length === 2){
                target = arguments[0];
                up = arguments[1];
            }
            else if(arguments.length === 3){
                target = Vector3.create(arguments[0], arguments[1], arguments[2]);
                up = Vector3.up;
            }
            else{
                target = Vector3.create(arguments[0], arguments[1], arguments[2]);
                up = Vector3.create(arguments[3], arguments[4], arguments[5]);
            }

            this.rotation = Quaternion.create().setFromMatrix(Matrix4.create().setLookAt(this.position, target, up));

            return this;
        }
    }
}
