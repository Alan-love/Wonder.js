import { GameObject } from "./GameObject";
import { Component } from "../../../component/Component";
import { createMap, deleteVal, isValidMapValue } from "../../../utils/objectUtils";
import { setParent as setThreeDTransformParent } from "../../../component/transform/ThreeDTransformSystem";
import { GameObjectComponentData } from "./GameObjectData";
import { ensureFunc, it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { ThreeDTransform } from "../../../component/transform/ThreeDTransform";
import { isNotUndefined } from "../../../utils/JudgeUtils";
import { execHandle, execInitHandle } from "../../../component/ComponentSystem";
import { Geometry } from "../../../component/geometry/Geometry";
import { Material } from "../../../component/material/Material";
import { filter, forEach } from "../../../utils/arrayUtils";
import { Map as MapImmutable } from "immutable";
import { removeChildEntity } from "../../../utils/entityUtils";
import { isDisposeTooManyComponents, reAllocateGameObject } from "../../../utils/memoryUtils";
import { getComponentIdFromClass, getComponentIdFromComponent } from "../../../component/ComponentComponentIdManager";
import { IUIdEntity } from "./IUIdEntity";
import { MeshRenderer } from "../../../component/renderer/MeshRenderer";
import { create as createMeshRenderer } from "../../../component/renderer/MeshRendererSystem";

export var create = ensureFunc((gameObject: GameObject, transform: ThreeDTransform, GameObjectData: any) => {
    it("componentMap should has data", () => {
        expect(_getComponentData(gameObject.uid, GameObjectData)).exist;
    });
}, (transform: ThreeDTransform, GameObjectData: any) => {
    var gameObject: GameObject = new GameObject(),
        uid = _buildUId(GameObjectData);

    gameObject.uid = uid;

    GameObjectData.aliveUIdArray.push(uid);

    if (!transform) {
        _setComponentData(uid, {}, GameObjectData);
    }
    else {
        addComponent(gameObject, transform, GameObjectData);
    }

    return gameObject;
})

var _buildUId = (GameObjectData: any) => {
    return GameObjectData.uid++;
}

export var isAlive = (entity: IUIdEntity, GameObjectData: any) => {
    return isValidMapValue(_getComponentData(entity.uid, GameObjectData));
}

export var isNotAlive = (entity: IUIdEntity, GameObjectData: any) => {
    return !isAlive(entity, GameObjectData);
}

export var initGameObject = (gameObject: GameObject, state: MapImmutable<any, any>, GameObjectData: any) => {
    var uid = gameObject.uid,
        componentData: GameObjectComponentData = _getComponentData(uid, GameObjectData);

    for (let typeId in componentData) {
        if (componentData.hasOwnProperty(typeId)) {
            execInitHandle(typeId, componentData[typeId].index, state);
        }
    }
}

export var dispose = (entity: IUIdEntity, ThreeDTransformData: any, GameObjectData: any) => {
    _diposeAllDatas(entity, GameObjectData);

    GameObjectData.disposeCount += 1;

    if (isDisposeTooManyComponents(GameObjectData.disposeCount)) {
        reAllocateGameObject(GameObjectData);

        GameObjectData.disposeCount = 0;
    }
}

var _removeFromChildrenMap = (parentUId: number, childUId: number, GameObjectData: any) => {
    removeChildEntity(getChildren(parentUId, GameObjectData), childUId);
};

var _diposeAllDatas = (gameObject: GameObject, GameObjectData: any) => {
    let uid = gameObject.uid,
        children = getChildren(uid, GameObjectData);

    _disposeAllComponents(gameObject, GameObjectData);
    _disposeMapDatas(uid, GameObjectData);

    if (_isChildrenExist(children)) {
        forEach(children, (child: GameObject) => {
            if (isNotAlive(child, GameObjectData)) {
                return;
            }

            _diposeAllDatas(child, GameObjectData);
        })
    }
}

var _disposeMapDatas = (uid: number, GameObjectData: any) => {
    deleteVal(uid, GameObjectData.childrenMap);
    // deleteVal(uid, GameObjectData.parentMap);
    deleteVal(uid, GameObjectData.componentMap);
}

var _disposeAllComponents = (gameObject: GameObject, GameObjectData: any) => {
    var components = _getComponentData(gameObject.uid, GameObjectData);

    //todo optimize?
    for (let typeId in components) {
        if (components.hasOwnProperty(typeId)) {
            let component = components[typeId];

            execHandle(component, "disposeHandleMap");
        }
    }
}

export var addComponent = requireCheckFunc((gameObject: GameObject, component: Component, GameObjectData: any) => {
    it("component should exist", () => {
        expect(component).exist;
    });
    it("should not has this type of component, please dispose it", () => {
        expect(hasComponent(gameObject, getComponentIdFromComponent(component), GameObjectData)).false;
    });
}, (gameObject: GameObject, component: Component, GameObjectData: any) => {
    var uid = gameObject.uid,
        componentId = getComponentIdFromComponent(component),
        data = _getComponentData(uid, GameObjectData);

    execHandle(component, "addComponentHandleMap", [component, gameObject]);

    if (!data) {
        let d = {};

        d[componentId] = component;
        _setComponentData(uid, d, GameObjectData);

        return;
    }

    data[componentId] = component;
})

var _removeComponent = (componentId: string, uid: number, GameObjectData: any) => {
    var data = _getComponentData(uid, GameObjectData);

    if (isValidMapValue(data)) {
        deleteVal(componentId, data);
    }
}

// export var removeComponent = (gameObject:GameObject, component: Component, GameObjectData:any) => {
//     _removeComponent(getTypeIdFromComponent(component), gameObject, component, GameObjectData);
// }

export var disposeComponent = (uid: number, component: Component, GameObjectData: any) => {
    var componentId = getComponentIdFromComponent(component);

    _removeComponent(componentId, uid, GameObjectData);

    execHandle(component, "disposeHandleMap");
}

export var getComponent = (uid: number, componentId: string, GameObjectData: any) => {
    var data = _getComponentData(uid, GameObjectData);

    if (isValidMapValue(data)) {
        let component = data[componentId];

        return isValidMapValue(component) ? component : null;
    }

    return null;
}

var _getComponentData = (uid: number, GameObjectData: any) => GameObjectData.componentMap[uid];

var _setComponentData = (uid: number, data: GameObjectComponentData, GameObjectData: any) => GameObjectData.componentMap[uid] = data;

export var hasComponent = (gameObject: GameObject, componentId: string, GameObjectData: any) => {
    return getComponent(gameObject.uid, componentId, GameObjectData) !== null;
}

export var getTransform = (uid: number, GameObjectData: any) => {
    return getComponent(uid, getComponentIdFromClass(ThreeDTransform), GameObjectData);
}

export var getGeometry = (uid: number, GameObjectData: any) => {
    return getComponent(uid, getComponentIdFromClass(Geometry), GameObjectData);
}

export var getMaterial = (uid: number, GameObjectData: any) => {
    return getComponent(uid, getComponentIdFromClass(Material), GameObjectData);
}

export var getMeshRenderer = (uid: number, GameObjectData: any) => {
    return getComponent(uid, getComponentIdFromClass(MeshRenderer), GameObjectData);
}

var _isParentExist = (parent: GameObject) => isNotUndefined(parent);

var _isChildrenExist = (children: Array<GameObject>) => isNotUndefined(children);

var _isComponentExist = (component: Component) => component !== null;

var _isGameObjectEqual = (gameObject1: GameObject, gameObject2: GameObject) => gameObject1.uid === gameObject2.uid;

export var getParent = (uid: number, GameObjectData: any) => GameObjectData.parentMap[uid];

export var setParent = (child: GameObject, parent: GameObject, ThreeDTransformData: any, GameObjectData: any) => {
    var parentUId: number = parent.uid,
        childUId: number = child.uid,
        transform = getTransform(parentUId, GameObjectData),
        childOriginParent: GameObject = getParent(childUId, GameObjectData);

    if (_isParentExist(childOriginParent)) {
        removeChildWithoutDisposeMeshRenderer(childOriginParent.uid, childUId, ThreeDTransformData, GameObjectData);
    }

    _setParent(childUId, parent, GameObjectData);

    if (_isComponentExist(transform)) {
        setThreeDTransformParent(getTransform(childUId, GameObjectData), transform, ThreeDTransformData);
    }

    _addChild(parentUId, child, GameObjectData);
}

var _setParent = (uid: number, parent: GameObject, GameObjectData: any) => {
    GameObjectData.parentMap[uid] = parent;
}

export var getChildren = (uid: number, GameObjectData: any) => {
    return GameObjectData.childrenMap[uid];
}

export var setChildren = (uid: number, children: Array<GameObject>, GameObjectData: any) => {
    GameObjectData.childrenMap[uid] = children;
}


export var getAliveChildren = (uid: number, GameObjectData: any) => {
    return filter(getChildren(uid, GameObjectData), (gameObject: GameObject) => {
        return isAlive(gameObject, GameObjectData);
    })
}

var _addChild = (uid: number, child: GameObject, GameObjectData: any) => {
    var children = getChildren(uid, GameObjectData);

    if (isValidMapValue(children)) {
        children.push(child);
    }
    else {
        setChildren(uid, [child], GameObjectData);
    }
}

export var addChild = requireCheckFunc((gameObject: GameObject, child: GameObject, ThreeDTransformData: any, GameObjectData: any) => {
}, (gameObject: GameObject, child: GameObject, ThreeDTransformData: any, GameObjectData: any) => {
    setParent(child, gameObject, ThreeDTransformData, GameObjectData);
})

export var addRemovedChild = (gameObject: GameObject, child: GameObject, MeshRendererData: any, ThreeDTransformData: any, GameObjectData: any) => {
    setParent(child, gameObject, ThreeDTransformData, GameObjectData);

    addComponent(child, createMeshRenderer(MeshRendererData), GameObjectData);
}

export var removeChild = (parentUId: number, childUId: number, ThreeDTransformData: any, GameObjectData: any) => {
    var meshRenderer = getMeshRenderer(childUId, GameObjectData);

    if (_isComponentExist(meshRenderer)) {
        disposeComponent(childUId, getMeshRenderer(childUId, GameObjectData), GameObjectData);
    }

    _removeChildWithoutDisposeMeshRenderer(parentUId, childUId, ThreeDTransformData, GameObjectData);
}

export var removeChildWithoutDisposeMeshRenderer = (parentUId: number, childUId: number, ThreeDTransformData: any, GameObjectData: any) => {
    _removeChildWithoutDisposeMeshRenderer(parentUId, childUId, ThreeDTransformData, GameObjectData);
}

var _removeChildWithoutDisposeMeshRenderer = requireCheckFunc((parentUId: number, childUId: number, ThreeDTransformData: any, GameObjectData: any) => {
    it("child should has transform component", () => {
        expect(getTransform(childUId, GameObjectData)).exist;
    });
}, (parentUId: number, childUId: number, ThreeDTransformData: any, GameObjectData: any) => {
    deleteVal(childUId, GameObjectData.parentMap);

    setThreeDTransformParent(getTransform(childUId, GameObjectData), null, ThreeDTransformData);

    _removeFromChildrenMap(parentUId, childUId, GameObjectData);
})

export var hasChild = (gameObject: GameObject, child: GameObject, GameObjectData: any) => {
    if (isNotAlive(gameObject, GameObjectData) || isNotAlive(child, GameObjectData)) {
        return false;
    }

    let parent = getParent(child.uid, GameObjectData);

    if (!_isParentExist(parent) || isNotAlive(parent, GameObjectData)) {
        return false;
    }

    return _isGameObjectEqual(parent, gameObject);
}

export var initData = (GameObjectData: any) => {
    GameObjectData.uid = 0;

    GameObjectData.componentMap = createMap();
    GameObjectData.parentMap = createMap();
    GameObjectData.childrenMap = createMap();

    GameObjectData.disposeCount = 0;

    GameObjectData.aliveUIdArray = [];
}
