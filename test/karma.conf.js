﻿module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/yyctoolbox/tool/yTool.js',


        "reference/playCanvas/build/output/playcanvas-latest.js",
        "reference/three.js.sourcecode/Three.js",

        //'src/math/*.js',
        'dist/dy.innerLib.js',
        'dist/dy.debug.js',

        'test/helper/jsExtend.js',
        'test/helper/jasmine/**',
        'test/helper/sinonJs/*.js',
        'test/helper/yoop/yOOP.js',
        'test/unit/**/*Tool.js',
        'test/unit/*Tool.js',

        'test/unit/**/*.js',
        //'test/unit/**/*MaterialSpec.js',
        //'test/unit/**/scriptSpec.js',

        //'test/unit/**/*ControllerSpec.js',
      //'test/unit/renderer/shadowMapSpec.js',
      //'test/unit/core/Tran*.js',
      //  'test/unit/asset/*.js',
      //  'test/unit/asset/obj/*.js',
        //'test/unit/asset/obj/OBJParserSpec.js',
        //'test/unit/asset/loaderSpec.js',
        //'test/unit/asset/dy/DYParserSpec.js',
        //'test/unit/asset/dy/DYBuilderSpec.js',
        //'test/unit/math/*.js',
        //'test/unit/component/**/GeometrySpec.js',
        //'test/unit/component/**/ModelGeometrySpec.js',
        //'test/unit/component/**/*Animation*.js',
        //'test/unit/**/MaterialSpec.js',
        //'test/unit/**/CommonBufferContainerSpec.js',
        //'test/unit/**/MorphBufferContainerSpec.js',
        //
        //'test/unit/core/*.js',
        //'test/unit/renderer/**',
        //'test/unit/device/*.js',
        //'test/unit/event/*.js',
        //'test/unit/utils/**',
        //'test/unit/video/**',

        //{pattern: 'src/**/*.js.map', watched: false, included: false, served: true},
        //{pattern: 'src/**/*.ts', watched: false, included: false, served: true}
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
