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
      })

      /* .size */
      describe(".size", () => {

        /* Load fixtures */
        beforeEach(() => {
          fixture.load("size.html")
        })

        /* Test: should return dimensions for element */
        it("should return dimensions for element",
          sizeShouldReturnDimensionsForElement
        )

        /* Test: should return dimensions for element with margin */
        it("should return dimensions for element with margin",
          sizeShouldReturnDimensionsForElementWithMargin
        )

        /* Test: should return dimensions for top-level element */
        it("should return dimensions for top-level element",
          sizeShouldReturnDimensionsForTopLevelElement
        )
      })

      /* .offset */
      describe(".offset", () => {

        /* Load fixtures */
        beforeEach(() => {
          fixture.load("offset.html")
        })

        /* Test: should return offsets for element */
        it("should return offsets for element",
          offsetShouldReturnOffsetsForElement
        )

        /* Test: should return offsets for element with margin */
        it("should return offsets for element with margin",
          offsetShouldReturnOffsetsForElementWithMargin
        )

        /* Test: should return offsets for top-level element */
        it("should return offsets for top-level element",
          offsetShouldReturnOffsetsForTopLevelElement
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
  const styles = window.getComputedStyle(fixture.el.firstChild)
  const data = element.style(fixture.el.firstChild)
  expect(Object.keys(data).length)
    .toBeGreaterThan(151) // IE9 has 152 properties
  Object.keys(data).forEach(property => {
    expect(data[property])
      .toEqual(styles[property])
  })
}

/* ----------------------------------------------------------------------------
 * Definitions: .size
 * ------------------------------------------------------------------------- */

/* Test: .size should return dimensions for element */
function sizeShouldReturnDimensionsForElement() {
  const data = element.size(fixture.el.querySelector(".container"))
  expect(data.width)
    .toEqual(document.body.offsetWidth)
  expect(data.height)
    .toEqual(document.body.offsetHeight)
}

/* Test: .size should return dimensions for element with margin */
function sizeShouldReturnDimensionsForElementWithMargin() {
  const data = element.size(fixture.el.querySelector(".size"))
  expect(data.width)
    .toEqual(document.body.offsetWidth - 20)
  expect(data.height)
    .toEqual(document.body.offsetHeight - 20)
}

/* Test: .offset should return offsets for top-level element */
function sizeShouldReturnDimensionsForTopLevelElement() {
  const data = element.size(document.body)
  expect(data.width)
    .toEqual(document.body.offsetWidth)
  expect(data.height)
    .toEqual(document.body.offsetHeight)
}

/* ----------------------------------------------------------------------------
 * Definitions: .offset
 * ------------------------------------------------------------------------- */

/* Test: .offset should return offsets for element */
function offsetShouldReturnOffsetsForElement() {
  const data = element.offset(fixture.el.querySelector(".container"))
  expect(data)
    .toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })
}

/* Test: .offset should return offsets for element with margin */
function offsetShouldReturnOffsetsForElementWithMargin() {
  const data = element.offset(fixture.el.querySelector(".offset"))
  expect(data)
    .toEqual({
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    })
}

/* Test: .offset should return offsets for top-level element */
function offsetShouldReturnOffsetsForTopLevelElement() {
  const data = element.offset(document.body)
  expect(data)
    .toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })
}
