﻿module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        //'src/math/*.js',
        'dist/wd.innerLib.js',
        'dist/wd.debug.js',

        'lib/outer/cannon/cannon.js',

        'test/helper/jquery.js',
        'test/helper/yTool.js',

        'test/helper/jsExtend.js',
        'test/helper/jasmine/**',
        'test/helper/sinonJs/*.js',
        'test/helper/yoop/yOOP.js',
        'test/unit/**/*Tool.js',
        'test/unit/*Tool.js',

        //'test/unit/**',


        //'test/unit/**/procedural_texture_lib/**',




        //'test/unit/**/BufferTable*',
        //'test/unit/**/ProgramTable*',

        //'test/unit/**/BasicTexture*',

        //'test/unit/renderer/**',
        //'test/unit/**/*InstanceCommand*',

        //'test/unit/**/ProgramSpec.js',
        //'test/unit/**/GLSLDataSenderSpec.js',
        //'test/unit/**/programIn*',

        //'test/unit/**/renderer/**',

        //'test/unit/**/TextureSpec*',

        //'test/unit/**/*ProceduralRenderTargetRenderer*',

        //'test/unit/**/FrameBuffer*',
        //'test/unit/**/*ArrayBuffer*',
        //'test/unit/**/*ElementBuffer*',
        //'test/unit/**/*InstanceBuffer*',

        //'test/unit/**/proceduralRenderTargetRenderer*',


        //'test/unit/**/cubemapTexture*',

        //'test/unit/**/LineMaterial*',
        //'test/unit/**/BasicMaterial*',
        //'test/unit/**/LightMaterial*',
        'test/unit/**/Material*',
        'test/unit/**/*Material*',
        //'test/unit/**/mirrorMaterial*',

        'test/unit/**/material_lib/**',

        //'test/unit/**/ConvexPolygonGeometrySpec*',
        //'test/unit/**/LineGeometrySpec*',
        //'test/unit/**/SphereGeometrySpec*',
        //'test/unit/**/*GeometrySpec*',

        //'test/unit/**/VAOManager*',
        //
        //'test/unit/**/action/*',

        //'test/unit/**/RenderUtils*',

        //'test/unit/**/command/*',

        //'test/unit/**/light/**',

        //'test/unit/**/*RigidBodySpec*',

        //'test/unit/**/ScriptComponentSpec.js',

        //'test/unit/renderer/mirror/**',
        //'test/unit/renderer/dynamicCubemap/**',

        //'test/unit/**/waterReflection*',
        //'test/unit/**/waterRefraction*',
        //'test/unit/**/waterFresnel*',


        //'test/unit/**/scene/**',


        //'test/unit/renderer/shadow/shadowMapSpec.js',
        //'test/unit/**/Shadow*',
        ////
        //'test/unit/**/Shadow*Spec.js',
        //'test/unit/**/*Shadow*Spec.js',
        ////
        //'test/unit/renderer/shadow/pointShadowMapSpec.js',
        //////
        //'test/unit/renderer/shadow/**',
        //'test/unit/renderer/shadow/directionShadowMapSpec.js',
        //'test/unit/renderer/shadow/directionShadowMap*',
        //'test/unit/renderer/*ShadowMap_*Spec.js',
        //
        //'test/unit/**/instance/*',
        //'test/unit/**/instance/*lod*',

        //'test/unit/**/instance/SourceInstance*',
        //'test/unit/**/instance/instance_basic*',
        //'test/unit/**/instance/instance_light*',

        //'test/unit/**/instance_script*',

        //'test/unit/**/instance_animation*',

        //'test/unit/**/instance_shadow_morph*',
        //'test/unit/**/instance_shadowSpec*',
        //'test/unit/**/instance_shadow_*',
        //'test/unit/**/instance_render*',
        //'test/unit/**/instance_space*',

        //qtest/unit/**/water*',

        //'test/unit/lib/**',

        //'test/unit/**/terrain*',

        //'test/unit/**/shaderLibSpec*',
        //'test/unit/**/*ShaderLib*',
        //'test/unit/**/ShaderLib*',
        //
        //'test/unit/**/envMap*',
        //
        //'test/unit/texture/**',
        'test/unit/**/compress*',
        //'test/unit/**/*ProceduralTexture*',

        //
        //'test/unit/**/MapManager*',

        //'test/unit/renderer/**',
        //'test/unit/renderer/renderTargetRenderer/**',
        //'test/unit/renderer/**/TotalShadowMapShaderLib*',
        //'test/unit/renderer/**/BuildTwoDShadowMapShaderLib*',

        //'test/unit/**/*ProceduralShaderLib*',

        //'test/unit/**/ShaderSourceBuilderSpec*',
        //'test/unit/**/*ShaderSourceBuilderSpec*',

        //'test/unit/**/ShaderSpec*',
        //'test/unit/**/*ShaderSpec*',
        //'test/unit/**/ProceduralShaderSpec*',

        //'test/unit/**/customShaderSpec*',
        //'test/unit/**/renderWebGL*',
        //'test/unit/**/SortUtils*',

        //'test/unit/**/*CommandSpec*',
        //'test/unit/**/*InstanceCommand*',

        //'test/unit/renderer/**/DiffuseMapShaderLib*',
        //
        //'test/unit/renderer/**/LightMapShaderLib*',
        //
        //


        //'test/unit/**/lod/*',

        //'test/unit/**/CameraController*',
        //'test/unit/**/camera/**',


        //'test/unit/**/*GeometryData*',
        //'test/unit/**/**BufferContainer*',
        //
        //'test/unit/**/Face3*',

        //'test/unit/**/customShader*',

        //'test/unit/**/*animation*',
        //'test/unit/component/**/*Animation*.js',
        //'test/unit/component/**/morphAnimation*.js',

        //'test/unit/**/GLTFParserSpec*',
        //'test/unit/**/GLTFAssemblerSpec*',

        //'test/unit/**/Debug*',

        //'test/unit/**/EntityObjectSpec*',

        //'test/unit/component/physics/**/eventSpec*',

        //'test/unit/**/OctreeSpec*',
        //'test/unit/**/CollisionDetectorSpec*',
        //'test/unit/**/BoundingRegionUtilsSpec*',

        //'test/unit/**/SourceLightSpec*',

        //'test/unit/**/RigidBodySpec*',

        //'test/unit/**/Mirror*',


        //'test/unit/**/ColorSpec*',

        //'test/unit/**/interactionUISpec*',
        //'test/unit/**/TransitionSpec*',
        //'test/unit/**/SpriteTransitionSpec*',
        //'test/unit/**/TransitionManagerSpec*',


        //'test/unit/**/MainSpec*',

        //'test/unit/component/event/eventSpec*',

        //'test/unit/**/ui/**',
        //'test/unit/**/UIObjectSpec*',

        //'test/unit/**/ButtonSpec*',
        //'test/unit/**/UIStateMachineSpec*',


        //'test/unit/**/*Asset*',
        //
        'test/unit/**/TwoDFontSpec*',
        //'test/unit/**/PlainFontSpec*',
        //'test/unit/**/UIRendererSpec*',
        'test/unit/**/TwoDBitmapFontSpec*',
        'test/unit/**/ThreeDBitmapFontSpec*',
        'test/unit/**/bitmapFontSpec*',
        //
        //'test/unit/**/DirectorSpec*',
        //
        //'test/unit/**/ProgressBarSpec*',
        //
        //'test/unit/**/ImageSpec*',
        //
        //'test/unit/**/ThreeDTransformSpec.js',
        //'test/unit/**/RectTransformSpec*',
        //'test/unit/**/TransformSpec*',
        //'test/unit/**/component/**',
        //'test/unit/**/PanelSpec*',
        //
        //
        //'test/unit/**/LightShaderLibSpec*',
        //
        //'test/unit/**/SceneDispatcherSpec*',
        //'test/unit/**/GameObjectSceneSpec*',
        //
        //'test/unit/**/MathUtils*',
        //'test/unit/**/rayPicking*',
        //'test/unit/**/AABBShapeSpec*',
        //'test/unit/**/SphereShapeSpec*',
        //'test/unit/**/collider/**',
        //'test/unit/**/ActionManagerSpec*',
        //'test/unit/**/TwoDShadow*Spec.js',
        //'test/unit/**/*CustomGeo*.js',
        //'test/unit/**/SphereColliderSpec.js',
        //'test/unit/**/BoxColliderSpec*',
        //'test/unit/**/*ColliderSpec.js',
        //'test/unit/**/colliderSpec.js',
        //'test/unit/**/collider/optimizeSpec.js',
        //'test/unit/**/collider/*',
        //'test/unit/**/physics/*.js',
        //'test/unit/**/physics/**',
        //'test/unit/**/physics/physicsSpec*',
        //'test/unit/**/physics/dispose*',
        //'test/unit/**/physics/**/event*',
        //'test/unit/**/physics/optimize*',
        //'test/unit/**/physics/**/impulseSpec*',
        //'test/unit/**/physics/**/damping*',
        //'test/unit/**/physics/**/collision*',
        //'test/unit/**/physics/**/bodyType*',
        //'test/unit/**/physics/**/bounce*',
        //'test/unit/**/physics/**/constraint*',
        //'test/unit/**/physics/**/compound*',
        //'test/unit/**/GameObjectSpec.js',
        //'test/unit/**/*Shape*.js',
        //'test/unit/**/Arcball*',
        //'test/unit/**/FlyCameraController*',
        //'test/unit/**/scriptSpec.js',
      //
      //  'test/unit/**/*ControllerSpec.js',
      //'test/unit/core/Tran*.js',
      //  'test/unit/asset/*.js',
      //  'test/unit/asset/obj/*.js',
      //  'test/unit/asset/obj/OBJParserSpec.js',
        'test/unit/asset/loaderSpec.js',
        //'test/unit/asset/wd/WDParserSpec.js',
        //'test/unit/asset/wd/WDBuilderSpec.js',
        //'test/unit/math/*.js',
        //'test/unit/component/**/GeometrySpec.js',
        //'test/unit/component/**/TerrainGeometrySpec.js',
        //'test/unit/component/**/ModelGeometrySpec.js',
        //'test/unit/**/CommonBufferContainerSpec.js',
        //'test/unit/**/MorphBufferContainerSpec.js',
        //'test/unit/core/*.js',
        //'test/unit/device/*.js',
        //'test/unit/event/**',
        //'test/unit/event/mouseEv*.js',
        //'test/unit/event/customEv*.js',
        //'test/unit/event/keyboardEv*.js',
        //'test/unit/event/domEv*.js',
        //'test/unit/utils/**',
        //'test/unit/video/**',

        //{pattern: 'src/**/*.js.map', watched: false, included: false, served: true},
        //{pattern: 'src/**/*.ts', watched: false, included: false, served: true}
        //{pattern: 'dist/wd.debug.js.map', watched: false, included: false, served: true, nocache:true},

        {pattern: 'test/res/*', watched: false, included: false, served: true},
    {pattern: 'test/res/**', watched: false, included: false, served: true}
    ],


    // list of files to exclude
    exclude: [
        '**/temp/*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
