import { PointLight } from "./PointLight";
import { Color } from "../../structure/Color";
import {
    create as createSpecifyLight,
    disposeComponent as disposeSpecifyLightComponent,
    initData as initSpecifyLightData,
    setColor as setSpecifyLightColor,
    createDefaultColor, getPosition as getSpecifyLightPosition, markDirty, bindChangePositionEvent
} from "./SpecifyLightSystem";
import { Light } from "./Light";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { getColor3Data } from "../utils/operateBufferDataUtils";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { deleteOneItemBySwapAndReset, setSingleValue } from "../../utils/typeArrayUtils";
import {
    getConstant as getConstantUtils,
    getLinear as getLinearUtils,
    getQuadratic as getQuadraticUtils, getRange as getRangeUtils,
    createTypeArrays, getColorArr3 as getColorArr3Utils,
    getIntensity as getIntensityUtils, isColorDirty as isColorDirtyUtils, isIntensityDirty as isIntensityDirtyUtils,
    isAttenuationDirty as isAttenuationDirtyUtils, cleanColorDirty as cleanColorDirtyUtils,
    cleanIntensityDirty as cleanIntensityDirtyUtils, cleanAttenuationDirty as cleanAttenuationDirtyUtils,
    cleanPositionDirty as cleanPositionDirtyUtils, isPositionDirty as isPositionDirtyUtils, getColorDataSize,
    getIntensityDataSize, getConstantDataSize, getQuadraticDataSize, getRangeDataSize
} from "../../renderer/utils/worker/render_file/light/pointLightUtils";
import { Log } from "../../utils/Log";
import { getPointLightBufferCount } from "../../renderer/utils/light/bufferUtils";
import { isInit } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import {
    getDirtyDataSize
} from "../../renderer/utils/worker/render_file/light/specifyLightUtils";
import { getLinearDataSize } from "../../renderer/utils/worker/render_file/light/pointLightUtils";
import { Map } from "immutable";

export const create = ensureFunc((light: PointLight, PointLightData: any) => {
    //todo check: shouldn't create after init(direction, ambient)
    it("shouldn't create after Director->init", () => {
        expect(isInit(DirectorData)).false;
    });
}, (PointLightData: any) => {
    var light = new PointLight();

    light = createSpecifyLight(light, PointLightData);

    return light;
})

export const getPosition = (index: number, ThreeDTransformData: any, GameObjectData: any, PointLightData: any) => {
    return getSpecifyLightPosition(index, ThreeDTransformData, GameObjectData, PointLightData);
}

export const getAllPositionData = (ThreeDTransformData: any, GameObjectData: any, PointLightData: any): Array<Float32Array> => {
    var positionArr: Array<Float32Array> = [];

    for (let i = 0, count = PointLightData.count; i < count; i++) {
        positionArr.push(getPosition(i, ThreeDTransformData, GameObjectData, PointLightData).values);
    }

    return positionArr;
}

export const getColor = (index: number, PointLightData: any) => {
    return getColor3Data(index, PointLightData.colors);
}

export const getColorArr3 = getColorArr3Utils;

export const setColor = (index: number, color: Color, PointLightData: any) => {
    setSpecifyLightColor(index, color, PointLightData.colors);

    markDirty(index, PointLightData.isColorDirtys);
}

export const getIntensity = getIntensityUtils;

export const setIntensity = (index: number, value: number, PointLightData: any) => {
    setSingleValue(PointLightData.intensities, index, value);

    markDirty(index, PointLightData.isIntensityDirtys);
}

export const getConstant = getConstantUtils;

export const setConstant = (index: number, value: number, PointLightData: any) => {
    setSingleValue(PointLightData.constants, index, value);

    markDirty(index, PointLightData.isAttenuationDirtys);
}

export const getLinear = getLinearUtils;

export const setLinear = (index: number, value: number, PointLightData: any) => {
    setSingleValue(PointLightData.linears, index, value);

    markDirty(index, PointLightData.isAttenuationDirtys);
}

export const getQuadratic = getQuadraticUtils;

export const setQuadratic = (index: number, value: number, PointLightData: any) => {
    setSingleValue(PointLightData.quadratics, index, value);

    markDirty(index, PointLightData.isAttenuationDirtys);
}

export const getRange = getRangeUtils;

export const setRange = (index: number, value: number, PointLightData: any) => {
    setSingleValue(PointLightData.ranges, index, value);

    markDirty(index, PointLightData.isAttenuationDirtys);
}

