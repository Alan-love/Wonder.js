import { ClassUtils } from "../utils/ClassUtils";
var _generateTypeID = function () {
    var result = _typeID;
    _typeID += 1;
    return String(result);
};
export var getTypeIDFromClass = function (_class) {
    return _table[ClassUtils.getClassNameByClass(_class)];
};
export var getTypeIDFromComponent = function (component) {
    return _table[ClassUtils.getClassNameByInstance(component)];
};
var _addTypeID = function (componentClassNameArr, table) {
    var id = _generateTypeID();
    for (var _i = 0, componentClassNameArr_1 = componentClassNameArr; _i < componentClassNameArr_1.length; _i++) {
        var className = componentClassNameArr_1[_i];
        table[className] = id;
    }
};
var _typeID = 1;
var _table = {};
_addTypeID(["ThreeDTransform"], _table);
_addTypeID(["Geometry", "BoxGeometry", "CustomGeometry"], _table);
_addTypeID(["Material", "BasicMaterial"], _table);
_addTypeID(["MeshRenderer"], _table);
_addTypeID(["Tag"], _table);
_addTypeID(["CameraController"], _table);
//# sourceMappingURL=ComponentTypeIDManager.js.map