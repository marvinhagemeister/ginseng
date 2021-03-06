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
import * as element from "~/src/browser/element"
import * as pseudo from "~/src/browser/pseudo"

import {
  prepare,
  extract,
  default as Spec
} from "~/src/spec"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* Spec */
describe("Spec", () => {

  /* Set fixture base path */
  beforeAll(() => {
    fixture.setBase("fixtures/spec")
  })

  /* Register spies */
  beforeEach(() => {
    spyOn(element, "tag")
      .and.returnValue("tag")
    spyOn(element, "attrs")
      .and.returnValue("attrs")
    spyOn(element, "size")
      .and.returnValue("size")
    spyOn(element, "offset")
      .and.returnValue("offset")
    spyOn(dom, "traverse")
      .and.callFake((el, children, stylesheet) => {
        return stylesheet ? [] : "data"
      })
    spyOn(dom.root, "appendChild")
      .and.returnValue({ sheet: { disabled: false } })
    spyOn(dom.root, "removeChild")
  })

  /* Cleanup fixtures */
  afterEach(() => {
    fixture.cleanup()
  })

  /* .prepare */
  describe(".prepare", () => {

    /* Register spies */
    beforeEach(() => {
      spyOn(pseudo, "mock")
        .and.callFake((el, type) => type)
    })

    /* Test: should mock pseudo elements */
    it("should mock pseudo elements",
      prepareShouldMockPseudoElements
    )

    /* Test: should merge children */
    it("should merge children",
      prepareShouldMergeChildren
    )
  })

  /* .extract */
  describe(".extract", () => {

    /* Test: should return valid data */
    it("should return valid data",
      extractShouldReturnValidData
    )
  })

  /* #constructor */
  describe("#constructor", () => {

    /* Load fixtures and register spies */
    beforeEach(() => {
      fixture.load("constructor.html")

      /* Register spies */
      spyOn(dom, "query")
        .and.returnValue(fixture.el.firstElementChild)
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

    /* Test: should throw on empty name */
    it("should throw on empty name",
      constructorShouldThrowOnEmptyName
    )

    /* Test: should throw on invalid name */
    it("should throw on invalid name",
      constructorShouldThrowOnInvalidName
    )
  })

  /* #capture */
  describe("#capture", () => {

    /* Load fixtures */
    beforeEach(() => {
      fixture.load("capture.html")
    })

    /* Test: should initialize stylesheets */
    it("should initialize stylesheets",
      captureShouldInitializeStyleSheets
    )

    /* Test: should traverse child elements */
    it("should traverse child elements",
      captureShouldTraverseChildElements
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

    /* Load fixtures */
    beforeEach(() => {
      fixture.load("compare.html")
    })

    /* Test: should succeed on matching baseline */
    it("should succeed on matching baseline",
      compareSucceedOnMatchingBaseline
    )

    /* Test: should fail on non-matching baseline */
    it("should fail on non-matching baseline",
      compareFailOnNonMatchingBaseline
    )

    /* Test: should use captured data */
    it("should use captured data",
      compareShouldUseCapturedData
    )

    /* Test: should capture data if not present */
    it("should capture data if not present",
      compareShouldCaptureDataIfNotPresent
    )
  })

  /* #toJSON */
  describe("#toJSON", () => {

    /* Load fixtures */
    beforeEach(() => {
      fixture.load("to-json.html")
    })

    /* Test: should only return captured data */
    it("should only return captured data",
      toJSONShouldOnlyReturnCapturedData
    )
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: .prepare
 * ------------------------------------------------------------------------- */

/* Test: .prepare should mock pseudo elements */
function prepareShouldMockPseudoElements() {
  expect(prepare("genmaicha", [], "bancha"))
    .toEqual(["::before", "::after"])
  expect(pseudo.mock)
    .toHaveBeenCalledWith("genmaicha", "::before", "bancha")
  expect(pseudo.mock)
    .toHaveBeenCalledWith("genmaicha", "::after", "bancha")
}

/* Test: .prepare should merge children */
function prepareShouldMergeChildren() {
  expect(prepare("genmaicha", ["oolong", "sencha"], "bancha"))
    .toEqual(["::before", "::after", "oolong", "sencha"])
}

/* ----------------------------------------------------------------------------
 * Definitions: .extract
 * ------------------------------------------------------------------------- */

/* Test: .extract should return valid data */
function extractShouldReturnValidData() {
  expect(extract({ tagName: "tag" }, "children"))
    .toEqual({
      element: {
        tag: "tag",
        attrs: "attrs",
        props: {
          size: "size",
          offset: "offset"
        }
      },
      children: "children"
    })
}

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
  const spec = new Spec("genmaicha", ".constructor")
  expect(spec.element)
    .toEqual(fixture.el.firstElementChild)
}

/* Test: #constructor should resolve selector */
function constructorShouldResolveSelector() {
  new Spec("oolong", ".constructor")
  expect(dom.query)
    .toHaveBeenCalledWith(".constructor")
}

/* Test: #constructor should initialize data */
function constructorShouldInitializeData() {
  const spec = new Spec("sencha", ".constructor")
  expect(spec.data)
    .toBe(null)
}

/* Test: #constructor should throw on empty name */
function constructorShouldThrowOnEmptyName() {
  expect(() => {
    new Spec("")
  }).toThrow(
    new TypeError("Invalid name: ''"))
  expect(dom.query)
    .not.toHaveBeenCalled()
}

/* Test: #constructor should throw on invalid name */
function constructorShouldThrowOnInvalidName() {
  expect(() => {
    new Spec(null)
  }).toThrow(
    new TypeError("Invalid name: null"))
  expect(dom.query)
    .not.toHaveBeenCalled()
}

/* ----------------------------------------------------------------------------
 * Definitions: #capture
 * ------------------------------------------------------------------------- */

/* Test: #capture should initialize stylesheets */
function captureShouldInitializeStyleSheets() {
  new Spec("genmaicha", ".capture").capture()
  expect(dom.root.appendChild.calls.count())
    .toEqual(2)
  expect(dom.root.removeChild.calls.count())
    .toEqual(2)
}

/* Test: #capture should traverse child elements */
function captureShouldTraverseChildElements() {
  new Spec("oolong", ".capture").capture()
  expect(dom.traverse)
    .toHaveBeenCalledWith(fixture.el.lastElementChild, prepare,
      jasmine.any(Object))
  expect(dom.traverse)
    .toHaveBeenCalledWith(fixture.el.lastElementChild, extract)
}

/* Test: #capture should return data */
function captureShouldReturnData() {
  expect(new Spec("sencha", ".capture").capture())
    .toEqual("data")
}

/* Test: #capture should set data */
function captureShouldSetData() {
  const spec = new Spec("bancha", ".capture")
  expect(spec.capture()).toEqual(spec.data)
  expect(spec.data)
    .toEqual("data")
}

/* ----------------------------------------------------------------------------
 * Definitions: #compare
 * ------------------------------------------------------------------------- */

/* Test: #compare should succeed on matching baseline */
function compareSucceedOnMatchingBaseline() {
  const spec = new Spec("genmaicha", ".compare")
  spec.capture()
  expect(spec.compare(spec.data))
    .toBe(true)
}

/* Test: #compare should fail on non-matching baseline */
function compareFailOnNonMatchingBaseline() {
  const spec = new Spec("oolong", ".compare")
  spec.capture()
  expect(spec.compare({}))
    .toBe(false)
}

/* Test: #compare should use captured data */
function compareShouldUseCapturedData() {
  const spec = new Spec("sencha", ".compare")
  spec.capture()
  expect(dom.traverse.calls.count())
    .toEqual(2)
}

/* Test: #compare should capture data if not present */
function compareShouldCaptureDataIfNotPresent() {
  const data = new Spec("bancha", ".compare").capture()
  const spec = new Spec("bancha", ".compare")
  expect(spec.compare(data))
    .toBe(true)
  expect(dom.traverse.calls.count())
    .toEqual(4)
}

/* ----------------------------------------------------------------------------
 * Definitions: #toJSON
 * ------------------------------------------------------------------------- */

/* Test: #toJSON should only return captured data */
function toJSONShouldOnlyReturnCapturedData() {
  const spec = new Spec("genmaicha", ".to-json")
  spec.capture()
  expect(spec.toJSON())
    .toBe(spec.data)
}
