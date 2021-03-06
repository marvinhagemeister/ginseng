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

    /* Integration tests */
    describe("_integration", () => {

      /* .get */
      describe(".get", () => {

        /* Test: should get data */
        it("should fetch data",
          getShouldFetchData
        )
      })

      /* .post */
      describe(".post", () => {

        /* Test: should store data */
        it("should store data",
          postShouldStoreData
        )
      })
    })
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: .get
 * ------------------------------------------------------------------------- */

/* Test: .get should fetch data */
function getShouldFetchData(done) {
  request.get("/_ginseng")
    .then(res => res.json())
    .then(data => {
      expect(data)
        .toEqual(jasmine.any(Object))
      done()
    })
    .catch(done.fail)
}

/* ----------------------------------------------------------------------------
 * Definitions: .post
 * ------------------------------------------------------------------------- */

/* Test: .post should store data */
function postShouldStoreData(done) {
  request.post("/_ginseng", { data: true })
    .then(done)
    .catch(done.fail)
}
