var gulp = require("gulp");
var git = require("gulp-git");
var path = require("path");
var fs = require("fs");

var testRender = require(path.join(process.cwd(), "lib/js/test/render/TestRender.js"));

function _runTest(done) {
    console.log("run test...");

    testRender.runTest().then(function () {
        console.log("done");
        done()
    }, function (e) {
        console.log("fail");
        console.error(e);
        done();
    })
}

function _runBuild(cb) {
    var exec = require("child_process").exec;

    console.log("build...");

    exec("gulp build", { maxBuffer: 4096 * 2000 }, function (err, stdout, stderr) {
        if (err) {
            throw err;
        }

        cb()
    });
}

function _deepCopyJson(json) {
    return JSON.parse(JSON.stringify(json));
}

function _writeGenerateBasedCommitIdToConfig(commitId, config, configFilePath) {
    var copiedConfig = _deepCopyJson(config);
    copiedConfig.render.last_generate_based_commit_id = commitId;
    fs.writeFileSync(configFilePath, copiedConfig);
}

gulp.task("testRender", function (done) {
    var configFilePath = path.join(process.cwd(), "test/render/e2eConfig.json");

    git.revParse({ args: "HEAD" }, function (err, commitId) {
        var currentCommitId = commitId;

        var config = JSON.parse(fs.readFileSync(configFilePath));
        var basedCommitId = config.render.base_commit_id;

        if (!!err) {
            console.error(err);
            done();
            return;
        }

        if (basedCommitId === config.render.last_generate_based_commit_id) {
            _runTest(done);
            return
        }

        console.log("reset hard to basedCommitId:", basedCommitId, "...");

        git.reset(basedCommitId, { args: '--hard' }, function (err) {
            if (!!err) {
                console.error(err);
                done();
                return;
            }

            console.log("reset hard to currentCommitId:", currentCommitId, "...");

            testRender.generate().then(function () {
                _writeGenerateBasedCommitIdToConfig(basedCommitId, config, configFilePath);

                git.reset(currentCommitId, { args: '--hard' }, function (err) {
                    if (!!err) {
                        console.error(err);
                        done();
                        return;
                    }

                    _runBuild(function () {
                        _runTest(done);
                    });
                });
            }, function (e) {
                console.error(e);
                done();
            })
        });
    });
});
