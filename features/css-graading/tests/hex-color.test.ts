import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { isHexColor, normalizeHex } from "../utils/hex-color"

describe("normalizeHex", () => {
  it("prefixes a hash when it is missing", () => {
    assert.equal(normalizeHex("e11d48"), "#e11d48")
  })

  it("keeps an existing hash and trims whitespace", () => {
    assert.equal(normalizeHex("  #E11D48  "), "#E11D48")
  })
})

describe("isHexColor", () => {
  it("accepts 6-digit hex colors", () => {
    assert.equal(isHexColor("#e11d48"), true)
    assert.equal(isHexColor("#E11D48"), true)
  })

  it("rejects incomplete or invalid hex colors", () => {
    assert.equal(isHexColor("#e11d4"), false)
    assert.equal(isHexColor("#gggggg"), false)
    assert.equal(isHexColor("e11d48"), false)
  })
})
