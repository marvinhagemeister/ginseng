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

import * as request from "./browser/request"
import inspect from "./util/inspect"

import Suite from "./suite"

/* ----------------------------------------------------------------------------
 * Defaults
 * ------------------------------------------------------------------------- */

/**
 * Default options
 *
 * @type {Object}
 */
export const OPTIONS = {
  url: {
    baseline: "http://localhost/baseline",
    snapshot: "http://localhost/snapshot"
  }
}

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

export default class Ginseng {

  /**
   * Create a Ginseng instance
   *
   * @constructor
   *
   * @property {Object} options_ - Options
   * @property {Suite} suite_ - Top-level suite
   *
   * @param {Object} [options] - Options
   */
  constructor(options = {}) {
    if (typeof options !== "object")
      throw new TypeError(`Invalid options: ${inspect(options)}`)

    /* Merge options with defaults */
    // this.options_ = Object.assign(OPTIONS, options)
    // TODO: if options.url is given, prepend baseline and snapshot,
    // if options.url is an object, merge
  }

  /**
   * Fetch baseline from URL and initialize test suites
   *
   * @return {Promise<Suite>} Promise resolving with top-level suite
   */
  init() {
    return request.get(this.options_.url.baseline)
      .then(res => res.json())
      .then(data => Promise.resolve((() => {
        return this.suite_ = Suite.factory("_ginseng", data)                    // TODO: put this in common constant + load metadata (window width and height etc.)
      })()))
  }

  /**
   * Store gathered snapshots at URL
   *
   * @return {Promise<Suite>} Promise resolving with no result                  // TODO: is this true?
   */
  sync() {
    return request.post(this.options_.url.snapshot)
  }

  /**
   * Retrieve top-level suite
   *
   * @return {Suite} Top-level suite
   */
  suite() {
    if (!(this.suite_ instanceof Suite))
      this.suite_ = Suite.factory("_ginseng")
    return this.suite_
  }

  /**
   * Retrieve options
   *
   * @return {Object} Options
   */
  get options() {
    return this.options_
  }
}
