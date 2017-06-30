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
import * as element from "./browser/element"
import * as pseudo from "./browser/pseudo"
import inspect from "./util/inspect"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Replace pseudo elements with mocks
 *
 * @param {Element} el - Element
 * @param {Array<HTMLElement>} children - Child mocks
 * @param {CSSStyleSheet} stylesheet - Stylesheet for activation
 *
 * @return {Array<HTMLElement>} Mocks
 */
export const prepare = (el, children, stylesheet) => {
  return ["::before", "::after"].reduce((mocks, type) => {
    return [...mocks, pseudo.mock(el, type, stylesheet)].filter(Boolean)
  }, []).concat(...children)
}

/**
 * Extract the relevant data from an element
 *
 * @param {Element} el - Element
 * @param {Object} children - Extracted data for child elements
 *
 * @return {Object} Relevant data
 */
export const extract = (el, children) => {
  return {
    element: {
      tag: element.tag(el),
      attrs: element.attrs(el),
      props: {
        size: element.size(el),
        offset: element.offset(el)
      }
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
   * @property {string} name_ - Name
   * @property {Element} el_ - Element
   * @property {Object} data_ - Data
   *
   * @param {string} name - Name
   * @param {(String|Element)} selector - Selector or element
   */
  constructor(name, selector) {
    if (typeof name !== "string" || !name.length)
      throw new TypeError(`Invalid name: ${inspect(name)}`)

    /* Set name and element */
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
    const base = dom.root.appendChild(dom.create("style"))
    base.textContent = require("./assets/base.scss")

    /* Inject stylesheet for mocks and disable it */
    const mock = dom.root.appendChild(dom.create("style"))
    mock.textContent = require("./assets/mock.scss")
    mock.sheet.disabled = true

    /* Prepare pseudo elements */
    const els = dom.traverse(this.el_, prepare, mock.sheet)
    mock.sheet.disabled = false

    /* Extract relevant data */
    this.data_ = dom.traverse(this.el_, extract)
    mock.sheet.disabled = true

    /* Unmock and remove pseudo elements */
    els.forEach(el => {
      el.parentNode.removeAttribute("data-gs-state")
      el.parentNode.removeChild(el)
    })

    /* Remove stylesheets */
    dom.root.removeChild(mock)
    dom.root.removeChild(base)

    /* Return captured data */
    return this.data_
  }

  /**
   * Compare specification data against given baseline
   *
   * @param {Object} baseline - Baseline data
   *
   * @return {Boolean} Comparison result
   */
  compare(baseline) {
    return equal(baseline, this.data_ || this.capture())                        // TODO: validate baseline format
  }

  /**
   * Return JSON representation
   *
   * @return {Object} JSON representation
   */
  toJSON() {
    return this.data_
  }

  /**
   * Retrieve specification name
   *
   * @return {string} Name
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
