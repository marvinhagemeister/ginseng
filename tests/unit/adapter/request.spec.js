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

import * as request from "~/src/ginseng/adapter/request"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* [Adapter] */
describe("[Adapter]", () => {

  /* request */
  describe("request", () => {

    /* #get */
    describe("#get", () => {

      /* Register spies */
      beforeEach(() => {
        spyOn(window, "fetch")
          .and.returnValue(
            Promise.resolve({ ok: true }))
      })

      /* Test: should fetch data */
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

    /* #post */
    describe("#post", () => {

      /* Register spies */
      beforeEach(() => {
        spyOn(window, "fetch")
          .and.returnValue(
            Promise.resolve({ ok: true }))
        spyOn(JSON, "stringify")
          .and.returnValue("{ data: true }")
      })

      /* Test: should fetch data */
      it("should fetch data",
        postShouldFetchData
      )

      /* Test: should fetch json data */
      it("should fetch json data",
        postShouldFetchJsonData
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
 * Definitions: #get
 * ------------------------------------------------------------------------- */

/* Test: #get should fetch data */
function getShouldFetchData(done) {
  request.get("url").then(data => {
    expect(data).toEqual({ ok: true })
    expect(window.fetch)
      .toHaveBeenCalledWith("url", {
        method: "GET",
        mode: "cors"
      })
    done()
  })
}

/* Test: #get should throw on empty url */
function getShouldThrowOnEmptyUrl() {
  expect(() => {
    request.get("")
  }).toThrow(
    new TypeError("Invalid URL: \"\""))
  expect(window.fetch)
    .not.toHaveBeenCalled()
}

/* Test: #get should throw on invalid url */
function getShouldThrowOnInvalidUrl() {
  expect(() => {
    request.get(null)
  }).toThrow(
    new TypeError("Invalid URL: \"null\""))
  expect(window.fetch)
    .not.toHaveBeenCalled()
}

/* ----------------------------------------------------------------------------
 * Definitions: #post
 * ------------------------------------------------------------------------- */

/* Test: #post should fetch data */
function postShouldFetchData(done) {
  request.post("url", "test").then(res => {
    expect(res).toEqual({ ok: true })
    expect(window.fetch)
      .toHaveBeenCalledWith("url", {
        method: "POST",
        mode: "cors",
        body: "test",
        headers: {}
      })
    done()
    expect(JSON.stringify)
      .not.toHaveBeenCalledWith({ data: true })
  })
}

/* Test: #post should fetch json data */
function postShouldFetchJsonData(done) {
  request.post("url", { data: true }).then(res => {
    expect(res).toEqual({ ok: true })
    expect(window.fetch)
      .toHaveBeenCalledWith("url", {
        method: "POST",
        mode: "cors",
        body: "{ data: true }",
        headers: {
          "Content-Type": "application/json"
        }
      })
    done()
    expect(JSON.stringify)
      .toHaveBeenCalledWith({ data: true })
  })
}

/* Test: #post should throw on empty url */
function postShouldThrowOnEmptyUrl() {
  expect(() => {
    request.post("")
  }).toThrow(
    new TypeError("Invalid URL: \"\""))
  expect(window.fetch)
    .not.toHaveBeenCalled()
  expect(JSON.stringify)
    .not.toHaveBeenCalled()
}

/* Test: #post should throw on invalid url */
function postShouldThrowOnInvalidUrl() {
  expect(() => {
    request.post(null)
  }).toThrow(
    new TypeError("Invalid URL: \"null\""))
  expect(window.fetch)
    .not.toHaveBeenCalled()
  expect(JSON.stringify)
    .not.toHaveBeenCalled()
}
