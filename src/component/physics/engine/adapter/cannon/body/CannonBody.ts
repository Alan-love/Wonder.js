/// <reference path="../../../../../../filePath.d.ts"/>
module wd {
    export abstract class CannonBody {
        constructor(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, materialList:CannonMaterialList) {
            this.world = world;
            this.gameObjectList = gameObjectDataList;
            this.materialList = materialList;
        }

        protected world:CANNON.World = null;
        protected materialList:CannonMaterialList = null;
        protected gameObjectList:CannonGameObjectDataList = null;

        public addBody(gameObject:GameObject, data:any) {
            var body = this.createBody(data);

            if(data.children.getCount() > 0){
                this._addCompounds(gameObject, data.children, body);
            }
            else{
                body.addShape(this._createShape(gameObject.getComponent<Collider>(Collider).shape));
            }

            this.afterAddShape(body, data);

            body.material = this._createMaterial(gameObject, data.friction, data.restitution);
            body.position = CannonUtils.convertToCannonVector3(data.position);
            body.quaternion = CannonUtils.convertToCannonQuaternion(data.rotation);

            this.world.addBody(body);

            this.gameObjectList.add(gameObject, body);

            this._bindCollideEvent(body, data.onCollisionStart, data.onContact, data.onCollisionEnd);

            return body;
        }

        protected abstract createBody(data:any):CANNON.Body;

        @virtual
        protected afterAddShape(body:CANNON.Body, data:any):void{
        }

        private _createShape(shape:Shape) {
            var cannonShape = null;

            if (shape instanceof AABBShape) {
                cannonShape = new CANNON.Box(CannonUtils.convertToCannonVector3(shape.halfExtents));
            }
            else if (shape instanceof SphereShape) {
                cannonShape = new CANNON.Sphere(shape.radius);
            }

            return cannonShape;
        }

        private _bindCollideEvent(targetBody:CANNON.Body, onCollisionStart:(collideObject:GameObject) => void, onContact:(collideObject:GameObject) => void, onCollisionEnd:(collideObject:GameObject) => void) {
            var self = this;

            targetBody.addEventListener("collide", (e) => {
                let data = self.gameObjectList.findByBody(e.body),
                    collideObject:GameObject = null;

                if (!data) {
                    return;
                }

                collideObject = data.gameObject;

                onCollisionStart(collideObject);
                onContact(collideObject);
                onCollisionEnd(collideObject);
            });
        }

        private _createMaterial(gameObject:GameObject, friction:number, restitution:number) {
            var material = null,
                currentMaterial = null;

            material = this._getMaterial(gameObject);

            if (material) {
                return material;
            }

            currentMaterial = new CANNON.Material("material");

            this._addMaterial(gameObject, currentMaterial, friction, restitution);

            return currentMaterial;
        }

        private _getMaterial(obj:GameObject) {
            return this.materialList.getMaterial(obj);
        }

        private _addMaterial(gameObject:GameObject, currentMaterial:CANNON.Material, friction:number, restitution:number) {
            this.materialList.add(gameObject, currentMaterial);
            this.materialList.addContactMaterial(this.world, currentMaterial, friction, restitution);
        }

        @require(function (gameObject:GameObject, children:wdCb.Collection<GameObject>, body:CANNON.Body) {
            children.forEach((child:GameObject) => {
                assert(!!child.getComponent(Collider), Log.info.FUNC_MUST_DEFINE("collider component"));
                assert(!!child.getComponent<Collider>(Collider).shape, Log.info.FUNC_SHOULD("create collider.shape"));
            });
        })
        private _addCompounds(gameObject:GameObject, children:wdCb.Collection<GameObject>, body:CANNON.Body){
            var position = gameObject.transform.position,
                rotation = gameObject.transform.rotation;

            children.forEach((child:GameObject) => {
                body.addShape(
                    this._createShape(child.getComponent<Collider>(Collider).shape),
                    CannonUtils.convertToCannonVector3(child.transform.position.copy().sub(position)),
                    CannonUtils.convertToCannonQuaternion(child.transform.rotation.copy().sub(rotation))
                );
            }, this);
        }
    }
}

