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

    /* Integration tests */
    describe("_integration", () => {

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
        })

        /* Test: should return computed styles for element */
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
      })

      /* .mock */
      describe(".mock", () => {

        /* Load fixtures */
        beforeEach(function() {
          fixture.load("mock.html")

          /* Create stylesheet for testing */
          this.stylesheet = document.body.appendChild(
            document.createElement("style")).sheet
        })

        /* Test: should set pseudo element content */
        it("should set pseudo element content",
          mockShouldSetPseudoElementContent
        )

        /* Test: should set pseudo element styles */
        it("should set pseudo element styles",
          mockShouldSetPseudoElementStyles
        )

        /* Test: should skip empty pseudo element */
        it("should skip empty pseudo element",
          mockShouldSkipEmptyPseudoElement
        )

        /* Test: should skip non-displayed pseudo element */
        it("should skip non-displayed pseudo element",
          mockShouldSkipNonDisplayedPseudoElement
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
  const data = pseudo.style(fixture.el.firstChild, null)
  expect(Object.keys(data).length)
    .toBeGreaterThan(147) // IE9 has 148 properties
  Object.keys(data).forEach(property => {
    expect(data[property])
      .toEqual(styles[property])
  })
}

/* Test: .style should return computed styles for ::before element */
function styleShouldReturnComputedStylesForBeforePseudoElement() {
  const styles = window.getComputedStyle(fixture.el.firstChild, "::before")
  const data = pseudo.style(fixture.el.firstChild, "::before")
  expect(Object.keys(data).length)
    .toBeGreaterThan(147) // IE9 has 148 properties
  Object.keys(data).forEach(property => {
    expect(data[property])
      .toEqual(styles[property])
  })
}

/* Test: .style should return computed styles for ::after element */
function styleShouldReturnComputedStylesForAfterPseudoElement() {
  const styles = window.getComputedStyle(fixture.el.firstChild, "::after")
  const data = pseudo.style(fixture.el.firstChild, "::after")
  expect(Object.keys(data).length)
    .toBeGreaterThan(147) // IE9 has 148 properties
  Object.keys(data).forEach(property => {
    expect(data[property])
      .toEqual(styles[property])
  })
}

/* ----------------------------------------------------------------------------
 * Definitions: .mock
 * ------------------------------------------------------------------------- */

/* Test: .mock should set pseudo element content */
function mockShouldSetPseudoElementContent() {
  const el = fixture.el.querySelector(".mock")
  const mock = pseudo.mock(el, "::before", this.stylesheet)
  expect(mock.textContent)
    .toEqual("before")
}

/* Test: .mock should set pseudo element styles */
function mockShouldSetPseudoElementStyles() {
  const el = fixture.el.querySelector(".mock")
  const mock = pseudo.mock(el, "::before", this.stylesheet)
  expect(mock.style.backgroundColor)
    .not.toEqual("")
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
