

import * as GroupService$Wonderjs from "../../../../primitive/GroupService.js";

function getGroupCount(material, record) {
  return GroupService$Wonderjs.getGroupCount(material, record[/* groupCountMap */9]);
}

function isGroupMaterial(material, record) {
  return GroupService$Wonderjs.isGroupComponent(material, record[/* groupCountMap */9]);
}

function increaseGroupCount(material, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* colors */record[/* colors */3],
          /* textureIndices */record[/* textureIndices */4],
          /* mapUnits */record[/* mapUnits */5],
          /* textureCountMap */record[/* textureCountMap */6],
          /* defaultColor */record[/* defaultColor */7],
          /* gameObjectMap */record[/* gameObjectMap */8],
          /* groupCountMap */GroupService$Wonderjs.increaseGroupCount(material, record[/* groupCountMap */9]),
          /* disposedIndexArray */record[/* disposedIndexArray */10],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */11]
        ];
}

function decreaseGroupCount(material, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* colors */record[/* colors */3],
          /* textureIndices */record[/* textureIndices */4],
          /* mapUnits */record[/* mapUnits */5],
          /* textureCountMap */record[/* textureCountMap */6],
          /* defaultColor */record[/* defaultColor */7],
          /* gameObjectMap */record[/* gameObjectMap */8],
          /* groupCountMap */GroupService$Wonderjs.decreaseGroupCount(material, record[/* groupCountMap */9]),
          /* disposedIndexArray */record[/* disposedIndexArray */10],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */11]
        ];
}

export {
  getGroupCount ,
  isGroupMaterial ,
  increaseGroupCount ,
  decreaseGroupCount ,
  
}
/* No side effect */
