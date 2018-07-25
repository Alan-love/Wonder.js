open StateDataMainType;

let getAPIJsObj = state => state.apiRecord.apiJsObj;

let setAPIJsObj = (apiJsObj, state) => {...state, apiRecord: apiJsObj};

let create = () => {
  /* TODO add more api */
  apiJsObj: {
    "label": FixedLayoutControlIMGUIMainService.label,
    "image": FixedLayoutControlIMGUIMainService.image,
    "button": FixedLayoutControlIMGUIMainService.button,
    "box": FixedLayoutControlIMGUIMainService.box,
    "radioButton": FixedLayoutControlIMGUIMainService.radioButton,
    "checkbox": FixedLayoutControlIMGUIMainService.checkbox,
    "sliderInt": FixedLayoutControlIMGUIMainService.sliderInt,
    "sliderFloat": FixedLayoutControlIMGUIMainService.sliderFloat,
    "beginGroup": FixedLayoutControlIMGUIMainService.beginGroup,
    "endGroup": FixedLayoutControlIMGUIMainService.endGroup,
    "unsafeGetGameObjectTransformComponent": GameObjectAPI.unsafeGetGameObjectTransformComponent,
    "unsafeGetGameObjectLightMaterialComponent": GameObjectAPI.unsafeGetGameObjectLightMaterialComponent,
    "setLightMaterialDiffuseColor": LightMaterialAPI.setLightMaterialDiffuseColor,
    "getLightMaterialSpecularColor": LightMaterialAPI.getLightMaterialSpecularColor,
    "setLightMaterialSpecularColor": LightMaterialAPI.setLightMaterialSpecularColor,
    "getLightMaterialShininess": LightMaterialAPI.getLightMaterialShininess,
    "setLightMaterialShininess": LightMaterialAPI.setLightMaterialShininess,
    "getTransformLocalPosition": TransformAPI.getTransformLocalPosition,
    "setTransformLocalPosition": TransformAPI.setTransformLocalPosition,
    "getRenderWorkerCustomData": OperateWorkerDataMainService.getRenderWorkerCustomData,
  },
};