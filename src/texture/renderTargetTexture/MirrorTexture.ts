/// <reference path="../../definitions.d.ts"/>
module dy {
    export class MirrorTexture extends TwoDRenderTargetTexture {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _plane:Plane = null;

        public init(){
            super.init();

            Director.getInstance().stage.addRenderTargetRenderer(MirrorRenderTargetRenderer.create(this));

            return this;
        }

        public getPlane(){
            var normalData = null,
                normal = null,
                p = null;

            if(this._plane && !this.geometry.gameObject.transform.dirtyLocal){
                return this._plane;
            }

            dyCb.Log.error(!(this.geometry instanceof PlaneGeometry), dyCb.Log.info.FUNC_MUST_BE("geometry", "PlaneGeometry"));

            normalData = this.geometry.normals.data;
            normal = this.geometry.gameObject.transform.localRotation.multiplyVector3(Vector3.create(normalData[0], normalData[1], normalData[2])).normalize();
            p = this.getPosition();

            this._plane = Plane.create(normal.x, normal.y, normal.z, -p.dot(normal));

            return this._plane;
        }
    }
}

