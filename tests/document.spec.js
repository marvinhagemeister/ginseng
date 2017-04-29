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

import * as Document from "../src/document"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

 /* Document */
describe("Document", () => {

  /* #query */
  describe("#query", () => {

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

    /* Test: should return an iterable */
    it("should return an iterable",
      traverseShouldReturnAnIterable
    )

    /* Test: should return an iterable returning nodes */
    it("should return an iterable returning nodes",
      traverseShouldReturnAnIterableReturningNodes
    )

    /* Test: should perform a depth-first pre-order traversal */
    it("should perform a depth-first pre-order traversal",
      traverseShouldPerformADepthFirstPreOrderTraversal
    )
  })
})

/* ----------------------------------------------------------------------------
 * Definitions
 * ------------------------------------------------------------------------- */

/* Test: #query should accept selector */
function queryShouldAcceptSelector() {
  expect(Document.query("body"))
    .toEqual(document.body)
}

/* Test: #query should accept element */
function queryShouldAcceptElement() {
  expect(Document.query(document.body))
    .toEqual(document.body)
}

/* Test: #query should throw on missing argument */
function queryShouldThrowOnMissingArgument() {
  expect(() => {
    Document.query()
  }).toThrow(
    new ReferenceError("Invalid selector or element: \"undefined\"")
  )
}

/* Test: #query should throw on empty selector */
function queryShouldThrowOnEmptySelector() {
  expect(() => {
    Document.query("")
  }).toThrow(
    new ReferenceError("No match for selector: \"\"")
  )
}

/* Test: #query should throw on invalid selector */
function queryShouldThrowOnInvalidSelector() {
  expect(() => {
    Document.query(".no-match")
  }).toThrow(
    new ReferenceError("No match for selector: \".no-match\"")
  )
}

/* Test: #traverse should return an iterable */
function traverseShouldReturnAnIterable() {
  document.body.innerHTML += "<b><span></span><i><i></i><span></span></i></b>"
  console.log(Document.traverse(document.body, (node, children) => {
    return {
      node: node.tagName,
      tree: children
    }
  }))
  // expect(Document.traverse(document.body)[Symbol.iterator])
  //   .toEqual(jasmine.any(Function))
}

/* Test: #traverse should return an iterable returning nodes */
function traverseShouldReturnAnIterableReturningNodes() {
  pending()
  // for (const node of Document.traverse(document.body))
  //   expect(node).toEqual(jasmine.any(Node))
}

/* <b><div>
  <span></span>
  <li>
    <i></i>
  </li>
  <em></em>
</div><b> */

// div.  parents: [b].
// span. parents: [b, div]
// li.   parents: [b, div]
// i.    parents: [b, div, li]
// em.   parents: [b, div]

/* Test: #traverse should perform a depth-first pre-order traversal */
function traverseShouldPerformADepthFirstPreOrderTraversal() {
  pending()
}
