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

        /* Test: should return computed styles for before element */
        it("should return computed styles for before element",
          styleShouldReturnComputedStylesForBeforeElement
        )

        /* Test: should return computed styles for after element */
        it("should return computed styles for after element",
          styleShouldReturnComputedStylesForAfterElement
        )
      })

      /* .mock */
      describe(".mock", () => {

        /* Load fixtures */
        beforeEach(() => {
          fixture.load("mock.html")
        })

        /* Test: should do something */
        it("should do something",
          mockShouldDoSomething
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

/* Test: .style should return computed styles for before element */
function styleShouldReturnComputedStylesForBeforeElement() {
  const styles = window.getComputedStyle(fixture.el.firstChild, "::before")
  const data = pseudo.style(fixture.el.firstChild, "::before")
  expect(Object.keys(data).length)
    .toBeGreaterThan(147) // IE9 has 148 properties
  Object.keys(data).forEach(property => {
    expect(data[property])
      .toEqual(styles[property])
  })
}

/* Test: .style should return computed styles for after element */
function styleShouldReturnComputedStylesForAfterElement() {
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

/* Test: .mock TODO */
function mockShouldDoSomething() {
  //
  // const pre = document.createElement("style") // TODO: put attr here!?
  // pre.id = "pre"
  // document.body.appendChild(pre) // TODO: abstract document away!
  // pre.textContent = require("~/src/assets/ginseng.scss")
  //
  // const post = document.createElement("style") // TODO: put attr here!?
  // post.id = "post"
  // document.body.appendChild(post)
  // post.sheet.disabled = true
  //
  // pseudo.mock(fixture.el.querySelector(".mock"), "::before")
}
