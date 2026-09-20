import assert from "node:assert/strict"
import { describe, it } from "node:test"

import sharp from "sharp"

import { convertImageToWebp } from "../api/image-converter.repository"

describe("image converter repository", () => {
  it("converts a png buffer to a webp data url", async () => {
    const buffer = await sharp({
      create: {
        width: 8,
        height: 8,
        channels: 3,
        background: { r: 225, g: 29, b: 72 },
      },
    })
      .png()
      .toBuffer()

    const result = await convertImageToWebp({
      buffer,
      filename: "swatch.png",
      originalSize: buffer.length,
      quality: 80,
    })

    assert.equal(result.filename, "swatch.webp")
    assert.match(result.dataUrl, /^data:image\/webp;base64,/)
    assert.equal(result.width, 8)
    assert.equal(result.height, 8)
    assert.ok(result.convertedSize > 0)
  })
})
