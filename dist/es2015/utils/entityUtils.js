export var removeChildEntity = function (children, targetUID) {
    for (var i = 0, len = children.length; i < len; ++i) {
        if (children[i].uid === targetUID) {
            children.splice(i, 1);
            break;
        }
    }
};
//# sourceMappingURL=entityUtils.js.map