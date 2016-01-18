module wd{
    declare var document:any;

    export class DomEventManager{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        get scene():SceneDispatcher{
            return Director.getInstance().scene;
        }

        private _lastTriggerList:any = null;

        public initDomEvent(){
            var self = this;

            return wdFrp.fromArray(
                [
                    EventManager.fromEvent(EventName.CLICK),
                    EventManager.fromEvent(EventName.MOUSEDOWN),
                    EventManager.fromEvent(EventName.MOUSEUP),
                    EventManager.fromEvent(EventName.MOUSEWHEEL),

                    /*!
                     here bind on document(not on document.body), so the event handler binded will not affected by other event handler binded on the same event
                     */
                    EventManager.fromEvent(document, EventName.MOUSEDOWN)
                        .flatMap((e:MouseEvent) => {
                            return EventManager.fromEvent(document, EventName.MOUSEMOVE).takeUntil(EventManager.fromEvent(document, EventName.MOUSEUP));
                        })
                        .map((e:MouseEvent) => {
                            e.name = EventName.MOUSEDRAG;

                            return e;
                        })
                ]
                )
                .mergeAll()
                .filter((e:MouseEvent) => {
                    return !Director.getInstance().isPause ;
                })
                .map((e:MouseEvent) => {
                    return self._getMouseEventTriggerListData(e);
                })

                .merge(
                    EventManager.fromEvent(EventName.MOUSEMOVE)
                        .filter((e:MouseEvent) => {
                            return !Director.getInstance().isPause ;
                        })
                        .map((e:MouseEvent) => {
                            var triggerList = self._getMouseEventTriggerList(e),
                                objects = null;
                            var {mouseoverObjects, mouseoutObjects} = self._getMouseOverAndMouseOutObject(triggerList, self._lastTriggerList);

                            self._setMouseOverTag(mouseoverObjects);
                            self._setMouseOutTag(mouseoutObjects);

                            self._lastTriggerList = triggerList.copy();

                            //triggerList.addChildren(mouseoutObjects);
                            triggerList = mouseoutObjects.addChildren(triggerList);

                            return self._getMouseEventTriggerListData(e, triggerList);
                        })
                )
                .filter(([triggerList, e]) => {
                    return triggerList.getCount() > 0;
                })
                .subscribe(([triggerList, e]) => {
                    triggerList.forEach((entityObject:EntityObject) => {
                        self._trigger(e.copy(), entityObject);
                    })
                });
        }

        private _getMouseOverAndMouseOutObject(currentTriggerList:wdCb.Collection<EntityObject>, lastTriggerList:wdCb.Collection<EntityObject>){
            var mouseoverObjects = wdCb.Collection.create<EntityObject>(),
                mouseoutObjects = wdCb.Collection.create<EntityObject>(),
                self = this;

            if(!lastTriggerList){
                mouseoverObjects = currentTriggerList;
            }
            else{
                //todo optimize
                lastTriggerList.forEach((lastObject:EntityObject) => {
                    if(!currentTriggerList.hasChild((currentObject:EntityObject) => {
                            return JudgeUtils.isEqual(currentObject, lastObject);
                        })){
                        mouseoutObjects.addChild(lastObject);
                    }
                });

                currentTriggerList.forEach((currentObject:EntityObject) => {
                    if(!lastTriggerList.hasChild((lastObject:EntityObject) => {
                            return JudgeUtils.isEqual(currentObject, lastObject) || self._isBubbleParent(lastObject, currentObject);
                        })){
                        mouseoverObjects.addChild(currentObject);
                    }
                });
            }

            return {
                mouseoverObjects: mouseoverObjects,
                mouseoutObjects: mouseoutObjects
            }
        }

        private _isBubbleParent(source:EntityObject, target:EntityObject){
            var parent = source.bubbleParent,
                result = false;

            while(parent){
                if(JudgeUtils.isEqual(parent, target)){
                    result = true;
                    break;
                }

                parent = parent.bubbleParent;
            }

            return result;
        }

        private _setMouseOverTag(objects:wdCb.Collection<EntityObject>){
            objects.forEach((object:EntityObject) => {
                object.addTag(<any>EventTag.MOUSE_OVER);
            })
        }

        private _setMouseOutTag(objects:wdCb.Collection<EntityObject>){
            objects.forEach((object:EntityObject) => {
                object.addTag(<any>EventTag.MOUSE_OUT);
            })
        }

        private _setEventNameByEventTag(object:EntityObject, e:MouseEvent){
            if(object.hasTag(<any>EventTag.MOUSE_OVER)){
                e.name = EventName.MOUSEOVER;
            }
            else if(object.hasTag(<any>EventTag.MOUSE_OUT)){
                e.name = EventName.MOUSEOUT;
            }

            return e;
        }

        private _removeEventTag(object:EntityObject){
            object.removeTag(<any>EventTag.MOUSE_OVER);
            object.removeTag(<any>EventTag.MOUSE_OUT);
        }

        private _trigger(e:MouseEvent, entityObject:EntityObject);
        private _trigger(e:MouseEvent, entityObject:EntityObject, notSetTarget:boolean);

        private _trigger(...args) {
            var e:MouseEvent = args[0],
                entityObject:EntityObject = args[1],
                notSetTarget = false,
                event:MouseEvent = null,
                customEvent:CustomEvent = null,
                handlerName = null;

            if(args.length === 3){
                notSetTarget = args[2];
            }

            event = this._setEventNameByEventTag(entityObject, e);
            customEvent = null;
            handlerName = EventTriggerTable.getScriptHandlerName(event.name);

            this._removeEventTag(entityObject);



            customEvent = CustomEvent.create(<any>EngineEvent[EventTriggerTable.getScriptEngineEvent(event.name)]);


            customEvent.getDataFromDomEvent(event);

            //todo refactor: support directly trigger mouse event on target
            EventManager.trigger(entityObject, customEvent, event, notSetTarget);

            event.getDataFromCustomEvent(customEvent);

            entityObject.execEventScript(handlerName, event);


            if (!event.isStopPropagation && entityObject.bubbleParent) {
                this._trigger(event.copy(), entityObject.bubbleParent, true);
            }
        }

        private _getMouseEventTriggerList(e:MouseEvent){
            var topGameObject:GameObject = null,
                topUIObject:UIObject = null,
                triggerList = wdCb.Collection.create<EntityObject>();


            topGameObject = this._findTopGameObject(e, this.scene.gameObjectScene);
            topUIObject = this._findTopUIObject(e, this.scene.uiObjectScene);

            if(topGameObject){
                triggerList.addChild(topGameObject);
            }

            if(topUIObject){
                triggerList.addChild(topUIObject);
            }

            if(this._isSceneAsTopOne(e, triggerList)){
                triggerList.addChild(this.scene);
            }

            return triggerList;
        }

        private _isSceneAsTopOne(e:MouseEvent, triggerList:wdCb.Collection<EntityObject>){
            return this._isTriggerScene(e) && triggerList.getCount() === 0;
        }

        private _findTopGameObject(e:MouseEvent, gameObjectScene:GameObjectScene){
            var self = this;

            return this._findTriggerObjectList<GameObject>(e, gameObjectScene).sort((a:GameObject, b:GameObject) => {
                    return self._getDistanceToCamera(a) - self._getDistanceToCamera(b);
                })
                .getChild(0);
        }

        private _getDistanceToCamera(obj:GameObject){
            return obj.transform.position.copy().sub(Director.getInstance().scene.camera.transform.position).length();
        }

        private _findTopUIObject(e:MouseEvent, uiObjectScene:UIObjectScene){
            var self = this;

            return this._findTriggerObjectList<UIObject>(e, uiObjectScene).sort((a:UIObject, b:UIObject) => {
                    return b.transform.zIndex - a.transform.zIndex;
                })
                .getChild(0);
        }

        private _findTriggerObjectList<T>(e:MouseEvent, objectScene:EntityObject):wdCb.Collection<T>{
            var triggerObjectList = wdCb.Collection.create<any>();
            var find = (entityObject:EntityObject) => {
                var detector = null;

                if (entityObject.hasComponent(EventTriggerDetector)) {
                    detector = entityObject.getComponent<EventTriggerDetector>(EventTriggerDetector);

                    if (detector.isTrigger(e)) {
                        triggerObjectList.addChild(entityObject);
                    }
                }

                entityObject.forEach((child:EntityObject) => {
                    find(child);
                });
            }

            objectScene.forEach((child:EntityObject) => {
                find(child);
            });

            return triggerObjectList;
        }

        private _isTriggerScene(e:MouseEvent){
            var detector = this.scene.getComponent<EventTriggerDetector>(EventTriggerDetector);

            return detector.isTrigger(e);
        }

        private _getMouseEventTriggerListData(e:MouseEvent);
        private _getMouseEventTriggerListData(e:MouseEvent, triggerList:wdCb.Collection<EntityObject>);

        private _getMouseEventTriggerListData(...args){
            if(args.length === 1){
                let e:MouseEvent = args[0];

                return [this._getMouseEventTriggerList(e), e];
            }
            else{
                let e:MouseEvent = args[0],
                    triggerList:wdCb.Collection<EntityObject> = args[1];

                return [triggerList, e];
            }
        }
    }

    enum EventTag{
        MOUSE_OVER = <any>"MOUSE_OVER",
        MOUSE_OUT = <any>"MOUSE_OUT"
    }
}
