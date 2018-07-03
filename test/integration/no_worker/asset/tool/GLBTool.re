let convertUint8ArrayToBuffer = [%raw
  uint8Array => {|
      {
           var buf = new Buffer(uint8Array.byteLength);

           for (var i = 0; i < buf.length; ++i) {
               buf[i] = uint8Array[i];
           }

           return buf;
       }
      |}
];

let buildFakeTextDecoder = [%raw
  convertUint8ArrayToBufferFunc => {|
        var TextDecoder = function(utfLabel){
        };

        TextDecoder.prototype.decode = (uint8Array) => {
          var buffer = convertUint8ArrayToBufferFunc(uint8Array);

          return buffer.toString("utf8");
        };

        window.TextDecoder = TextDecoder;
    |}
];

let buildFakeTextEncoder =
  [@bs]
  [%raw
    () => {|
        var TextEncoder = function(){
        };

        TextEncoder.prototype.encode = (str) => {
          var buffer = Buffer.from(str, "utf8");

          return buffer;
        };

        window.TextEncoder = TextEncoder;
    |}
  ];

let buildFakeURL = [%raw
  sandbox => {|
        var URL = {
          createObjectURL: sandbox.stub(),
          revokeObjectURL: sandbox.stub()
        };

        URL.createObjectURL.onCall(0).returns("object_url0");
        URL.createObjectURL.onCall(1).returns("object_url1");
        URL.createObjectURL.onCall(2).returns("object_url2");
        URL.createObjectURL.onCall(3).returns("object_url3");
        URL.createObjectURL.onCall(4).returns("object_url4");
        URL.createObjectURL.onCall(5).returns("object_url5");

        window.URL = URL;
    |}
];

let prepare = sandbox => {
  ConvertTool.buildFakeLoadImage();
  buildFakeTextDecoder(convertUint8ArrayToBuffer);
  buildFakeTextEncoder(.);
  buildFakeURL(sandbox);
};

let buildGLBFilePath = glbFileName =>
  Node.Path.join([|Node.Process.cwd(), "./test/res/", glbFileName|]);

let buildBinBuffer = () => {
  buildFakeTextDecoder(convertUint8ArrayToBuffer);

  let buffer =
    NodeExtend.readFileBufferSync(buildGLBFilePath("BoxTextured.glb"));

  let (_, binBuffer) =
    BinaryUtils.decode(buffer##buffer, ConvertGLBSystem._checkGLB);

  binBuffer;
};