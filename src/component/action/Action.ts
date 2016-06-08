module wd{
    export abstract class Action extends Component{
        get isStart() {
            return !this.isStop;
        }

        get isStop() {
            return Log.error(true, Log.info.ABSTRACT_ATTRIBUTE);
        }

        get isPause() {
            return Log.error(true, Log.info.ABSTRACT_ATTRIBUTE);
        }

        protected p_target:EntityObject = null;
        get target(){
            return this.p_target;
        }
        set target(target:EntityObject){
            this.p_target = target;
        }

        public isFinish:boolean = false;

        public abstract update(elapsedTime:number);
        public abstract start();
        public abstract stop();
        public abstract pause();
        public abstract resume();
        public abstract reverse();

        public clone():Action{
            return CloneUtils.clone(this);
        }

        public reset() {
            this.isFinish = false;
        }


        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            var engine:ActionEngine = ActionEngine.getInstance();

            super.addToObject(entityObject, isShareComponent);

            //todo not set target?use entityObject instead?
            this.target = entityObject;

            if(!engine.hasChild(this)){
                engine.addChild(this);
            }
        }

        public removeFromObject(entityObject:EntityObject){
            super.removeFromObject(entityObject);

            ActionEngine.getInstance().removeChild(this);
        }

        public init(){
            this.start();
        }

        protected finish(){
            this.isFinish = true;
            this.stop();
        }
    }
}
