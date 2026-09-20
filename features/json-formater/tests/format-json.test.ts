import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { formatJson } from "../utils/format-json"

describe("formatJson", () => {
  it("parses messy JSON and pretty-prints it with stable key order", () => {
    assert.deepEqual(formatJson('{ "age": 36, "name": "Ada" }'), {
      ok: true,
      json: `{
  "age": 36,
  "name": "Ada"
}`,
    })
  })

  it("formats nested objects and arrays precisely", () => {
    assert.deepEqual(formatJson('{"user":{"name":"Ada"},"tags":["math","computing"]}'), {
      ok: true,
      json: `{
  "user": {
    "name": "Ada"
  },
  "tags": [
    "math",
    "computing"
  ]
}`,
    })
  })

  it("formats primitive JSON values", () => {
    assert.deepEqual(formatJson('"Ada"'), { ok: true, json: '"Ada"' })
    assert.deepEqual(formatJson("36"), { ok: true, json: "36" })
    assert.deepEqual(formatJson("true"), { ok: true, json: "true" })
    assert.deepEqual(formatJson("null"), { ok: true, json: "null" })
  })

  it("returns an error for invalid JSON", () => {
    assert.deepEqual(formatJson("{ name: Ada }"), {
      ok: false,
      error: "Invalid JSON",
    })
  })
})
