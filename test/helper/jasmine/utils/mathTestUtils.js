var mathTestUtils = (function () {
    var Matrix = dy.Matrix;

    return {
        getValues: function (values) {
            var len = 0,
                i = 0,
                result = [];

            len = values.length;

            for (i = 0; i < len; i++) {
                if (values[i] === -0) {
                    result[i] = 0;
                    continue;
                }
                result[i] = YYC.Tool.math.toFixed(values[i], 7);
            }
            return result;
        },
        toFixed: function(num){
            return YYC.Tool.math.toFixed(num, 7);
        },
        isFloat32Array: function(val){
            return Object.prototype.toString.call(val) === "[object Float32Array]";
        },
        isMatrix: function(val){
            return val instanceof Matrix;
        },
        isMatrixEqual: function(mat1, target){
            if(this.isFloat32Array(target)){
                return expect(this.getValues(mat1.values)).toEqual(this.getValues(target));
            }
            else if(this.isMatrix(target)){
                return expect(this.getValues(mat1.values)).toEqual(this.getValues(target.values));
            }
        }
    }
}());

