var gulp = require("gulp");
var gs = require("glob-stream");
var fs = require("fs-extra");
var gulpTs = require("gulp-typescript");
var merge = require("merge2");
var del = require("del");
var gulpSync = require("gulp-sync")(gulp);
var wdFrp = require("wdfrp");
var path = require("path");


gulp.task("convert", function (done) {
    var Converter = require("./dist/Converter");
//todo support combine multi wd files to one file(according to command line param)

    var sourceDir = parseOption("--sourceDir") || "./source/",
        destDir = parseOption("--destDir") || "./dest/",
        converter = Converter.create();

    wdFrp.fromNodeCallback(fs.remove)(destDir)
        .concat(
            wdFrp.fromStream(gs.create([path.join(sourceDir, "*"), path.join(sourceDir, "**")], {nodir: true}))
                //todo use concatMap?
                .flatMap(function (data) {
                    return wdFrp.fromNodeCallback(fs.readFile)(data.path)
                        .flatMap(function (fileBuffer) {
                            var filePath = data.path;

                            return converter.write(converter.convert(fileBuffer, filePath), sourceDir, destDir, filePath);
                        })
                })
        )
        .subscribe(function (dataArr) {
        }, function (e) {
            console.log(e);
            done();
        }, function () {
            console.log("completed");
            done();
        });
});

function parseOption(name) {
    var value = null,
        i = process.argv.indexOf(name);

    if (i > -1) {
        value = process.argv[i + 1];
    }

    return value;
}

require("../gulp_task/common");

