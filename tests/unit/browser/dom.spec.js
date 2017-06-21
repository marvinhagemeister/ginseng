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

/* Browser */
describe("Browser", () => {

  /* dom */
  describe("dom", () => {

    /* Set fixture base path */
    beforeAll(() => {
      fixture.setBase("fixtures/browser/dom")
    })

    /* Cleanup fixtures */
    afterEach(() => {
      fixture.cleanup()
    })

    /* .create */
    describe(".create", () => {

      /* Register spies */
      beforeEach(() => {
        spyOn(document, "createElement")
      })

      /* Test: should create element */
      it("should create element",
        createShouldCreateElement
      )
    })

    /* .query */
    describe(".query", () => {

      /* Load fixtures and register spies */
      beforeEach(() => {
        fixture.load("query.html")

        /* Register spies */
        spyOn(document, "querySelector")
          .and.callFake(selector => {
            return selector !== ".no-match"
              ? fixture.el.firstElementChild
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

      /* Test: should throw on non-matching type */
      it("should throw on non-matching type",
        queryShouldThrowOnNonMatchingType
      )
    })

    /* .resolve */
    describe(".resolve", () => {

      /* Load fixtures and register spies */
      beforeEach(() => {
        fixture.load("resolve.html")

        /* Register spies */
        spyOn(document, "getElementById")
          .and.callFake(id => {
            return id !== "no-match"
              ? fixture.el.firstElementChild
              : null
          })
      })

      /* Test: should resolve identifier */
      it("should resolve identifier",
        resolveShouldResolveIdentifier
      )

      /* Test: should throw on missing argument */
      it("should throw on missing argument",
        resolveShouldThrowOnMissingArgument
      )

      /* Test: should throw on empty identifier */
      it("should throw on empty identifier",
        resolveShouldThrowOnEmptyIdentifier
      )

      /* Test: should throw on invalid identifier */
      it("should throw on invalid identifier",
        resolveShouldThrowOnInvalidIdentifier
      )

      /* Test: should throw on non-matching type */
      it("should throw on non-matching type",
        resolveShouldThrowOnNonMatchingType
      )
    })

    /* .traverse */
    describe(".traverse", () => {

      /* Load fixtures and register spies */
      beforeEach(() => {
        fixture.load("traverse.html", "traverse.json")

        /* Register spies */
        spyOn(document, "querySelector")
          .and.callFake(selector => {
            return selector !== ".no-match"
              ? fixture.el.firstElementChild
              : null
          })
      })

      /* Test: should resolve selector */
      it("should resolve selector",
        traverseShouldResolveSelector
      )

      /* Test: should invoke callback on element */
      it("should invoke callback to element",
        traverseShouldInvokeCallbackOnElement
      )

      /* Test: should invoke callback on all child elements */
      it("should invoke callback on all child elements",
        traverseShouldInvokeCallbackOnAllChildElements
      )

      /* Test: should throw on invalid callback */
      it("should throw on invalid callback",
        traverseShouldThrowOnInvalidCallback
      )
    })
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: .create
 * ------------------------------------------------------------------------- */

/* Test: .create should create element */
function createShouldCreateElement() {
  dom.create("tag")
  expect(document.createElement)
    .toHaveBeenCalledWith("tag")
}

/* ----------------------------------------------------------------------------
 * Definitions: .query
 * ------------------------------------------------------------------------- */

/* Test: .query should accept selector */
function queryShouldAcceptSelector() {
  expect(dom.query(".query"))
    .toEqual(fixture.el.firstElementChild)
  expect(document.querySelector)
    .toHaveBeenCalledWith(".query")
}

/* Test: .query should accept element */
function queryShouldAcceptElement() {
  expect(dom.query(fixture.el.firstElementChild))
    .toEqual(fixture.el.firstElementChild)
  expect(document.querySelector)
    .not.toHaveBeenCalled()
}

/* Test: .query should throw on missing argument */
function queryShouldThrowOnMissingArgument() {
  expect(() => {
    dom.query()
  }).toThrow(
    new ReferenceError("Invalid selector or element: undefined"))
  expect(document.querySelector)
    .not.toHaveBeenCalled()
}

/* Test: .query should throw on empty selector */
function queryShouldThrowOnEmptySelector() {
  expect(() => {
    dom.query("")
  }).toThrow(
    new ReferenceError("No match for selector: ''"))
  expect(document.querySelector)
    .not.toHaveBeenCalled()
}

/* Test: .query should throw on invalid selector */
function queryShouldThrowOnInvalidSelector() {
  expect(() => {
    dom.query(".no-match")
  }).toThrow(
    new ReferenceError("No match for selector: '.no-match'"))
  expect(document.querySelector)
    .toHaveBeenCalledWith(".no-match")
}

/* Test: .query should throw on non-matching type */
function queryShouldThrowOnNonMatchingType() {
  expect(() => {
    dom.query(".query", HTMLAnchorElement)
  }).toThrow(
    new TypeError("No match for selector: '.query'"))
  expect(document.querySelector)
    .toHaveBeenCalledWith(".query")
}

/* ----------------------------------------------------------------------------
 * Definitions: .resolve
 * ------------------------------------------------------------------------- */

/* Test: .resolve should resolve identifier */
function resolveShouldResolveIdentifier() {
  expect(dom.resolve("resolve"))
    .toEqual(fixture.el.firstElementChild)
}

/* Test: .resolve should throw on missing argument */
function resolveShouldThrowOnMissingArgument() {
  expect(() => {
    dom.resolve()
  }).toThrow(
    new ReferenceError("Invalid id: undefined"))
  expect(document.getElementById)
    .not.toHaveBeenCalled()
}

/* Test: .resolve should throw on empty identifier */
function resolveShouldThrowOnEmptyIdentifier() {
  expect(() => {
    dom.resolve("")
  }).toThrow(
    new ReferenceError("Invalid id: ''"))
  expect(document.getElementById)
    .not.toHaveBeenCalled()
}

/* Test: .resolve should throw on invalid identifier */
function resolveShouldThrowOnInvalidIdentifier() {
  expect(() => {
    dom.resolve("no-match")
  }).toThrow(
    new ReferenceError("No match for id: 'no-match'"))
  expect(document.getElementById)
    .toHaveBeenCalledWith("no-match")
}

/* Test: .resolve should throw on non-matching type */
function resolveShouldThrowOnNonMatchingType() {
  expect(() => {
    dom.resolve(".resolve", HTMLAnchorElement)
  }).toThrow(
    new TypeError("No match for id: '.resolve'"))
  expect(document.getElementById)
    .toHaveBeenCalledWith(".resolve")
}

/* ----------------------------------------------------------------------------
 * Definitions: .traverse
 * ------------------------------------------------------------------------- */

/* Test: .traverse should resolve selector */
function traverseShouldResolveSelector() {
  dom.traverse(".traverse", () => {})
  expect(document.querySelector)
    .toHaveBeenCalled()
}

/* Test: .traverse should invoke callback on element */
function traverseShouldInvokeCallbackOnElement() {
  const cb = jasmine.createSpy("callback")
  dom.traverse(".traverse", cb)
  expect(cb)
    .toHaveBeenCalled()
}

/* Test: .traverse should invoke callback on all child elements */
function traverseShouldInvokeCallbackOnAllChildElements() {
  expect(dom.traverse(".traverse", (node, children) => {
    return { tag: node.tagName, children }
  }))
    .toEqual(fixture.json[0])
}

/* Test: .traverse should throw on invalid callback */
function traverseShouldThrowOnInvalidCallback() {
  expect(() => {
    dom.traverse(".traverse", "")
  }).toThrow(
    new TypeError("Invalid callback"))
}
