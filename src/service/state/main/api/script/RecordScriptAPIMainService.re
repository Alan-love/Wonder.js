open WonderBsMost;

let create = () => {
  "unsafeGetScriptAttribute":
    (. script, scriptAttributeName, state) =>
      OperateScriptDataMainService.unsafeGetScriptAttribute(
        script,
        scriptAttributeName,
        state,
      ),
  "unsafeGetScriptAttributeFieldValue":
    (. fieldName, attribute) =>
      OperateScriptAttributeDataMainService.unsafeGetScriptAttributeFieldValue(
        fieldName,
        attribute,
      ),
  "setScriptAttributeFieldValue":
    (. script, (scriptAttributeName, fieldName, value), state) =>
      OperateScriptDataMainService.setScriptAttributeFieldValue(
        script,
        (scriptAttributeName, fieldName, value),
        state,
      ),
  "replaceScriptEventFunctionData":
    (.
      script,
      (sourceScriptEventFunctionDataName, targetScriptEventFunctionDataName),
      targetScriptEventFunctionData,
      state,
    ) =>
      ScriptAPI.replaceScriptEventFunctionData(
        script,
        (
          sourceScriptEventFunctionDataName,
          targetScriptEventFunctionDataName,
        ),
        targetScriptEventFunctionData,
        state,
      ),
  "addScriptAttribute":
    (. script, scriptAttributeName, scriptAttribute, state) =>
      ScriptAPI.addScriptAttribute(
        script,
        scriptAttributeName,
        scriptAttribute,
        state,
      ),
  "unsafeGetScriptGameObject":
    (. script, state) => ScriptAPI.unsafeGetScriptGameObject(script, state),
  "getTransformLocalPosition":
    (. transform, state) =>
      TransformAPI.getTransformLocalPosition(transform, state),
  "setTransformLocalPosition":
    (. transform, localPosition, state) =>
      TransformAPI.setTransformLocalPosition(transform, localPosition, state),
  "unsafeGetGameObjectTransformComponent":
    (. gameObject, state) =>
      GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state),
  "disposeGameObject":
    (. gameObject, state) =>
      GameObjectAPI.disposeGameObject(gameObject, state),
  "initGameObject":
    (. gameObject, state) => GameObjectAPI.initGameObject(gameObject, state),
  "getAllGameObjects":
    (. gameObject, state) =>
      GameObjectAPI.getAllGameObjects(gameObject, state),
  "findGameObjectsByName":
    (. name, state) => SceneAPI.findGameObjectsByName(name, state),
  "unsafeGetState": () =>
    StateDataMainService.unsafeGetState(StateDataMain.stateData),
  "setState":
    (. state) =>
      StateDataMainService.setState(StateDataMain.stateData, state),
  /* "concatExecStreamArr":
     (. streamArr) => MostUtils.concatExecStreamArr(streamArr), */
  "getAssetBundlePath": (.) => LoadABSystem.getAssetBundlePath(),
  "isAssetBundleArrayBufferCached":
    (. abRelativePath, hashId) =>
      LoadABSystem.isAssetBundleArrayBufferCached(abRelativePath, hashId),
  "getAssetBundleArrayBufferCache":
    (. abRelativePath) =>
      LoadABSystem.getAssetBundleArrayBufferCache(abRelativePath),
  "cacheAssetBundleArrayBuffer":
    (. abRelativePath, ab, hashId) =>
      LoadABSystem.cacheAssetBundleArrayBuffer(abRelativePath, ab, hashId),
  "loadAssetBundle":
    (. abPath) => LoadABSystem.load(abPath, FetchCommon.fetch),
  "parseWABManifest": (. wab) => ParseABSystem.WAB.parseManifest(wab),
  "getWholeDependencyRelationMap":
    (. wabManifest) =>
      ParseABSystem.WAB.getWholeDependencyRelationMap(wabManifest),
  "setWholeDependencyRelationMap":
    (. wabRelativePath, wholeDependencyRelationMap, state) =>
      OperateWABAssetBundleMainService.setWholeDependencyRelationMap(
        wabRelativePath,
        wholeDependencyRelationMap,
        state,
      ),
  "loadAndAssembleAllDependencyRAB":
    (.
      abRelativePath,
      wholeManifest,
      (
        getAssetBundlePathFunc,
        isAssetBundleArrayBufferCachedFunc,
        getAssetBundleArrayBufferCacheFunc,
        cacheAssetBundleArrayBufferFunc,
      ),
    ) =>
      ImportABSystem.RAB.loadAndAssembleAllDependencyRAB(
        abRelativePath,
        wholeManifest,
        (
          getAssetBundlePathFunc,
          isAssetBundleArrayBufferCachedFunc,
          getAssetBundleArrayBufferCacheFunc,
          cacheAssetBundleArrayBufferFunc,
          FetchCommon.fetch,
        ),
      ),
  "loadSABAndSetToState":
    (.
      sabRelativePath,
      wholeManifest,
      (
        getAssetBundlePathFunc,
        isAssetBundleArrayBufferCachedFunc,
        getAssetBundleArrayBufferCacheFunc,
        cacheAssetBundleArrayBufferFunc,
      ),
    ) =>
      ImportABSystem.SAB.loadSABAndSetToState(
        sabRelativePath,
        wholeManifest,
        (
          getAssetBundlePathFunc,
          isAssetBundleArrayBufferCachedFunc,
          getAssetBundleArrayBufferCacheFunc,
          cacheAssetBundleArrayBufferFunc,
          FetchCommon.fetch,
        ),
      ),
  "isSABLoaded":
    (. sabRelativePath, state) =>
      OperateSABAssetBundleMainService.isLoaded(sabRelativePath, state),
  "assembleSAB":
    (. sabRelativePath, sab, wholeDependencyRelationMap) =>
      AssembleABSystem.SAB.assemble(
        sabRelativePath,
        sab,
        wholeDependencyRelationMap,
      ),
  "unsafeGetLoadedSAB":
    (. sabRelativePath, state) =>
      OperateSABAssetBundleMainService.unsafeGetLoadedSAB(
        sabRelativePath,
        state,
      ),
  "unsafeGetWholeDependencyRelationMap":
    (. wabRelativePath, state) =>
      OperateWABAssetBundleMainService.unsafeGetWholeDependencyRelationMap(
        wabRelativePath,
        state,
      ),
  "disposeSceneAllChildren":
    (. state) => ImportABSystem.disposeSceneAllChildren(state),
  "setSABSceneGameObjectToBeScene":
    (. sabSceneGameObject, state) =>
      ImportABSystem.setSABSceneGameObjectToBeScene(
        sabSceneGameObject,
        state,
      ),
  "initAllSABGameObjects":
    (. sabSceneGameObject, state) =>
      ImportABSystem.initAllSABGameObjects(sabSceneGameObject, state),
  "addSABSceneGameObjectChildrenToScene":
    (. sabSceneGameObject, state) =>
      ImportABSystem.addSABSceneGameObjectChildrenToScene(
        sabSceneGameObject,
        state,
      ),
  "getAllDependencyRABCount":
    (. abRelativePath, wabRelativePath, state) =>
      ProgressABSystem.RAB.getAllDependencyRABCount(
        abRelativePath,
        wabRelativePath,
        state,
      ),
  "getLoadedDependencyRABCount":
    (. abRelativePath, wabRelativePath, state) =>
      ProgressABSystem.RAB.getLoadedDependencyRABCount(
        abRelativePath,
        wabRelativePath,
        state,
      ),
  "isRABAssembled":
    (. rabRelativePath, state) =>
      OperateRABAssetBundleMainService.isAssembled(rabRelativePath, state),
  "unsafeFindScriptEventFunctionDataByName":
    (. rabRelativePath, name, state) =>
      OperateRABAssetBundleMainService.unsafeFindScriptEventFunctionDataByName(
        rabRelativePath,
        name,
        state,
      ),
  "unsafeFindScriptAttributeByName":
    (. rabRelativePath, name, state) =>
      OperateRABAssetBundleMainService.unsafeFindScriptAttributeByName(
        rabRelativePath,
        name,
        state,
      ),
};