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

import Spec from "~/src/spec"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* Spec */
describe("Spec", () => {

  /* Set fixture base path */
  beforeAll(() => {
    fixture.setBase("tests/fixtures/spec")
  })

  /* Cleanup fixtures */
  afterEach(() => {
    fixture.cleanup()
  })

  /* #constructor */
  describe("#constructor.functional", () => {

    /* Load fixtures */
    beforeEach(() => {
      fixture.load("constructor.html")
    })

    /* Test: should resolve selector */
    it("should resolve selector",
      constructorShouldResolveSelector
    )

    /* Test: should throw on invalid selector */
    it("should throw on invalid selector",
      constructorShouldThrowOnInvalidSelector
    )
  })

  /* #capture */
  describe("#capture.functional", () => {

    /* Load fixtures */
    beforeEach(() => {
      fixture.load("capture.html")
    })

    /* Test: should capture element and child elements */
    it("should capture element and child elements",
      captureShouldCaptureElementAndChildElements
    )
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: #constructor
 * ------------------------------------------------------------------------- */

/* Test: #constructor should resolve selector */
function constructorShouldResolveSelector() {
  const spec = new Spec("test", ".constructor")
  expect(spec.element)
    .toEqual(fixture.el.firstChild)
}

/* Test: #constructor should throw on invalid selector */
function constructorShouldThrowOnInvalidSelector() {
  expect(() => {
    new Spec("test", ".no-match")
  }).toThrow(
    new ReferenceError("No match for selector: \".no-match\""))
}

/* ----------------------------------------------------------------------------
 * Definitions: #capture
 * ------------------------------------------------------------------------- */

/* Test: #capture should capture element and child elements */
function captureShouldCaptureElementAndChildElements() {
  const data = new Spec("test", ".capture").capture()
  const validate = item => {
    return item.element.display &&
      item.pseudo.before.display &&
      item.pseudo.after.display &&
      item.children.reduce((result, element) => {
        return result && validate(element)
      }, true)
  }
  expect(validate(data)).toBe(true)
}
