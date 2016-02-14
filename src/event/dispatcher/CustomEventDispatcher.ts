module wd {
    export class CustomEventDispatcher extends EventDispatcher{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public trigger(event:Event):boolean;

        public trigger(event:Event, userData:any):boolean;
        public trigger(target:EntityObject, event:Event):boolean;

        public trigger(target:EntityObject, event:Event, notSetTarget:boolean):boolean;
        public trigger(target:EntityObject, event:Event, userData:any):boolean;

        public trigger(target:EntityObject, event:Event, userData:any, notSetTarget:boolean):boolean;

        public trigger(...args):boolean {
            if(args.length === 1){
                let event = args[0],
                    eventType = event.type;

                return EventHandlerFactory.createEventHandler(eventType)
                    .trigger(event);
            }
            else if(args.length === 2 && (args[0] instanceof Event)){
                let event = args[0],
                    userData = args[1],
                    eventType = event.type;

                return EventHandlerFactory.createEventHandler(eventType)
                    .trigger(event, userData);
            }
            else if((args.length === 2 && args[0] instanceof EntityObject) || (args.length === 3 && JudgeUtils.isBoolean(args[2]))){
                let target = args[0],
                    event = args[1],
                    notSetTarget = args[2] === void 0 ? false : args[2],
                    eventType = event.type;

                return EventHandlerFactory.createEventHandler(eventType)
                    .trigger(target, event, notSetTarget);
            }
            else if(args.length === 3 || args.length === 4){
                let target = args[0],
                    event = args[1],
                    userData = args[2],
                    notSetTarget = args[3] === void 0 ? false : args[3],
                    eventType = event.type;

                return EventHandlerFactory.createEventHandler(eventType)
                    .trigger(target, event, userData, notSetTarget);
            }
        }

        /**
         * transfer event up
         * @param target
         * @param eventObject
         */
        public emit(target:EntityObject, eventObject:Event, userData?:any) {
            var isStopPropagation = false;

            if(!target){
                return;
            }

            eventObject.phase = EEventPhase.EMIT;
            eventObject.target = target;

            do{
                isStopPropagation = this._triggerWithUserData(target, eventObject, userData, true);

                if(isStopPropagation){
                    break;
                }
                target = target.bubbleParent;
            }while(target);
        }

        /**
         * transfer event down
         * @param target
         * @param eventObject
         */
        public broadcast(target:EntityObject, eventObject:Event, userData?:any) {
            var self = this;
            var iterator = (obj:EntityObject) => {
                var children:wdCb.Collection<EntityObject> = obj.getChildren();

                if(children.getCount() === 0){
                    return;
                }

                children.forEach((child:EntityObject) => {
                    self._triggerWithUserData(child, eventObject, userData, true);

                    iterator(child);
                });
            }

            if(!target){
                return;
            }

            eventObject.phase = EEventPhase.BROADCAST;
            eventObject.target = target;

            this._triggerWithUserData(target, eventObject, userData, true);

            iterator(target);
        }

        private _triggerWithUserData(target, event, userData, notSetTarget){
            return userData ? this.trigger(target, event, userData, notSetTarget)
                : this.trigger(target, event, notSetTarget);
        }
    }
}

