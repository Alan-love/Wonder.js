export const getColorArr3 = (index: number, DataFromSystem: any) => {
    return getColorArr3Data(index, DataFromSystem.colors);
}

export const getColorArr3Data = (index: number, colors: Float32Array) => {
    var size = 3,
        i = index * size;

    return [colors[i], colors[i + 1], colors[i + 2]];
}

export const getSingleSizeData = (index: number, datas: Uint8Array | Float32Array) => {
    return datas[index];
}

