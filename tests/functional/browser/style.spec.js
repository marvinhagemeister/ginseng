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

import * as style from "~/src/browser/style"

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

    /* Cleanup fixtures */
    afterEach(() => {
      fixture.cleanup()
    })

    /* #load */
    describe("#load.functional", () => {

      /* Load fixtures */
      beforeEach(() => {
        fixture.load("load.html")
      })

      /* Test: should return computed styles */
      it("should return real computed styles for element",
        loadShouldReturnRealComputedStylesForElement
      )

      /* Test: should return real computed styles for before element */
      it("should return real computed styles for before element",
        loadShouldReturnRealComputedStylesForBeforeElement
      )

      /* Test: should return real computed styles for after element */
      it("should return real computed styles for after element",
        loadShouldReturnRealComputedStylesForAfterElement
      )
    })
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: #load
 * ------------------------------------------------------------------------- */

/* Test: #load should return computed styles for element */
function loadShouldReturnRealComputedStylesForElement() {
  const decl = window.getComputedStyle(fixture.el.firstChild)
  expect(style.load(fixture.el.firstChild))
    .toEqual(decl)
}

/* Test: #load should return real computed styles for before element */
function loadShouldReturnRealComputedStylesForBeforeElement() {
  const decl = window.getComputedStyle(fixture.el.firstChild, "::before")
  expect(style.load(fixture.el.firstChild, style.PSEUDO_BEFORE))
    .toEqual(decl)
}

/* Test: #load should return real computed styles for after element */
function loadShouldReturnRealComputedStylesForAfterElement() {
  const decl = window.getComputedStyle(fixture.el.firstChild, "::after")
  expect(style.load(fixture.el.firstChild, style.PSEUDO_AFTER))
    .toEqual(decl)
}
