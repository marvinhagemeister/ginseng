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
import Ginseng from "~/src/ginseng"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* Ginseng */
describe("Ginseng", () => {

  /* #constructor */
  describe("#constructor", () => {

    /* Test: should set options */
    it("should set options",
      constructorShouldSetOptions
    )

    /* Test: should use default options */
    it("should use default options",
      constructorShouldUseDefaultOptions
    )

    /* Test: should ignore trailing slash in data binding URL */
    it("should ignore trailing slash in data binding URL",
      constructorShouldIgnoreTrailingSlashInDataBindingURL
    )

    /* Test: should throw on invalid options */
    it("should throw on invalid options",
      constructorShouldThrowOnInvalidOptions
    )

    /* Test: should throw on empty data binding URL */
    it("should throw on empty data binding URL",
      constructorShouldThrowOnEmptyDataBindingURL
    )

    /* Test: should throw on invalid data binding URL */
    it("should throw on invalid data binding URL",
      constructorShouldThrowOnInvalidDataBindingURL
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

    /* Test: should return promise */
    it("should return promise",
      initShouldReturnPromise
    )

    /* Test: should fetch baseline */
    it("should fetch baseline",
      initShouldFetchBaseline
    )
  })

  /* #sync */
  describe("#sync", () => {

    /* Register spies */
    beforeEach(() => {
      spyOn(request, "post")
        .and.returnValue(Promise.resolve({ ok: true }))
    })

    /* Test: should return promise */
    it("should return promise",
      syncShouldReturnPromise
    )

    /* Test: should store snapshot */
    it("should store snapshot",
      syncShouldStoreSnapshot
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

/* Test: #constructor should set options */
function constructorShouldSetOptions() {
  expect(new Ginseng({ url: "/genmaicha" }).options)
    .toEqual({
      url: {
        baseline: "/genmaicha/baseline",
        snapshot: "/genmaicha/snapshot"
      }
    })
}

/* Test: #constructor should use default options */
function constructorShouldUseDefaultOptions() {
  expect(new Ginseng().options)
    .toEqual({
      url: {
        baseline: "/_ginseng/baseline",
        snapshot: "/_ginseng/snapshot"
      }
    })
}

/* Test: #constructor should ignore trailing slash in data binding URL */
function constructorShouldIgnoreTrailingSlashInDataBindingURL() {
  expect(new Ginseng({ url: "/oolong/" }).options)
    .toEqual({
      url: {
        baseline: "/oolong/baseline",
        snapshot: "/oolong/snapshot"
      }
    })
}

/* Test: #constructor should throw on invalid options */
function constructorShouldThrowOnInvalidOptions() {
  expect(() => {
    new Ginseng("")
  }).toThrow(
    new TypeError("Invalid options: ''"))
}

/* Test: #constructor should throw on empty data binding URL */
function constructorShouldThrowOnEmptyDataBindingURL() {
  expect(() => {
    new Ginseng({ url: "" })
  }).toThrow(
    new TypeError("Invalid options.url: ''"))
}

/* Test: #constructor should throw on invalid data binding URL */
function constructorShouldThrowOnInvalidDataBindingURL() {
  expect(() => {
    new Ginseng({})
  }).toThrow(
    new TypeError("Invalid options.url: undefined"))
}

/* ----------------------------------------------------------------------------
 * Definitions: #init
 * ------------------------------------------------------------------------- */

/* Test: #init should return promise */
function initShouldReturnPromise() {
  expect(new Ginseng().init())
    .toEqual(jasmine.any(Promise))
}

/* Test: #init should fetch baseline */
function initShouldFetchBaseline(done) {
  new Ginseng().init()
    .then(suite => {
      expect(request.get)
        .toHaveBeenCalledWith("/_ginseng/baseline")
      expect(Suite.factory)
        .toHaveBeenCalledWith("人参", { data: true })
      expect(suite)
        .toEqual({ suite: true })
      done()
    })
    .catch(done.fail)
}

/* ----------------------------------------------------------------------------
 * Definitions: #sync
 * ------------------------------------------------------------------------- */

/* Test: #sync should return promise */
function syncShouldReturnPromise() {
  expect(new Ginseng().sync())
    .toEqual(jasmine.any(Promise))
}

/* Test: #sync should store snapshot */
function syncShouldStoreSnapshot(done) {
  const ginseng = new Ginseng()
  const suite = ginseng.suite
  ginseng.sync()
    .then(() => {
      expect(request.post)
        .toHaveBeenCalledWith("/_ginseng/snapshot", suite)
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
    .toEqual({ suite: true })
  expect(Suite.factory)
    .toHaveBeenCalledWith("人参")
}

/* Test: #suite should return existing top level suite */
function suiteShouldReturnExistingTopLevelSuite() {
  const ginseng = new Ginseng()
  expect(ginseng.suite)
    .toBe(ginseng.suite)
}
