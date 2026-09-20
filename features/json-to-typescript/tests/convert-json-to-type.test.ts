import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { convertJsonToType } from "../utils/convert-json-to-type"

describe("convertJsonToType", () => {
  it("returns a TypeScript type for valid JSON", () => {
    assert.deepEqual(convertJsonToType('{"name":"Ada"}'), {
      ok: true,
      type: `{
  name: string
}`,
    })
  })

  it("returns an error for invalid JSON", () => {
    assert.deepEqual(convertJsonToType("{"), {
      ok: false,
      error: "Invalid JSON",
    })
  })
})
