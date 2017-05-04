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
import * as spec from "~/src/spec"

import Ginseng from "~/src/ginseng"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* Ginseng */
describe("Ginseng", () => {

  /* Set fixture base path */
  beforeAll(() => {
    fixture.setBase("tests/fixtures/ginseng")
  })

  /* Cleanup fixtures */
  afterEach(() => {
    fixture.cleanup()
  })

  /* #constructor */
  describe("#constructor", () => {

    /* Test: should set baseline */
    it("should set baseline",
      constructorShouldSetBaseline
    )

    /* Test: should initialize specifications */
    it("should initialize specifications",
      constructorShouldInitializeSpecifications
    )

    /* Test: should throw on invalid baseline */
    it("should throw on invalid baseline",
      constructorShouldThrowOnInvalidBaseline
    )
  })

  /* #capture */
  describe("#capture", () => {

    /* Load fixtures and register spies */
    beforeEach(() => {
      fixture.load("capture.html")

      /* Register spies */
      spyOn(dom, "query").and.callFake(selector => {
        return selector === ".capture"
          ? fixture.el.firstChild
          : fixture.el.firstChild.nextElementSibling
      })
      spyOn(spec, "default").and.returnValue({
        name: "test",
        element: fixture.el.firstChild,
        data: null,
        capture: jasmine.createSpy("capture").and.returnValue(null),
        compare: jasmine.createSpy("compare")
          .and.callFake(baseline => baseline.data === true)
      })
    })

    /* Test: should fail on missing baseline */
    it("should fail on missing baseline",
      captureShouldFailOnMissingBaseline
    )

    /* Test: should succeed on matching baseline */
    it("should succeed on matching baseline",
      captureShouldSucceedOnMatchingBaseline
    )

    /* Test: should update earlier capture */
    it("should update earlier capture",
      captureShouldUpdateEarlierCapture
    )

    /* Test: should throw on name-selector deviation */
    it("should throw on name-selector deviation",
      captureShouldThrowOnNameSelectorDeviation
    )
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: #constructor
 * ------------------------------------------------------------------------- */

/* Test: #constructor should set baseline */
function constructorShouldSetBaseline() {
  const baseline = { test: { data: true } }
  const ginseng = new Ginseng(baseline)
  expect(ginseng.baseline)
    .toEqual(baseline)
}

/* Test: #constructor should initialize specifications */
function constructorShouldInitializeSpecifications() {
  expect(new Ginseng().specs)
    .toEqual({})
}

/* Test: #constructor should throw on invalid baseline */
function constructorShouldThrowOnInvalidBaseline() {
  expect(() => {
    new Ginseng("")
  }).toThrow(
    new TypeError("Invalid baseline: \"\""))
}

/* ----------------------------------------------------------------------------
 * Definitions: #capture
 * ------------------------------------------------------------------------- */

/* Test: #capture should fail on missing baseline */
function captureShouldFailOnMissingBaseline() {
  const ginseng = new Ginseng()
  expect(ginseng.capture("test", ".capture"))
    .toBe(false)
  expect(ginseng.specs.test.compare)
    .toHaveBeenCalledWith({})
}

/* Test: #capture should succeed on matching baseline */
function captureShouldSucceedOnMatchingBaseline() {
  const baseline = { test: { data: true } }
  const ginseng = new Ginseng(baseline)
  expect(ginseng.capture("test", ".capture"))
    .toBe(true)
  expect(ginseng.specs.test.compare)
    .toHaveBeenCalledWith(baseline.test)
}

/* Test: #capture should update earlier capture */
function captureShouldUpdateEarlierCapture() {
  const baseline = { test: { data: true } }
  const ginseng = new Ginseng(baseline)
  expect(ginseng.capture("test", ".capture"))
    .toBe(true)
  expect(ginseng.capture("test", ".capture"))
    .toBe(true)
  expect(spec.default.calls.count())
    .toEqual(1)
}

/* Test: #capture should throw on name-selector deviation */
function captureShouldThrowOnNameSelectorDeviation() {
  const ginseng = new Ginseng()
  expect(ginseng.capture("test", ".capture"))
    .toBe(false)
  expect(() => {
    ginseng.capture("test", ".capture-again")
  }).toThrow(
    new ReferenceError(
      "\"test\" was already registered with another selector"))
}
