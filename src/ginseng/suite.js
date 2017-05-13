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

export default class Suite {

  /**
   * Create a test suite
   *
   * @constructor
   *
   * @property {string} name_ - Suite name
   * @property {Object<String, Spec>} baseline_ - Baseline data
   * @property {Object<String, Spec>} specs_ - Captured specifications
   * @property {Object<Suite>} suites_ - Nested test suites
   *
   * @param {String} name - Suite name
   * @param {Object<String, Spec>?} baseline - Baseline data
   */
  constructor(name, baseline = {}) {
    if (typeof name !== "string" || !name.length)
      throw new TypeError(`Invalid name: "${name}"`)
    if (typeof baseline !== "object")
      throw new TypeError(`Invalid baseline: "${baseline}"`)

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
   * @param {String} name - Specification name
   * @param {(String|Element)} selector - Selector or element
   *
   * @return {Boolean} Comparison result
   */
  capture(name, selector) {
    if (typeof name !== "string" || !name.length)
      throw new TypeError(`Invalid name: "${name}"`)

    /* Initialize specification, if not already done */
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
   * Initialize a nested test suite
   *
   * @param {string} name - Suite name
   * @param {Object<String, Spec>?} baseline - Baseline data
   * @param {Function?} cb - Optional callback for nested handling
   *
   * @return {Suite} Nested test suite
   */
  suite(name, baseline = {}, cb = null) {
    if (typeof name !== "string" || !name.length)
      throw new TypeError(`Invalid name: "${name}"`)
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
   * Retrieve suite name
   *
   * @return {String} Suite name
   */
  get name() {
    return this.name_
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

  /**
   * Retrieve nested test suites
   *
   * @return {Object<Suite>} Nested test suites
   */
  get suites() {
    return this.suites_
  }
}

/* ----------------------------------------------------------------------------
 * Factory
 * ------------------------------------------------------------------------- */

/**
 * Initialize a test suite and all test nested suites
 *
 * This factory function creates a set of nested suites by recursing through
 * the given data. Every suite and nested suite is expected to have a baseline.
 *
 * @param {String} name - Suite name
 * @param {Object} data - Baseline data
 *
 * @return {Suite} Suite
 */
export const factory = (name, data) => {
  const init = (suite, suites) => {
    for (const s of Object.keys(suites))
      init(suite.suite(s, suites[s].baseline), suites[s].suites || {})
    return suite
  }

  /* Create suite and recurse */
  return init(new Suite(name, data.baseline), data.suites || {})
}
