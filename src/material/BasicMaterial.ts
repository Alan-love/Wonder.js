module wd{
    export class BasicMaterial extends StandardBasicMaterial{
        public static create() {
            var obj = new this();

            return obj;
        }

        public clone(){
            return CloneHelper.clone(this);
        }
    }
}

