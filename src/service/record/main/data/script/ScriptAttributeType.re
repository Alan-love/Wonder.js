type attributeName = string;

type fieldName = string;

type scriptAttributeType =
  | Int
  | Float;

/* type value('a) = 'a; */

type scriptAttributeValue;

type scriptAttributeFieldJsObj = {
  .
  "type": string,
  "defaultValue": scriptAttributeValue,
};

/* type scriptAttributeDefaultValue; */

type scriptAttributeField = {
  type_: scriptAttributeType,
  defaultValue: scriptAttributeValue,
  value: scriptAttributeValue,
  /* defaultValue: value(scriptAttributeType) */
};

type scriptAttribute =
  WonderCommonlib.ImmutableHashMapService.t(scriptAttributeField);

external intToScriptAttributeValue: int => scriptAttributeValue = "%identity";

external floatToScriptAttributeValue: float => scriptAttributeValue =
  "%identity";

external scriptAttributeValueToInt: scriptAttributeValue => int = "%identity";

external scriptAttributeValueToFloat: scriptAttributeValue => float =
  "%identity";