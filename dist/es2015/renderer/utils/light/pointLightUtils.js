import { getColorArr3 as getColorArr3Utils, getSingleSizeData } from "../common/operateBufferDataUtils";
import { getColor3Data } from "../../../component/utils/operateBufferDataUtils";
import { getColorDataSize as getSpecifyLightColorDataSize } from "./specifyLightUtils";
export var getColor = function (index, PointLightDataFromSystem) {
    return getColor3Data(index, PointLightDataFromSystem.colors);
};
export var getColorArr3 = function (index, PointLightDataFromSystem) {
    return getColorArr3Utils(index, PointLightDataFromSystem);
};
export var getIntensity = function (index, PointLightDataFromSystem) {
    return getSingleSizeData(index, PointLightDataFromSystem.intensities);
};
export var getConstant = function (index, PointLightDataFromSystem) {
    return getSingleSizeData(index, PointLightDataFromSystem.constants);
};
export var getLinear = function (index, PointLightDataFromSystem) {
    return getSingleSizeData(index, PointLightDataFromSystem.linears);
};
export var getQuadratic = function (index, PointLightDataFromSystem) {
    return getSingleSizeData(index, PointLightDataFromSystem.quadratics);
};
export var getRange = function (index, PointLightDataFromSystem) {
    return getSingleSizeData(index, PointLightDataFromSystem.ranges);
};
export var getColorDataSize = getSpecifyLightColorDataSize;
export var getIntensityDataSize = function () { return 1; };
export var getConstantDataSize = function () { return 1; };
export var getLinearDataSize = function () { return 1; };
export var getQuadraticDataSize = function () { return 1; };
export var getRangeDataSize = function () { return 1; };
export var createTypeArrays = function (buffer, count, PointLightDataFromSystem) {
    var offset = 0;
    PointLightDataFromSystem.colors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();
    PointLightDataFromSystem.intensities = new Float32Array(buffer, offset, count * getIntensityDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getIntensityDataSize();
    PointLightDataFromSystem.constants = new Float32Array(buffer, offset, count * getConstantDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getConstantDataSize();
    PointLightDataFromSystem.linears = new Float32Array(buffer, offset, count * getLinearDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getLinearDataSize();
    PointLightDataFromSystem.quadratics = new Float32Array(buffer, offset, count * getQuadraticDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getQuadraticDataSize();
    PointLightDataFromSystem.ranges = new Float32Array(buffer, offset, count * getRangeDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getRangeDataSize();
};
//# sourceMappingURL=pointLightUtils.js.map