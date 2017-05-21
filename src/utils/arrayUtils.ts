export var deleteBySwap = (array:Array<any>, index:number) => {
    var last = array.length - 1,
        temp = array[last];

    array[last] = array[index];
    array[index] = temp;

    array.pop();
}

export var hasDuplicateItems = (arr: Array<any>) => {
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

var _contain = (arr: Array<any>, item: any): boolean => {
    var c: any = null;

    for (let i = 0, len = arr.length; i < len; i++) {
        c = arr[i];

        if (item.uid && c.uid && item.uid == c.uid) {
            return true;
        }
        else if (item === c) {
            return true;
        }
    }

    return false;
}
