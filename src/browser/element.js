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

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Available qualifiers
 *
 * @type {Array<string>} Qualifiers
 */
export const qualifiers = [
  "::before",
  "::after"
]

// rename this into "element.js"

/**
 * Retrieve the computed properties of an element or pseudo element
 *
 * @param {Element} el - Element
 * @param {string} [qualifier=null] - Pseudo qualifier
 *
 * @return {Object} Style rules
 */
export const style = (el, qualifier = null) => {
  if (!(el instanceof Element))
    throw new TypeError(`Invalid element: "${el}"`)
  if (qualifier && qualifiers.indexOf(qualifier) === -1)
    throw new TypeError(`Invalid qualifier: "${qualifier}"`)

  /* Retrieve raw computed properties */
  const styles = window.getComputedStyle(el, qualifier)

  /* Create a copy, as the CSS declaration object gets garbage collected the
     moment it's out of scope in some browsers, i.e., of course IE */
  const data = {}
  for (const property in styles) {
    const value = styles[property]

    /* We cannot check properties with Object.hasOwnProperty(), because in IE
       the CSS declaration will always return false, so we use typeof */
    if (!/^\d+$/.test(property) && typeof value !== "function")
      data[property] = value
  }

  /* Return computed properties */
  return data
}

/**
 * Retrieve the size and relative position of an element
 *
 * @param {Element} el - Element
 *
 * @return {Object} Size and position
 */
export const layout = el => {
  if (!(el instanceof Element))
    throw new TypeError(`Invalid element: "${el}"`)

  /* Retrieve actual width and height */
  const data = {
    width: el.clientWidth,
    height: el.clientHeight
  }

  /* Retrieve relative offset to parent */
  if (el.parentNode instanceof Element) {
    const inner = el.getBoundingClientRect()
    const outer = el.parentNode.getBoundingClientRect()

    /* Calculate relative offset to all sides */
    data.offset = {
      top: inner.top - outer.top,
      right: outer.right - inner.right,
      bottom: outer.bottom - inner.bottom,
      left: inner.left - outer.left
    }
  }

  /* Return size and relative position */
  return data
}

/**
 * Promote a pseudo element to an actual element
 *
 * This is necessary to read the size and position of an element, because this
 * cannot be read from pseudo elements directly.
 *
 * @param {Element} el - Element
 * @param {string} qualifier - Pseudo qualifier
 */
// export const promote(el, qualifier) {
//   if (!(el instanceof Element))
//     throw new TypeError(`Invalid element: "${el}"`)
//   if (typeof qualifier !== "string" || qualifiers.indexOf(qualifier) === -1)
//     throw new TypeError(`Invalid qualifier: "${qualifier}"`)
// }
