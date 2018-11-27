

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TouchEventService$Wonderjs from "../../../../record/main/event/TouchEventService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as HandlePointDomEventMainService$Wonderjs from "./HandlePointDomEventMainService.js";

function _getTouchData(touchDomEvent) {
  var changedTouches = touchDomEvent.changedTouches;
  var touchDataJsObj = changedTouches[0];
  return /* record */[
          /* clientX */touchDataJsObj.clientX,
          /* clientY */touchDataJsObj.clientY,
          /* pageX */touchDataJsObj.pageX,
          /* pageY */touchDataJsObj.pageY,
          /* identifier */touchDataJsObj.identifier,
          /* screenX */touchDataJsObj.screenX,
          /* screenY */touchDataJsObj.screenY,
          /* radiusX */touchDataJsObj.radiusX,
          /* radiusY */touchDataJsObj.radiusY,
          /* rotationAngle */touchDataJsObj.rotationAngle,
          /* force */touchDataJsObj.force
        ];
}

function _getLocation(touchDomEvent, _) {
  var match = _getTouchData(touchDomEvent);
  return /* tuple */[
          match[/* pageX */2],
          match[/* pageY */3]
        ];
}

function _getLocationInView(touchDomEvent, state) {
  return HandlePointDomEventMainService$Wonderjs.getLocationInView(touchDomEvent, _getLocation, state);
}

function _getMovementDelta(touchDomEvent, state) {
  return HandlePointDomEventMainService$Wonderjs.getMovementDelta(_getLocation(touchDomEvent, state), TouchEventService$Wonderjs.getLastXY(state[/* eventRecord */40]), state);
}

function _convertTouchDomEventToTouchEvent(eventName, touchDomEvent, state) {
  return /* record */[
          /* name */eventName,
          /* location */_getLocation(touchDomEvent, state),
          /* locationInView */HandlePointDomEventMainService$Wonderjs.getLocationInView(touchDomEvent, _getLocation, state),
          /* touchData */_getTouchData(touchDomEvent),
          /* movementDelta */_getMovementDelta(touchDomEvent, state),
          /* event */touchDomEvent
        ];
}

function execEventHandle(eventName, touchDomEvent, state) {
  HandlePointDomEventMainService$Wonderjs.preventDefault(touchDomEvent);
  var match = SparseMapService$WonderCommonlib.get(eventName, state[/* eventRecord */40][/* touchDomEventDataArrMap */3]);
  if (match !== undefined) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                  return param[/* handleFunc */1](_convertTouchDomEventToTouchEvent(eventName, touchDomEvent, state), state);
                }), state, match);
  } else {
    return state;
  }
}

function setLastXY(lastX, lastY, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* eventRecord */40] = TouchEventService$Wonderjs.setLastXY(lastX, lastY, state[/* eventRecord */40]);
  return newrecord;
}

function setLastXYByLocation(eventName, touchDomEvent, state) {
  var match = _convertTouchDomEventToTouchEvent(eventName, touchDomEvent, state);
  var $$location = match[/* location */1];
  return setLastXY($$location[0], $$location[1], state);
}

function getIsDrag(state) {
  return state[/* eventRecord */40][/* touchEventData */8][/* isDrag */2];
}

function setIsDrag(isDrag, state) {
  var eventRecord = state[/* eventRecord */40];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = eventRecord[/* touchEventData */8];
  newrecord[/* eventRecord */40] = /* record */[
    /* domEventStreamSubscription */eventRecord[/* domEventStreamSubscription */0],
    /* mouseDomEventDataArrMap */eventRecord[/* mouseDomEventDataArrMap */1],
    /* keyboardDomEventDataArrMap */eventRecord[/* keyboardDomEventDataArrMap */2],
    /* touchDomEventDataArrMap */eventRecord[/* touchDomEventDataArrMap */3],
    /* customGlobalEventArrMap */eventRecord[/* customGlobalEventArrMap */4],
    /* customGameObjectEventArrMap */eventRecord[/* customGameObjectEventArrMap */5],
    /* mouseEventData */eventRecord[/* mouseEventData */6],
    /* keyboardEventData */eventRecord[/* keyboardEventData */7],
    /* touchEventData : record */[
      /* lastX */init[/* lastX */0],
      /* lastY */init[/* lastY */1],
      /* isDrag */isDrag
    ]
  ];
  return newrecord;
}

function setLastXYWhenTouchMove(eventName, touchDomEvent, state) {
  var match = getIsDrag(state);
  if (match) {
    return state;
  } else {
    return setLastXYByLocation(eventName, touchDomEvent, state);
  }
}

export {
  _getTouchData ,
  _getLocation ,
  _getLocationInView ,
  _getMovementDelta ,
  _convertTouchDomEventToTouchEvent ,
  execEventHandle ,
  setLastXY ,
  setLastXYByLocation ,
  getIsDrag ,
  setIsDrag ,
  setLastXYWhenTouchMove ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
