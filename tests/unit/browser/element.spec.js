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

    /* Set fixture base path */
    beforeAll(() => {
      fixture.setBase("fixtures/browser/element")
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

      /* Test: should throw on invalid qualifier */
      it("should throw on invalid qualifier",
        styleShouldThrowOnInvalidQualifier
      )
    })

    /* .layout */
    describe(".layout", () => {

      /* Load fixtures and register spies */
      beforeEach(() => {
        fixture.load("layout.html")

        /* Register spies */
        spyOn(fixture.el, "getBoundingClientRect")
          .and.returnValue({
            bottom: 120,
            left: 0,
            right: 120,
            top: 0
          })
        spyOnProperty(fixture.el.lastChild, "clientWidth")
          .and.returnValue(120)
        spyOnProperty(fixture.el.lastChild, "clientHeight")
          .and.returnValue(120)
        spyOn(fixture.el.lastChild, "getBoundingClientRect")
          .and.returnValue({
            bottom: 120,
            left: 0,
            right: 120,
            top: 0
          })
        spyOnProperty(fixture.el.lastChild.firstElementChild, "clientWidth")
          .and.returnValue(100)
        spyOnProperty(fixture.el.lastChild.firstElementChild, "clientHeight")
          .and.returnValue(100)
        spyOn(fixture.el.lastChild.firstElementChild, "getBoundingClientRect")
          .and.returnValue({
            bottom: 110,
            left: 10,
            right: 110,
            top: 10
          })
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

      /* Test: should throw on invalid element */
      it("should throw on invalid element",
        layoutShouldThrowOnInvalidElement
      )
    })
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: .style
 * ------------------------------------------------------------------------- */

/* Test: .style should return computed styles for element */
function styleShouldReturnComputedStylesForElement() {
  element.style(fixture.el.firstElementChild)
  expect(window.getComputedStyle)
    .toHaveBeenCalledWith(fixture.el.firstElementChild, null)
}

/* Test: .style should return computed styles for before element */
function styleShouldReturnComputedStylesForBeforeElement() {
  element.style(fixture.el.firstElementChild, "::before")
  expect(window.getComputedStyle)
    .toHaveBeenCalledWith(fixture.el.firstElementChild, "::before")
}

/* Test: .style should return computed styles for after element */
function styleShouldReturnComputedStylesForAfterElement() {
  element.style(fixture.el.firstElementChild, "::after")
  expect(window.getComputedStyle)
    .toHaveBeenCalledWith(fixture.el.firstElementChild, "::after")
}

/* Test: .style should throw on invalid element */
function styleShouldThrowOnInvalidElement() {
  expect(() => {
    element.style("genmaicha")
  }).toThrow(
    new TypeError("Invalid element: \"genmaicha\""))
  expect(window.getComputedStyle)
    .not.toHaveBeenCalled()
}

/* Test: .style should throw on invalid qualifier */
function styleShouldThrowOnInvalidQualifier() {
  expect(() => {
    element.style(fixture.el.firstElementChild, "oolong")
  }).toThrow(
    new TypeError("Invalid qualifier: \"oolong\""))
  expect(window.getComputedStyle)
    .not.toHaveBeenCalled()
}

/* ----------------------------------------------------------------------------
 * Definitions: .layout
 * ------------------------------------------------------------------------- */

/* Test: .layout should return dimensions for element */
function layoutShouldReturnDimensionsForElement() {
  const data = element.layout(fixture.el.querySelector(".container"))
  expect(data.width)
    .toEqual(120)
  expect(data.height)
    .toEqual(120)
}

/* Test: .layout should return dimensions for element with margin */
function layoutShouldReturnDimensionsForElementWithMargin() {
  const data = element.layout(fixture.el.querySelector(".layout"))
  expect(data.width)
    .toEqual(100)
  expect(data.height)
    .toEqual(100)
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

/* Test: .layout should throw on invalid element */
function layoutShouldThrowOnInvalidElement() {
  expect(() => {
    element.layout("genmaicha")
  }).toThrow(
    new TypeError("Invalid element: \"genmaicha\""))
}
