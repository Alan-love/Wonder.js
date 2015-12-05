/// <reference path="../../filePath.d.ts"/>
module wd {
    export class BoxBoundingRegion extends BoundingRegion{
        public static create(gameObject:GameObject) {
            var obj = new this(gameObject);

            return obj;
        }

        public shape:AABBShape = null;

        private _originShape:AABBShape = null;
        private _debugBox:GameObject = null;

        public init(){
            //todo add OBBShape
            this.shape = AABBShape.create();
        }

        @ensure(function(returnValue, center:Vector3, halfExtents:Vector3){
            assert(this._isBuildUserSpecifyBoundingRegion(center, halfExtents) ? this.shape.center === center : this.shape.center.isZero(), Log.info.FUNC_SHOULD_NOT("transform shape when build"));
        })
        public build(center:Vector3, halfExtents:Vector3){
            if(this._isBuildUserSpecifyBoundingRegion(center, halfExtents)){
                this.shape.setFromCenterAndHalfExtents(center, halfExtents);
            }
            else{
                this.shape.setFromPoints(this.gameObject.getComponent<Geometry>(Geometry).geometryData.vertices);
            }

            this._originShape = this.shape.copy();

            if(DebugConfig.debugCollision){
                this._debugBox = this._buildDebugBoxFromShape(this.shape);
                Director.getInstance().scene.addChild(this._debugBox);
            }
        }

        public update(){
            var transform = this.gameObject.transform;

            if(!transform.isRotate && !transform.isTranslate && !transform.isScale){
                return;
            }

            if(transform.isRotate){
                this.shape.setFromObject(this.gameObject);
            }
            else{
                this.shape.setFromTransformedAABB(this._originShape, transform.localToWorldMatrix);
            }

            if(DebugConfig.debugCollision){
                this._updateDebugBoxFromShape(this.shape);
            }
        }

        public isIntersectWithBox(boundingRegion:BoxBoundingRegion){
            return this.shape.isIntersectWithBox(boundingRegion.shape);
        }

        private _isBuildUserSpecifyBoundingRegion(center:Vector3, halfExtents:Vector3){
            return center && halfExtents;
        }

        private _buildDebugBoxFromShape(shape:AABBShape){
            var material = wd.BasicMaterial.create();
            material.color = wd.Color.create("rgb(255,0,0)");

            var geometry = wd.CustomGeometry.create();
            geometry.material = material;
            this._setDebugBoxGeometryVertices(geometry, shape.halfExtents);
            geometry.indices = [
                0,1,1,2,2,3,3,0,
                4,5,5,6,6,7,7,4,
                0,4,1,5,2,6,3,7
            ];
            //todo geometry add buffer type table

            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            var renderer = wd.MeshRenderer.create();
            renderer.drawMode = DrawMode.LINES;

            gameObject.addComponent(renderer);

            gameObject.transform.translate(shape.center);

            gameObject.init();

            return gameObject;
        }

        @require(function(shape:AABBShape){
            assert(this._debugBox, Log.info.FUNC_SHOULD("build debugBox"));
        })
        private _updateDebugBoxFromShape(shape:AABBShape){
            var geometry = this._debugBox.getComponent<CustomGeometry>(CustomGeometry);

            this._setDebugBoxGeometryVertices(geometry, shape.halfExtents);

            this._debugBox.transform.position = shape.center;
        }

        @require(function(geometry:CustomGeometry, halfExtents:Vector3){
            assert(halfExtents && !halfExtents.isZero(), Log.info.FUNC_SHOULD_NOT("halfExtents", "be zero"));
        })
        private _setDebugBoxGeometryVertices(geometry:CustomGeometry, halfExtents:Vector3){
            var x = halfExtents.x,
                y = halfExtents.y,
                z = halfExtents.z;

            geometry.vertices = [
                -x, -y, -z, -x, -y, z, x, -y, z, x, -y, -z,
                -x, y, -z, -x, y, z, x, y, z, x, y, -z
            ];
        }
    }
}

