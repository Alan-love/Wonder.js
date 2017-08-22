import { SpecifyLightData } from "./SpecifyLightData";
import { DirectionLightGLSLDataStructure } from "../../renderer/type/dataType";

export abstract class DirectionLightData extends SpecifyLightData {
    public static intensities: Float32Array = null;
    public static isPositionDirtys: Uint8Array = null;
    public static isIntensityDirtys: Uint8Array = null;

    public static defaultIntensity: number = null;
}
