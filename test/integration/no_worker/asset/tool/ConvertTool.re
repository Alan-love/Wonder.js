let buildFakeLoadImage = [%raw
  () => {|
        window.loadImageBase64_wonder = function(base64Str, resolve, reject){
            resolve(base64Str)
        }

        window.loadImageBlob_wonder = function(objectUrl, errorInfo, resolve, reject){
            resolve(objectUrl)
        }

    |}
];

let getJsonSerializedNone = () => Js.Nullable.null |> Obj.magic;

let setFakeTransformCount = [%raw
  (count) => {|
    window.wonder_transformCount_forTest = count;
    |}
];