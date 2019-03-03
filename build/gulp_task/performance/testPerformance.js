var gulp = require("gulp");
var path = require("path");
var test = require("../e2e/test");

function _getGenerateDataInfo() {
    return "generate benchmark...";
};

gulp.task("testPerformanceInCI", function (done) {
    var testPerformance = require(path.join(process.cwd(), "lib/js/test/e2e/performance/TestPerformance.js"));

    test.testInCI(_getGenerateDataInfo(), "performance", testPerformance.generateBenchmark, testPerformance.runTest, done);
});

gulp.task("testPerformanceInLocal", function (done) {
    var testPerformance = require(path.join(process.cwd(), "lib/js/test/e2e/performance/TestPerformance.js"));

    var reportFilePath = path.join(process.cwd(), "./test/e2e/performance/report/report.html");

    test.testInLocal(_getGenerateDataInfo(), reportFilePath, "performance", testPerformance.generateBenchmark, testPerformance.generateReport, testPerformance.runTest, done);
});

gulp.task("testFastPerformance", function (done) {
    var testPerformance = require(path.join(process.cwd(), "lib/js/test/e2e/performance/TestPerformance.js"));

    var reportFilePath = path.join(process.cwd(), "./test/e2e/performance/report/report.html");

    test.fastTest(reportFilePath, testPerformance.generateReport, testPerformance.runTest, done);
});


gulp.task("testFastPerformanceOneCount", function (done) {
    var testPerformance = require(path.join(process.cwd(), "lib/js/test/e2e/performance/TestPerformance.js"));

    var reportFilePath = path.join(process.cwd(), "./test/e2e/performance/report/report.html");

    var utils = require("../common/commonUtils");

    test.fastTest(reportFilePath, testPerformance.generateReport, testPerformance.runOneCountTest , done);
});


function _fail(message, done) {
    console.log("fail");

    console.error(message);

    done();
}

gulp.task("generatePerformanceBenchmark", function (done) {
    var testPerformance = require(path.join(process.cwd(), "lib/js/test/e2e/performance/TestPerformance.js"));

    console.log(_getGenerateDataInfo());

    testPerformance.generateBenchmark().then(function (browser) {
        done();
    }, function (e) {
        _fail(e, done);
    })
});

gulp.task("generatePerformanceReport", function (done) {
    var testPerformance = require(path.join(process.cwd(), "lib/js/test/e2e/performance/TestPerformance.js"));

    var reportFilePath = path.join(process.cwd(), "./test/e2e/performance/report/report.html");

    try {
        testPerformance.generateAllCasesReport(reportFilePath).then(function () {
            done();
        }, function (e) {
            _fail(e, done);
        })
    }
    catch (e) {
        _fail(e, done);
    }
});
