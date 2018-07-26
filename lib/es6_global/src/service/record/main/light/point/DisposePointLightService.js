

import * as MappedIndexService$Wonderjs from "../../../../primitive/MappedIndexService.js";
import * as DisposeLightService$Wonderjs from "../DisposeLightService.js";
import * as IndexPointLightService$Wonderjs from "./IndexPointLightService.js";
import * as BufferPointLightService$Wonderjs from "./BufferPointLightService.js";
import * as DisposeTypeArrayService$Wonderjs from "../../../../primitive/buffer/DisposeTypeArrayService.js";
import * as RecordPointLightMainService$Wonderjs from "../../../../state/main/light/point/RecordPointLightMainService.js";

function isAlive(light, record) {
  return DisposeLightService$Wonderjs.isAlive(light, IndexPointLightService$Wonderjs.getMappedIndexMap(record));
}

function _disposeData(sourceIndex, record) {
  var mappedIndexMap = record[/* mappedIndexMap */8];
  var index = record[/* index */0];
  var gameObjectMap = DisposeLightService$Wonderjs.disposeData(sourceIndex, record[/* gameObjectMap */9]);
  var lastComponentIndex = index - 1 | 0;
  var mappedSourceIndex = MappedIndexService$Wonderjs.getMappedIndex(sourceIndex, mappedIndexMap);
  return /* record */[
          /* index */index - 1 | 0,
          /* buffer */record[/* buffer */1],
          /* colors */DisposeLightService$Wonderjs.swapData(/* tuple */[
                mappedSourceIndex,
                lastComponentIndex
              ], /* tuple */[
                mappedIndexMap,
                BufferPointLightService$Wonderjs.getColorsSize(/* () */0),
                RecordPointLightMainService$Wonderjs.getDefaultColor(/* () */0)
              ], DisposeTypeArrayService$Wonderjs.deleteBySwapAndResetFloat32TypeArr, record[/* colors */2]),
          /* intensities */DisposeLightService$Wonderjs.swapData(/* tuple */[
                mappedSourceIndex,
                lastComponentIndex
              ], /* tuple */[
                mappedIndexMap,
                BufferPointLightService$Wonderjs.getIntensitiesSize(/* () */0),
                RecordPointLightMainService$Wonderjs.getDefaultIntensity(/* () */0)
              ], DisposeTypeArrayService$Wonderjs.deleteSingleValueBySwapAndResetFloat32TypeArr, record[/* intensities */3]),
          /* constants */DisposeLightService$Wonderjs.swapData(/* tuple */[
                mappedSourceIndex,
                lastComponentIndex
              ], /* tuple */[
                mappedIndexMap,
                BufferPointLightService$Wonderjs.getConstantsSize(/* () */0),
                RecordPointLightMainService$Wonderjs.getDefaultConstant(/* () */0)
              ], DisposeTypeArrayService$Wonderjs.deleteSingleValueBySwapAndResetFloat32TypeArr, record[/* constants */4]),
          /* linears */DisposeLightService$Wonderjs.swapData(/* tuple */[
                mappedSourceIndex,
                lastComponentIndex
              ], /* tuple */[
                mappedIndexMap,
                BufferPointLightService$Wonderjs.getLinearsSize(/* () */0),
                RecordPointLightMainService$Wonderjs.getDefaultLinear(/* () */0)
              ], DisposeTypeArrayService$Wonderjs.deleteSingleValueBySwapAndResetFloat32TypeArr, record[/* linears */5]),
          /* quadratics */DisposeLightService$Wonderjs.swapData(/* tuple */[
                mappedSourceIndex,
                lastComponentIndex
              ], /* tuple */[
                mappedIndexMap,
                BufferPointLightService$Wonderjs.getQuadraticsSize(/* () */0),
                RecordPointLightMainService$Wonderjs.getDefaultQuadratic(/* () */0)
              ], DisposeTypeArrayService$Wonderjs.deleteSingleValueBySwapAndResetFloat32TypeArr, record[/* quadratics */6]),
          /* ranges */DisposeLightService$Wonderjs.swapData(/* tuple */[
                mappedSourceIndex,
                lastComponentIndex
              ], /* tuple */[
                mappedIndexMap,
                BufferPointLightService$Wonderjs.getRangesSize(/* () */0),
                RecordPointLightMainService$Wonderjs.getDefaultRange(/* () */0)
              ], DisposeTypeArrayService$Wonderjs.deleteSingleValueBySwapAndResetFloat32TypeArr, record[/* ranges */7]),
          /* mappedIndexMap */DisposeLightService$Wonderjs.setMappedIndexMap(sourceIndex, mappedSourceIndex, lastComponentIndex, mappedIndexMap),
          /* gameObjectMap */gameObjectMap
        ];
}

function handleBatchDisposeComponent(lightArray, record) {
  return DisposeLightService$Wonderjs.handleBatchDisposeComponent(lightArray, /* tuple */[
              isAlive,
              _disposeData
            ], record);
}

export {
  isAlive ,
  _disposeData ,
  handleBatchDisposeComponent ,
  
}
/* DisposeLightService-Wonderjs Not a pure module */
