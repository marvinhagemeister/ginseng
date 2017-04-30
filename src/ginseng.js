import Spec from "./spec"

export default class Ginseng {

  constructor(options = {}) {
    this.options_ = options
  }

  // one top level suite, many subsuites...

  capture(name, selector, options = {}) {
    const spec = new Spec(name, selector).capture(options)
    const baseline = this.baseline_[name]

    if (baseline)
      spec.compare(baseline) // report test results here...

    // get baseline for snapshot, if any...
    this.specs_.push(spec)
  }
}
