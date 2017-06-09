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

import * as element from "~/src/browser/element"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* Browser */
describe("Browser", () => {

  /* element */
  describe("element", () => {

    /* Integration tests */
    describe("_integration", () => {

      /* Set fixture base path */
      beforeAll(() => {
        fixture.setBase("fixtures/browser/element")
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

        /* Test: should return computed styles for element */
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
      })

      /* .layout */
      describe(".layout", () => {

        /* Load fixtures */
        beforeEach(() => {
          fixture.load("layout.html")
        })

        /* Test: should return dimensions for element */
        it("should return dimensions for element",
          layoutShouldReturnDimensionsForElement
        )

        /* Test: should return dimensions for element with margin */
        it("should return dimensions for element with margin",
          layoutShouldReturnDimensionsForElementWithMargin
        )

        /* Test: should return offsets for element */
        it("should return offsets for element",
          layoutShouldReturnOffsetsForElement
        )

        /* Test: should return offsets for element with margin */
        it("should return offsets for element with margin",
          layoutShouldReturnOffsetsForElementWithMargin
        )
      })
    })
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: .style
 * ------------------------------------------------------------------------- */

/* Test: .style should return computed styles for element */
function styleShouldReturnComputedStylesForElement() {
  const raw = window.getComputedStyle(fixture.el.firstElementChild)
  const properties = element.style(fixture.el.firstElementChild)
  expect(Object.keys(properties).length)
    .toBeGreaterThan(151) // IE9 has 152 properties
  Object.keys(properties).forEach(p => {
    expect(properties[p])
      .toEqual(raw[p])
  })
}

/* Test: .style should return computed styles for before element */
function styleShouldReturnComputedStylesForBeforeElement() {
  const raw = window.getComputedStyle(fixture.el.firstElementChild, "::before")
  const properties = element.style(fixture.el.firstElementChild, "::before")
  expect(Object.keys(properties).length)
    .toBeGreaterThan(151) // IE9 has 152 properties
  Object.keys(properties).forEach(p => {
    expect(properties[p])
      .toEqual(raw[p])
  })
}

/* Test: .style should return computed styles for after element */
function styleShouldReturnComputedStylesForAfterElement() {
  const raw = window.getComputedStyle(fixture.el.firstElementChild, "::after")
  const properties = element.style(fixture.el.firstElementChild, "::after")
  expect(Object.keys(properties).length)
    .toBeGreaterThan(151) // IE9 has 152 properties
  Object.keys(properties).forEach(p => {
    expect(properties[p])
      .toEqual(raw[p])
  })
}

/* ----------------------------------------------------------------------------
 * Definitions: .layout
 * ------------------------------------------------------------------------- */

/* Test: .layout should return dimensions for element */
function layoutShouldReturnDimensionsForElement() {
  const data = element.layout(fixture.el.querySelector(".container"))
  expect(data.width)
    .toEqual(document.body.clientWidth)
  expect(data.height)
    .toEqual(document.body.clientHeight)
}

/* Test: .layout should return dimensions for element with margin */
function layoutShouldReturnDimensionsForElementWithMargin() {
  const data = element.layout(fixture.el.querySelector(".layout"))
  expect(data.width)
    .toEqual(document.body.clientWidth - 20)
  expect(data.height)
    .toEqual(document.body.clientHeight - 20)
}

/* Test: .layout should return offsets for element */
function layoutShouldReturnOffsetsForElement() {
  const data = element.layout(fixture.el.querySelector(".container"))
  expect(data.offset)
    .toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })
}

/* Test: .layout should return offsets for element with margin */
function layoutShouldReturnOffsetsForElementWithMargin() {
  const data = element.layout(fixture.el.querySelector(".layout"))
  expect(data.offset)
    .toEqual({
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    })
}
