

import * as RecordRenderConfigMainService$Wonderjs from "../../renderConfig/RecordRenderConfigMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "./RecordLightMaterialMainService.js";

function createInitMaterialState(param, state) {
  var directionLightRecord = state[/* directionLightRecord */20];
  var pointLightRecord = state[/* pointLightRecord */21];
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  return /* record */[
          /* materialRecord : record */[
            /* index */param[0],
            /* disposedIndexArray */param[1],
            /* shaderIndices */match[/* shaderIndices */2],
            /* diffuseMapUnits */match[/* diffuseMapUnits */7],
            /* specularMapUnits */match[/* specularMapUnits */8]
          ],
          /* directionLightRecord : record */[/* index */directionLightRecord[/* index */0]],
          /* pointLightRecord : record */[/* index */pointLightRecord[/* index */0]],
          /* renderConfigRecord */RecordRenderConfigMainService$Wonderjs.getRecord(state),
          /* shaderRecord */state[/* shaderRecord */26],
          /* programRecord */state[/* programRecord */28],
          /* glslRecord */state[/* glslRecord */27],
          /* glslSenderRecord */state[/* glslSenderRecord */30],
          /* glslLocationRecord */state[/* glslLocationRecord */29],
          /* glslChunkRecord */state[/* glslChunkRecord */31]
        ];
}

export {
  createInitMaterialState ,
  
}
/* RecordRenderConfigMainService-Wonderjs Not a pure module */
