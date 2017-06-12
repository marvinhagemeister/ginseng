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

import merge from "deepmerge"

import * as request from "./browser/request"
import inspect from "./util/inspect"

import {
  factory,
  default as Suite
} from "./suite"

/* ----------------------------------------------------------------------------
 * Defaults
 * ------------------------------------------------------------------------- */

/**
 * Default configuration/options
 *
 * @type {Object}
 */
export const config = {
  url: {
    baseline: "http://localhost:80/"
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
   * @param {Object} [options={}] - Options
   */
  constructor(options = {}) {
    if (typeof options !== "object")
      throw new TypeError(`Invalid options: ${inspect(options)}`)

    /* Merge options with defaults */
    this.options_ = merge(config, options)
  }

  /**
   * Fetch baseline from url and initialize test suites
   *
   * @return {Promise<Suite>} Promise resolving with top-level suite
   */
  fetch() {
    return request.get(this.options_.url.baseline)                              // TODO: maybe we should call that "init/sync" --> baseline => init/sync
      .then(res => res.json())
      .then(data => Promise.resolve((() => {                                    // TODO: factory + prepare
        return this.suite_ = factory("_ginseng", data)                          // TODO: put this in common constant
      })()))
  }

  /**
   * Retrieve top-level suite
   *
   * @return {Suite} Top-level suite
   */
  suite() {
    if (!(this.suite_ instanceof Suite))
      this.suite_ = new Suite("_ginseng")
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
