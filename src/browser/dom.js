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

import inspect from "../util/inspect"

/* ----------------------------------------------------------------------------
 * Variables
 * ------------------------------------------------------------------------- */

/**
 * Root element
 *
 * @type {HTMLBodyElement}
 */
export const root = document.body

/**
 * Ginseng pseudo element mock
 *
 * @type {Function}
 */
export const HTMLGinsengPseudoElement = document.registerElement("gs-pseudo")

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create a new element
 *
 * @param {string} tag - Tag
 *
 * @return {Element} Element
 */
export const create = tag => {
  return document.createElement(tag)
}

/**
 * Resolve a given selector to an element
 *
 * If a selector is given, it will be passed to document.querySelector which
 * will only query for a single element, ignoring subsequent matches.
 *
 * @param {(string|Element)} selector - Selector or element
 * @param {Function} [type] - Expected type
 *
 * @return {Element} Element
 */
export const query = (selector, type = Element) => {
  if (typeof selector !== "string" && !(selector instanceof Element))
    throw new TypeError(`Invalid selector or element: ${inspect(selector)}`)

  /* Resolve selector */
  const el = (typeof selector === "string" && selector.length)
    ? document.querySelector(selector)
    : selector
  if (!(el instanceof type))
    throw new ReferenceError(`No match for selector: ${inspect(selector)}`)

  /* Return resolved element */
  return el
}

/**
 * Resolve an unique identifier to an element
 *
 * @param {string} id - Identifier
 * @param {Function} [type] - Expected type
 *
 * @return {Element} Element
 */
export const resolve = (id, type = Element) => {
  if (typeof id !== "string" || !id.length)
    throw new TypeError(`Invalid id: ${inspect(id)}`)

  /* Resolve identifier */
  const el = document.getElementById(id)
  if (!(el instanceof type))
    throw new ReferenceError(`No match for id: ${inspect(id)}`)

  /* Return resolved element */
  return el
}

/**
 * Invoke the callback on a node and all of its child nodes
 *
 * Traversal is done in depth-first pre-order manner. The callback must extract
 * the relevant value from the node and map the children to a data structure.
 *
 * @example
 *   (node, children) => {
 *     return {
 *       tag: node.tagName,
 *       children: children
 *     }
 *   }
 *
 * @param {(string|Element)} selector - Selector or element
 * @param {Function} cb - Node callback
 * @param {*} [data] - Optional data to be passed to the callback
 *
 * @return {*} Return value from callback
 */
export const traverse = (selector, cb, data = null) => {
  if (typeof cb !== "function")
    throw new TypeError("Invalid callback")

  /* Recursively traverse children */
  const children = el => {
    return [].reduce.call(el.childNodes, (nodes, node) => {
      if (node instanceof Element)
        nodes.push(cb(node, children(node), data))
      return nodes
    }, [])
  }

  /* Invoke callback on root node and recurse */
  const el = query(selector)
  return cb(el, children(el), data)
}
