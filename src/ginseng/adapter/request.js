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

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Perform a GET request
 *
 * @param {String} url - URL
 * @return {Response} Response
 */
export const get = url => {
  if (typeof url !== "string" || !url.length)
    throw new TypeError(`Invalid URL: "${url}"`)

  /* Perform request and return Promise */
  return fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Accept": "application/json"
    }
  })
}

/**
 * Perform a POST request
 *
 * @param {String} url - URL
 * @param {Object} data - Payload
 * @return {Response} Response
 */
export const post = (url, data) => {
  if (typeof url !== "string" || !url.length)
    throw new TypeError(`Invalid URL: "${url}"`)
  if (!data || typeof data !== "object")
    throw new TypeError(`Invalid data: "${data}"`)

  /* Perform request and return Promise */
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  })
}
