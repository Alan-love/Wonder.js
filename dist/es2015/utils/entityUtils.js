export var removeChildEntity = function (children, targetUId) {
    for (var i = 0, len = children.length; i < len; ++i) {
        if (children[i].uid === targetUId) {
            children.splice(i, 1);
            break;
        }
    }
};
//# sourceMappingURL=entityUtils.js.map