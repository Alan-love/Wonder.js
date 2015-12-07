/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class Collider extends Component {
        public type:string = ABSTRACT_ATTRIBUTE;

        public boundingRegion:BoundingRegion = null;

        public abstract createBoundingRegion();
        public abstract buildBoundingRegion();

        public init(){
            this.boundingRegion = this.createBoundingRegion();
            this.boundingRegion.init();

            this.buildBoundingRegion();
        }

        public update(time:number){
            this.boundingRegion.update();
        }

        @require(function(collider:Collider){
            assert(collider instanceof Collider, Log.info.FUNC_SHOULD("target", "be collider"))
        })
        public isIntersectWith(collider:Collider){
            if(collider instanceof BoxCollider){
                return this.boundingRegion.isIntersectWithBox(collider.boundingRegion);
            }
            else if(collider instanceof SphereCollider){
                return this.boundingRegion.isIntersectWithSphere(collider.boundingRegion);
            }
            else{
                Log.warn(Log.info.FUNC_NOT_SUPPORT(`${this.type} collider`, `intersect with ${collider.type} collider`));
            }
        }

        public getCollideObjects(checkTargetList:wdCb.Collection<GameObject>):wdCb.Collection<GameObject>{
            var self = this,
                result = wdCb.Collection.create<GameObject>();

            checkTargetList.forEach((gameObject) => {
                if(self._isSelf(gameObject)){
                    return;
                }

                if(self.isIntersectWith(gameObject.getComponent(Collider))){
                    result.addChild(gameObject);
                }
            });

            return result;
        }

        private _isSelf(gameObject:GameObject){
            return this.gameObject.uid === gameObject.uid;
        }
    }
}

