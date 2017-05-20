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

import Ginseng from "~/src/ginseng"
import Suite from "~/src/suite"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* Ginseng */
describe("Ginseng", () => {

  /* Integration tests */
  describe("_integration", () => {

    /* #fetch */
    describe("#fetch", () => {

      /* Test: should fetch baseline from url */
      it("should fetch baseline from url",
        fetchShouldFetchBaselineFromUrl
      )
    })

    /* #suite */
    describe("#suite", () => {

      /* Test: should return top-level suite */
      it("should return top-level suite",
        suiteShouldReturnTopLevelSuite
      )

      /* Test: should return existing top-level suite */
      it("should return existing top-level suite",
        suiteShouldReturnExistingTopLevelSuite
      )
    })
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: #fetch
 * ------------------------------------------------------------------------- */

/* Test: #fetch should fetch baseline from url */
function fetchShouldFetchBaselineFromUrl() {
  pending()
}

/* ----------------------------------------------------------------------------
 * Definitions: #suite
 * ------------------------------------------------------------------------- */

/* Test: #suite should return top-level suite */
function suiteShouldReturnTopLevelSuite() {
  const ginseng = new Ginseng()
  expect(ginseng.suite())
    .toEqual(jasmine.any(Suite))
}

/* Test: #suite should return existing top level suite */
function suiteShouldReturnExistingTopLevelSuite() {
  const ginseng = new Ginseng()
  const parent = ginseng.suite()
  expect(parent)
    .toBe(ginseng.suite())
}
