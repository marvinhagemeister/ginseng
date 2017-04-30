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

import * as style from "~/src/style"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* style */
describe("style", () => {

  /* Set fixture base path */
  beforeAll(function(){
    fixture.setBase("tests/fixtures/style")
  })

  /* Cleanup fixtures */
  afterEach(function(){
    fixture.cleanup()
  })

  /* #computed */
  describe("#computed", () => {

    /* Load fixtures */
    beforeEach(function(){
      fixture.load("computed.html")
    })

    /* Test: should return computed styles */
    it("should return computed styles for element",
      computedShouldReturnComputedStylesForElement
    )

    /* Test: should return computed styles for element before */
    it("should return computed styles for element before",
      computedShouldReturnComputedStylesForElementBefore
    )

    /* Test: should return computed styles for element after */
    it("should return computed styles for element after",
      computedShouldReturnComputedStylesForElementAfter
    )

    /* Test: should throw on invalid element */
    it("should throw on invalid element",
      computedShouldThrowOnInvalidElement
    )

    /* Test: should throw on invalid pseudo qualifier */
    it("should throw on invalid pseudo qualifier",
      computedShouldThrowOnInvalidPseudoQualifier
    )
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: #computed
 * ------------------------------------------------------------------------- */

/* Test: #computed should return computed styles for element */
function computedShouldReturnComputedStylesForElement() {
  const match = document.querySelector(".match")
  expect(style.computed(match))
    .toEqual(window.getComputedStyle(match))
}

/* Test: #computed should return computed styles for element before */
function computedShouldReturnComputedStylesForElementBefore() {
  const match = document.querySelector(".match")
  expect(style.computed(match, style.PSEUDO_BEFORE))
    .toEqual(window.getComputedStyle(match, "::before"))
}

/* Test: #computed should return computed styles for element after */
function computedShouldReturnComputedStylesForElementAfter() {
  const match = document.querySelector(".match")
  expect(style.computed(match, style.PSEUDO_AFTER))
    .toEqual(window.getComputedStyle(match, "::after"))
}

/* Test: #computed should throw on invalid element */
function computedShouldThrowOnInvalidElement() {
  expect(() => {
    style.computed(null)
  }).toThrow(
    new ReferenceError("Invalid element: \"null\"")
  )
}

/* Test: #computed should throw on invalid element */
function computedShouldThrowOnInvalidPseudoQualifier() {
  const match = document.querySelector(".match")
  expect(() => {
    style.computed(match, "invalid")
  }).toThrow(
    new TypeError("Invalid pseudo qualifier: \"invalid\"")
  )
}
