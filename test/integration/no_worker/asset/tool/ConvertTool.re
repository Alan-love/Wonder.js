let buildFakeLoadImage = [%bs.raw
  {|
    function(){
        window.loadImageBase64_wonder = function(base64Str, resolve, reject){
            resolve(base64Str)
        }

        window.loadImageBlob_wonder = function(objectUrl, resolve, reject){
            resolve(objectUrl)
        }
    }
    |}
];
