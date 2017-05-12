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

import * as style from "~/src/ginseng/browser/style"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* [Browser] */
describe("[Browser]", () => {

  /* style */
  describe("style", () => {

    /* Set fixture base path */
    beforeAll(() => {
      fixture.setBase("tests/fixtures/browser/style")
    })

    /* Register spies */
    beforeEach(() => {
      spyOn(window, "getComputedStyle")
    })

    /* Cleanup fixtures */
    afterEach(() => {
      fixture.cleanup()
    })

    /* #load */
    describe("#load", () => {

      /* Load fixtures */
      beforeEach(() => {
        fixture.load("load.html")
      })

      /* Test: should return computed styles */
      it("should return computed styles for element",
        loadShouldReturnComputedStylesForElement
      )

      /* Test: should return computed styles for before element */
      it("should return computed styles for before element",
        loadShouldReturnComputedStylesForBeforeElement
      )

      /* Test: should return computed styles for after element */
      it("should return computed styles for after element",
        loadShouldReturnComputedStylesForAfterElement
      )

      /* Test: should throw on invalid element */
      it("should throw on invalid element",
        loadShouldThrowOnInvalidElement
      )

      /* Test: should throw on invalid qualifier */
      it("should throw on invalid qualifier",
        loadShouldThrowOnInvalidQualifier
      )
    })
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: #load
 * ------------------------------------------------------------------------- */

/* Test: #load should return computed styles for element */
function loadShouldReturnComputedStylesForElement() {
  style.load(fixture.el.firstChild)
  expect(window.getComputedStyle)
    .toHaveBeenCalledWith(fixture.el.firstChild, null)
}

/* Test: #load should return computed styles for before element */
function loadShouldReturnComputedStylesForBeforeElement() {
  style.load(fixture.el.firstChild, "::before")
  expect(window.getComputedStyle)
    .toHaveBeenCalledWith(fixture.el.firstChild, "::before")
}

/* Test: #load should return computed styles for after element */
function loadShouldReturnComputedStylesForAfterElement() {
  style.load(fixture.el.firstChild, "::after")
  expect(window.getComputedStyle)
    .toHaveBeenCalledWith(fixture.el.firstChild, "::after")
}

/* Test: #load should throw on invalid element */
function loadShouldThrowOnInvalidElement() {
  expect(() => {
    style.load("genmaicha")
  }).toThrow(
    new ReferenceError("Invalid element: \"genmaicha\""))
  expect(window.getComputedStyle)
    .not.toHaveBeenCalled()
}

/* Test: #load should throw on invalid qualifier */
function loadShouldThrowOnInvalidQualifier() {
  expect(() => {
    style.load(fixture.el.firstChild, "oolong")
  }).toThrow(
    new TypeError("Invalid qualifier: \"oolong\""))
  expect(window.getComputedStyle)
    .not.toHaveBeenCalled()
}
