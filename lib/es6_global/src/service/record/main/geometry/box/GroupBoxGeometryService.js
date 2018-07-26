

import * as GroupService$Wonderjs from "../../../../primitive/GroupService.js";

function getGroupCount(geometry, record) {
  return GroupService$Wonderjs.getGroupCount(geometry, record[/* groupCountMap */6]);
}

function isGroupGeometry(geometry, record) {
  return GroupService$Wonderjs.isGroupComponent(geometry, record[/* groupCountMap */6]);
}

function increaseGroupCount(geometry, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* vertices */record[/* vertices */1],
          /* texCoords */record[/* texCoords */2],
          /* normals */record[/* normals */3],
          /* indices */record[/* indices */4],
          /* gameObjectMap */record[/* gameObjectMap */5],
          /* groupCountMap */GroupService$Wonderjs.increaseGroupCount(geometry, record[/* groupCountMap */6]),
          /* disposedIndexArray */record[/* disposedIndexArray */7]
        ];
}

function decreaseGroupCount(geometry, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* vertices */record[/* vertices */1],
          /* texCoords */record[/* texCoords */2],
          /* normals */record[/* normals */3],
          /* indices */record[/* indices */4],
          /* gameObjectMap */record[/* gameObjectMap */5],
          /* groupCountMap */GroupService$Wonderjs.decreaseGroupCount(geometry, record[/* groupCountMap */6]),
          /* disposedIndexArray */record[/* disposedIndexArray */7]
        ];
}

export {
  getGroupCount ,
  isGroupGeometry ,
  increaseGroupCount ,
  decreaseGroupCount ,
  
}
/* No side effect */
