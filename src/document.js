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

import "regenerator-runtime/runtime"                                            // TODO: inject into webpack

/* ----------------------------------------------------------------------------
 * Module
 * ------------------------------------------------------------------------- */

export default {

  /**
   * Resolve a given selector to an element
   *
   * If a selector is given, it will be passed to document.querySelector which
   * will only query for a single element, ignoring subsequent matches.
   *
   * @param {(string|Element)} selector - Selector or element
   * @return {Element} Element
   */
  query(selector) {
    if (typeof selector !== "string" && !(selector instanceof Element))
      throw new TypeError(`Invalid selector or element: "${selector}"`)

    /* Resolve selector */
    const el = (typeof selector === "string" && selector.length)
      ? document.querySelector(selector)
      : selector
    if (!(el instanceof Element))
      throw new ReferenceError(
        typeof selector === "string"
          ? `No match for selector: "${selector}"`
          : `Invalid element: "${el}"`)

    /* Return resolved element */
    return el
  },

  /**
   * Create a depth-first-search (DFS) node iterator
   *
   * @return {Iterable<Node>} - Node iterator
   */
  traverse() {
    const iterator = function *(el) {
      yield el

      /* Recursively yield on all child nodes */
      for (let n = 0; n < el.childNodes.length; n++)
        yield* iterator(el.childNodes[n])
    }
    return {}[Symbol.iterator] = iterator(this.el_)
  }
}
