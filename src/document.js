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
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Resolve a given selector to an element
 *
 * If a selector is given, it will be passed to document.querySelector which
 * will only query for a single element, ignoring subsequent matches.
 *
 * @param {(string|Element)} selector - Selector or element
 * @return {Element} Element
 */
export const query = selector => {
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
}

/**
 * Invoke the callback on a node and all of its child nodes, recursing
 *
 * A simple data structure containing the return value of the callback in the
 * node member and all child nodes in the tree member.
 *
 * @param {(string|Element)} selector - Selector or element
 * @param {Function} cb - Node callback
 * @return {Iterable<Node>} - Node iterator
 */
export const traverse = (selector, cb) => {
  const children = el => {
    return Array.prototype.reduce.call(el.childNodes, (nodes, node) => {
      if (node instanceof Element)
        nodes.push({
          node: cb(node),
          tree: children(node)
        })
      return nodes
    }, [])
  }

  /* Invoke callback on root node */
  const el = query(selector)
  return {
    node: cb(el),
    tree: children(el)
  }
}
