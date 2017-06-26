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
 * Ginseng element mock class
 *
 * @type {Function}
 */
const HTMLGinsengPseudoElement = document.registerElement("gs-pseudo")

/**
 * Default pseudo element styles
 *
 * @type {Object<string, Object>}
 */
const defaults = {}

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
  if (type !== null && ["::before", "::after"].indexOf(type) === -1)
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

/**
 * Mock a pseudo element with an actual element
 *
 * This is necessary to read the size and position of an element, because
 * pseudo elements are not accessible via JavaScript.
 *
 * We use the attributes API (and not dataset) so we don't have to polyfill
 * browser support on this, which is quite patchy anyway.
 *
 * @param {Element} el - Element
 * @param {string} type - Pseudo element type
 * @param {CSSStyleSheet} stylesheet - Stylesheet for activation
 *
 * @return {Element|null} Promoted pseudo element or null, if none
 */
export const mock = (el, type, stylesheet) => {
  const styles = style(el, type)
  if (!(stylesheet instanceof CSSStyleSheet))
    throw new TypeError(`Invalid stylesheet: ${inspect(stylesheet)}`)

  /* Chrome and Opera: "", Firefox and Internet Explorer: "none" */
  if (["", "none"].indexOf(styles.content) !== -1)
    return null

  /* Perform a naive check if the element is rendered */
  if (styles.display === "none")
    return null

  /* Create mock for pseudo element */
  const pseudo = new HTMLGinsengPseudoElement()
  pseudo.setAttribute("data-gs-type", type)
  /* istanbul ignore else: already checked through pseudo.style */
  if (type === "::before") {
    el.insertBefore(pseudo, el.firstChild)
  } else if (type === "::after") {
    el.appendChild(pseudo)
  }

  /* Load default styles for pseudo element except the display property */
  if (!(defaults[type] && Object.keys(defaults[type]).length)) {
    defaults[type] = style(pseudo, type)
    delete defaults[type].display
  }

  /* Iterate properties and set those that deviate from defaults */
  for (const property in defaults[type])
    if (defaults[type][property] !== styles[property]) {
      if (property !== "content") {
        pseudo.style[property] = styles[property]
      } else {
        pseudo.innerText = styles[property].replace(/(^"|"$)/g, "")
      }
    }

  /* Set display property for mock - use a custom attribute for the identifier,
     because there could be some styles applied to common attributes */
  const index = stylesheet.cssRules.length
  stylesheet.insertRule(
    `gs-pseudo[data-gs-id=_${index}] { ` +
    `  display: ${styles.display} !important` +
    "}", index)

  /* Link style rule, mark element to contain mocks and insert mock */
  pseudo.setAttribute("data-gs-id", `_${index}`)
  el.setAttribute("data-gs-state", "mocked")

  /* Return mock */
  return pseudo
}
