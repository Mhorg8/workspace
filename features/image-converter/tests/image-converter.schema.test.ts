import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  clampQuality,
  inferMimeType,
  isAllowedMimeType,
  parseQuality,
  validateConvertFile,
} from "../schemas/image-converter.schema"

describe("image converter schema", () => {
  it("infers and accepts supported mime types", () => {
    assert.equal(inferMimeType("mark.svg"), "image/svg+xml")
    assert.equal(inferMimeType("photo.PNG"), "image/png")
    assert.equal(inferMimeType("notes.txt"), "")
    assert.equal(isAllowedMimeType("image/png"), true)
    assert.equal(isAllowedMimeType("application/pdf"), false)
  })

  it("clamps quality to the supported range", () => {
    assert.equal(clampQuality(80), 80)
    assert.equal(clampQuality(12), 50)
    assert.equal(clampQuality(140), 100)
    assert.equal(parseQuality("72.4"), 72)
    assert.equal(parseQuality("nope"), 80)
  })

  it("rejects empty, oversized, and unsupported files", () => {
    const empty = new File([], "empty.png", { type: "image/png" })
    const tooBig = new File([new Uint8Array(8 * 1024 * 1024 + 1)], "big.png", {
      type: "image/png",
    })
    const text = new File([new Uint8Array([1, 2, 3])], "notes.txt", { type: "text/plain" })
    const png = new File([new Uint8Array([1, 2, 3])], "mark.png", { type: "image/png" })

    assert.equal(validateConvertFile(empty).ok, false)
    assert.equal(validateConvertFile(tooBig).ok, false)
    assert.equal(validateConvertFile(text).ok, false)
    assert.equal(validateConvertFile(png).ok, true)
  })
})
