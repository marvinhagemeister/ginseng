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

import * as spec from "~/src/spec"

import {
  factory,
  default as Suite
} from "~/src/suite"

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

  /* #constructor */
  describe("#constructor", () => {

    /* Test: should set name */
    it("should set name",
      constructorShouldSetName
    )

    /* Test: should set baseline */
    it("should set baseline",
      constructorShouldSetBaseline
    )

    /* Test: should initialize specifications */
    it("should initialize specifications",
      constructorShouldInitializeSpecifications
    )

    /* Test: should throw on empty name */
    it("should throw on empty name",
      constructorShouldThrowOnEmptyName
    )

    /* Test: should throw on invalid name */
    it("should throw on invalid name",
      constructorShouldThrowOnInvalidName
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
      spyOn(spec, "default")
        .and.returnValue({
          name: "genmaicha",
          element: fixture.el.firstElementChild,
          data: null,
          capture: jasmine.createSpy("capture").and.returnValue(null),
          compare: jasmine.createSpy("compare")
            .and.callFake(baseline => baseline.data === true)
        })
    })

    /* Test: should succeed on matching baseline */
    it("should succeed on matching baseline",
      captureShouldSucceedOnMatchingBaseline
    )

    /* Test: should fail on non-matching baseline */
    it("should fail on non-matching baseline",
      captureShouldFailOnNonMatchingBaseline
    )

    /* Test: should fail on missing baseline */
    it("should fail on missing baseline",
      captureShouldFailOnMissingBaseline
    )

    /* Test: should update existing capture */
    it("should update existing capture",
      captureShouldUpdateExistingCapture
    )

    /* Test: should throw on empty name */
    it("should throw on empty name",
      captureShouldThrowOnEmptyName
    )

    /* Test: should throw on invalid name */
    it("should throw on invalid name",
      captureShouldThrowOnInvalidName
    )

    /* Test: should throw on name-selector deviation */
    it("should throw on name-selector deviation",
      captureShouldThrowOnNameSelectorDeviation
    )
  })

  /* #suite */
  describe("#suite", () => {

    /* Test: should return nested suite */
    it("should return nested suite",
      suiteShouldReturnNestedSuite
    )

    /* Test: should return nested suite with baseline */
    it("should return nested suite with baseline",
      suiteShouldReturnNestedSuiteWithBaseline
    )

    /* Test: should return existing suite */
    it("should return existing suite",
      suiteShouldReturnExistingSuite
    )

    /* Test: should accept callback */
    it("should accept callback",
      suiteShouldAcceptCallback
    )

    /* Test: should throw on empty name */
    it("should throw on empty name",
      suiteShouldThrowOnEmptyName
    )

    /* Test: should throw on invalid name */
    it("should throw on invalid name",
      suiteShouldThrowOnInvalidName
    )

    /* Test: should throw on invalid callback */
    it("should throw on invalid callback",
      suiteShouldThrowOnInvalidCallback
    )
  })

  /* .factory */
  describe(".factory", () => {

    /* Test: should initialize suite */
    it("should initialize suite",
      factoryShouldInitializeSuite
    )

    /* Test: should initialize suite and nested suites */
    it("should initialize suite and nested suites",
      factoryShouldInitializeSuiteAndNestedSuites
    )
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: #constructor
 * ------------------------------------------------------------------------- */

/* Test: #constructor should set name */
function constructorShouldSetName() {
  const name = `${+new Date}`
  const suite = new Suite(name)
  expect(suite.name)
    .toEqual(name)
}

/* Test: #constructor should set baseline */
function constructorShouldSetBaseline() {
  const baseline = { genmaicha: { data: true } }
  const suite = new Suite("genmaicha", baseline)
  expect(suite.baseline)
    .toEqual(baseline)
}

/* Test: #constructor should initialize specifications */
function constructorShouldInitializeSpecifications() {
  expect(new Suite("oolong").specs)
    .toEqual({})
}

/* Test: #constructor should throw on empty name */
function constructorShouldThrowOnEmptyName() {
  expect(() => {
    new Suite("")
  }).toThrow(
    new TypeError("Invalid name: \"\""))
}

/* Test: #constructor should throw on invalid name */
function constructorShouldThrowOnInvalidName() {
  expect(() => {
    new Suite(null)
  }).toThrow(
    new TypeError("Invalid name: \"null\""))
}

/* Test: #constructor should throw on invalid baseline */
function constructorShouldThrowOnInvalidBaseline() {
  expect(() => {
    new Suite("sencha", "")
  }).toThrow(
    new TypeError("Invalid baseline: \"\""))
}

/* ----------------------------------------------------------------------------
 * Definitions: #capture
 * ------------------------------------------------------------------------- */

/* Test: #capture should succeed on matching baseline */
function captureShouldSucceedOnMatchingBaseline() {
  const baseline = { genmaicha: { data: true } }
  const suite = new Suite("test", baseline)
  expect(suite.capture("genmaicha", ".capture"))
    .toBe(true)
  expect(suite.specs.genmaicha.compare)
    .toHaveBeenCalledWith(baseline.genmaicha)
}

/* Test: #capture should fail on non-matching baseline */
function captureShouldFailOnNonMatchingBaseline() {
  const baseline = { oolong: { data: false } }
  const suite = new Suite("test", baseline)
  expect(suite.capture("oolong", ".capture"))
    .toBe(false)
  expect(suite.specs.oolong.compare)
    .toHaveBeenCalledWith(baseline.oolong)
}

/* Test: #capture should fail on missing baseline */
function captureShouldFailOnMissingBaseline() {
  const suite = new Suite("test")
  expect(suite.capture("sencha", ".capture"))
    .toBe(false)
  expect(suite.specs.sencha.compare)
    .toHaveBeenCalledWith({})
}

/* Test: #capture should update existing capture */
function captureShouldUpdateExistingCapture() {
  const baseline = { bancha: { data: true } }
  const suite = new Suite("test", baseline)
  expect(suite.capture("bancha", ".capture"))
    .toBe(true)
  expect(suite.capture("bancha", ".capture"))
    .toBe(true)
  expect(spec.default.calls.count())
    .toEqual(1)
}

/* Test: #capture should throw on empty name */
function captureShouldThrowOnEmptyName() {
  expect(() => {
    new Suite("test").capture("")
  }).toThrow(
    new TypeError("Invalid name: \"\""))
}

/* Test: #capture should throw on invalid name */
function captureShouldThrowOnInvalidName() {
  expect(() => {
    new Suite("test").capture(null)
  }).toThrow(
    new TypeError("Invalid name: \"null\""))
}

/* Test: #capture should throw on name-selector deviation */
function captureShouldThrowOnNameSelectorDeviation() {
  const suite = new Suite("test")
  expect(suite.capture("hojicha", ".capture"))
    .toBe(false)
  expect(() => {
    suite.capture("hojicha", ".capture-again")
  }).toThrow(
    new ReferenceError(
      "Invalid combination: \"hojicha\" was already registered"))
}

/* ----------------------------------------------------------------------------
 * Definitions: #suite
 * ------------------------------------------------------------------------- */

/* Test: #suite should return nested suite */
function suiteShouldReturnNestedSuite() {
  const suite = new Suite("test")
  const subsuite = suite.suite("genmaicha")
  expect(subsuite)
    .toEqual(jasmine.any(Suite))
  expect(subsuite)
    .not.toEqual(suite)
  expect(subsuite)
    .toEqual(suite.suites.genmaicha)
}

/* Test: #suite should return nested suite with baseline */
function suiteShouldReturnNestedSuiteWithBaseline() {
  const baseline = { oolong: { data: true } }
  const subsuite = new Suite("test").suite("oolong", baseline)
  expect(subsuite.baseline)
    .toEqual(baseline)
}

/* Test: #suite should return existing suite */
function suiteShouldReturnExistingSuite() {
  const suite = new Suite("test")
  expect(suite.suite("sencha"))
    .toBe(suite.suite("sencha"))
}

/* Test: #suite should accept callback */
function suiteShouldAcceptCallback(done) {
  const suite = new Suite("test")
  suite.suite("bancha", {}, subsuite => {
    expect(subsuite).toEqual(suite.suites.bancha)
    done()
  })
}

/* Test: #suite should throw on empty name */
function suiteShouldThrowOnEmptyName() {
  expect(() => {
    new Suite("test").suite("")
  }).toThrow(
    new TypeError("Invalid name: \"\""))
}

/* Test: #suite should throw on invalid name */
function suiteShouldThrowOnInvalidName() {
  expect(() => {
    new Suite("test").suite(null)
  }).toThrow(
    new TypeError("Invalid name: \"null\""))
}

/* Test: #suite should throw on invalid callback */
function suiteShouldThrowOnInvalidCallback() {
  expect(() => {
    new Suite("first").suite("hojicha", {}, "")
  }).toThrow(
    new TypeError("Invalid callback"))
}

/* ----------------------------------------------------------------------------
 * Definitions: .factory
 * ------------------------------------------------------------------------- */

/* Test: should initialize suite */
function factoryShouldInitializeSuite() {
  const data = {
    baseline: {
      genmaicha: { data: true }
    }
  }
  const suite = factory("test", data)
  expect(suite.baseline)
    .toBe(suite.baseline)
  expect(suite.suites)
    .toEqual({})
}

/* Test: should initialize suite and nested suites */
function factoryShouldInitializeSuiteAndNestedSuites() {
  const data = {
    specs: {
      oolong: { data: true }
    },
    suites: {
      bancha: {
        specs: {
          sencha: { data: true }
        },
        suites: {
          hojicha: {
            specs: {
              matcha: { data: true }
            }
          }
        }
      }
    }
  }
  const suite = factory("suite", data)
  expect(suite.baseline)
    .toBe(data.specs)
  expect(suite.suites.bancha)
    .toEqual(jasmine.any(Suite))
  expect(suite.suites.bancha.name)
    .toEqual("bancha")
  expect(suite.suites.bancha.baseline)
    .toBe(data.suites.bancha.specs)
  expect(suite.suites.bancha.suites.hojicha)
    .toEqual(jasmine.any(Suite))
  expect(suite.suites.bancha.suites.hojicha.name)
    .toEqual("hojicha")
  expect(suite.suites.bancha.suites.hojicha.baseline)
    .toBe(data.suites.bancha.suites.hojicha.specs)
  expect(suite.suites.bancha.suites.hojicha.suites)
    .toEqual({})
}
