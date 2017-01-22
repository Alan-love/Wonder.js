module wd{
    export class CollisionDetector{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _collisionTable:wdCb.Hash<CollisionDataInTable> = wdCb.Hash.create<CollisionDataInTable>();
        private _lastCollisionTable:wdCb.Hash<CollisionDataInTable> = wdCb.Hash.create<CollisionDataInTable>();

        public update(elapsed:number){
            //todo optimize:use worker
            var scene = Director.getInstance().scene.gameObjectScene,
                checkTargetList = scene.filter((gameObjectScene:GameObject) => {
                    return gameObjectScene.hasComponent(Collider)
                        || (JudgeUtils.isSpacePartitionObject(gameObjectScene) && gameObjectScene.getSpacePartition().isCollideEnable)
                }),
                self = this;

            if(checkTargetList.getCount() === 0){
                return;
            }

            this._clearCollisionTable();

            checkTargetList.forEach((gameObjectScene:GameObject) => {
                if(ClassUtils.hasComponent(gameObjectScene, "RigidBody")){
                    return;
                }

                self._recordCollideObjects(gameObjectScene, checkTargetList);
            });

            this._triggerCollisionEvent();
        }

        @require(function(sourceObject:GameObject, checkTargetList:wdCb.Collection<GameObject>){
            checkTargetList.forEach((targetObject:GameObject) => {
                assert(targetObject instanceof GameObject, Log.info.FUNC_SHOULD("targetObject", "be GameObject"));
            });
        })
        private _recordCollideObjects(sourceObject:GameObject, checkTargetList:wdCb.Collection<GameObject>){
            var self = this;

            if(JudgeUtils.isSpacePartitionObject(sourceObject)){
                let sourceSpacePartition:any = sourceObject.getSpacePartition();

                checkTargetList.forEach((targetObject:GameObject) => {
                    if(JudgeUtils.isSelf(sourceObject, targetObject)){
                        return;
                    }

                    if(JudgeUtils.isSpacePartitionObject(targetObject)){
                        self._handleCollisionBetweenSpacePartitionAndSpacePartition(targetObject.getSpacePartition(), sourceSpacePartition);
                    }
                    else{
                        self._handleCollisionBetweenGameObjectAndSpacePartition(targetObject.getComponent<Collider>(Collider), sourceSpacePartition);
                    }
                });

                return;
            }

            let sourceObjectCollider = sourceObject.getComponent<Collider>(Collider);

            if(!sourceObjectCollider.enable){
                return;
            }

            checkTargetList.forEach((targetObject:GameObject) => {
                if(JudgeUtils.isSelf(sourceObject, targetObject)){
                    return;
                }

                if(JudgeUtils.isSpacePartitionObject(targetObject)){
                    self._handleCollisionBetweenGameObjectAndSpacePartition(sourceObjectCollider, targetObject.getSpacePartition());
                }
                else{
                    self._handleCollisionBetweenGameObjectAndGameObject(sourceObjectCollider, targetObject);
                }
            });
        }

        @require(function(sourceObject:GameObject, sourceCollider:Collider, targetObject:GameObject){
            assert(sourceObject instanceof GameObject && targetObject instanceof GameObject, Log.info.FUNC_SHOULD("sourceObject and targetObject", "be GameObject"));
        })
        private _isGameObjectCollideWithGameObject(sourceObject:GameObject, sourceCollider:Collider, targetObject:GameObject){
            return !(this._isNotTransform(sourceObject) && this._isNotTransform(targetObject) && !sourceObject.hasTag(<any>ECollisionTag.COLLIDED))
                && sourceCollider.isCollide(targetObject);
        }

        private _clearCollisionTable(){
            this._collisionTable.removeAllChildren();
        }

        private _isCollidedInTable(sourceObject:GameObject, targetObject:GameObject){
            var table = this._collisionTable,
                sourceKey = String(sourceObject.uid),
                targetKey = String(targetObject.uid);

            return table.hasChild(sourceKey) && table.getChild(sourceKey).targetObjectMap.hasChild(targetKey);
        }

        private _recordToTable(sourceObject:GameObject, targetObject:GameObject){
            var table = this._collisionTable,
                sourceKey = String(sourceObject.uid),
                targetKey = String(targetObject.uid);

            if(!table.hasChild(sourceKey)){
                let targetObjectMap = wdCb.Hash.create();

                targetObjectMap.addChild(targetKey, targetObject);

                table.addChild(
                    sourceKey,
                    {
                        sourceObject: sourceObject,
                        targetObjectMap: targetObjectMap
                    }
                );

                return;
            }

            table.getChild(sourceKey).targetObjectMap.addChild(targetKey, targetObject);
        }

        private _handleCollisionBetweenGameObjectAndSpacePartition(targetObjectCollider:Collider, spacePartition:any) {
            var targetObject = targetObjectCollider.entityObject,
                self = this;

            if(!targetObjectCollider.enable){
                return;
            }

            spacePartition.getCollideObjects(targetObjectCollider.shape).forEach((sourceObject:GameObject) => {
                var sourceCollider = sourceObject.getComponent<Collider>(Collider);

                if(!sourceCollider.enable || self._isCollidedInTable(sourceObject, targetObject)){
                    return;
                }

                if(self._isGameObjectCollideWithGameObject(sourceObject, sourceCollider, targetObject)){
                    self._recordToTable(sourceObject, targetObject);
                    self._recordToTable(targetObject, sourceObject);
                }
            });
        }

        private _handleCollisionBetweenSpacePartitionAndSpacePartition(sourceSpacePartition:any, targetSpacePartition:any){
            sourceSpacePartition.getChildren()
                .forEach((sourceObject:GameObject) => {
                    var sourceCollider = sourceObject.getComponent<Collider>(Collider);

                    if(!sourceCollider.enable){
                        return;
                    }

                    this._handleCollisionBetweenGameObjectAndSpacePartition(sourceCollider, targetSpacePartition);
                }, this);
        }

        private _handleCollisionBetweenGameObjectAndGameObject(sourceObjectCollider:Collider, targetObject:GameObject) {
            var sourceObject = sourceObjectCollider.entityObject;

            if(!targetObject.getComponent<Collider>(Collider).enable || this._isCollidedInTable(sourceObject, targetObject)){
                return;
            }

            if(this._isGameObjectCollideWithGameObject(sourceObject, sourceObjectCollider, targetObject)){
                this._recordToTable(sourceObject, targetObject);
                this._recordToTable(targetObject, sourceObject);
            }
        }

        private _isCollisionStart(gameObjectScene:GameObject){
            return !gameObjectScene.hasTag(<any>ECollisionTag.COLLIDED);
        }

        private _triggerCollisionEventOfCollideObjectWhichHasRigidBody(collideObjects:wdCb.Collection<GameObject>, currentGameObject:GameObject, eventList:Array<string>){
            if(!ClassUtils.hasComponent(currentGameObject, "RigidBody")){
                return;
            }

            collideObjects.filter((gameObjectScene:GameObject) => {
                    return ClassUtils.hasComponent(gameObjectScene, "RigidBody");
                })
                .forEach((collideObject:GameObject) => {
                    for(let eventName of eventList){
                        ScriptComponentContainer.getInstance().execEntityObjectScriptWithData(collideObject, eventName, wdCb.Collection.create([currentGameObject]));
                    }
                });
        }

        private _triggerCollisionEvent(){
            this._collisionTable.forEach(({sourceObject, targetObjectMap}) => {
                var targetObjects:wdCb.Collection<GameObject> = targetObjectMap.toCollection();

                if(this._isCollisionStart(sourceObject)){

                    ScriptComponentContainer.getInstance().execEntityObjectScriptWithData(sourceObject, "onCollisionStart", targetObjects);
                    ScriptComponentContainer.getInstance().execEntityObjectScriptWithData(sourceObject, "onContact", targetObjects);

                    this._triggerCollisionEventOfCollideObjectWhichHasRigidBody(targetObjects, sourceObject, ["onCollisionStart", "onContact"]);
                }
                else{
                    ScriptComponentContainer.getInstance().execEntityObjectScriptWithData(sourceObject, "onContact", targetObjects);
                    this._triggerCollisionEventOfCollideObjectWhichHasRigidBody(targetObjects, sourceObject, ["onContact"]);
                }

                if(!sourceObject.hasTag(<any>ECollisionTag.COLLIDED)){
                    sourceObject.addTag(<any>ECollisionTag.COLLIDED);
                }
            }, this);

            this._triggerCollisionEndEvent();

            this._lastCollisionTable = this._collisionTable.clone();
        }

        private _triggerCollisionEndEvent(){
            var table = this._collisionTable;

            this._lastCollisionTable.forEach(({sourceObject, targetObjectMap}) => {
                if(!table.hasChild(String(sourceObject.uid))){
                    ScriptComponentContainer.getInstance().execEntityObjectScript(sourceObject, "onCollisionEnd");
                    this._triggerCollisionEventOfCollideObjectWhichHasRigidBody(targetObjectMap.toCollection(), sourceObject, ["onCollisionEnd"]);

                    sourceObject.removeTag(<any>ECollisionTag.COLLIDED);
                }
            });
        }

        private _isNotTransform(gameObjectScene:GameObject){
            return !gameObjectScene.transform.isTransform;
        }
    }

    enum ECollisionTag{
        COLLIDED = <any>"COLLIDED"
    }

    export type CollisionDataInTable = {
        sourceObject:GameObject;
        targetObjectMap:wdCb.Hash<GameObject>;
    }
}
