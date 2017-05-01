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
 * Class
 * ------------------------------------------------------------------------- */

export default class Spec {

  /**
   * Create a specification for a selector
   *
   * @constructor
   *
   * @property {string} name_ - Specification name
   * @property {Element} el_ - Element
   *
   * @param {string} name - Specification name
   * @param {(string|Element)} selector - Selector or element
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
   * @return {object} Specification data
   */
  capture() {
    return this.data_ = dom.traverse(this.el_, (element, children) => {
      return {
        element: style.load(element),
        pseudo: {
          before: style.load(element, style.PSEUDO_BEFORE),
          after: style.load(element, style.PSEUDO_AFTER)
        },
        children
      }
    })
  }

  /**
   * Compare specification data against a baseline
   *
   * @param {object} baseline - Baseline specification data
   * @return {boolean} Comparison result
   */
  compare(baseline) {
    return equal(baseline, this.capture())
  }

  /**
   * Retrieve specification name
   *
   * @return {string} Specification name
   */
  get name() {
    return this.name_
  }

  /**
   * Retrieve specification data
   *
   * @return {object} Specification data
   */
  get data() {
    return this.data_
  }
}
