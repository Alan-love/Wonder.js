import { compose } from "../../utils/functionalUtils";
import curry from "wonder-lodash/curry";
import { addFirstDirtyIndex, generateNotUsedIndexInNormalList } from "./dirtySystem";
import { getUID } from "./utils";
import { getParent as getThreeDTransformDataParent, isParentExist } from "./hierarchySystem";
import {
    getMatrix4DataIndexInArrayBuffer, getQuaternionDataIndexInArrayBuffer, getVector3DataIndexInArrayBuffer,
    moveToIndex,
    setLocalToWorldMatricesData,
    swap
} from "./operateDataSystem";
import { DataUtils } from "../../utils/DataUtils";
import { deleteVal } from "../../utils/objectUtils";
import { getIsTranslate, setIsTranslate } from "./isTransformSystem";
import { Map } from "immutable";

export var update = (elapsed: number, GlobalTempData: any, ThreeDTransformData: any, state: Map<any, any>) => {
    return compose(
        _cleanDirtyList(ThreeDTransformData),
        _updateDirtyList(GlobalTempData, ThreeDTransformData),
        _clearCache(ThreeDTransformData)
    )(state);
}

var _clearCache = curry((ThreeDTransformData: any, state: Map<any, any>) => {
    var count = ThreeDTransformData.count,
        positionCacheMap = ThreeDTransformData.positionCacheMap,
        localPositionCacheMap = ThreeDTransformData.localPositionCacheMap,
        localToWorldMatrixCacheMap = ThreeDTransformData.localToWorldMatrixCacheMap;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        let uid = getUID(i, ThreeDTransformData),
            isTranslate = getIsTranslate(uid, ThreeDTransformData);

        if(isTranslate){
            deleteVal(uid, positionCacheMap);
            deleteVal(uid, localPositionCacheMap);
            deleteVal(uid, localToWorldMatrixCacheMap);

            setIsTranslate(uid, false, ThreeDTransformData);
        }

        //todo clean more cache!
    }
})

var _updateDirtyList = curry((GlobalTempData: any, ThreeDTransformData: any, state: Map<any, any>) => {
    //todo test:ensure parent before child
    _sortParentBeforeChildInDirtyList(ThreeDTransformData);

    let count = ThreeDTransformData.count;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        _transform(i, GlobalTempData, ThreeDTransformData);
    }

    return state;
})

//todo optimize: if transform not transformed in 5 frames, not move off
var _cleanDirtyList = curry((ThreeDTransformData: any, state: Map<any, any>) => {
    var count = ThreeDTransformData.count;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        if (_needMoveOffDirtyList(i)) {
            _moveFromDirtyListToNormalList(i, ThreeDTransformData);
        }
    }

    return state;
})

var _needMoveOffDirtyList = (index: number) => {
    return true;
}

var _moveFromDirtyListToNormalList = (index: number, ThreeDTransformData: any) => {
    ThreeDTransformData.firstDirtyIndex = addFirstDirtyIndex(ThreeDTransformData);

    moveToIndex(index, generateNotUsedIndexInNormalList(ThreeDTransformData), ThreeDTransformData);
}

var _transform = (index: number, GlobalTempData: any, ThreeDTransformData: any) => {
    var vec3Index = getVector3DataIndexInArrayBuffer(index),
        quaIndex = getQuaternionDataIndexInArrayBuffer(index),
        mat4Index = getMatrix4DataIndexInArrayBuffer(index),
        mat = GlobalTempData.matrix4_2.setTRS(
            DataUtils.setVector3ByIndex(GlobalTempData.vector3_1, ThreeDTransformData.localPositions, vec3Index),
            DataUtils.setQuaternionByIndex(GlobalTempData.quaternion_1, ThreeDTransformData.localRotations, quaIndex),
            DataUtils.setVector3ByIndex(GlobalTempData.vector3_2, ThreeDTransformData.localScales, vec3Index)
        ),
        parent = getThreeDTransformDataParent(getUID(index, ThreeDTransformData), ThreeDTransformData);

    if (isParentExist(parent)) {
        let parentIndex = parent.index;

        return setLocalToWorldMatricesData(DataUtils.setMatrix4ByIndex(GlobalTempData.matrix4_1, ThreeDTransformData.localToWorldMatrices, getMatrix4DataIndexInArrayBuffer(parentIndex))
                .multiply(mat),
            mat4Index,
            ThreeDTransformData
        );
    }

    return setLocalToWorldMatricesData(
        mat,
        mat4Index,
        ThreeDTransformData
    );
}

var _sortParentBeforeChildInDirtyList = (ThreeDTransformData: any) => {
    var count = ThreeDTransformData.count;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        let parent = getThreeDTransformDataParent(getUID(i, ThreeDTransformData), ThreeDTransformData);

        if (isParentExist(parent)) {
            let parentIndex = parent.index;

            if (parentIndex > i) {
                swap(parentIndex, i, ThreeDTransformData);
            }
        }
    }
}

