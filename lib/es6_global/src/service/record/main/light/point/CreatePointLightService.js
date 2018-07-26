

import * as BufferService$Wonderjs from "../../../../primitive/buffer/BufferService.js";
import * as MappedIndexService$Wonderjs from "../../../../primitive/MappedIndexService.js";
import * as BufferPointLightService$Wonderjs from "./BufferPointLightService.js";

function create(record) {
  var index = record[/* index */0];
  return BufferService$Wonderjs.checkNotExceedMaxCount(BufferPointLightService$Wonderjs.getBufferMaxCount(/* () */0), /* tuple */[
              /* record */[
                /* index */index + 1 | 0,
                /* buffer */record[/* buffer */1],
                /* colors */record[/* colors */2],
                /* intensities */record[/* intensities */3],
                /* constants */record[/* constants */4],
                /* linears */record[/* linears */5],
                /* quadratics */record[/* quadratics */6],
                /* ranges */record[/* ranges */7],
                /* mappedIndexMap */MappedIndexService$Wonderjs.setMappedIndex(index, index, record[/* mappedIndexMap */8]),
                /* gameObjectMap */record[/* gameObjectMap */9]
              ],
              index
            ]);
}

export {
  create ,
  
}
/* BufferService-Wonderjs Not a pure module */
