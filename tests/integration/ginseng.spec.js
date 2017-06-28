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

      /* Load fixtures */
      beforeEach(() => {
        fixture.load("init.html")
      })

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
function initShouldFetchBaseline(done) {
  const ginseng = new Ginseng()
  const suite = ginseng.suite
  expect(suite.capture("genmaicha", ".init-genmaicha"))
    .toEqual(false)
  expect(suite.capture("sencha", ".init-sencha"))
    .toEqual(false)
  ginseng.sync()
    .then(() => ginseng.init())
    .then(newsuite => {
      expect(newsuite.capture("genmaicha", ".init-genmaicha"))
        .toEqual(true)
      expect(newsuite.capture("sencha", ".init-sencha"))
        .toEqual(true)
      done()
    })
    .catch(done.fail)
}

/* ----------------------------------------------------------------------------
 * Definitions: #sync
 * ------------------------------------------------------------------------- */

/* Test: #sync should store snapshot */
function syncShouldStoreSnapshot(done) {
  const ginseng = new Ginseng()
  const suite = ginseng.suite
  expect(suite.capture("genmaicha", ".sync-genmaicha"))
    .toEqual(false)
  expect(suite.capture("sencha", ".sync-sencha"))
    .toEqual(false)
  ginseng.sync()
    .then(res => {
      expect(res)
        .toBe(undefined)
      done()
    })
    .catch(done.fail)
}

/* ----------------------------------------------------------------------------
 * Definitions: #suite
 * ------------------------------------------------------------------------- */

/* Test: #suite should return top-level suite */
function suiteShouldReturnTopLevelSuite() {
  const ginseng = new Ginseng()
  expect(ginseng.suite)
    .toEqual(jasmine.any(Suite))
}

/* Test: #suite should return existing top level suite */
function suiteShouldReturnExistingTopLevelSuite() {
  const ginseng = new Ginseng()
  expect(ginseng.suite)
    .toBe(ginseng.suite)
}
