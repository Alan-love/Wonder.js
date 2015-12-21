/// <reference path="../../filePath.d.ts"/>
module wd{
    export class CustomEventListenerMap extends EventListenerMap{
        public static eventSeparator = "@";

        public static create() {
        	var obj = new this();

        	return obj;
        }

        protected listenerMap:wdCb.Hash<wdCb.Collection<CustomEventRegisterData>> = wdCb.Hash.create<wdCb.Collection<CustomEventRegisterData>>();

        public getChild(eventName:EventName):wdCb.Collection<CustomEventRegisterData>;
        public getChild(target:GameObject):wdCb.Collection<CustomEventRegisterData>;
        public getChild(target:GameObject, eventName:EventName):wdCb.Collection<CustomEventRegisterData>;

        public getChild(...args):any{
            var self = this;

            if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                return this.listenerMap.getChild(eventName);
            }
            else if(args.length === 1 && args[0] instanceof GameObject){
                let target = args[0];

                return this.listenerMap.filter((list:wdCb.Collection<CustomEventRegisterData>, key:string) => {
                    return self.isTarget(key, target, list);
                });
            }
            else if(args.length === 2){
                let target = args[0],
                    eventName = args[1];

                return this.listenerMap.getChild(this.buildKey(target, eventName));
            }
        }

        public removeChild(eventName:EventName):wdCb.Collection<wdCb.Collection<CustomEventOffData>>;
        public removeChild(target:GameObject):wdCb.Collection<wdCb.Collection<CustomEventOffData>>;

        public removeChild(eventName:EventName, handler:Function):wdCb.Collection<wdCb.Collection<CustomEventOffData>>;
        public removeChild(uid:number, eventName:EventName):wdCb.Collection<wdCb.Collection<CustomEventOffData>>;
        public removeChild(target:GameObject, eventName:EventName):wdCb.Collection<wdCb.Collection<CustomEventOffData>>;

        public removeChild(target:GameObject, eventName:EventName, handler:Function):wdCb.Collection<wdCb.Collection<CustomEventOffData>>;


        public removeChild(...args):wdCb.Collection<wdCb.Collection<CustomEventOffData>>{
            var self = this,
                result:any = null;

            if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                result =this._getEventDataOffDataList(eventName, this.listenerMap.removeChild((list:wdCb.Collection<CustomEventRegisterData>, key:string) => {
                    return self.isEventName(key, eventName);
                }));
            }
            else if(args.length === 1 && args[0] instanceof GameObject){
                let target = args[0];

                result = this.listenerMap.removeChild((list:wdCb.Collection<CustomEventRegisterData>, key:string) => {
                    return self.isTarget(key, target, list);
                });
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    list:wdCb.Collection<CustomEventRegisterData> = null;

                list = this.listenerMap.getChild(eventName);
                result =this._getEventDataOffDataList(eventName, wdCb.Collection.create().addChild(list.removeChild((val:CustomEventRegisterData) => {
                    return val.originHandler === handler;
                })));

                if(list.getCount() === 0){
                    this.listenerMap.removeChild(eventName);
                }
            }
            else if(args.length === 2 && JudgeUtils.isNumber(args[0])){
                let uid = args[0],
                    eventName = args[1];

                result = this.listenerMap.removeChild(this.buildKey(uid, eventName));
            }
            else if(args.length === 2 && args[0] instanceof GameObject){
                let target = args[0],
                eventName = args[1];

                result = this.listenerMap.removeChild(this.buildKey(target, eventName));
            }
            else if(args.length === 3 && args[0] instanceof GameObject){
                let eventName = args[1],
                    handler = args[2];

                this.listenerMap.forEach((list:wdCb.Collection<CustomEventRegisterData>, key:string) => {
                    list.removeChild((val:CustomEventRegisterData) => {
                        return val.originHandler === handler;
                    });

                    if(list.getCount() === 0){
                        return wdCb.$REMOVE;
                    }
                });

                result = null;
            }

            return result;
        }

        public getUidFromKey(key:string):number{
            var separator = `${CustomEventListenerMap.eventSeparator}`;

            return key.indexOf(separator) > -1 ? Number(<any>key.split(separator)[0]) : null;
        }

        public isTarget(key:string, target:GameObject, list:wdCb.Collection<CustomEventRegisterData>){
            return key.indexOf(this._buildKeyPrefix(target.uid)) > -1 && list !== undefined;
        }

        protected getEventSeparator():string{
            return `${CustomEventListenerMap.eventSeparator}`;
        }

        protected buildKey(uid:number, eventName:EventName):string;
        protected buildKey(target:GameObject, eventName:EventName):string;

        protected buildKey(...args):string{
            if(JudgeUtils.isNumber(args[0])){
                let uid = args[0],
                    eventName = args[1];

                return this._buildKeyWithUid(uid, eventName);
            }
            else if(args[0] instanceof GameObject){
                let target = args[0],
                    eventName = args[1];

                return this._buildKeyWithUid(target.uid, eventName);
            }
            else if(args[0] === null){
                let eventName = args[1];

                return eventName;
            }
        }

        private _buildKeyWithUid(uid:number, eventName:EventName){
            return `${this._buildKeyPrefix(uid)}${CustomEventListenerMap.eventSeparator}${eventName}`;
        }

        private _buildKeyPrefix(uid:number){
            return `${String(uid)}`;
        }

        private _getEventDataOffDataList(eventName:string, result:any):any{
            return result.map((list:wdCb.Collection<any>) => {
                return list.map((data:CustomEventRegisterData) => {
                    return {
                        eventName: eventName,
                        domHandler: data.domHandler
                    }
                });
            });
        }
    }

    export type CustomEventOffData = {
        eventName:EventName,
        domHandler:Function
    }
}
