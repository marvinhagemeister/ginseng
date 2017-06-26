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

  /* Set fixture base path */
  beforeAll(() => {
    fixture.setBase("fixtures/ginseng")
  })

  /* Cleanup fixtures */
  afterEach(() => {
    fixture.cleanup()
  })

  /* Integration tests */
  describe("_integration", () => {

    /* #init */
    describe("#init", () => {

      /* Test: should fetch baseline */
      it("should fetch baseline",
        initShouldFetchBaseline
      )
    })

    /* #sync */
    describe("#sync", () => {

      /* Load fixtures */
      beforeEach(() => {
        fixture.load("sync.html")
      })

      /* Test: should store snapshot */
      it("should store snapshot",
        syncShouldStoreSnapshot
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
 * Definitions: #init
 * ------------------------------------------------------------------------- */

/* Test: #init should fetch baseline */
function initShouldFetchBaseline() {
  pending()
}

// TODO: write a simple HTTP server for the karma integration here, we should
// not use ginseng-node, as it's an extra dependency.

/* ----------------------------------------------------------------------------
 * Definitions: #sync
 * ------------------------------------------------------------------------- */

/* Test: #sync should store snapshot */
function syncShouldStoreSnapshot() {
  pending()
  // const ginseng = new Ginseng({ url: "." })
  // const suite = ginseng.suite()
  // suite.capture("genmaicha", ".sync-genmaicha")
  // const subsuite = suite.suite("oolong")
  // subsuite.capture("sencha", ".sync-sencha")
  // ginseng.sync()
  // console.log(inspect(suite, null, 10))
}

/* ----------------------------------------------------------------------------
 * Definitions: #suite
 * ------------------------------------------------------------------------- */

/* Test: #suite should return top-level suite */
function suiteShouldReturnTopLevelSuite() {
  const ginseng = new Ginseng({ url: "." })
  expect(ginseng.suite())
    .toEqual(jasmine.any(Suite))
}

/* Test: #suite should return existing top level suite */
function suiteShouldReturnExistingTopLevelSuite() {
  const ginseng = new Ginseng({ url: "." })
  expect(ginseng.suite())
    .toBe(ginseng.suite())
}
