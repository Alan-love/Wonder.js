import { renderWorkerConfig } from "../renderWorkerConfig";
import { EWorkerOperateType } from "../EWorkerOperateType";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
// import {
//     getContext, initCanvas, setCanvas
// } from "../../../../structure/ViewSystem";
import { IO } from "Wonder-Fantasy-Land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";
// import { chain, compose } from "../../../../utils/functionalUtils";
import { Map } from "immutable";
import {
    clear as clearUtils,
    getGL as getGLUtils, getScreenSize as getScreenSizeUtils, getViewport as getViewportUtils,
    initData as initDataUtils, setCanvasPixelRatio as setCanvasPixelRatioUtils,
    setColorWrite as setColorWriteUtils, setContextConfig as setContextConfigUtils,
    setGL as setGLUtils, setPixelRatio as setPixelRatioUtils, setScreen as setScreenUtils, setViewport as setViewportUtils, setViewportOfGL as setViewportOfGLUtils
} from "../../../utils/device/deviceManagerUtils";
import { Color } from "../../../../structure/Color";
import { ContextConfigOptionsData } from "../../../type/dataType";
import { chain, compose } from "../../../../utils/functionalUtils";
import { setHeight, setStyleHeight, setStyleWidth, setWidth, setY, setX } from "../../../../structure/ViewSystem";
import { ScreenData, ViewportData } from "../../../type/messageDataType";
import { isValueExist } from "../../../../utils/stateUtils";
import { DeviceManagerWorkerData } from "./DeviceManagerWorkerData";

export var createGL = curry((canvas: HTMLCanvasElement, DeviceManagerWorkerData: any, contextConfig:Map<string, any>, viewportData:ViewportData) => {
    return IO.of(() => {
        var offscreen = (<any>canvas).transferControlToOffscreen();

        DeviceManagerWorkerData.renderWorker = new Worker(renderWorkerConfig.workerFilePath);

        DeviceManagerWorkerData.renderWorker.postMessage({
            operateType: EWorkerOperateType.INIT_GL,
            canvas: offscreen,
            options: contextConfig.get("options").toObject(),
            viewportData:viewportData
        }, [offscreen]);
    })
})

export var setContextConfig = setContextConfigUtils;

export var getGL = getGLUtils;

export var setGL = setGLUtils;

export var setPixelRatio = setPixelRatioUtils;

export var getViewport = getViewportUtils;

export var setViewport = curry((viewportData:ViewportData|null, state: Map<any, any>) => {
    if(viewportData === null){
        return state;
    }

    return setViewportUtils(viewportData.x, viewportData.y, viewportData.width, viewportData.height, state);
});

export var getViewportData = (screenData:ScreenData, state: Map<any, any>) => {
    var oldViewportData = getViewport(state),
        {
            x,
            y,
            width,
            height
        } = screenData;

    if (isValueExist(oldViewportData) && oldViewportData.x === x && oldViewportData.y === y && oldViewportData.width === width && oldViewportData.height === height) {
        return null;
    }

    return {
        x:x,
        y:y,
        width:width,
        height:height
    }
}

export var setViewportOfGL = curry((DeviceManagerWorkerData: any, {
    x,
    y,
    width,
    height
}, state: Map<any, any>) => {
    return IO.of(() => {
        var gl = getGL(DeviceManagerWorkerData, state);

        gl.viewport(x, y, width, height);

        return state;
    });
})

export var setScreen = curry((canvas:HTMLCanvasElement, DeviceManagerWorkerData:any, state: Map<any, any>) => {
    return setScreenUtils(canvas, _setScreenData, DeviceManagerWorkerData, state);
});

var _setScreenData = curry((DeviceManagerWorkerData:any, canvas:HTMLCanvasElement, state: Map<any, any>, data:any) => {
    var {
        x,
        y,
        width,
        height,
        styleWidth,
        styleHeight
    } = data;

    return IO.of(() => {
        compose(chain(setStyleWidth(styleWidth)), chain(setStyleHeight(styleHeight)), chain(setHeight(height)), chain(setWidth(width)), chain(setY(y)), setX(x))(canvas).run();

        return data;
    });
})

export var setCanvasPixelRatio = curry((useDevicePixelRatio: boolean, canvas:HTMLCanvasElement) => {
    return IO.of(() => {
        if (!useDevicePixelRatio) {
            return null;
        }

        return setCanvasPixelRatioUtils(useDevicePixelRatio, canvas).run();
    });
});

export var clear = clearUtils;

export var setColorWrite = setColorWriteUtils;

export var initData = initDataUtils;

