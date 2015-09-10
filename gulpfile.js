var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("./build/gulp_task/clean/clean");
require("./build/gulp_task/compile/compileTs");
require("./build/gulp_task/compile/combineInnerLib");

require("./build/gulp_task/createDefinitionFile/index");
require("./build/gulp_task/createInnerFile/index");

require("./build/gulp_task/test/test");

gulp.task("build", gulpSync.sync(["clean", "createInnerFile", "compileTs", "compileTsDebug", "combineInnerLib", "removeReference"]));



//gulp.task("singleTest", gulpSync.sync(["build"]), function (done) {
//    karma.start({
//        configFile: karmaConfPath,
//        singleRun:true
//    }, done);
//});

var tsFilePaths = ["src/*.ts", "src/**/*.ts"];
var glslFilePaths = "src/render/shader/chunk/glsl/*.glsl";

gulp.task("watchShaderChunk", function(){
    gulp.watch(glslFilePaths, ["createShaderChunk"]);
});

gulp.task("watchTs", function(){
    gulp.watch(tsFilePaths, ["compileTsDebug"]);
});





