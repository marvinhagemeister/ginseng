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

import * as dom from "~/src/browser/dom"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* [Browser] */
describe("[Browser]", () => {

  /* dom */
  describe("dom", () => {

    /* Set fixture base path */
    beforeAll(() => {
      fixture.setBase("tests/fixtures/browser/dom")
    })

    /* Cleanup fixtures */
    afterEach(() => {
      fixture.cleanup()
    })

    /* #query */
    describe("#query", () => {

      /* Load fixtures and register spies */
      beforeEach(() => {
        fixture.load("query.html")

        /* Register spies */
        spyOn(document, "querySelector")
          .and.callFake(selector => {
            return selector !== ".no-match"
              ? fixture.el.firstChild
              : null
          })
      })

      /* Test: should accept selector */
      it("should accept selector",
        queryShouldAcceptSelector
      )

      /* Test: should accept element */
      it("should accept element",
        queryShouldAcceptElement
      )

      /* Test: should throw on missing argument */
      it("should throw on missing argument",
        queryShouldThrowOnMissingArgument
      )

      /* Test: should throw on empty selector */
      it("should throw on empty selector",
        queryShouldThrowOnEmptySelector
      )

      /* Test: should throw on invalid selector */
      it("should throw on invalid selector",
        queryShouldThrowOnInvalidSelector
      )
    })

    /* #traverse */
    describe("#traverse", () => {

      /* Load fixtures and register spies */
      beforeEach(() => {
        fixture.load("traverse.html", "traverse.json")

        /* Register spies */
        spyOn(document, "querySelector")
          .and.callFake(selector => {
            return selector !== ".no-match"
              ? fixture.el.firstChild
              : null
          })
      })

      /* Test: should resolve selector */
      it("should resolve selector",
        traverseShouldResolveSelector
      )

      /* Test: should apply callback to element */
      it("should apply callback to element",
        traverseShouldApplyCallbackToElement
      )

      /* Test: should apply callback to all child elements */
      it("should apply callback to all child elements",
        traverseShouldApplyCallbackToAllChildElements
      )

      /* Test: should throw on invalid callback */
      it("should throw on invalid callback",
        traverseShouldThrowOnInvalidCallback
      )
    })
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: #query
 * ------------------------------------------------------------------------- */

/* Test: #query should accept selector */
function queryShouldAcceptSelector() {
  expect(dom.query(".query"))
    .toEqual(fixture.el.firstChild)
  expect(document.querySelector)
    .toHaveBeenCalledWith(".query")
}

/* Test: #query should accept element */
function queryShouldAcceptElement() {
  expect(dom.query(fixture.el.firstChild))
    .toEqual(fixture.el.firstChild)
  expect(document.querySelector)
    .not.toHaveBeenCalled()
}

/* Test: #query should throw on missing argument */
function queryShouldThrowOnMissingArgument() {
  expect(() => {
    dom.query()
  }).toThrow(
    new ReferenceError("Invalid selector or element: \"undefined\""))
  expect(document.querySelector)
    .not.toHaveBeenCalled()
}

/* Test: #query should throw on empty selector */
function queryShouldThrowOnEmptySelector() {
  expect(() => {
    dom.query("")
  }).toThrow(
    new ReferenceError("No match for selector: \"\""))
  expect(document.querySelector)
    .not.toHaveBeenCalled()
}

/* Test: #query should throw on invalid selector */
function queryShouldThrowOnInvalidSelector() {
  expect(() => {
    dom.query(".no-match")
  }).toThrow(
    new ReferenceError("No match for selector: \".no-match\""))
  expect(document.querySelector)
    .toHaveBeenCalledWith(".no-match")
}

/* ----------------------------------------------------------------------------
 * Definitions: #traverse
 * ------------------------------------------------------------------------- */

/* Test: #traverse should resolve selector */
function traverseShouldResolveSelector() {
  expect(() => {
    dom.traverse(".traverse", () => {})
  }).not.toThrow(
    jasmine.any(TypeError))
  expect(document.querySelector)
    .toHaveBeenCalled()
}

/* Test: #traverse should apply callback to element */
function traverseShouldApplyCallbackToElement() {
  const cb = jasmine.createSpy("callback")
  expect(() => {
    dom.traverse(".traverse", cb)
  }).not.toThrow(
    jasmine.any(TypeError))
  expect(cb)
    .toHaveBeenCalled()
}

/* Test: #traverse should apply callback on all child elements */
function traverseShouldApplyCallbackToAllChildElements() {
  expect(dom.traverse(".traverse", (node, children) => {
    return { tag: node.tagName, children }
  })).toEqual(fixture.json[0])
}

/* Test: #traverse should throw on invalid callback */
function traverseShouldThrowOnInvalidCallback() {
  expect(() => {
    dom.traverse(".traverse", "")
  }).toThrow(
    new TypeError("Invalid callback"))
}
