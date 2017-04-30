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
   * Create a named spec for a selector
   *
   * @constructor
   *
   * @property {string} name_ - Spec name
   * @property {Element} el_ - Element
   *
   * @param {string} name - Spec name
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
   * Capture spec
   *
   * @param {object?} options - Option overrides                                // TODO: are options needed?
   */
  capture(options = {}) {
    if (typeof options !== "object")
      throw new TypeError(`Invalid options: "${options}"`)

    /* Record styles for element, child nodes and all pseudo elements */
    this.data_ = dom.traverse(this.el_, (element, children) => {
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
   * Compare spec data against a baseline
   *
   * @param {object} baseline - Baseline spec data
   * @param {object?} options - Option overrides
   * @return {boolean} Comparison result
   */
  compare(baseline, options = {}) {
    return equal(baseline, this.record(options))
  }

  /**
   * Retrieve spec name
   *
   * @return {string} Spec name
   */
  get name() {
    return this.name_
  }

  /**
   * Retrieve spec data
   *
   * @return {object} Spec data
   */
  get data() {
    return this.data_
  }
}
