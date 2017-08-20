import { createMap } from "../../../../../../../utils/objectUtils";

export var setEmptyLocationMap = (shaderIndex: number, LocationDataFromSystem: any) => {
    LocationDataFromSystem.uniformLocationMap[shaderIndex] = createMap();
}

export var initData = (LocationDataFromSystem: any) => {
    LocationDataFromSystem.uniformLocationMap = createMap();
}
