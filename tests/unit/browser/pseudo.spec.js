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

import * as pseudo from "~/src/browser/pseudo"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* Browser */
describe("Browser", () => {

  /* pseudo */
  describe("pseudo", () => {

    /* Set fixture base path */
    beforeAll(() => {
      fixture.setBase("fixtures/browser/pseudo")
    })

    /* Register spies */
    beforeEach(() => {
      spyOn(window, "getComputedStyle")
    })

    /* Cleanup fixtures */
    afterEach(() => {
      fixture.cleanup()
    })

    /* .style */
    describe(".style", () => {

      /* Load fixtures */
      beforeEach(() => {
        fixture.load("style.html")
      })

      /* Test: should return computed styles */
      it("should return computed styles for element",
        styleShouldReturnComputedStylesForElement
      )

      /* Test: should return computed styles for before element */
      it("should return computed styles for before element",
        styleShouldReturnComputedStylesForBeforeElement
      )

      /* Test: should return computed styles for after element */
      it("should return computed styles for after element",
        styleShouldReturnComputedStylesForAfterElement
      )

      /* Test: should throw on invalid element */
      it("should throw on invalid element",
        styleShouldThrowOnInvalidElement
      )

      /* Test: should throw on invalid type */
      it("should throw on invalid type",
        styleShouldThrowOnInvalidType
      )
    })
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: .style
 * ------------------------------------------------------------------------- */

/* Test: .style should return computed styles for element */
function styleShouldReturnComputedStylesForElement() {
  pseudo.style(fixture.el.firstElementChild, null)
  expect(window.getComputedStyle)
    .toHaveBeenCalledWith(fixture.el.firstElementChild, null)
}

/* Test: .style should return computed styles for before element */
function styleShouldReturnComputedStylesForBeforeElement() {
  pseudo.style(fixture.el.firstElementChild, "::before")
  expect(window.getComputedStyle)
    .toHaveBeenCalledWith(fixture.el.firstElementChild, "::before")
}

/* Test: .style should return computed styles for after element */
function styleShouldReturnComputedStylesForAfterElement() {
  pseudo.style(fixture.el.firstElementChild, "::after")
  expect(window.getComputedStyle)
    .toHaveBeenCalledWith(fixture.el.firstElementChild, "::after")
}

/* Test: .style should throw on invalid element */
function styleShouldThrowOnInvalidElement() {
  expect(() => {
    pseudo.style("genmaicha")
  }).toThrow(
    new TypeError("Invalid element: 'genmaicha'"))
  expect(window.getComputedStyle)
    .not.toHaveBeenCalled()
}

/* Test: .style should throw on invalid type */
function styleShouldThrowOnInvalidType() {
  expect(() => {
    pseudo.style(fixture.el.firstElementChild)
  }).toThrow(
    new TypeError("Invalid type: undefined"))
  expect(window.getComputedStyle)
    .not.toHaveBeenCalled()
}
