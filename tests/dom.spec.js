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

import * as dom from "../src/dom"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* dom */
describe("dom", () => {

  /* Set fixture base path */
  beforeAll(function(){
    fixture.setBase("tests/fixtures/dom")
  })

  /* Cleanup fixtures */
  afterEach(function(){
    fixture.cleanup()
  })

  /* #query */
  describe("#query", () => {

    /* Load fixtures */
    beforeEach(function(){
      fixture.load("query.html")
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

    /* Load fixtures */
    beforeEach(function(){
      fixture.load("traverse.html", "traverse.json")
    })

    /* Test: should resolve selector */
    it("should call resolve selector",
      traverseShouldResolveSelector
    )

    /* Test: should apply callback to all child nodes */
    it("should apply callback to all child nodes",
      traverseShouldApplyCallbackToAllChildNodes
    )
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: #query
 * ------------------------------------------------------------------------- */

/* Test: #query should accept selector */
function queryShouldAcceptSelector() {
  expect(dom.query(".match"))
    .toEqual(document.querySelector(".match"))
}

/* Test: #query should accept element */
function queryShouldAcceptElement() {
  expect(dom.query(fixture.el.firstChild))
    .toEqual(document.querySelector(".match"))
}

/* Test: #query should throw on missing argument */
function queryShouldThrowOnMissingArgument() {
  expect(() => {
    dom.query()
  }).toThrow(
    new ReferenceError("Invalid selector or element: \"undefined\"")
  )
}

/* Test: #query should throw on empty selector */
function queryShouldThrowOnEmptySelector() {
  expect(() => {
    dom.query("")
  }).toThrow(
    new ReferenceError("No match for selector: \"\"")
  )
}

/* Test: #query should throw on invalid selector */
function queryShouldThrowOnInvalidSelector() {
  expect(() => {
    dom.query(".no-match")
  }).toThrow(
    new ReferenceError("No match for selector: \".no-match\"")
  )
}

/* ----------------------------------------------------------------------------
 * Definitions: #traverse
 * ------------------------------------------------------------------------- */

/* Test: #traverse should resolve selector */
function traverseShouldResolveSelector() {
  expect(() => {
    dom.traverse(".match")
  }).not.toThrow(
    jasmine.any(Error))
}

/* Test: #traverse should apply callback on all child nodes */
function traverseShouldApplyCallbackToAllChildNodes() {
  expect(dom.traverse(".match", (node, children) => {
    return { element: node.tagName, children }
  })).toEqual(fixture.json[0])
}
