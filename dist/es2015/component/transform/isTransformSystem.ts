import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { BatchTransformData } from "./ThreeDTransform";

export const getIsTranslate = (uid: number, ThreeDTransformData: any) => {
    // return ThreeDTransformData.isTranslateMap.get(uid);
    return ThreeDTransformData.isTranslateMap[uid];
}

export const setIsTranslate = requireCheckFunc((uid: number, isTranslate: boolean, ThreeDTransformData: any) => {
    // it("index should be used", () => {
    //     expect(_isIndexUsed(index)).true;
    // });
}, (uid: number, isTranslate: boolean, ThreeDTransformData: any) => {
    // ThreeDTransformData.isTranslateMap.set(uid, isTranslate);
    ThreeDTransformData.isTranslateMap[uid] = isTranslate;
})

export const isTranslate = (data: BatchTransformData) => {
    return !!data.position || !!data.localPosition;
}

