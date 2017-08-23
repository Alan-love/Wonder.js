import { ClassUtils } from "../utils/ClassUtils";
var _generateComponentId = function () {
    var result = _componentId;
    _componentId += 1;
    return String(result);
};
export var getComponentIdFromClass = function (_class) {
    return _table[ClassUtils.getClassNameByClass(_class)];
};
export var getComponentIdFromComponent = function (component) {
    return _table[ClassUtils.getClassNameByInstance(component)];
};
var _addComponentId = function (componentClassNameArr, table) {
    var id = _generateComponentId();
    for (var _i = 0, componentClassNameArr_1 = componentClassNameArr; _i < componentClassNameArr_1.length; _i++) {
        var className = componentClassNameArr_1[_i];
        table[className] = id;
    }
};
var _componentId = 1;
var _table = {};
_addComponentId(["ThreeDTransform"], _table);
_addComponentId(["Geometry", "BoxGeometry", "CustomGeometry"], _table);
_addComponentId(["Material", "BasicMaterial", "LightMaterial"], _table);
_addComponentId(["MeshRenderer"], _table);
_addComponentId(["Tag"], _table);
_addComponentId(["CameraController"], _table);
_addComponentId(["Light", "AmbientLight", "DirectionLight", "PointLight"], _table);
//# sourceMappingURL=ComponentComponentIdManager.js.map