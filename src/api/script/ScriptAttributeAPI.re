let createScriptAttribute = () =>
  OperateScriptAttributeDataMainService.createScriptAttribute();

let addScriptAttributeFieldJsObj = (fieldName, attributeFieldJsObj, attribute) =>
  OperateScriptAttributeDataMainService.addScriptAttributeFieldJsObj(
    fieldName,
    attributeFieldJsObj,
    attribute,
  );

let removeScriptAttributeField = (fieldName, attribute) =>
  OperateScriptAttributeDataMainService.removeScriptAttributeField(
    fieldName,
    attribute,
  );

let getScriptAttributeEntries = attribute =>
  OperateScriptAttributeDataMainService.getScriptAttributeEntries(attribute);