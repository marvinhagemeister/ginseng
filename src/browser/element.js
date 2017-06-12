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

import * as pseudo from "./pseudo"
import inspect from "../util/inspect"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve the computed properties of an element
 *
 * @param {Element} el - Element
 *
 * @return {Object} Style rules
 */
export const style = el => {
  return pseudo.style(el, null)
}

/**
 * Retrieve the size of an element
 *
 * @param {Element} el - Element
 *
 * @return {Object} Element size
 */
export const size = el => {
  if (!(el instanceof Element))
    throw new TypeError(`Invalid element: ${inspect(el)}`)

  /* Retrieve actual width and height */
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

/**
 * Retrieve the relative offset of an element
 *
 * @param {Element} el - Element
 *
 * @return {Object} Element offset
 */
export const offset = el => {
  if (!(el instanceof Element))
    throw new TypeError(`Invalid element: ${inspect(el)}`)
  if (!(el.parentNode instanceof Element))
    return {}

  /* Retrieve bounding boxes for element and parent */
  const inner = el.getBoundingClientRect()
  const outer = el.parentNode.getBoundingClientRect()

  /* Calculate relative offset to all sides */
  return {
    top: inner.top - outer.top,
    right: outer.right - inner.right,
    bottom: outer.bottom - inner.bottom,
    left: inner.left - outer.left
  }
}
