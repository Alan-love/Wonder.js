open StateDataMainType;

open BrowserDetectType;

open EventType;

let _getLocation = (mouseDomEvent, {browserDetectRecord}) => {
  let {browser} = browserDetectRecord;

  switch (browser) {
  | Chrome
  | Firefox => (mouseDomEvent##pageX, mouseDomEvent##pageY)
  | _ =>
    RecordBrowserDetectAllService.fatalUnknownBrowser("_getLocation", browser)
  };
};

let _getLocationInView = (mouseDomEvent, {viewRecord} as state) =>
  HandlePointDomEventMainService.getLocationInView(
    mouseDomEvent,
    _getLocation,
    state,
  );

let _getButton = (mouseDomEvent, {browserDetectRecord} as state) => {
  let {browser} = browserDetectRecord;

  switch (browser) {
  | Chrome
  | Firefox =>
    switch (mouseDomEvent##button) {
    | 0 => Left
    | 1 => Right
    | 2 => Center
    | button =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_getButton",
          ~description={j|not support multi mouse button|j},
          ~reason="",
          ~solution={j||j},
          ~params={j|button: $button|j},
        ),
      )
    }
  | _ =>
    RecordBrowserDetectAllService.fatalUnknownBrowser("_getButton", browser)
  };
};

let _getFromWheelDelta = mouseDomEvent =>
  switch (Js.toOption(mouseDomEvent##wheelDelta)) {
  | Some(wheelData) => wheelData / 120
  | None => 0
  };

let _getWheel = mouseDomEvent =>
  switch (Js.toOption(mouseDomEvent##detail)) {
  | Some(detail) when detail !== 0 => (-1) * detail
  | _ => _getFromWheelDelta(mouseDomEvent)
  };

let _isPointerLocked = [%raw
  () => {|
  return !!(
    document.pointerLockElement
    || document.mozPointerLockElement
    || document.webkitPointerLockElement
  );
    |}
];

let _getMovementDeltaWhenPointerLocked =
    (mouseDomEvent, {eventRecord} as state) => (
  switch (Js.toOption(mouseDomEvent##movementX)) {
  | Some(movementX) => movementX
  | None =>
    switch (Js.toOption(mouseDomEvent##webkitMovementX)) {
    | Some(webkitMovementX) => webkitMovementX
    | None =>
      switch (Js.toOption(mouseDomEvent##mozMovementX)) {
      | Some(mozMovementX) => mozMovementX
      | None => 0
      }
    }
  },
  switch (Js.toOption(mouseDomEvent##movementY)) {
  | Some(movementY) => movementY
  | None =>
    switch (Js.toOption(mouseDomEvent##webkitMovementY)) {
    | Some(webkitMovementY) => webkitMovementY
    | None =>
      switch (Js.toOption(mouseDomEvent##mozMovementY)) {
      | Some(mozMovementY) => mozMovementY
      | None => 0
      }
    }
  },
);

let _getMovementDelta = (mouseDomEvent, {eventRecord} as state) =>
  _isPointerLocked(.) ?
    _getMovementDeltaWhenPointerLocked(mouseDomEvent, state) :
    HandlePointDomEventMainService.getMovementDelta(
      _getLocation(mouseDomEvent, state),
      MouseEventService.getLastXY(eventRecord),
      state,
    );

let _convertMouseDomEventToMouseEvent =
    (eventName, mouseDomEvent, state)
    : mouseEvent => {
  name: eventName,
  location: _getLocation(mouseDomEvent, state),
  locationInView: _getLocationInView(mouseDomEvent, state),
  button: _getButton(mouseDomEvent, state),
  wheel: _getWheel(mouseDomEvent),
  movementDelta: _getMovementDelta(mouseDomEvent, state),
  event: mouseDomEvent,
};

let execEventHandle = (eventName, mouseDomEvent, {eventRecord} as state) => {
  let {mouseDomEventDataArrMap} = eventRecord;

  switch (
    mouseDomEventDataArrMap
    |> WonderCommonlib.SparseMapService.get(eventName |> domEventNameToInt)
  ) {
  | None => state
  | Some(arr) =>
    arr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. state, {handleFunc}: mouseDomEventData) =>
           handleFunc(.
             _convertMouseDomEventToMouseEvent(
               eventName,
               mouseDomEvent,
               state,
             ),
             state,
           ),
         state,
       )
  };
};

let setLastXY = (lastX, lastY, {eventRecord} as state) => {
  ...state,
  eventRecord: MouseEventService.setLastXY(lastX, lastY, eventRecord),
};

let setLastXYByLocation = (eventName, mouseDomEvent, {eventRecord} as state) => {
  let {location}: mouseEvent =
    _convertMouseDomEventToMouseEvent(eventName, mouseDomEvent, state);

  let (x, y) = location;

  setLastXY(Some(x), Some(y), state);
};

let getIsDrag = ({eventRecord} as state) =>
  eventRecord.mouseEventData.isDrag;

let setIsDrag = (isDrag, {eventRecord} as state) => {
  ...state,
  eventRecord: {
    ...eventRecord,
    mouseEventData: {
      ...eventRecord.mouseEventData,
      isDrag,
    },
  },
};

let setLastXYWhenMouseMove = (eventName, mouseDomEvent, state) =>
  getIsDrag(state) ?
    state : setLastXYByLocation(eventName, mouseDomEvent, state);