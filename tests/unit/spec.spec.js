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
import * as style from "~/src/browser/style"

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
  describe("#constructor", () => {

    /* Load fixtures and register spies */
    beforeEach(() => {
      fixture.load("constructor.html")

      /* Register spies */
      spyOn(dom, "query").and.returnValue(fixture.el.firstChild)
    })

    /* Test: should set name */
    it("should set name",
      constructorShouldSetName
    )

    /* Test: should set element */
    it("should set element",
      constructorShouldSetElement
    )

    /* Test: should resolve selector */
    it("should resolve selector",
      constructorShouldResolveSelector
    )

    /* Test: should initialize data */
    it("should initialize data",
      constructorShouldInitializeData
    )

    /* Test: should throw on invalid name */
    it("should throw on invalid name",
      constructorShouldThrowOnInvalidName
    )
  })

  /* #capture */
  describe("#capture", () => {

    /* Load fixtures and register spies */
    beforeEach(() => {
      fixture.load("capture.html")

      /* Register spies */
      spyOn(dom, "query").and.returnValue(fixture.el.firstChild)                // TODO: firstChild????
      spyOn(dom, "traverse").and.callFake((element, children) => {
        return {
          element: style.load(element),
          pseudo: {
            before: style.load(element, style.PSEUDO_BEFORE),
            after: style.load(element, style.PSEUDO_AFTER)
          },
          children
        }
      })
      spyOn(style, "load").and.returnValue(true)
    })

    /* Test: should traverse child nodes */
    it("should traverse child nodes",
      captureShouldTraverseChildNodes
    )

    /* Test: should return data */
    it("should return data",
      captureShouldReturnData
    )

    /* Test: should set data */
    it("should set data",
      captureShouldSetData
    )
  })

  /* #compare */
  describe("#compare", () => {

    /* Load fixtures and register spies */
    beforeEach(() => {
      fixture.load("compare.html")

      /* Register spies */
      spyOn(dom, "query").and.returnValue(fixture.el)
    })

    /* Test: should use captured data */
    it("should use captured data",
      compareShouldUseCapturedData
    )

    /* Test: should capture data if not present */
    it("should capture data if not present",
      compareShouldCaptureDataIfNotPresent
    )
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: #constructor
 * ------------------------------------------------------------------------- */

/* Test: #constructor should set name */
function constructorShouldSetName() {
  const name = `${+new Date}`
  const spec = new Spec(name, ".constructor")
  expect(spec.name)
    .toEqual(name)
}

/* Test: #constructor should set element */
function constructorShouldSetElement() {
  const spec = new Spec("name", ".constructor")
  expect(spec.element)
    .toEqual(fixture.el.firstChild)
}

/* Test: #constructor should resolve selector */
function constructorShouldResolveSelector() {
  new Spec("name", ".constructor")
  expect(dom.query)
    .toHaveBeenCalledWith(".constructor")
}

/* Test: #constructor should initialize data */
function constructorShouldInitializeData() {
  const spec = new Spec("name", ".constructor")
  expect(spec.data)
    .toBeNull()
}

/* Test: #constructor should throw on invalid name */
function constructorShouldThrowOnInvalidName() {
  expect(() => {
    new Spec("", ".constructor")
  }).toThrow(
    new TypeError("Invalid name: \"\""))
}

/* ----------------------------------------------------------------------------
 * Definitions: #capture
 * ------------------------------------------------------------------------- */

/* Test: #capture should set name */
function captureShouldTraverseChildNodes() {
  new Spec("name", ".capture").capture()
  expect(dom.traverse)
    .toHaveBeenCalledWith(jasmine.any(Element), jasmine.any(Function))
  expect(style.load.calls.count())
    .toEqual(3)
}

/* Test: #capture should return data */
function captureShouldReturnData() {
  const spec = new Spec("name", ".constructor")
  expect(spec.capture()).toEqual({
    element: true,
    pseudo: {
      before: true,
      after: true
    },
    children: jasmine.any(Function)
  })
}

/* Test: #capture should set data */
function captureShouldSetData() {
  const spec = new Spec("name", ".constructor")
  expect(spec.capture()).toEqual(spec.data)
  expect(spec.data).toEqual({
    element: true,
    pseudo: {
      before: true,
      after: true
    },
    children: jasmine.any(Function)
  })
}

/* ----------------------------------------------------------------------------
 * Definitions: #compare
 * ------------------------------------------------------------------------- */

/* Test: #compare should use captured data */
function compareShouldUseCapturedData() {
  const spec = new Spec("name", ".compare")
  spec.capture()
  spyOn(spec, "capture").and.callThrough()
  expect(spec.compare(spec.data))
    .toBe(true)
  expect(spec.capture)
    .not.toHaveBeenCalled()

}

/* Test: #compare should capture data if not present */
function compareShouldCaptureDataIfNotPresent() {
  const data = new Spec("name", ".compare").capture()
  const spec = new Spec("name", ".compare")
  spyOn(spec, "capture").and.callThrough()
  expect(spec.compare(data))
    .toBe(true)
  expect(spec.capture)
    .toHaveBeenCalled()
}
