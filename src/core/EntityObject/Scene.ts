module wd {
    export abstract class Scene extends EntityObject {
        //protected eventTriggerUtils:EventTriggerUtils = ABSTRACT_ATTRIBUTE;

        ////todo move to event binder
        //public getMouseEventTriggerDataList(e:MouseEvent) {
        //    var triggerDataList = wdCb.Collection.create<EventTriggerListData>();
        //
        //    var find = (entityObject:EntityObject) => {
        //        entityObject
        //            .forEach((child:EntityObject) => {
        //                var detector = null;
        //
        //                if (!child.hasComponent(EventTriggerDetector)) {
        //                    find(child);
        //                    return;
        //                }
        //
        //                detector = child.getComponent<EventTriggerDetector>(EventTriggerDetector);
        //
        //                if (detector.isTrigger(e)) {
        //                    triggerDataList.addChild({
        //                        entityObject: child
        //                        , triggerMode: detector.triggerMode
        //                    });
        //                }
        //
        //                find(child);
        //            });
        //    }
        //
        //    find(this);
        //
        //    return this.eventTriggerUtils.getEventTriggerListByTriggerMode(triggerDataList);
        //}
    }
}

