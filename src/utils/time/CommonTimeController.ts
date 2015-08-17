/// <reference path="../../definitions.d.ts"/>
module dy {
    export class CommonTimeController extends TimeController {
        public static create() {
            var obj = new this();

            return obj;
        }

        protected getNow(){
            if(Director.getInstance().isTimeChange){
                return Director.getInstance().elapsed;
            }

            return window.performance.now();
        }
    }
}
