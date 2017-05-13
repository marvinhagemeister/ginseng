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

import equal from "deep-equal"

import * as dom from "./browser/dom"
import * as style from "./browser/style"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Extract the relevant data from an element
 *
 * @param  {Element} element - Element
 * @param  {object} children - Extracted data for child elements
 *
 * @return {object} Relevant data
 */
export const extract = (element, children) => {
  return {
    element: style.load(element),
    pseudo: {
      before: style.load(element, "::before"),
      after: style.load(element, "::after")
    },
    children
  }
}

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

export default class Spec {

  /**
   * Create a specification for a selector
   *
   * @constructor
   *
   * @property {String} name_ - Name
   * @property {Element} el_ - Element
   * @property {Object} data_ - Data
   *
   * @param {String} name - Name
   * @param {(String|Element)} selector - Selector or element
   */
  constructor(name, selector) {
    if (typeof name !== "string" || !name.length)
      throw new TypeError(`Invalid name: "${name}"`)

    /* Set spec name and element */
    this.name_ = name
    this.el_   = dom.query(selector)

    /* Initialize data */
    this.data_ = null
  }

  /**
   * Capture specification
   *
   * @return {Object} Data
   */
  capture() {
    return this.data_ = dom.traverse(this.el_, extract)
  }

  /**
   * Compare specification data against given baseline
   *
   * @param {Object} baseline - Baseline data
   * @return {Boolean} Comparison result
   */
  compare(baseline) {
    return equal(baseline, this.data_ || this.capture())
  }

  /**
   * Retrieve specification name
   *
   * @return {String} Name
   */
  get name() {
    return this.name_
  }

  /**
   * Retrieve captured element
   *
   * @return {Element} Element
   */
  get element() {
    return this.el_
  }

  /**
   * Retrieve specification data
   *
   * @return {Object} Data
   */
  get data() {
    return this.data_
  }
}
