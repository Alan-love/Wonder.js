import curry from "wonder-lodash/curry";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { expect } from "wonder-expect.js";
import { chain, compose, map } from "../../utils/functionalUtils";
import { createGL, getGL, setCanvasPixelRatio as setCanvasPixelRatioFromDeviceManagerSystem, setScreen as setScreenFromDeviceManagerSystem } from "./DeviceManagerSystem";
import {
    createGL as createGLWorker, getViewportData,
    setCanvasPixelRatio as setCanvasPixelRatioFromDeviceManagerWorkerSystem,
    setContextConfig, setPixelRatio,
    setScreen as setScreenFromDeviceManagerWorkerSystem, setViewport
} from "../worker/both_file/device/DeviceManagerWorkerSystem";
import { DeviceManagerData } from "./DeviceManagerData";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { setCanvas } from "../../structure/ViewSystem";
import { ViewportData } from "../type/messageDataType";
import { Map } from "immutable";
import { WorkerInstanceData } from "../../worker/WorkerInstanceData";
import { getRenderWorker } from "../../worker/WorkerInstanceSystem";
import { WebGLDetectData } from "./WebGLDetectData";
import { GPUDetectData } from "./GPUDetectData";

export var initDevice = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initDevice = curry((contextConfig: Map<string, any>, state: Map<any, any>, configState: Map<any, any>, detect:Function, canvas: HTMLCanvasElement) => {
        return IO.of(() => {
            var screenData = setScreenFromDeviceManagerWorkerSystem(canvas, null, state).run(),
                viewportData: ViewportData = getViewportData(screenData, state);

            createGLWorker(canvas, getRenderWorker(WorkerInstanceData), contextConfig, viewportData).run();

            return compose(
                setCanvas(canvas),
                setContextConfig(contextConfig),
                setViewport(viewportData),
                setPixelRatio(setCanvasPixelRatioFromDeviceManagerWorkerSystem(configState.get("useDevicePixelRatio"), canvas).run())
            )(state);
        });
    });
}
else {
    initDevice = curry((contextConfig: Map<string, any>, state: Map<any, any>, configState: Map<any, any>, detect:Function, canvas: HTMLCanvasElement) => {
        return compose(
            map(detect(getGL, DeviceManagerData, GPUDetectData)),
            chain(setCanvasPixelRatioFromDeviceManagerSystem(configState.get("useDevicePixelRatio"), canvas)),
            chain(setScreenFromDeviceManagerSystem(canvas, DeviceManagerData)),
            createGL,
        )(canvas, contextConfig, WebGLDetectData, DeviceManagerData, state);
    });
}

export var createCanvas = curry((DomQuery: any, domID: string) => {
    return IO.of(() => {
        if (domID !== "") {
            return DomQuery.create(_getCanvasID(domID)).get(0);
        }

        return DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
    })
})

var _getCanvasID = ensureFunc((id: string) => {
    it("dom id should be #string", () => {
        expect(/#[^#]+/.test(id)).true;
    });
}, (domID: string) => {
    if (domID.indexOf('#') > -1) {
        return domID;
    }

    return `#${domID}`;
});

