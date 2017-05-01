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
      spyOn(dom, "query").and.returnValue(fixture.el.firstChild)
      // console.log(window.Spec, "ff")
      // spyOn(window, "Spec")
      // window.Spec = function() {
      //   this.name_ = "foooo"
      //   this.element_ = fixture.el.firstChild
      // }
      // const spec = new Spec("sx")
      // console.log(spec)

      // spyOn(window, "Spec").and.returnValue({
      //   element: "foo"
      // })
    })

    /* Reset monkey-patched spies */
    // afterEach(() => {
    //   window.Spec = window.SpecOriginal
    // })

    /* Test: should fail on missing baseline */
    it("should fail on missing baseline",
      captureShouldFailOnMissingBaseline
    )

    /* Test: should succeed on matching baseline */
    it("should succeed on matching baseline",
      captureShouldSucceedOnMatchingBaseline
    )

    /* Test: should overwrite earlier capture */
    // it("should overwrite earlier capture",
    //   captureShouldOverwriteEarlierCapture
    // )
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: #constructor
 * ------------------------------------------------------------------------- */

/* Test: #constructor should set baseline */
function constructorShouldSetBaseline() {
  expect(() => {
    new Ginseng({})
  }).not.toThrow(
    jasmine.any(TypeError))
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
  expect(new Ginseng().capture("name", ".capture"))
    .toBe(false)
}

/* Test: #capture should succeed on matching baseline */
function captureShouldSucceedOnMatchingBaseline() {
  const name = `${+new Date}`
  const temp = new Ginseng()
  temp.capture(name, ".capture")

  /* Create baseline */
  const baseline = {}
  baseline[name] = temp.specs[name].data

  /* Capture elements and compare to baseline */
  expect(new Ginseng(baseline).capture(name, ".capture"))
    .toBe(true)
}

/* Test: #capture should overwrite earlier capture */
// function captureShouldOverwriteEarlierCapture() {
//   const name = `${+new Date}`
//   const temp = new Ginseng()
//   temp.capture(name, ".capture")
//
//   /* Create baseline */
//   const baseline = {}
//   baseline[name] = temp.specs[name].data
//
//
//   const ginseng =
//   expect(new Ginseng(baseline).capture(name, ".capture"))
//     .toBe(true)
// }
