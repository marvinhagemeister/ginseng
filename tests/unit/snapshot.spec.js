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

import * as dom from "~/src/dom"
import Snapshot from "~/src/snapshot"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

 /* Snapshot */
describe("Snapshot", () => {

  /* #record */
  describe("#record", () => {

    /* Test: should traverse child nodes */
    it("should traverse child nodes",
      recordShouldTraverseChildNodes
    )
  })
})

/* ----------------------------------------------------------------------------
 * Definitions
 * ------------------------------------------------------------------------- */

// TODO: pass snapshot INTO test. the snapshot does only the snapshot!!!

function recordShouldTraverseChildNodes() {

  // property.snapshot("active button", document.body, {})

  // property.snapshot(document.body) // add opts -- add plugin?

  // const snapshot = new Snapshot("body") // TODO: autogenerate filename to sacve

  const it = dom.traverse(document.body, (node, children) => {
    return {
      style: {
        before: window.getComputedStyle(node, "::before"),                      // TODO: do this using an array of node to X mappers and reduce it.
        element: window.getComputedStyle(node),
        after: window.getComputedStyle(node, "::after")
      },
      children
    }
  })
  console.log(it.style.element.content) // empty, not visibile!
  // const snapshot = new Snapshot("xxx")        // TODO: autogenerate filename to sacve
  // // console.log(snapshot)
  // snapshot.record(it)
}

function httpGet(url) {
  const xmlHttp = new XMLHttpRequest()

  // GET/POST --> use a simple library to grab the test files and the karma middleware!
  // make the port configurable, but set it to karma port by default...

  xmlHttp.open("GET", url, false)
  xmlHttp.send(null)

  return xmlHttp.responseText
}

describe("foo", function() {
  it("should should serve /foo.js", function() {
    expect(httpGet("/foo.js")).toBe("this is the middleware response")

    // TODO:
    // where should we put the files?
  })
})
