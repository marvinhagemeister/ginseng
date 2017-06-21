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

// import * as stylesheet from "../stylesheet"
import inspect from "../util/inspect"

/* ----------------------------------------------------------------------------
 * Classes
 * ------------------------------------------------------------------------- */

export const PSEUDO = {
  BEFORE: "x-ginseng-before",                                                    // TODO: maybe use ":" namespace? test
  AFTER: "x-ginseng-after"
}

/* ----------------------------------------------------------------------------
 * Classes
 * ------------------------------------------------------------------------- */

// const HTMLXBeforeElement = document.registerElement(PSEUDO.BEFORE)              // TODO: maybe constants!? supported pseudos!?
// const HTMLXAfterElement  = document.registerElement(PSEUDO.AFTER)

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve the computed properties of an element or pseudo element
 *
 * @param {Element} el - Element
 * @param {(string|null)} type - Pseudo element type
 *
 * @return {Object} Style rules
 */
export const style = (el, type) => {
  if (!(el instanceof Element))
    throw new TypeError(`Invalid element: ${inspect(el)}`)
  if (typeof type !== "string" && type !== null)
    throw new TypeError(`Invalid type: ${inspect(type)}`)

  /* Retrieve raw computed properties */
  const styles = window.getComputedStyle(el, type)

  /* Create a copy, as the CSS declaration object gets garbage collected the
     moment it's out of scope in most browsers */
  const data = {}
  for (const property in styles) {
    const value = styles[property]

    /* We cannot check properties with Object.hasOwnProperty(), because in IE
       the CSS declaration will always return false, so we use typeof */
    if (!/^(\d+|cssText|cssFloat|length|parentRule)$/.test(property) &&
        typeof value !== "function")
      data[property] = value
  }

  /* Return computed properties */
  return data
}
