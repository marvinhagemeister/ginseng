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
import * as pseudo from "~/src/browser/pseudo"

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

    /* Cleanup fixtures */
    afterEach(() => {
      fixture.cleanup()
    })

    /* .style */
    describe(".style", () => {

      /* Load fixtures and register spies */
      beforeEach(() => {
        fixture.load("style.html")

        /* Register spies */
        spyOn(pseudo, "style")
      })

      /* Test: should return computed styles */
      it("should return computed styles for element",
        styleShouldReturnComputedStylesForElement
      )
    })

    /* .attrs */
    describe(".attrs", () => {

      /* Load fixtures and register spies */
      beforeEach(() => {
        fixture.load("attrs.html")

        /* Register spies */
        spyOnProperty(fixture.el.firstElementChild, "attributes")
          .and.returnValue([
            {
              name: "class",
              value: "class"
            },
            {
              name: "id",
              value: "id"
            },
            {
              name: "style",
              value: "style"
            }
          ])
      })

      /* Test: should return attributes */
      it("should return attributes",
        attrsShouldReturnAttributes
      )

      /* Test: should throw on invalid element */
      it("should throw on invalid element",
        attrsShouldThrowOnInvalidElement
      )
    })

    /* .size */
    describe(".size", () => {

      /* Load fixtures and register spies */
      beforeEach(() => {
        fixture.load("size.html")

        /* Register spies */
        spyOnProperty(fixture.el.lastChild, "offsetWidth")
          .and.returnValue(120)
        spyOnProperty(fixture.el.lastChild, "offsetHeight")
          .and.returnValue(120)
        spyOnProperty(fixture.el.lastChild.firstElementChild, "offsetWidth")
          .and.returnValue(100)
        spyOnProperty(fixture.el.lastChild.firstElementChild, "offsetHeight")
          .and.returnValue(100)
      })

      /* Test: should return dimensions for element */
      it("should return dimensions for element",
        sizeShouldReturnDimensionsForElement
      )

      /* Test: should return dimensions for element with margin */
      it("should return dimensions for element with margin",
        sizeShouldReturnDimensionsForElementWithMargin
      )

      /* Test: should throw on invalid element */
      it("should throw on invalid element",
        sizeShouldThrowOnInvalidElement
      )
    })

    /* .offset */
    describe(".offset", () => {

      /* Load fixtures and register spies */
      beforeEach(() => {
        fixture.load("offset.html")

        /* Register spies */
        spyOn(fixture.el, "getBoundingClientRect")
          .and.returnValue({
            bottom: 120,
            left: 0,
            right: 120,
            top: 0
          })
        spyOn(fixture.el.lastChild, "getBoundingClientRect")
          .and.returnValue({
            bottom: 120,
            left: 0,
            right: 120,
            top: 0
          })
        spyOn(fixture.el.lastChild.firstElementChild, "getBoundingClientRect")
          .and.returnValue({
            bottom: 110,
            left: 10,
            right: 110,
            top: 10
          })
      })

      /* Test: should return offsets for element */
      it("should return offsets for element",
        offsetShouldReturnOffsetsForElement
      )

      /* Test: should return offsets for element with margin */
      it("should return offsets for element with margin",
        offsetShouldReturnOffsetsForElementWithMargin
      )

      /* Test: should throw on invalid element */
      it("should throw on invalid element",
        offsetShouldThrowOnInvalidElement
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
  expect(pseudo.style)
    .toHaveBeenCalledWith(fixture.el.firstElementChild, null)
}

/* ----------------------------------------------------------------------------
 * Definitions: .attrs
 * ------------------------------------------------------------------------- */

/* Test: .attrs should return attributes */
function attrsShouldReturnAttributes() {
  expect(element.attrs(fixture.el.firstElementChild))
    .toEqual({
      class: "class",
      id: "id"
    })
}

/* Test: .attrs should throw on invalid element */
function attrsShouldThrowOnInvalidElement() {
  expect(() => {
    element.attrs("invalid")
  }).toThrow(
    new TypeError("Invalid element: 'invalid'"))
}

/* ----------------------------------------------------------------------------
 * Definitions: .size
 * ------------------------------------------------------------------------- */

/* Test: .size should return dimensions for element */
function sizeShouldReturnDimensionsForElement() {
  const data = element.size(fixture.el.querySelector(".container"))
  expect(data)
    .toEqual({
      width: 120,
      height: 120
    })
}

/* Test: .size should return dimensions for element with margin */
function sizeShouldReturnDimensionsForElementWithMargin() {
  const data = element.size(fixture.el.querySelector(".size"))
  expect(data)
    .toEqual({
      width: 100,
      height: 100
    })
}

/* Test: .size should throw on invalid element */
function sizeShouldThrowOnInvalidElement() {
  expect(() => {
    element.size("invalid")
  }).toThrow(
    new TypeError("Invalid element: 'invalid'"))
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

/* Test: .offset should throw on invalid element */
function offsetShouldThrowOnInvalidElement() {
  expect(() => {
    element.offset("invalid")
  }).toThrow(
    new TypeError("Invalid element: 'invalid'"))
}
