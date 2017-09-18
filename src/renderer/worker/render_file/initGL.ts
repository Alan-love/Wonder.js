import { chain, compose, map } from "../../../utils/functionalUtils";
import {
    getGL, setContextConfig, setGL, setViewportToState,
    setViewportOfGL
} from "../both_file/device/DeviceManagerWorkerSystem";
import { DeviceManagerWorkerData } from "../both_file/device/DeviceManagerWorkerData";
import { createState } from "../../../utils/stateUtils";
import { ContextConfigOptionsData } from "../../type/dataType";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import curry from "wonder-lodash/curry";
import { MessageInitGLData } from "../../type/messageDataType";
import { Map } from "immutable";
import { setCanvas } from "../../../structure/ViewSystem";
import { getOnlyGL } from "../../utils/worker/both_file/device/deviceManagerUtils";

export const initGL = (data: MessageInitGLData, detect: Function, WebGLDetectWorkerData: any, GPUDetectWorkerData: any) => {
    return compose(
        map(detect(getGL, DeviceManagerWorkerData, GPUDetectWorkerData)),
        chain(setViewportOfGL(DeviceManagerWorkerData, data.viewportData)),
        _createGL(data.canvas, data.options, WebGLDetectWorkerData, DeviceManagerWorkerData)
    )(createState());
}

const _createGL =curry((canvas: HTMLCanvasElement, options: ContextConfigOptionsData, WebGLDetectWorkerData: any, DeviceManagerWorkerData: any, state: Map<any, any>) => {
    return IO.of(() => {
        var gl = getOnlyGL(canvas, options, WebGLDetectWorkerData);

        if (!gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }

        return compose(setCanvas(canvas), setContextConfig(options), setGL(gl, DeviceManagerWorkerData))(state);
    });
})
