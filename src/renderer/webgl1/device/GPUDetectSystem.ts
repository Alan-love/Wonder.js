import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { detect as detectUtils, initData as initDataUtils } from "../utils/worker/render_file/device/gpuDetectUtils";

export var detect = curry((getGL: Function, DeviceManagerData: any, GPUDetectData: any, state: Map<any, any>, ) => {
    return detectUtils(getGL, DeviceManagerData, GPUDetectData, state);
})

export var initData = initDataUtils;
