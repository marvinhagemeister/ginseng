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

    /* Cleanup fixtures */
    afterEach(() => {
      fixture.cleanup()
    })

    /* .style */
    describe(".style", () => {

      /* Load fixtures */
      beforeEach(() => {
        fixture.load("style.html")

        /* Register spies and register spies */
        spyOn(window, "getComputedStyle")
      })

      /* Test: should return computed styles */
      it("should return computed styles for element",
        styleShouldReturnComputedStylesForElement
      )

      /* Test: should return computed styles for ::before pseudo element */
      it("should return computed styles for ::before pseudo element",
        styleShouldReturnComputedStylesForBeforePseudoElement
      )

      /* Test: should return computed styles for ::after pseudo element */
      it("should return computed styles for ::after pseudo element",
        styleShouldReturnComputedStylesForAfterPseudoElement
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

    /* .mock */
    describe(".mock", () => {

      /* Load fixtures and register spies */
      beforeEach(function() {
        fixture.load("mock.html")

        /* Register spies */
        spyOn(fixture.el.querySelector(".mock"), "insertBefore")
        spyOn(fixture.el.querySelector(".mock"), "appendChild")
        spyOn(fixture.el.querySelector(".mock"), "setAttribute")

        /* Create stylesheet for testing */
        this.stylesheet = document.body.appendChild(
          document.createElement("style")).sheet
      })

      /* Test: should create mock for ::before pseudo element */
      it("should create mock for ::before pseudo element",
        mockShouldCreateMockForBeforePseudoElement
      )

      /* Test: should create mock for ::after pseudo element */
      it("should create mock for ::after pseudo element",
        mockShouldCreateMockForAfterPseudoElement
      )

      /* Test: should mark element as mocked */
      it("should mark element as mocked",
        mockShouldMarkElementAsMocked
      )

      /* Test: should use pseudo element tag */
      it("should use pseudo element tag",
        mockShouldUsePseudoElementTag
      )

      /* Test: should set pseudo element type */
      it("should set pseudo element type",
        mockShouldSetPseudoElementType
      )

      /* Test: should set pseudo element content */
      it("should set pseudo element content",
        mockShouldSetPseudoElementContent
      )

      /* Test: should set pseudo element identifier */
      it("should set pseudo element identifier",
        mockShouldSetPseudoElementIdentifier
      )

      // TODO: test stylesheet.insertRule
      // TODO: test for integration with background property.

      /* Test: should skip empty pseudo element */
      it("should skip empty pseudo element",
        mockShouldSkipEmptyPseudoElement
      )

      /* Test: should skip non-displayed pseudo element */
      it("should skip non-displayed pseudo element",
        mockShouldSkipNonDisplayedPseudoElement
      )

      /* Test: should throw on invalid element */
      it("should throw on invalid element",
        mockShouldThrowOnInvalidElement
      )

      /* Test: should throw on invalid type */
      it("should throw on invalid type",
        mockShouldThrowOnInvalidType
      )

      /* Test: should throw on invalid stylesheet */
      it("should throw on invalid stylesheet",
        mockShouldThrowOnInvalidStyleSheet
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

/* Test: .style should return computed styles for before pseudo element */
function styleShouldReturnComputedStylesForBeforePseudoElement() {
  pseudo.style(fixture.el.firstElementChild, "::before")
  expect(window.getComputedStyle)
    .toHaveBeenCalledWith(fixture.el.firstElementChild, "::before")
}

/* Test: .style should return computed styles for after pseudo element */
function styleShouldReturnComputedStylesForAfterPseudoElement() {
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

/* ----------------------------------------------------------------------------
 * Definitions: .mock
 * ------------------------------------------------------------------------- */

/* Test: .mock should create mock for ::before pseudo element */
function mockShouldCreateMockForBeforePseudoElement() {
  const el = fixture.el.querySelector(".mock")
  pseudo.mock(el, "::before", this.stylesheet)
  expect(el.insertBefore)
    .toHaveBeenCalledWith(jasmine.any(HTMLElement), el.firstChild)
}

/* Test: .mock should create mock for ::after pseudo element */
function mockShouldCreateMockForAfterPseudoElement() {
  const el = fixture.el.querySelector(".mock")
  pseudo.mock(el, "::after", this.stylesheet)
  expect(el.appendChild)
    .toHaveBeenCalledWith(jasmine.any(HTMLElement))
}

/* Test: .mock should mark element as mocked */
function mockShouldMarkElementAsMocked() {
  const el = fixture.el.querySelector(".mock")
  pseudo.mock(el, "::before", this.stylesheet)
  expect(el.setAttribute)
    .toHaveBeenCalledWith("data-gs-state", "mocked")
}

/* Test: .mock should use pseudo element tag */
function mockShouldUsePseudoElementTag() {
  const el = fixture.el.querySelector(".mock")
  const mock = pseudo.mock(el, "::before", this.stylesheet)
  expect(mock.tagName)
    .toEqual("GS-PSEUDO")
}

/* Test: .mock should set pseudo element type */
function mockShouldSetPseudoElementType() {
  const el = fixture.el.querySelector(".mock")
  const mock = pseudo.mock(el, "::before", this.stylesheet)
  expect(mock.getAttribute("data-gs-type"))
    .toEqual("::before")
}

/* Test: .mock should set pseudo element content */
function mockShouldSetPseudoElementContent() {
  const el = fixture.el.querySelector(".mock")
  const mock = pseudo.mock(el, "::before", this.stylesheet)
  expect(mock.textContent)
    .toEqual("before")
}

/* Test: .mock should set pseudo element identifier */
function mockShouldSetPseudoElementIdentifier() {
  const el = fixture.el.querySelector(".mock")
  const mock = pseudo.mock(el, "::before", this.stylesheet)
  expect(mock.getAttribute("data-gs-id"))
    .toEqual("_0")
}

/* Test: .mock should skip empty pseudo element */
function mockShouldSkipEmptyPseudoElement() {
  const el = fixture.el.querySelector(".mock-empty")
  expect(pseudo.mock(el, "::before", this.stylesheet))
    .toBe(null)
}

/* Test: .mock should skip non-displayed pseudo element */
function mockShouldSkipNonDisplayedPseudoElement() {
  const el = fixture.el.querySelector(".mock-non-displayed")
  expect(pseudo.mock(el, "::before", this.stylesheet))
    .toBe(null)
}

/* Test: .mock should throw on invalid element */
function mockShouldThrowOnInvalidElement() {
  expect(() => {
    pseudo.mock("genmaicha")
  }).toThrow(
    new TypeError("Invalid element: 'genmaicha'"))
}

/* Test: .mock should throw on invalid type */
function mockShouldThrowOnInvalidType() {
  expect(() => {
    pseudo.mock(fixture.el.firstElementChild)
  }).toThrow(
    new TypeError("Invalid type: undefined"))
}

/* Test: .mock should throw on invalid stylesheet */
function mockShouldThrowOnInvalidStyleSheet() {
  expect(() => {
    pseudo.mock(fixture.el.firstElementChild, "::before")
  }).toThrow(
    new TypeError("Invalid stylesheet: undefined"))
}
