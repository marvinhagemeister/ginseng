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

import * as request from "~/src/browser/request"

import Suite from "~/src/suite"
import {
  OPTIONS,
  default as Ginseng
} from "~/src/ginseng"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* Ginseng */
describe("Ginseng", () => {

  /* #constructor */
  describe("#constructor", () => {

    /* Test: should set default options */
    it("should set default options",
      constructorShouldSetDefaultOptions
    )

    /* Test: should merge with default options */
    it("should merge with default options",
      constructorShouldMergeWithDefaultOptions
    )

    /* Test: should throw on invalid options */
    it("should throw on invalid options",
      constructorShouldThrowOnInvalidOptions
    )
  })

  /* #init */
  describe("#init", () => {

    /* Register spies */
    beforeEach(() => {
      spyOn(request, "get")
        .and.returnValue(Promise.resolve({
          json: () => Promise.resolve({ data: true })
        }))
      spyOn(Suite, "factory")
        .and.returnValue({ suite: true })
    })

    /* Test: should fetch baseline from url */
    it("should fetch baseline from url",
      initShouldFetchBaselineFromUrl
    )
  })

  /* #suite */
  describe("#suite", () => {

    /* Register spies */
    beforeEach(() => {
      spyOn(Suite, "factory")
        .and.returnValue({ suite: true })
    })

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

/* ----------------------------------------------------------------------------
 * Definitions: #constructor
 * ------------------------------------------------------------------------- */

/* Test: #constructor should set default options */
function constructorShouldSetDefaultOptions() {
  const ginseng = new Ginseng()
  expect(ginseng.options)
    .toEqual(OPTIONS)
}

/* Test: #constructor should merge with default options */
function constructorShouldMergeWithDefaultOptions() {
  const options = {
    url: {
      baseline: false,
      snapshot: false,
      genmaicha: {
        data: true
      }
    }
  }
  const ginseng = new Ginseng(options)
  expect(ginseng.options)
    .toEqual(options)
}

/* Test: #constructor should throw on invalid options */
function constructorShouldThrowOnInvalidOptions() {
  expect(() => {
    new Ginseng("")
  }).toThrow(
    new TypeError("Invalid options: ''"))
}

/* ----------------------------------------------------------------------------
 * Definitions: #init
 * ------------------------------------------------------------------------- */

/* Test: #init should fetch baseline from url */
function initShouldFetchBaselineFromUrl(done) {
  const options = { url: { baseline: true } }
  const ginseng = new Ginseng(options)
  ginseng.init().then(parent => {
    expect(request.get)
      .toHaveBeenCalledWith(options.url.baseline)
    expect(Suite.factory)
      .toHaveBeenCalledWith("_ginseng", { data: true })                         // TODO: put _ginseng in a constant
    expect(parent)
      .toEqual({ suite: true })
    done()
  })
}

/* ----------------------------------------------------------------------------
 * Definitions: #suite
 * ------------------------------------------------------------------------- */

/* Test: #suite should return top-level suite */
function suiteShouldReturnTopLevelSuite() {
  const ginseng = new Ginseng()
  expect(ginseng.suite())
    .toEqual({ suite: true })
}

/* Test: #suite should return existing top level suite */
function suiteShouldReturnExistingTopLevelSuite() {
  const ginseng = new Ginseng()
  expect(ginseng.suite())
    .toBe(ginseng.suite())
}
