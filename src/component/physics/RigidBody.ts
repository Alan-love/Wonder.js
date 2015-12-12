/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class RigidBody extends Component {
        private _friction:number = 0;
        @operateBodyDataGetterAndSetter("Friction")
        get friction(){
            return this._friction;
        }
        set friction(friction:number){
            this._friction = friction;
        }

        private _restitution:number = 0;
        @operateBodyDataGetterAndSetter("Restitution")
        get restitution(){
            return this._restitution;
        }
        set restitution(restitution:number){
            this._restitution = restitution;
        }

        private _children:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();
        set children(children:wdCb.Collection<GameObject>|Array<GameObject>){
            if(JudgeUtils.isArray(children)){
                let arr = <Array<GameObject>>children;

                this._children = wdCb.Collection.create<GameObject>(arr);
            }
            else{
                let list = <wdCb.Collection<GameObject>>children;

                this._children = list;
            }

            this._children.forEach((child:GameObject) => {
                child.isRigidbodyChild = true;
            });
        }

        public init() {
            var self = this;

            /*!
            should init after its and its children's collider component init
             */
            EventManager.on(<any>EngineEvent.AFTER_INIT, () => {
                self.addBody();
            });
        }

        public dispose(){
            this._children.forEach((child:GameObject) => {
                child.isRigidbodyChild = false;
            });

            this.getPhysicsEngineAdapter().removeGameObject(this.gameObject);
        }

        protected abstract addBody();

        protected isPhysicsEngineAdapterExist(){
            return !!Director.getInstance().scene && !!Director.getInstance().scene.physicsEngineAdapter;
        }

        @require(function () {
            assert(!!this.gameObject.getComponent(Collider), Log.info.FUNC_MUST_DEFINE("collider component when add rigid body component"));
            assert(!!this.gameObject.getComponent(Collider).shape, Log.info.FUNC_SHOULD("create collider.shape before adding rigid body component"));
        })
        protected addBodyToPhysicsEngine(method:string, data:any = {}) {
            var engineAdapter:IPhysicsEngineAdapter = this.getPhysicsEngineAdapter(),
                position = this.gameObject.transform.position,
                rotation = this.gameObject.transform.rotation,
                shape = this.gameObject.getComponent<Collider>(Collider).shape;

            engineAdapter[method](
                this.gameObject, shape, wdCb.ExtendUtils.extend({
                    position: position,
                    rotation: rotation,

                    children: this._children,

                    onContact: wdCb.FunctionUtils.bind(this, this._onContact),
                    onCollisionStart: wdCb.FunctionUtils.bind(this, this._onCollisionStart),
                    onCollisionEnd: wdCb.FunctionUtils.bind(this, this._onCollisionEnd),

                    friction: this.friction,
                    restitution: this.restitution
                }, data)
            );
        }

        protected getPhysicsEngineAdapter() {
            return Director.getInstance().scene.physicsEngineAdapter;
        }

        private _onContact(collideObject:GameObject) {
            this.gameObject.execScript("onContact", wdCb.Collection.create([collideObject]));
        }

        private _onCollisionStart(collideObject:GameObject) {
            this.gameObject.execScript("onCollisionStart", wdCb.Collection.create([collideObject]));
        }

        private _onCollisionEnd() {
            this.gameObject.execScript("onCollisionEnd");
        }
    }
}

