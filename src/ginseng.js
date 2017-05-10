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

import * as dom from "./browser/dom"

import Spec from "./spec"

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

export default class Ginseng {

  /**
   * Create Ginseng test suite
   *
   * @constructor
   *
   * @property {Object<String, Spec>} baseline_ - Baseline data
   * @property {Object<String, Spec>} specs_ - Captured specifications
   *
   * @param {Object<String, Spec>?} baseline - Baseline data
   */
  constructor(baseline = {}) {
    if (typeof baseline !== "object")
      throw new TypeError(`Invalid baseline: "${baseline}"`)

    /* Set baseline and initialize specifications */
    this.baseline_ = baseline                                                   // TODO: validate baseline format
    this.specs_ = {}
  }

  /**
   * Capture a specification for a selector
   *
   * If the name of the specification matches a specification that was already
   * captured, the selector must match. Otherwise an error is thrown.
   *
   * @param {String} name - Specification name
   * @param {(String|Element)} selector - Selector or element
   *
   * @return {Boolean} Comparison result
   */
  capture(name, selector) {
    const spec = this.specs_[name]
      ? this.specs_[name]
      : new Spec(name, selector)

    /* Ensure that we're not overwriting a previous capture */
    if (dom.query(selector) !== spec.element)
      throw new ReferenceError(
        `"${name}" was already registered with another element`)

    /* Append, capture and compare specification */
    this.specs_[name] = spec
    return spec.compare(this.baseline_[name] || {})
  }

  /**
   * Retrieve baseline data
   *
   * @return {Object<String, Spec>} Baseline data
   */
  get baseline() {
    return this.baseline_
  }

  /**
   * Retrieve captured specifications
   *
   * @return {Object<String, Spec>} Captured specifications
   */
  get specs() {
    return this.specs_
  }
}
