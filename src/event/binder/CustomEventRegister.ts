module wd {
    @singleton()
    export class CustomEventRegister extends EventRegister{
        public static getInstance():any {}

		private constructor(){super();}

        protected listenerMap:CustomEventListenerMap = CustomEventListenerMap.create();


        public register(target:EntityObject, eventName:EEventName, handler:Function, originHandler:Function, domHandler:Function, priority:number) {
            this.listenerMap.appendChild(target, eventName, <CustomEventRegisterData>{
                target: target,
                eventName: eventName,
                handler: handler,
                originHandler: originHandler,
                domHandler: domHandler,
                priority: priority
            });
        }

        public remove(eventName:EEventName);
        public remove(target:EntityObject);

        public remove(eventName:EEventName, handler:Function);
        public remove(uid:number, eventName:EEventName);
        public remove(target:EntityObject, eventName:EEventName);

        public remove(target:EntityObject, eventName:EEventName, handler:Function);


        public remove(...args) {
            var target = args[0];

            if (args.length === 1 && JudgeUtils.isString(args[0])) {
                let eventName = args[0];

                this.listenerMap.removeChild(eventName);
            }
            else if (args.length === 1 && args[0] instanceof EntityObject) {
                this.listenerMap.removeChild(target);

                this._handleAfterAllEventHandlerRemoved(target);
            }
            else if (args.length === 2 && JudgeUtils.isFunction(args[1])) {
                let eventName = args[0],
                    handler = args[1];

                this.listenerMap.removeChild(eventName, handler);
            }
            else if (args.length === 2 && JudgeUtils.isNumber(args[0])) {
                let uid = args[0],
                    eventName = args[1];

                this.listenerMap.removeChild(uid, eventName);
            }
            else if ((args.length === 2 && args[0] instanceof EntityObject) || args.length === 3) {
                this.listenerMap.removeChild.apply(this.listenerMap, args);

                if (this._isAllEventHandlerRemoved(target)) {
                    this._handleAfterAllEventHandlerRemoved(target);
                }
            }
        }

        public setBubbleParent(target:EntityObject, parent:EntityObject) {
            target.bubbleParent = parent;
        }

        public getUidFromKey(key:string) {
            return this.listenerMap.getUidFromKey(key);
        }

        public isTarget(key:string, target:EntityObject, list:wdCb.Collection<CustomEventRegisterData>) {
            return this.listenerMap.isTarget(key, target, list);
        }

        private _isAllEventHandlerRemoved(target:EntityObject) {
            return !this.listenerMap.hasChildWithFunc((list:wdCb.Collection<CustomEventRegisterData>, key:string) => {
                return key.indexOf(String(target.uid)) > -1 && (list && list.getCount() > 0);
            });
        }

        private _handleAfterAllEventHandlerRemoved(target:EntityObject) {
            this.setBubbleParent(target, null);
        }
    }

    export type CustomEventRegisterData = {
        target:EntityObject,
        //user's event handler
        originHandler: Function,
        //wraped user's event handler
        handler:Function,
        //dom event handler
        domHandler:Function,
        priority:number
    };
}
