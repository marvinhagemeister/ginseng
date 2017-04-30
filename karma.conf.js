const webpackConfig = require("./webpack.config.js")

var browsers = {                                 // 1
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 7'
    // version: '58'
  }
  // sl_firefox: {
  //   base: 'SauceLabs',
  //   browserName: 'firefox',
  //   version: '30'
  // },
  // sl_ios_safari: {
  //   base: 'SauceLabs',
  //   browserName: 'iphone',
  //   platform: 'OS X 10.9',
  //   version: '7.1'
  // },
  // sl_ie_11: {
  //   base: 'SauceLabs',
  //   browserName: 'internet explorer',
  //   platform: 'Windows 8.1',
  //   version: '11'
  // }
}

// Karma configuration
// Generated on Mon Apr 24 2017 19:44:05 GMT+0200 (CEST)

module.exports = function(config) {
  const conf = {
    basePath: "",
    frameworks: ["jasmine", "fixture"],
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
      "tests/**/*.spec.js": ["webpack"],

      // Fixtures
      "**/*.html": ["html2js"],
      "**/*.json": ["json_fixtures"]
    },

    jsonFixturesPreprocessor: {
      variableName: '__json__'
    },

    webpack: webpackConfig,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["spec"], //"ginseng", "spec"],

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
  }

  if (process.env.TRAVIS) {
    conf.sauceLabs = {
      testName: "Ginseng Test"
    },
    conf.reporters = ["saucelabs", "spec"]
    conf.browsers = Object.keys(browsers)
    conf.customLaunchers = browsers
  }
  config.set(conf)

}
