open WonderWebgl.GlType;

open WonderWebgl.Gl;

open RenderConfigType;

open GLSLSenderType;

open VboBufferType;

let _addNormalMatrixInstanceArrayBufferSendData =
    (
      (gl, program, name, attributeLocationMap),
      (sendDataArr, instanceSendNoCachableDataArr),
    ) => (
  sendDataArr,
  instanceSendNoCachableDataArr
  |> ArrayService.push({
       pos:
         GLSLLocationService.getAttribLocation(
           program,
           name,
           attributeLocationMap,
           gl,
         ),
       size: 3,
       getOffsetFunc: (. index) => (index - 4) * 12 + 64,
     }),
);

let _readAttributes =
  (. (gl, program, attributeLocationMap), sendDataArrTuple, attributes) =>
    attributes |> OptionService.isJsonSerializedValueNone ?
      sendDataArrTuple :
      attributes
      |> OptionService.unsafeGetJsonSerializedValue
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. sendDataArrTuple, {name, buffer, type_}) =>
             ! (name |> OptionService.isJsonSerializedValueNone)
             && ! (type_ |> OptionService.isJsonSerializedValueNone) ?
               {
                 let name = name |> OptionService.unsafeGetJsonSerializedValue;
                 let type_ =
                   type_ |> OptionService.unsafeGetJsonSerializedValue;

                 switch (buffer) {
                 | VboBufferType.Instance_m_matrix =>
                   HandleAttributeConfigDataInitMaterialService.addModelMatrixInstanceArrayBufferSendData(
                     (gl, program, name, attributeLocationMap),
                     sendDataArrTuple,
                   )
                 | VboBufferType.Instance_normal_matrix =>
                   _addNormalMatrixInstanceArrayBufferSendData(
                     (gl, program, name, attributeLocationMap),
                     sendDataArrTuple,
                   )
                 | _ =>
                   HandleAttributeConfigDataInitMaterialService.addOtherArrayBufferSendData(
                     (gl, program, name, buffer, type_, attributeLocationMap),
                     sendDataArrTuple,
                   )
                 };
               } :
               HandleAttributeConfigDataInitMaterialService.addElementBufferSendData(
                 buffer,
                 sendDataArrTuple,
               ),
           sendDataArrTuple,
         );

let _readAttributeSendData =
  (. shaderLibDataArr, gl, program, attributeLocationMap) =>
    HandleAttributeConfigDataInitMaterialService.readAttributeSendData(
      shaderLibDataArr,
      (gl, program),
      _readAttributes,
      attributeLocationMap,
    );

let addAttributeSendData =
  (. glTuple, shaderLibDataArr: shaderLibs, recordTuple) =>
    HandleAttributeConfigDataInitMaterialService.addAttributeSendData(
      glTuple,
      shaderLibDataArr,
      _readAttributeSendData,
      recordTuple,
    );