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
import inspect from "./util/inspect"

import Spec from "./spec"

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

export default class Suite {

  /**
   * Initialize a test suite and all nested test suites
   *
   * Theoretically, we could use for ... of, but this creates problems with
   * compatibility in Internet Explorer and Opera due to the dependency on
   * Symbol.iterator. We could polyfill it, but this would increase the size
   * drastically and is pretty unnecessary to achieve the same outcome.
   *
   * @param {string} name - Suite name
   * @param {Object} [data] - Baseline data
   *
   * @return {Suite} Suite
   */
  static factory(name, data = {}) {
    const init = (suite, suites) => {
      Object.keys(suites).reduce((result, s) => {
        init(result.suite(s, suites[s].specs), suites[s].suites || {})
        return result
      }, suite)
      return suite
    }

    /* Create suite and recurse */
    return init(new Suite(name, data.specs || {}), data.suites || {})
  }

  /**
   * Create a test suite
   *
   * @constructor
   *
   * @property {string} name_ - Suite name
   * @property {Object<string, Spec>} baseline_ - Baseline data
   * @property {Object<string, Spec>} specs_ - Captured specifications
   * @property {Object<string, Suite>} suites_ - Nested test suites
   *
   * @param {string} name - Suite name
   * @param {Object<string, Spec>} [baseline={}] - Baseline data
   */
  constructor(name, baseline = {}) {
    if (typeof name !== "string" || !name.length)
      throw new TypeError(`Invalid name: ${inspect(name)}`)
    if (typeof baseline !== "object")
      throw new TypeError(`Invalid baseline: ${inspect(baseline)}`)

    /* Set name, baseline and initialize specifications */
    this.name_ = name
    this.baseline_ = baseline                                                   // TODO: validate baseline format
    this.specs_ = {}

    /* Nested test suites */
    this.suites_ = {}
  }

  /**
   * Capture a specification for a selector
   *
   * If the name of the specification matches a specification that was already
   * captured, the selector must match. Otherwise an error is thrown.
   *
   * @param {string} name - Specification name
   * @param {(string|Element)} selector - Selector or element
   *
   * @return {Boolean} Comparison result
   */
  capture(name, selector) {
    if (typeof name !== "string" || !name.length)
      throw new TypeError(`Invalid name: ${inspect(name)}`)

    /* Initialize specification, if not already done */
    const spec = this.specs_[name]
      ? this.specs_[name]
      : new Spec(name, selector)

    /* Ensure that we're not overwriting a previous capture */
    if (dom.query(selector) !== spec.element)
      throw new ReferenceError(
        `Invalid combination: '${name}' was already registered`)

    /* Append, capture and compare specification */
    this.specs_[name] = spec
    return spec.compare(this.baseline_[name] || {})
  }

  /**
   * Initialize a nested test suite
   *
   * @param {string} name - Suite name
   * @param {Object<string, Spec>} [baseline] - Baseline data
   * @param {Function} [cb] - Optional callback for nested handling
   *
   * @return {Suite} Nested test suite
   */
  suite(name, baseline = {}, cb = null) {
    if (typeof name !== "string" || !name.length)
      throw new TypeError(`Invalid name: ${inspect(name)}`)
    if (cb !== null && typeof cb !== "function")
      throw new TypeError("Invalid callback")

    /* Initialize nested suite, if not already done */
    const suite = this.suites_[name]
      ? this.suites_[name]
      : new Suite(name, baseline)

    /* Append and return or pass suite to callback */
    this.suites_[name] = suite
    return cb
      ? cb(suite)
      : suite
  }

  /**
   * Return JSON representation
   *
   * @return {Object} JSON representation
   */
  toJSON() {
    return {
      specs: this.specs_,
      suites: this.suites_
    }
  }

  /**
   * Retrieve suite name
   *
   * @return {string} Suite name
   */
  get name() {
    return this.name_
  }

  /**
   * Retrieve baseline data
   *
   * @return {Object<string, Spec>} Baseline data
   */
  get baseline() {
    return this.baseline_
  }

  /**
   * Retrieve captured specifications
   *
   * @return {Object<string, Spec>} Captured specifications
   */
  get specs() {
    return this.specs_
  }

  /**
   * Retrieve nested test suites
   *
   * @return {Object<string, Suite>} Nested test suites
   */
  get suites() {
    return this.suites_
  }
}
