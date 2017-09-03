import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { singleton } from "../../definition/typescript/decorator/singleton";
// import { createGL, getGL, getViewport, setGL, setScreen } from "./DeviceManagerSystem";
import {
    getClearColor, getGL, getViewport, setClearColor, setGL, setViewportOfGL,
    setViewportToState
} from "./DeviceManagerSystem";
// import { View } from "../../structure/View";
import { getState, setState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { DeviceManagerData } from "./DeviceManagerData";
import { Color } from "../../structure/Color";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { buildViewportData as buildViewportDataWorkerSystem } from "../worker/both_file/device/DeviceManagerWorkerSystem";
import { getRenderWorker } from "../../worker/WorkerInstanceSystem";
import { WorkerInstanceData } from "../../worker/WorkerInstanceData";
import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { setClearColorData } from "../utils/worker/both_file/device/deviceManagerUtils";

//todo change to function

//todo remove
/*!
 DeviceManager is responsible for global setting of gl
 */
@singleton()
@registerClass("DeviceManager")
export class DeviceManager {
    public static getInstance(): any { }

    //todo remove
    get gl() {
        return getGL(DeviceManagerData, getState(DirectorData));
    }

    private constructor() { }

    //todo open setScreen
    // @requireCheck(() => {
    //     it("canvas should be setter", () => {
    //         expect(getCanvas(getState(DirectorData))).exist;
    //     });
    // })
    // public setScreen() {
    //     return setScreen(DeviceManagerData, getState(DirectorData));
    // }
}

export var getDeviceManagerGL = () => {
    return getGL(DeviceManagerData, getState(DirectorData));
}

export var setDeviceManagerGL = (gl: WebGLRenderingContext) => {
    return setGL(gl, DeviceManagerData, getState(DirectorData));
}

export var getDeviceManagerViewport = () => {
    return getViewport(getState(DirectorData));
}


export var getDeviceManagerClearColor = () => {
    return getClearColor(DeviceManagerData);
}

export var setDeviceManagerViewport = null,
    setDeviceManagerClearColor = null;

if(isSupportRenderWorkerAndSharedArrayBuffer()){
    setDeviceManagerViewport = (x: number, y: number, width: number, height: number) => {
        setState(setViewportToState(x, y, width, height, getState(DirectorData)), DirectorData).run();

        getRenderWorker(WorkerInstanceData).postMessage({
            operateType: EWorkerOperateType.INIT_VIEWPORT,
            viewportData: buildViewportDataWorkerSystem(x, y, width, height)
        });
    }

    setDeviceManagerClearColor = (color: Color) => {
        setClearColorData(color, DeviceManagerData);

        getRenderWorker(WorkerInstanceData).postMessage({
            operateType: EWorkerOperateType.INIT_CLEARCOLOR,
            clearColorArr4: color.toArray4()
        });
    }
}
else{
    setDeviceManagerViewport = (x: number, y: number, width: number, height: number) => {
        setState(
            setViewportOfGL(DeviceManagerData, getState(DirectorData), {
                    x: x,
                    y: y,
                    width: width,
                    height: height
                }
            ).run(), DirectorData
        ).run();
    }

    setDeviceManagerClearColor = (color: Color) => {
        setClearColor(getGL(DeviceManagerData, getState(DirectorData)), color, DeviceManagerData);
    }
}
