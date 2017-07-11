import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import {
    getContext, setCanvas, setHeight, setStyleHeight, setStyleWidth, setWidth, setY, setX
} from "../../structure/ViewSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";
import { chain, compose } from "../../utils/functionalUtils";
import { Map } from "immutable";
import {
    clear as clearUtils,
    getGL as getGLUtils, getScreenSize as getScreenSizeUtils, getViewport as getViewportUtils,
    initData as initDataUtils, setCanvasPixelRatio as setCanvasPixelRatioUtils, setColorWrite as setColorWriteUtils,
    setContextConfig as setContextConfigUtils, setGL as setGLUtils, setPixelRatio as setPixelRatioUtils,
    setScreen as setScreenUtils, setSide as setSideUtils,
    setViewport as setViewportUtils, setViewportOfGL as setViewportOfGLUtils
} from "../utils/device/deviceManagerUtils";
import { Color } from "../../structure/Color";
import { ESide } from "../enum/ESide";

export var createGL = curry((canvas: HTMLCanvasElement, contextConfig: Map<string, any>, DeviceManagerData: any, state: Map<any, any>) => {
    return IO.of(() => {
        var gl = getContext(contextConfig, canvas);

        if (!gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }
        return compose(setCanvas(canvas), setContextConfig(contextConfig), setGL(gl, DeviceManagerData))(state);
    });
})

export var getGL = getGLUtils;

export var setGL = setGLUtils;

export var setContextConfig = setContextConfigUtils;

export var setPixelRatio = setPixelRatioUtils;

export var getViewport = getViewportUtils;

export var setViewport = setViewportUtils;

export var setCanvasPixelRatio = curry((useDevicePixelRatio: boolean, canvas: HTMLCanvasElement, state: Map<any, any>) => {
    return IO.of(() => {
        if (!useDevicePixelRatio) {
            return state;
        }

        let pixelRatio = setCanvasPixelRatioUtils(useDevicePixelRatio, canvas).run();

        return setPixelRatio(pixelRatio, state);
    });
});

export var setViewportOfGL = setViewportOfGLUtils;

export var getScreenSize = getScreenSizeUtils;

export var setScreen = curry((canvas: HTMLCanvasElement, DeviceManagerData: any, state: Map<any, any>) => {
    return setScreenUtils(canvas, _setScreenData, DeviceManagerData, state);
});

var _setScreenData = curry((DeviceManagerData: any, canvas: HTMLCanvasElement, state: Map<any, any>, data: any) => {
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

        return setViewportOfGL(DeviceManagerData, state, data).run();
    });
})

export var clear = clearUtils;

export var setColorWrite = setColorWriteUtils;

export var setSide = setSideUtils;

export var initData = initDataUtils;
