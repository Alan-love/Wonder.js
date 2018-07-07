open StateDataMainType;

open EventType;

let _getDefaultDom = () => DomExtend.document##body;

let _fromDomEvent = eventName =>
  Most.fromEvent(eventName, _getDefaultDom() |> bodyToEventTarget, false);

let _convertMouseEventToPointEvent =
    (
      eventName,
      {location, locationInView, button, wheel, movementDelta}: mouseEvent,
    ) => {
  name: eventName,
  location,
  locationInView,
  button,
  wheel,
  movementDelta,
  /* type_: Point, */
};

let _bindMouseEventToTriggerPointEvent =
    (mouseEventName, pointEventName, state) =>
  ManageEventMainService.onMouseEvent(
    ~eventName=mouseEventName,
    ~handleFunc=
      (. mouseEvent, state) =>
        ManageEventMainService.triggerCustomGlobalEvent(
          CreateCustomEventMainService.create(
            NameEventService.getPointDownEventName(),
            _convertMouseEventToPointEvent(pointEventName, mouseEvent)
            |> pointEventToUserData
            |. Some,
          ),
          state,
        ),
    ~state,
    (),
  );

let bindDomEventToTriggerPointEvent = state =>
  state
  |> _bindMouseEventToTriggerPointEvent(Click, PointTap)
  |> _bindMouseEventToTriggerPointEvent(MouseUp, PointUp)
  |> _bindMouseEventToTriggerPointEvent(MouseDown, PointDown)
  |> _bindMouseEventToTriggerPointEvent(MouseWheel, PointScale)
  |> _bindMouseEventToTriggerPointEvent(MouseMove, PointMove)
  |> _bindMouseEventToTriggerPointEvent(MouseDrag, PointDrag);

let _execMouseEventHandle = (mouseEventName, event) => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleMouseEventMainService.execEventHandle(
       mouseEventName,
       event |> eventTargetToMouseDomEvent,
     )
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execMouseMoveEventHandle = (mouseEventName, event) => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleMouseEventMainService.execEventHandle(
       mouseEventName,
       event |> eventTargetToMouseDomEvent,
     )
  |> HandleMouseEventMainService.setLastXYWhenMouseMove(
       mouseEventName,
       event |> eventTargetToMouseDomEvent,
     )
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execKeyboardEventHandle = (keyboardEventName, event) => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleKeyboardEventMainService.execEventHandle(
       keyboardEventName,
       event |> eventTargetToKeyboardDomEvent,
     )
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let fromDomEvent = () =>
  Most.mergeArray([|
    _fromDomEvent("click")
    |> Most.tap(event => _execMouseEventHandle(Click, event)),
    _fromDomEvent("mousedown")
    |> Most.tap(event => _execMouseEventHandle(MouseDown, event)),
    _fromDomEvent("mouseup")
    |> Most.tap(event => _execMouseEventHandle(MouseUp, event)),
    _fromDomEvent("mousemove")
    |> Most.tap(event => _execMouseMoveEventHandle(MouseMove, event)),
    _fromDomEvent("mousewheel")
    |> Most.tap(event => _execMouseEventHandle(MouseWheel, event)),
    _fromDomEvent("mousedown")
    |> Most.flatMap(event =>
         _fromDomEvent("mousemove") |> Most.until(_fromDomEvent("mouseup"))
       )
    |> Most.tap(event => _execMouseEventHandle(MouseDrag, event)),
    _fromDomEvent("keyup")
    |> Most.tap(event => _execKeyboardEventHandle(KeyUp, event)),
    _fromDomEvent("keydown")
    |> Most.tap(event => _execKeyboardEventHandle(KeyDown, event)),
    _fromDomEvent("keypress")
    |> Most.tap(event => _execKeyboardEventHandle(KeyPress, event)),
  |]);

let handleDomEventStreamError = e => {
  let message = Obj.magic(e)##message;
  let stack = Obj.magic(e)##stack;

  WonderLog.Log.fatal(
    WonderLog.Log.buildFatalMessage(
      ~title="InitEventJob",
      ~description={j|from dom event stream error|j},
      ~reason="",
      ~solution={j||j},
      ~params={j|message:$message\nstack:$stack|j},
    ),
  );
};

let initEvent = state => {
  let domEventStreamSubscription =
    fromDomEvent()
    |> Most.subscribe({
         "next": _ => (),
         "error": e => handleDomEventStreamError(e),
         "complete": () => (),
       });

  state
  |> ManageEventMainService.setDomEventStreamSubscription(
       domEventStreamSubscription,
     )
  |> bindDomEventToTriggerPointEvent;
};