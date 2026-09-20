import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { buildGradientCss, toBackgroundDeclaration } from "../utils/build-gradient-css"

describe("buildGradientCss", () => {
  it("returns null when there are no colors", () => {
    assert.equal(buildGradientCss({ kind: "linear", colors: [], angle: 135 }), null)
  })

  it("returns a solid color for a single stop", () => {
    assert.equal(buildGradientCss({ kind: "linear", colors: ["#e11d48"], angle: 90 }), "#e11d48")
  })

  it("builds linear, radial, and conic gradients", () => {
    const colors = ["#e11d48", "#2563eb"]

    assert.equal(
      buildGradientCss({ kind: "linear", colors, angle: 135 }),
      "linear-gradient(135deg, #e11d48, #2563eb)",
    )
    assert.equal(
      buildGradientCss({ kind: "radial", colors, angle: 135 }),
      "radial-gradient(circle, #e11d48, #2563eb)",
    )
    assert.equal(
      buildGradientCss({ kind: "conic", colors, angle: 45 }),
      "conic-gradient(from 45deg, #e11d48, #2563eb)",
    )
  })
})

describe("toBackgroundDeclaration", () => {
  it("wraps a gradient value as a CSS declaration", () => {
    assert.equal(
      toBackgroundDeclaration("linear-gradient(135deg, #e11d48, #2563eb)"),
      "background: linear-gradient(135deg, #e11d48, #2563eb);",
    )
  })
})
