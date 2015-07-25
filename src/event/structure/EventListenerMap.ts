/// <reference path="../../definitions.d.ts"/>
module Engine3D{
    export interface IEventOffData {
        eventName:EventName,
        wrapHandler:Function
    }

    export class EventListenerMap{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _listenerMap:dyCb.Hash = dyCb.Hash.create();

        public appendChild(eventName:EventName, data:IEventRegisterData){
            this._listenerMap.appendChild(
                //String(data.target.uid) + "_" + eventName,
                this._buildKey(data.target, eventName),
                data
            );
        }

        public getChild(eventName:EventName):any;
        public getChild(target:GameObject):any;
        public getChild(target:GameObject, eventName:EventName):any;

        public getChild(args){
            var self = this;
            //
            //return this._listenerMap.filter((list:dyCb.Collection, key:string) => {
            //    return key === self._buildKey(target, eventName);
            //});
            //
            if(arguments.length === 1 && JudgeUtils.isString(arguments[0])){
                let eventName = arguments[0];

                return this._listenerMap.getChild(eventName);
            }
            else if(arguments.length === 1){
                let target = arguments[0];

                return this._listenerMap.filter((list:dyCb.Collection, key:string) => {
                    return self.isTarget(key, target, list);
                });
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                    eventName = arguments[1];

                return this._listenerMap.getChild(this._buildKey(target, eventName));
            }
        }

        public hasChild(...args){
            if(arguments.length === 1 && JudgeUtils.isFunction(arguments[0])){
                return this._listenerMap.hasChild(arguments[0]);
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                    eventName = arguments[1];

                return this._listenerMap.hasChild(this._buildKey(target, eventName));
            }
        }

        public filter(func:Function){
            return this._listenerMap.filter(func);
        }

        public forEach(func:Function){
            return this._listenerMap.forEach(func);
        }

        public removeChild(eventName:EventName):void;
        public removeChild(eventName:EventName, handler:Function):void;
        public removeChild(uid:number, eventName:EventName):void;
        public removeChild(target:GameObject):void;
        public removeChild(target:GameObject, eventName:EventName):void;
        public removeChild(target:GameObject, eventName:EventName, handler:Function):void;

        public removeChild(args){
            var self = this;

            if(arguments.length === 1 && JudgeUtils.isString(arguments[0])){
                let eventName = arguments[0];

                this._listenerMap.removeChild(eventName);
            }
            else if(arguments.length === 2 && JudgeUtils.isFunction(arguments[1])){
                let eventName = arguments[0],
                    handler = arguments[1],
                    list:dyCb.Collection = null;

                list = this._listenerMap.getChild(eventName);

                list.removeChild((val:IEventRegisterData) => {
                        return val.handler === handler;
                    });

                if(list.getCount() === 0){
                    this._listenerMap.removeChild(eventName);
                }
            }
            else if(arguments.length === 2 && JudgeUtils.isNumber(arguments[0])){
                let uid = arguments[0],
                    eventName = arguments[1];

                this._listenerMap.removeChild(this._buildKey(uid, eventName));
            }
            else if(arguments.length === 1){
                let target = arguments[0];

                this._listenerMap.removeChild((list:dyCb.Collection, key:string) => {
                    return self.isTarget(key, target, list);
                });
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                eventName = arguments[1];

                this._listenerMap.removeChild(this._buildKey(target, eventName));
            }
            else if(arguments.length === 3){
                let target = arguments[0],
                    eventName = arguments[1],
                    handler = arguments[2];

                this._listenerMap.map((list:dyCb.Collection, key:string) => {
                    list.removeChild((val:IEventRegisterData) => {
                        return val.handler === handler;
                    });

                    if(list.getCount() === 0){
                        return dyCb.$REMOVE;
                    }

                    return [key, list];
                });
            }
        }

        public getEventOffDataList(target:GameObject, eventName?:EventName){
            var result:dyCb.Collection = dyCb.Collection.create(),
                self = this;

            if(arguments.length === 1){
                this.getChild(target)
                .forEach((list:dyCb.Collection, key:string) => {
                        if(list && list.getCount() > 0){
                            result.addChild(
                                <IEventOffData>{
                                    eventName: self.getEventNameFromKey(key),
                                    wrapHandler: list.getChild(0).wrapHandler
                                }
                            );
                        }
                    });

                return result;
            }
            else if(arguments.length === 2){
                var list:dyCb.Collection = this.getChild(target, eventName);

                if(list && list.getCount() > 0){
                    result.addChild(
                        <IEventOffData>{
                            eventName: eventName,
                            wrapHandler: list.getChild(0).wrapHandler
                        }
                    );
                }

                return result;
            }
        }

        public getEventNameFromKey(key:string):EventName{
            return key.indexOf("_") > -1 ? <any>key.split("_")[1] : key;
        }

        public getUidFromKey(key:string):number{
            return key.indexOf("_") > -1 ? Number(<any>key.split("_")[0]) : null;
        }

        public isTarget(key:string, target:GameObject, list:dyCb.Collection){
            return key.indexOf(String(target.uid)) > -1 && list !== undefined;
        }

        private _buildKey(uid:number, eventName:EventName):string;
        private _buildKey(target:GameObject, eventName:EventName):string;

        private _buildKey(args){
            if(JudgeUtils.isNumber(arguments[0])){
                let uid = arguments[0],
                    eventName = arguments[1];

                return this._buildKeyWithUid(uid, eventName);
            }
            else{
                let target = arguments[0],
                    eventName = arguments[1];

                return target ? this._buildKeyWithUid(target.uid, eventName) : <any>eventName;
            }
        }

        private _buildKeyWithUid(uid:number, eventName:EventName){
            return String(uid) + "_" + eventName;
        }
    }
}
