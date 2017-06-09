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

import Spec from "~/src/spec"
import Suite from "~/src/suite"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* Suite */
describe("Suite", () => {

  /* Set fixture base path */
  beforeAll(() => {
    fixture.setBase("fixtures/suite")
  })

  /* Cleanup fixtures */
  afterEach(() => {
    fixture.cleanup()
  })

  /* Integration tests */
  describe("_integration", () => {

    /* #capture */
    describe("#capture", () => {

      /* Load fixtures */
      beforeEach(() => {
        fixture.load("capture.html")
      })

      /* Test: should succeed on matching baseline */
      it("should succeed on matching baseline",
        captureShouldSucceedOnMatchingBaseline
      )

      /* Test: should fail on missing baseline */
      it("should fail on missing baseline",
        captureShouldFailOnMissingBaseline
      )

      /* Test: should throw on invalid selector */
      it("should throw on invalid selector",
        captureShouldThrowOnInvalidSelector
      )
    })
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: #capture
 * ------------------------------------------------------------------------- */

/* Test: #capture should succeed on matching baseline */
function captureShouldSucceedOnMatchingBaseline() {
  expect(new Suite("test", {
    genmaicha: new Spec("genmaicha", ".capture").capture()
  }).capture("genmaicha", ".capture"))
    .toBe(true)
}

/* Test: #capture should fail on missing baseline */
function captureShouldFailOnMissingBaseline() {
  expect(new Suite("test").capture("oolong", ".capture"))
    .toBe(false)
}

/* Test: #capture should throw on invalid selector */
function captureShouldThrowOnInvalidSelector() {
  expect(() => {
    new Suite("test").capture("sencha", ".no-match")
  }).toThrow(
    new ReferenceError("No match for selector: \".no-match\""))
}
