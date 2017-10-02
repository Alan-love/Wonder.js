import { isNotUndefined, isUndefined } from "./JudgeUtils";
import { it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";

export const deleteVal = (key: number, arr: Array<any>) => arr[key] = void 0;

export const isNotValidVal = (val: any) => isUndefined(val);

export const isValidVal = (val: any) => isNotUndefined(val);

export const deleteBySwap = (index: number, lastIndex: number, array: Array<any>) => {
    if (lastIndex === -1) {
        return null;
    }

    array[index] = array[lastIndex];

    array.pop();
}

export const hasDuplicateItems = (arr: Array<any>) => {
    var noRepeatArr = [],
        hasRepeat: boolean = false;

    for (let item of arr) {
        if (!item) {
            continue;
        }

        if (_contain(noRepeatArr, item)) {
            hasRepeat = true;

            break;
        }

        noRepeatArr.push(item);
    }

    return hasRepeat;
}

const _contain =(arr: Array<any>, item: any): boolean => {
    var c: any = null;

    for (let i = 0, len = arr.length; i < len; i++) {
        c = arr[i];

        // if (item.uid && c.uid && item.uid == c.uid) {
        //     return true;
        // }
        // else if (item === c) {
        if (item === c) {
            return true;
        }
    }

    return false;
}

export const removeDuplicateItems = (arr: Array<any>) => {
    var resultArr = [];

    for (let ele of arr) {
        // if (_contain(resultArr, function(val) {
        //         return isEqual(val, ele);
        //     })) {
        if (_contain(resultArr, ele)) {
            continue;
        }

        resultArr.push(ele);
    };

    return resultArr;
}

export const removeItem = (arr: Array<any>, item: any) => {
    return filter(arr, (ele) => {
        return ele !== item;
    });
}

export const replaceItem = (arr: Array<any>, oldItem: any, newItem:any) => {
    for(let i = 0, len = arr.length; i < len; i++){
        let val = arr[i];

        if(val === oldItem){
            arr[i] = newItem;
        }
    }

    return arr;
}

export const map = (arr: Array<any>, func: (item: any) => any) => {
    return arr.map(func);
}

export const filter = (arr: Array<any>, func: (item: any) => boolean) => {
    let result = [];

    if (isUndefined(arr)) {
        return result;
    }

    for (let ele of arr) {
        if (func(ele)) {
            result.push(ele);
        }
    }

    return result;
}

export const forEach = (arr: Array<any>, func: (item: any, index: number) => void) => {
    if (isUndefined(arr)) {
        return;
    }

    for (let i = 0, len = arr.length; i < len; i++) {
        func(arr[i], i);
    }
}

export const forEachPair = requireCheckFunc(([arr1, arr2], func:(item1:any, item2:any, index:number) => void) =>{
    it("pair arrays->length should equal", () => {
        expect(arr1.length).equal(arr2.length);
    });
}, ([arr1, arr2], func:(item1:any, item2:any, index:number) => void) => {
    for (let i = 0, len = arr1.length; i < len; i++) {
        func(arr1[i], arr2[i], i);
    }
})

export const mapPair = requireCheckFunc(([arr1, arr2], func:(item1:any, item2:any, index:number) => void) =>{
    it("pair arrays->length should equal", () => {
        expect(arr1.length).equal(arr2.length);
    });
}, ([arr1, arr2], func:(item1:any, item2:any, index:number) => void) => {
    var result:Array<any> = [];

    for (let i = 0, len = arr1.length; i < len; i++) {
        result.push(func(arr1[i], arr2[i], i));
    }

    return result;
})
