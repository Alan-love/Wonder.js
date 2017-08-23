import {
    addActiveTexture as addActiveTextureUtils, clearAllBindTextureUnitCache as clearAllBindTextureUnitCacheUtils, initData as initDataUtils,
    isCached as isCachedUtils
} from "../utils/worker/render_file/texture/textureCacheUtils";

export var isCached = isCachedUtils;

export var addActiveTexture = addActiveTextureUtils;

export var clearAllBindTextureUnitCache = clearAllBindTextureUnitCacheUtils;

export var initData = initDataUtils;

