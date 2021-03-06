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

import inspect from "../util/inspect"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Perform a GET request
 *
 * @param {string} url - URL
 *
 * @return {Promise<Response>} Promise resolving with response
 */
export const get = url => {
  if (typeof url !== "string" || !url.length)
    throw new TypeError(`Invalid URL: ${inspect(url)}`)

  /* Perform request and return promise */
  return fetch(url, {
    method: "GET",
    mode: "cors"
  })
}

/**
 * Perform a POST request
 *
 * @param {string} url - URL
 * @param {(string|Object)} data - Payload
 *
 * @return {Promise<Response>} Promise resolving with response
 */
export const post = (url, data) => {
  if (typeof url !== "string" || !url.length)
    throw new TypeError(`Invalid URL: ${inspect(url)}`)

  /* Serialize data, if necessary */
  const body = typeof data === "object"
    ? JSON.stringify(data)
    : data

  /* Set correct content type for JSON data */
  const headers = typeof data === "object"
    ? { "Content-Type": "application/json" }
    : {}

  /* Perform request and return promise */
  return fetch(url, {
    method: "POST",
    mode: "cors",
    body,
    headers
  })
}
