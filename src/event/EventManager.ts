module wd {
    export class EventManager {
        public static on(listener:{}|EventListener):void;

        public static on(eventName:EEventName|string, handler:Function):void;
        public static on(dom:HTMLElement, listener:{}|EventListener):void;

        public static on(eventName:EEventName|string, handler:Function, priority:number):void;
        public static on(target:EntityObject, eventName:EEventName|string, handler:Function):void;
        public static on(dom:HTMLElement, eventName:EEventName|string, handler:Function):void;

        public static on(target:EntityObject, eventName:EEventName|string, handler:Function, priority:number):void;
        public static on(dom:HTMLElement, eventName:EEventName|string, handler:Function, priority:number):void;

        @require(function(...args){
            if(args[0] instanceof EntityObject){
                let eventName = args[1];

                assert(EventTable.getEventType(eventName) === EEventType.CUSTOM, Log.info.FUNC_MUST_BE("event", "custom event"));
            }
            else if(JudgeUtils.isDom(args[0])){
                let eventName = args[1],
                    eventType = EventTable.getEventType(eventName);

                assert(eventType === EEventType.MOUSE || eventType === EEventType.KEYBOARD, Log.info.FUNC_MUST_BE("event", "dom event"));
            }
        })
        public static on(...args) {
            if(args.length === 1){
                let listener = args[0],
                    eventBinder = DomEventBinder.getInstance();

                eventBinder.on(listener);
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    priority = 1,
                    eventBinder = EventBinderFactory.createEventBinder(eventName);

                eventBinder.on(eventName, handler, priority);
            }
            else if(args.length === 2 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    listener = args[1],
                    eventBinder = DomEventBinder.getInstance();

                eventBinder.on(dom, listener);
            }
            else if(args.length === 3 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    priority = args[2],
                    eventBinder = EventBinderFactory.createEventBinder(eventName);

                eventBinder.on(eventName, handler, priority);
            }
            else if(args.length === 3 && args[0] instanceof EntityObject){
                let target = args[0],
                    eventName = args[1],
                    handler = args[2],
                    priority = 1,
                    eventBinder = CustomEventBinder.getInstance();

                eventBinder.on(target, eventName, handler, priority);
            }
            else if(args.length === 3 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1],
                    handler = args[2],
                    priority = 1,
                    eventBinder = DomEventBinder.getInstance();

                eventBinder.on(dom, eventName, handler, priority);
            }
            else if(args.length === 4 && args[0] instanceof EntityObject){
                let target = args[0],
                    eventName = args[1],
                    handler = args[2],
                    priority = args[3],
                    eventBinder = CustomEventBinder.getInstance();

                eventBinder.on(target, eventName, handler, priority);
            }
            else if(args.length === 4 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1],
                    handler = args[2],
                    priority = args[3],
                    eventBinder = DomEventBinder.getInstance();

                eventBinder.on(dom, eventName, handler, priority);
            }
        }

        public static off():void;

        public static off(eventName:EEventName|string):void;
        public static off(target:EntityObject):void;
        public static off(dom:HTMLElement):void;

        public static off(eventName:EEventName|string, handler:Function):void;
        public static off(target:EntityObject, eventName:EEventName|string):void;
        public static off(dom:HTMLElement, eventName:EEventName):void;

        public static off(target:EntityObject, eventName:EEventName|string, handler:Function):void;
        public static off(dom:HTMLElement, eventName:EEventName, handler:Function):void;


        @require(function(...args){
            if(args.length > 2 && args[0] instanceof EntityObject){
                let eventName = args[1];

                assert(EventTable.getEventType(eventName) === EEventType.CUSTOM, Log.info.FUNC_MUST_BE("event", "custom event"));
            }
            else if(args.length > 2 && JudgeUtils.isDom(args[0])){
                let eventName = args[1],
                    eventType = EventTable.getEventType(eventName);

                assert(eventType === EEventType.MOUSE || eventType === EEventType.KEYBOARD, Log.info.FUNC_MUST_BE("event", "dom event"));
            }
        })
        public static off(...args) {
            if(args.length === 0){
                let customEventBinder = CustomEventBinder.getInstance(),
                    domEventBinder = DomEventBinder.getInstance();

                customEventBinder.off();
                domEventBinder.off();
            }
            else if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    eventBinder = EventBinderFactory.createEventBinder(eventName);

                eventBinder.off(eventName);
            }
            else if(args.length === 1 && args[0] instanceof EntityObject){
                let eventName = args[0],
                    eventBinder = CustomEventBinder.getInstance();

                eventBinder.off(eventName);
            }
            else if(args.length === 1 && JudgeUtils.isDom(args[0])){
                let eventName = args[0],
                    eventBinder = DomEventBinder.getInstance();

                eventBinder.off(eventName);
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    eventBinder = EventBinderFactory.createEventBinder(eventName);

                eventBinder.off(eventName, handler);
            }
            else if(args.length === 2 && args[0] instanceof EntityObject){
                let target = args[0],
                    eventName = args[1],
                    eventBinder = CustomEventBinder.getInstance();

                eventBinder.off(target, eventName);
            }
            else if(args.length === 2 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1],
                    eventBinder = DomEventBinder.getInstance();

                eventBinder.off(dom, eventName);
            }
            else if(args.length === 3 && args[0] instanceof EntityObject){
                let target = args[0],
                    eventName = args[1],
                    handler = args[2],
                    eventBinder = CustomEventBinder.getInstance();

                eventBinder.off(target, eventName, handler);
            }
            else if(args.length === 3 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1],
                    handler = args[2],
                    eventBinder = DomEventBinder.getInstance();

                eventBinder.off(dom, eventName, handler);
            }
        }

        public static trigger(event:Event):void;

        public static trigger(event:Event, userData:any):void;
        public static trigger(target:EntityObject, event:Event):void;
        public static trigger(dom:HTMLElement, event:Event):void;

        public static trigger(target:EntityObject, event:Event, userData:any):void;

        public static trigger(target:EntityObject, event:Event, userData:any, notSetTarget:boolean):void;


        @require(function(...args){
            if(args.length === 2 && args[0] instanceof Event){
                let event = args[0];

                assert(event instanceof CustomEvent, Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
            }
            else if(args.length === 2 && args[0] instanceof EntityObject){
            }
            else if(args.length === 2){
                if(args[0]){
                    assert(JudgeUtils.isDom(args[0]), Log.info.FUNC_MUST_BE("the first param", "dom"));
                }
            }
            else if(args[0] instanceof EntityObject){
                let event = args[1];

                assert(event instanceof CustomEvent, Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
            }
        })
        public static trigger(...args) {
            var length = args.length;

            if(length === 1){
                let event = args[0],
                    eventDispatcher = EventDispatcherFactory.createEventDispatcher(event);

                eventDispatcher.trigger(event);
            }
            else if(length === 2 && EventUtils.isEvent(args[0])){
                let event = args[0],
                    userData = args[1],
                    eventDispatcher = CustomEventDispatcher.getInstance();

                eventDispatcher.trigger(event, userData);
            }
            else if(length === 2 && EventUtils.isEntityObject(args[0])){
                let target = args[0],
                    event = args[1],
                    eventDispatcher = CustomEventDispatcher.getInstance();

                eventDispatcher.trigger(target, event);
            }
            else if(length === 2){
                let dom = args[0],
                    event = args[1],
                    eventDispatcher = DomEventDispatcher.getInstance();

                eventDispatcher.trigger(dom, event);
            }
            else if(length === 3){
                let target = args[0],
                    event = args[1],
                    userData = args[2],
                    eventDispatcher = CustomEventDispatcher.getInstance();

                eventDispatcher.trigger(target, event, userData);
            }
            else if(length === 4){
                let target = args[0],
                    event = args[1],
                    userData = args[2],
                    notSetTarget = args[3],
                    eventDispatcher = CustomEventDispatcher.getInstance();

                eventDispatcher.trigger(target, event, userData, notSetTarget);
            }
        }

        public static broadcast(target:EntityObject, event:Event);
        public static broadcast(target:EntityObject, event:Event, userData:any);

        @require(function(target:EntityObject, eventObject:Event, userData?:any){
            assert(eventObject instanceof CustomEvent, Log.info.FUNC_MUST_BE("eventObject", "CustomEvent"));
        })
        public static broadcast(...args) {
            var eventDispatcher = CustomEventDispatcher.getInstance();

            eventDispatcher.broadcast.apply(eventDispatcher, args);
        }

        public static emit(target:EntityObject, event:Event);
        public static emit(target:EntityObject, event:Event, userData:any);

        @require(function(target:EntityObject, eventObject:Event, userData?:any){
            assert(eventObject instanceof CustomEvent, Log.info.FUNC_MUST_BE("eventObject", "CustomEvent"));
        })
        public static emit(...args) {
            var eventDispatcher = CustomEventDispatcher.getInstance();

            eventDispatcher.emit.apply(eventDispatcher, args);
        }

        public static fromEvent(eventName:EEventName):wdFrp.FromEventPatternStream;

        public static fromEvent(eventName:EEventName, priority:number):wdFrp.FromEventPatternStream;
        public static fromEvent(target:EntityObject, eventName:EEventName):wdFrp.FromEventPatternStream;
        public static fromEvent(dom:HTMLElement, eventName:EEventName):wdFrp.FromEventPatternStream;

        public static fromEvent(target:EntityObject, eventName:EEventName, priority:number):wdFrp.FromEventPatternStream;
        public static fromEvent(dom:HTMLElement, eventName:EEventName, priority:number):wdFrp.FromEventPatternStream;

        public static fromEvent(...args):any {
            var addHandler = null,
                removeHandler = null;

            if (args.length === 1) {
                let eventName = args[0];

                addHandler = function (handler) {
                    EventManager.on(eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(eventName, handler);
                };
            }
            else if (args.length === 2 && JudgeUtils.isNumber(args[1])) {
                let eventName = args[0],
                    priority = args[1];

                addHandler = function (handler) {
                    EventManager.on(eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(eventName, handler);
                };
            }
            else if (args.length === 2) {
                let eventName = args[1];

                addHandler = function (handler) {
                    EventManager.on(args[0], eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(args[0], eventName, handler);
                };
            }
            else if (args.length === 3) {
                let eventName = args[1],
                    priority = args[2];

                addHandler = function (handler) {
                    EventManager.on(args[0], eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(args[0], eventName, handler);
                };
            }

            return wdFrp.fromEventPattern(addHandler, removeHandler);
        }

        @require(function(target:EntityObject, parent:any){
            assert(target instanceof EntityObject, "only EntityObject can setBubleParent");
        })
        public static setBubbleParent(target:EntityObject, parent:any) {
            CustomEventRegister.getInstance().setBubbleParent(target, parent);
        }
    }
}
