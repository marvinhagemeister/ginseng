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

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* Browser */
describe("Browser", () => {

  /* request */
  describe("request", () => {

    /* .get */
    describe(".get", () => {

      /* Register spies */
      beforeEach(() => {
        spyOn(window, "fetch")
          .and.returnValue(
            Promise.resolve({ ok: true }))
      })

      /* Test: should return promise */
      it("should return promise",
        getShouldReturnPromise
      )

      /* Test: should get data */
      it("should fetch data",
        getShouldFetchData
      )

      /* Test: should throw on empty url */
      it("should throw on empty url",
        getShouldThrowOnEmptyUrl
      )

      /* Test: should throw on invalid url */
      it("should throw on invalid url",
        getShouldThrowOnInvalidUrl
      )
    })

    /* .post */
    describe(".post", () => {

      /* Register spies */
      beforeEach(() => {
        spyOn(window, "fetch")
          .and.returnValue(
            Promise.resolve({ ok: true }))
      })

      /* Test: should return promise */
      it("should return promise",
        postShouldReturnPromise
      )

      /* Test: should store data */
      it("should store data",
        postShouldStoreData
      )

      /* Test: should store json data */
      it("should store json data",
        postShouldStoreJsonData
      )

      /* Test: should throw on empty url */
      it("should throw on empty url",
        postShouldThrowOnEmptyUrl
      )

      /* Test: should throw on invalid url */
      it("should throw on invalid url",
        postShouldThrowOnInvalidUrl
      )
    })
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: .get
 * ------------------------------------------------------------------------- */ // TODO: check failed request/rejected promises

/* Test: .get should return promise */
function getShouldReturnPromise(done) {
  expect(request.get("url")
    .then(done)
    .catch(done)
  )
    .toEqual(jasmine.any(Promise))
}

/* Test: .get should fetch data */
function getShouldFetchData(done) {
  request.get("url")
    .then(data => {
      expect(data)
        .toEqual({ ok: true })
      expect(window.fetch)
        .toHaveBeenCalledWith("url", {
          method: "GET",
          mode: "cors"
        })
      done()
    })
    .catch(done.fail)
}

/* Test: .get should throw on empty url */
function getShouldThrowOnEmptyUrl() {
  expect(() => {
    request.get("")
  }).toThrow(
    new TypeError("Invalid URL: \"\""))
  expect(window.fetch)
    .not.toHaveBeenCalled()
}

/* Test: .get should throw on invalid url */
function getShouldThrowOnInvalidUrl() {
  expect(() => {
    request.get(null)
  }).toThrow(
    new TypeError("Invalid URL: \"null\""))
  expect(window.fetch)
    .not.toHaveBeenCalled()
}

/* ----------------------------------------------------------------------------
 * Definitions: .post
 * ------------------------------------------------------------------------- */

/* Test: .post should return promise */
function postShouldReturnPromise(done) {
  expect(request.post("url", "test")
    .then(done)
    .catch(done)
  )
    .toEqual(jasmine.any(Promise))
}

/* Test: .post should store data */
function postShouldStoreData(done) {
  request.post("url", "test")
    .then(res => {
      expect(res)
        .toEqual({ ok: true })
      expect(window.fetch)
        .toHaveBeenCalledWith("url", {
          method: "POST",
          mode: "cors",
          body: "test",
          headers: {}
        })
      done()
    })
    .catch(done.fail)
}

/* Test: .post should store json data */
function postShouldStoreJsonData(done) {
  request.post("url", { data: true })
    .then(res => {
      expect(res)
        .toEqual({ ok: true })
      expect(window.fetch)
        .toHaveBeenCalledWith("url", {
          method: "POST",
          mode: "cors",
          body: "{\"data\":true}",
          headers: {
            "Content-Type": "application/json"
          }
        })
      done()
    })
    .catch(done.fail)
}

/* Test: .post should throw on empty url */
function postShouldThrowOnEmptyUrl() {
  expect(() => {
    request.post("")
  }).toThrow(
    new TypeError("Invalid URL: \"\""))
  expect(window.fetch)
    .not.toHaveBeenCalled()
}

/* Test: .post should throw on invalid url */
function postShouldThrowOnInvalidUrl() {
  expect(() => {
    request.post(null)
  }).toThrow(
    new TypeError("Invalid URL: \"null\""))
  expect(window.fetch)
    .not.toHaveBeenCalled()
}
