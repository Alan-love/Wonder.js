/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    //responsibilty:on, off event(manage list)

    export class EventBinder {
        public static create() {
            var obj = new this();

            return obj;
        }

        //private _listenerList:EventListener = EventListener.create();
        //private _eventRegister:EventRegister = null;

        constructor() {
            //EventRegister.getInstance() = eventRegister;
        }

        public on(target:GameObject, arg:EventListener|{}) {
            var listener:EventListener = null;

            if (!(target instanceof GameObject)) {
                return;
            }

            dyCb.Log.assert(target && arg, dyCb.Log.info.INVALID_PARAM);

            listener = !(arg instanceof EventListener) ?  EventListener.create(arg): arg;
            //EventRegister.getInstance().register(target, listener);

            //dyCb.Log.assert(target && listener, dyCb.Log.info.invalid_param);
            //if(!listener instanceof EventListener){
            //    listener = EventListener.create(listener);
            //}
            //
            //////priority set in listener, not in this(binder)!
            ////if(priority){
            ////    listener.setPriority(priority);
            ////}
            //
            //this._listenerList.addChild(target, listener);

            //register
            //
            //remove

            //bind event to view dom


            //var listenerList = EventRegister.getInstance().getListenerDataList(target, listener.eventType);

            var view = this._getView();

            var handler = FactoryEventHandler.createEventHandler(listener.eventType);

            var self = this;


            listener.handlerDataList.forEach(function (handlerData:IEventHandlerData) {
                //var wrapHandler = handler.wrapHandler(handlerData.handler);

                //if (!EventRegister.getInstance().isBindEventOnView(handlerData.eventName)) {
                if (!EventRegister.getInstance().isBinded(target, handlerData.eventName)) {
                    //handler.on(view, handlerData.eventName, wrapHandler);
                    handler.on(view, handlerData.eventName, target);
                }

                EventRegister.getInstance().register(
                    target,
                    handlerData.eventName,
                    //wrapHandler,
                    //handler,
                    handlerData.handler,
                    listener.priority
                );
            });
        }

        //todo unify eventName?(all use apply or all not use)
        public off(target:GameObject, eventName?:EventName) {
            var eventRegister = EventRegister.getInstance(),
                argArr = Array.prototype.slice.call(arguments, 0),
                argArrCopy = argArr.concat();

            argArr.unshift(this._getView());

            if(arguments.length === 1){
                let handlerList:dyCb.Collection = FactoryEventHandler.createEventHandler();

                handlerList.forEach((handler:EventHandler) => {
                    handler.off.apply(
                        handler,
                        argArr
                    );
                });
            }
            else if(arguments.length === 2){
                let handler = FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName));

                handler.off.apply(
                    handler,
                    argArr
                );
            }

            eventRegister.remove.apply(eventRegister, argArrCopy);
        }

        //public remove(target:GameObject) {
        //    EventRegister.getInstance().remove(target);
        //    this.off(target);
        //}

        public getListenerDataList(target:GameObject, eventName:EventName) {
            return EventRegister.getInstance().getListenerDataList(target, eventName);
        }

        private _getView() {
            return Director.getInstance().getView();
        }
    }
}
