open StateDataMainType;

open EventType;

let onMouseEvent = (~eventName, ~handleFunc, ~state, ~priority=0, ()) =>
  BindMouseDomEventMainService.bind(eventName, priority, handleFunc, state);

let onKeyboardEvent = (~eventName, ~handleFunc, ~state, ~priority=0, ()) =>
  BindKeyboardDomEventMainService.bind(
    eventName,
    priority,
    handleFunc,
    state,
  );

let onTouchEvent = (~eventName, ~handleFunc, ~state, ~priority=0, ()) =>
  BindTouchDomEventMainService.bind(eventName, priority, handleFunc, state);

let offMouseEventByHandleFunc = (~eventName, ~handleFunc, ~state) =>
  BindMouseDomEventMainService.unbindByHandleFunc(
    eventName,
    handleFunc,
    state,
  );

let offKeyboardEventByHandleFunc = (~eventName, ~handleFunc, ~state) =>
  BindKeyboardDomEventMainService.unbindByHandleFunc(
    eventName,
    handleFunc,
    state,
  );

let offTouchEventByHandleFunc = (~eventName, ~handleFunc, ~state) =>
  BindTouchDomEventMainService.unbindByHandleFunc(
    eventName,
    handleFunc,
    state,
  );

let onCustomGlobalEvent = (~eventName, ~handleFunc, ~state, ~priority=0, ()) =>
  BindCustomEventMainService.bindGlobalEvent(
    eventName,
    priority,
    handleFunc,
    state,
  );

let offCustomGlobalEventByEventName = (~eventName, ~state) =>
  BindCustomEventMainService.unbindGlobalEventByEventName(eventName, state);

let offCustomGlobalEventByHandleFunc = (~eventName, ~handleFunc, ~state) =>
  BindCustomEventMainService.unbindGlobalEventByHandleFunc(
    eventName,
    handleFunc,
    state,
  );

let onCustomGameObjectEvent =
    (~eventName, ~handleFunc, ~target, ~state, ~priority=0, ()) =>
  BindCustomEventMainService.bindGameObjectEvent(
    (eventName, priority, target),
    handleFunc,
    state,
  );

let offCustomGameObjectEventByTarget = (~eventName, ~target, ~state) =>
  BindCustomEventMainService.unbindGameObjectEventByTarget(
    (eventName, target),
    state,
  );

let offCustomGameObjectEventByHandleFunc =
    (~eventName, ~handleFunc, ~target, ~state) =>
  BindCustomEventMainService.unbindGameObjectEventByHandleFunc(
    (eventName, target),
    handleFunc,
    state,
  );

/* let execDomEventHandle = (eventName, domEvent, state) =>
   switch (eventName) {
   | MouseDown
   | MouseUp =>
     HandleMouseEventMainService.execEventHandle(eventName, domEvent, state)
   }; */

let stopPropagationCustomEvent = customEvent =>
  HandleCustomEventMainService.stopPropagation(customEvent);

let triggerCustomGlobalEvent = (customEvent, state) =>
  HandleCustomEventMainService.triggerGlobalEvent(customEvent, state);

let triggerCustomGameObjectEvent = (customEvent, target, state) =>
  HandleCustomEventMainService.triggerGameObjectEvent(
    target,
    customEvent,
    state,
  );

let broadcastCustomGameObjectEvent = (customEvent, target, state) =>
  HandleCustomEventMainService.broadcastGameObjectEvent(
    target,
    customEvent,
    state,
  );

let emitCustomGameObjectEvent = (customEvent, target, state) =>
  HandleCustomEventMainService.emitGameObjectEvent(
    target,
    customEvent,
    state,
  );

let setDomEventStreamSubscription =
    (domEventStreamSubscription, {eventRecord} as state) => {
  ...state,
  eventRecord: {
    ...eventRecord,
    domEventStreamSubscription: Some(domEventStreamSubscription),
  },
};

let _unsubscribeDomEventStream = [%raw
  domEventStreamSubscription => {|
  domEventStreamSubscription.unsubscribe();
  |}
];

let unsubscribeDomEventStream = ({eventRecord} as state) =>
  switch (eventRecord.domEventStreamSubscription) {
  | None => state
  | Some(domEventStreamSubscription) =>
    /* let unsubscribe = domEventStreamSubscription##unsubscribe;
       unsubscribe(); */
    _unsubscribeDomEventStream(domEventStreamSubscription);

    state;
  };