export const setRangeLevel = (index: number, value: number, PointLightData: any) => {
    switch (value) {
        case 0:
            setRange(index, 7, PointLightData);
            setLinear(index, 0.7, PointLightData);
            setQuadratic(index, 1.8, PointLightData);
            break;
        case 1:
            setRange(index, 13, PointLightData);
            setLinear(index, 0.35, PointLightData);
            setQuadratic(index, 0.44, PointLightData);
            break;
        case 2:
            setRange(index, 20, PointLightData);
            setLinear(index, 0.22, PointLightData);
            setQuadratic(index, 0.20, PointLightData);
            break;
        case 3:
            setRange(index, 32, PointLightData);
            setLinear(index, 0.14, PointLightData);
            setQuadratic(index, 0.07, PointLightData);
            break;
        case 4:
            setRange(index, 50, PointLightData);
            setLinear(index, 0.09, PointLightData);
            setQuadratic(index, 0.032, PointLightData);
            break;
        case 5:
            setRange(index, 65, PointLightData);
            setLinear(index, 0.07, PointLightData);
            setQuadratic(index, 0.017, PointLightData);
            break;
        case 6:
            setRange(index, 100, PointLightData);
            setLinear(index, 0.045, PointLightData);
            setQuadratic(index, 0.0075, PointLightData);
            break;
        case 7:
            setRange(index, 160, PointLightData);
            setLinear(index, 0.027, PointLightData);
            setQuadratic(index, 0.0028, PointLightData);
            break;
        case 8:
            setRange(index, 200, PointLightData);
            setLinear(index, 0.022, PointLightData);
            setQuadratic(index, 0.0019, PointLightData);
            break;
        case 9:
            setRange(index, 325, PointLightData);
            setLinear(index, 0.014, PointLightData);
            setQuadratic(index, 0.0007, PointLightData);
            break;
        case 10:
            setRange(index, 600, PointLightData);
            setLinear(index, 0.007, PointLightData);
            setQuadratic(index, 0.0002, PointLightData);
            break;
        case 11:
            setRange(index, 3250, PointLightData);
            setLinear(index, 0.0014, PointLightData);
            setQuadratic(index, 0.000007, PointLightData);
            break;
        default:
            Log.error(true, "over point light range");
            break;
    }

    markDirty(index, PointLightData.isAttenuationDirtys);
}

export const initDataHelper = (PointLightData: any) => {
    var count = getPointLightBufferCount(),
        size = Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() + getIntensityDataSize() + getConstantDataSize() + getLinearDataSize() + getQuadraticDataSize() + getRangeDataSize()) + Uint8Array.BYTES_PER_ELEMENT * (getDirtyDataSize() * 4),
        buffer: any = null;

    buffer = createSharedArrayBufferOrArrayBuffer(count * size);

    initSpecifyLightData(buffer, PointLightData);

    createTypeArrays(buffer, count, PointLightData);

    PointLightData.defaultIntensity = 1;
    PointLightData.defaultConstant = 1;
    PointLightData.defaultLinear = 0.07;
    PointLightData.defaultQuadratic = 0.017;
    PointLightData.defaultRange = 65;

    _setDefaultTypeArrData(count, PointLightData);
}

const _setDefaultTypeArrData = (count: number, PointLightData: any) => {
    var color = createDefaultColor(),
        intensity = PointLightData.defaultIntensity,
        constant = PointLightData.defaultConstant,
        linear = PointLightData.defaultLinear,
        quadratic = PointLightData.defaultQuadratic,
        range = PointLightData.defaultRange;

    /*!
    no need to set default dirty
     */

    for (let i = 0; i < count; i++) {
        setColor(i, color, PointLightData);
        setIntensity(i, intensity, PointLightData);
        setConstant(i, constant, PointLightData);
        setLinear(i, linear, PointLightData);
        setQuadratic(i, quadratic, PointLightData);
        setRange(i, range, PointLightData);
    }
}

export const disposeComponent = (component: Light, PointLightData: any) => {
    var intensityDataSize = getIntensityDataSize(),
        constantDataSize = getConstantDataSize(),
        linearDataSize = getLinearDataSize(),
        quadraticDataSize = getQuadraticDataSize(),
        rangeDataSize = getRangeDataSize(),
        dirtyDataSize = getDirtyDataSize(),
        sourceIndex = component.index,
        lastComponentIndex: number = null;

    lastComponentIndex = disposeSpecifyLightComponent(sourceIndex, PointLightData);

    deleteOneItemBySwapAndReset(sourceIndex * intensityDataSize, lastComponentIndex * intensityDataSize, PointLightData.intensities, PointLightData.defaultIntensity);
    deleteOneItemBySwapAndReset(sourceIndex * constantDataSize, lastComponentIndex * constantDataSize, PointLightData.constants, PointLightData.defaultConstant);
    deleteOneItemBySwapAndReset(sourceIndex * linearDataSize, lastComponentIndex * linearDataSize, PointLightData.linears, PointLightData.defaultLinear);
    deleteOneItemBySwapAndReset(sourceIndex * quadraticDataSize, lastComponentIndex * quadraticDataSize, PointLightData.quadratics, PointLightData.defaultQuadratic);
    deleteOneItemBySwapAndReset(sourceIndex * rangeDataSize, lastComponentIndex * rangeDataSize, PointLightData.ranges, PointLightData.defaultRange);

    deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, PointLightData.isPositionDirtys, PointLightData.defaultDirty);
    deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, PointLightData.isColorDirtys, PointLightData.defaultDirty);
    deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, PointLightData.isIntensityDirtys, PointLightData.defaultDirty);
    deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, PointLightData.isAttenuationDirtys, PointLightData.defaultDirty);

    return lastComponentIndex;
}

export const init = (PointLightData: any, state: Map<any, any>) => {
    return bindChangePositionEvent(PointLightData, state);
}

export const isPositionDirty = isPositionDirtyUtils;

export const isColorDirty = isColorDirtyUtils;

export const isIntensityDirty = isIntensityDirtyUtils;

export const isAttenuationDirty = isAttenuationDirtyUtils;

export const cleanPositionDirty = cleanPositionDirtyUtils;

export const cleanColorDirty = cleanColorDirtyUtils;

export const cleanIntensityDirty = cleanIntensityDirtyUtils;

export const cleanAttenuationDirty = cleanAttenuationDirtyUtils;

