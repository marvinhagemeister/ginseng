/*
 * Copyright (c) 2017 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

const path = require("path")
const webpack = require("webpack")

/* ----------------------------------------------------------------------------
 * Configuration
 * ------------------------------------------------------------------------- */

module.exports = function() {
  const config = {

    /* Entrypoint */
    entry: [
      path.resolve(__dirname, "src/index.js")
    ],

    /* Loaders */
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader",
          exclude: /(\/node_modules\/|\/dist\/)/
        }
      ]
    },

    /* Export class constructor as entrypoint */
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
      libraryTarget: "window",
      pathinfo: true
    },

    /* Plugins */
    plugins: [

      /* Don't emit assets that include errors */
      new webpack.NoEmitOnErrorsPlugin()
    ],

    /* Module resolver */
    resolve: {
      modules: [
        __dirname,
        path.resolve(__dirname, "node_modules")
      ],
      extensions: [
        ".js"
      ]
    },

    /* Enable sourcemaps */
    devtool: "inline-source-map"
  }

  /* Build for production environment */
  if (process.env.NODE_ENV === "production") {

    /* Aggressively minify sources */
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          conditionals: true,
          comparisons: true,
          dead_code: true,     // eslint-disable-line camelcase
          evaluate: true,
          if_return: true,     // eslint-disable-line camelcase
          join_vars: true,     // eslint-disable-line camelcase
          loops: true,
          properties: true,
          sequences: true,
          unused: true,
          warnings: false
        },
        output: {
          comments: false
        }
      }))
  }

  /* We're good to go */
  return config
}
