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

/* Browser */
describe("Browser", () => {

  /* style */
  describe("style", () => {

    /* Integration tests */
    describe("_integration", () => {

      /* Set fixture base path */
      beforeAll(() => {
        fixture.setBase("fixtures/browser/style")
      })

      /* Cleanup fixtures */
      afterEach(() => {
        fixture.cleanup()
      })

      /* .load */
      describe(".load", () => {

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
      })
    })
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: .load
 * ------------------------------------------------------------------------- */

/* Test: .load should return computed styles for element */
function loadShouldReturnComputedStylesForElement() {
  const raw = window.getComputedStyle(fixture.el.firstChild)
  const properties = style.load(fixture.el.firstChild)
  expect(Object.keys(properties).length)
    .toBeGreaterThan(151) // IE9 has 152 properties
  Object.keys(properties).forEach(p => {
    expect(properties[p])
      .toEqual(raw[p])
  })
}

/* Test: .load should return computed styles for before element */
function loadShouldReturnComputedStylesForBeforeElement() {
  const raw = window.getComputedStyle(fixture.el.firstChild, "::before")
  const properties = style.load(fixture.el.firstChild, "::before")
  expect(Object.keys(properties).length)
    .toBeGreaterThan(151) // IE9 has 152 properties
  Object.keys(properties).forEach(p => {
    expect(properties[p])
      .toEqual(raw[p])
  })
}

/* Test: .load should return computed styles for after element */
function loadShouldReturnComputedStylesForAfterElement() {
  const raw = window.getComputedStyle(fixture.el.firstChild, "::after")
  const properties = style.load(fixture.el.firstChild, "::after")
  expect(Object.keys(properties).length)
    .toBeGreaterThan(151) // IE9 has 152 properties
  Object.keys(properties).forEach(p => {
    expect(properties[p])
      .toEqual(raw[p])
  })
}
