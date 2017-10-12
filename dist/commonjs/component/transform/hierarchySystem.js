"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var objectUtils_1 = require("../../utils/objectUtils");
var JudgeUtils_1 = require("../../utils/JudgeUtils");
var dirtySystem_1 = require("./dirtySystem");
var entityUtils_1 = require("../../utils/entityUtils");
exports.getParent = contract_1.requireCheckFunc(function (uid, ThreeDTransformData) {
    contract_1.it("uid should exist", function () {
        wonder_expect_js_1.expect(uid).exist;
    });
}, function (uid, ThreeDTransformData) {
    return ThreeDTransformData.parentMap[uid];
});
exports.setParent = contract_1.requireCheckFunc(function (parent, child, ThreeDTransformData) {
    contract_1.it("parent should not be self", function () {
        if (parent !== null) {
            wonder_expect_js_1.expect(_isTransformEqual(child, parent)).false;
        }
    });
}, function (parent, child, ThreeDTransformData) {
    var index = child.index, uid = child.uid, parentIndexInArrayBuffer = null, currentParent = exports.getParent(uid, ThreeDTransformData), isCurrentParentExisit = exports.isParentExist(currentParent);
    if (parent === null) {
        if (isCurrentParentExisit) {
            _removeHierarchyFromParent(currentParent, uid, ThreeDTransformData);
            dirtySystem_1.addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
        }
        return;
    }
    parentIndexInArrayBuffer = parent.index;
    if (isCurrentParentExisit) {
        if (exports.isNotChangeParent(currentParent.index, parentIndexInArrayBuffer)) {
            return;
        }
        _removeHierarchyFromParent(currentParent, uid, ThreeDTransformData);
    }
    _addToParent(uid, child, parent, ThreeDTransformData);
    dirtySystem_1.addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
});
var _isTransformEqual = function (tra1, tra2) { return tra1.uid === tra2.uid; };
exports.getChildren = function (uid, ThreeDTransformData) {
    return ThreeDTransformData.childrenMap[uid];
};
exports.isParentExist = function (parent) { return JudgeUtils_1.isNotUndefined(parent); };
exports.isChildrenExist = function (children) { return JudgeUtils_1.isNotUndefined(children); };
exports.isNotChangeParent = function (currentParentIndexInArrayBuffer, newParentIndexInArrayBuffer) {
    return currentParentIndexInArrayBuffer === newParentIndexInArrayBuffer;
};
exports.removeHierarchyData = function (uid, ThreeDTransformData) {
    objectUtils_1.deleteVal(uid, ThreeDTransformData.childrenMap);
};
var _removeHierarchyFromParent = function (parent, targetUId, ThreeDTransformData) {
    var parentUId = parent.uid, children = exports.getChildren(parentUId, ThreeDTransformData);
    objectUtils_1.deleteVal(targetUId, ThreeDTransformData.parentMap);
    if (objectUtils_1.isNotValidMapValue(children)) {
        return;
    }
    _removeChild(parentUId, targetUId, children, ThreeDTransformData);
};
var _removeChild = function (parentUId, targetUId, children, ThreeDTransformData) {
    entityUtils_1.removeChildEntity(children, targetUId);
};
var _addChild = contract_1.requireCheckFunc(function (uid, child, ThreeDTransformData) {
    contract_1.it("children should be empty array if has no child", function () {
        wonder_expect_js_1.expect(exports.getChildren(uid, ThreeDTransformData)).be.a("array");
    });
}, function (uid, child, ThreeDTransformData) {
    var children = exports.getChildren(uid, ThreeDTransformData);
    children.push(child);
});
exports.setChildren = function (uid, children, ThreeDTransformData) {
    ThreeDTransformData.childrenMap[uid] = children;
};
var _setParent = function (uid, parent, ThreeDTransformData) {
    ThreeDTransformData.parentMap[uid] = parent;
};
var _addToParent = contract_1.requireCheckFunc(function (targetUId, target, parent, ThreeDTransformData) {
    contract_1.it("the child one should not has parent", function () {
        wonder_expect_js_1.expect(objectUtils_1.isValidMapValue(exports.getParent(targetUId, ThreeDTransformData))).false;
    });
    contract_1.it("parent should not already has the child", function () {
        var parentUId = parent.uid, children = exports.getChildren(parentUId, ThreeDTransformData);
        if (objectUtils_1.isValidMapValue(children)) {
            wonder_expect_js_1.expect(children.indexOf(target)).equal(-1);
        }
    });
}, function (targetUId, target, parent, ThreeDTransformData) {
    var parentUId = parent.uid;
    _setParent(targetUId, parent, ThreeDTransformData);
    _addChild(parentUId, target, ThreeDTransformData);
});
//# sourceMappingURL=hierarchySystem.js.map