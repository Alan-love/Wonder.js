/// <reference path="../../filePath.d.ts"/>
module wd {
    export class CustomEventBinder extends EventBinder{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public on(eventName:EventName|string, handler:Function):void;

        public on(eventName:EventName|string, handler:Function, priority:number):void;
        public on(target:EntityObject, eventName:EventName|string, handler:Function):void;

        public on(target:EntityObject, eventName:EventName|string, handler:Function, priority:number):void;

        @require(function(...args){
            if(args.length === 1){
            }
            else if(args.length === 2){
                let eventName = args[0];

                this._checkEventSeparator(eventName);
            }
            else if(args.length === 3 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                this._checkEventSeparator(eventName);
            }
            else if(args.length === 3 && args[0] instanceof EntityObject){
                let eventName = args[1];

                this._checkEventSeparator(eventName);
            }
            else if(args.length === 4) {
                let eventName = args[1];

                this._checkEventSeparator(eventName);
            }
        })
        public on(...args) {
            if(args.length === 2){
                let eventName = args[0],
                    handler = args[1];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .on(eventName, handler);
            }
            else if(args.length === 3 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    priority = args[2];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .on(eventName, handler, priority);
            }
            else if(args.length === 3 && args[0] instanceof EntityObject){
                let target = args[0],
                    eventName = args[1],
                    handler = args[2];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .on(target, eventName, handler);
            }
            else if(args.length === 4) {
                let target = args[0],
                    eventName = args[1],
                    handler = args[2],
                    priority = args[3];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .on(target, eventName, handler, priority);
            }
        }

        public off():void;

        public off(eventName:EventName|string):void;
        public off(target:EntityObject):void;

        public off(eventName:EventName|string, handler:Function):void;
        public off(target:EntityObject, eventName:EventName|string):void;

        public off(target:EntityObject, eventName:EventName|string, handler:Function):void;

        public off(...args) {
            var eventRegister = CustomEventRegister.getInstance();

            if(args.length === 0){
                eventRegister.forEach((list:wdCb.Collection<EventHandlerData>, key:string) => {
                    var eventName = eventRegister.getEventNameFromKey(key),
                        targetUid = eventRegister.getUidFromKey(key);

                    if(!targetUid){
                        EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                            .off(eventName);
                    }
                    else{
                        EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName)).off(targetUid, eventName);
                    }
                });
            }
            else if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                eventRegister.forEach((list:wdCb.Collection<EventHandlerData>, key:string) => {
                    var registeredEventName = eventRegister.getEventNameFromKey(key);

                    if(registeredEventName === eventName){
                        EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                            .off(eventName);
                    }
                });
            }
            else if(args.length === 1 && args[0] instanceof EntityObject){
                let target = args[0];

                eventRegister.forEach((list:wdCb.Collection<CustomEventRegisterData>, key:string) => {
                    var eventName = eventRegister.getEventNameFromKey(key);

                    if(eventRegister.isTarget(key, target, list)){
                        EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                            .off(target, eventName);
                    }
                });
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .off(eventName, handler);
            }
            else if(args.length === 2 && args[0] instanceof EntityObject){
                let target = args[0],
                    eventName = args[1];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .off(target, eventName);
            }
            else if(args.length === 3 && args[0] instanceof EntityObject){
                let target = args[0],
                    eventName = args[1],
                    handler = args[2];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .off(target, eventName, handler);
            }
        }

        private _checkEventSeparator(eventName:string){
            assert(eventName.indexOf(CustomEventListenerMap.eventSeparator) === -1, Log.info.FUNC_SHOULD_NOT("eventName", `contain ${CustomEventListenerMap.eventSeparator}`));
        }
    }
}
