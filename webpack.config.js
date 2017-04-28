const path = require("path")
const webpack = require("webpack")

module.exports = {
  entry: [

    /* Polyfills */
    // "regenerator-runtime/runtime-module",

    /* Main entry point */
    path.resolve(__dirname, "./src/index.js")
  ],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    pathinfo: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /(\/node_modules\/|\/dist\/)/
      }
    ]
  },
  plugins: [

    /* Don't emit assets that include errors */
    new webpack.NoEmitOnErrorsPlugin()
  ],

  /* Enable colored output */
  stats: {
    colors: true
  },

  /* Module resolver */
  resolve: {
    modules: [
      __dirname,
      path.resolve(__dirname, "./node_modules")
    ],
    extensions: [
      ".js"
    ]
  }
}
