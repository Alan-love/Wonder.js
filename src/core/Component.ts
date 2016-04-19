module wd{
    export abstract class Component extends Entity{
        @cloneAttributeAsBasicType()
        public entityObject:EntityObject = null;

        @virtual
        public init(){
        }

        @virtual
        public dispose(){
        }

        //todo to be abstract method
        //public abstract clone():Component;
        @virtual
        public clone(...datas):any{
            //Log.error(true, Log.info.FUNC_SHOULD("implement clone method"));
            //
            //return null;

            return CloneHelper.clone(this);
        }

        public get transform():Transform {
            if(!this.entityObject) {
                return null;
            }

            return this.entityObject.transform;
        }

        //todo test
        @virtual
        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            if(isShareComponent){
                return;
            }

            if(this.entityObject) {
                this.entityObject.removeComponent(this);
            }
            this.entityObject = entityObject;
        }

        @virtual
        public removeFromObject(entityObject:EntityObject){
        }
    }
}
