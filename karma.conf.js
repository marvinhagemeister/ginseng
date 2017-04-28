const webpackConfig = require("./webpack.config.js")

// Karma configuration
// Generated on Mon Apr 24 2017 19:44:05 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "fixture", "property"],
    files: [
      "tests/fixtures/**/*",
      "tests/**/*.spec.js"
    ],

    // list of files to exclude
    exclude: [
      "dist"
    ],

    browserConsoleLogOptions: {
      terminal: true,
      level: ""
    },

    // preprocess matching files before serving them to the browser
    preprocessors: {
      "src/**/*.js": ["webpack"],
      "tests/**/*spec.js": ["webpack"]
    },
    webpack: webpackConfig,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["property", "spec"],//, "spec"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any changes
    autoWatch: true,

    // start these browsers
    // browsers: ["Chrome"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
