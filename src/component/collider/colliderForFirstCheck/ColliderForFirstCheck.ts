module wd {
    export abstract class ColliderForFirstCheck extends Component {
        public entityObject:GameObject;

        public abstract init();
        public abstract update(elapsed:number);

        public clone(){
            return CloneUtils.clone(this);
        }
    }
}

