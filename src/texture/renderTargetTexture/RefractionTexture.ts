module wd {
    //todo refactor
    export class RefractionTexture extends TwoDRenderTargetTexture {
        public static create() {
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        private _plane:Plane = null;

        public init(){
            super.init();

            Director.getInstance().scene.addRenderTargetRenderer(RefractionRenderTargetRenderer.create(this));

            return this;
        }

        public getSamplerName(unit:number){
            return this.getSamplerNameByVariableData(unit, EVariableType.SAMPLER_2D);
        }

        public getPlane(){
            var normalData = null,
                normal = null,
                p = null;

            if(this._plane && !this.geometry.entityObject.transform.dirtyLocal){
                return this._plane;
            }

            Log.error(!(this.geometry instanceof PlaneGeometry), Log.info.FUNC_MUST_BE("geometry", "PlaneGeometry"));

            normalData = this.geometry.geometryData.normals;
            normal = this.geometry.entityObject.transform.localRotation.multiplyVector3(Vector3.create(normalData[0], normalData[1], normalData[2])).normalize();
            p = this.getPosition();

            this._plane = Plane.create(normal.x, normal.y, normal.z, -p.dot(normal));

            return this._plane;
        }
    }
}

